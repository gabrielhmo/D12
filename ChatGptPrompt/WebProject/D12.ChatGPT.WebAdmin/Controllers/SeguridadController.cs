using D12.ChatGPT.DataAccess;
using D12.ChatGPT.DataRepository;
using D12.ChatGPT.DTO;
using Microsoft.AspNet.Identity;
using System.Web.Mvc;

namespace D12.ChatGPT.WebAdmin.Controllers
{
    [RouteArea("Ajustes")]
    [RoutePrefix("Seguridad")]
    [Route("{action=Index}")]
    [Authorize]
    public class SeguridadController : Controller
    {
        private const string SiteMapName = "Usuarios";

        private UnitOfWork unitWork = new UnitOfWork(new HOnlineDbContext());

        private SiteMapRolPolicyDTO siteMapRolPolicyDTO = new SiteMapRolPolicyDTO();
        bool isReadOnly = true;

        public SeguridadController()
        {
            string currentUserId = System.Web.HttpContext.Current.User.Identity.GetUserId();
            siteMapRolPolicyDTO = unitWork.SiteMapPolicies.GetPolicyBySiteMapByUser(currentUserId, SiteMapName);
            //Set if user is ReadOnly
            isReadOnly = (siteMapRolPolicyDTO.Write == false);
        }

        [Authorize(Roles = "Administrador")]
        // GET: Usuarios
        public ActionResult Usuarios()
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