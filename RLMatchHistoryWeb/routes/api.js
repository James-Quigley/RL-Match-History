var express = require('express');
var passport = require('passport');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var Game = mongoose.model("Game");
var router = express.Router();


router.get('/player/:playerID/games/:gameID', function (req, res, next) {
    Game.findOne({
        PlayerID: req.params.playerID,
        GameId: req.params.gameID
    }, function (err, game) {
        if (err) {
            res.send(err);
        }
        res.json(game);
    });
});

router.post('/player/:playerID/games/:gameID', function (req, res, next) {
    var game = new Game({
        TeamSize: req.body.TeamSize,
        Team0Score: req.body.Team0Score,
        Team1Score: req.body.Team1Score,
        Goals: req.body.Goals,
        PlayerStats: req.body.PlayerStats,
        ReplayName: req.body.ReplayName,
        GameId: req.body.Id,
        MapName: req.body.MapName,
        Date: req.body.Date,
        MatchType: req.body.MatchType,
        PlayerID: req.body.PlayerName
    });

    console.log(game);

    game.save(function (err) {
        if (err)
            res.send(err);

        res.json({
            message: 'Game submitted!'
        });
    });
});

router.get('/player/:playerID/games', function (req, res, next) {
    Game.find({
        PlayerID: req.params.playerID
    }, function (err, games) {
        if (err) {
            res.send(err);
        }
        res.json(games);
    });
});

router.get('/player/:playerID', function (req, res, next) {
    var request = require('request');
    var options = {
        url: 'https://api.rocketleaguestats.com/v1/player?unique_id=' + req.params.playerID + '&platform_id=1',
        headers: {
            'Authorization': '1234567890'
        }
    };
})

module.exports = router;