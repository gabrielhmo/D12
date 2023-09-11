USE [D12ChatGpt]
GO
/****** Object:  Table [dbo].[AspNetRoles]    Script Date: 10/09/2023 06:53:55 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetRoles](
	[Id] [nvarchar](128) NOT NULL,
	[Name] [nvarchar](256) NOT NULL,
 CONSTRAINT [PK_dbo.AspNetRoles] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetUserClaims]    Script Date: 10/09/2023 06:53:55 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUserClaims](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [nvarchar](128) NOT NULL,
	[ClaimType] [nvarchar](max) NULL,
	[ClaimValue] [nvarchar](max) NULL,
 CONSTRAINT [PK_dbo.AspNetUserClaims] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetUserLogins]    Script Date: 10/09/2023 06:53:55 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUserLogins](
	[LoginProvider] [nvarchar](128) NOT NULL,
	[ProviderKey] [nvarchar](128) NOT NULL,
	[UserId] [nvarchar](128) NOT NULL,
 CONSTRAINT [PK_dbo.AspNetUserLogins] PRIMARY KEY CLUSTERED 
(
	[LoginProvider] ASC,
	[ProviderKey] ASC,
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetUserRoles]    Script Date: 10/09/2023 06:53:55 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUserRoles](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [nvarchar](128) NOT NULL,
	[RoleId] [nvarchar](128) NOT NULL,
 CONSTRAINT [PK_dbo.AspNetUserRoles] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetUsers]    Script Date: 10/09/2023 06:53:55 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUsers](
	[Id] [nvarchar](128) NOT NULL,
	[FirstName] [varchar](30) NULL,
	[LastName] [varchar](30) NULL,
	[JobTitle] [varchar](30) NULL,
	[LastAccess] [smalldatetime] NULL,
	[EntryDate] [smalldatetime] NOT NULL,
	[Email] [varchar](120) NULL,
	[EmailConfirmed] [bit] NOT NULL,
	[PasswordHash] [nvarchar](max) NULL,
	[SecurityStamp] [nvarchar](max) NULL,
	[PhoneNumber] [nvarchar](max) NULL,
	[PhoneNumberConfirmed] [bit] NOT NULL,
	[TwoFactorEnabled] [bit] NOT NULL,
	[LockoutEndDateUtc] [datetime] NULL,
	[LockoutEnabled] [bit] NOT NULL,
	[AccessFailedCount] [int] NOT NULL,
	[UserName] [varchar](15) NOT NULL,
	[Active] [bit] NOT NULL,
	[ReadOnly] [bit] NOT NULL,
	[Deleted] [bit] NOT NULL,
 CONSTRAINT [PK_dbo.AspNetUsers] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [UK_AspNetUsers_FullName] UNIQUE NONCLUSTERED 
(
	[FirstName] ASC,
	[LastName] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[BusinessActivityType]    Script Date: 10/09/2023 06:53:55 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[BusinessActivityType](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](50) NOT NULL,
	[Active] [bit] NOT NULL,
 CONSTRAINT [PK_BusinessActivityType] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[BusinessTypeOffer]    Script Date: 10/09/2023 06:53:55 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[BusinessTypeOffer](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](50) NOT NULL,
	[Active] [bit] NOT NULL,
 CONSTRAINT [PK_BusinessTypeOffer] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [UK_BusinessTypeOffer_Name] UNIQUE NONCLUSTERED 
(
	[Name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ChatGPTPrompt]    Script Date: 10/09/2023 06:53:55 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ChatGPTPrompt](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[SeoCampaignId] [bigint] NOT NULL,
	[ChatGPTRolId] [int] NOT NULL,
	[ControlTypeId] [int] NOT NULL,
	[LanguageCode] [char](3) NOT NULL,
	[TenseId] [int] NULL,
	[Name] [varchar](80) NOT NULL,
	[Prompt] [varchar](max) NOT NULL,
	[MinLength] [int] NULL,
	[MaxLength] [int] NULL,
	[MinWord] [int] NULL,
	[MaxWord] [int] NULL,
	[MaxPromptResult] [int] NOT NULL,
	[Sent] [bit] NOT NULL,
	[SentDate] [smalldatetime] NULL,
	[Active] [bit] NOT NULL,
	[EntryDate] [smalldatetime] NOT NULL,
 CONSTRAINT [PK_ChatGPTPrompt] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ChatGPTPromptLog]    Script Date: 10/09/2023 06:53:55 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ChatGPTPromptLog](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[CampaignId] [bigint] NOT NULL,
	[Message] [varchar](1000) NOT NULL,
	[Type] [varchar](150) NULL,
	[Code] [varchar](150) NULL,
	[Param] [varchar](150) NULL,
	[EntryDate] [smalldatetime] NOT NULL,
 CONSTRAINT [PK_ChatGPTPromptLog] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ChatGPTPromptResult]    Script Date: 10/09/2023 06:53:55 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ChatGPTPromptResult](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[PromptId] [bigint] NOT NULL,
	[Response] [varchar](max) NOT NULL,
	[DateRequest] [smalldatetime] NULL,
	[Active] [bit] NULL,
	[EntryDate] [smalldatetime] NULL,
 CONSTRAINT [PK_ChatGPTPromptResult] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ChatGPTPromptToneVoice]    Script Date: 10/09/2023 06:53:55 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ChatGPTPromptToneVoice](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[PromptId] [bigint] NOT NULL,
	[ToneVoiceId] [smallint] NOT NULL,
 CONSTRAINT [PK_ChatGPTPromptToneVoice] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ChatGPTRol]    Script Date: 10/09/2023 06:53:55 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ChatGPTRol](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](50) NOT NULL,
	[Active] [bit] NOT NULL,
 CONSTRAINT [PK_ChatGPTRol] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [UK_ChatGPTRol_Rol] UNIQUE NONCLUSTERED 
(
	[Name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Client]    Script Date: 10/09/2023 06:53:55 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Client](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](50) NOT NULL,
	[Email] [varchar](80) NOT NULL,
	[Active] [bit] NOT NULL,
	[EntryDate] [smalldatetime] NOT NULL,
 CONSTRAINT [PK_Client] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [UK_Client_Email] UNIQUE NONCLUSTERED 
(
	[Email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [UK_Client_Name] UNIQUE NONCLUSTERED 
(
	[Name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ClientBusinessOffer]    Script Date: 10/09/2023 06:53:55 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ClientBusinessOffer](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[CompanyId] [int] NOT NULL,
	[OfferTypeId] [int] NOT NULL,
	[Name] [varchar](120) NULL,
	[Description] [varchar](1000) NULL,
	[Characteristics] [varchar](3000) NULL,
	[Active] [bit] NOT NULL,
	[EntryDate] [smalldatetime] NOT NULL,
 CONSTRAINT [PK_ClientBusinessOffer] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ClientCompany]    Script Date: 10/09/2023 06:53:55 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ClientCompany](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ClientId] [int] NOT NULL,
	[Name] [varchar](120) NOT NULL,
	[Industry] [varchar](500) NULL,
	[Activity] [varchar](500) NULL,
	[Active] [bit] NOT NULL,
	[EntryDate] [smalldatetime] NOT NULL,
 CONSTRAINT [PK_ClientCompany] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [UK_ClientCompany_ClientId_Name] UNIQUE NONCLUSTERED 
(
	[ClientId] ASC,
	[Name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ControlType]    Script Date: 10/09/2023 06:53:55 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ControlType](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Label] [varchar](50) NULL,
	[Type] [varchar](50) NOT NULL,
	[Active] [bit] NOT NULL,
 CONSTRAINT [PK_ControlType] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Language]    Script Date: 10/09/2023 06:53:55 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Language](
	[Code] [char](3) NOT NULL,
	[Label] [varchar](30) NOT NULL,
	[Active] [bit] NOT NULL,
 CONSTRAINT [PK_Language] PRIMARY KEY CLUSTERED 
(
	[Code] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [UK_Language_Label] UNIQUE NONCLUSTERED 
(
	[Label] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SEO_Tag]    Script Date: 10/09/2023 06:53:55 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SEO_Tag](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[TagGroupId] [int] NOT NULL,
	[Name] [varchar](80) NOT NULL,
	[Active] [bit] NOT NULL,
 CONSTRAINT [PK_SEO_Tag] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SEO_TagGroup]    Script Date: 10/09/2023 06:53:55 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SEO_TagGroup](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[GroupTypeId] [int] NOT NULL,
	[Name] [varchar](80) NOT NULL,
	[Description] [varchar](250) NULL,
	[Active] [bit] NOT NULL,
	[EntryDate] [smalldatetime] NOT NULL,
 CONSTRAINT [PK_SEO_TagGroup] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SEO_TagGroupType]    Script Date: 10/09/2023 06:53:55 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SEO_TagGroupType](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Label] [varchar](80) NOT NULL,
	[Active] [bit] NOT NULL,
 CONSTRAINT [PK_SEO_TagGroupType] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SEO_ToneVoice]    Script Date: 10/09/2023 06:53:55 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SEO_ToneVoice](
	[Id] [smallint] IDENTITY(1,1) NOT NULL,
	[Tone] [varchar](80) NOT NULL,
	[Active] [bit] NOT NULL,
 CONSTRAINT [PK_SEO_ToneVoice] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [UK_SEO_ToneVoice_Tone] UNIQUE NONCLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SEOCampaign]    Script Date: 10/09/2023 06:53:55 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SEOCampaign](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[CompanyId] [int] NOT NULL,
	[BusinessOfferId] [int] NOT NULL,
	[Name] [varchar](120) NOT NULL,
	[Description] [varchar](500) NULL,
	[Market] [varchar](120) NULL,
	[PrimaryKeyword] [varchar](50) NULL,
	[Keywords] [varchar](500) NULL,
	[Active] [bit] NOT NULL,
	[EntryDate] [smalldatetime] NOT NULL,
 CONSTRAINT [PK_SEOCampaign] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SiteMap]    Script Date: 10/09/2023 06:53:55 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SiteMap](
	[Id] [smallint] IDENTITY(1,1) NOT NULL,
	[ParentId] [smallint] NOT NULL,
	[Name] [varchar](50) NOT NULL,
	[Index] [smallint] NOT NULL,
	[UrlPath] [varchar](2048) NULL,
	[NewWindows] [bit] NOT NULL,
	[OnClick] [varchar](80) NULL,
	[IsPublic] [bit] NOT NULL,
	[Active] [bit] NOT NULL,
	[Deleted] [bit] NOT NULL,
 CONSTRAINT [PK_SiteMap] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [UK_SiteMap_Name] UNIQUE NONCLUSTERED 
(
	[Name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SiteMapPolicies]    Script Date: 10/09/2023 06:53:55 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SiteMapPolicies](
	[Id] [smallint] IDENTITY(1,1) NOT NULL,
	[RolId] [nvarchar](128) NOT NULL,
	[SiteMapId] [smallint] NOT NULL,
	[Read] [bit] NOT NULL,
	[Write] [bit] NOT NULL,
 CONSTRAINT [PK_SiteMapPolicies] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Tenses]    Script Date: 10/09/2023 06:53:55 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Tenses](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Tense] [varchar](50) NOT NULL,
	[Active] [bit] NOT NULL,
 CONSTRAINT [PK_Tenses] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[AspNetRoles] ADD  CONSTRAINT [DF_AspNetRoles_Id]  DEFAULT (newid()) FOR [Id]
GO
ALTER TABLE [dbo].[AspNetUsers] ADD  CONSTRAINT [DF_AspNetUsers_Id]  DEFAULT (newid()) FOR [Id]
GO
ALTER TABLE [dbo].[AspNetUsers] ADD  CONSTRAINT [DF_AspNetUsers_EntryDate]  DEFAULT (getdate()) FOR [EntryDate]
GO
ALTER TABLE [dbo].[AspNetUsers] ADD  CONSTRAINT [DF_AspNetUsers_EmailConfirmed]  DEFAULT ((1)) FOR [EmailConfirmed]
GO
ALTER TABLE [dbo].[AspNetUsers] ADD  CONSTRAINT [DF_AspNetUsers_PhoneNumberConfirmed]  DEFAULT ((1)) FOR [PhoneNumberConfirmed]
GO
ALTER TABLE [dbo].[AspNetUsers] ADD  CONSTRAINT [DF_AspNetUsers_TwoFactorEnabled]  DEFAULT ((0)) FOR [TwoFactorEnabled]
GO
ALTER TABLE [dbo].[AspNetUsers] ADD  CONSTRAINT [DF_AspNetUsers_LockoutEnabled]  DEFAULT ((0)) FOR [LockoutEnabled]
GO
ALTER TABLE [dbo].[AspNetUsers] ADD  CONSTRAINT [DF_AspNetUsers_AccessFailedCount]  DEFAULT ((0)) FOR [AccessFailedCount]
GO
ALTER TABLE [dbo].[AspNetUsers] ADD  CONSTRAINT [DF__AspNetUse__Activ__3D5E1FD2]  DEFAULT ((0)) FOR [Active]
GO
ALTER TABLE [dbo].[AspNetUsers] ADD  CONSTRAINT [DF_AspNetUsers_ReadOnly]  DEFAULT ((0)) FOR [ReadOnly]
GO
ALTER TABLE [dbo].[AspNetUsers] ADD  CONSTRAINT [DF__AspNetUse__Delet__48CFD27E]  DEFAULT ((0)) FOR [Deleted]
GO
ALTER TABLE [dbo].[BusinessActivityType] ADD  CONSTRAINT [DF_BusinessActivityType_Active]  DEFAULT ((1)) FOR [Active]
GO
ALTER TABLE [dbo].[BusinessTypeOffer] ADD  CONSTRAINT [DF_BusinessTypeOffer_Active]  DEFAULT ((1)) FOR [Active]
GO
ALTER TABLE [dbo].[ChatGPTPrompt] ADD  CONSTRAINT [DF_ChatGPTPrompt_ChatRolId]  DEFAULT ((2)) FOR [ChatGPTRolId]
GO
ALTER TABLE [dbo].[ChatGPTPrompt] ADD  CONSTRAINT [DF_ChatGPTPrompt_LanguageCode]  DEFAULT ('ENG') FOR [LanguageCode]
GO
ALTER TABLE [dbo].[ChatGPTPrompt] ADD  CONSTRAINT [DF_ChatGPTPrompt_MaxPromptResult]  DEFAULT ((1)) FOR [MaxPromptResult]
GO
ALTER TABLE [dbo].[ChatGPTPrompt] ADD  CONSTRAINT [DF_ChatGPTPrompt_Sent]  DEFAULT ((0)) FOR [Sent]
GO
ALTER TABLE [dbo].[ChatGPTPrompt] ADD  CONSTRAINT [DF_ChatGPTPrompt_Active]  DEFAULT ((1)) FOR [Active]
GO
ALTER TABLE [dbo].[ChatGPTPrompt] ADD  CONSTRAINT [DF_ChatGPTPrompt_EntryDate]  DEFAULT (getdate()) FOR [EntryDate]
GO
ALTER TABLE [dbo].[ChatGPTPromptLog] ADD  CONSTRAINT [DF_ChatGPTPromptLog_EntryDate]  DEFAULT (getdate()) FOR [EntryDate]
GO
ALTER TABLE [dbo].[ChatGPTPromptResult] ADD  CONSTRAINT [DF_Table1_Sent]  DEFAULT ((0)) FOR [DateRequest]
GO
ALTER TABLE [dbo].[ChatGPTPromptResult] ADD  CONSTRAINT [DF_ChatGPTPromptResult_Active]  DEFAULT ((0)) FOR [Active]
GO
ALTER TABLE [dbo].[ChatGPTRol] ADD  CONSTRAINT [DF_ChatGPTRol_Active]  DEFAULT ((1)) FOR [Active]
GO
ALTER TABLE [dbo].[Client] ADD  CONSTRAINT [DF_Client_Active]  DEFAULT ((1)) FOR [Active]
GO
ALTER TABLE [dbo].[Client] ADD  CONSTRAINT [DF_Client_EntryDate]  DEFAULT (getdate()) FOR [EntryDate]
GO
ALTER TABLE [dbo].[ClientBusinessOffer] ADD  CONSTRAINT [DF_ClientBusinessOffer_Active]  DEFAULT ((1)) FOR [Active]
GO
ALTER TABLE [dbo].[ClientBusinessOffer] ADD  CONSTRAINT [DF_ClientBusinessOffer_EntryDate]  DEFAULT (getdate()) FOR [EntryDate]
GO
ALTER TABLE [dbo].[ClientCompany] ADD  CONSTRAINT [DF_ClientCompany_Active]  DEFAULT ((1)) FOR [Active]
GO
ALTER TABLE [dbo].[ClientCompany] ADD  CONSTRAINT [DF_ClientCompany_EntryDate]  DEFAULT (getdate()) FOR [EntryDate]
GO
ALTER TABLE [dbo].[ControlType] ADD  CONSTRAINT [DF_ControlType_Active]  DEFAULT ((1)) FOR [Active]
GO
ALTER TABLE [dbo].[Language] ADD  CONSTRAINT [DF_Language_Active]  DEFAULT ((1)) FOR [Active]
GO
ALTER TABLE [dbo].[SEO_Tag] ADD  CONSTRAINT [DF_SEO_Tag_Active]  DEFAULT ((1)) FOR [Active]
GO
ALTER TABLE [dbo].[SEO_TagGroup] ADD  CONSTRAINT [DF_SEO_TagGroup_Active]  DEFAULT ((1)) FOR [Active]
GO
ALTER TABLE [dbo].[SEO_TagGroup] ADD  CONSTRAINT [DF_SEO_TagGroup_EntryDate]  DEFAULT (getdate()) FOR [EntryDate]
GO
ALTER TABLE [dbo].[SEO_TagGroupType] ADD  CONSTRAINT [DF_SEO_TagGroupType_Active]  DEFAULT ((1)) FOR [Active]
GO
ALTER TABLE [dbo].[SEO_ToneVoice] ADD  CONSTRAINT [DF_SEO_ToneVoice_Active]  DEFAULT ((1)) FOR [Active]
GO
ALTER TABLE [dbo].[SEOCampaign] ADD  CONSTRAINT [DF_SEOCampaign_Active]  DEFAULT ((1)) FOR [Active]
GO
ALTER TABLE [dbo].[SEOCampaign] ADD  CONSTRAINT [DF_SEOCampaign_EntryDate]  DEFAULT (getdate()) FOR [EntryDate]
GO
ALTER TABLE [dbo].[SiteMap] ADD  CONSTRAINT [DF_SiteMap_NewWindows]  DEFAULT ((0)) FOR [NewWindows]
GO
ALTER TABLE [dbo].[SiteMap] ADD  CONSTRAINT [DF_SiteMap_IsPublic]  DEFAULT ((0)) FOR [IsPublic]
GO
ALTER TABLE [dbo].[SiteMap] ADD  CONSTRAINT [DF_SiteMap_Active]  DEFAULT ((1)) FOR [Active]
GO
ALTER TABLE [dbo].[SiteMap] ADD  CONSTRAINT [DF_SiteMap_Deleted]  DEFAULT ((0)) FOR [Deleted]
GO
ALTER TABLE [dbo].[SiteMapPolicies] ADD  CONSTRAINT [DF_Table_1_View]  DEFAULT ((0)) FOR [Read]
GO
ALTER TABLE [dbo].[SiteMapPolicies] ADD  CONSTRAINT [DF_SiteMapPolicies_Write]  DEFAULT ((0)) FOR [Write]
GO
ALTER TABLE [dbo].[Tenses] ADD  CONSTRAINT [DF_Tenses_Tenses]  DEFAULT ((1)) FOR [Tense]
GO
ALTER TABLE [dbo].[Tenses] ADD  CONSTRAINT [DF_Tenses_Active]  DEFAULT ((1)) FOR [Active]
GO
ALTER TABLE [dbo].[AspNetUserClaims]  WITH CHECK ADD  CONSTRAINT [FK_dbo.AspNetUserClaims_dbo.AspNetUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserClaims] CHECK CONSTRAINT [FK_dbo.AspNetUserClaims_dbo.AspNetUsers_UserId]
GO
ALTER TABLE [dbo].[AspNetUserLogins]  WITH CHECK ADD  CONSTRAINT [FK_dbo.AspNetUserLogins_dbo.AspNetUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserLogins] CHECK CONSTRAINT [FK_dbo.AspNetUserLogins_dbo.AspNetUsers_UserId]
GO
ALTER TABLE [dbo].[AspNetUserRoles]  WITH CHECK ADD  CONSTRAINT [FK_dbo.AspNetUserRoles_dbo.AspNetRoles_RoleId] FOREIGN KEY([RoleId])
REFERENCES [dbo].[AspNetRoles] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserRoles] CHECK CONSTRAINT [FK_dbo.AspNetUserRoles_dbo.AspNetRoles_RoleId]
GO
ALTER TABLE [dbo].[AspNetUserRoles]  WITH CHECK ADD  CONSTRAINT [FK_dbo.AspNetUserRoles_dbo.AspNetUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserRoles] CHECK CONSTRAINT [FK_dbo.AspNetUserRoles_dbo.AspNetUsers_UserId]
GO
ALTER TABLE [dbo].[AspNetUsers]  WITH CHECK ADD  CONSTRAINT [FK_AspNetUsers_AspNetUsers] FOREIGN KEY([Id])
REFERENCES [dbo].[AspNetUsers] ([Id])
GO
ALTER TABLE [dbo].[AspNetUsers] CHECK CONSTRAINT [FK_AspNetUsers_AspNetUsers]
GO
ALTER TABLE [dbo].[ChatGPTPrompt]  WITH CHECK ADD  CONSTRAINT [FK_ChatGPTPrompt_ChatGPTRol] FOREIGN KEY([ChatGPTRolId])
REFERENCES [dbo].[ChatGPTRol] ([Id])
GO
ALTER TABLE [dbo].[ChatGPTPrompt] CHECK CONSTRAINT [FK_ChatGPTPrompt_ChatGPTRol]
GO
ALTER TABLE [dbo].[ChatGPTPrompt]  WITH CHECK ADD  CONSTRAINT [FK_ChatGPTPrompt_ControlType] FOREIGN KEY([ControlTypeId])
REFERENCES [dbo].[ControlType] ([Id])
GO
ALTER TABLE [dbo].[ChatGPTPrompt] CHECK CONSTRAINT [FK_ChatGPTPrompt_ControlType]
GO
ALTER TABLE [dbo].[ChatGPTPrompt]  WITH CHECK ADD  CONSTRAINT [FK_ChatGPTPrompt_Language] FOREIGN KEY([LanguageCode])
REFERENCES [dbo].[Language] ([Code])
GO
ALTER TABLE [dbo].[ChatGPTPrompt] CHECK CONSTRAINT [FK_ChatGPTPrompt_Language]
GO
ALTER TABLE [dbo].[ChatGPTPrompt]  WITH CHECK ADD  CONSTRAINT [FK_ChatGPTPrompt_SEOCampaign] FOREIGN KEY([SeoCampaignId])
REFERENCES [dbo].[SEOCampaign] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[ChatGPTPrompt] CHECK CONSTRAINT [FK_ChatGPTPrompt_SEOCampaign]
GO
ALTER TABLE [dbo].[ChatGPTPrompt]  WITH CHECK ADD  CONSTRAINT [FK_ChatGPTPrompt_Tenses] FOREIGN KEY([TenseId])
REFERENCES [dbo].[Tenses] ([Id])
GO
ALTER TABLE [dbo].[ChatGPTPrompt] CHECK CONSTRAINT [FK_ChatGPTPrompt_Tenses]
GO
ALTER TABLE [dbo].[ChatGPTPromptLog]  WITH CHECK ADD  CONSTRAINT [FK_ChatGPTPromptLog_SEOCampaign] FOREIGN KEY([CampaignId])
REFERENCES [dbo].[SEOCampaign] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[ChatGPTPromptLog] CHECK CONSTRAINT [FK_ChatGPTPromptLog_SEOCampaign]
GO
ALTER TABLE [dbo].[ChatGPTPromptResult]  WITH CHECK ADD  CONSTRAINT [FK_ChatGPTPromptResult_ChatGPTPrompt] FOREIGN KEY([PromptId])
REFERENCES [dbo].[ChatGPTPrompt] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[ChatGPTPromptResult] CHECK CONSTRAINT [FK_ChatGPTPromptResult_ChatGPTPrompt]
GO
ALTER TABLE [dbo].[ChatGPTPromptToneVoice]  WITH CHECK ADD  CONSTRAINT [FK_ChatGPTPromptToneVoice_ChatGPTPrompt] FOREIGN KEY([PromptId])
REFERENCES [dbo].[ChatGPTPrompt] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[ChatGPTPromptToneVoice] CHECK CONSTRAINT [FK_ChatGPTPromptToneVoice_ChatGPTPrompt]
GO
ALTER TABLE [dbo].[ChatGPTPromptToneVoice]  WITH CHECK ADD  CONSTRAINT [FK_ChatGPTPromptToneVoice_SEO_ToneVoice] FOREIGN KEY([ToneVoiceId])
REFERENCES [dbo].[SEO_ToneVoice] ([Id])
GO
ALTER TABLE [dbo].[ChatGPTPromptToneVoice] CHECK CONSTRAINT [FK_ChatGPTPromptToneVoice_SEO_ToneVoice]
GO
ALTER TABLE [dbo].[ClientBusinessOffer]  WITH CHECK ADD  CONSTRAINT [FK_ClientBusinessOffer_BusinessTypeOffer] FOREIGN KEY([OfferTypeId])
REFERENCES [dbo].[BusinessTypeOffer] ([Id])
GO
ALTER TABLE [dbo].[ClientBusinessOffer] CHECK CONSTRAINT [FK_ClientBusinessOffer_BusinessTypeOffer]
GO
ALTER TABLE [dbo].[ClientBusinessOffer]  WITH CHECK ADD  CONSTRAINT [FK_ClientBusinessOffer_ClientCompany] FOREIGN KEY([CompanyId])
REFERENCES [dbo].[ClientCompany] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[ClientBusinessOffer] CHECK CONSTRAINT [FK_ClientBusinessOffer_ClientCompany]
GO
ALTER TABLE [dbo].[ClientCompany]  WITH CHECK ADD  CONSTRAINT [FK_ClientCompany_Client] FOREIGN KEY([ClientId])
REFERENCES [dbo].[Client] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[ClientCompany] CHECK CONSTRAINT [FK_ClientCompany_Client]
GO
ALTER TABLE [dbo].[SEO_Tag]  WITH CHECK ADD  CONSTRAINT [FK_SEO_Tag_SEO_TagGroup] FOREIGN KEY([TagGroupId])
REFERENCES [dbo].[SEO_TagGroup] ([Id])
GO
ALTER TABLE [dbo].[SEO_Tag] CHECK CONSTRAINT [FK_SEO_Tag_SEO_TagGroup]
GO
ALTER TABLE [dbo].[SEO_TagGroup]  WITH CHECK ADD  CONSTRAINT [FK_SEO_TagGroup_SEO_TagGroupType] FOREIGN KEY([GroupTypeId])
REFERENCES [dbo].[SEO_TagGroupType] ([Id])
GO
ALTER TABLE [dbo].[SEO_TagGroup] CHECK CONSTRAINT [FK_SEO_TagGroup_SEO_TagGroupType]
GO
ALTER TABLE [dbo].[SEOCampaign]  WITH CHECK ADD  CONSTRAINT [FK_SEOCampaign_ClientBusinessOffer] FOREIGN KEY([BusinessOfferId])
REFERENCES [dbo].[ClientBusinessOffer] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[SEOCampaign] CHECK CONSTRAINT [FK_SEOCampaign_ClientBusinessOffer]
GO
ALTER TABLE [dbo].[SEOCampaign]  WITH CHECK ADD  CONSTRAINT [FK_SEOCampaign_ClientCompany] FOREIGN KEY([CompanyId])
REFERENCES [dbo].[ClientCompany] ([Id])
GO
ALTER TABLE [dbo].[SEOCampaign] CHECK CONSTRAINT [FK_SEOCampaign_ClientCompany]
GO
ALTER TABLE [dbo].[SiteMapPolicies]  WITH CHECK ADD  CONSTRAINT [FK_SiteMapPolicies_SiteMap] FOREIGN KEY([SiteMapId])
REFERENCES [dbo].[SiteMap] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[SiteMapPolicies] CHECK CONSTRAINT [FK_SiteMapPolicies_SiteMap]
GO
ALTER TABLE [dbo].[SiteMapPolicies]  WITH CHECK ADD  CONSTRAINT [FK_SiteMapPolicies_SiteMapPolicies] FOREIGN KEY([RolId])
REFERENCES [dbo].[AspNetRoles] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[SiteMapPolicies] CHECK CONSTRAINT [FK_SiteMapPolicies_SiteMapPolicies]
GO
/****** Object:  StoredProcedure [dbo].[SP_GetSiteMapPolicy]    Script Date: 10/09/2023 06:53:55 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[SP_GetSiteMapPolicy]
	@UserId			nvarchar(128),
	@SiteMapName	varchar(50)
AS
BEGIN

	SET NOCOUNT ON;
	DECLARE @SiteMapId		smallint
	DECLARE @Write			bit = 0
	DECLARE @Read			bit = 0

	--Get Site Map Id by Name
	SELECT @SiteMapId = Id FROM SiteMap WHERE [Name] = @SiteMapName

	
	IF(@SiteMapId IS NOT NULL)
	BEGIN
		--Verify permision
		SELECT	@SiteMapName = SiteMap.[Name], @Write = SiteMapPolicies.Write, @Read = SiteMapPolicies.[Read]
		FROM	AspNetUserRoles INNER JOIN 
					SiteMapPolicies ON AspNetUserRoles.RoleId = SiteMapPolicies.RolId INNER JOIN
						SiteMap ON SiteMapPolicies.SiteMapId = SiteMap.Id
		WHERE   (AspNetUserRoles.UserId = @UserId) AND (SiteMapPolicies.SiteMapId = @SiteMapId)
	END

	SELECT @SiteMapId AS SiteMapId, @SiteMapName AS SiteName, @Write AS Write, @Read AS [Read]
END
GO
