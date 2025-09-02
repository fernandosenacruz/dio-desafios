using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MinimalApi.Domain.DTOs
{
    public record VehicleDTO
    {
        public required string Brand { get; init; }
        public required string Model { get; init; }
        public required string Year { get; init; }
    }

    public record VehicleFilterDTO
    {
        public string? Brand { get; init; }
        public string? Model { get; init; }
        public int? Year { get; init; }
        public int PageNumber { get; init; } = 1;
        public int PageSize { get; init; } = 10;
        public string? SortBy { get; init; }
        public bool Ascending { get; init; } = true;
    }
}