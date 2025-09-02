using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MinimalApi.Domain.ModelViews
{
    public readonly struct Home
    {
        public string Title { get; }
        public string Description { get; }
        public string Doc { get; }

        public Home()
        {
            Title = "Minimal API";
            Description = "A simple example of a minimal API";
            Doc = "/swagger";
        }
    }
}