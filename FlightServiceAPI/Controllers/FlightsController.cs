using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FlightServiceAPI.Data;
using FlightServiceAPI.Models;
using FlightServiceAPI.DTO;

namespace FlightServiceAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FlightsController : ControllerBase
    {
        private readonly FlightDbContext _context;

        public FlightsController(FlightDbContext context)
        {
            _context = context;
        }

        // GET: api/Flights
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Flight>>> GetFlights()
        {
            if (_context.Flights == null)
            {
                return NotFound();
            }
            return await _context.Flights.ToListAsync();
        }

        // GET: api/Flights/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Flight>> GetFlight(int id)
        {
            if (_context.Flights == null)
            {
                return NotFound();
            }
            var flight = await _context.Flights.FindAsync(id);

            if (flight == null)
            {
                return NotFound();
            }

            return flight;
        }

        // PUT: api/Flights/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFlight(int id, Flight flight)
        {
            if (id != flight.Id)
            {
                return BadRequest();
            }

            _context.Entry(flight).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FlightExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Flights
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Flight>> PostFlight(FlightDTO flightDto)
        {
            if (_context.Flights == null)
            {
                return Problem("Entity set 'FlightDbContext.Flights' is null.");
            }
            var flight = new Flight()
            {
                FlightNumber = flightDto.FlightNumber,
                Destination = flightDto.Destination,
                DepartureDateTime = flightDto.DepartureDateTime,
                ArrivalDateTime = flightDto.ArrivalDateTime,
                DepartureAirport = flightDto.DepartureAirport,
                ArrivalAirport = flightDto.ArrivalAirport,
                MaxCapacity = flightDto.MaxCapacity,
                Passengers = new List<Passenger>()
            };
            _context.Flights.Add(flight);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFlight", new { id = flight.Id }, flight);
        }

        // POST: api/Flights/5/Passengers/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("{id}/Passenger/{passengerId}")]
        public async Task<ActionResult<Passenger>> PostBooking(int id, int passengerId)
        {
            if (_context.Flights == null)
            {
                return Problem("Entity set 'FlightDbContext.Flights' is null.");
            }
            var passenger = await _context.Passengers.FindAsync(passengerId);
            var flight = await _context.Flights.FindAsync(id);
            flight.Passengers.Add(passenger);
            await _context.SaveChangesAsync();

            return Ok(flight);
        }

        // DELETE: api/Flights/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFlight(int id)
        {
            if (_context.Flights == null)
            {
                return NotFound();
            }
            var flight = await _context.Flights.FindAsync(id);
            if (flight == null)
            {
                return NotFound();
            }

            _context.Flights.Remove(flight);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool FlightExists(int id)
        {
            return (_context.Flights?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
