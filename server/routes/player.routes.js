const PlayerController = require('../controllers/player.controller');

module.exports = app => {
    app.post('/api/players/new', PlayerController.createPlayer);
    app.get('/api/players', PlayerController.allPlayers);
    app.put('/api/players/status', PlayerController.updateStatus);
    app.delete('/api/players/:id', PlayerController.deletePlayer);
}