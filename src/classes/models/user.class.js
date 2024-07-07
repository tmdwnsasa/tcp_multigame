class User {
  constructor(deviceId, playerId, socket, x = 0, y = 0, latency = 1) {
    this.deviceId = deviceId;
    this.playerId = playerId;
    this.socket = socket;
    this.x = x;
    this.y = y;
    this.latency = latency;
    this.lastUpdateTime = Date.now();
  }

  updatePosition(x, y) {
    this.x = x;
    this.y = y;
    this.lastUpdateTime = Date.now();
  }
}

export default User;
