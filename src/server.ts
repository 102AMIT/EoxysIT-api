import mongoose from 'mongoose';
import app from './app';

const port = process.env.PORT || 8000; 
const mongoURI = 'mongodb://localhost:27017/eoxysit-api';



mongoose.connect(mongoURI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
  });