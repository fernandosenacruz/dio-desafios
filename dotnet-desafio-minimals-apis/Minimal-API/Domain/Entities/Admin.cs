using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using MinimalApi.Domain.DTOs;

namespace MinimalApi.Domain.Entities
{
    public class Admin
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [MaxLength(255)]
        public string Email { get; set; } = string.Empty;

        [Required]
        [MaxLength(50)]
        public string Password { get; set; } = string.Empty;

        [Required]
        [MaxLength(10)]
        public Profile Profile { get; set; } = Profile.Admin;
    }
}