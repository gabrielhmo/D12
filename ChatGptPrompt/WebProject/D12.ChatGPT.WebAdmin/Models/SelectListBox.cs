using System.Web.Mvc;

namespace D12.ChatGPT.WebAdmin.Models
{
    public class SelectListBox
    {
        public string Placeholder { get; set; }
        public bool MultiSelect { get; set; }
        public SelectList ListItems { get; set; }
    }
}