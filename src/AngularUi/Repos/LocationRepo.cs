using System;
using System.Collections.Generic;
using System.Linq;
using AngularUi.Models;
using Microsoft.AspNetCore.Hosting;
using Newtonsoft.Json;

namespace AngularUi.Repos
{
    public class LocationRepo
    {
        private readonly IHostingEnvironment _hostingEnvironment;
        public LocationRepo(IHostingEnvironment hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
        }

        internal List<Location> GetAll()
        {
            var filePath = _hostingEnvironment.ContentRootPath + "/Json-Data/data-Locations.json";

            var json = System.IO.File.ReadAllText(filePath);

            var locations = JsonConvert.DeserializeObject<List<Location>>(json);

            return locations;
        }

        internal Location GetLocations(Guid id)
        {
            var filePath = _hostingEnvironment.ContentRootPath + "/Json-Data/data-Locations.json";

            var json = System.IO.File.ReadAllText(filePath);

            var locations = JsonConvert.DeserializeObject<List<Location>>(json);

            return locations.FirstOrDefault(t => t.Id.Equals(id));
        }

        internal Location Save(Location location)
        {
            var locations = this.GetAll();

            var exists = locations.First(t => t.Id == location.Id);

            if (exists == null)
            {
                location.Id =  Guid.NewGuid();
                locations.Add(location);
            }
            else
            {
                var itemIndex = locations.FindIndex(t => t.Id == location.Id);
                locations[itemIndex] = location;
            }

            WriteData(locations);
            return location;
        }

        internal void Delete(Guid id)
        {
            var locations = this.GetAll();
            var itemIndex = locations.FindIndex(t => t.Id == id);
            locations.RemoveAt(itemIndex);
            WriteData(locations);
        }

        private bool WriteData(List<Location> locations)
        {
            var filePath = _hostingEnvironment.ContentRootPath + "/Json-Data/data-Locations.json";
            var json = JsonConvert.SerializeObject(locations, Formatting.Indented);
            System.IO.File.WriteAllText(filePath, json);
            return true;
        }
    }
}
