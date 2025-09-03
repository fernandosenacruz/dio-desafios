using MinimalApi.Domain.Entities;
using MinimalApi.Domain.DTOs;

namespace Test.Mocks;

public static class AdminMocks
{
    public static readonly Admin newAdmin = new Admin()
    {
        Id = 1,
        Email = "admin@example.com",
        Password = "Admin@123",
        Profile = Profile.Admin
    };

    public static List<Admin> adminList = new List<Admin>()
    {
        new Admin()
        {
            Id = 1,
            Email = "admin@example.com",
            Password = "Admin@123",
            Profile = Profile.Admin
        },
        new Admin()
        {
            Id = 2,
            Email = "user@example.com",
            Password = "User@123",
            Profile = Profile.Admin
        }
    };
}
