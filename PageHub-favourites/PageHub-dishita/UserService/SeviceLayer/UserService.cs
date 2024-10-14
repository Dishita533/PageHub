using UserService.Exceptions;
using UserService.Models;
using UserService.RepistoryLayer;

namespace UserService.SeviceLayer
{
    public class UsersService : IUserService
    {
        private readonly IUserRepository Repository;

        public UsersService(IUserRepository Repository)
        {
            this.Repository = Repository;
        }
        public BookUser Login(string email, string password)
        {
            return Repository.Login(email, password);
        }

        public void Register(BookUser user)
        {
            var res = Repository.GetUserByEmail(user.email);
            if (res == null)
            {
                Repository.Register(user);
            }
            else
            {
                throw new UserAlreadyExistsException($"User with email {user.email} already exists");
            }
        }
        public BookUser GetUserByEmail(string email)
        {
            var res = Repository.GetUserByEmail(email);
            if (res == null)
            {
                throw new UserNotFoundException($"User with email{email} does not exists");
            }
            else
            {
                return res;
            }
        }
        public void UpdateMobileNo(string email, string mobileno)
        {
            var res = Repository.GetUserByEmail(email);
            if (res == null)
            {
                throw new UserNotFoundException($"User with email{email} does not exists");
            }
            else
            {
                Repository.UpdateMobileNo(email, mobileno);
            }
        }

        public void UpdateName(string email, string name)
        {
            var res = Repository.GetUserByEmail(email);
            if (res == null)
            {
                throw new UserNotFoundException($"User with email{email} does not exists");
            }
            else
            {
                Repository.UpdateName(email, name);
            }

        }

        public void UpdatePassword(string email, string password)
        {
            var res = Repository.GetUserByEmail(email);
            if (res == null)
            {
                throw new UserNotFoundException($"User with email{email} does not exists");
            }
            else
            {
                Repository.UpdatePassword(email, password);
            }
        }
    }
}
