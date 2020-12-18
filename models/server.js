const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const Socket = require('./socket');

class Server {
	constructor() {
		this.app = express();
		this.port = process.env.PORT || 8080;

		// Http server
		this.server = http.createServer(this.app);

		// Configuracion
		this.io = socketio(this.server);
	}

	middlewares() {
		this.app.use(express.static(path.resolve(__dirname, '../public')));
	}

	configurarSockets() {
		new Socket(this.io);
	}

	execute() {
		// Inicializar middleware
		this.middlewares();

		// Inicializar socket
		this.configurarSockets();

		this.server.listen(this.port, () => {
			console.log(`Server on port ${this.port}`);
		});
	}
}

module.exports = Server;