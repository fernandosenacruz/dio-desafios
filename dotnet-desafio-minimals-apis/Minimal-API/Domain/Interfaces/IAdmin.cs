using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MinimalApi.Domain.DTOs;
using MinimalApi.Domain.Entities;

namespace MinimalApi.Domain.Interfaces
{
    public interface IAdmin
    {
        Admin? Login(LoginDTO loginDto);
        List<Admin> GetAllAdmins();
        Admin? GetAdminById(int id);
        Admin AddAdmin(AdminDTO adminDto);
        Admin? UpdateAdmin(int id, AdminDTO adminDto);
        void DeleteAdmin(int id);
    }
}