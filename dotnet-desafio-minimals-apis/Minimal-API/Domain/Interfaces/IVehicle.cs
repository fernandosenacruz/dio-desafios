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
        Vehicle AddVehicle(VehicleDTO vehicleDTO);
        Vehicle UpdateVehicle(int id, VehicleDTO vehicleDTO);
        void DeleteVehicle(int id);
    }
}