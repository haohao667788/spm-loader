<div>
<h1>SPM Loader</h1>
</div>

**Note: based on alibaba aplus data framework, only support aplus traceless goldlog, and is strongly dependent on React !!**  

<h2>Install</h2>

```
npm install --save-dev spm-loader
```

<h2>Usage</h2>

### Configuration (use it combined with babel-loader)
```js
module.exports = {
	module: {
    	rules: [{
        	test: /.\jsx?$/,
            use: [
            	'babel-loader',
                'spm-loader?goldlog=/aliyun&context=spm_self&key=spmKey'
            ]
        }]
    }
}
```

### Use in module
The loader just replace the attribute `spm-auto-click` to standard traceless goldlog, for example `data-spm-click="gostr=/aliyun;locaid=d1"`. 

To verify locaid is unique, we compose it using three components, the filename, the module key and the iteration sequence.

So, our final locaid would be `locaid=d{filename}{key}{seq}`. See more in our examples.
```js
<div spm-auto-click /> // => <div data-spm-click="gostr=/aliyun;locaid=d{filename}{key||''}" />
<div spm-auto-click={1}> // => <div data-spm-click="gostr=/aliyun;locaid=d{filename}{key||''}1" />
```

### Options
#### `goldlog`
Traceless goldlog key. You should apply it in the spm center, start with `/`, default is `/aliyun`.

#### `context`
In jsx, we use `context` as the context of any iteration, so we can get properties in iteration, default is `spm_self`.

#### `key`
A module can be used many times in a parent module, but the traceless goldlog key must be unique, so `key` is used to identity a module, default is `spmKey`.

<h2>License</h2>
spm-loader is released under the [MIT License](http://opensource.org/licenses/MIT) .
