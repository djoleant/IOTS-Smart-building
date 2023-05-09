using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SmartBuilding_gRPC.Models
{
    public class RoomValues
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string ValueId { get; set; }
        public long Timestamp { get; set; }
        public float CO2 { get; set; }
        public float Humidity { get; set; }
        public float Light { get; set; }
        public float Temperature { get; set; }
    }
}
