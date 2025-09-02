using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace minimal_api.Migrations
{
    /// <inheritdoc />
    public partial class AlterProfileToEnum : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Admins",
                keyColumn: "Id",
                keyValue: 1);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Admins",
                columns: new[] { "Id", "Email", "Password", "Profile" },
                values: new object[] { 1, "admin1@example.com", "123456", "Admin" });
        }
    }
}
