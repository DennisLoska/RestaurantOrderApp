import io from 'socket.io-client';
import config from '../../socket_config';
const host = config.host;
const socketPath = '';
class socketAPI {
  connect() {
    this.socket = io.connect(host, { path: socketPath });
    return new Promise((resolve, reject) => {
      this.socket.on('connect', () => resolve());
      this.socket.on('connect_error', error => reject(error));
      this.socket.on('connected', data => {
        console.log('connected:' + data);
      });
    }).catch(error => console.log(`Failed to connect to the server: ${error}`));
  }

  disconnect() {
    return new Promise(resolve => {
      this.socket.disconnect(() => {
        this.socket = null;
        resolve();
      });
    }).catch(error =>
      console.log(`Failed to disconnect from the server: ${error}`)
    );
  }

  emit(event, data) {
    return new Promise((resolve, reject) => {
      if (!this.socket) return reject('No socket connection.');
      return this.socket.emit(event, data, response => {
        // Response is the optional callback that you can use with socket.io in every request. See 1 above.
        if (response) {
          if (response.error) {
            console.error(response.error);
            return reject(response.error);
          }
        }
        return resolve();
      });
    }).catch(error =>
      console.log(`Failed to emit event to the server: ${error}`)
    );
  }

  on(event, fun) {
    // No promise is needed here, but we're expecting one in the middleware.
    return new Promise((resolve, reject) => {
      if (!this.socket) return reject('No socket connection.');
      this.socket.on(event, fun);
      resolve();
    }).catch(error => console.log(`No socket connection: ${error}`));
  }

  off(event, fun) {
    return new Promise((resolve, reject) => {
      if (!this.socket) return reject('No socket connection.');
      this.socket.off(event, fun);
      resolve();
    }).catch(error => console.log(`No socket connection: ${error}`));
  }
}

const socket = new socketAPI();
export default socket;
