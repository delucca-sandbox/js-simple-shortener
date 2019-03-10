import Link from './model';
import config from '../../config';

const recordAccess = async (link, query) => {
  if(!query.u) return link
  
  link.activity.push({ user: query.u })
  return await link.save()
}

///

const post = (ctx) =>
  Link.addOrGet(ctx.request.body.url)
    .then(({ key }) => config.api.url + key)
    .then(ctx.ok)

const get = (ctx) =>
  Link.findOne({ key: ctx.params.short })
  .then(l => recordAccess(l, ctx.query))
  .then(({ destination }) => ctx.redirect(destination))

export default {
  get,
  post
};
