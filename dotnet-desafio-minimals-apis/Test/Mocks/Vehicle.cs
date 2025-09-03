using MinimalApi.Domain.Entities;
using MinimalApi.Domain.DTOs;

namespace Test.Mocks;

public static class VehicleMocks
{
    public static readonly Vehicle newVehicle = new Vehicle()
    {
        Id = 1,
        Brand = "Toyota",
        Model = "Corolla",
        Year = "2020",
    };

    public static List<Vehicle> vehicleList = new List<Vehicle>()
    {
        new Vehicle()
        {
            Id = 1,
            Brand = "Toyota",
            Model = "Corolla",
            Year = "2020",
        },
        new Vehicle()
        {
            Id = 2,
            Brand = "Honda",
            Model = "Civic",
            Year = "2019",
        }
    };
}