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
    [RoutePrefix("Language")]
    [Route("{action=Index}")]
    [Authorize(Roles = "Administrador")]
    public class LanguageController : Controller
    {
        private const string SiteMapName = "Language";

        private UnitOfWork unitWork = new UnitOfWork(new HOnlineDbContext());
        private SiteMapRolPolicyDTO siteMapRolPolicyDTO = new SiteMapRolPolicyDTO();
        bool isReadOnly = true;
        private IMapper imapper;

        public LanguageController()
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

        // GET: Language
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public JsonNetResult All(QueryParameters dataRequest, int? col, string dir, string search)
        {

            //Init Sort & Filter
            var sorts = new EntityFrameworkPaginate.Sorts<Language>();
            var filter = new EntityFrameworkPaginate.Filters<Language>();

            //Init response objects
            JsonData jsonData = new JsonData();
            List<ExceptionInfo> exInfo = new List<ExceptionInfo>();
            DhxGridData dhxGridData = new DhxGridData();

            //Set default sort
            bool isDesc = (dir == "asc");
            var priority = 1;
            sorts.Add(true, x => x.Label, isDesc, priority);

            //Get Departamentos list
            var LanguageList = unitWork.Language.GetPaginated(dataRequest.PageNumber, dataRequest.PageSize, sorts, filter);

            //Prepare DhxlGrid data
            foreach (Language LanguageItem in LanguageList.Results)
            {
                DhxRows newRow = new DhxRows
                {
                    Id = LanguageItem.Code.ToString()
                };

                string active = (LanguageItem.Active) ? "<i class=\"fas fa-check Checked\">" : "<i class=\"fas fa-check unChecked\">";

                newRow.Data.Add("");
                newRow.Data.Add(LanguageItem.Code);
                newRow.Data.Add(LanguageItem.Label);
                newRow.Data.Add(active);

                newRow.Data.Add("");
                dhxGridData.rows.Add(newRow);
            }

            //Set pagination
            if (LanguageList.RecordCount == 0)
            {
                dataRequest.PageNumber = 0;
                dataRequest.PageNumber = 0;
                dataRequest.PageSize = 0;
            }
            else
            {
                dataRequest.TotalRecords = LanguageList.RecordCount;
                dataRequest.PageSize = LanguageList.PageSize;
                dataRequest.TotalPages = LanguageList.PageCount;
            }

            //Set response object
            dhxGridData.userdata = new { PaginParams = dataRequest };

            //Reponse
            return new JsonNetResult { Data = dhxGridData };
        }

        [HttpGet]
        public JsonNetResult Id(string code)
        {
            JsonData jsonData = new JsonData();

            try
            {
                Language LanguageInfo = unitWork.Language.Get(code);

                var LanguageDTO = imapper.Map<LanguageDTO>(LanguageInfo);

                //Get users list of DhxDataGrid in Json Format
                jsonData.Data = LanguageDTO;
            }
            catch (System.Exception ex)
            {
                jsonData.Errors.Add(ExceptionDescription.excepDesc(ex));
            }

            return new JsonNetResult { Data = jsonData };
        }
        [HttpPost]
        public JsonNetResult Id(LanguageDTO LanguageRequest)
        {
            JsonData jsonData = new JsonData();
            Language LanguageInfo = new Language();
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
                    if (string.IsNullOrEmpty(LanguageRequest.Code))
                    {
                        LanguageInfo = imapper.Map<Language>(LanguageRequest);
                        unitWork.Language.Add(LanguageInfo);
                        jsonData.Action = "ADD";
                    }
                    else
                    {
                        LanguageInfo = unitWork.Language.Get(LanguageRequest.Code);

                        LanguageInfo.Code = LanguageRequest.Code.ToUpper();
                        LanguageInfo.Label = LanguageRequest.Label;
                        LanguageInfo.Active = LanguageRequest.Active;

                        jsonData.Action = "UPDATE";
                    }


                    ICollection<ValidationResult> validResult = unitWork.Language.ValidationClass(LanguageInfo);

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

                        LanguageInfo = unitWork.Language.Get(filter: x => x.Code == LanguageInfo.Code);
                        var LanguageDTO = imapper.Map<LanguageDTO>(LanguageInfo);

                        jsonData.Data = LanguageDTO;
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

                            if (ex.InnerException.InnerException.Message.Contains("_Code"))
                                exception.Message = "Code";

                            if (ex.InnerException.InnerException.Message.Contains("_Label"))
                                exception.Message = "Label";
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
        public JsonNetResult Delete(string[] codes)
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
                    List<string> deletedCodes = new List<string>();
                    for (int i = 0; i < codes.Length; i++)
                    {
                        var LanguageInfo = unitWork.Language.Get(codes[i]);

                        if (LanguageInfo != null)
                        {
                            unitWork.Language.Remove(LanguageInfo);
                            deletedCodes.Add(LanguageInfo.Code.ToString());
                        }
                    }

                    unitWork.Complete();
                    jsonData.Data = new { deleted = deletedCodes };
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