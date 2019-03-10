import mongoose from 'mongoose';
import config from '../config';

const connect = () => {
  mongoose.connect(
    config.mongodb.connection,
    config.mongodb.options
  )
    .catch(() => {
      console.log('Failed to connect to MongoDB, retrying...');

      return connect();
    })

    //mongoose.set('debug', true)
}

const oid = () => mongoose.Types.ObjectId()

export default {
  connect,
  oid,
}