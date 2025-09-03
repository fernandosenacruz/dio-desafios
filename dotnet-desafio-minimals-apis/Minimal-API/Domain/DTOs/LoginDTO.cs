namespace MinimalApi.Domain.DTOs
{
    public class LoginDTO
    {
        public required string Email { get; set; } = string.Empty;
        public required string Password { get; set; } = string.Empty;
    }
}