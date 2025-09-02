using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MinimalApi.Domain.Entities;

namespace MinimalApi.Domain.Interfaces
{
    public interface IVehicle
    {
        List<Vehicle> GetAllVehicles(
            string? brand = null,
            string? model = null,
            int pageNumber = 1,
            int pageSize = 10,
            string? sortBy = null,
            bool ascending = true
        );

        Vehicle? GetVehicleById(int id);
        Vehicle AddVehicle(Vehicle vehicle);
        Vehicle UpdateVehicle(Vehicle vehicle);
        void DeleteVehicle(int id);
    }
}