const {Player} = require('../models/player.model');
//const mongoose = require("mongoose");

module.exports.createPlayer = (req, res) => {
    console.log(req.body);
    let games = ["Undecided", "Undecided", "Undecided"];
    Player.create({name:req.body.name, position:req.body.position, games:games})
        .then(player => res.json(player))
        .catch(err => res.status(400).json(err))
}

module.exports.allPlayers = (req, res) => {
    Player.find({}, null, {sort: {name: 1}})
        .then(players => res.json(players))
        .catch(err => res.status(400).json(err))
}

module.exports.deletePlayer = (req, res) => {
    Player.deleteOne({_id: req.params.id})
        .then(confirmation => res.json(confirmation))
        .catch(err => res.status(400).json(err));
}

module.exports.updateStatus = (req, res) => {
    console.log(req.body);
    const {playerId, status} = req.body;
    const idx = parseInt(req.body.gameNumber) -1;

    Player.findOne({_id: playerId})
        .then(player => {
            player.games.splice(idx, 1, status);
            player.save();
            console.log(player.games);
            res.json(player);
        })
        .catch(err => res.status(400).json(err));    
}