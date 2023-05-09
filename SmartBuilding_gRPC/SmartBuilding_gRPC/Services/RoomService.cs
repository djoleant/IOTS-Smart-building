using Grpc.Core;
using SmartBuilding_gRPC;
using SmartBuilding_gRPC.Models;
using SmartBuilding_gRPC.Protos;

namespace SmartBuilding_gRPC.Services
{
    public class RoomService : Room.RoomBase
    {
        private readonly ILogger<RoomService> _logger;
        private readonly SmartBuildingDbContext _dbContext;

        public RoomService(ILogger<RoomService> logger, SmartBuildingDbContext dbContext)
        {
            _logger = logger;
            _dbContext = dbContext;
        }

        public override async Task<RoomVals> GetRoominfo(RoomValsId request, ServerCallContext context)
        {
            try
            {
                RoomVals output = new RoomVals();
                var room = await _dbContext.Rooms.FindAsync(request.ValueId);

                output.ValueId = room.ValueId;
                output.Co2 = room.CO2;
                output.Temperature = room.Temperature;
                output.Humidity = room.Humidity;
                output.Light = room.Light;
                output.Timestamp = room.Timestamp;

                return await Task.FromResult(output);
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public override async Task<RoomValsId> AddRoominfo(RoomVals request, ServerCallContext context)
        {
            RoomValsId output = new RoomValsId();

            RoomValues room = new RoomValues
            {
                CO2 = request.Co2,
                Humidity = request.Humidity,
                Light = request.Light,
                Timestamp = request.Timestamp,
                Temperature = request.Temperature
            };

            await _dbContext.Rooms.AddAsync(room);
            await _dbContext.SaveChangesAsync();

            output.ValueId = room.ValueId;

            return await Task.FromResult(output);
        }

        public override async Task<RoomVals> UpdateRoominfo(RoomVals request, ServerCallContext context)
        {
            RoomVals output = new RoomVals();

            RoomValues room = new RoomValues
            {
                CO2 = request.Co2,
                Humidity = request.Humidity,
                Light = request.Light,
                Timestamp = request.Timestamp,
                Temperature = request.Temperature
            };

            _dbContext.Rooms.Update(room);
            await _dbContext.SaveChangesAsync();

            output.ValueId = room.ValueId;
            output.Temperature = room.Temperature;
            output.Co2 = room.CO2;
            output.Humidity = room.Humidity;
            output.Light = room.Light;
            output.Timestamp = room.Timestamp;

            return await Task.FromResult(output);
        }

        public override async Task<Empty> DeleteRoominfo(RoomValsId request, ServerCallContext context)
        {

            var room = await _dbContext.Rooms.FindAsync(request.ValueId);

            _dbContext.Rooms.Remove(room);
            await _dbContext.SaveChangesAsync();

            return await Task.FromResult(new Empty { });
        }

    }
}

// C:\Users\Djole\Desktop\git\IoTS-Smart-building\SmartBuilding_gRPC\SmartBuilding_gRPC\obj\Debug\net6.0\Protos\GreetGrpc.cs