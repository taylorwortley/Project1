using System.ComponentModel.DataAnnotations;

namespace FlightServiceAPI.Models
{
    public partial class Flight
    {
        [Key]
        public int Id { get; set; }
        public string FlightNumber { get; set; }
        public string Destination { get; set; }
        public DateTime DepartureDateTime { get; set; }
        public DateTime ArrivalDateTime { get; set; }
        public string DepartureAirport { get; set; }
        public string ArrivalAirport { get; set; }
        public int MaxCapacity { get; set; }

        public virtual ICollection<Passenger> Passengers { get; set; }
    }
}
