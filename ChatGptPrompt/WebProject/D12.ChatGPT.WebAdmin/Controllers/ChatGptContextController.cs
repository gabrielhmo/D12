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
    [RouteArea("SEOContent")]
    [RoutePrefix("GPTContext")]
    [Route("{action=Index}")]
    [Authorize(Roles = "Administrador")]
    public class ChatGptContextController : Controller
    {
        private const string SiteMapName = "ChatGptContext";

        private UnitOfWork unitWork = new UnitOfWork(new HOnlineDbContext());
        private SiteMapRolPolicyDTO siteMapRolPolicyDTO = new SiteMapRolPolicyDTO();
        bool isReadOnly = true;
        private IMapper imapper;

        public ChatGptContextController()
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

        // GET: ChatGptContext
        public ActionResult Index()
        {
            ViewBag.SeoToneVoiceList = GetToneVoiceSelectList();

            ViewBag.ChatGptRolList = GetChatGptRolSelectList();
            ViewBag.ControlTypeList = GetControlTypeSelectList();
            ViewBag.LanguageList = GetLanguageSelectList();
            ViewBag.TensesList = GetTensesSelectList();
            return View();
        }

        [HttpGet]
        public JsonNetResult All(QueryParameters dataRequest, int? col, string dir, int? campaignId)
        {

            //Init Sort & Filter
            var sorts = new EntityFrameworkPaginate.Sorts<ChatGptContext>();
            var filter = new EntityFrameworkPaginate.Filters<ChatGptContext>();

            //Init response objects
            JsonData jsonData = new JsonData();
            List<ExceptionInfo> exInfo = new List<ExceptionInfo>();
            DhxGridData dhxGridData = new DhxGridData();

            var cBusinessOffer = new ClientBusinessOfferDTO();

            //Set default sort
            bool isDesc = (dir == "asc");
            var priority = 1;
            sorts.Add(true, x => x.Id, isDesc, priority);

            if (campaignId != null)
            {
                filter.Add(true, x => x.SeoCampaignId == campaignId);

                var clienteBusinessOffer = unitWork.SeoCampaign.Get(filter: x => x.Id == campaignId, "ClientBusinessOffer"); //, "ClientBusinessOffer,BusinessTypeOffer,ClientCompany"

                if (clienteBusinessOffer != null)
                    cBusinessOffer = imapper.Map<ClientBusinessOfferDTO>(clienteBusinessOffer.ClientBusinessOffer);
            }


            //Get Departamentos list
            var ChatGptContextList = unitWork.ChatGptContext.GetPaginated(dataRequest.PageNumber, dataRequest.PageSize, sorts, filter, "SeoCampaign,ChatGptRol,ControlType,Language,Tenses");

            //Prepare DhxlGrid data
            foreach (ChatGptContext ChatGptContextItem in ChatGptContextList.Results)
            {
                DhxRows newRow = new DhxRows
                {
                    Id = ChatGptContextItem.Id.ToString()
                };

                var toneVoiceIdList = unitWork.ChatGptContextToneVoice.GetAll(filter: x => x.ContextId == ChatGptContextItem.Id, null);
                var toneIdList = toneVoiceIdList.Select(x => x.ToneVoiceId).ToList();

                string active = (ChatGptContextItem.Active) ? "<i class=\"fas fa-check Checked\">" : "<i class=\"fas fa-check unChecked\">";
                string campaignName = ChatGptContextItem.SeoCampaign.Name.ToString();

                newRow.Data.Add("");
                newRow.Data.Add(string.Join(",", toneIdList));
                newRow.Data.Add(ChatGptContextItem.Id.ToString());
                newRow.Data.Add(ChatGptContextItem.SeoCampaignId.ToString());
                newRow.Data.Add(ChatGptContextItem.ChatGptRolId.ToString());
                newRow.Data.Add(ChatGptContextItem.ControlTypeId.ToString());
                newRow.Data.Add(ChatGptContextItem.LanguageCode);
                newRow.Data.Add(ChatGptContextItem.TenseId.ToString());
                newRow.Data.Add(campaignName);
                newRow.Data.Add(ChatGptContextItem.ChatGptRol.Name.ToString());
                newRow.Data.Add(ChatGptContextItem.ControlType.Label.ToString());
                newRow.Data.Add(ChatGptContextItem.Language.Label);
                newRow.Data.Add(ChatGptContextItem.Tenses.Tense.ToString());
                newRow.Data.Add(ChatGptContextItem.Name);
                newRow.Data.Add(ChatGptContextItem.Context);
                newRow.Data.Add(ChatGptContextItem.MinLength.ToString());
                newRow.Data.Add(ChatGptContextItem.MaxLength.ToString());
                newRow.Data.Add(ChatGptContextItem.MinWord.ToString());
                newRow.Data.Add(ChatGptContextItem.MaxWord.ToString());
                newRow.Data.Add(active);

                newRow.Data.Add("");
                dhxGridData.rows.Add(newRow);
            }

            //Set pagination
            if (ChatGptContextList.RecordCount == 0)
            {
                dataRequest.PageNumber = 0;
                dataRequest.PageNumber = 0;
                dataRequest.PageSize = 0;
            }
            else
            {
                dataRequest.TotalRecords = ChatGptContextList.RecordCount;
                dataRequest.PageSize = ChatGptContextList.PageSize;
                dataRequest.TotalPages = ChatGptContextList.PageCount;
            }

            //Set response object
            dhxGridData.userdata = new { PaginParams = dataRequest, BusinessOffer = cBusinessOffer };

            //Reponse
            return new JsonNetResult { Data = dhxGridData };
        }

        [HttpGet]
        public JsonNetResult Id(int id)
        {
            JsonData jsonData = new JsonData();

            try
            {
                ChatGptContext ChatGptContextInfo = unitWork.ChatGptContext.Get(id);

                var ChatGptContextDTO = imapper.Map<ChatGptContextDTO>(ChatGptContextInfo);

                //Get users list of DhxDataGrid in Json Format
                jsonData.Data = ChatGptContextDTO;
            }
            catch (System.Exception ex)
            {
                jsonData.Errors.Add(ExceptionDescription.excepDesc(ex));
            }

            return new JsonNetResult { Data = jsonData };
        }

        [HttpPost]
        public JsonNetResult Id(ChatGptContext ChatGptContextRequest, string ToneVoiceRequest)
        {
            JsonData jsonData = new JsonData();
            ChatGptContext ChatGptContextInfo = new ChatGptContext();
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
                    var toneVoiceList = new List<ChatGptContextToneVoice>();

                    if (!string.IsNullOrEmpty(ToneVoiceRequest))
                    {
                        short[] shortList = StringToShortArr(ToneVoiceRequest);

                        foreach (var itemTone in shortList)
                        {
                            toneVoiceList.Add(
                                new ChatGptContextToneVoice { ContextId = ChatGptContextRequest.Id, ToneVoiceId = itemTone });
                        }
                    }

                    ChatGptContextRequest.SeoCampaignId = 1; //Eliminar
                    if (ChatGptContextRequest.Id == 0)
                    {
                        if (toneVoiceList.Count > 0)
                            ChatGptContextInfo.ChatGptContextToneVoice = toneVoiceList;

                        ChatGptContextInfo = imapper.Map<ChatGptContext>(ChatGptContextRequest);
                        unitWork.ChatGptContext.Add(ChatGptContextInfo);
                        jsonData.Action = "ADD";
                    }
                    else
                    {
                        ChatGptContextInfo = unitWork.ChatGptContext.Get(filter: x => x.Id == ChatGptContextRequest.Id);

                        ChatGptContextInfo.SeoCampaignId = ChatGptContextRequest.SeoCampaignId; ;
                        ChatGptContextInfo.ChatGptRolId = ChatGptContextRequest.ChatGptRolId; ;
                        ChatGptContextInfo.ControlTypeId = ChatGptContextRequest.ControlTypeId;
                        ChatGptContextInfo.LanguageCode = ChatGptContextRequest.LanguageCode;
                        ChatGptContextInfo.TenseId = ChatGptContextRequest.TenseId;
                        ChatGptContextInfo.Name = ChatGptContextRequest.Name;
                        ChatGptContextInfo.Context = ChatGptContextRequest.Context;
                        ChatGptContextInfo.MinLength = ChatGptContextRequest.MinLength;
                        ChatGptContextInfo.MaxLength = ChatGptContextRequest.MaxLength;
                        ChatGptContextInfo.MinWord = ChatGptContextRequest.MinWord;
                        ChatGptContextInfo.MaxWord = ChatGptContextRequest.MaxWord;
                        ChatGptContextInfo.Active = ChatGptContextRequest.Active;

                        if (ChatGptContextInfo.ChatGptContextToneVoice.Count > 0)
                            unitWork.ChatGptContextToneVoice.RemoveRange(ChatGptContextInfo.ChatGptContextToneVoice);

                        if (toneVoiceList.Count > 0)
                            ChatGptContextInfo.ChatGptContextToneVoice = toneVoiceList;

                        jsonData.Action = "UPDATE";

                    }

                    ICollection<ValidationResult> validResult = unitWork.ChatGptContext.ValidationClass(ChatGptContextInfo);

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

                        ChatGptContextInfo = unitWork.ChatGptContext.Get(filter: x => x.Id == ChatGptContextInfo.Id, "SeoCampaign,ChatGptRol,ControlType,Language,Tenses");
                        var ChatGptContextDTO = imapper.Map<ChatGptContextDTO>(ChatGptContextInfo);
                        ChatGptContextDTO.ToneVoiceIds = ToneVoiceRequest;
                        jsonData.Data = ChatGptContextDTO;
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
                        var ChatGptContextInfo = unitWork.ChatGptContext.Get(ids[i]);

                        if (ChatGptContextInfo != null)
                        {
                            unitWork.ChatGptContext.Remove(ChatGptContextInfo);
                            deletedIds.Add(ChatGptContextInfo.Id.ToString());
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

        [HttpGet]
        public JsonNetResult GetCampaignFilters()
        {
            JsonData jsonData = new JsonData();

            try
            {
                jsonData.Data = GetCampaignSelectList();
                jsonData.Result = true;
                jsonData.MessageType = ResultType.Success;
            }
            catch (Exception ex)
            {
                jsonData.Errors.Add(ExceptionDescription.excepDesc(ex));

                jsonData.Result = false;
                jsonData.MessageType = ResultType.Error;

            }

            return new JsonNetResult { Data = jsonData };
        }
        private SelectList GetCampaignSelectList()
        {
            IEnumerable<SelectItemsDTO> campaignlList = unitWork.SeoCampaign.GetAll(filter: x => x.Active == true).Select(x => new SelectItemsDTO { Id = x.Id.ToString(), Text = x.Name }).ToList(); ;

            SelectList selectList = new SelectList(campaignlList, "Id", "Text");

            return selectList;
        }
        private SelectList GetToneVoiceSelectList()
        {
            IEnumerable<SelectItemsDTO> toneVoiceList = unitWork.SeoToneVoice.GetSeoToneVoiceSelectList();

            SelectList selectList = new SelectList(toneVoiceList, "Id", "Text");

            return selectList;
        }
        private SelectList GetChatGptRolSelectList()
        {
            IEnumerable<SelectItemsDTO> chatGptRolList = unitWork.ChatGPTRol.GetAll(filter: x => x.Active == true).Select(x => new SelectItemsDTO { Id = x.Id.ToString(), Text = x.Name }).ToList(); ;

            SelectList selectList = new SelectList(chatGptRolList, "Id", "Text");

            return selectList;
        }
        private SelectList GetControlTypeSelectList()
        {
            IEnumerable<SelectItemsDTO> controlTypeList = unitWork.ControlType.GetAll(filter: x => x.Active == true).Select(x => new SelectItemsDTO { Id = x.Id.ToString(), Text = x.Label }).ToList(); ;

            SelectList selectList = new SelectList(controlTypeList, "Id", "Text");

            return selectList;
        }
        private SelectList GetLanguageSelectList()
        {
            IEnumerable<SelectItemsDTO> languageList = unitWork.Language.GetAll(filter: x => x.Active == true).Select(x => new SelectItemsDTO { Id = x.Code.ToString(), Text = x.Label }).ToList(); ;

            SelectList selectList = new SelectList(languageList, "Id", "Text");

            return selectList;
        }
        private SelectList GetTensesSelectList()
        {
            IEnumerable<SelectItemsDTO> tensesList = unitWork.Tense.GetAll(filter: x => x.Active == true).Select(x => new SelectItemsDTO { Id = x.Id.ToString(), Text = x.Tense }).ToList();

            SelectList selectList = new SelectList(tensesList, "Id", "Text");

            return selectList;
        }

        private short[] StringToShortArr(string stringShort)
        {
            string[] listString = stringShort.Split(',');
            short[] shortList = listString.Select(short.Parse).ToArray();

            return shortList;
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