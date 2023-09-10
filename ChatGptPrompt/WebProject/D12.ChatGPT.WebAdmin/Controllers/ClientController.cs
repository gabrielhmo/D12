using AutoMapper;
using D12.ChatGPT.DataAccess;
using D12.ChatGPT.DataModel;
using D12.ChatGPT.DataRepository;
using D12.ChatGPT.DTO;
using D12.ChatGPT.WebAdmin.Models;
using HermosilloOnlineLib;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data.Entity.Infrastructure;
using System.Data.Entity.Validation;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace D12.ChatGPT.WebAdmin.Controllers
{
    [Authorize]
    [RouteArea("Clients")]
    [RoutePrefix("Client")]
    [Route("{action=Index}")]
    [Authorize(Roles = "Administrador")]
    public class ClientController : Controller
    {
        private const string SiteMapName = "Client";

        private UnitOfWork unitWork = new UnitOfWork(new HOnlineDbContext());
        private SiteMapRolPolicyDTO siteMapRolPolicyDTO = new SiteMapRolPolicyDTO();
        bool isReadOnly = true;
        private IMapper imapper;

        public ClientController()
        {
            var currentUser = System.Web.HttpContext.Current.User;
            siteMapRolPolicyDTO = unitWork.SiteMapPolicies.GetPolicyBySiteMapByUser(currentUser.Identity.GetUserId(), SiteMapName);
            //Set if user is ReadOnly
            isReadOnly = (siteMapRolPolicyDTO.Write == false);

            if (currentUser.IsInRole("Administrator"))
                isReadOnly = false;

            imapper = MvcApplication.MapperConfiguration.CreateMapper();

            isReadOnly = false;
        }

        // GET: Client
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public JsonNetResult All(QueryParameters dataRequest, int? col, string dir, string search)
        {

            //Init Sort & Filter
            var sorts = new EntityFrameworkPaginate.Sorts<Client>();
            var filter = new EntityFrameworkPaginate.Filters<Client>();

            //Init response objects
            JsonData jsonData = new JsonData();
            List<ExceptionInfo> exInfo = new List<ExceptionInfo>();
            DhxGridData dhxGridData = new DhxGridData();

            //Set default sort
            bool isDesc = (dir == "asc");
            var priority = 1;
            sorts.Add(true, x => x.Name, isDesc, priority);

            //Get Departamentos list
            var ClientList = unitWork.Client.GetPaginated(dataRequest.PageNumber, dataRequest.PageSize, sorts, filter);

            //Prepare DhxlGrid data
            foreach (Client ClientItem in ClientList.Results)
            {
                DhxRows newRow = new DhxRows
                {
                    Id = ClientItem.Id.ToString()
                };

                string active = (ClientItem.Active) ? "<i class=\"fas fa-check Checked\">" : "<i class=\"fas fa-check unChecked\">";
                string entryDate = (ClientItem.EntryDate == null) ? "" : ClientItem.EntryDate.ToString("dd/MM/yyyy HH:mm");

                newRow.Data.Add("");
                newRow.Data.Add(ClientItem.Id.ToString());
                newRow.Data.Add(ClientItem.Name);
                newRow.Data.Add(ClientItem.Email);
                newRow.Data.Add(active);
                newRow.Data.Add(entryDate);

                newRow.Data.Add("");
                dhxGridData.rows.Add(newRow);
            }

            //Set pagination
            if (ClientList.RecordCount == 0)
            {
                dataRequest.PageNumber = 0;
                dataRequest.PageNumber = 0;
                dataRequest.PageSize = 0;
            }
            else
            {
                dataRequest.TotalRecords = ClientList.RecordCount;
                dataRequest.PageSize = ClientList.PageSize;
                dataRequest.TotalPages = ClientList.PageCount;
            }

            //Set response object
            dhxGridData.userdata = new { PaginParams = dataRequest };

            //Reponse
            return new JsonNetResult { Data = dhxGridData };
        }

        [HttpGet]
        public JsonNetResult Id(int id)
        {
            JsonData jsonData = new JsonData();

            try
            {
                Client ClientInfo = unitWork.Client.Get(id);

                var ClientDTO = imapper.Map<ClientDTO>(ClientInfo);

                //Get users list of DhxDataGrid in Json Format
                jsonData.Data = ClientDTO;
            }
            catch (System.Exception ex)
            {
                jsonData.Errors.Add(ExceptionDescription.excepDesc(ex));
            }

            return new JsonNetResult { Data = jsonData };
        }
        [HttpPost]
        public JsonNetResult Id(ClientDTO clientRequest)
        {
            JsonData jsonData = new JsonData();
            Client ClientInfo = new Client();
            bool hasValidationError = false;

            try
            {
                if (isReadOnly)
                {
                    jsonData.Errors.Add(new ExceptionInfo
                    {
                        Result = false,
                        ErrorType = ErrorType.NONE,
                        Status = Status.Error,
                        MessageTitle = "Access denied",
                        Message = "User only has read permission"
                    });
                }
                else
                {
                    if (clientRequest.Id == 0)
                    {
                        ClientInfo = imapper.Map<Client>(clientRequest);
                        unitWork.Client.Add(ClientInfo);
                        jsonData.Action = "ADD";
                    }
                    else
                    {
                        ClientInfo = unitWork.Client.Get(clientRequest.Id);

                        ClientInfo.Name = clientRequest.Name;
                        ClientInfo.Email = clientRequest.Email;
                        ClientInfo.Active = clientRequest.Active;

                        jsonData.Action = "UPDATE";
                    }


                    ICollection<ValidationResult> validResult = unitWork.Client.ValidationClass(ClientInfo);

                    //If validation data found errors return error
                    if (validResult.Count > 0)
                    {
                        hasValidationError = true;

                        foreach (ValidationResult item in validResult)
                        {
                            jsonData.Errors.Add(new ExceptionInfo
                            {
                                Result = false,
                                ErrorType = ErrorType.NONE,
                                Status = Status.Error,
                                MessageTitle = "Validation error",
                                Message = item.ErrorMessage
                            });
                        }
                        throw new Exception("The information is not valid");
                    }
                    else
                    {
                        unitWork.Complete();

                        ClientInfo = unitWork.Client.Get(filter: x => x.Id == ClientInfo.Id);
                        var ClientDTO = imapper.Map<ClientDTO>(ClientInfo);

                        jsonData.Data = ClientDTO;
                    }
                }
            }
            catch (DbUpdateException ex)
            {
                var exception = ExceptionDescription.excepDesc(ex);

                if (ex.InnerException != null)
                {
                    if (ex.InnerException.InnerException != null)
                    {
                        string excInfo = ex.InnerException.InnerException.Message;

                        if (excInfo.Contains("Violation of UNIQUE KEY constraint"))
                        {
                            hasValidationError = true;
                            exception.MessageTitle = "Duplicate information: ";

                            if (ex.InnerException.InnerException.Message.Contains("_Name"))
                                exception.Message = "Name";

                            if (ex.InnerException.InnerException.Message.Contains("_Email"))
                                exception.Message = "EMail";
                        }
                    }
                }

                jsonData.Errors.Add(exception);
            }
            catch (DbEntityValidationException ex)
            {
                hasValidationError = true;

                var exception = new ExceptionInfo();

                foreach (var dbEntityValidation in ex.EntityValidationErrors)
                {
                    foreach (var error in dbEntityValidation.ValidationErrors)
                    {
                        exception.Message += string.Format("{0}\r\n", error.ErrorMessage);
                    }
                }

                jsonData.Errors.Add(exception);
            }
            catch (Exception ex)
            {
                var exception = ExceptionDescription.excepDesc(ex);

                exception.MessageTitle = "Error";
                exception.Message = ex.Message;

                jsonData.Errors.Add(exception);
            }

            if (jsonData.Errors.Count > 0 || jsonData.ValidationError.Count > 0)
            {
                jsonData.Result = false;
                jsonData.MessageType = ResultType.Error;

                if (hasValidationError)
                {
                    jsonData.Title = "";
                    jsonData.Message = "Please check the following validation errors:";
                }
                else
                {
                    jsonData.Title = "Error. ";
                    jsonData.Message = "The information could not be saved. You can try again, if the problem persists, inform the technical area.";
                }
            }
            else
            {
                jsonData.Result = true;
                jsonData.MessageType = ResultType.Success;
                jsonData.Title = "Done..!";
                jsonData.Message = "The information was saved successfully."; ;
            }

            return new JsonNetResult { Data = jsonData };
        }
        [HttpPost]
        public JsonNetResult Delete(int[] ids)
        {
            JsonData jsonData = new JsonData();

            if (isReadOnly)
            {
                jsonData.Errors.Add(new ExceptionInfo
                {
                    Result = false,
                    ErrorType = ErrorType.NONE,
                    Status = Status.Error,
                    MessageTitle = "Access denied",
                    Message = "User only has read permission"
                });
            }
            else
            {
                JsonNetResult jsonResult = new JsonNetResult();
                List<string> undeleted = new List<string>();

                try
                {
                    List<string> deletedIds = new List<string>();
                    for (int i = 0; i < ids.Length; i++)
                    {
                        var ClientInfo = unitWork.Client.Get(ids[i]);

                        if (ClientInfo != null)
                        {
                            unitWork.Client.Remove(ClientInfo);
                            deletedIds.Add(ClientInfo.Id.ToString());
                        }
                    }

                    unitWork.Complete();
                    jsonData.Data = new { deleted = deletedIds };
                }
                catch (DbUpdateException ex)
                {
                    var exception = ExceptionDescription.excepDesc(ex);
                    jsonData.Errors.Add(exception);
                }
                catch (Exception ex)
                {
                    var exception = ExceptionDescription.excepDesc(ex);
                    jsonData.Errors.Add(exception);

                }

                if (jsonData.Errors.Count > 0 || undeleted.Count > 0)
                {
                    string errorMessage = "";
                    string undeleteMessage = string.Join(", ", undeleted);

                    foreach (var execInfo in jsonData.Errors)
                    {
                        errorMessage += execInfo.Message + "<br />";
                    }

                    if (string.IsNullOrEmpty(undeleteMessage))
                        errorMessage += "<br />" + "No data were deleted";
                    else
                        errorMessage += "<br />" + undeleteMessage;

                    jsonData.Result = false;
                    jsonData.MessageType = ResultType.Error;
                    jsonData.Title = "An error occurred";
                    jsonData.Message = errorMessage;
                    jsonData.Action = "Error";
                }
                else
                {
                    jsonData.Result = true;
                    jsonData.MessageType = ResultType.Success;
                    jsonData.Title = "Done..!";
                    jsonData.Message = "The information was successfully removed.";
                    jsonData.Action = "success";
                }
            }

            return new JsonNetResult { Data = jsonData };
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                unitWork.Dispose();
            }

            base.Dispose(disposing);
        }
    }
}