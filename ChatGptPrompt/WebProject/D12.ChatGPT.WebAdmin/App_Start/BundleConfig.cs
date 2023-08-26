using System.Web.Optimization;

namespace D12.ChatGPT.WebAdmin
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            //bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
            //            "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at https://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/layout/nifty.js",
                      "~/Scripts/jquery.nanoscroller.min.js",
                      "~/Scripts/Ladda/spin.min.js",
                      "~/Scripts/Ladda/ladda.min.js",
                      "~/Scripts/daterangepicker.js",
                      "~/Scripts/toastr.js",
                      "~/Scripts/numeral/numeral.js",
                      "~/Scripts/jquery.validate.min.js",
                      "~/Scripts/jquery.validate.unobtrusive.min.js",
                      "~/Scripts/moment.js",
                      "~/Scripts/bootbox.min.js",
                      "~/Scripts/papaparse.min.js",
                      "~/Scripts/jquery.twbsPagination.min.js",
                      "~/Scripts/sweetalert2.min.js",
                      "~/Scripts/libFunctions.js",
                      "~/Scripts/jquery-json-form-binding.min.js",
                      "~/Scripts/bootstrap-select.min.js",
                      "~/Scripts/Basic.js",
                      "~/Scripts/Custom.js"
                      ));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Fonts/NiftyIcons/nifty-icons.css",
                      "~/Fonts/FontAwesome/all.css",
                      "~/Fonts/OpenSans/font-OpenSans.css",
                      "~/Content/bootstrap.css",
                      "~/Content/Layout/nifty.css",
                      "~/Content/Layout/themes/type-d/theme-navy.css",
                      "~/Content/animate.css",
                      "~/Content/daterangepicker.css",
                      "~/Content/nanoscroller.css",
                      "~/Content/toastr.css",
                      "~/Content/bootstrap-select.min.css",
                      "~/Content/sweetalert2.css"
                      ));

        }
    }

}
