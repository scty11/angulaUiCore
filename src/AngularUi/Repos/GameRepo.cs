using System;
using System.Collections.Generic;
using System.Linq;
using AngularUi.Models;
using Microsoft.AspNetCore.Hosting;
using Newtonsoft.Json;

namespace AngularUi.Repos
    {
        public class GameRepo
        {
            private readonly IHostingEnvironment _hostingEnvironment;
            public GameRepo(IHostingEnvironment hostingEnvironment)
            {
                _hostingEnvironment = hostingEnvironment;
            }

            internal List<Game> GetAll()
            {
                var filePath = _hostingEnvironment.ContentRootPath + "/Json-Data/data-Games.json";

                var json = System.IO.File.ReadAllText(filePath);

                var games = JsonConvert.DeserializeObject<List<Game>>(json);

                return games;
            }

            internal List<Game> GetGames(Guid leagueId)
            {
                var filePath = _hostingEnvironment.ContentRootPath + "/Json-Data/data-Games.json";

                var json = System.IO.File.ReadAllText(filePath);

                var games = JsonConvert.DeserializeObject<List<Game>>(json);

                return games.Where(t => t.LeagueId.Equals(leagueId)).ToList();
            }

            internal Game Save(Game game)
            {
                var games = this.GetAll();

                var exists = games.First(t => t.Id == game.Id);

                if (exists == null)
                {
                    game.Id = Guid.NewGuid();
                    games.Add(game);
                }
                else
                {
                    var itemIndex = games.FindIndex(t => t.Id == game.Id);
                    games[itemIndex] = game;
                }

                WriteData(games);
                return game;
            }

            internal void Delete(Guid id)
            {
                var games = this.GetAll();
                var itemIndex = games.FindIndex(t => t.Id == id);
                games.RemoveAt(itemIndex);
                WriteData(games);
            }

            private bool WriteData(List<Game> games)
            {
                var filePath = _hostingEnvironment.ContentRootPath + "/Json-Data/data-Games.json";
                var json = JsonConvert.SerializeObject(games, Formatting.Indented);
                System.IO.File.WriteAllText(filePath, json);
                return true;
            }
        }
    }



