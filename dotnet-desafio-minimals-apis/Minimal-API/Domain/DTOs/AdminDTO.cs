using System.ComponentModel.DataAnnotations;

namespace MinimalApi.Domain.DTOs
{
    public enum Profile
    {
        Admin,
        User
    }

    public class AdminDTO
    {
        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid email format")]
        public string Email { get; set; } = null!;

        [Required(ErrorMessage = "Password is required")]
        [StringLength(100, MinimumLength = 6, ErrorMessage = "Password must be between 6 and 100 characters")]
        public string Password { get; set; } = null!;

        [Required(ErrorMessage = "Profile is required")]
        [EnumDataType(typeof(Profile), ErrorMessage = "Invalid profile")]
        public Profile Profile { get; set; } = Profile.Admin;
    }
}