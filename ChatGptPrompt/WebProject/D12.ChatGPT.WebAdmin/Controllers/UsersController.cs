using AutoMapper;
using D12.ChatGPT.DataAccess;
using D12.ChatGPT.DataModel;
using D12.ChatGPT.DataRepository;
using D12.ChatGPT.DTO;
using D12.ChatGPT.WebAdmin.Models;
using HermosilloOnlineLib;
using IdentityModel;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace D12.ChatGPT.WebAdmin.Controllers
{
    [RouteArea("Security")]
    [RoutePrefix("Users")]
    [Route("{action=Index}")]
    [Authorize(Roles = "Administrador")]
    public class UsersController : Controller
    {
        private const string SiteMapName = "Users";

        private ApplicationUserManager _userManager;
        public ApplicationUserManager UserManager
        {
            get
            {
                return _userManager ?? HttpContext.GetOwinContext().GetUserManager<ApplicationUserManager>();
            }
            private set
            {
                _userManager = value;
            }
        }
        private UnitOfWork unitWork = new UnitOfWork(new HOnlineDbContext());
        private SiteMapRolPolicyDTO siteMapRolPolicyDTO= new SiteMapRolPolicyDTO();
        bool isReadOnly = true;
        private IMapper imapper;

        public UsersController()
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

        // GET: Users
        [HttpGet]
        public ActionResult Index()
        {
            ViewBag.IsReadOnly = isReadOnly;
            return View();
        }
        [HttpGet]
        public JsonNetResult All(QueryParameters dataRequest, int? col, string dir, string search)
        {
            //Init Sort & Filter
            var sorts = new EntityFrameworkPaginate.Sorts<UsersDTO>();
            var filter = new EntityFrameworkPaginate.Filters<UsersDTO>();

            //Init response objects
            JsonData jsonData = new JsonData();
            List<ExceptionInfo> exInfo = new List<ExceptionInfo>();
            DhxGridData dhxGridData = new DhxGridData();

            //Set default sort
            bool isDesc = (dir == "asc");
            var priority = 1;

            //Set sort column
            switch (col)
            {
                case 2:
                    sorts.Add(true, x => x.FirstName, isDesc, priority);
                    break;
                case 3:
                    sorts.Add(true, x => x.LastName, isDesc, priority);
                    break;
                case 4:
                    sorts.Add(true, x => x.JobTitle, isDesc, priority);
                    break;
                case 6:
                    sorts.Add(true, x => x.PhoneNumber, isDesc, priority);
                    break;
                case 7:
                    sorts.Add(true, x => x.Email, isDesc, priority);
                    break;
                case 8:
                    sorts.Add(true, x => x.UserName, isDesc, priority);
                    break;
                case 9:
                    sorts.Add(true, x => x.Active, isDesc, priority);
                    break;
                case 10:
                    sorts.Add(true, x => x.ReadOnly, isDesc, priority);
                    break;
                case 11:
                    sorts.Add(true, x => x.LastAccess, isDesc, priority);
                    break;
                case 12:
                    sorts.Add(true, x => x.EntryDate, isDesc, priority);
                    break;
                default:
                    sorts.Add(true, x => x.FirstName, false);
                    break;
            }

            //Set filter string if exists
            filter.Add(!string.IsNullOrWhiteSpace(search),
                x => (
                    x.FirstName.ToLower() + " " +
                    x.LastName.ToLower() + " " +
                    x.JobTitle.ToLower() + " " +
                    x.PhoneNumber + " " +
                    x.Email.ToLower() + " " +
                    x.UserName.ToLower()
                )
                .Contains(search.ToLower()));

            //Get User list
            var UsersList = unitWork.User.GetUsersDTO(dataRequest.PageNumber, dataRequest.PageSize, sorts, filter);

            //Prepare DhxlGrid data
            foreach (UsersDTO UsersItem in UsersList.Results)
            {
                string iconAddNew = string.Empty;
                string active = (UsersItem.Active) ? "<i class=\"fas fa-check Checked\">" : "<i class=\"fas fa-check unChecked\">";
                string readOnly = (UsersItem.ReadOnly) ? "<i class=\"fas fa-check Checked\">" : "<i class=\"fas fa-check unChecked\">";
                string deleted = (UsersItem.Deleted) ? "<i class=\"fas fa-check Checked\">" : "<i class=\"fas fa-check unChecked\">";
                string lastAccess = string.Empty;

                if (UsersItem.LastAccess != null)
                {
                    DateTime newDate = (DateTime)UsersItem.LastAccess;
                    lastAccess = newDate.ToString("dd/MM/yy HH:mm");
                }

                DhxRows newRow = new DhxRows
                {
                    Id = UsersItem.Id.ToString()
                };

                newRow.Data.Add("");
                newRow.Data.Add(UsersItem.Id.ToString());
                newRow.Data.Add(UsersItem.FirstName.ToString());
                newRow.Data.Add(UsersItem.LastName.ToString());
                newRow.Data.Add(UsersItem.JobTitle);
                newRow.Data.Add(UsersItem.PhoneNumber);
                newRow.Data.Add(UsersItem.Email);
                newRow.Data.Add(UsersItem.UserName);
                newRow.Data.Add(active);
                newRow.Data.Add(readOnly);
                newRow.Data.Add(deleted);
                newRow.Data.Add(lastAccess);
                newRow.Data.Add(UsersItem.EntryDate.ToString("dd/MM/yy HH:mm"));
                newRow.Data.Add("");

                newRow.userdata = new { UsersItem.Roles };

                dhxGridData.rows.Add(newRow);
            }

            //Set pagination
            if (UsersList.RecordCount == 0)
            {
                dataRequest.PageNumber = 0;
                dataRequest.PageNumber = 0;
                dataRequest.PageSize = 0;
            }
            else
            {
                dataRequest.TotalRecords = UsersList.RecordCount;
                dataRequest.PageSize = UsersList.PageSize;
                dataRequest.TotalPages = UsersList.PageCount;
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
                UsersDTO userInfo = unitWork.User.LoadUserDTO(id);

                if (userInfo != null)
                    userInfo.IsAdmin = UserManager.IsInRole(userInfo.Id, "Administrador");

                //Get users list of DhxDataGrid in Json Format
                jsonData.Data = userInfo;
            }
            catch (System.Exception ex)
            {
                jsonData.Errors.Add(ExceptionDescription.excepDesc(ex));
            }

            return new JsonNetResult { Data = jsonData };
        }
        [HttpPost]
        public JsonNetResult Id(UsersDTO userInfo, bool admin = false, string Password = "", string PasswordConfirm = "")
        {
            JsonData jsonData = new JsonData();
            AspNetUsers newUserInfo = new AspNetUsers();

            bool isUserAdmin = false;

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

                    //If Password Request validation
                    if (!CheckPassword(Password, PasswordConfirm))
                        throw new Exception("The password does not match the confirmation");

                    //If User EmpleadoId null is new user
                    if (string.IsNullOrWhiteSpace(userInfo.Id))
                    {
                        //Create new User ID
                        newUserInfo.Id = Guid.NewGuid().ToString();
                    }
                    else
                    {
                        //Check if user exists
                        newUserInfo = unitWork.User.Get(userInfo.Id);

                        //If not exists return error
                        if (newUserInfo == null)
                            throw new Exception("Username does not exist");
                    }

                    //Init AspNetUsers with request data
                    newUserInfo.FirstName = userInfo.FirstName;
                    newUserInfo.LastName = userInfo.LastName;
                    newUserInfo.JobTitle = userInfo.JobTitle;
                    newUserInfo.PhoneNumber = userInfo.PhoneNumber;
                    newUserInfo.Email = userInfo.Email;
                    newUserInfo.UserName = userInfo.UserName;
                    newUserInfo.Active = userInfo.Active;
                    newUserInfo.ReadOnly = userInfo.ReadOnly;
                    newUserInfo.UserName = userInfo.UserName;

                    //Check if model data is valid
                    ICollection<ValidationResult> validResult = unitWork.User.ValidationClass(newUserInfo);

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
                        //If new Add else Update
                        if (String.IsNullOrWhiteSpace(userInfo.Id))
                        {
                            //Init Identity User
                            var user = new ApplicationUser
                            {
                                FirstName = newUserInfo.FirstName,
                                LastName = newUserInfo.LastName,
                                JobTitle = newUserInfo.JobTitle,
                                PhoneNumber = newUserInfo.PhoneNumber,
                                Email = newUserInfo.Email,
                                UserName = newUserInfo.UserName,
                                Active = true,
                                ReadOnly = false,
                                EntryDate = DateTime.Now,
                                EmailConfirmed = true,
                                PhoneNumberConfirmed = true
                            };

                            //Si el New usuario no cuenta con contraseña genera una aleatoria
                            if (string.IsNullOrEmpty(Password))
                                Password = String.Format("{0:yyyyMMdd}", DateTime.Now);

                            //Create Identity User
                            var result = UserManager.Create(user, Password);

                            if (result.Succeeded)
                            {
                                newUserInfo.Id = user.Id;

                                UserManager.AddToRole(user.Id, "User");

                                if (admin)
                                    UserManager.AddToRole(user.Id, "Administrador");

                            }
                            else
                            {
                                ExceptionInfo newExc = new ExceptionInfo
                                {
                                    Result = false,
                                    Status = Status.Error,
                                };

                                if (result.Errors.Contains("is already taken"))
                                {
                                    newExc.ErrorType = ErrorType.DATABASE;
                                    newExc.MessageTitle = "The username already exists.";
                                    newExc.Message = "Username already exists, please try another one.\"";
                                }

                                jsonData.Errors.Add(newExc);
                            }

                            //unitWork.User.Add(newUserInfo);
                            jsonData.Action = "ADD";
                        }
                        else
                        {
                            jsonData.Action = "UPDATE";

                            isUserAdmin = UserManager.IsInRole(newUserInfo.Id, "Administrador");

                            if (!string.IsNullOrWhiteSpace(Password))
                            {
                                UserManager.RemovePassword(newUserInfo.Id);
                                var passResult = UserManager.AddPassword(newUserInfo.Id, Password);
                            }

                            //if (admin && isUserAdmin == false)
                            //    UserManager.AddToRole(newUserInfo.EmpleadoId, "Administrador");

                            //if (!admin && isUserAdmin)
                            //    UserManager.RemoveFromRole(newUserInfo.EmpleadoId, "Administrador");

                            unitWork.Complete();
                        }

                        //Load User
                        if (!string.IsNullOrEmpty(newUserInfo.Id))
                        {
                            var userdDTO = unitWork.User.LoadUserDTO(newUserInfo.Id);

                            if (!string.IsNullOrWhiteSpace(userdDTO.Id))
                                userdDTO.EntryDate = DateTime.Now;

                            jsonData.Data = userdDTO;
                        }
                        else
                        {
                            //If not exists return error
                            if (newUserInfo == null)
                                throw new Exception("Username does not exist");
                        }
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

                        if (excInfo.Contains("Violation of UNIQUE KEY constraint 'UK_AspNetUsers_FullName'"))
                        {
                            exception.MessageTitle = "Error - Duplicate Information";
                            exception.Message = "There is already a user with the same First Name and Last Name, check the information.";
                        }

                        if (excInfo.Contains("Violation of UNIQUE KEY constraint 'UK_AspNetUsers_Email'"))
                        {
                            exception.MessageTitle = "Error - Duplicate Information";
                            exception.Message = "The email address already exists, please try another one.";
                        }

                        if (excInfo.Contains("Violation of UNIQUE KEY constraint 'UK_AspNetUsers_Username'"))
                        {
                            exception.MessageTitle = "Error - Duplicate Information";
                            exception.Message = "The username already exists, try another one.";
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
                jsonData.MessageType = ResultType.Error;
                jsonData.Title = "Error: No data saved";
                jsonData.Message =
                    "The information could not be saved. You can try again, if the problem persists, inform the technical area.";
            }
            else
            {
                jsonData.Result = true;
                jsonData.MessageType = ResultType.Success;
                jsonData.Title = "Done..!";
                jsonData.Message = "The information was saved successfully.";;
            }

            return new JsonNetResult { Data = jsonData };

        }

        [HttpPost]
        public JsonNetResult UpdateRole(UpdateUserRoleViewModel userRole)
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
                if (String.IsNullOrWhiteSpace(userRole.UserId) || String.IsNullOrWhiteSpace(userRole.RoleId))
                {
                    jsonData.Errors.Add(new ExceptionInfo
                    {
                        Result = false,
                        ErrorType = ErrorType.NONE,
                        Status = Status.Error,
                        MessageTitle = "Error: Data incomplete",
                        Message = "The required information for the operation was not provided"
                    });
                }
                else
                {
                    AspNetUserRoles UserRole = unitWork.UserRoles.GetUserRoleInfo(userRole.UserId, userRole.RoleId);

                    if (userRole.State && UserRole == null)
                    {
                        unitWork.UserRoles.Add(new AspNetUserRoles
                        {
                            UserId = userRole.UserId,
                            RoleId = userRole.RoleId,
                        });
                    }

                    if (!userRole.State && UserRole != null)
                    {
                        unitWork.UserRoles.Remove(UserRole);
                    }

                    unitWork.Complete();

                }
            }

            if (jsonData.Errors.Count > 0)
            {
                jsonData.Result = false;
                jsonData.MessageType = ResultType.Error;
                jsonData.Title = "Error: Failed to save role info";
                jsonData.Message = "An error occurred while trying to save the data";
                jsonData.Action = "error";
            }
            else
            {
                jsonData.Result = true;
                jsonData.MessageType = ResultType.Success;
                jsonData.Title = "Done..!";
                jsonData.Message = "The information was saved successfully.";;
                jsonData.Action = "success";
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
                        var user = unitWork.User.Get(ids[i]);

                        unitWork.User.Remove(user);
                        deletedIds.Add(user.Id.ToString());
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
                    jsonData.Title = "Error: Failed to delete all Users";
                    jsonData.Message =
                        "Some Users have linked information. First, remove all user related information.";
                    jsonData.Action = "warning";
                }
                else
                {
                    jsonData.Result = true;
                    jsonData.MessageType = ResultType.Success;
                    jsonData.Title = "Done..!";
                    jsonData.Message = "The information was saved successfully.";;
                    jsonData.Action = "success";
                }
            }

            return new JsonNetResult { Data = jsonData };

        }

        private bool CheckPassword(string password, string passwordConfirm)
        {
            if (string.IsNullOrEmpty(password) && string.IsNullOrEmpty(passwordConfirm))
                return true;
            else
                return password == passwordConfirm;
        }

        private SelectListBox GetRolesSelectList()
        {
            IEnumerable<SelectItemsDTO> rolesList = unitWork.Rol.GetRolesSelectList();

            SelectList selectListRoles = new SelectList(rolesList, "Id", "Text");

            SelectListBox listBox = new SelectListBox
            {
                MultiSelect = true,
                Placeholder = "Select Roles",
                ListItems = selectListRoles
            };

            return listBox;
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