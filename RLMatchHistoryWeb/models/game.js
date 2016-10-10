var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Game = new Schema();
Game.add({
    TeamSize: Number,
    Team0Score: Number,
    Team1Score: Number,
    Goals: [
        {
            PlayerName: String,
            PlayerTeam: Number,
            Time: Number
        }
    ],
    PlayerStats: [
        {
            Name: String,
            Platform: String,
            OnlineID: Number,
            Team: Number,
            Score: Number,
            Goals: Number,
            Assists: Number,
            Saves: Number,
            Shots: Number,
            bBot: Boolean
        }
    ],
    ReplayName: String,
    GameId: String,
    MapName: String,
    Date: String,
    MatchType: String,
    PlayerID: String
});

mongoose.model('Game', Game);