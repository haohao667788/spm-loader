'use strict';

const loaderUtils = require('loader-utils');
const REG = /spm-auto-click\s*(=\s*\{.*?\})?/g;
const ENTRY = /(render\s*\([^\)]*\)\s*\{)/;
const defaultOptions = {
  goldlog: '/aliyun',
  context: 'spm_self',
  key: 'spmKey'
};

const findEntry = function(mod) {
  if (mod.reasons.length > 0) {
    var mods = mod.resource.split('/');
    return mods[mods.length - 1].split('.')[0];
  } else {
    return 'entry';
  }
};

module.exports = function(source) {
  const customOptions = loaderUtils.parseQuery(this.query);
  const options = Object.assign({}, defaultOptions, customOptions);
  const name = findEntry(this._module);
  this.cacheable && this.cacheable();
  if (source.indexOf('spm-auto-click') > -1) {
    source = source.replace(ENTRY, function(word) {
      return `${word}\nconst ${options.context} = this;`; // eslint-disable-line
    }).replace(REG, function(all, match) {
      var key = match && match.match(/{([\w\W]+)}/);
      if (key && key[1]) {
        return `data-spm-click={"gostr=${options.goldlog};locaid=d${name}"+(${options.context}.props.${options.key} || \'\')+${key[1]}}`;
      } else {
        return `data-spm-click={"gostr=${options.goldlog};locaid=d${name}"+(${options.context}.props.${options.key} || \'\')}`;
      }
    });
    return source;
  } else {
    return source;
  }
};
