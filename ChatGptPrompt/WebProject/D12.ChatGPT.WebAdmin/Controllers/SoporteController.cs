using D12.ChatGPT.DataAccess;
using D12.ChatGPT.DataRepository;
using D12.ChatGPT.DTO;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace D12.ChatGPT.WebAdmin.Controllers
{
    [Authorize]
    public class SoporteController : Controller
    {
        // GET: Soporte
        public ActionResult Index()
        {
            return View();
        }
    }
}