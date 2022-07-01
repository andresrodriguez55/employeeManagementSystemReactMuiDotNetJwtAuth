using EmployeesAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace EmployeesAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        EMPLOYEE_DATABASEContext context;
        private readonly IJwtAuthenticationManager jwtAuthenticationManager;
        public UserController(IJwtAuthenticationManager jwtAuthenticationManager)
        {
            this.context = new EMPLOYEE_DATABASEContext();
            this.jwtAuthenticationManager = jwtAuthenticationManager;
        }

        [HttpPost("authenticate")]
        public ActionResult Authenticate(BusinessUser businessUser)
        {
            var token = jwtAuthenticationManager.Authenticate(businessUser);
            if (token == null)
            {
                return Unauthorized();
            }
            return Ok(token);
        }
    }
}
