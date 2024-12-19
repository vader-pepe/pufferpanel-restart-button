import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve the HTML page
app.get('/', (_req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Server Control</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            text-align: center;
            margin-top: 50px;
            width: 100%;
            display: flex;
            justify-content: center;
          }
          button {
            cursor: pointer;
            border: 2px solid rgb(0, 0, 0);
            font-family: "system-ui";
            font-size: 14px;
            color: rgb(0, 0, 0);
            padding: 10px 30px;
            transition: all;
            width: 335px;
            box-shadow: rgb(0, 0, 0) 0px 0px 0px 0px;
            border-radius: 7px;
            background: rgb(235, 255, 20);
            font-weight: 900;
            display: flex;
            justify-content: center;
            align-items: center;
            --hover-width: 0px;
          }
        </style>
      </head>
      <body>
        <button onclick="fetch('/control', { method: 'POST' }).then(response => response.json()).then(()=> {alert('done!')})">Restart Server</button>
      </body>
    </html>
  `);
});

// Endpoint to execute the script
app.post('/control', async (_req, res) => {
  try {
    const email = process.env.EMAIL;
    const password = process.env.PASSWORD;
    const server = process.env.SERVER;

    // Authenticate and retrieve session token
    const loginResponse = await axios.post('http://192.168.18.150:8080/auth/login', {
      email: email,
      password: password,
    });

    const session: string | undefined = loginResponse.data.session;
    if (!session) {
      throw new Error('Failed to retrieve session token.');
    }

    // Stop the server
    await axios.post(
      `http://192.168.18.150:8080/proxy/daemon/server/${server}/stop?wait=true`,
      {},
      { headers: { Authorization: `Bearer ${session}` } }
    );

    // Start the server
    await axios.post(
      `http://192.168.18.150:8080/proxy/daemon/server/${server}/start?wait=true`,
      {},
      { headers: { Authorization: `Bearer ${session}` } }
    );

    res.json({ message: 'Server restarted successfully!' });
  } catch (error: any) {
    console.error('Error restarting server:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
