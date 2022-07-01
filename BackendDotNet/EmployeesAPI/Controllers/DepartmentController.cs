using EmployeesAPI.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;

namespace EmployeesAPI.Controllers
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [ApiController]
    [Route("[controller]")]
    public class DepartmentController : ControllerBase
    {
        EMPLOYEE_DATABASEContext context;
        public DepartmentController() 
        {
            this.context = new EMPLOYEE_DATABASEContext();
        }

        [HttpGet]
        public IEnumerable<Department> Get()
        {
            return this.context.Departments.ToList();
        }

        [HttpPost]
        public ActionResult Insert(Department department)
        {
            string username = User.Claims.FirstOrDefault(u => u.Type.Equals(ClaimTypes.Name)).Value;
            if (!username.Equals("admin"))
            {
                return BadRequest("You do not have rights to the action...");
            }

            try
            {
                this.context.Departments.Add(department);
                this.context.SaveChanges();
                return Ok();
            }
            catch (Exception error)
            {
                return BadRequest(error.InnerException?.Message ?? error.Message);
            }
        }

        /*
        [HttpPut]
        public ActionResult Update(string oldDepartmentName, Department newDepartment)
        {
            var searchedDepartment = this.context.Departments.Where(d => d.DName.Equals(oldDepartmentName)).FirstOrDefault();
            if (searchedDepartment == null)
                return BadRequest("Department does not exist...");

            try
            {
                searchedDepartment.DName = newDepartment.DName;
                context.SaveChanges();
                return Ok();
            }
            catch (Exception error)
            {
                return BadRequest(error.InnerException?.Message ?? error.Message);
            } 
        }
        */

        [HttpDelete("{dName}")]
        public ActionResult Delete(String dName)
        {
            string username = User.Claims.FirstOrDefault(u => u.Type.Equals(ClaimTypes.Name)).Value;
            if (!username.Equals("admin"))
            {
                return BadRequest("You do not have rights to the action...");
            }

            var department = context.Departments.Where(d => d.DName.Equals(dName) ).FirstOrDefault();
            if (department == null)
                return BadRequest("Department does not exist...");

            context.Remove(department);
            context.SaveChanges();
            return Ok();
        }
    }
}