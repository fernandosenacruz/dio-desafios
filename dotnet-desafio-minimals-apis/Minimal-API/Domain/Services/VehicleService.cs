using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MinimalApi.Domain.DTOs;
using MinimalApi.Domain.Entities;
using MinimalApi.Domain.Interfaces;
using MinimalApi.Infrastructure.Db;

namespace MinimalApi.Domain.Services
{
    public class VehicleService(AppDbContext context) : IVehicle
    {
        private readonly AppDbContext _context = context;

        public List<Vehicle> GetAllVehicles(VehicleFilterDTO filter)
        {
            var query = _context.Vehicles.AsQueryable();

            if (!string.IsNullOrEmpty(filter.Brand))
            {
                query = query.Where(v => v.Brand.ToLower().Contains(filter.Brand.ToLower()));
            }

            if (!string.IsNullOrEmpty(filter.Model))
            {
                query = query.Where(v => v.Model.ToLower().Contains(filter.Model.ToLower()));
            }

            if (!string.IsNullOrEmpty(filter.SortBy))
            {
                query = filter.Ascending
                    ? query.OrderBy(v => EF.Property<object>(v, filter.SortBy))
                    : query.OrderByDescending(v => EF.Property<object>(v, filter.SortBy));
            }

            return query
                .Skip((filter.PageNumber - 1) * filter.PageSize)
                .Take(filter.PageSize)
                .ToList();
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