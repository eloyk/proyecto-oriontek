export default {
  jwtSecret: process.env.JWT_KEY || 'somesecrettoken',
  DB: {
    URI: process.env.MONGODB_URI || 'mongodb://localhost/proyecto-oriontek'
  }
};