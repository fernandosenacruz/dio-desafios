using System.ComponentModel.DataAnnotations;

namespace MinimalApi.Domain.DTOs
{
    public class VehicleDTO
    {
        [Required(ErrorMessage = "Brand is required")]
        [StringLength(50, MinimumLength = 2, ErrorMessage = "Brand must be between 2 and 50 characters")]
        public string Brand { get; set; } = null!;

        [Required(ErrorMessage = "Model is required")]
        [StringLength(50, MinimumLength = 1, ErrorMessage = "Model must be between 1 and 50 characters")]
        public string Model { get; set; } = null!;

        [Required(ErrorMessage = "Year is required")]
        [RegularExpression(@"^\d{4}$", ErrorMessage = "Year must be a 4-digit number")]
        public string Year { get; set; } = null!;
    }

    public record VehicleFilterDTO
    {
        public string? Brand { get; init; }
        public string? Model { get; init; }
        public int? Year { get; init; }
        public int PageNumber { get; init; } = 1;
        public int PageSize { get; init; } = 10;
        public string? SortBy { get; init; }
        public bool Ascending { get; init; } = true;
    }
}
