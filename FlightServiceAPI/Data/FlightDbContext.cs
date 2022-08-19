using Microsoft.EntityFrameworkCore;

using FlightServiceAPI.Models;

namespace FlightServiceAPI.Data
{
    public class FlightDbContext : DbContext
    {
        public FlightDbContext(DbContextOptions<FlightDbContext> options) : base(options)
        {

        }
        public DbSet<Flight> Flights { get; set; }
        public DbSet<Passenger> Passengers { get; set; }
    }
}
