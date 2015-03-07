// index.js
////////////////////////////////////////////////////////////
// NPM Modules
////////////////////////////////////////////////////////////
var merge    = require('lodash.merge')
var optional = require('optional')
var path     = require('path')

////////////////////////////////////////////////////////////
// Logic
////////////////////////////////////////////////////////////
var sentaku = module.exports = function(dir) {
  this._dir = dir ? (
    path.join(process.cwd(), dir)
  ) : (
    path.join(process.cwd(), 'config')
  )
  this._env        = process.env.NODE_ENV || 'dev'
  this._globalConf = require(path.join(this._dir, 'global'))
  this._envConf    = optional(path.join(this._dir, this._env))
  return merge(this._globalConf, this._envConf)
}
