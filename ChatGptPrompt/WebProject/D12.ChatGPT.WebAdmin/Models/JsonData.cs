using HermosilloOnlineLib;
using System.Collections.Generic;

namespace D12.ChatGPT.WebAdmin.Models
{
    public enum RequestAction { Add = 0, Update = 1, Delete = 2, Cancel = 3, Error = 4 }
    public enum ResultType { Error = 0, Success = 1, Info = 2, Warning = 3, Unknown = 4, None = 5 }
    public class JsonData
    {
        #region Properties

        public object Data { get; set; }
        public int StatusCode { get; set; }

        public bool Result = true;
        public string Title { get; set; }
        public string Message { get; set; }
        public string Action { get; set; }
        public ResultType MessageType { get; set; }
        public string ReturnUrl { get; set; }
        public List<ExceptionInfo> Errors { get; set; }
        public List<string> ValidationError { get; set; }

        #endregion Properties

        #region Constructors
        public JsonData()
        {
            this.Errors = new List<ExceptionInfo>();
            this.ValidationError = new List<string>();
        }

        #endregion
    }
}