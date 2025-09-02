using System.ComponentModel.DataAnnotations;
using System.Text.Json;
using Microsoft.AspNetCore.Http;
using System.IO;

namespace MinimalApi.Domain.Middlewares
{
    public class VehicleValidationMiddleware<T>(RequestDelegate next) where T : class
    {
        private readonly RequestDelegate _next = next;

        public async Task InvokeAsync(HttpContext context)
        {
            if (context.Request.Method is "POST" or "PUT")
            {
                context.Request.EnableBuffering();
                var body = await new StreamReader(context.Request.Body).ReadToEndAsync();
                context.Request.Body.Position = 0;

                if (!string.IsNullOrWhiteSpace(body))
                {
                    try
                    {
                        var dto = JsonSerializer.Deserialize<T>(body, new JsonSerializerOptions
                        {
                            PropertyNameCaseInsensitive = true
                        });

                        var validationResults = new List<ValidationResult>();
                        var validationContext = new ValidationContext(dto!);

                        if (!Validator.TryValidateObject(dto!, validationContext, validationResults, true))
                        {
                            context.Response.StatusCode = StatusCodes.Status400BadRequest;
                            context.Response.ContentType = "application/json";
                            await context.Response.WriteAsync(JsonSerializer.Serialize(new
                            {
                                Errors = validationResults.Select(e => e.ErrorMessage)
                            }));
                            return;
                        }
                    }
                    catch (JsonException ex)
                    {
                        context.Response.StatusCode = StatusCodes.Status400BadRequest;
                        context.Response.ContentType = "application/json";
                        await context.Response.WriteAsync(JsonSerializer.Serialize(new
                        {
                            Error = "Invalid JSON",
                            Details = ex.Message
                        }));
                        return;
                    }
                }
            }

            await _next(context);
        }
    }
}
