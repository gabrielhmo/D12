using AutoMapper;
using D12.ChatGPT.DataAccess;
using D12.ChatGPT.DataModel;
using D12.ChatGPT.DataRepository;
using D12.ChatGPT.DTO;
using D12.ChatGPT.WebAdmin.Models;
using HermosilloOnlineLib;
using Microsoft.AspNet.Identity;
using Newtonsoft.Json;
using OpenAI_API;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Configuration;
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
    [RouteArea("SEOContent")]
    [RoutePrefix("ChatGptPrompt")]
    [Route("{action=Index}")]
    [Authorize(Roles = "Administrador")]
    public class ChatGptPromptController : Controller
    {
        public enum GptRol { System = 1, Assistant = 2, User = 3 }

        private const string SiteMapName = "ChatGptPrompt";

        private UnitOfWork unitWork = new UnitOfWork(new HOnlineDbContext());
        private SiteMapRolPolicyDTO siteMapRolPolicyDTO = new SiteMapRolPolicyDTO();
        bool isReadOnly = true;
        private IMapper imapper;

        public ChatGptPromptController()
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

        // GET: ChatGptPrompt
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
        public JsonNetResult GetPromptsByCampaing(int campaignId)
        {
            //Init response objects
            JsonData jsonData = new JsonData();
            List<ExceptionInfo> exInfo = new List<ExceptionInfo>();

            SeoCampaignFullDTO seoCampaign = new SeoCampaignFullDTO();

            if (campaignId > 0)
            {
                try
                {
                    var seoCampaignInfo = unitWork.SeoCampaign.Get(filter: x => x.Id == campaignId, "ClientCompany,ClientBusinessOffer,ChatGPTPrompt,ChatGptPromptLog");

                    if (seoCampaignInfo != null)
                    {
                        seoCampaign = imapper.Map<SeoCampaignFullDTO>(seoCampaignInfo);
                    }

                    jsonData.Result = true;
                    jsonData.MessageType = ResultType.Success;
                    jsonData.Data = seoCampaign;
                }
                catch (Exception ex)
                {
                    jsonData.Result = false;
                    jsonData.MessageType = ResultType.Error;
                    jsonData.Data = ex;
                    jsonData.Message = ex.Message;
                    jsonData.Title = "Error";
                }
            }

            //Reponse
            return new JsonNetResult { Data = jsonData };
        }

        [HttpGet]
        public JsonNetResult Id(int id)
        {
            JsonData jsonData = new JsonData();

            try
            {
                ChatGptPrompt ChatGptPromptInfo = unitWork.ChatGptPrompt.Get(id);

                var ChatGptPromptDTO = imapper.Map<ChatGptPromptDTO>(ChatGptPromptInfo);

                //Get users list of DhxDataGrid in Json Format
                jsonData.Data = ChatGptPromptDTO;
            }
            catch (System.Exception ex)
            {
                jsonData.Errors.Add(ExceptionDescription.excepDesc(ex));
            }

            return new JsonNetResult { Data = jsonData };
        }

        [HttpPost]
        public JsonNetResult Id(ChatGptPrompt ChatGptPromptRequest, string ToneVoiceRequest)
        {
            JsonData jsonData = new JsonData();
            ChatGptPrompt ChatGptPromptInfo = new ChatGptPrompt();
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
                    var toneVoiceList = new List<ChatGptPromptToneVoice>();

                    if (!string.IsNullOrEmpty(ToneVoiceRequest))
                    {
                        short[] shortList = StringToShortArr(ToneVoiceRequest);

                        foreach (var itemTone in shortList)
                        {
                            toneVoiceList.Add(
                                new ChatGptPromptToneVoice { PromptId = ChatGptPromptRequest.Id, ToneVoiceId = itemTone });
                        }
                    }

                    if (ChatGptPromptRequest.Id == 0)
                    {
                        if (toneVoiceList.Count > 0)
                            ChatGptPromptInfo.ChatGptPromptToneVoice = toneVoiceList;

                        ChatGptPromptInfo = imapper.Map<ChatGptPrompt>(ChatGptPromptRequest);
                        unitWork.ChatGptPrompt.Add(ChatGptPromptInfo);
                        jsonData.Action = "ADD";
                    }
                    else
                    {
                        ChatGptPromptInfo = unitWork.ChatGptPrompt.Get(filter: x => x.Id == ChatGptPromptRequest.Id);

                        ChatGptPromptInfo.SeoCampaignId = ChatGptPromptRequest.SeoCampaignId; ;
                        ChatGptPromptInfo.ChatGptRolId = ChatGptPromptRequest.ChatGptRolId; ;
                        ChatGptPromptInfo.ControlTypeId = ChatGptPromptRequest.ControlTypeId;
                        ChatGptPromptInfo.LanguageCode = ChatGptPromptRequest.LanguageCode;
                        ChatGptPromptInfo.TenseId = ChatGptPromptRequest.TenseId;
                        ChatGptPromptInfo.Name = ChatGptPromptRequest.Name;
                        ChatGptPromptInfo.Prompt = ChatGptPromptRequest.Prompt;
                        ChatGptPromptInfo.MinLength = ChatGptPromptRequest.MinLength;
                        ChatGptPromptInfo.MaxLength = ChatGptPromptRequest.MaxLength;
                        ChatGptPromptInfo.MinWord = ChatGptPromptRequest.MinWord;
                        ChatGptPromptInfo.MaxWord = ChatGptPromptRequest.MaxWord;
                        ChatGptPromptInfo.MaxPromptResult = ChatGptPromptRequest.MaxPromptResult;
                        ChatGptPromptInfo.Active = ChatGptPromptRequest.Active;

                        if (ChatGptPromptInfo.ChatGptPromptToneVoice.Count > 0)
                            unitWork.ChatGptPromptToneVoice.RemoveRange(ChatGptPromptInfo.ChatGptPromptToneVoice);

                        if (toneVoiceList.Count > 0)
                            ChatGptPromptInfo.ChatGptPromptToneVoice = toneVoiceList;

                        jsonData.Action = "UPDATE";

                    }

                    ICollection<ValidationResult> validResult = unitWork.ChatGptPrompt.ValidationClass(ChatGptPromptInfo);

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

                        ChatGptPromptInfo = unitWork.ChatGptPrompt.Get(filter: x => x.Id == ChatGptPromptInfo.Id, "SeoCampaign,ChatGptRol,ControlType,Language,Tenses");
                        var ChatGptPromptDTO = imapper.Map<ChatGptPromptDTO>(ChatGptPromptInfo);

                        if (ChatGptPromptDTO != null)
                        {
                            List<ChatGptPromptToneVoice> toneVoices = unitWork.ChatGptPromptToneVoice.GetAll(filter: x => x.PromptId == ChatGptPromptInfo.Id, null, "SeoToneVoice").ToList();

                            ChatGptPromptDTO.ToneVoices = imapper.Map<List<ChatGptPromptToneVoiceDTO>>(toneVoices);
                        }
                        jsonData.Data = ChatGptPromptDTO;
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
        public JsonNetResult Delete(int id)
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
                    var ChatGptPromptInfo = unitWork.ChatGptPrompt.Get(id);

                    if (ChatGptPromptInfo != null)
                    {
                        unitWork.ChatGptPrompt.Remove(ChatGptPromptInfo);
                    }

                    unitWork.Complete();
                    jsonData.Result = true;
                    jsonData.MessageType= ResultType.Success;
                    jsonData.Title = "Done..!";
                    jsonData.Message = "The information was deleted successfully."; ;

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
        public async Task<JsonNetResult> UseChatGpt(long campaignId, long? promptId = null)
        {
            ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
            JsonData jsonData = new JsonData();

            string apiKey = ConfigurationManager.AppSettings["ChatGPTAPI"];

            var openai = new OpenAIAPI(apiKey);
            long currentPrompt = 0;
            List<ChatGptPrompt> prompts = new List<ChatGptPrompt>();

            try
            {

                if (promptId != null)
                {
                    prompts = unitWork.ChatGptPrompt.GetAll(filter: x => x.SeoCampaignId == campaignId && x.Id == promptId && x.Active == true).ToList();
                }
                else
                {
                    prompts = unitWork.ChatGptPrompt.GetAll(filter: x => x.SeoCampaignId == campaignId && x.Active == true).ToList();
                }


                var promptResult = new List<ChatGptPromptResult>();
                var chat = openai.Chat.CreateConversation();
                var iteration = 0;

                foreach (var prompt in prompts)
                {
                    currentPrompt = prompt.Id;

                    if (prompt.MaxPromptResult >= prompt.ChatGptPromptResult.Count && iteration == 0)
                    {
                        if ((GptRol)prompt.ChatGptRolId == GptRol.System)
                            chat.AppendSystemMessage(prompt.Prompt);

                        if ((GptRol)prompt.ChatGptRolId == GptRol.Assistant)
                            chat.AppendExampleChatbotOutput(prompt.Prompt);

                        if ((GptRol)prompt.ChatGptRolId == GptRol.User)
                            chat.AppendUserInput(prompt.Prompt);

                        var result = await chat.GetResponseFromChatbotAsync();

                        if (!string.IsNullOrWhiteSpace(result))
                        {
                            result = HttpUtility.HtmlDecode(result);
                            result = result.Replace("\"", "");
                        }

                        var newPromptResult = new ChatGptPromptResult
                        {
                            PromptId = prompt.Id,
                            Response = result,
                            DateRequest = DateTime.Now,
                            EntryDate = DateTime.Now,
                            Active = true
                        };

                        unitWork.ChatGPTPromptResult.Add(newPromptResult);

                        prompt.Sent = true;

                        await Task.Delay(TimeSpan.FromSeconds(3));
                    }
                }

                unitWork.Complete();

                var ChatGptPromptDTO = imapper.Map<List<ChatGptPrompt>>(prompts);

                jsonData.Data = ChatGptPromptDTO;
                jsonData.Result = true;
                jsonData.MessageType = ResultType.Success;

            }
            catch (Exception ex)
            {
                var exception = new ExceptionInfo();
                exception.MessageTitle = "Error";

                if (!string.IsNullOrEmpty(ex.Message))
                {
                    ErrorResponse errorResponse = ExtractJsonFromString(ex.Message);

                    if (errorResponse != null)
                    {
                        var chatlog = new ChatGptPromptLog();
                        chatlog.CampaignId = campaignId;
                        chatlog.Message = errorResponse.error.message;
                        chatlog.Type = errorResponse.error.type;
                        chatlog.Param = errorResponse.error.param;
                        chatlog.Code = errorResponse.error.code;

                        unitWork.ChatGPTPromptLog.Add(chatlog);
                        unitWork.Complete();
                        
                        exception.Message = chatlog.Message;

                    }
                }

                jsonData.Result = false;
                jsonData.MessageType = ResultType.Error;
                jsonData.Errors.Add(exception);
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

        public ErrorResponse ExtractJsonFromString(string input)
        {
            try
            {
                int startIndex = input.IndexOf('{');
                int endIndex = input.LastIndexOf('}');
                if (startIndex != -1 && endIndex != -1)
                {
                    string jsonString = input.Substring(startIndex, endIndex - startIndex + 1);

                    // Deserialize the JSON string into the ErrorResponse object
                    return JsonConvert.DeserializeObject<ErrorResponse>(jsonString);
                }
                else
                {
                    // Handle the case when the JSON object is not found in the input string
                    return null;
                }
            }
            catch (JsonException ex)
            {
                // Handle any JSON deserialization errors
                Console.WriteLine("JSON deserialization error: " + ex.Message);
                return null;
            }
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