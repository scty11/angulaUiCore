using System;
using System.Collections.Generic;
using System.Linq;
using AngularUi.Models;
using Microsoft.AspNetCore.Hosting;
using Newtonsoft.Json;

namespace AngularUi.Repos
{
    public class TeamRepo
    {
        private readonly IHostingEnvironment _hostingEnvironment;
        public TeamRepo(IHostingEnvironment hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
        }

        internal List<Team> GetAll()
        {
            var filePath = _hostingEnvironment.ContentRootPath + "/Json-Data/data-teams.json";

            var json = System.IO.File.ReadAllText(filePath);

            var teams = JsonConvert.DeserializeObject<List<Team>>(json);

            return teams;
        }

        internal List<Team> GetTeams(Guid leagueId)
        {
            var filePath = _hostingEnvironment.ContentRootPath + "/Json-Data/data-teams.json";

            var json = System.IO.File.ReadAllText(filePath);

            var teams = JsonConvert.DeserializeObject<List<Team>>(json);

            return teams.Where(t => t.LeagueId.Equals(leagueId)).ToList();
        }

        internal Team Save(Team team)
        {
            var teams = this.GetAll();

            var exists = teams.First(t => t.Id == team.Id);

            if (exists == null)
            {
                team.Id = Guid.NewGuid();
                teams.Add(team);
            }
            else
            {
                var itemIndex = teams.FindIndex(t => t.Id == team.Id);
                teams[itemIndex] = team;
            }

            WriteData(teams);
            return team;
        }

        internal void Delete(Guid id)
        {
            var teams = this.GetAll();
            var itemIndex = teams.FindIndex(t => t.Id == id);
            teams.RemoveAt(itemIndex);
            WriteData(teams);
        }

        private bool WriteData(List<Team> teams)
        {
            var filePath = _hostingEnvironment.ContentRootPath + "/Json-Data/data-teams.json";
            var json = JsonConvert.SerializeObject(teams, Formatting.Indented);
            System.IO.File.WriteAllText(filePath, json);
            return true;
        }
    }
}
