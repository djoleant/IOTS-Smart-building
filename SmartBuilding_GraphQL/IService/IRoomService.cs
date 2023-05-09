using SmartBuilding_GraphQL.Models;

namespace SmartBuilding_GraphQL.IService
{
    public interface IRoomService
    {
        List<RoomValues> GetRoomInfos();
    }
}
