using System.ComponentModel.DataAnnotations;

namespace FlightServiceAPI.Models
{
    public partial class Passenger
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public int Age { get; set; }
        public string Email { get; set; }
        public string Occupation { get; set; }

        public virtual ICollection<Flight> Flights { get; set; }
    }
}
