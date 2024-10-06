namespace WishListService.Repository_Layer
{
    public interface IRepository
    {
        public void AddToFavorites(string email, int id);
    }
}
