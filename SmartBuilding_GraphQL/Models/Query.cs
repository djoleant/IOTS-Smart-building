

namespace SmartBuilding_GraphQL.Models
{
    public class Query
    {
        [UseProjection]
        [UseFiltering]
        [UseSorting]
        public IQueryable<RoomValues> GetSensorValues([Service] SmartBuildingDbContext context) =>
            context.Rooms;

    }
}
