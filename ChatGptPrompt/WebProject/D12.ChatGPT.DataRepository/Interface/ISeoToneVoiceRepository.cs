using D12.ChatGPT.DataModel;
using D12.ChatGPT.DTO;
using EntityFrameworkPaginate;
using System.Collections.Generic;

namespace D12.ChatGPT.DataRepository.Interface
{
    public interface ISeoToneVoiceRepository : IRepository<SeoToneVoice>
    {
        Page<SeoToneVoiceDTO> GetSeoToneVoiceDTO(int pageNumber, int pageSize, Sorts<SeoToneVoiceDTO> sort = null, Filters<SeoToneVoiceDTO> filter = null);
        IEnumerable<ChatGptPromptToneVoiceDTO> GetSeoToneVoiceDTOBySegmentId(long segmentId);
        SeoToneVoiceDTO LoadSeoToneVoiceDTO(short id);
        IEnumerable<SelectItemsDTO> GetSeoToneVoiceSelectList();
    }
}
