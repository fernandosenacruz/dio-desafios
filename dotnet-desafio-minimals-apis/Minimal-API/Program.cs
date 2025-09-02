using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using MinimalApi.Domain.DTOs;
using MinimalApi.Domain.Entities;
using MinimalApi.Domain.ModelViews;
using MinimalApi.Infrastructure.Db;
using MinimalApi.Domain.Interfaces;
using MinimalApi.Domain.Services;
using DotNetEnv;

Env.Load();

#region Builder
var builder = WebApplication.CreateBuilder(args);

var host = Environment.GetEnvironmentVariable("MYSQL_HOST");
var database = Environment.GetEnvironmentVariable("MYSQL_DATABASE");
var user = Environment.GetEnvironmentVariable("MYSQL_USER");
var password = Environment.GetEnvironmentVariable("MYSQL_PASSWORD");

var connectionString = $"Server={host};Database={database};Uid={user};Pwd={password};";

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

#region Home
app.MapGet("/", () => Results.Json(new Home()));
#endregion

#region Admin
app.MapPost("admin/login", ([FromBody] LoginDTO loginDTO, IAdmin adminService) =>
{
    var result = adminService.Login(loginDTO);
    return result != null ? Results.Ok() : Results.Unauthorized();
});
#endregion

#region Vehicle
app.MapGet("vehicles", (
    IVehicle vehicleService,
    [AsParameters] VehicleFilterDTO filter
) =>
{
    var vehicles = vehicleService.GetAllVehicles(filter);
    return Results.Ok(vehicles);
});

app.MapGet("vehicles/{id}", (int id, IVehicle vehicleService) =>
{
    var vehicle = vehicleService.GetVehicleById(id);
    return vehicle != null ? Results.Ok(vehicle) : Results.NotFound();
});

app.MapPost("vehicles", ([FromBody] VehicleDTO vehicleDTO, IVehicle vehicleService) =>
{
    var vehicle = new Vehicle
    {
        Brand = vehicleDTO.Brand,
        Model = vehicleDTO.Model,
        Year = vehicleDTO.Year
    };

    var created = vehicleService.AddVehicle(vehicle);
    return Results.Created($"vehicles/{created.Id}", created);
});

app.MapPut("vehicles/{id}", (int id, [FromBody] VehicleDTO vehicleDTO, IVehicle vehicleService) =>
{
    var existing = vehicleService.GetVehicleById(id);
    if (existing == null) return Results.NotFound();

    existing.Brand = vehicleDTO.Brand;
    existing.Model = vehicleDTO.Model;
    existing.Year = vehicleDTO.Year;

    var updated = vehicleService.UpdateVehicle(existing);
    return Results.Ok(updated);
});

app.MapDelete("vehicles/{id}", (int id, IVehicle vehicleService) =>
{
    var existing = vehicleService.GetVehicleById(id);
    if (existing == null) return Results.NotFound();

    vehicleService.DeleteVehicle(id);
    return Results.NoContent();
});
#endregion

#region App
app.UseSwagger();
app.UseSwaggerUI();
app.Run();
#endregion