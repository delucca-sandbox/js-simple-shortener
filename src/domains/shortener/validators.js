import Joi from 'joi';
import objectId from 'joi-objectid';

Joi.objectId = objectId(Joi);

const queryGet = Joi.object().keys({
  u: Joi.alternatives([
    Joi.objectId(),
    Joi.number(),
  ]),
});

const bodyPost = Joi.object().keys({
  url: Joi.string().required()
})

export default {
  queryGet,
  bodyPost
}