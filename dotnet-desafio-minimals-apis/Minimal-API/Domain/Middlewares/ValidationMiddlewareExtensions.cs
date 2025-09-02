using Microsoft.AspNetCore.Builder;

namespace MinimalApi.Domain.Middlewares
{
    public static class ValidationMiddlewareExtensions
    {
        public static IApplicationBuilder UseValidation<T>(this IApplicationBuilder builder) where T : class
        {
            return builder.UseMiddleware<ValidationMiddleware<T>>();
        }
    }
}
