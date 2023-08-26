using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace D12.ChatGPT.DataModel
{

    [Table("ChatGPTContext", Schema = "dbo")]
    [System.CodeDom.Compiler.GeneratedCode("EF.Reverse.POCO.Generator", "2.36.1.0")]
    public class ChatGptContext
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column(@"Id", Order = 1, TypeName = "bigint")]
        [Index(@"PK_ChatGPTContext", 1, IsUnique = true, IsClustered = true)]
        [Required]
        [Key]
        [Display(Name = "Id")]
        public long Id { get; set; }

        [Column(@"SeoCampaignId", Order = 2, TypeName = "bigint")]
        [Required]
        [Display(Name = "Seo campaign ID")]
        public long SeoCampaignId { get; set; }

        [Column(@"ChatGPTRolId", Order = 3, TypeName = "int")]
        [Required]
        [Display(Name = "Chat gptr ol ID")]
        public int ChatGptRolId { get; set; }

        [Column(@"ControlTypeId", Order = 4, TypeName = "int")]
        [Required]
        [Display(Name = "Control type ID")]
        public int ControlTypeId { get; set; }

        [Column(@"LanguageCode", Order = 5, TypeName = "char")]
        [Required]
        [MaxLength(3)]
        [StringLength(3)]
        [Display(Name = "Language code")]
        public string LanguageCode { get; set; }

        [Column(@"TenseId", Order = 6, TypeName = "int")]
        [Display(Name = "Tense ID")]
        public int? TenseId { get; set; }

        [Column(@"Name", Order = 7, TypeName = "varchar")]
        [Required]
        [MaxLength(80)]
        [StringLength(80)]
        [Display(Name = "Name")]
        public string Name { get; set; }

        [Column(@"Context", Order = 8, TypeName = "varchar(max)")]
        [Required]
        [Display(Name = "Context")]
        public string Context { get; set; }

        [Column(@"MinLength", Order = 9, TypeName = "int")]
        [Display(Name = "Min length")]
        public int? MinLength { get; set; }

        [Column(@"MaxLength", Order = 10, TypeName = "int")]
        [Display(Name = "Max length")]
        public int? MaxLength { get; set; }

        [Column(@"MinWord", Order = 11, TypeName = "int")]
        [Display(Name = "Min word")]
        public int? MinWord { get; set; }

        [Column(@"MaxWord", Order = 12, TypeName = "int")]
        [Display(Name = "Max word")]
        public int? MaxWord { get; set; }

        [Column(@"Active", Order = 13, TypeName = "bit")]
        [Required]
        [Display(Name = "Active")]
        public bool Active { get; set; }

        public virtual System.Collections.Generic.ICollection<ChatGptContextToneVoice> ChatGptContextToneVoice { get; set; }
        public virtual System.Collections.Generic.ICollection<ChatGptPrompt> ChatGptPrompt { get; set; }


        [ForeignKey("ChatGptRolId")] public virtual ChatGptRol ChatGptRol { get; set; }

        [ForeignKey("ControlTypeId")] public virtual ControlType ControlType { get; set; }

        [ForeignKey("LanguageCode")] public virtual Language Language { get; set; }

        [ForeignKey("SeoCampaignId")] public virtual SeoCampaign SeoCampaign { get; set; }

        [ForeignKey("TenseId")] public virtual Tenses Tenses { get; set; }

        public ChatGptContext()
        {
            ChatGptRolId = 2;
            LanguageCode = "ENG";
            Active = true;
            ChatGptContextToneVoice = new System.Collections.Generic.List<ChatGptContextToneVoice>();
            ChatGptPrompt = new System.Collections.Generic.List<ChatGptPrompt>();
        }
    }

}

