using System;
using System.Linq;
using AngularUi.Models;
using AngularUi.Repos;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace AngularUi.Controllers
{
    [Route("api/[controller]")]
    public class GamesController : Controller
    {
        private readonly GameRepo _gameRepo;
        public GamesController(GameRepo gameRepo)
        {
            _gameRepo = gameRepo;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var result = _gameRepo.GetAll().ToList();

            return Ok(result);
        }


        [HttpGet("{id}")]
        public IActionResult Get(Guid id)
        {
            var result = _gameRepo.GetGames(id);
            return Ok(result);
        }

        // POST api/values
        [HttpPost]
        public IActionResult Post([FromBody]Game game)
        {
            var result = _gameRepo.Save(game);
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
            _gameRepo.Delete(id);
            return new NoContentResult();
        }
    }
}
