using Microsoft.EntityFrameworkCore;
using MinimalApi.Domain.Entities;

namespace MinimalApi.Infrastructure.Db
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Admin>()
                .Property(a => a.Profile)
                .HasConversion<string>();
        }

        public DbSet<Admin> Admins { get; set; } = default!;
        public DbSet<Vehicle> Vehicles { get; set; } = default!;
    }
}
