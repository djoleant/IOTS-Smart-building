using Microsoft.EntityFrameworkCore;

namespace SmartBuilding_gRPC.Models
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
