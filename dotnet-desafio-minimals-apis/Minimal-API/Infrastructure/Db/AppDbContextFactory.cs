using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using DotNetEnv;
using MinimalApi.Infrastructure.Db;
using System;

namespace MinimalApi.Infrastructure.Db
{
    public class AppDbContextFactory : IDesignTimeDbContextFactory<AppDbContext>
    {
        public AppDbContext CreateDbContext(string[] args)
        {
            // Carrega .env
            Env.Load();

            var host = Environment.GetEnvironmentVariable("MYSQL_HOST");
            var database = Environment.GetEnvironmentVariable("MYSQL_DATABASE");
            var user = Environment.GetEnvironmentVariable("MYSQL_USER");
            var password = Environment.GetEnvironmentVariable("MYSQL_PASSWORD");

            if (string.IsNullOrEmpty(host) || string.IsNullOrEmpty(database) ||
                string.IsNullOrEmpty(user) || string.IsNullOrEmpty(password))
            {
                throw new InvalidOperationException("Variáveis de ambiente do MySQL não estão definidas!");
            }

            var connectionString = $"Server={host};Database={database};Uid={user};Pwd={password};";

            var optionsBuilder = new DbContextOptionsBuilder<AppDbContext>();
            optionsBuilder.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));

            return new AppDbContext(optionsBuilder.Options);
        }
    }
}
