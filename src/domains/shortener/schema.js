import Joi from 'joi';
import objectId from 'joi-objectid';

Joi.objectId = objectId(Joi);

const a = Joi.object().keys({
  user: Joi.alternatives([
    Joi.objectId(),
    Joi.number(),
  ]),
  time: Joi.date().max('now').default(Date.now, 'Date field, default is now')
})

export default Joi.object().keys({
  key: Joi.string(),
  destination: Joi.string(),
  activity: Joi.array().items(a)
})