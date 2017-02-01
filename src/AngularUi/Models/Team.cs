using System;

namespace AngularUi.Models
{
    public class Team
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Coach { get; set; }
        public string DivisionName { get; set; }
        public Guid LeagueId { get; set; }

    }
}
