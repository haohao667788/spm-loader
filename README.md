<div align="center">
  <a href="https://github.com/webpack/webpack">
    <img width="200" height="200"
      src="https://webpack.js.org/assets/icon-square-big.svg">
  </a>
<h1>SPM Loader</h1>
</div>
** Note: based on alibaba aplus data framework, only support aplus traceless goldlog, and is strongly dependent on React !!**
<h2 align="center">Install</h2>
```bash
npm install --save-dev spm-loader
```
<h2 align="center">Usage</h2>

### configuration (use it combined with babel-loader)
```js
module.exports = {
	module: {
    	rules: [{
        	test: /.\jsx?$/,
            use: [
            	'babel-loader',
                'spm-loader'
            ]
        }]
    }
}
```

### Options
#### `context`
In jsx, we use `context` as the context of any iteration, so we can get properties in iteration, default is `spm_self`.

#### `key`
A module can be used many times in a parent module, but the traceless goldlog key must be unique, so `key` is used to identity a module, default is `spmKey`.
