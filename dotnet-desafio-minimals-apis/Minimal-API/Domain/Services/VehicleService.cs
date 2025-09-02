using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MinimalApi.Domain.Entities;
using MinimalApi.Domain.Interfaces;
using MinimalApi.Infrastructure.Db;

namespace MinimalApi.Domain.Services
{
    public class VehicleService(AppDbContext context) : IVehicle
    {
        private readonly AppDbContext _context = context;

        public List<Vehicle> GetAllVehicles(
            string? brand = null,
            string? model = null,
            int pageNumber = 1,
            int pageSize = 10,
            string? sortBy = null,
            bool ascending = true
        )
        {
            var query = _context.Vehicles.AsQueryable();

            if (!string.IsNullOrEmpty(brand))
            {
                query = query.Where(v => v.Brand.ToLower().Contains(brand.ToLower()));
            }

            if (!string.IsNullOrEmpty(model))
            {
                query = query.Where(v => v.Model.ToLower().Contains(model.ToLower()));
            }

            if (!string.IsNullOrEmpty(sortBy))
            {
                query = ascending
                    ? query.OrderBy(v => EF.Property<object>(v, sortBy))
                    : query.OrderByDescending(v => EF.Property<object>(v, sortBy));
            }

            return query.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList();
        }

        public Vehicle? GetVehicleById(int id)
        {
            return _context.Vehicles.Find(id);
        }

        public Vehicle AddVehicle(Vehicle vehicle)
        {
            _context.Vehicles.Add(vehicle);
            _context.SaveChanges();
            return vehicle;
        }

        public Vehicle UpdateVehicle(Vehicle vehicle)
        {
            _context.Vehicles.Update(vehicle);
            _context.SaveChanges();
            return vehicle;
        }

        public void DeleteVehicle(int id)
        {
            var vehicle = _context.Vehicles.Find(id);
            if (vehicle != null)
            {
                _context.Vehicles.Remove(vehicle);
                _context.SaveChanges();
            }
        }
    }
}