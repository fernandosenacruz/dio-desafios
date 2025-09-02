using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MinimalApi.Domain.ModelViews
{
    public class ErrorValidationList
    {
        public List<string> Errors { get; set; } = new List<string>();
    }
}