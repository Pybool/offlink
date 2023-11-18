var ctx;
import jwt from "jsonwebtoken";
import UserModel from "../Models/User.model.js";

class WebSockets {
  constructor() {
    this.users = [];
    global.rooms = new Map(); // Create a Map to store WebSocket clients in rooms
    global.userConnections = new Map();
    ctx = this;
  }

  connection(wsocket) {
    console.log("WebSocket client connected");
    const joinedRooms = new Set();
    wsocket.on("message", (message) => {
      try {
        const parsedMessage = JSON.parse(message);

        if (parsedMessage.type === "TRANSACTIONS_CHANNEL") {
          const roomName = parsedMessage.channelType;
          if (!global.rooms.has(roomName)) {
            global.rooms.set(roomName, new Set());
          }
          global.rooms.get(roomName).add(wsocket);
          joinedRooms.add(roomName);
          wsocket.send(
            JSON.stringify({
              type: "TRANSACTIONS_CHANNEL",
              data: "Successfully joined locale wsocket Channel",
            })
          );
        }

        if (parsedMessage.type === "PRIVATE_CHANNELS") {
          const channelType = parsedMessage.channelType;
          const authToken = parsedMessage.authToken;

          try {
            const decoded = jwt.verify(
              authToken,
              process.env.ACCESS_TOKEN_SECRET
            );
            const userChannel = [channelType, decoded.aud].join("-");
            if (!global.userConnections.has(userChannel)) {
              global.userConnections.set(userChannel, wsocket);
              wsocket.send(
                JSON.stringify({
                  type: "PRIVATE_CHANNELS",
                  data: `Successfully joined private ${channelType} wsocket Channel`,
                })
              );
            }
          } catch (error) {
            console.log(error);
          }
        }
      } catch (err) {
        console.log(err)
      }
    });

    wsocket.on("close", () => {
      console.log("WebSocket client disconnected");
      joinedRooms.forEach((roomName) => {
        const room = global.rooms.get(roomName);
        if (room) {
          room.delete(wsocket);
          if (room.size === 0) {
            global.rooms.delete(roomName);
          }
        }
      });
      // global.userConnections.delete()
    });
  }
}

export default new WebSockets();
