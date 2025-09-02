using System.Linq;
using MinimalApi.Domain.DTOs;
using MinimalApi.Domain.Entities;
using MinimalApi.Domain.Interfaces;
using MinimalApi.Infrastructure.Db;

namespace MinimalApi.Domain.Services
{
    public class AdminService(AppDbContext context) : IAdmin
    {
        private readonly AppDbContext _context = context;

        public Admin? Login(LoginDTO loginDto)
        {
            var admin = _context.Admins
                .FirstOrDefault(a => a.Email == loginDto.Email && a.Password == loginDto.Password);

            return admin;
        }

        public List<Admin> GetAllAdmins()
        {
            return _context.Admins.ToList();
        }

        public Admin? GetAdminById(int id)
        {
            return _context.Admins.Find(id);
        }

        public Admin AddAdmin(AdminDTO adminDto)
        {
            var admin = new Admin
            {
                Email = adminDto.Email,
                Password = adminDto.Password,
                Profile = adminDto.Profile
            };

            _context.Admins.Add(admin);
            _context.SaveChanges();

            return admin;
        }

        public Admin? UpdateAdmin(int id, AdminDTO adminDto)
        {
            var admin = _context.Admins.Find(id);
            if (admin == null) return null;

            admin.Email = adminDto.Email;
            admin.Password = adminDto.Password;
            admin.Profile = adminDto.Profile;

            _context.Admins.Update(admin);
            _context.SaveChanges();

            return admin;
        }

        public void DeleteAdmin(int id)
        {
            var admin = _context.Admins.Find(id);
            if (admin == null) return;

            _context.Admins.Remove(admin);
            _context.SaveChanges();
        }
    }
}
