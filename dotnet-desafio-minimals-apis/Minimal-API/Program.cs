using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
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
app.UseValidation<VehicleDTO>();
#endregion

#region Home
app.MapGet("/", () => Results.Json(new Home())).WithTags("Home");
#endregion

#region Admin
app.MapPost("admin/login", ([FromBody] LoginDTO loginDTO, IAdmin adminService) =>
{
    var result = adminService.Login(loginDTO);
    return result != null ? Results.Ok() : Results.Unauthorized();
}).WithTags("Admin");
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
}).WithTags("Vehicles");


app.MapPut("vehicles/{id}", (int id, VehicleDTO vehicleDTO, IVehicle vehicleService) =>
{
    var existing = vehicleService.GetVehicleById(id);
    if (existing == null) return Results.NotFound();

    var updated = vehicleService.UpdateVehicle(id, vehicleDTO);
    return Results.Ok(updated);
}).WithTags("Vehicles");

app.MapDelete("vehicles/{id}", (int id, IVehicle vehicleService) =>
{
    var existing = vehicleService.GetVehicleById(id);
    if (existing == null) return Results.NotFound();

    vehicleService.DeleteVehicle(id);
    return Results.NoContent();
}).WithTags("Vehicles");
#endregion

#region App
app.UseSwagger();
app.UseSwaggerUI();
app.Run();
#endregion