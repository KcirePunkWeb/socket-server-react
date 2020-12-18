class Sockets {
	constructor(io) {
		this.io = io;

		this.socketEvents();
	}

	socketEvents() {
		console.log('Hola');
		this.io.on('connection', (socket) => {
			socket.on('mensaje-to-server', (data) => {
				console.log(data);
			});
		});
	}
}

module.exports = Sockets;
