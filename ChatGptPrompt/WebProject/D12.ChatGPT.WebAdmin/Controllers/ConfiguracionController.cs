using D12.ChatGPT.DataAccess;
using D12.ChatGPT.DataRepository;
using D12.ChatGPT.DTO;
using Microsoft.AspNet.Identity;
using System.Web.Mvc;

namespace D12.ChatGPT.WebAdmin.Controllers
{
    [RouteArea("Ajustes")]
    [RoutePrefix("Configuracion")]
    [Route("{action=Index}")]
    [Authorize]
    public class ConfiguracionController : Controller
    {
        // GET: Ajustes
        public ActionResult Index()
        {
            return View();
        }
    }
}