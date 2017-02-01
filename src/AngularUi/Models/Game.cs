using System;

namespace AngularUi.Models
{
    public class Game
    {
        public Guid Id { get; set; }
        public Guid LocationId { get; set; }
        public Guid Team1Id { get; set; }
        public Guid Team2Id { get; set; }
        public string Team1Score { get; set; }
        public string Team2Score { get; set; }
        public DateTime time { get; set; }
        public Guid LeagueId { get; set; }
    }
}
