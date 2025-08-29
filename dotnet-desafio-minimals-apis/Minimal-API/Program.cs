using MinimalApi.Domain.DTOs;
using MinimalApi.Infrastructure.Db;
using Microsoft.EntityFrameworkCore;
using DotNetEnv;

Env.Load();

var builder = WebApplication.CreateBuilder(args);

var host = Environment.GetEnvironmentVariable("MYSQL_HOST");
var database = Environment.GetEnvironmentVariable("MYSQL_DATABASE");
var user = Environment.GetEnvironmentVariable("MYSQL_USER");
var password = Environment.GetEnvironmentVariable("MYSQL_PASSWORD");

var connectionString = $"Server={host};Database={database};Uid={user};Pwd={password};";

builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
});

var app = builder.Build();

app.MapGet("/", () => "Hello World!");

app.MapPost("/login", (LoginDTO loginDto) =>
{
    var result = loginDto.Email == "admin@admin.com" && loginDto.Password == "123456";
    return result ? Results.Ok() : Results.Unauthorized();
});

app.Run();
