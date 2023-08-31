using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(D12.ChatGPT.WebAdmin.Startup))]
namespace D12.ChatGPT.WebAdmin
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
