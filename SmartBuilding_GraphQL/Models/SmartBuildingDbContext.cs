using Microsoft.EntityFrameworkCore;

namespace SmartBuilding_GraphQL.Models
{
    public class SmartBuildingDbContext:DbContext
    {
        public DbSet<RoomValues> Rooms { get; set; }

        public SmartBuildingDbContext(DbContextOptions options)
            : base(options)
        {

        }
    }
}
