import Router from 'koa-joi-router';
import handlers from './handlers';
import validators from './validators';

const router = Router();

router.name = 'Shortener';
router.prefix('/');

router.get('/:short/', {
  validate: {
    query: validators.queryGet
  },
  handler: handlers.get
})

router.post('/', {
  validate: {
    body: validators.bodyPost,
    type: 'application/json'
  },
  handler: handlers.post
})

module.exports = router.middleware();