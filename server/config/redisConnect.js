import { createClient } from 'redis';

const redisClient = createClient();

redisClient.on('error', (err) => console.error('Redis Client Error:', err));

try {
  await redisClient.connect();
  console.log('Connected to Redis Successfully');
} catch (error) {
  console.error(`Error Connecting to Redis: ${error}`);
}

export default redisClient;
