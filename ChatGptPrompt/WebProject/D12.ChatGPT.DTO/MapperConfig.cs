using AutoMapper;
using D12.ChatGPT.DataModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace D12.ChatGPT.DTO
{
    public class MapperConfig
    {
        public static MapperConfiguration MapperConfiguration()
        {
            return new MapperConfiguration(cfg =>
            {
                //ChatGPT Object to DTO
                cfg.CreateMap<Client, ClientDTO>();

                cfg.CreateMap<ClientCompany, ClientCompanyDTO>()
                     .ForMember(dest => dest.ClientName, opt => opt.MapFrom(src => src.Client.Name));

                cfg.CreateMap<ClientBusinessOffer, ClientBusinessOfferDTO>()
                     .ForMember(dest => dest.CompanyName, opt => opt.MapFrom(src => src.ClientCompany.Name))
                     .ForMember(dest => dest.OfferTypeName, opt => opt.MapFrom(src => src.BusinessTypeOffer.Name));

                cfg.CreateMap<SeoCampaign, SeoCampaignDTO>()
                     .ForMember(dest => dest.Company, opt => opt.MapFrom(src => src.ClientCompany.Name))
                     .ForMember(dest => dest.BusinessOffer, opt => opt.MapFrom(src => src.ClientBusinessOffer.Name))
                     .ForMember(dest => dest.ChatGptPromptLog, opt => opt.MapFrom(src => src.ChatGptPromptLog));

                cfg.CreateMap<SeoCampaign, SeoCampaignFullDTO>()
                     .ForMember(dest => dest.Company, opt => opt.MapFrom(src => src.ClientCompany))
                     .ForMember(dest => dest.BusinessOffer, opt => opt.MapFrom(src => src.ClientBusinessOffer))
                     .ForMember(dest => dest.Prompts, opt => opt.MapFrom(src => src.ChatGptPrompt));

                cfg.CreateMap<ChatGptPrompt, ChatGptPromptDTO>()
                     .ForMember(dest => dest.Result, opt => opt.MapFrom(src => src.ChatGptPromptResult))
                     .ForMember(dest => dest.CampaginName, opt => opt.MapFrom(src => src.SeoCampaign.Name))
                     .ForMember(dest => dest.ChatGptRol, opt => opt.MapFrom(src => src.ChatGptRol.Name))
                     .ForMember(dest => dest.ControlType, opt => opt.MapFrom(src => src.ControlType.Label))
                     .ForMember(dest => dest.Language, opt => opt.MapFrom(src => src.Language.Code))
                     .ForMember(dest => dest.Tense, opt => opt.MapFrom(src => src.Tenses.Tense))
                     .ForMember(dest => dest.ToneVoices, opt => opt.MapFrom(src => src.ChatGptPromptToneVoice));


                cfg.CreateMap<BusinessTypeOffer, BusinessTypeOfferDTO>();
                cfg.CreateMap<ChatGptPromptToneVoice, ChatGptPromptToneVoiceDTO>()
                     .ForMember(dest => dest.Tone, opt => opt.MapFrom(src => src.SeoToneVoice.Tone));

                cfg.CreateMap<ChatGptRol, ChatGptRolDTO>();
                cfg.CreateMap<ControlType, ControlTypeDTO>();
                cfg.CreateMap<Language, LanguageDTO>();
                cfg.CreateMap<Tenses, TensesDTO>();

                cfg.CreateMap<ChatGptPromptResult, ChatGptPromptResultDTO>();
                cfg.CreateMap<ChatGptPromptLog, ChatGptPromptLogDTO>();


                //ChatGPT DTO to Object
                cfg.CreateMap<ClientDTO, Client>();

                cfg.CreateMap<ClientCompanyDTO, ClientCompany>();

                cfg.CreateMap<ClientBusinessOfferDTO, ClientBusinessOffer>();

                cfg.CreateMap<SeoCampaignDTO, SeoCampaign>();

                cfg.CreateMap<ChatGptPromptDTO, ChatGptPrompt>();

                cfg.CreateMap<BusinessTypeOfferDTO, BusinessTypeOffer>();
                cfg.CreateMap<ChatGptPromptToneVoiceDTO, ChatGptPromptToneVoice>();

                cfg.CreateMap<ChatGptRolDTO, ChatGptRol>();
                cfg.CreateMap<ControlTypeDTO, ControlType>();
                cfg.CreateMap<LanguageDTO, Language>();
                cfg.CreateMap<TensesDTO, Tenses>();

                cfg.CreateMap<ChatGptPromptResultDTO, ChatGptPromptResult>();
                cfg.CreateMap<ChatGptPromptLogDTO, ChatGptPromptLog>();


            });
        }
    }
}
