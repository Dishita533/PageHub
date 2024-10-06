namespace WishListService.DataAccess_Layer
{
    public interface IDataAccess
    {
        public void AddToFavorites(string email, int id);
    }
}
