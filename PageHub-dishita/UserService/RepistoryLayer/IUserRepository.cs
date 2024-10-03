using System.Net;
using UserService.Models;

namespace UserService.RepistoryLayer
{
    public interface IUserRepository
    {
        void Register(BookUser user);
        BookUser GetUserByEmail(string email);
        BookUser Login(string email, string password);
        
        void UpdatePassword(string email, string password);

        void UpdateMobileNo(string email, string mobileno);

        void UpdateName(string email, string name);

    }
}
