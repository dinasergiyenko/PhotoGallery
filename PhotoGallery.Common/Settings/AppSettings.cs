namespace PhotoGallery.Common.Settings
{
    public class AppSettings
    {
        public string DbConnectionString { get; set; }

        public string JwtBearerKey { get; set; }

        public int JwtBearerLifeTime { get; set; }
    }
}
