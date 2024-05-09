import express from 'express';
import * as path from 'path';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import compression from 'compression';
import morgan from 'morgan';
import db from '../src/database';
import bodyParser from 'body-parser';
import { endpoints } from '../src/controllers';

const app = express();
const PORT = process.env.PORT || 3333;

app.use(helmet());
app.use(cors());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

app.use(limiter);
app.use(morgan('combined'));
app.use(compression());
app.use(bodyParser.json());

const registerEndpointHandler = () => {
  Object.entries(endpoints).forEach(([endpoint, { fn, params, method, permissions }]) => {
    const handler = async (req, res) => {
      try {
        if (permissions && permissions.includes('authorized')) {
          // Implement your authorization logic here
          // For simplicity, assuming authorization is always successful
          // Replace this with your actual authorization logic
          // For example, you might use middleware for authorization
          // and handle permission denial appropriately
        }
  
        // Extract parameters from request body or query parameters
        const args = params.map(param => req.body[param] || req.query[param]);
  
        // Call the corresponding method with extracted parameters
        const result = await fn(...args);
  
        // Send the result as response
        res.json(result);
      } catch (error) {
        // If an error occurs, send an error response
        res.status(500).json({ error: error.message });
      }
    };
  
    // Assign the handler function to the corresponding HTTP method and endpoint
    if (method === 'GET') {
      app.get(endpoint, handler);
    } else if (method === 'POST') {
      app.post(endpoint, handler);
    } else if (method === 'PUT') {
      app.put(endpoint, handler);
    }
    // Add support for other HTTP methods (PUT, DELETE, etc.) if needed
  });
}

const main = async () => {
  try {
    console.log('Connecting to database');
    await db.connect();
    console.log('Database connected successfully.');

    console.log(`Starting server on port ${PORT}.`);
    app.listen(PORT, () => {
      console.log(`Listening at http://localhost:${PORT}/api`);
    });

    registerEndpointHandler();

    app.use('/assets', express.static(path.join(__dirname, 'assets')));

    app.get('/api', (req, res) => {
      res.send({ message: 'Welcome to server!' });
    });

  } catch (e) {
    console.error('Failed to connect.', e);
    process.exit(1);
  }
};

main();