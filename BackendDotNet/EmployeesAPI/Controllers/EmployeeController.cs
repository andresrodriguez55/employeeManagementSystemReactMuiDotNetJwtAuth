using EmployeesAPI.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace EmployeesAPI.Controllers
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [Route("[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        EMPLOYEE_DATABASEContext context;
        public EmployeeController()
        {
            this.context = new EMPLOYEE_DATABASEContext();
        }

        [HttpGet]
        public IEnumerable<Employee> Get()
        {
            return this.context.Employees.ToList();
        }

 
        [HttpPost]
        public ActionResult Insert(Employee employee)
        {

            string username = User.Claims.FirstOrDefault(u => u.Type.Equals(ClaimTypes.Name)).Value;
            if (!username.Equals("admin"))
            {
                return BadRequest("You do not have rights to the action...");
            }

            try 
            {
                this.context.Employees.Add(employee);
                this.context.SaveChanges();
                return Ok();
            }
            catch(Exception error) 
            {
                return BadRequest(error.InnerException?.Message ?? error.Message);
            }   
        }

        [HttpPut]
        public ActionResult Update(Employee employee)
        {
            string username = User.Claims.FirstOrDefault(u => u.Type.Equals(ClaimTypes.Name)).Value;
            if (!username.Equals("admin"))
            {
                return BadRequest("You do not have rights to the action...");
            }

            try
            {
                this.context.Employees.Update(employee);
                context.SaveChanges();
                return Ok();
            }
            catch (Exception error)
            {
                return BadRequest(error.InnerException?.Message ?? error.Message);
            }
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            string username = User.Claims.FirstOrDefault(u => u.Type.Equals(ClaimTypes.Name)).Value;
            if (!username.Equals("admin"))
            {
                return BadRequest("You do not have rights to the action...");
            }

            var employee = context.Employees.Where(e => e.Id.Equals(id)).FirstOrDefault();

            if (employee == null) 
                return BadRequest("Employee does not exist...");

            context.Remove(employee);
            context.SaveChanges();
            return Ok();
        }
    }
}
