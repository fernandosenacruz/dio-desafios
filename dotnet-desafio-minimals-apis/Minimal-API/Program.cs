using System.Text;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using MinimalApi.Domain.DTOs;
using MinimalApi.Domain.Entities;
using MinimalApi.Domain.ModelViews;
using MinimalApi.Domain.Interfaces;
using MinimalApi.Domain.Services;
using MinimalApi.Domain.Middlewares;
using MinimalApi.Infrastructure.Db;
using DotNetEnv;

Env.Load();

#region Builder
var builder = WebApplication.CreateBuilder(args);

var host = Environment.GetEnvironmentVariable("MYSQL_HOST");
var database = Environment.GetEnvironmentVariable("MYSQL_DATABASE");
var user = Environment.GetEnvironmentVariable("MYSQL_USER");
var password = Environment.GetEnvironmentVariable("MYSQL_PASSWORD");

var connectionString = $"Server={host};Database={database};Uid={user};Pwd={password};";

var jwtSettings = builder.Configuration.GetSection("Jwt").Get<JwtSettings>();

builder.Services.Configure<JwtSettings>(builder.Configuration.GetSection("Jwt"));
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = jwtSettings.Issuer,
        ValidAudience = jwtSettings.Audience,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings.Key))
    };
});

builder.Services.AddAuthorization();

builder.Services.AddScoped<IAdmin, AdminService>();
builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
});
builder.Services.AddScoped<IVehicle, VehicleService>();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();
#endregion

#region Middleware
app.UseErrorHandling();
app.UseValidation<AdminDTO>();
app.UseValidation<VehicleDTO>();
#endregion

#region Home
app.MapGet("/", () => Results.Json(new Home())).WithTags("Home");
#endregion

#region Admin
string GetToken(Admin admin)
{
    if (jwtSettings == null || string.IsNullOrEmpty(jwtSettings.Key))
        throw new InvalidOperationException("JWT settings are not configured properly.");

    var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings.Key));
    var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
    var claims = new List<Claim>()
    {
        new Claim("Email", admin.Email),
        new Claim("Profile", admin.Profile.ToString()),
        new Claim(ClaimTypes.Role, admin.Profile.ToString())
    };
    var token = new JwtSecurityToken(
        issuer: jwtSettings.Issuer,
        audience: jwtSettings.Audience,
        claims: claims,
        expires: DateTime.UtcNow.AddDays(1),
        signingCredentials: credentials
    );
    return new JwtSecurityTokenHandler().WriteToken(token);
}

// with manual validation
app.MapPost("admin/login", ([FromBody] LoginDTO loginDTO, IAdmin adminService) =>
{
    var admin = adminService.Login(loginDTO);
    if (admin != null)
    {
        var token = GetToken(admin);
        return Results.Ok(new AdminLogin
        {
            Email = admin.Email,
            Profile = admin.Profile.ToString(),
            Token = token
        });
    }
    return Results.Unauthorized();

}).WithTags("Admin");

// with middleware validation
app.MapGet("admin", (IAdmin adminService) =>
{
    var admins = adminService.GetAllAdmins();
    return Results.Ok(admins);
})
.RequireAuthorization()
.RequireAuthorization(new AuthorizeAttribute { Roles = "Admin" })
.WithTags("Admin");

app.MapGet("admin/{id}", (int id, IAdmin adminService) =>
{
    var admin = adminService.GetAdminById(id);
    return admin != null ? Results.Ok(admin) : Results.NotFound();
})
.RequireAuthorization()
.RequireAuthorization(new AuthorizeAttribute { Roles = "Admin" })
.WithTags("Admin");

app.MapPost("admin/register", (AdminDTO adminDTO, IAdmin adminService) =>
{
    var created = adminService.AddAdmin(adminDTO);
    return Results.Created($"admin/{created.Id}", created);
})
.RequireAuthorization()
.RequireAuthorization(new AuthorizeAttribute { Roles = "Admin" })
.WithTags("Admin");

app.MapPut("admin/register/{id}", (int id, AdminDTO adminDTO, IAdmin adminService) =>
{
    var updated = adminService.UpdateAdmin(id, adminDTO);
    return updated != null ? Results.Ok(updated) : Results.NotFound();
})
.RequireAuthorization()
.RequireAuthorization(new AuthorizeAttribute { Roles = "Admin" })
.WithTags("Admin");

app.MapDelete("admin/register/{id}", (int id, IAdmin adminService) =>
{
    adminService.DeleteAdmin(id);
    return Results.NoContent();
})
.RequireAuthorization()
.RequireAuthorization(new AuthorizeAttribute { Roles = "Admin" })
.WithTags("Admin");
#endregion

#region Vehicle
app.MapGet("vehicles", (
    IVehicle vehicleService,
    [AsParameters] VehicleFilterDTO filter
) =>
{
    var vehicles = vehicleService.GetAllVehicles(filter);
    return Results.Ok(vehicles);
}).WithTags("Vehicles");

app.MapGet("vehicles/{id}", (int id, IVehicle vehicleService) =>
{
    var vehicle = vehicleService.GetVehicleById(id);
    return vehicle != null ? Results.Ok(vehicle) : Results.NotFound();
}).WithTags("Vehicles");

app.MapPost("vehicles", (VehicleDTO vehicleDTO, IVehicle vehicleService) =>
{
    var created = vehicleService.AddVehicle(vehicleDTO);
    return Results.Created($"vehicles/{created.Id}", created);
})
.RequireAuthorization()
.RequireAuthorization(new AuthorizeAttribute { Roles = "Admin, User" })
.WithTags("Vehicles");


app.MapPut("vehicles/{id}", (int id, VehicleDTO vehicleDTO, IVehicle vehicleService) =>
{
    var existing = vehicleService.GetVehicleById(id);
    if (existing == null) return Results.NotFound();

    var updated = vehicleService.UpdateVehicle(id, vehicleDTO);
    return Results.Ok(updated);
})
.RequireAuthorization()
.RequireAuthorization(new AuthorizeAttribute { Roles = "Admin" })
.WithTags("Vehicles");

app.MapDelete("vehicles/{id}", (int id, IVehicle vehicleService) =>
{
    var existing = vehicleService.GetVehicleById(id);
    if (existing == null) return Results.NotFound();

    vehicleService.DeleteVehicle(id);
    return Results.NoContent();
})
.RequireAuthorization()
.RequireAuthorization(new AuthorizeAttribute { Roles = "Admin" })
.WithTags("Vehicles");
#endregion

#region App
app.UseSwagger();
app.UseSwaggerUI();
app.UseAuthentication();
app.UseAuthorization();
app.Run();
#endregion