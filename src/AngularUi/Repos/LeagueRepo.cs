using System;
using System.Collections.Generic;
using System.Linq;
using AngularUi.Models;
using Microsoft.AspNetCore.Hosting;
using Newtonsoft.Json;

namespace AngularUi.Repos
{
    public class LeagueRepo
    {
        private readonly IHostingEnvironment _hostingEnvironment;
        public LeagueRepo(IHostingEnvironment hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
        }

        internal List<League> GetAll()
        {
            var filePath = _hostingEnvironment.ContentRootPath + "/Json-Data/data-Leagues.json";

            var json = System.IO.File.ReadAllText(filePath);

            var leagues = JsonConvert.DeserializeObject<List<League>>(json);

            return leagues;
        }

        internal List<League> GetLeagues(Guid id)
        {
            var filePath = _hostingEnvironment.ContentRootPath + "/Json-Data/data-Leagues.json";

            var json = System.IO.File.ReadAllText(filePath);

            var leagues = JsonConvert.DeserializeObject<List<League>>(json);

            return leagues.Where(t => t.Id.Equals(id)).ToList();
        }

        internal League Save(League league)
        {
            var leagues = this.GetAll();

            var exists = leagues.FirstOrDefault(t => t.Id == league.Id);

            if (exists == null)
            {
                league.Id = Guid.NewGuid();
                leagues.Add(league);
            }
            else
            {
                var itemIndex = leagues.FindIndex(t => t.Id == league.Id);
                leagues[itemIndex] = league;
            }

            WriteData(leagues);
            return league;
        }

        internal void Delete(Guid id)
        {
            var leagues = this.GetAll();
            var itemIndex = leagues.FindIndex(t => t.Id == id);
            leagues.RemoveAt(itemIndex);
            WriteData(leagues);
        }

        private bool WriteData(List<League> leagues)
        {
            var filePath = _hostingEnvironment.ContentRootPath + "/Json-Data/data-Leagues.json";
            var json = JsonConvert.SerializeObject(leagues, Formatting.Indented);
            System.IO.File.WriteAllText(filePath, json);
            return true;
        }
    }
}
