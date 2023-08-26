﻿using OfficeOpenXml.Style;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Windows.Media;

namespace D12.ChatGPT.WebAdmin.ViewModels
{
    public class ClientBusinessOfferViewModel
    {
        [Key]
        [Display(Name = "Id")]
        public int Id { get; set; }

        [Required]
        [Display(Name = "Company")]
        public int CompanyId { get; set; }

        [Required(ErrorMessage = "Offer Type is required")]
        [Display(Name = "Business Offer Type")]
        public int OfferTypeId { get; set; }

        [Required(ErrorMessage = "Name is required")]
        [MaxLength(120)]
        [StringLength(120)]
        [Display(Name = "Name")]
        public string Name { get; set; }

        [MaxLength(500)]
        [StringLength(500)]
        [Display(Name = "Description")]
        public string Description { get; set; }

        [MaxLength(1500)]
        [StringLength(1500)]
        [Display(Name = "Characteristics")]
        public string Characteristics { get; set; }

        [Display(Name = "Active")]
        public bool Active { get; set; }

    }
}