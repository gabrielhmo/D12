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
using System.Net;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace D12.ChatGPT.WebAdmin.Controllers
{
    [Authorize]
    [RouteArea("PromptOptions")]
    [RoutePrefix("ChatGPTRol")]
    [Route("{action=Index}")]
    [Authorize(Roles = "Administrator")]
    public class ChatGptRolController : Controller
    {
        private const string SiteMapName = "ChatGptRol";

        private UnitOfWork unitWork = new UnitOfWork(new HOnlineDbContext());
        private SiteMapRolPolicyDTO siteMapRolPolicyDTO = new SiteMapRolPolicyDTO();
        bool isReadOnly = true;
        private IMapper imapper;

        public ChatGptRolController()
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

        // GET: ChatGptRol
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public JsonNetResult All(QueryParameters dataRequest, int? col, string dir, string search)
        {

            //Init Sort & Filter
            var sorts = new EntityFrameworkPaginate.Sorts<ChatGptRol>();
            var filter = new EntityFrameworkPaginate.Filters<ChatGptRol>();

            //Init response objects
            JsonData jsonData = new JsonData();
            List<ExceptionInfo> exInfo = new List<ExceptionInfo>();
            DhxGridData dhxGridData = new DhxGridData();

            //Set default sort
            bool isDesc = (dir == "asc");
            var priority = 1;
            sorts.Add(true, x => x.Name, isDesc, priority);

            //Get Departamentos list
            var ChatGptRolList = unitWork.ChatGPTRol.GetPaginated(dataRequest.PageNumber, dataRequest.PageSize, sorts, filter);

            //Prepare DhxlGrid data
            foreach (ChatGptRol ChatGptRolItem in ChatGptRolList.Results)
            {
                DhxRows newRow = new DhxRows
                {
                    Id = ChatGptRolItem.Id.ToString()
                };

                string active = (ChatGptRolItem.Active) ? "<i class=\"fas fa-check Checked\">" : "<i class=\"fas fa-check unChecked\">";

                newRow.Data.Add("");
                newRow.Data.Add(ChatGptRolItem.Id.ToString());
                newRow.Data.Add(ChatGptRolItem.Name);
                newRow.Data.Add(active);

                newRow.Data.Add("");
                dhxGridData.rows.Add(newRow);
            }

            //Set pagination
            if (ChatGptRolList.RecordCount == 0)
            {
                dataRequest.PageNumber = 0;
                dataRequest.PageNumber = 0;
                dataRequest.PageSize = 0;
            }
            else
            {
                dataRequest.TotalRecords = ChatGptRolList.RecordCount;
                dataRequest.PageSize = ChatGptRolList.PageSize;
                dataRequest.TotalPages = ChatGptRolList.PageCount;
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
                ChatGptRol ChatGptRolInfo = unitWork.ChatGPTRol.Get(id);

                var ChatGptRolDTO = imapper.Map<ChatGptRolDTO>(ChatGptRolInfo);

                //Get users list of DhxDataGrid in Json Format
                jsonData.Data = ChatGptRolDTO;
            }
            catch (System.Exception ex)
            {
                jsonData.Errors.Add(ExceptionDescription.excepDesc(ex));
            }

            return new JsonNetResult { Data = jsonData };
        }
        [HttpPost]
        public JsonNetResult Id(ChatGptRolDTO ChatGptRolRequest)
        {
            JsonData jsonData = new JsonData();
            ChatGptRol ChatGptRolInfo = new ChatGptRol();
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
                    if (ChatGptRolRequest.Id == 0)
                    {
                        ChatGptRolInfo = imapper.Map<ChatGptRol>(ChatGptRolRequest);
                        unitWork.ChatGPTRol.Add(ChatGptRolInfo);
                        jsonData.Action = "ADD";
                    }
                    else
                    {
                        ChatGptRolInfo = unitWork.ChatGPTRol.Get(ChatGptRolRequest.Id);

                        ChatGptRolInfo.Name = ChatGptRolRequest.Name;
                        ChatGptRolInfo.Active = ChatGptRolRequest.Active;

                        jsonData.Action = "UPDATE";
                    }


                    ICollection<ValidationResult> validResult = unitWork.ChatGPTRol.ValidationClass(ChatGptRolInfo);

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

                        ChatGptRolInfo = unitWork.ChatGPTRol.Get(filter: x => x.Id == ChatGptRolInfo.Id);
                        var ChatGptRolDTO = imapper.Map<ChatGptRolDTO>(ChatGptRolInfo);

                        jsonData.Data = ChatGptRolDTO;
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
                        var ChatGptRolInfo = unitWork.ChatGPTRol.Get(ids[i]);

                        if (ChatGptRolInfo != null)
                        {
                            unitWork.ChatGPTRol.Remove(ChatGptRolInfo);
                            deletedIds.Add(ChatGptRolInfo.Id.ToString());
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