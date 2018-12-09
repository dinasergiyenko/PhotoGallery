namespace PhotoGallery.BusinessLogicLayer.Infrastructure.Interfaces
{
    public interface ITokenCreator
    {
        string Generate(string userIdentifier);
    }
}
