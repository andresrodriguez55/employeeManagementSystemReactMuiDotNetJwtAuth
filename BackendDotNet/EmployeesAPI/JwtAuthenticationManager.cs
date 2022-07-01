using EmployeesAPI.Models;

using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace EmployeesAPI
{
    public class JwtAuthenticationManager : IJwtAuthenticationManager
    {
        private readonly string key;

        public JwtAuthenticationManager(string key)
        {
            this.key = key;
        }

        public string Authenticate(BusinessUser businessUser)
        {
            EMPLOYEE_DATABASEContext context = new EMPLOYEE_DATABASEContext();

            if (!context.BusinessUsers.Any(b => b.Username.Equals(businessUser.Username) &&
                b.Passwrd.Equals(businessUser.Passwrd)))
            {
                return null;
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenKey = Encoding.ASCII.GetBytes(key);

            var tokenDescriptor = new SecurityTokenDescriptor();
            tokenDescriptor.Subject = new ClaimsIdentity(
                new Claim[]
                {
                   new Claim(ClaimTypes.Name, businessUser.Username),
                   new Claim("passwrd", businessUser.Passwrd)
                }
            );
            tokenDescriptor.Expires = DateTime.UtcNow.AddHours(1);
            tokenDescriptor.SigningCredentials = new SigningCredentials(
                new SymmetricSecurityKey(tokenKey),
                SecurityAlgorithms.HmacSha256Signature
            );

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
