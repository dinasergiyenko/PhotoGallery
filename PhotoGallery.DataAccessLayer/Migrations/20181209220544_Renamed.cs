using Microsoft.EntityFrameworkCore.Migrations;

namespace PhotoGallery.DataAccessLayer.Migrations
{
    public partial class Renamed : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Descirption",
                table: "Albums",
                newName: "Description");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Description",
                table: "Albums",
                newName: "Descirption");
        }
    }
}
