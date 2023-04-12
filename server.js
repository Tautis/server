const jsonServer = require('json-server')
const clone = require('clone')
const data = require('./db.json')

const isProductionEnv = process.env.NODE_ENV === 'production';
const server = jsonServer.create()

// For mocking the POST and PUT requests, they won't make any changes to the DB in production environment
const router = jsonServer.router(isProductionEnv ? clone(data) : 'db.json', {
    _isFake: isProductionEnv
})

// Add a POST endpoint to the router
router.render = (req, res) => {
  if (req.method === 'POST') {
    res.jsonp({
      message: 'Data added successfully',
    })
  } else {
    res.jsonp(res.locals.data)
  }
}

const middlewares = jsonServer.defaults()

server.use(middlewares)

server.use((req, res, next) => {
    if (req.path !== '/')
        router.db.setState(clone(data))
    next()
})

// Add the POST endpoint to the server
server.post('/resource', (req, res) => {
  const body = req.body;
  const resource = router.db.get('resource').insert(body).write();
  res.status(201).jsonp(resource);
});

server.use(router)
server.listen(process.env.PORT || 8000, () => {
    console.log('JSON Server is running')
})

// Export the Server API
module.exports = server
