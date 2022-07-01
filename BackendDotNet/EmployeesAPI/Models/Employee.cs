using System;
using System.Collections.Generic;

namespace EmployeesAPI.Models
{
    public partial class Employee
    {
        public int Id { get; set; }
        public string? DName { get; set; }
        public long NationalNumber { get; set; }
        public string Fname { get; set; } = null!;
        public string? Mname { get; set; }
        public string Lname { get; set; } = null!;
        public string? Adress { get; set; }
        public double Salary { get; set; }
        public string? Sex { get; set; }
        public DateTime BDate { get; set; }

        public virtual Department? DNameNavigation { get; set; }
    }
}
