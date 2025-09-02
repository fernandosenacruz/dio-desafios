using Microsoft.AspNetCore.Mvc;
using MinimalApi.Domain.DTOs;
using MinimalApi.Domain.ModelViews;
using MinimalApi.Infrastructure.Db;
using Microsoft.EntityFrameworkCore;
using MinimalApi.Domain.Interfaces;
using MinimalApi.Domain.Services;
using DotNetEnv;

Env.Load();

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
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.MapGet("/", () => Results.Json(new Home()));
app.MapPost("/login", ([FromBody] LoginDTO loginDto, IAdmin adminService) =>
{
    var result = adminService.Login(loginDto);
    return result != null ? Results.Ok() : Results.Unauthorized();
});

app.UseSwagger();
app.UseSwaggerUI();
app.Run();
