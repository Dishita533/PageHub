using UserService.Models;

namespace UserService.SeviceLayer
{
    public interface IUserService
    {
        void Register(BookUser user);
        BookUser Login(string email, string password);

        void UpdatePassword(string email, string password);

        void UpdateMobileNo(string email, string mobileno);

        void UpdateName(string email, string name);
        BookUser GetUserByEmail(string email);
    }
}
