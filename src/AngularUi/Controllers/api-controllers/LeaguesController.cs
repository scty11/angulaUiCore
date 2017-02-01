using System;
using System.Linq;
using AngularUi.Models;
using AngularUi.Repos;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace AngularUi.Controllers
{
    [Route("api/[controller]")]
    public class LeaguesController : Controller
    {
        private readonly LeagueRepo _leagueRepo;
        public LeaguesController(LeagueRepo leagueRepo)
        {
            _leagueRepo = leagueRepo;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var result = _leagueRepo.GetAll().ToList();

            return Ok(result);
        }


        [HttpGet("{id}")]
        public IActionResult Get(Guid id)
        {
            var result = _leagueRepo.GetLeagues(id);
            return Ok(result);
        }

        // POST api/values
        [HttpPost]
        public IActionResult Post([FromBody]League league)
        {
            var result = _leagueRepo.Save(league);
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
            _leagueRepo.Delete(id);
            return new NoContentResult();
        }
    }
}
