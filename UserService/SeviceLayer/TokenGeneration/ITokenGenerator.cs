namespace UserService.SeviceLayer.TokenGeneration
{
    public interface ITokenGenerator
    {
        string GenerateToken(string email, string mobileno);
    }
}
