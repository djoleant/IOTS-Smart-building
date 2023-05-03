using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace SmartBuilding_gRPC.Models
{
    public class RoomValues
    {
        [Key]
        public string ValueId { get; set; }
        public long Timestamp { get; set; }
        public float CO2 { get; set; }
        public float Humidity { get; set; }
        public float Light { get; set; }
        public float Temperature { get; set; }
    }
}
