import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import schedule from 'node-schedule';
import router from './routes/api.js';
import {fetchProfiles} from './utils/profiles.js';
import cors from 'cors';

// Configure dotenv
dotenv.config();

// Configure cors
const corsOptions = {
    origin: 'http://127.0.0.1:5500', // Allow frontend to access the server
    AccessControlAllowOrigin: 'http://127.0.0.1:5500',
}

// Set up the express app
const app = express();

// Parse incoming requests data
app.use(bodyParser.json());

// Use cors
app.use(cors(corsOptions));

// Setup a default catch-all route that sends back a welcome message in JSON format.
app.get('/', (req, res) => res.status(200).send({
    message: 'Welcome to the beginning of nothingness.',
}));

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Access the server at http://localhost:${port}`);
});

// API routes
app.use('/api', router);

// Automated Job scheduler
/*

*    *    *    *    *    *
┬    ┬    ┬    ┬    ┬    ┬
│    │    │    │    │    │
│    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
│    │    │    │    └───── month (1 - 12)
│    │    │    └────────── day of month (1 - 31)
│    │    └─────────────── hour (0 - 23)
│    └──────────────────── minute (0 - 59)
└───────────────────────── second (0 - 59, OPTIONAL)

*/

schedule.scheduleJob('0 0 * * *', fetchProfiles);  // Runs every day at 00:00:00
