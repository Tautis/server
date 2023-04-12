const jsonServer = require('json-server')
const clone = require('clone')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('./db.json')
const db = low(adapter)

db.defaults({ positions: [] }).write()

const isProductionEnv = process.env.NODE_ENV === 'production';
const server = jsonServer.create()

const router = jsonServer.router(db.getState(), {
  _isFake: isProductionEnv
})
const middlewares = jsonServer.defaults()

server.use(middlewares)

server.use(router)
server.listen(process.env.PORT || 8000, () => {
  console.log('JSON Server is running')
})

module.exports = server
//forceupdate comments
