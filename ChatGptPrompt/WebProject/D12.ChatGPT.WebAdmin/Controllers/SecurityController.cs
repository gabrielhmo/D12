using AutoMapper;
using D12.ChatGPT.DataAccess;
using D12.ChatGPT.DataRepository;
using D12.ChatGPT.DTO;
using Microsoft.AspNet.Identity;
using System.Web.Mvc;

namespace D12.ChatGPT.WebAdmin.Controllers
{
    [RouteArea("Settings")]
    [RoutePrefix("Security")]
    [Route("{action=Index}")]
    [Authorize]
    public class SecurityController : Controller
    {
        private const string SiteMapName = "Security";

        private UnitOfWork unitWork = new UnitOfWork(new HOnlineDbContext());
        private SiteMapRolPolicyDTO siteMapRolPolicyDTO = new SiteMapRolPolicyDTO();
        bool isReadOnly = true;
        private IMapper imapper;

        public SecurityController()
        {
            var currentUser = System.Web.HttpContext.Current.User;
            siteMapRolPolicyDTO = unitWork.SiteMapPolicies.GetPolicyBySiteMapByUser(currentUser.Identity.GetUserId(), SiteMapName);
            //Set if user is ReadOnly
            isReadOnly = (siteMapRolPolicyDTO.Write == false);

            if (currentUser.IsInRole("Administrador"))
                isReadOnly = false;

            imapper = MvcApplication.MapperConfiguration.CreateMapper();

            isReadOnly = false;
        }

        [Authorize(Roles = "Administrador")]
        // GET: Security
        public ActionResult Users()
        {
            ViewBag.IsReadOnly = isReadOnly;
            return View();
        }
        [Authorize(Roles = "Administrador")]

        public ActionResult Roles()
        {
            ViewBag.IsReadOnly = isReadOnly;
            return View();
        }
        [Authorize(Roles = "Administrador")]
        public ActionResult SiteMap()
        {
            ViewBag.IsReadOnly = isReadOnly;
            return View();
        }


    }
}