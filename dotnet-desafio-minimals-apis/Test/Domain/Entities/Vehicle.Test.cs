using MinimalApi.Domain.Entities;
using MinimalApi.Domain.DTOs;
using Test.Mocks;

namespace Test.Domain.Entities;

[TestClass]
public class VehicleTests
{
    [TestMethod]
    public void TestVehicleGettersAndSetters()
    {
        var vehicle = VehicleMocks.newVehicle;

        Assert.AreEqual(1, vehicle.Id);
        Assert.AreEqual("Toyota", vehicle.Brand);
        Assert.AreEqual("Corolla", vehicle.Model);
        Assert.AreEqual("2020", vehicle.Year);
    }
}