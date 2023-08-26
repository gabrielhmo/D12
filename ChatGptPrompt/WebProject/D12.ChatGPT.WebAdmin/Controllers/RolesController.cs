using HermosilloOnlineLib;
using D12.ChatGPT.DataAccess;
using D12.ChatGPT.DataModel;
using D12.ChatGPT.DataRepository;
using D12.ChatGPT.DTO;
using D12.ChatGPT.WebAdmin.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data.Entity.Infrastructure;
using System.Web.Mvc;
using Microsoft.AspNet.Identity;

namespace D12.ChatGPT.WebAdmin.Controllers
{
    [RouteArea("Ajustes")]
    [RoutePrefix("Roles")]
    [Route("{action=Index}")]
    [Authorize(Roles = "Administrador")]
    public class RolesController : Controller
    {
        private const string SiteMapName = "Roles";

        private UnitOfWork unitWork = new UnitOfWork(new HOnlineDbContext());

        private SiteMapRolPolicyDTO siteMapRolPolicyDTO = new SiteMapRolPolicyDTO();
        bool isReadOnly = true;

        public RolesController()
        {
            string currentUserId = System.Web.HttpContext.Current.User.Identity.GetUserId();
            siteMapRolPolicyDTO = unitWork.SiteMapPolicies.GetPolicyBySiteMapByUser(currentUserId, SiteMapName);
            //Set if user is ReadOnly
            isReadOnly = (siteMapRolPolicyDTO.Write == false);
        }


        // GET: Roles
        [HttpGet]
        public JsonNetResult RolList()
        {
            JsonData jsonData = new JsonData();
            List<ExceptionInfo> exInfo = new List<ExceptionInfo>();
            DhxGridData dhxGridData = new DhxGridData();

            var rolesList = unitWork.Rol.GetAll();

            foreach (AspNetRoles UsersItem in rolesList)
            {
                string iconAddNew = string.Empty;

                DhxRows newRow = new DhxRows
                {
                    Id = UsersItem.Id.ToString()
                };

                newRow.Data.Add("");
                newRow.Data.Add(UsersItem.Id.ToString());
                newRow.Data.Add(UsersItem.Name.ToString());
                newRow.Data.Add("");
                dhxGridData.rows.Add(newRow);
            }

            return new JsonNetResult { Data = dhxGridData };
        }

        [HttpGet]
        public JsonNetResult All(QueryParameters dataRequest, int? col, string dir, string search)
        {
            //Init Sort & Filter
            var sorts = new EntityFrameworkPaginate.Sorts<RolDTO>();
            var filter = new EntityFrameworkPaginate.Filters<RolDTO>();

            //Init response objects
            JsonData jsonData = new JsonData();
            List<ExceptionInfo> exInfo = new List<ExceptionInfo>();
            DhxGridData dhxGridData = new DhxGridData();

            //Set default sort
            bool isDesc = (dir == "asc");
            var priority = 1;
            sorts.Add(true, x => x.Name, isDesc, priority);

            //Set filter string if exists
            filter.Add(!string.IsNullOrWhiteSpace(search),
            x => (x.Name.ToLower())
            .Contains(search.ToLower()));

            //Get Departamentos list
            var rolList = unitWork.Rol.GetRolDTO(dataRequest.PageNumber, dataRequest.PageSize, sorts, filter);

            //Prepare DhxlGrid data
            foreach (RolDTO rolItem in rolList.Results)
            {
                DhxRows newRow = new DhxRows
                {
                    Id = rolItem.Id.ToString()
                };

                newRow.Data.Add("");
                newRow.Data.Add(rolItem.Id.ToString());
                newRow.Data.Add(rolItem.Name.ToString());

                newRow.Data.Add("");
                dhxGridData.rows.Add(newRow);
            }

            //Set pagination
            if (rolList.RecordCount == 0)
            {
                dataRequest.PageNumber = 0;
                dataRequest.PageNumber = 0;
                dataRequest.PageSize = 0;
            }
            else
            {
                dataRequest.TotalRecords = rolList.RecordCount;
                dataRequest.PageSize = rolList.PageSize;
                dataRequest.TotalPages = rolList.PageCount;
            }

            //Set response object
            dhxGridData.userdata = new { PaginParams = dataRequest };

            //Reponse
            return new JsonNetResult { Data = dhxGridData };
        }

        [HttpGet]
        public JsonNetResult Id(string id)
        {
            JsonData jsonData = new JsonData();

            try
            {
                RolDTO rolInfo = unitWork.Rol.LoadRolDTO(id);

                //Get users list of DhxDataGrid in Json Format
                jsonData.Data = rolInfo;
            }
            catch (System.Exception ex)
            {
                jsonData.Errors.Add(ExceptionDescription.excepDesc(ex));
            }

            return new JsonNetResult { Data = jsonData };
        }
        [HttpPost]
        public JsonNetResult Id(AspNetRoles rolRequest)
        {
            JsonData jsonData = new JsonData();
            AspNetRoles rol = new AspNetRoles();

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
                    if (string.IsNullOrEmpty(rolRequest.Id))
                    {
                        rolRequest.Id = Guid.NewGuid().ToString();
                        unitWork.Rol.Add(rolRequest);
                        jsonData.Action = "ADD";
                    }
                    else
                    {
                        jsonData.Action = "UPDATE";
                        rol = unitWork.Rol.Get(rolRequest.Id);
                        rol.Name = rolRequest.Name;
                    }


                    ICollection<ValidationResult> validResult = unitWork.Rol.ValidationClass(rolRequest);

                    //If validation data found errors return error
                    if (validResult.Count > 0)
                    {
                        foreach (ValidationResult item in validResult)
                        {
                            jsonData.Errors.Add(new ExceptionInfo
                            {
                                Result = false,
                                ErrorType = ErrorType.NONE,
                                Status = Status.Error,
                                MessageTitle = "Error de validación",
                                Message = item.ErrorMessage
                            });
                        }
                        throw new Exception("The information is not valid");
                    }
                    else
                    {
                        unitWork.Complete();

                        var rolDTO = unitWork.Rol.LoadRolDTO(rolRequest.Id);

                        jsonData.Data = rolDTO;
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
                            exception.MessageTitle = "Error - Duplicate Information";
                            exception.Message = "There already exists a Role with the same Name. Please verify the information.";
                        }
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

            if (jsonData.Errors.Count > 0)
            {
                jsonData.Result = false;
                jsonData.Title = "Error: No data saved";
                jsonData.Message =
                    "The information could not be saved. You can try again, if the problem persists, inform the technical area.";
            }
            else
            {
                jsonData.Result = true;
                jsonData.Title = "Done..!";
                jsonData.Message = "The information was saved successfully.";;
            }

            return new JsonNetResult { Data = jsonData };
        }
        [HttpPost]
        public JsonNetResult Delete(string[] ids)
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
                        var rol = unitWork.Rol.Get(ids[i]);

                        if (rol != null)
                        {
                            unitWork.Rol.Remove(rol);
                            deletedIds.Add(rol.Id.ToString());
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
                    jsonData.Result = false;
                    jsonData.Title = "Some Roles were not removed";
                    jsonData.Message =
                         "The following Roles were not eliminated since there are Users linked to them. <br/><strong>" + string.Join(", ", undeleted) + "</strong>";
                    jsonData.Action = "warning";
                }
                else
                {
                    jsonData.Result = true;
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