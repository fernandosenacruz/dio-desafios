using System.Linq;
using MinimalApi.Domain.DTOs;
using MinimalApi.Domain.Entities;
using MinimalApi.Domain.Interfaces;
using MinimalApi.Infrastructure.Db;

namespace MinimalApi.Domain.Services
{
    public class AdminService : IAdmin
    {
        private readonly AppDbContext _context;

        public AdminService(AppDbContext context)
        {
            _context = context;
        }

        public Admin? Login(LoginDTO loginDto)
        {
            var admin = _context.Admins
                .FirstOrDefault(a => a.Email == loginDto.Email && a.Password == loginDto.Password);

            return admin;
        }
    }
}
