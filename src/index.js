import { createServer } from 'http';
import app from './server.js';

const server = createServer(app);

// eslint-disable-next-line no-console
server.listen(3000, () => console.log('Live on port 3000'));
