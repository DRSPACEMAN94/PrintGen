import { Application } from '@splinetool/runtime';

// Assuming you have a canvas element with the ID 'canvas3d' in your HTML
const canvas = document.getElementById('canvas3d');
const app = new Application(canvas);

// Load your Spline scene
app.load('https://prod.spline.design/OrB3ZM-wUzT0afzg/scene.splinecode').then(() => {
    // Scene loaded
    console.log('Spline scene loaded');
    
    // Establish WebSocket connection
    const socket = new WebSocket('wss://your-websocket-server-url'); // Replace with your WebSocket server URL

    socket.onopen = function(event) {
        console.log("Connected to WebSocket server");
    };

    socket.onmessage = function(event) {
        // Parse the incoming message to get the texture URL
        const data = JSON.parse(event.data);
        const textureUrl = data.textureUrl; // Adjust this based on the structure of your incoming messages

        // Find the object you want to update in your Spline scene
        const objectToUpdate = app.findObjectByName('YourObjectName'); // Replace 'YourObjectName' with the name of your object in Spline

        if (objectToUpdate) {
            // Update the texture of the object
            app.updateTexture(objectToUpdate, textureUrl);
        }
    };

    socket.onerror = function(error) {
        console.error("WebSocket error:", error);
    };
});

