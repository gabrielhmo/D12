using D12.ChatGPT.DataAccess;
using D12.ChatGPT.DataRepository;
using D12.ChatGPT.WebAdmin.Models;
using D12.ChatGPT.WebAdmin.Resources;
using HermosilloOnlineLib;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using System;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using System.IO;

namespace D12.ChatGPT.WebAdmin.Controllers
{
    [Authorize]
    public class AccountController : Controller
    {
        private ApplicationSignInManager _signInManager;
        private ApplicationUserManager _userManager;

        public AccountController()
        {
        }

        public AccountController(ApplicationUserManager userManager, ApplicationSignInManager signInManager)
        {
            UserManager = userManager;
            SignInManager = signInManager;
        }

        public ApplicationSignInManager SignInManager
        {
            get
            {
                return _signInManager ?? HttpContext.GetOwinContext().Get<ApplicationSignInManager>();
            }
            private set
            {
                _signInManager = value;
            }
        }

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

        //
        // GET: /Account/Login
        [AllowAnonymous]
        public ActionResult Login(string returnUrl)
        {
            returnUrl = GetBaseUrl();

            var model = new LoginViewModel { ReturnUrl = returnUrl };

            return View(model);
        }

        //
        // POST: /Account/Login
        [HttpPost]
        [AllowAnonymous]
        //[ValidateAntiForgeryToken]
        public async Task<JsonNetResult> Login(LoginViewModel model)
        {
            ExceptionInfo excInfo = new ExceptionInfo();
            JsonData jsonData = new JsonData();

            string returnUrl = model.ReturnUrl;

            if (string.IsNullOrWhiteSpace(returnUrl) || returnUrl.IndexOf("logoff") > 0)
                returnUrl = Url.Action("Index", "Inicio");

            if (!ModelState.IsValid)
            {
                jsonData.Errors.Add(new ExceptionInfo
                {
                    Result = false,
                    ErrorType = ErrorType.NONE,
                    Status = Status.Error,
                    MessageTitle = Account.LoginFailureTitle,
                    Message = Account.LoginFailureMsg
                });
            }
            try
            {
                // This doesn't count login failures towards account lockout
                // To enable password failures to trigger account lockout, change to shouldLockout: true
                var result = await SignInManager.PasswordSignInAsync(model.Username, model.Password, true, shouldLockout: false);

                if (result == SignInStatus.Success)
                {
                    var user = UserManager.FindByName(model.Username);
                    if (user.Active)
                    {
                        //AspNetUsers logedUser = unitWork.User.GetUserInfo(user.EmpleadoId);

                        //logedUser.LastAccess = DateTime.Now;

                        //logedUser.UserActivityLog.Add(new UserActivityLog
                        //{
                        //    UserId = logedUser.EmpleadoId,
                        //    ActivityId = (short)ActivityType.Login,
                        //    EntryDate = DateTime.Now
                        //});

                        //unitWork.Complete();

                        jsonData.Result = true;
                        jsonData.MessageType = ResultType.Success;
                        jsonData.Title = "Authorized";
                        jsonData.Message = "Approved logon";
                        jsonData.ReturnUrl = returnUrl;
                        jsonData.StatusCode = 200;
                    }
                    else
                    {
                        AuthenticationManager.SignOut(DefaultAuthenticationTypes.ApplicationCookie);

                        jsonData.Errors.Add(new ExceptionInfo
                        {
                            Result = false,
                            ErrorType = ErrorType.NONE,
                            Status = Status.Error,
                            MessageTitle = Account.LoginLockedOutTitle,
                            Message = Account.LoginLockedOutMsg
                        });
                    }
                }
                else
                {
                    jsonData.Result = false;
                    jsonData.MessageType = ResultType.None;
                    jsonData.Title = "Incorrect username or password";
                    jsonData.Message = "Verify username and password and try again.";
                    jsonData.ReturnUrl = returnUrl;
                    jsonData.StatusCode = 401;
                }
            }
            catch (Exception ex)
            {
                jsonData.Result = false;
                jsonData.MessageType = ResultType.Error;
                var exception = ExceptionDescription.excepDesc(ex);
                jsonData.Errors.Add(exception);
            }

            return new JsonNetResult { Data = jsonData };
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult LogOff()
        {
            AuthenticationManager.SignOut(DefaultAuthenticationTypes.ApplicationCookie);
            //var userId = User.Identity.GetUserId();

            //AspNetUsers logedUser = unitWork.User.GetUserInfo(userId);

            //logedUser.UserActivityLog.Add(new UserActivityLog
            //{
            //    UserId = logedUser.EmpleadoId,
            //    ActivityId = (short)ActivityType.LogOff,
            //    EntryDate = DateTime.Now
            //});

            //unitWork.Complete();

            return RedirectToAction("Login", "Account");
        }

        [HttpGet]
        public ActionResult KeepSessionAlive()
        {
            var dir = Server.MapPath("~/Content/Images");
            var path = Path.Combine(dir, "dot.png");
            return base.File(path, "image/png");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                unitWork.Dispose();

                if (_userManager != null)
                {
                    _userManager.Dispose();
                    _userManager = null;
                }

                if (_signInManager != null)
                {
                    _signInManager.Dispose();
                    _signInManager = null;
                }
            }

            base.Dispose(disposing);
        }

        #region Helpers
        // Used for XSRF protection when adding external logins
        private const string XsrfKey = "XsrfId";

        private IAuthenticationManager AuthenticationManager
        {
            get
            {
                return HttpContext.GetOwinContext().Authentication;
            }
        }

        private void AddErrors(IdentityResult result)
        {
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError("", error);
            }
        }

        private ActionResult RedirectToLocal(string returnUrl)
        {
            if (Url.IsLocalUrl(returnUrl))
            {
                return Redirect(returnUrl);
            }
            return RedirectToAction("Index", "Inicio");
        }

        internal class ChallengeResult : HttpUnauthorizedResult
        {
            public ChallengeResult(string provider, string redirectUri)
                : this(provider, redirectUri, null)
            {
            }

            public ChallengeResult(string provider, string redirectUri, string userId)
            {
                LoginProvider = provider;
                RedirectUri = redirectUri;
                UserId = userId;
            }

            public string LoginProvider { get; set; }
            public string RedirectUri { get; set; }
            public string UserId { get; set; }

            public override void ExecuteResult(ControllerContext context)
            {
                var properties = new AuthenticationProperties { RedirectUri = RedirectUri };
                if (UserId != null)
                {
                    properties.Dictionary[XsrfKey] = UserId;
                }
                context.HttpContext.GetOwinContext().Authentication.Challenge(properties, LoginProvider);
            }
        }

        private string GetBaseUrl()
        {
            var request = HttpContext.Request;
            var appUrl = HttpRuntime.AppDomainAppVirtualPath;

            if (appUrl != "/")
                appUrl = "/" + appUrl;

            var baseUrl = string.Format("{0}://{1}{2}", request.Url.Scheme, request.Url.Authority, appUrl);

            return baseUrl;
        }
        #endregion
    }
}