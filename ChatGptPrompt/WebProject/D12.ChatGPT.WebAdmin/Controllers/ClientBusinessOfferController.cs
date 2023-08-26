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
    public class ClientBusinessOfferController : Controller
    {
        private const string SiteMapName = "Client Business Offer";

        private UnitOfWork unitWork = new UnitOfWork(new HOnlineDbContext());
        private SiteMapRolPolicyDTO siteMapRolPolicyDTO = new SiteMapRolPolicyDTO();
        bool isReadOnly = true;
        private IMapper imapper;

        public ClientBusinessOfferController()
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

        // GET: ClientCompany
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public JsonNetResult All(int companyId, QueryParameters dataRequest, int? col, string dir, string search)
        {

            //Init Sort & Filter
            var sorts = new EntityFrameworkPaginate.Sorts<ClientBusinessOffer>();
            var filter = new EntityFrameworkPaginate.Filters<ClientBusinessOffer>();

            //Init response objects
            JsonData jsonData = new JsonData();
            List<ExceptionInfo> exInfo = new List<ExceptionInfo>();
            DhxGridData dhxGridData = new DhxGridData();

            //Set default sort
            bool isDesc = (dir == "asc");
            var priority = 1;
            sorts.Add(true, x => x.CompanyId, isDesc, priority);
            sorts.Add(true, x => x.Name, isDesc, 2);

            filter.Add(true, x => x.CompanyId == companyId);

            //Get Departamentos list
            var ClientBusinessOffer = unitWork.ClientBusinessOffer.GetPaginated(dataRequest.PageNumber, dataRequest.PageSize, sorts, filter, "ClientCompany,BusinessTypeOffer");

            //Prepare DhxlGrid data
            foreach (ClientBusinessOffer ClientBusinessOfferItem in ClientBusinessOffer.Results)
            {
                DhxRows newRow = new DhxRows
                {
                    Id = ClientBusinessOfferItem.Id.ToString()
                };

                string active = (ClientBusinessOfferItem.Active) ? "<i class=\"fas fa-check Checked\">" : "<i class=\"fas fa-check unChecked\">";
                string entryDate = (ClientBusinessOfferItem.EntryDate == null) ? "" : ClientBusinessOfferItem.EntryDate.ToString("dd/MM/yyyy HH:mm");

                newRow.Data.Add("");
                newRow.Data.Add(ClientBusinessOfferItem.Id.ToString());
                newRow.Data.Add(ClientBusinessOfferItem.CompanyId.ToString());
                newRow.Data.Add(ClientBusinessOfferItem.OfferTypeId.ToString());
                newRow.Data.Add(ClientBusinessOfferItem.ClientCompany.Name);
                newRow.Data.Add(ClientBusinessOfferItem.BusinessTypeOffer.Name);
                newRow.Data.Add(ClientBusinessOfferItem.Name);
                newRow.Data.Add(ClientBusinessOfferItem.Description);
                newRow.Data.Add(ClientBusinessOfferItem.Characteristics);
                newRow.Data.Add(active);
                newRow.Data.Add(entryDate);

                newRow.Data.Add("");
                dhxGridData.rows.Add(newRow);
            }

            //Set pagination
            if (ClientBusinessOffer.RecordCount == 0)
            {
                dataRequest.PageNumber = 0;
                dataRequest.PageNumber = 0;
                dataRequest.PageSize = 0;
            }
            else
            {
                dataRequest.TotalRecords = ClientBusinessOffer.RecordCount;
                dataRequest.PageSize = ClientBusinessOffer.PageSize;
                dataRequest.TotalPages = ClientBusinessOffer.PageCount;
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
                ClientCompany ClientCompanyInfo = unitWork.ClientCompany.Get(id);

                var ClientCompanyDTO = imapper.Map<ClientCompanyDTO>(ClientCompanyInfo);

                //Get users list of DhxDataGrid in Json Format
                jsonData.Data = ClientCompanyDTO;
            }
            catch (System.Exception ex)
            {
                jsonData.Errors.Add(ExceptionDescription.excepDesc(ex));
            }

            return new JsonNetResult { Data = jsonData };
        }

        [HttpPost]
        public JsonNetResult Id(ClientBusinessOfferDTO clientBusinessOfferRequest)
        {
            JsonData jsonData = new JsonData();
            ClientBusinessOffer ClientBusinessOfferInfo = new ClientBusinessOffer();
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
                    if (clientBusinessOfferRequest.Id == 0)
                    {
                        ClientBusinessOfferInfo = imapper.Map<ClientBusinessOffer>(clientBusinessOfferRequest);
                        unitWork.ClientBusinessOffer.Add(ClientBusinessOfferInfo);
                        jsonData.Action = "ADD";
                    }
                    else
                    {
                        ClientBusinessOfferInfo = unitWork.ClientBusinessOffer.Get(clientBusinessOfferRequest.Id);

                        ClientBusinessOfferInfo.CompanyId = clientBusinessOfferRequest.CompanyId;
                        ClientBusinessOfferInfo.OfferTypeId = clientBusinessOfferRequest.OfferTypeId;
                        ClientBusinessOfferInfo.Name = clientBusinessOfferRequest.Name;
                        ClientBusinessOfferInfo.Description = clientBusinessOfferRequest.Description;
                        ClientBusinessOfferInfo.Characteristics = clientBusinessOfferRequest.Characteristics;
                        ClientBusinessOfferInfo.Active = clientBusinessOfferRequest.Active;

                        jsonData.Action = "UPDATE";
                    }


                    ICollection<ValidationResult> validResult = unitWork.ClientBusinessOffer.ValidationClass(ClientBusinessOfferInfo);

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

                        ClientBusinessOfferInfo = unitWork.ClientBusinessOffer.Get(filter: x => x.Id == ClientBusinessOfferInfo.Id, "ClientCompany,BusinessTypeOffer");
                        var clientBusinessOfferDTO = imapper.Map<ClientBusinessOfferDTO>(ClientBusinessOfferInfo);

                        jsonData.Data = clientBusinessOfferDTO;
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

                            if (ex.InnerException.InnerException.Message.Contains("_ClientId_Name"))
                                exception.Message = "Company Name";
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
                        var ClientCompanyInfo = unitWork.ClientCompany.Get(ids[i]);

                        if (ClientCompanyInfo != null)
                        {
                            unitWork.ClientCompany.Remove(ClientCompanyInfo);
                            deletedIds.Add(ClientCompanyInfo.Id.ToString());
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