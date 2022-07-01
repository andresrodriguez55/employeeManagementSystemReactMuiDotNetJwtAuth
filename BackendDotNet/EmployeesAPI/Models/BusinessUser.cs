using System;
using System.Collections.Generic;

namespace EmployeesAPI.Models
{
    public partial class BusinessUser
    {
        public string Username { get; set; } = null!;
        public string? Passwrd { get; set; }
    }
}
