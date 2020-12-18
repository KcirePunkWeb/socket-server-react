const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const Socket = require('./socket');
const path = require('path');
const cors = require('cors');

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
		this.app.use(cors());
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
