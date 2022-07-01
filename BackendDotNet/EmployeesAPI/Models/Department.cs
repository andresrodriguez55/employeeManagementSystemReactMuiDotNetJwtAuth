using System;
using System.Collections.Generic;

namespace EmployeesAPI.Models
{
    public partial class Department
    {
        public Department()
        {
            Employees = new HashSet<Employee>();
        }

        public string DName { get; set; } = null!;

        public virtual ICollection<Employee> Employees { get; set; }
    }
}
