# Sentaku

*sentaku* (Japanese) -- noun -- selection; choice; option

A simple, minimalist config manager for Node.js projects.

## Installing

```sh
$ npm i --save sentaku
```

## Why Sentaku

One of the simplest ways to use a config in a Node.js project is to require a `config.js` file that exports a JS object:

```js
// config.js
module.exports = {
  key: 'value',
  simple: true
}
```
```js
// app.js
var conf = require('./config.js')

console.log(conf.simple)
```

Sentaku is that, plus support for `NODE_ENV`-specific configs and a little pathing goodness.

This approach has numerous benefits:

* Configuration as code -- configs are JS objects, so you can do javascript-y things like generating keys with [getters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get)
* No synchronous filesystem reads to find and access configs
* No parsing libraries to turn your configs into a native javascript object for consumption... because your configs are already a native javascript object

Sentaku is [intentionally minimalist](https://github.com/codekirei/sentaku/blob/master/index.js). If you would like more features in your config manager, I encourage you to check out the [many great configuration modules out there](http://npmsearch.com/?q=config).

## Using Sentaku

```js
// node_modules/sentakuConfs/default.js
module.exports = {
  key: 'val'
}
```
```js
// any file in app
var conf = require('sentaku')
```

* Put configs in `node_modules/sentakuConfs` (or symlink that path to your config dir)
* Default config values in `default.js`
* Env-specific overrides in `{env}.js` -- no fuzzy-matching, so `NODE_ENV=dev` matches `dev.js` not `development.js`
  * Sentaku assumes `NODE_ENV` is `dev` unless otherwise specified
* Access config values with [property accessors](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Property_Accessors)

If you've ignored the entire `node_modules` directory with `.gitignore`, you'll likely want to amend that so `sentakuConfs` gets committed:

```
# .gitignore
node_modules/*
!node_modules/sentakuConfs
```

## Regarding Security, Configs, and Version Control

Don't put private info (e.g. your AWS Secret Key) in version-controlled configs that might end up in public repos.

If you commit sensitive info to any public repo, consider it compromised. If this happens, you should always generate a new key or password. You can mitigate the damage by following GitHub's instructions [here](https://help.github.com/articles/remove-sensitive-data/), but even then you should *still* probably generate a new key or password.

For open-source projects that interact with private apis/keys/passwords, consider creating a `default.js.example` in your config dir with blank values and committing that file while adding your actual `default.js` to your `.gitignore`.

## License

Mit. See license.
