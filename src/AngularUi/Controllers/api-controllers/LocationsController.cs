using System;
using System.Linq;
using AngularUi.Models;
using AngularUi.Repos;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace AngularUi.Controllers
{
    [Route("api/[controller]")]
    public class LocationsController : Controller
    {
        private readonly LocationRepo _locationRepo;
        public LocationsController(LocationRepo locationRepo)
        {
            _locationRepo = locationRepo;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var result = _locationRepo.GetAll().ToList();

            return Ok(result);
        }


        [HttpGet("{id}")]
        public IActionResult Get(Guid id)
        {
            var result = _locationRepo.GetLocations(id);
            return Ok(result);
        }

        // POST api/values
        [HttpPost]
        public IActionResult Post([FromBody]Location location)
        {
            var result = _locationRepo.Save(location);
            return Ok(result);
        }

        // PUT api/values/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody]string value)
        //{
        //}

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public IActionResult Delete(Guid id)
        {
            _locationRepo.Delete(id);
            return new NoContentResult();
        }
    }
}
