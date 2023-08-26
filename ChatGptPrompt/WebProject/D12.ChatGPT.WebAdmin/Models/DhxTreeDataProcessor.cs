using System;
using System.Collections.Generic;

namespace D12.ChatGPT.WebAdmin.Models
{
    public class DhxTreeDataProcessor
    {
        public string Ids { get; set; }
        public short trId { get; set; }
        public short trpId { get; set; }
        public short trOrder { get; set; }
        public string trText { get; set; }
        public string trAction { get; set; }
        public string trUrlPath { get; set; }
        public bool Active { get; set; }
        public List<short> NewOrder { get; set; }

        public DhxTreeDataProcessor() { }
        public DhxTreeDataProcessor(string ids, string trpId, string trOrder, string trText, string dpAction, string urlPath, string active)
        {
            this.Ids = (!string.IsNullOrEmpty(ids)) ? ids : string.Empty;
            this.trpId = (!string.IsNullOrEmpty(trpId)) ? Convert.ToInt16(trpId) : (short)0;
            this.trOrder = (!string.IsNullOrEmpty(trOrder)) ? Convert.ToInt16(trOrder) : (short)0;
            this.trText = (!string.IsNullOrEmpty(trText)) ? trText : string.Empty;
            this.trAction = (!string.IsNullOrEmpty(dpAction)) ? dpAction : string.Empty;
            this.Active = (active == "1") ? true : false;
            this.trUrlPath = urlPath;

            if (trAction != "inserted")
            {
                this.trId = (!string.IsNullOrEmpty(ids)) ? Convert.ToInt16(ids) : (short)0;
            }
            else
            {
                this.trId = 0;
            }
        }
        public void SetNewOrder(string newOrder)
        {
            if (!String.IsNullOrEmpty(newOrder))
            {
                this.NewOrder = new List<short>(Array.ConvertAll(newOrder.Split(','), Int16.Parse));

                if (trAction == "deleted")
                    this.NewOrder.Remove(this.trId);
            }
        }
    }
}