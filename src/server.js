const express = require("express");
const app = express();
const { Server } = require("socket.io");
const server = require("http").createServer(app);
const cors = require("cors");
const dotenv = require("dotenv").config();
const path = require("path");
const locationRoutes = require("./routes/locationRoutes");
const dummyLocations = require("./models/dummyLocations");

// Set up middleware
app.use(cors());
app.use(express.json());
app.use("/api/locations", locationRoutes);
const port = process.env.PORT || 3000;
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

let locationIndex = 0;
const numLocations = dummyLocations.length;

io.sockets.on("connection", (socket) => {
  console.log("Connected: %s sockets connected", io.sockets.sockets.size);

  // Disconnect
  socket.on("disconnect", () => {
    console.log("Disconnected: %s sockets connected", io.sockets.sockets.size);
    if (io.sockets.sockets.size === 0) {
      clearInterval(locationInterval);
    }
  });

  // Listen for NodeJS Server Port event and send a response
  socket.on("Handshake", (data) => {
    console.log(data);
    io.sockets.emit("Handshake", "Hello from server!");
  });

  // Listen for testing events
  socket.on("testing", (data) => {
    console.log(data);
    io.sockets.emit("testing", "Hello from server!");
  });

  // Listen for iOS Client Port events
  socket.on("iOS Client Port1", (data) => {
    console.log("ios: ", data);
    io.sockets.emit("iOS Client Port1", data);
  });

  socket.on("iOS Client Port2", (data) => {
    console.log("ios2: ", data);
    io.sockets.emit("iOS Client Port2", data);
  });

  // Broadcast predefined location data to testing events
  let locationInterval = setInterval(() => {
    if (dummyLocations.length === 0) return;

    const locationData = dummyLocations[locationIndex];
    locationIndex = (locationIndex + 1) % numLocations;
    console.log(locationData);
    io.sockets.emit("testing", locationData);
  }, 500);
});

// Start the server
server.listen(port, () => {
  console.log("Server running at port %d", port);
});
