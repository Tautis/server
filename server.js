const jsonServer = require('json-server')
const clone = require('clone')
const data = require('./data/db.json')

const isProductionEnv = process.env.NODE_ENV === 'production';
const server = jsonServer.create()

// For mocking the POST request, POST request won't make any changes to the DB in production environment
const router = jsonServer.router(isProductionEnv ? clone(data) : 'db.json', {
    _isFake: isProductionEnv
})
const middlewares = jsonServer.defaults()

server.use(middlewares)


server.use(router)
server.listen(process.env.PORT || 8000, () => {
    console.log('JSON Server is running')
})

// Export the Server API
module.exports = server
