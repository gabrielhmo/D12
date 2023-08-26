using System;

namespace D12.ChatGPT.DataRepository
{
    public class QueryParameters
    {
        public Int64 TotalRecords { get; set; }
        public int PageSize { get; set; }
        public int TotalPages { get; set; }
        public int PageNumber { get; set; }
        public int PageStartIndex { get; set; }
        public int PageEndIndex { get; set; }

        public QueryParameters()
        {
            this.TotalRecords = 0;
            this.PageSize = 100;
            this.TotalPages = 1;
            this.PageNumber = 1;
            this.PageStartIndex = 1;
            this.PageEndIndex = 1;
        }

        public QueryParameters(UInt16 pagesize, UInt16 pagenumber)
        {
            if (pagesize > this.PageSize)
                this.PageSize = pagesize;

            if (pagenumber > 1)
                this.PageNumber = pagenumber;
        }
    }
}
