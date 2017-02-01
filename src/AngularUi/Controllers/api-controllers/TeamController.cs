using System;
using System.Linq;
using AngularUi.Models;
using AngularUi.Repos;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace AngularUi.Controllers
{
    [Route("api/[controller]")]
    public class TeamsController : Controller
    {
        private readonly TeamRepo _teamRepo;
        public TeamsController(TeamRepo teamRepo)
        {
            _teamRepo = teamRepo;
        }
        
        [HttpGet]
        public IActionResult Get()
        {
            var result = _teamRepo.GetAll().ToList();

            return Ok(result);
        }

       
        [HttpGet("{id}")]
        public IActionResult Get(Guid id)
        {
            var result = _teamRepo.GetTeams(id);
            return Ok(result);
        }

        // POST api/values
        [HttpPost]
        public IActionResult Post([FromBody]Team team)
        {
            var result = _teamRepo.Save(team);
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
            _teamRepo.Delete(id);
            return new NoContentResult();
        }
    }
}
