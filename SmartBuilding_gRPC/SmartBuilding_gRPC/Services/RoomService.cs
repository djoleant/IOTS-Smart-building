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

        public override Task<RoomVals> GetRoominfo(RoomValsId request, ServerCallContext context)
        {
            RoomVals output = new RoomVals();



            return Task.FromResult(output);
        }
    }
}

// C:\Users\Djole\Desktop\git\IoTS-Smart-building\SmartBuilding_gRPC\SmartBuilding_gRPC\obj\Debug\net6.0\Protos\GreetGrpc.cs