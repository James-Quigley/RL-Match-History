var express = require('express');
var passport = require('passport');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var Game = mongoose.model("Game");
var router = express.Router();


/* GET home page. */
router.get('/player/:playerID/game/:gameID', function(req, res, next) {
    Game.findOne({PlayerID: req.params.playerID, GameId: req.params.gameID}, function(err, game) {
        if (err){
            res.send(err);
        }
        res.json(game);
    });
});

router.post('/player/:playerID/game/:gameID', function(req, res, next) {
    var game = new Game({
        TeamSize : req.body.TeamSize,
        Team0Score : req.body.Team0Score,
        Team1Score : req.body.Team1Score,
        Goals : req.body.Goals,
        PlayerStats : req.body.PlayerStats,
        ReplayName : req.body.ReplayName,
        GameId : req.body.Id,
        MapName : req.body.MapName,
        Date : req.body.Date,
        MatchType : req.body.MatchType,
        PlayerID : req.body.PlayerName
    });
    
    console.log(game);

    game.save(function(err){
        if (err)
            res.send(err);
        
        res.json({message: 'Game submitted!'});
    });
});

module.exports = router;
