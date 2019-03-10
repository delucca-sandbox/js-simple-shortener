require = require("esm")(module);
const Moment = require('moment');
const { extendMoment } = require('moment-range')
const validUrl = require('valid-url')
const mongoose = require('../../infrastructure/mongoose');
const Link = require('./model');
const handlers = require('./handlers');

mongoose.default.connect();
const moment = extendMoment(Moment)

const testLink = {
  key: 'foo',
  destination: 'https://yurah.com.br'
}

const ctxHead = {
  redirect: jest.fn(x => x),
  params: {
    short: testLink.key
  },
  query: {}
}

const ctxPost = {
  request: {
    body: {
      url: 'https://yurah.com.br'
    }
  }
}


const addTestLink = () =>
  new Link.default(testLink).save()

const clearRecords = () =>
  Link.default.deleteMany({})

///

afterEach(() => clearRecords())

test('Redirects user to the correct URL', async () => {
  await addTestLink()

  await handlers.default.get(ctxHead, () => {})

  expect(ctxHead.redirect.mock.results[0].value).toBe(testLink.destination)
})

test('Should record that the user entered on the URL', async () => {
  await addTestLink()

  const oid = mongoose.default.oid().toHexString();
  const ctx = {
    ...ctxHead,
    query: {
      u: oid
    }
  }
  const before = moment()

  await handlers.default.get(ctx, () => {})

  const result = await Link.default.find({}).then(r => r)
  const { user, time } = result[0].activity[0]
  const range = moment.range(before, moment())

  expect(user).toBe(oid)
  expect(range.contains(time)).toBe(true)
})

test('Should record that the user (as number) entered on the URL', async () => {
  await addTestLink()

  const uid = 1234;
  const ctx = {
    ...ctxHead,
    query: {
      u: uid
    }
  }
  const before = moment()

  await handlers.default.get(ctx, () => {})

  const result = await Link.default.find({}).then(r => r)
  const { user, time } = result[0].activity[0]
  const range = moment.range(before, moment())

  expect(user).toBe(uid)
  expect(range.contains(time)).toBe(true)
})

test('Should not record anything if the user is not provided', async () => {
  await addTestLink()

  await handlers.default.get(ctxHead, () => {})

  const result = await Link.default.find({}).then(r => r)
  const { activity } = result[0]

  expect(activity.length).toBe(0)
})

test('Should create a new URL', async () => {
  await handlers.default.post(ctxPost, () => {})

  const result = await Link.default.find({}).then(r => r)
  const { destination } = result[0]

  expect(destination).toBe(ctxPost.request.body.url)
})

test('It should return the shortened URL on the post request', async () => {
  const url = await handlers.default.post(ctxPost, r => r.message)
  expect(validUrl.isWebUri(url)).toBeDefined()
})

test('It should not add a duplicate record', async () => {
  const url = await handlers.default.post(ctxPost, r => r.message)
  const secondUrl = await handlers.default.post(ctxPost, r => r.message)

  expect(secondUrl).toBe(url)
})