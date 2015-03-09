#Sentaku

*sentaku* (Japanese) -- noun -- selection; choice; option

A simple, minimalist config manager for Node.js projects.

##Installing

```sh
$ npm i --save sentaku
```

##Why Sentaku

There are other great config management options out there (e.g. [config](https://www.npmjs.com/package/config), [dotenv](https://www.npmjs.com/package/dotenv)), so why Sentaku?

Sentaku works by requiring exported JS objects through Node's native `require` system, which means no parsing libraries (e.g. YAML) and no synchronous filesystem calls (`fs.readFileSync(config)`). This keeps Sentaku fast, small, and focused.

Despite this minimalist approach, Sentaku does support a global config with env-specific configs and custom config directories.

##Using Sentaku

###The Quick and Dirty Explanation

```js
var conf = require('sentaku')()
```
If you're storing your configs somewhere other than `config/`, specify the path from root with a string in the trailing `()`. Main conf in `config/global.js`, env-specific confs in `config/{env}.js`. Conf files are just exported JS objects: `module.exports = {}`. Access conf values with dot notation.

###The Detailed Explanation

**1. Make a config dir.** Sentaku defaults to 'config', but you can call it whatever you like.

```sh
$ mkdir config && cd config
```

**2. Make a global config.**

```sh
$ touch global.js
```

Configure `global.js` in your editor of choice. It should look something like this:

```js
// global.js
module.exports = {
  // example
  server: {
    port: 1337
  }
}
```

Simply export a JS object containing your config data.

**3. Make env-specific configs (optional).**

If you want to override a config parameter in a specific Node environment, make another config named after said env. There is no fuzzy-matching logic, so your config name and env must match exactly. If NODE_ENV is unspecified, 'dev' is assumed.


```sh
$ touch prod.js
```

```js
// prod.js
module.exports = {
  server: {
    port: 8080
  }
}
```

**4. Require and load Sentaku anywhere you want to use your configs.** Access config params with dot notation.

```js
// index.js

var conf = require('sentaku')()

console.log(conf.server.port)
```

Don't forget the trailing `()` at the end of the require call. If you are using a config dir other than 'config', point to it with a string containing the path from project root: `require('sentaku')('path/to/conf/dir')`.

If you've followed the examples above, you can make sure everything is functioning properly like this:

```sh
$ node index.js
$ NODE_ENV=prod node index.js
```

The first command should output `1337` from `global.js`, while `8080` from `prod.js` should be output when specifying `NODE_ENV=prod`.

##Security, Configs, and Version Control

Don't put private info (e.g. your AWS Secret Key) in version-controlled configs that might end up in public repos. [.gitignore](http://www.git-scm.com/docs/gitignore) is your friend.

If you commit sensitive info to any public repo, consider it compromised. If this happens, you should always generate a new key or password. You can mitigate the damage by following GitHub's instructions [here](https://help.github.com/articles/remove-sensitive-data/), but even then you should *still* generate a new key or password.

For open-source projects that interact with private apis/keys/passwords, consider creating a `global.js.example` in your config dir with blank values and committing that file.

##License

Mit. See license.md.
