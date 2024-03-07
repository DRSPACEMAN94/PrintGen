import { Application } from '@splinetool/runtime';

const canvas = document.getElementById('canvas3d');
const app = new Application(canvas);

app.load('https://prod.spline.design/OrB3ZM-wUzT0afzg/scene.splinecode').then(() => {
    // Scene loaded
    console.log('Spline scene loaded');
    // Additional scene setup or event listeners can be added here
});

// Establish WebSocket connection outside the load promise
const socket = new WebSocket('wss://a39e-2603-8000-d300-d1e-c4f5-a234-124-508d.ngrok-free.app'); // Replace with your actual WebSocket server URL

socket.onopen = function(event) {
    console.log("Connected to WebSocket server");
};

socket.onmessage = function(event) {
    // Parse the incoming message to get the texture URL
    const data = JSON.parse(event.data);
    const textureUrl = data.textureUrl; // Ensure you adjust this based on your actual incoming message structure

    // Logic to update the texture in your Spline scene
    // Note: You might need to adjust the method for updating textures as it might differ with Spline runtime
};

socket.onerror = function(error) {
    console.error("WebSocket error:", error);
};
