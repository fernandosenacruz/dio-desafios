using Test.Mocks;
using MinimalApi.Domain.Entities;
using MinimalApi.Domain.DTOs;

namespace Test.Domain.Entities;

[TestClass]
public class AdminTests
{
    [TestMethod]
    public void TestAdminGettersAndSetters()
    {
        var admin = AdminMocks.newAdmin;

        Assert.AreEqual(1, admin.Id);
        Assert.AreEqual("admin@example.com", admin.Email);
        Assert.AreEqual("Admin@123", admin.Password);
        Assert.AreEqual(Profile.Admin, admin.Profile);
    }
}