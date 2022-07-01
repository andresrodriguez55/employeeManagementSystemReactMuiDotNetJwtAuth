using EmployeesAPI.Models;

namespace EmployeesAPI
{
    public interface IJwtAuthenticationManager
    {
        string Authenticate(BusinessUser businessUser);
    }
}
