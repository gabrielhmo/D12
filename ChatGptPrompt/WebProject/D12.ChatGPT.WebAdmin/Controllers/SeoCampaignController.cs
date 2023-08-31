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
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Mvc;

namespace D12.ChatGPT.WebAdmin.Controllers
{
    [Authorize]
    [RouteArea("SEOContent")]
    [RoutePrefix("Campaigns")]
    [Route("{action=Index}")]
    [Authorize(Roles = "Administrador")]
    public class SeoCampaignController : Controller
    {
        private const string SiteMapName = "Campaigns";

        private UnitOfWork unitWork = new UnitOfWork(new HOnlineDbContext());
        private SiteMapRolPolicyDTO siteMapRolPolicyDTO = new SiteMapRolPolicyDTO();
        bool isReadOnly = true;
        private IMapper imapper;

        public SeoCampaignController()
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

        // GET: SeoCampaign
        public ActionResult Index()
        {
            ViewBag.CompaniesList = GetCompanySelectList();
            ViewBag.BusinessOfferList = GetBusinessOfferSelectList(0);
            return View();
        }

        [HttpGet]
        public JsonNetResult All(QueryParameters dataRequest, int? col, string dir,int? companyId)
        {

            //Init Sort & Filter
            var sorts = new EntityFrameworkPaginate.Sorts<SeoCampaign>();
            var filter = new EntityFrameworkPaginate.Filters<SeoCampaign>();

            //Init response objects
            JsonData jsonData = new JsonData();
            List<ExceptionInfo> exInfo = new List<ExceptionInfo>();
            DhxGridData dhxGridData = new DhxGridData();

            //Set default sort
            bool isDesc = (dir == "asc");
            var priority = 1;
            sorts.Add(true, x => x.EntryDate, isDesc, priority);

            //Get Departamentos list
            var SeoCampaignList = unitWork.SeoCampaign.GetPaginated(dataRequest.PageNumber, dataRequest.PageSize, sorts, filter, "ClientCompany,ClientBusinessOffer");

            //Prepare DhxlGrid data
            foreach (SeoCampaign SeoCampaignItem in SeoCampaignList.Results)
            {
                DhxRows newRow = new DhxRows
                {
                    Id = SeoCampaignItem.Id.ToString()
                };

                string active = (SeoCampaignItem.Active) ? "<i class=\"fas fa-check Checked\">" : "<i class=\"fas fa-check unChecked\">";
                string entryDate = (SeoCampaignItem.EntryDate == null) ? "" : SeoCampaignItem.EntryDate.ToString("dd/MM/yyyy HH:mm");

                newRow.Data.Add("");
                newRow.Data.Add(SeoCampaignItem.Id.ToString());
                newRow.Data.Add(SeoCampaignItem.CompanyId.ToString());
                newRow.Data.Add(SeoCampaignItem.BusinessOfferId.ToString());
                newRow.Data.Add(SeoCampaignItem.ClientCompany.Name);
                newRow.Data.Add(SeoCampaignItem.ClientBusinessOffer.Name);
                newRow.Data.Add(SeoCampaignItem.Name);
                newRow.Data.Add(SeoCampaignItem.Market);
                newRow.Data.Add(SeoCampaignItem.PrimaryKeyword);
                newRow.Data.Add(SeoCampaignItem.Keywords);
                newRow.Data.Add(SeoCampaignItem.Description);
                newRow.Data.Add(active);
                newRow.Data.Add(entryDate);

                newRow.Data.Add("");
                dhxGridData.rows.Add(newRow);
            }

            //Set pagination
            if (SeoCampaignList.RecordCount == 0)
            {
                dataRequest.PageNumber = 0;
                dataRequest.PageNumber = 0;
                dataRequest.PageSize = 0;
            }
            else
            {
                dataRequest.TotalRecords = SeoCampaignList.RecordCount;
                dataRequest.PageSize = SeoCampaignList.PageSize;
                dataRequest.TotalPages = SeoCampaignList.PageCount;
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
                SeoCampaign SeoCampaignInfo = unitWork.SeoCampaign.Get(id);

                var SeoCampaignDTO = imapper.Map<SeoCampaignDTO>(SeoCampaignInfo);

                //Get users list of DhxDataGrid in Json Format
                jsonData.Data = SeoCampaignDTO;
            }
            catch (System.Exception ex)
            {
                jsonData.Errors.Add(ExceptionDescription.excepDesc(ex));
            }

            return new JsonNetResult { Data = jsonData };
        }

        [HttpPost]
        public JsonNetResult Id(SeoCampaignDTO SeoCampaignRequest)
        {
            JsonData jsonData = new JsonData();
            SeoCampaign SeoCampaignInfo = new SeoCampaign();
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
                    if (SeoCampaignRequest.Id == 0)
                    {
                        SeoCampaignInfo = imapper.Map<SeoCampaign>(SeoCampaignRequest);
                        unitWork.SeoCampaign.Add(SeoCampaignInfo);
                        jsonData.Action = "ADD";
                    }
                    else
                    {
                        SeoCampaignInfo = unitWork.SeoCampaign.Get(filter: x=>x.Id == SeoCampaignRequest.Id, "ClientCompany,ClientBusinessOffer");

                        SeoCampaignInfo.CompanyId = SeoCampaignRequest.CompanyId;
                        SeoCampaignInfo.BusinessOfferId = SeoCampaignRequest.BusinessOfferId;;
                        SeoCampaignInfo.Name = SeoCampaignRequest.Name;
                        SeoCampaignInfo.Market = SeoCampaignRequest.Market;
                        SeoCampaignInfo.PrimaryKeyword = SeoCampaignRequest.PrimaryKeyword;
                        SeoCampaignInfo.Keywords = SeoCampaignRequest.Keywords;
                        SeoCampaignInfo.Description = SeoCampaignRequest.Description;
                        SeoCampaignInfo.Active = SeoCampaignRequest.Active;

                        jsonData.Action = "UPDATE";
                    }


                    ICollection<ValidationResult> validResult = unitWork.SeoCampaign.ValidationClass(SeoCampaignInfo);

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

                        InitCampaingPrompts(SeoCampaignInfo.Id);

                        SeoCampaignInfo = unitWork.SeoCampaign.Get(filter: x => x.Id == SeoCampaignInfo.Id, "ClientCompany,ClientBusinessOffer");
                        var SeoCampaignDTO = imapper.Map<SeoCampaignDTO>(SeoCampaignInfo);

                        jsonData.Data = SeoCampaignDTO;
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
                        var SeoCampaignInfo = unitWork.SeoCampaign.Get(ids[i]);

                        if (SeoCampaignInfo != null)
                        {
                            unitWork.SeoCampaign.Remove(SeoCampaignInfo);
                            deletedIds.Add(SeoCampaignInfo.Id.ToString());
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
        public JsonNetResult GetBusinessOfferList(int companyId)
        {
            JsonData jsonData = new JsonData();

            try
            {

                var businessOfferList = GetBusinessOfferSelectList(companyId);
                //Get users list of DhxDataGrid in Json Format
                jsonData.Data = businessOfferList;
            }
            catch (System.Exception ex)
            {
                jsonData.Errors.Add(ExceptionDescription.excepDesc(ex));
            }

            return new JsonNetResult { Data = jsonData };
        }

        private SelectList GetCompanySelectList()
        {
            IEnumerable<SelectItemsDTO> companyList = unitWork.ClientCompany.GetAll(filter: x => x.Active == true).Select(x => new SelectItemsDTO { Id = x.Id.ToString(), Text = x.Name }).ToList(); ;

            SelectList selectList = new SelectList(companyList, "Id", "Text");

            return selectList;
        }
        private SelectList GetBusinessOfferSelectList(int companyId)
        {
            IEnumerable<SelectItemsDTO> businessOffer = new List<SelectItemsDTO>();

            if (companyId > 0)
                businessOffer = unitWork.ClientBusinessOffer.GetAll(filter: x => x.CompanyId == companyId && x.Active == true).Select(x => new SelectItemsDTO { Id = x.Id.ToString(), Text = x.Name }).ToList(); ;

            SelectList selectList = new SelectList(businessOffer, "Id", "Text");

            return selectList;
        }

        private void InitCampaingPrompts(long campaignId) 
        {
            SeoCampaignFullDTO campaign = new SeoCampaignFullDTO();

            var seoCampaignInfo = unitWork.SeoCampaign.Get(filter: x => x.Id == campaignId, "ClientCompany, ClientBusinessOffer, ChatGPTPrompt");

            if(seoCampaignInfo != null) 
            { 
                campaign = imapper.Map<SeoCampaignFullDTO>(seoCampaignInfo);

                string companyInfo = $"Company name: {campaign.Company.Name}. Industry: {campaign.Company.Industry}. activity: {campaign.Company.Activity}. " +
                    $"{campaign.BusinessOffer.OfferTypeName} Name: {campaign.BusinessOffer.Name } Description: {campaign.BusinessOffer.Description}. Characteristics: {campaign.BusinessOffer.Characteristics}. ChatGPT don’t start writing yet, understand?.";

                companyInfo = CleanStringForPrompt(companyInfo);

                if (campaign.Prompts.Count() > 0)
                {
                    ChatGptPrompt prompt = seoCampaignInfo.ChatGptPrompt.Skip(2).First();

                    var promptInfo = unitWork.ChatGptPrompt.Get(filter: x => x.Id == prompt.Id);
                    promptInfo.Prompt = companyInfo;
                }
                else
                {
                    List<ChatGptPrompt> newPrompt = new List<ChatGptPrompt>();

                    newPrompt.Add(new ChatGptPrompt
                    {
                        SeoCampaignId = campaignId,
                        ChatGptRolId = 1,
                        ControlTypeId = 2,
                        LanguageCode = "ENG",
                        TenseId = 1,
                        Name = "ChatGPT Rol",
                        Prompt = "ChatGPT I want you to act as seo content writing"
                    });

                    newPrompt.Add(new ChatGptPrompt
                    {
                        SeoCampaignId = campaignId,
                        ChatGptRolId = 1,
                        ControlTypeId = 2,
                        LanguageCode = "ENG",
                        TenseId = 1,
                        Name = "ChatGPT Context",
                        Prompt = "ChatGPT I will provide you with information about the company and characteristics of its products and services. Remember this initial information to create all the SEO content that I will be requesting."
                    });

                    newPrompt.Add(new ChatGptPrompt
                    {
                        SeoCampaignId = campaignId,
                        ChatGptRolId = 1,
                        ControlTypeId = 2,
                        LanguageCode = "ENG",
                        TenseId = 1,
                        Name = "ChatGPT Context",
                        Prompt = companyInfo
                    });

                    unitWork.ChatGptPrompt.AddRange(newPrompt);
                }
                unitWork.Complete();
            }

        }
        private string CleanStringForPrompt(string input)
        {
            // Remove special characters and extra whitespace
            string cleaned = Regex.Replace(input, @"[^a-zA-Z0-9\s]", "");
            cleaned = Regex.Replace(cleaned, @"\s+", " ").Trim();

            // Limit the length of the cleaned string (adjust as needed)
            int maxLength = 4000;
            if (cleaned.Length > maxLength)
            {
                cleaned = cleaned.Substring(0, maxLength);
            }

            // Ensure the cleaned text ends with a space
            if (!cleaned.EndsWith(" "))
            {
                cleaned += " ";
            }

            return cleaned;
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