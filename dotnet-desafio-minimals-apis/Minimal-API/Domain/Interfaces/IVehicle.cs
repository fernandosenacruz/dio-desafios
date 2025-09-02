using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MinimalApi.Domain.Entities;
using MinimalApi.Domain.DTOs;

namespace MinimalApi.Domain.Interfaces
{
    public interface IVehicle
    {
        List<Vehicle> GetAllVehicles(VehicleFilterDTO filter);
        Vehicle? GetVehicleById(int id);
        Vehicle AddVehicle(Vehicle vehicle);
        Vehicle UpdateVehicle(Vehicle vehicle);
        void DeleteVehicle(int id);
    }
}