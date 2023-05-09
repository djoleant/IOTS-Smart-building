using Azure.Core;
using Microsoft.EntityFrameworkCore;
using SmartBuilding_GraphQL.IService;
using SmartBuilding_GraphQL.Models;

namespace SmartBuilding_GraphQL.Service
{
    public class RoomService : IRoomService
    {
        private readonly ILogger<RoomService> _logger;
        private readonly SmartBuildingDbContext _dbContext;

        public RoomService(ILogger<RoomService> logger, SmartBuildingDbContext dbContext)
        {
            _logger = logger;
            _dbContext = dbContext;
        }
        public List<RoomValues> GetRoomInfos()
        {
            //RoomValues output = new RoomValues();
            //var room =  _dbContext.Rooms.Find(valueId);

            return _dbContext.Rooms.ToList();

                //output.ValueId = room.ValueId;
                //output.CO2 = room.CO2;
                //output.Temperature = room.Temperature;
                //output.Humidity = room.Humidity;
                //output.Light = room.Light;
                //output.Timestamp = room.Timestamp;

        }
    }
}
