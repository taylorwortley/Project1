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
    public class PassengersController : ControllerBase
    {
        private readonly FlightDbContext _context;

        public PassengersController(FlightDbContext context)
        {
            _context = context;
        }

        // GET: api/Passengers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Passenger>>> GetPassengers()
        {
            if (_context.Passengers == null)
            {
                return NotFound();
            }
            return await _context.Passengers.ToListAsync();
        }

        // GET: api/Passengers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Passenger>> GetPassenger(int id)
        {
            if (_context.Passengers == null)
            {
                return NotFound();
            }
            var passenger = await _context.Passengers.FindAsync(id);

            if (passenger == null)
            {
                return NotFound();
            }

            return passenger;
        }

        // GET: api/Passengers/5
        [HttpGet("Flight/{id}")]
        public async Task<ActionResult<List<Passenger>>> GetPassengerByFlight(int id)
        {
            if (_context.Passengers == null)
            {
                return NotFound();
            }
            var passengers = await _context.Passengers.Where(p => p.Flights.Where(f => f.Id == id).Any()).ToListAsync();

            if (passengers == null)
            {
                return NotFound();
            }

            return Ok(passengers);
        }

        // PUT: api/Passengers/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPassenger(Passenger passenger, int id)
        {
            if (id != passenger.Id)
            {
                return BadRequest();
            }

            _context.Entry(passenger).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PassengerExists(id))
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

        // POST: api/Passengers
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Passenger>> PostPassenger(PassengerDTO passengerDto)
        {
            if (_context.Passengers == null)
            {
                return Problem("Entity set 'FlightDbContext.Passengers' is null.");
            }
            var passenger = new Passenger()
            {
                Name = passengerDto.Name,
                Age = passengerDto.Age,
                Email = passengerDto.Email,
                Occupation = passengerDto.Occupation,
                Flights = new List<Flight>()
            };
            _context.Passengers.Add(passenger);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPassenger", new { id = passenger.Id }, passenger);
        }

        // POST: api/Passengers/5/Flight/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("{id}/Flight/{flightId}")]
        public async Task<ActionResult<Passenger>> PostBooking(int id, int flightId)
        {
            if (_context.Passengers == null)
            {
                return Problem("Entity set 'FlightDbContext.Passengers' is null.");
            }
            var passenger = await _context.Passengers.FindAsync(id);
            var flight = await _context.Flights.FindAsync(flightId);
            
            if(flight == null || passenger == null)
            {
                return Problem("Flight or Passenger does not exist.");
            }

            passenger.Flights.Add(flight);
            await _context.SaveChangesAsync();

            return Ok();
        }

        // DELETE: api/Passengers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePassenger(int id)
        {
            if (_context.Passengers == null)
            {
                return NotFound();
            }
            var passenger = await _context.Passengers.FindAsync(id);
            if (passenger == null)
            {
                return NotFound();
            }

            _context.Passengers.Remove(passenger);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PassengerExists(int id)
        {
            return (_context.Passengers?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
