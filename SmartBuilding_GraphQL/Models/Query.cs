using SmartBuilding_GraphQL.IService;
using SmartBuilding_GraphQL.Models;

namespace SmartBuilding_GraphQL.Models
{
    public class Query
    {
        IRoomService _roomService = null;

        public Query(IRoomService roomService)
        {
            _roomService = roomService;
        }

        public IRoomService Get_roomService()
        {
            return _roomService;
        }

        public List<RoomValues> GetRoomValues()
        {
            return _roomService.GetRoomInfos();
        }
    }
}
