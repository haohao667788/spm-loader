'use strict';
const assert = require('power-assert');
const loader = require('../index.js');
const GOLDLOG_REGEXP = /data-spm-click=""/;

describe('basic tests', () => {

	it('correct handle entry file', () => {
		const context = {
			_module: {
				reasons: []
			}
		};
		const content = 'render() { return <div spm-auto-click /> }';
		const res = loader.call(context, content);
		assert.notEqual(res.indexOf('dentry'), -1);
	});

	it('do nothing when spm-auto-click is not found', () => {
		const context = {
			_module: {
				reasons: ['./basic.test.js'],
				resource: './basic.test.js'
			}
		};
		const content = 'render() { return <div /> }';
		const res = loader.call(context, content);
		assert.equal(res, content);
	});

	it('insert this substitute in render', () => {
		const context = {
			_module: {
				reasons: ['./basic.test.js'],
				resource: './basic.test.js'
			}
		};
		const content = 'render() { return <div spm-auto-click/> }';
		const res = loader.call(context, content);
		assert.notEqual(res.indexOf('const spm_self = this;'), -1);
	});

	it('should not cotain spm-auto-click & contain data-spm-click', () => {
		const context = {
			_module: {
				reasons: ['./basic.test.js'],
				resource: './basic.test.js'
			}
		};
		const content = '<div spm-auto-click />';
		const res = loader.call(context, content);
		assert.equal(res.indexOf('spm-auto-click'), -1);
		assert.notEqual(res.indexOf('data-spm-click'), -1);
	});

	it('should use correct default config', () => {
		const context = {
			_module: {
				reasons: ['./basic.test.js'],
				resource: './basic.test.js'
			}
		};
		const content = '<div spm-auto-click />';
		const res = loader.call(context, content);
		assert.notEqual(res.indexOf('gostr=/aliyun;'), -1);
		assert.notEqual(res.indexOf('spm_self.props'), -1);
		assert.notEqual(res.indexOf('props.spmKey'), -1);
	});

	it('should contain correct filename', () => {
		const context = {
			_module: {
				reasons: ['./basic.test.js'],
				resource: './basic.test.js'
			}
		};
		const content = '<div spm-auto-click />';
		const res = loader.call(context, content);
		assert.notEqual(res.indexOf('locaid=dbasic'), -1);
	});

	it('should use correct user config', () => {
		const context = {
			_module: {
				reasons: ['./basic.test.js'],
				resource: './basic.test.js'
			},
			query: '?goldlog=/tb&context=g&key=spm'
		};
		const content = '<div spm-auto-click />';
		const res = loader.call(context, content);
		assert.notEqual(res.indexOf('gostr=/tb;'), -1);
		assert.notEqual(res.indexOf('g.props'), -1);
		assert.notEqual(res.indexOf('props.spm'), -1);
	});

	it('should support jsx format', () => {
		const context = {
			_module: {
				reasons: ['./basic.test.js'],
				resource: './basic.test.js'
			}
		};
		const content = `
			render() {
				return this.status.items.map((item, i) { 
					return <span spm-auto-click={n}>{n}</span>
				});
			}`;
		const res = loader.call(context, content);
		assert.notEqual(res.indexOf('+n}>{n}</span>'), -1);
	});

});