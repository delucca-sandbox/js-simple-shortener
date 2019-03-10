const {
  PORT,
  MONGODB_USER,
  MONGODB_PASSWORD,
  MONGODB_HOST,
  MONGODB_DATABASE
} = process.env;

export default {
  api: {
    port: PORT
  },

  mongodb: {
    connection: `mongodb://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_HOST}/${MONGODB_DATABASE}`,
    options: {
      useNewUrlParser: true
    }
  }
}
