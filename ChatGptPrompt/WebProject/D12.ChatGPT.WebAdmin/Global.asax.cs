using AutoMapper;
using D12.ChatGPT.DTO;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace D12.ChatGPT.WebAdmin
{
    public class MvcApplication : System.Web.HttpApplication
    {
        internal static MapperConfiguration MapperConfiguration { get; private set; }

        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);

            //Mapper
            MapperConfiguration = MapperConfig.MapperConfiguration();

        }
    }
}
