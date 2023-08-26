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
                cfg.CreateMap<Client, ClientDTO>()
                     .ForMember(dest => dest.ClientCompany, opt => opt.MapFrom(src => src.ClientCompany));

                cfg.CreateMap<ClientCompany, ClientCompanyDTO>()
                     .ForMember(dest => dest.ClientName, opt => opt.MapFrom(src => src.Client.Name))
                     .ForMember(dest => dest.ClientBusinessOffer, opt => opt.MapFrom(src => src.ClientBusinessOffer));

                cfg.CreateMap<ClientBusinessOffer, ClientBusinessOfferDTO>()
                     .ForMember(dest => dest.CompanyName, opt => opt.MapFrom(src => src.ClientCompany.Name))
                     .ForMember(dest => dest.OfferTypeName, opt => opt.MapFrom(src => src.BusinessTypeOffer.Name));

                cfg.CreateMap<SeoCampaign, SeoCampaignDTO>()
                     .ForMember(dest => dest.Company, opt => opt.MapFrom(src => src.ClientCompany.Name))
                     .ForMember(dest => dest.BusinessOffer, opt => opt.MapFrom(src => src.ClientBusinessOffer.Name))
                     .ForMember(dest => dest.ChatGptContext, opt => opt.MapFrom(src => src.ChatGptContext));

                cfg.CreateMap<ChatGptContext, ChatGptContextDTO>()
                     .ForMember(dest => dest.ChatGptRol, opt => opt.MapFrom(src => src.ChatGptRol.Name))
                     .ForMember(dest => dest.ControlType, opt => opt.MapFrom(src => src.ControlType.Label))
                     .ForMember(dest => dest.Language, opt => opt.MapFrom(src => src.Language.Code))
                     .ForMember(dest => dest.Tense, opt => opt.MapFrom(src => src.Tenses.Tense));


                cfg.CreateMap<ChatGptPrompt, ChatGptPrompt>()
                    .ForMember(dest => dest.ChatGptPromptResult, opt => opt.MapFrom(src => src.ChatGptPromptResult))
                    .ForMember(dest => dest.ChatGptPromptLog, opt => opt.MapFrom(src => src.ChatGptPromptLog));

                cfg.CreateMap<BusinessTypeOffer, BusinessTypeOfferDTO>();
                cfg.CreateMap<ChatGptRol, ChatGptRolDTO>();
                cfg.CreateMap<ControlType, ControlTypeDTO>();
                cfg.CreateMap<Language, LanguageDTO>();
                cfg.CreateMap<Tenses, TensesDTO>();

                cfg.CreateMap<ChatGptPromptResult, ChatGptPromptResultDTO>();
                cfg.CreateMap<ChatGptPromptLog, ChatGptPromptLogDTO>();


                //ChatGPT DTO to Object
                cfg.CreateMap<ClientDTO, Client>()
                     .ForMember(dest => dest.ClientCompany, opt => opt.MapFrom(src => src.ClientCompany));

                cfg.CreateMap<ClientCompanyDTO, ClientCompany>()
                     .ForMember(dest => dest.ClientBusinessOffer, opt => opt.MapFrom(src => src.ClientBusinessOffer));

                cfg.CreateMap<ClientBusinessOfferDTO, ClientBusinessOffer>();

                cfg.CreateMap<SeoCampaignDTO, SeoCampaign>()
                     .ForMember(dest => dest.ChatGptContext, opt => opt.MapFrom(src => src.ChatGptContext));

                cfg.CreateMap<ChatGptContextDTO, ChatGptContext>();

                cfg.CreateMap<ChatGptPromptDTO, ChatGptPrompt>()
                    .ForMember(dest => dest.ChatGptPromptResult, opt => opt.MapFrom(src => src.ChatGptPromptResult))
                    .ForMember(dest => dest.ChatGptPromptLog, opt => opt.MapFrom(src => src.ChatGptPromptLog));

                cfg.CreateMap<BusinessTypeOfferDTO, BusinessTypeOffer>();
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
