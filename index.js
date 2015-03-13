////////////////////////////////////////////////////////////
// NPM Modules
////////////////////////////////////////////////////////////
var merge    = require('lodash.merge')
var optional = require('optional')
var path     = require('path')

////////////////////////////////////////////////////////////
// Setup
////////////////////////////////////////////////////////////
var dir = 'sentakuConfs'

////////////////////////////////////////////////////////////
// Logic
////////////////////////////////////////////////////////////
var env         = process.env.NODE_ENV || 'dev'
var defaultConf = require(path.join(dir, 'default'))
var envConf     = optional(path.join(dir, env))
module.exports  = merge(defaultConf, envConf)
