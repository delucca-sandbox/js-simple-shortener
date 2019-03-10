import Mongoose from 'mongoose';
import shortid from 'shortid';
import Joigoose from '../../infrastructure/joigoose';
import Link from './schema';

const schema = new Mongoose.Schema(Joigoose.convert(Link));

schema.statics.addOrGet = function(destination) {
  return this.findOne({ destination })
    .then((link) => {
      if(link) return link;

      return new this({ key: shortid(), destination }).save();
    })
    .catch(console.error)
};

export default Mongoose.model('link', schema);