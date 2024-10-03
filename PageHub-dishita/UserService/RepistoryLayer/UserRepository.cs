using UserService.Models;
using UserService.UserDbContext;

namespace UserService.RepistoryLayer
{
    public class UserRepository : IUserRepository
    {
        private readonly UsersDbContext context;
        public UserRepository(UsersDbContext context)
        {
            this.context = context;
        }
      

        public BookUser Login(string email, string password)
        {
            return context.Users.Where(u => u.email == email && u.Password == password).FirstOrDefault();
        }

        public void Register(BookUser user)
        {
            context.Users.Add(user);
            context.SaveChanges();
        }

        public void UpdateMobileNo(string email, string mobileno)
        {
            BookUser u = context.Users.Where(u => u.email == email).FirstOrDefault();
            u.MobileNo = mobileno;
            context.SaveChanges();
        }
        public BookUser GetUserByEmail(string email)
        {
            return context.Users.Where(u => u.email == email).FirstOrDefault();
        }


        public void UpdateName(string email, string name)
        {
        BookUser u = context.Users.Where(u => u.email == email).FirstOrDefault();
        u.UserName = name;
        context.SaveChanges();
    }

        public void UpdatePassword(string email, string password)
        {
            BookUser u = context.Users.Where(u => u.email == email).FirstOrDefault();
            u.Password = password;
            context.SaveChanges();
        }
    }
}
