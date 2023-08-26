using D12.ChatGPT.DataAccess;
using D12.ChatGPT.DataModel;
using D12.ChatGPT.DataRepository.Interface;
using D12.ChatGPT.DTO;
using EntityFrameworkPaginate;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Remoting.Contexts;
using System.Text;
using System.Threading.Tasks;

namespace D12.ChatGPT.DataRepository
{
    public class SeoToneVoiceRepository : Repository<SeoToneVoice>, ISeoToneVoiceRepository
    {
        public SeoToneVoiceRepository(HOnlineDbContext context) : base(context) { }
        public Page<SeoToneVoiceDTO> GetSeoToneVoiceDTO(int pageNumber, int pageSize, Sorts<SeoToneVoiceDTO> sort = null, Filters<SeoToneVoiceDTO> filter = null)
        {
            if (sort == null)
                sort = new Sorts<SeoToneVoiceDTO>();

            if (filter == null)
                filter = new Filters<SeoToneVoiceDTO>();

            return dbContext.SeoToneVoice
                .Select(x => new SeoToneVoiceDTO
                {
                    Id = x.Id,
                    Tone = x.Tone,
                    Active = x.Active,
                })
                .Paginate<SeoToneVoiceDTO>(pageNumber, pageSize, sort, filter);
        }
        public SeoToneVoiceDTO LoadSeoToneVoiceDTO(short id)
        {
            return dbContext.SeoToneVoice
                .Where(x => x.Id == id)
                .Select(x => new SeoToneVoiceDTO
                {
                    Id = x.Id,
                    Tone = x.Tone,
                    Active = x.Active,
                })
                .FirstOrDefault();
        }
        public IEnumerable<SelectItemsDTO> GetSeoToneVoiceSelectList()
        {
            return dbContext.SeoToneVoice
                .Select(x => new SelectItemsDTO { Id = x.Id.ToString(), Text = x.Tone })
                .ToList();
        }

        public IEnumerable<ChatGptContextToneVoiceDTO> GetSeoToneVoiceDTOBySegmentId(long contextId)
        {
            return dbContext.ChatGptContextToneVoice
                .Where(x => x.ContextId == contextId)
                .Select(x => new ChatGptContextToneVoiceDTO
                {
                    Id = x.Id,
                    ContextId = x.ContextId,
                    ToneVoiceId = x.ToneVoiceId,
                }).ToList();
        }
    }
}
