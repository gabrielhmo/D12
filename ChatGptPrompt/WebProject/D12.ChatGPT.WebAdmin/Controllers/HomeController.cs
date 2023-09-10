using D12.ChatGPT.DataAccess;
using D12.ChatGPT.DataRepository;
using D12.ChatGPT.DTO;
using Microsoft.AspNet.Identity;
using System.Web.Mvc;

namespace D12.ChatGPT.WebAdmin.Controllers
{
    [Authorize]
    public class HomeController : Controller
    {
        private const string SiteMapName = "Home";

        private UnitOfWork unitWork = new UnitOfWork(new HOnlineDbContext());

        private SiteMapRolPolicyDTO siteMapRolPolicyDTO = new SiteMapRolPolicyDTO();
        bool isReadOnly = true;

        public HomeController()
        {
            string currentUserId = System.Web.HttpContext.Current.User.Identity.GetUserId();
            siteMapRolPolicyDTO = unitWork.SiteMapPolicies.GetPolicyBySiteMapByUser(currentUserId, SiteMapName);
            //Set if user is ReadOnly
            isReadOnly = (siteMapRolPolicyDTO.Write == false);
        }

        [Authorize]
        public ActionResult Index()
        {
            ViewBag.IsReadOnly = isReadOnly;
            return View();
        }
    }
}