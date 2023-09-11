USE [D12ChatGpt]
GO
INSERT [dbo].[AspNetRoles] ([Id], [Name]) VALUES (N'40a5f230-d957-4881-95a8-d7479863ff38', N'User')
GO
INSERT [dbo].[AspNetRoles] ([Id], [Name]) VALUES (N'BBB48AD8-AB98-4AFB-829E-76F577FA279A', N'Administrator')
GO
INSERT [dbo].[AspNetUsers] ([Id], [FirstName], [LastName], [JobTitle], [LastAccess], [EntryDate], [Email], [EmailConfirmed], [PasswordHash], [SecurityStamp], [PhoneNumber], [PhoneNumberConfirmed], [TwoFactorEnabled], [LockoutEndDateUtc], [LockoutEnabled], [AccessFailedCount], [UserName], [Active], [ReadOnly], [Deleted]) VALUES (N'856090B7-C4A1-4DB8-A699-13BCC61DD5DE', N'Admin', N'User', N'Webmaster', CAST(N'2019-03-30T11:53:00' AS SmallDateTime), CAST(N'2018-10-02T23:15:00' AS SmallDateTime), N'admin@email.com', 1, N'AJ+h7ggtmVHTM6ZcdJbKkJjspu1PcoaXyH/QeoKdk5DkoiCl2zZj80wm34j6y+9WvQ==', N'08400504-952e-4a77-bf71-75ece3a13ba1', N'0000000000', 0, 0, NULL, 0, 0, N'admin', 1, 0, 0)
GO
SET IDENTITY_INSERT [dbo].[AspNetUserRoles] ON 
GO
INSERT [dbo].[AspNetUserRoles] ([Id], [UserId], [RoleId]) VALUES (3, N'856090B7-C4A1-4DB8-A699-13BCC61DD5DE', N'BBB48AD8-AB98-4AFB-829E-76F577FA279A')
GO
SET IDENTITY_INSERT [dbo].[AspNetUserRoles] OFF
GO
SET IDENTITY_INSERT [dbo].[SiteMap] ON 
GO
INSERT [dbo].[SiteMap] ([Id], [ParentId], [Name], [Index], [UrlPath], [NewWindows], [OnClick], [IsPublic], [Active], [Deleted]) VALUES (1, 0, N'Control Panel', 1, NULL, 0, NULL, 0, 1, 0)
GO
INSERT [dbo].[SiteMap] ([Id], [ParentId], [Name], [Index], [UrlPath], [NewWindows], [OnClick], [IsPublic], [Active], [Deleted]) VALUES (2, 1, N'Home', 1, NULL, 0, NULL, 0, 1, 0)
GO
INSERT [dbo].[SiteMap] ([Id], [ParentId], [Name], [Index], [UrlPath], [NewWindows], [OnClick], [IsPublic], [Active], [Deleted]) VALUES (4, 1, N'Settings', 7, NULL, 0, NULL, 0, 1, 0)
GO
INSERT [dbo].[SiteMap] ([Id], [ParentId], [Name], [Index], [UrlPath], [NewWindows], [OnClick], [IsPublic], [Active], [Deleted]) VALUES (5, 4, N'Security', 1, NULL, 0, NULL, 0, 1, 0)
GO
INSERT [dbo].[SiteMap] ([Id], [ParentId], [Name], [Index], [UrlPath], [NewWindows], [OnClick], [IsPublic], [Active], [Deleted]) VALUES (7, 5, N'Users', 1, NULL, 0, NULL, 0, 1, 0)
GO
INSERT [dbo].[SiteMap] ([Id], [ParentId], [Name], [Index], [UrlPath], [NewWindows], [OnClick], [IsPublic], [Active], [Deleted]) VALUES (8, 5, N'Roles', 2, NULL, 0, NULL, 0, 1, 0)
GO
INSERT [dbo].[SiteMap] ([Id], [ParentId], [Name], [Index], [UrlPath], [NewWindows], [OnClick], [IsPublic], [Active], [Deleted]) VALUES (9, 5, N'SiteMap', 4, NULL, 0, NULL, 0, 1, 0)
GO
INSERT [dbo].[SiteMap] ([Id], [ParentId], [Name], [Index], [UrlPath], [NewWindows], [OnClick], [IsPublic], [Active], [Deleted]) VALUES (21, 1, N'Client', 2, NULL, 0, NULL, 0, 1, 0)
GO
INSERT [dbo].[SiteMap] ([Id], [ParentId], [Name], [Index], [UrlPath], [NewWindows], [OnClick], [IsPublic], [Active], [Deleted]) VALUES (22, 1, N'Companies', 3, NULL, 0, NULL, 0, 1, 0)
GO
INSERT [dbo].[SiteMap] ([Id], [ParentId], [Name], [Index], [UrlPath], [NewWindows], [OnClick], [IsPublic], [Active], [Deleted]) VALUES (23, 1, N'Client Business Offer', 4, NULL, 0, NULL, 0, 1, 0)
GO
INSERT [dbo].[SiteMap] ([Id], [ParentId], [Name], [Index], [UrlPath], [NewWindows], [OnClick], [IsPublic], [Active], [Deleted]) VALUES (24, 1, N'Business Type Offer', 5, NULL, 0, NULL, 0, 1, 0)
GO
INSERT [dbo].[SiteMap] ([Id], [ParentId], [Name], [Index], [UrlPath], [NewWindows], [OnClick], [IsPublic], [Active], [Deleted]) VALUES (25, 1, N'Campaigns', 6, NULL, 0, NULL, 0, 1, 0)
GO
INSERT [dbo].[SiteMap] ([Id], [ParentId], [Name], [Index], [UrlPath], [NewWindows], [OnClick], [IsPublic], [Active], [Deleted]) VALUES (26, 1, N'ChatGptPrompt', 7, NULL, 0, NULL, 0, 1, 0)
GO
INSERT [dbo].[SiteMap] ([Id], [ParentId], [Name], [Index], [UrlPath], [NewWindows], [OnClick], [IsPublic], [Active], [Deleted]) VALUES (27, 1, N'ChatGptRol', 8, NULL, 0, NULL, 0, 1, 0)
GO
INSERT [dbo].[SiteMap] ([Id], [ParentId], [Name], [Index], [UrlPath], [NewWindows], [OnClick], [IsPublic], [Active], [Deleted]) VALUES (28, 1, N'ControlType', 9, NULL, 0, NULL, 0, 1, 0)
GO
INSERT [dbo].[SiteMap] ([Id], [ParentId], [Name], [Index], [UrlPath], [NewWindows], [OnClick], [IsPublic], [Active], [Deleted]) VALUES (29, 1, N'Language', 10, NULL, 0, NULL, 0, 1, 0)
GO
INSERT [dbo].[SiteMap] ([Id], [ParentId], [Name], [Index], [UrlPath], [NewWindows], [OnClick], [IsPublic], [Active], [Deleted]) VALUES (30, 1, N'Tenses', 11, NULL, 0, NULL, 0, 1, 0)
GO
SET IDENTITY_INSERT [dbo].[SiteMap] OFF
GO
SET IDENTITY_INSERT [dbo].[SiteMapPolicies] ON 
GO
INSERT [dbo].[SiteMapPolicies] ([Id], [RolId], [SiteMapId], [Read], [Write]) VALUES (1, N'BBB48AD8-AB98-4AFB-829E-76F577FA279A', 1, 1, 1)
GO
INSERT [dbo].[SiteMapPolicies] ([Id], [RolId], [SiteMapId], [Read], [Write]) VALUES (2, N'BBB48AD8-AB98-4AFB-829E-76F577FA279A', 2, 1, 1)
GO
INSERT [dbo].[SiteMapPolicies] ([Id], [RolId], [SiteMapId], [Read], [Write]) VALUES (4, N'BBB48AD8-AB98-4AFB-829E-76F577FA279A', 4, 1, 1)
GO
INSERT [dbo].[SiteMapPolicies] ([Id], [RolId], [SiteMapId], [Read], [Write]) VALUES (5, N'BBB48AD8-AB98-4AFB-829E-76F577FA279A', 5, 1, 1)
GO
INSERT [dbo].[SiteMapPolicies] ([Id], [RolId], [SiteMapId], [Read], [Write]) VALUES (6, N'BBB48AD8-AB98-4AFB-829E-76F577FA279A', 7, 1, 1)
GO
INSERT [dbo].[SiteMapPolicies] ([Id], [RolId], [SiteMapId], [Read], [Write]) VALUES (7, N'BBB48AD8-AB98-4AFB-829E-76F577FA279A', 8, 1, 1)
GO
INSERT [dbo].[SiteMapPolicies] ([Id], [RolId], [SiteMapId], [Read], [Write]) VALUES (8, N'BBB48AD8-AB98-4AFB-829E-76F577FA279A', 9, 1, 1)
GO
INSERT [dbo].[SiteMapPolicies] ([Id], [RolId], [SiteMapId], [Read], [Write]) VALUES (18, N'BBB48AD8-AB98-4AFB-829E-76F577FA279A', 21, 1, 1)
GO
INSERT [dbo].[SiteMapPolicies] ([Id], [RolId], [SiteMapId], [Read], [Write]) VALUES (19, N'BBB48AD8-AB98-4AFB-829E-76F577FA279A', 22, 1, 1)
GO
INSERT [dbo].[SiteMapPolicies] ([Id], [RolId], [SiteMapId], [Read], [Write]) VALUES (20, N'BBB48AD8-AB98-4AFB-829E-76F577FA279A', 23, 1, 1)
GO
INSERT [dbo].[SiteMapPolicies] ([Id], [RolId], [SiteMapId], [Read], [Write]) VALUES (21, N'BBB48AD8-AB98-4AFB-829E-76F577FA279A', 24, 1, 1)
GO
INSERT [dbo].[SiteMapPolicies] ([Id], [RolId], [SiteMapId], [Read], [Write]) VALUES (22, N'BBB48AD8-AB98-4AFB-829E-76F577FA279A', 25, 1, 1)
GO
INSERT [dbo].[SiteMapPolicies] ([Id], [RolId], [SiteMapId], [Read], [Write]) VALUES (23, N'BBB48AD8-AB98-4AFB-829E-76F577FA279A', 26, 1, 1)
GO
INSERT [dbo].[SiteMapPolicies] ([Id], [RolId], [SiteMapId], [Read], [Write]) VALUES (24, N'BBB48AD8-AB98-4AFB-829E-76F577FA279A', 27, 1, 1)
GO
INSERT [dbo].[SiteMapPolicies] ([Id], [RolId], [SiteMapId], [Read], [Write]) VALUES (25, N'BBB48AD8-AB98-4AFB-829E-76F577FA279A', 28, 1, 1)
GO
INSERT [dbo].[SiteMapPolicies] ([Id], [RolId], [SiteMapId], [Read], [Write]) VALUES (26, N'BBB48AD8-AB98-4AFB-829E-76F577FA279A', 29, 1, 1)
GO
INSERT [dbo].[SiteMapPolicies] ([Id], [RolId], [SiteMapId], [Read], [Write]) VALUES (27, N'BBB48AD8-AB98-4AFB-829E-76F577FA279A', 30, 1, 1)
GO
INSERT [dbo].[SiteMapPolicies] ([Id], [RolId], [SiteMapId], [Read], [Write]) VALUES (30, N'40a5f230-d957-4881-95a8-d7479863ff38', 26, 0, 0)
GO
SET IDENTITY_INSERT [dbo].[SiteMapPolicies] OFF
GO
SET IDENTITY_INSERT [dbo].[BusinessTypeOffer] ON 
GO
INSERT [dbo].[BusinessTypeOffer] ([Id], [Name], [Active]) VALUES (1, N'Product', 1)
GO
INSERT [dbo].[BusinessTypeOffer] ([Id], [Name], [Active]) VALUES (2, N'Services', 1)
GO
SET IDENTITY_INSERT [dbo].[BusinessTypeOffer] OFF
GO
SET IDENTITY_INSERT [dbo].[ChatGPTRol] ON 
GO
INSERT [dbo].[ChatGPTRol] ([Id], [Name], [Active]) VALUES (1, N'System', 1)
GO
INSERT [dbo].[ChatGPTRol] ([Id], [Name], [Active]) VALUES (2, N'User', 1)
GO
INSERT [dbo].[ChatGPTRol] ([Id], [Name], [Active]) VALUES (3, N'Assistant', 1)
GO
SET IDENTITY_INSERT [dbo].[ChatGPTRol] OFF
GO
SET IDENTITY_INSERT [dbo].[ControlType] ON 
GO
INSERT [dbo].[ControlType] ([Id], [Label], [Type], [Active]) VALUES (1, N'None', N'None', 1)
GO
INSERT [dbo].[ControlType] ([Id], [Label], [Type], [Active]) VALUES (2, N'ChatGPT', N'ChatGPTSystem', 1)
GO
INSERT [dbo].[ControlType] ([Id], [Label], [Type], [Active]) VALUES (3, N'Page Title', N'Title', 1)
GO
INSERT [dbo].[ControlType] ([Id], [Label], [Type], [Active]) VALUES (4, N'Page Description', N'Description', 1)
GO
INSERT [dbo].[ControlType] ([Id], [Label], [Type], [Active]) VALUES (5, N'Paragraph', N'P', 1)
GO
INSERT [dbo].[ControlType] ([Id], [Label], [Type], [Active]) VALUES (6, N'H1', N'H1', 1)
GO
INSERT [dbo].[ControlType] ([Id], [Label], [Type], [Active]) VALUES (7, N'H2', N'H2', 1)
GO
INSERT [dbo].[ControlType] ([Id], [Label], [Type], [Active]) VALUES (8, N'H3', N'H3', 1)
GO
INSERT [dbo].[ControlType] ([Id], [Label], [Type], [Active]) VALUES (9, N'H4', N'H4', 1)
GO
INSERT [dbo].[ControlType] ([Id], [Label], [Type], [Active]) VALUES (10, N'H5', N'H5', 1)
GO
INSERT [dbo].[ControlType] ([Id], [Label], [Type], [Active]) VALUES (11, N'H6', N'H6', 1)
GO
SET IDENTITY_INSERT [dbo].[ControlType] OFF
GO
INSERT [dbo].[Language] ([Code], [Label], [Active]) VALUES (N'ENG', N'English', 1)
GO
INSERT [dbo].[Language] ([Code], [Label], [Active]) VALUES (N'ESP', N'Spanish', 1)
GO
SET IDENTITY_INSERT [dbo].[Tenses] ON 
GO
INSERT [dbo].[Tenses] ([Id], [Tense], [Active]) VALUES (1, N'Present Simple', 1)
GO
INSERT [dbo].[Tenses] ([Id], [Tense], [Active]) VALUES (2, N'Present Continuous', 1)
GO
INSERT [dbo].[Tenses] ([Id], [Tense], [Active]) VALUES (3, N'Present Perfect', 1)
GO
INSERT [dbo].[Tenses] ([Id], [Tense], [Active]) VALUES (4, N'Present Perfect Continuous', 1)
GO
INSERT [dbo].[Tenses] ([Id], [Tense], [Active]) VALUES (5, N'Past simple', 1)
GO
INSERT [dbo].[Tenses] ([Id], [Tense], [Active]) VALUES (6, N'Past Continuous', 1)
GO
INSERT [dbo].[Tenses] ([Id], [Tense], [Active]) VALUES (7, N'Past Perfect', 1)
GO
INSERT [dbo].[Tenses] ([Id], [Tense], [Active]) VALUES (8, N'Past Perfect Continuous', 1)
GO
INSERT [dbo].[Tenses] ([Id], [Tense], [Active]) VALUES (9, N'Future Simple', 1)
GO
INSERT [dbo].[Tenses] ([Id], [Tense], [Active]) VALUES (10, N'Future Continuous', 1)
GO
INSERT [dbo].[Tenses] ([Id], [Tense], [Active]) VALUES (11, N'Future Perfect', 1)
GO
INSERT [dbo].[Tenses] ([Id], [Tense], [Active]) VALUES (12, N'Future Perfect Continuous', 1)
GO
SET IDENTITY_INSERT [dbo].[Tenses] OFF
GO
SET IDENTITY_INSERT [dbo].[SEO_TagGroupType] ON 
GO
INSERT [dbo].[SEO_TagGroupType] ([Id], [Label], [Active]) VALUES (1, N'Group Test 01', 1)
GO
INSERT [dbo].[SEO_TagGroupType] ([Id], [Label], [Active]) VALUES (2, N'Group Test 02', 1)
GO
SET IDENTITY_INSERT [dbo].[SEO_TagGroupType] OFF
GO
SET IDENTITY_INSERT [dbo].[SEO_TagGroup] ON 
GO
INSERT [dbo].[SEO_TagGroup] ([Id], [GroupTypeId], [Name], [Description], [Active], [EntryDate]) VALUES (1, 1, N'Test 01', NULL, 1, CAST(N'2023-04-06T03:13:00' AS SmallDateTime))
GO
INSERT [dbo].[SEO_TagGroup] ([Id], [GroupTypeId], [Name], [Description], [Active], [EntryDate]) VALUES (18, 1, N'Test 02', NULL, 1, CAST(N'2023-08-08T23:37:00' AS SmallDateTime))
GO
INSERT [dbo].[SEO_TagGroup] ([Id], [GroupTypeId], [Name], [Description], [Active], [EntryDate]) VALUES (19, 1, N'Test 03', NULL, 1, CAST(N'2023-08-08T23:38:00' AS SmallDateTime))
GO
INSERT [dbo].[SEO_TagGroup] ([Id], [GroupTypeId], [Name], [Description], [Active], [EntryDate]) VALUES (20, 1, N'Test 04', NULL, 1, CAST(N'2023-08-08T23:39:00' AS SmallDateTime))
GO
SET IDENTITY_INSERT [dbo].[SEO_TagGroup] OFF
GO
SET IDENTITY_INSERT [dbo].[SEO_Tag] ON 
GO
INSERT [dbo].[SEO_Tag] ([Id], [TagGroupId], [Name], [Active]) VALUES (1, 1, N'Celebrating', 1)
GO
INSERT [dbo].[SEO_Tag] ([Id], [TagGroupId], [Name], [Active]) VALUES (2, 1, N'Domain', 1)
GO
INSERT [dbo].[SEO_Tag] ([Id], [TagGroupId], [Name], [Active]) VALUES (3, 1, N'Slug', 1)
GO
INSERT [dbo].[SEO_Tag] ([Id], [TagGroupId], [Name], [Active]) VALUES (4, 1, N'Packages', 1)
GO
INSERT [dbo].[SEO_Tag] ([Id], [TagGroupId], [Name], [Active]) VALUES (5, 1, N'Event Type', 1)
GO
INSERT [dbo].[SEO_Tag] ([Id], [TagGroupId], [Name], [Active]) VALUES (6, 1, N'Event Date', 1)
GO
INSERT [dbo].[SEO_Tag] ([Id], [TagGroupId], [Name], [Active]) VALUES (7, 1, N'Photo Session', 1)
GO
INSERT [dbo].[SEO_Tag] ([Id], [TagGroupId], [Name], [Active]) VALUES (8, 1, N'Photo Session City & State', 1)
GO
INSERT [dbo].[SEO_Tag] ([Id], [TagGroupId], [Name], [Active]) VALUES (9, 1, N'Ceremony', 1)
GO
INSERT [dbo].[SEO_Tag] ([Id], [TagGroupId], [Name], [Active]) VALUES (10, 1, N'Ceremony City & State', 1)
GO
INSERT [dbo].[SEO_Tag] ([Id], [TagGroupId], [Name], [Active]) VALUES (11, 1, N'Reception', 1)
GO
INSERT [dbo].[SEO_Tag] ([Id], [TagGroupId], [Name], [Active]) VALUES (12, 1, N'Reception City & State', 1)
GO
INSERT [dbo].[SEO_Tag] ([Id], [TagGroupId], [Name], [Active]) VALUES (13, 1, N'Reception GEO Latitud N', 1)
GO
INSERT [dbo].[SEO_Tag] ([Id], [TagGroupId], [Name], [Active]) VALUES (14, 1, N'Reception GEO Longitud W', 1)
GO
INSERT [dbo].[SEO_Tag] ([Id], [TagGroupId], [Name], [Active]) VALUES (15, 1, N'Event Colors', 1)
GO
INSERT [dbo].[SEO_Tag] ([Id], [TagGroupId], [Name], [Active]) VALUES (16, 1, N'Language', 1)
GO
INSERT [dbo].[SEO_Tag] ([Id], [TagGroupId], [Name], [Active]) VALUES (17, 1, N'Main Keyword', 1)
GO
INSERT [dbo].[SEO_Tag] ([Id], [TagGroupId], [Name], [Active]) VALUES (18, 1, N'SK-01_Editing', 1)
GO
INSERT [dbo].[SEO_Tag] ([Id], [TagGroupId], [Name], [Active]) VALUES (19, 1, N'SK-02_Videographer', 1)
GO
INSERT [dbo].[SEO_Tag] ([Id], [TagGroupId], [Name], [Active]) VALUES (20, 1, N'SK-03_Gallery', 1)
GO
INSERT [dbo].[SEO_Tag] ([Id], [TagGroupId], [Name], [Active]) VALUES (21, 1, N'SK-04_Photo-session', 1)
GO
INSERT [dbo].[SEO_Tag] ([Id], [TagGroupId], [Name], [Active]) VALUES (22, 1, N'SK-05_Outfit', 1)
GO
INSERT [dbo].[SEO_Tag] ([Id], [TagGroupId], [Name], [Active]) VALUES (23, 1, N'Hashtags', 1)
GO
INSERT [dbo].[SEO_Tag] ([Id], [TagGroupId], [Name], [Active]) VALUES (24, 1, N'Zenfolio_Client-URL', 1)
GO
INSERT [dbo].[SEO_Tag] ([Id], [TagGroupId], [Name], [Active]) VALUES (137, 18, N'Record_ID', 1)
GO
INSERT [dbo].[SEO_Tag] ([Id], [TagGroupId], [Name], [Active]) VALUES (138, 18, N'Invitation_ID', 1)
GO
INSERT [dbo].[SEO_Tag] ([Id], [TagGroupId], [Name], [Active]) VALUES (139, 18, N'Invitation Type', 1)
GO
INSERT [dbo].[SEO_Tag] ([Id], [TagGroupId], [Name], [Active]) VALUES (140, 18, N'Invitation Theme', 1)
GO
INSERT [dbo].[SEO_Tag] ([Id], [TagGroupId], [Name], [Active]) VALUES (141, 18, N'Group Color', 1)
GO
INSERT [dbo].[SEO_Tag] ([Id], [TagGroupId], [Name], [Active]) VALUES (142, 18, N'Main Color', 1)
GO
INSERT [dbo].[SEO_Tag] ([Id], [TagGroupId], [Name], [Active]) VALUES (143, 18, N'Main Color AKA', 1)
GO
INSERT [dbo].[SEO_Tag] ([Id], [TagGroupId], [Name], [Active]) VALUES (144, 18, N'Secondary Color', 1)
GO
INSERT [dbo].[SEO_Tag] ([Id], [TagGroupId], [Name], [Active]) VALUES (145, 18, N'Second Color AKA', 1)
GO
INSERT [dbo].[SEO_Tag] ([Id], [TagGroupId], [Name], [Active]) VALUES (146, 18, N'Color Type', 1)
GO
INSERT [dbo].[SEO_Tag] ([Id], [TagGroupId], [Name], [Active]) VALUES (147, 18, N'Laser Wrap', 1)
GO
INSERT [dbo].[SEO_Tag] ([Id], [TagGroupId], [Name], [Active]) VALUES (148, 18, N'Laser Color', 1)
GO
INSERT [dbo].[SEO_Tag] ([Id], [TagGroupId], [Name], [Active]) VALUES (149, 18, N'Tag-01', 1)
GO
INSERT [dbo].[SEO_Tag] ([Id], [TagGroupId], [Name], [Active]) VALUES (150, 18, N'Tag-02', 1)
GO
INSERT [dbo].[SEO_Tag] ([Id], [TagGroupId], [Name], [Active]) VALUES (151, 18, N'Tag-03', 1)
GO
INSERT [dbo].[SEO_Tag] ([Id], [TagGroupId], [Name], [Active]) VALUES (152, 18, N'Tag-04', 1)
GO
INSERT [dbo].[SEO_Tag] ([Id], [TagGroupId], [Name], [Active]) VALUES (153, 18, N'Tag-05', 1)
GO
INSERT [dbo].[SEO_Tag] ([Id], [TagGroupId], [Name], [Active]) VALUES (154, 18, N'Keyword-01', 1)
GO
INSERT [dbo].[SEO_Tag] ([Id], [TagGroupId], [Name], [Active]) VALUES (155, 18, N'Keyword-02', 1)
GO
INSERT [dbo].[SEO_Tag] ([Id], [TagGroupId], [Name], [Active]) VALUES (156, 18, N'Keyword-03', 1)
GO
INSERT [dbo].[SEO_Tag] ([Id], [TagGroupId], [Name], [Active]) VALUES (157, 18, N'City', 1)
GO
INSERT [dbo].[SEO_Tag] ([Id], [TagGroupId], [Name], [Active]) VALUES (158, 18, N'State', 1)
GO
INSERT [dbo].[SEO_Tag] ([Id], [TagGroupId], [Name], [Active]) VALUES (159, 18, N'State Code', 1)
GO
INSERT [dbo].[SEO_Tag] ([Id], [TagGroupId], [Name], [Active]) VALUES (160, 18, N'Idioma', 1)
GO
INSERT [dbo].[SEO_Tag] ([Id], [TagGroupId], [Name], [Active]) VALUES (161, 18, N'Product url', 1)
GO
INSERT [dbo].[SEO_Tag] ([Id], [TagGroupId], [Name], [Active]) VALUES (162, 18, N'Sinonimo de Quince', 1)
GO
INSERT [dbo].[SEO_Tag] ([Id], [TagGroupId], [Name], [Active]) VALUES (163, 19, N'Record_ID', 1)
GO
INSERT [dbo].[SEO_Tag] ([Id], [TagGroupId], [Name], [Active]) VALUES (164, 19, N'Invitation_ID', 1)
GO
INSERT [dbo].[SEO_Tag] ([Id], [TagGroupId], [Name], [Active]) VALUES (165, 19, N'Invitation Type', 1)
GO
INSERT [dbo].[SEO_Tag] ([Id], [TagGroupId], [Name], [Active]) VALUES (166, 19, N'Invitation Theme', 1)
GO
INSERT [dbo].[SEO_Tag] ([Id], [TagGroupId], [Name], [Active]) VALUES (167, 19, N'Group Color', 1)
GO
INSERT [dbo].[SEO_Tag] ([Id], [TagGroupId], [Name], [Active]) VALUES (168, 19, N'Main Color', 1)
GO
INSERT [dbo].[SEO_Tag] ([Id], [TagGroupId], [Name], [Active]) VALUES (169, 19, N'Main Color AKA', 1)
GO
INSERT [dbo].[SEO_Tag] ([Id], [TagGroupId], [Name], [Active]) VALUES (170, 19, N'Secondary Color', 1)
GO
INSERT [dbo].[SEO_Tag] ([Id], [TagGroupId], [Name], [Active]) VALUES (171, 19, N'Second Color AKA', 1)
GO
INSERT [dbo].[SEO_Tag] ([Id], [TagGroupId], [Name], [Active]) VALUES (172, 19, N'Color Type', 1)
GO
INSERT [dbo].[SEO_Tag] ([Id], [TagGroupId], [Name], [Active]) VALUES (173, 19, N'Laser Wrap', 1)
GO
INSERT [dbo].[SEO_Tag] ([Id], [TagGroupId], [Name], [Active]) VALUES (174, 19, N'Laser Color', 1)
GO
INSERT [dbo].[SEO_Tag] ([Id], [TagGroupId], [Name], [Active]) VALUES (175, 19, N'Tag-01', 1)
GO
INSERT [dbo].[SEO_Tag] ([Id], [TagGroupId], [Name], [Active]) VALUES (176, 19, N'Tag-02', 1)
GO
INSERT [dbo].[SEO_Tag] ([Id], [TagGroupId], [Name], [Active]) VALUES (177, 19, N'Tag-03', 1)
GO
INSERT [dbo].[SEO_Tag] ([Id], [TagGroupId], [Name], [Active]) VALUES (178, 19, N'Tag-04', 1)
GO
INSERT [dbo].[SEO_Tag] ([Id], [TagGroupId], [Name], [Active]) VALUES (179, 19, N'Tag-05', 1)
GO
INSERT [dbo].[SEO_Tag] ([Id], [TagGroupId], [Name], [Active]) VALUES (180, 19, N'Keyword-01', 1)
GO
INSERT [dbo].[SEO_Tag] ([Id], [TagGroupId], [Name], [Active]) VALUES (181, 19, N'Keyword-02', 1)
GO
INSERT [dbo].[SEO_Tag] ([Id], [TagGroupId], [Name], [Active]) VALUES (182, 19, N'Keyword-03', 1)
GO
INSERT [dbo].[SEO_Tag] ([Id], [TagGroupId], [Name], [Active]) VALUES (183, 19, N'City', 1)
GO
INSERT [dbo].[SEO_Tag] ([Id], [TagGroupId], [Name], [Active]) VALUES (184, 19, N'State', 1)
GO
INSERT [dbo].[SEO_Tag] ([Id], [TagGroupId], [Name], [Active]) VALUES (185, 19, N'State Code', 1)
GO
INSERT [dbo].[SEO_Tag] ([Id], [TagGroupId], [Name], [Active]) VALUES (186, 19, N'Idioma', 1)
GO
INSERT [dbo].[SEO_Tag] ([Id], [TagGroupId], [Name], [Active]) VALUES (187, 19, N'Product url', 1)
GO
INSERT [dbo].[SEO_Tag] ([Id], [TagGroupId], [Name], [Active]) VALUES (188, 19, N'Sinonimo de Quince', 1)
GO
INSERT [dbo].[SEO_Tag] ([Id], [TagGroupId], [Name], [Active]) VALUES (189, 20, N'Record_ID', 1)
GO
INSERT [dbo].[SEO_Tag] ([Id], [TagGroupId], [Name], [Active]) VALUES (190, 20, N'Invitation_ID', 1)
GO
INSERT [dbo].[SEO_Tag] ([Id], [TagGroupId], [Name], [Active]) VALUES (191, 20, N'Invitation Type', 1)
GO
INSERT [dbo].[SEO_Tag] ([Id], [TagGroupId], [Name], [Active]) VALUES (192, 20, N'Invitation Theme', 1)
GO
INSERT [dbo].[SEO_Tag] ([Id], [TagGroupId], [Name], [Active]) VALUES (193, 20, N'Group Color', 1)
GO
INSERT [dbo].[SEO_Tag] ([Id], [TagGroupId], [Name], [Active]) VALUES (194, 20, N'Main Color', 1)
GO
INSERT [dbo].[SEO_Tag] ([Id], [TagGroupId], [Name], [Active]) VALUES (195, 20, N'Main Color AKA', 1)
GO
INSERT [dbo].[SEO_Tag] ([Id], [TagGroupId], [Name], [Active]) VALUES (196, 20, N'Secondary Color', 1)
GO
INSERT [dbo].[SEO_Tag] ([Id], [TagGroupId], [Name], [Active]) VALUES (197, 20, N'Second Color AKA', 1)
GO
INSERT [dbo].[SEO_Tag] ([Id], [TagGroupId], [Name], [Active]) VALUES (198, 20, N'Color Type', 1)
GO
INSERT [dbo].[SEO_Tag] ([Id], [TagGroupId], [Name], [Active]) VALUES (199, 20, N'Laser Wrap', 1)
GO
INSERT [dbo].[SEO_Tag] ([Id], [TagGroupId], [Name], [Active]) VALUES (200, 20, N'Laser Color', 1)
GO
INSERT [dbo].[SEO_Tag] ([Id], [TagGroupId], [Name], [Active]) VALUES (201, 20, N'Tag-01', 1)
GO
INSERT [dbo].[SEO_Tag] ([Id], [TagGroupId], [Name], [Active]) VALUES (202, 20, N'Tag-02', 1)
GO
INSERT [dbo].[SEO_Tag] ([Id], [TagGroupId], [Name], [Active]) VALUES (203, 20, N'Tag-03', 1)
GO
INSERT [dbo].[SEO_Tag] ([Id], [TagGroupId], [Name], [Active]) VALUES (204, 20, N'Tag-04', 1)
GO
INSERT [dbo].[SEO_Tag] ([Id], [TagGroupId], [Name], [Active]) VALUES (205, 20, N'Tag-05', 1)
GO
INSERT [dbo].[SEO_Tag] ([Id], [TagGroupId], [Name], [Active]) VALUES (206, 20, N'Keyword-01', 1)
GO
INSERT [dbo].[SEO_Tag] ([Id], [TagGroupId], [Name], [Active]) VALUES (207, 20, N'Keyword-02', 1)
GO
INSERT [dbo].[SEO_Tag] ([Id], [TagGroupId], [Name], [Active]) VALUES (208, 20, N'Keyword-03', 1)
GO
INSERT [dbo].[SEO_Tag] ([Id], [TagGroupId], [Name], [Active]) VALUES (209, 20, N'City', 1)
GO
INSERT [dbo].[SEO_Tag] ([Id], [TagGroupId], [Name], [Active]) VALUES (210, 20, N'State', 1)
GO
INSERT [dbo].[SEO_Tag] ([Id], [TagGroupId], [Name], [Active]) VALUES (211, 20, N'State Code', 1)
GO
INSERT [dbo].[SEO_Tag] ([Id], [TagGroupId], [Name], [Active]) VALUES (212, 20, N'Idioma', 1)
GO
INSERT [dbo].[SEO_Tag] ([Id], [TagGroupId], [Name], [Active]) VALUES (213, 20, N'Product url', 1)
GO
INSERT [dbo].[SEO_Tag] ([Id], [TagGroupId], [Name], [Active]) VALUES (214, 20, N'Sinonimo de Quince', 1)
GO
SET IDENTITY_INSERT [dbo].[SEO_Tag] OFF
GO
SET IDENTITY_INSERT [dbo].[SEO_ToneVoice] ON 
GO
INSERT [dbo].[SEO_ToneVoice] ([Id], [Tone], [Active]) VALUES (1, N'Friendly', 1)
GO
INSERT [dbo].[SEO_ToneVoice] ([Id], [Tone], [Active]) VALUES (2, N'Formal', 1)
GO
INSERT [dbo].[SEO_ToneVoice] ([Id], [Tone], [Active]) VALUES (3, N'Casual', 1)
GO
INSERT [dbo].[SEO_ToneVoice] ([Id], [Tone], [Active]) VALUES (4, N'Optimistic', 1)
GO
INSERT [dbo].[SEO_ToneVoice] ([Id], [Tone], [Active]) VALUES (5, N'Humorous', 1)
GO
INSERT [dbo].[SEO_ToneVoice] ([Id], [Tone], [Active]) VALUES (6, N'Professional ', 1)
GO
SET IDENTITY_INSERT [dbo].[SEO_ToneVoice] OFF
GO
