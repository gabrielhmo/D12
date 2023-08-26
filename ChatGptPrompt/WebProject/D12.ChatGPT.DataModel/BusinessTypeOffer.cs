using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace D12.ChatGPT.DataModel
{

    [Table("BusinessTypeOffer", Schema = "dbo")]
    [System.CodeDom.Compiler.GeneratedCode("EF.Reverse.POCO.Generator", "2.36.1.0")]
    public class BusinessTypeOffer
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column(@"Id", Order = 1, TypeName = "int")]
        [Index(@"PK_BusinessTypeOffer", 1, IsUnique = true, IsClustered = true)]
        [Required]
        [Key]
        [Display(Name = "Id")]
        public int Id { get; set; }

        [Column(@"Name", Order = 2, TypeName = "varchar")]
        [Index(@"UK_BusinessTypeOffer_Name", 1, IsUnique = true, IsClustered = false)]
        [Required]
        [MaxLength(50)]
        [StringLength(50)]
        [Display(Name = "Name")]
        public string Name { get; set; }

        [Column(@"Active", Order = 3, TypeName = "bit")]
        [Required]
        [Display(Name = "Active")]
        public bool Active { get; set; }

        public virtual System.Collections.Generic.ICollection<ClientBusinessOffer> ClientBusinessOffer { get; set; }

        public BusinessTypeOffer()
        {
            Active = true;
            ClientBusinessOffer = new System.Collections.Generic.List<ClientBusinessOffer>();
        }
    }

}

