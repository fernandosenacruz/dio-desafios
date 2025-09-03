using MinimalApi.Domain.DTOs;

namespace MinimalApi.Domain.ModelViews
{
    public class AdminLogin
    {
        public string Email { get; set; } = string.Empty;
        public string Profile { get; set;} = string.Empty;
        public string Token { get; set; } = string.Empty;
    }
}
