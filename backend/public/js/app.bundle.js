/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"app": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,"vendor"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/handsontable/node_modules/moment/locale sync recursive ^\\.\\/.*$":
/*!****************************************************************************!*\
  !*** ./node_modules/handsontable/node_modules/moment/locale sync ^\.\/.*$ ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": "./node_modules/handsontable/node_modules/moment/locale/af.js",
	"./af.js": "./node_modules/handsontable/node_modules/moment/locale/af.js",
	"./ar": "./node_modules/handsontable/node_modules/moment/locale/ar.js",
	"./ar-dz": "./node_modules/handsontable/node_modules/moment/locale/ar-dz.js",
	"./ar-dz.js": "./node_modules/handsontable/node_modules/moment/locale/ar-dz.js",
	"./ar-kw": "./node_modules/handsontable/node_modules/moment/locale/ar-kw.js",
	"./ar-kw.js": "./node_modules/handsontable/node_modules/moment/locale/ar-kw.js",
	"./ar-ly": "./node_modules/handsontable/node_modules/moment/locale/ar-ly.js",
	"./ar-ly.js": "./node_modules/handsontable/node_modules/moment/locale/ar-ly.js",
	"./ar-ma": "./node_modules/handsontable/node_modules/moment/locale/ar-ma.js",
	"./ar-ma.js": "./node_modules/handsontable/node_modules/moment/locale/ar-ma.js",
	"./ar-sa": "./node_modules/handsontable/node_modules/moment/locale/ar-sa.js",
	"./ar-sa.js": "./node_modules/handsontable/node_modules/moment/locale/ar-sa.js",
	"./ar-tn": "./node_modules/handsontable/node_modules/moment/locale/ar-tn.js",
	"./ar-tn.js": "./node_modules/handsontable/node_modules/moment/locale/ar-tn.js",
	"./ar.js": "./node_modules/handsontable/node_modules/moment/locale/ar.js",
	"./az": "./node_modules/handsontable/node_modules/moment/locale/az.js",
	"./az.js": "./node_modules/handsontable/node_modules/moment/locale/az.js",
	"./be": "./node_modules/handsontable/node_modules/moment/locale/be.js",
	"./be.js": "./node_modules/handsontable/node_modules/moment/locale/be.js",
	"./bg": "./node_modules/handsontable/node_modules/moment/locale/bg.js",
	"./bg.js": "./node_modules/handsontable/node_modules/moment/locale/bg.js",
	"./bm": "./node_modules/handsontable/node_modules/moment/locale/bm.js",
	"./bm.js": "./node_modules/handsontable/node_modules/moment/locale/bm.js",
	"./bn": "./node_modules/handsontable/node_modules/moment/locale/bn.js",
	"./bn.js": "./node_modules/handsontable/node_modules/moment/locale/bn.js",
	"./bo": "./node_modules/handsontable/node_modules/moment/locale/bo.js",
	"./bo.js": "./node_modules/handsontable/node_modules/moment/locale/bo.js",
	"./br": "./node_modules/handsontable/node_modules/moment/locale/br.js",
	"./br.js": "./node_modules/handsontable/node_modules/moment/locale/br.js",
	"./bs": "./node_modules/handsontable/node_modules/moment/locale/bs.js",
	"./bs.js": "./node_modules/handsontable/node_modules/moment/locale/bs.js",
	"./ca": "./node_modules/handsontable/node_modules/moment/locale/ca.js",
	"./ca.js": "./node_modules/handsontable/node_modules/moment/locale/ca.js",
	"./cs": "./node_modules/handsontable/node_modules/moment/locale/cs.js",
	"./cs.js": "./node_modules/handsontable/node_modules/moment/locale/cs.js",
	"./cv": "./node_modules/handsontable/node_modules/moment/locale/cv.js",
	"./cv.js": "./node_modules/handsontable/node_modules/moment/locale/cv.js",
	"./cy": "./node_modules/handsontable/node_modules/moment/locale/cy.js",
	"./cy.js": "./node_modules/handsontable/node_modules/moment/locale/cy.js",
	"./da": "./node_modules/handsontable/node_modules/moment/locale/da.js",
	"./da.js": "./node_modules/handsontable/node_modules/moment/locale/da.js",
	"./de": "./node_modules/handsontable/node_modules/moment/locale/de.js",
	"./de-at": "./node_modules/handsontable/node_modules/moment/locale/de-at.js",
	"./de-at.js": "./node_modules/handsontable/node_modules/moment/locale/de-at.js",
	"./de-ch": "./node_modules/handsontable/node_modules/moment/locale/de-ch.js",
	"./de-ch.js": "./node_modules/handsontable/node_modules/moment/locale/de-ch.js",
	"./de.js": "./node_modules/handsontable/node_modules/moment/locale/de.js",
	"./dv": "./node_modules/handsontable/node_modules/moment/locale/dv.js",
	"./dv.js": "./node_modules/handsontable/node_modules/moment/locale/dv.js",
	"./el": "./node_modules/handsontable/node_modules/moment/locale/el.js",
	"./el.js": "./node_modules/handsontable/node_modules/moment/locale/el.js",
	"./en-SG": "./node_modules/handsontable/node_modules/moment/locale/en-SG.js",
	"./en-SG.js": "./node_modules/handsontable/node_modules/moment/locale/en-SG.js",
	"./en-au": "./node_modules/handsontable/node_modules/moment/locale/en-au.js",
	"./en-au.js": "./node_modules/handsontable/node_modules/moment/locale/en-au.js",
	"./en-ca": "./node_modules/handsontable/node_modules/moment/locale/en-ca.js",
	"./en-ca.js": "./node_modules/handsontable/node_modules/moment/locale/en-ca.js",
	"./en-gb": "./node_modules/handsontable/node_modules/moment/locale/en-gb.js",
	"./en-gb.js": "./node_modules/handsontable/node_modules/moment/locale/en-gb.js",
	"./en-ie": "./node_modules/handsontable/node_modules/moment/locale/en-ie.js",
	"./en-ie.js": "./node_modules/handsontable/node_modules/moment/locale/en-ie.js",
	"./en-il": "./node_modules/handsontable/node_modules/moment/locale/en-il.js",
	"./en-il.js": "./node_modules/handsontable/node_modules/moment/locale/en-il.js",
	"./en-nz": "./node_modules/handsontable/node_modules/moment/locale/en-nz.js",
	"./en-nz.js": "./node_modules/handsontable/node_modules/moment/locale/en-nz.js",
	"./eo": "./node_modules/handsontable/node_modules/moment/locale/eo.js",
	"./eo.js": "./node_modules/handsontable/node_modules/moment/locale/eo.js",
	"./es": "./node_modules/handsontable/node_modules/moment/locale/es.js",
	"./es-do": "./node_modules/handsontable/node_modules/moment/locale/es-do.js",
	"./es-do.js": "./node_modules/handsontable/node_modules/moment/locale/es-do.js",
	"./es-us": "./node_modules/handsontable/node_modules/moment/locale/es-us.js",
	"./es-us.js": "./node_modules/handsontable/node_modules/moment/locale/es-us.js",
	"./es.js": "./node_modules/handsontable/node_modules/moment/locale/es.js",
	"./et": "./node_modules/handsontable/node_modules/moment/locale/et.js",
	"./et.js": "./node_modules/handsontable/node_modules/moment/locale/et.js",
	"./eu": "./node_modules/handsontable/node_modules/moment/locale/eu.js",
	"./eu.js": "./node_modules/handsontable/node_modules/moment/locale/eu.js",
	"./fa": "./node_modules/handsontable/node_modules/moment/locale/fa.js",
	"./fa.js": "./node_modules/handsontable/node_modules/moment/locale/fa.js",
	"./fi": "./node_modules/handsontable/node_modules/moment/locale/fi.js",
	"./fi.js": "./node_modules/handsontable/node_modules/moment/locale/fi.js",
	"./fo": "./node_modules/handsontable/node_modules/moment/locale/fo.js",
	"./fo.js": "./node_modules/handsontable/node_modules/moment/locale/fo.js",
	"./fr": "./node_modules/handsontable/node_modules/moment/locale/fr.js",
	"./fr-ca": "./node_modules/handsontable/node_modules/moment/locale/fr-ca.js",
	"./fr-ca.js": "./node_modules/handsontable/node_modules/moment/locale/fr-ca.js",
	"./fr-ch": "./node_modules/handsontable/node_modules/moment/locale/fr-ch.js",
	"./fr-ch.js": "./node_modules/handsontable/node_modules/moment/locale/fr-ch.js",
	"./fr.js": "./node_modules/handsontable/node_modules/moment/locale/fr.js",
	"./fy": "./node_modules/handsontable/node_modules/moment/locale/fy.js",
	"./fy.js": "./node_modules/handsontable/node_modules/moment/locale/fy.js",
	"./ga": "./node_modules/handsontable/node_modules/moment/locale/ga.js",
	"./ga.js": "./node_modules/handsontable/node_modules/moment/locale/ga.js",
	"./gd": "./node_modules/handsontable/node_modules/moment/locale/gd.js",
	"./gd.js": "./node_modules/handsontable/node_modules/moment/locale/gd.js",
	"./gl": "./node_modules/handsontable/node_modules/moment/locale/gl.js",
	"./gl.js": "./node_modules/handsontable/node_modules/moment/locale/gl.js",
	"./gom-latn": "./node_modules/handsontable/node_modules/moment/locale/gom-latn.js",
	"./gom-latn.js": "./node_modules/handsontable/node_modules/moment/locale/gom-latn.js",
	"./gu": "./node_modules/handsontable/node_modules/moment/locale/gu.js",
	"./gu.js": "./node_modules/handsontable/node_modules/moment/locale/gu.js",
	"./he": "./node_modules/handsontable/node_modules/moment/locale/he.js",
	"./he.js": "./node_modules/handsontable/node_modules/moment/locale/he.js",
	"./hi": "./node_modules/handsontable/node_modules/moment/locale/hi.js",
	"./hi.js": "./node_modules/handsontable/node_modules/moment/locale/hi.js",
	"./hr": "./node_modules/handsontable/node_modules/moment/locale/hr.js",
	"./hr.js": "./node_modules/handsontable/node_modules/moment/locale/hr.js",
	"./hu": "./node_modules/handsontable/node_modules/moment/locale/hu.js",
	"./hu.js": "./node_modules/handsontable/node_modules/moment/locale/hu.js",
	"./hy-am": "./node_modules/handsontable/node_modules/moment/locale/hy-am.js",
	"./hy-am.js": "./node_modules/handsontable/node_modules/moment/locale/hy-am.js",
	"./id": "./node_modules/handsontable/node_modules/moment/locale/id.js",
	"./id.js": "./node_modules/handsontable/node_modules/moment/locale/id.js",
	"./is": "./node_modules/handsontable/node_modules/moment/locale/is.js",
	"./is.js": "./node_modules/handsontable/node_modules/moment/locale/is.js",
	"./it": "./node_modules/handsontable/node_modules/moment/locale/it.js",
	"./it-ch": "./node_modules/handsontable/node_modules/moment/locale/it-ch.js",
	"./it-ch.js": "./node_modules/handsontable/node_modules/moment/locale/it-ch.js",
	"./it.js": "./node_modules/handsontable/node_modules/moment/locale/it.js",
	"./ja": "./node_modules/handsontable/node_modules/moment/locale/ja.js",
	"./ja.js": "./node_modules/handsontable/node_modules/moment/locale/ja.js",
	"./jv": "./node_modules/handsontable/node_modules/moment/locale/jv.js",
	"./jv.js": "./node_modules/handsontable/node_modules/moment/locale/jv.js",
	"./ka": "./node_modules/handsontable/node_modules/moment/locale/ka.js",
	"./ka.js": "./node_modules/handsontable/node_modules/moment/locale/ka.js",
	"./kk": "./node_modules/handsontable/node_modules/moment/locale/kk.js",
	"./kk.js": "./node_modules/handsontable/node_modules/moment/locale/kk.js",
	"./km": "./node_modules/handsontable/node_modules/moment/locale/km.js",
	"./km.js": "./node_modules/handsontable/node_modules/moment/locale/km.js",
	"./kn": "./node_modules/handsontable/node_modules/moment/locale/kn.js",
	"./kn.js": "./node_modules/handsontable/node_modules/moment/locale/kn.js",
	"./ko": "./node_modules/handsontable/node_modules/moment/locale/ko.js",
	"./ko.js": "./node_modules/handsontable/node_modules/moment/locale/ko.js",
	"./ku": "./node_modules/handsontable/node_modules/moment/locale/ku.js",
	"./ku.js": "./node_modules/handsontable/node_modules/moment/locale/ku.js",
	"./ky": "./node_modules/handsontable/node_modules/moment/locale/ky.js",
	"./ky.js": "./node_modules/handsontable/node_modules/moment/locale/ky.js",
	"./lb": "./node_modules/handsontable/node_modules/moment/locale/lb.js",
	"./lb.js": "./node_modules/handsontable/node_modules/moment/locale/lb.js",
	"./lo": "./node_modules/handsontable/node_modules/moment/locale/lo.js",
	"./lo.js": "./node_modules/handsontable/node_modules/moment/locale/lo.js",
	"./lt": "./node_modules/handsontable/node_modules/moment/locale/lt.js",
	"./lt.js": "./node_modules/handsontable/node_modules/moment/locale/lt.js",
	"./lv": "./node_modules/handsontable/node_modules/moment/locale/lv.js",
	"./lv.js": "./node_modules/handsontable/node_modules/moment/locale/lv.js",
	"./me": "./node_modules/handsontable/node_modules/moment/locale/me.js",
	"./me.js": "./node_modules/handsontable/node_modules/moment/locale/me.js",
	"./mi": "./node_modules/handsontable/node_modules/moment/locale/mi.js",
	"./mi.js": "./node_modules/handsontable/node_modules/moment/locale/mi.js",
	"./mk": "./node_modules/handsontable/node_modules/moment/locale/mk.js",
	"./mk.js": "./node_modules/handsontable/node_modules/moment/locale/mk.js",
	"./ml": "./node_modules/handsontable/node_modules/moment/locale/ml.js",
	"./ml.js": "./node_modules/handsontable/node_modules/moment/locale/ml.js",
	"./mn": "./node_modules/handsontable/node_modules/moment/locale/mn.js",
	"./mn.js": "./node_modules/handsontable/node_modules/moment/locale/mn.js",
	"./mr": "./node_modules/handsontable/node_modules/moment/locale/mr.js",
	"./mr.js": "./node_modules/handsontable/node_modules/moment/locale/mr.js",
	"./ms": "./node_modules/handsontable/node_modules/moment/locale/ms.js",
	"./ms-my": "./node_modules/handsontable/node_modules/moment/locale/ms-my.js",
	"./ms-my.js": "./node_modules/handsontable/node_modules/moment/locale/ms-my.js",
	"./ms.js": "./node_modules/handsontable/node_modules/moment/locale/ms.js",
	"./mt": "./node_modules/handsontable/node_modules/moment/locale/mt.js",
	"./mt.js": "./node_modules/handsontable/node_modules/moment/locale/mt.js",
	"./my": "./node_modules/handsontable/node_modules/moment/locale/my.js",
	"./my.js": "./node_modules/handsontable/node_modules/moment/locale/my.js",
	"./nb": "./node_modules/handsontable/node_modules/moment/locale/nb.js",
	"./nb.js": "./node_modules/handsontable/node_modules/moment/locale/nb.js",
	"./ne": "./node_modules/handsontable/node_modules/moment/locale/ne.js",
	"./ne.js": "./node_modules/handsontable/node_modules/moment/locale/ne.js",
	"./nl": "./node_modules/handsontable/node_modules/moment/locale/nl.js",
	"./nl-be": "./node_modules/handsontable/node_modules/moment/locale/nl-be.js",
	"./nl-be.js": "./node_modules/handsontable/node_modules/moment/locale/nl-be.js",
	"./nl.js": "./node_modules/handsontable/node_modules/moment/locale/nl.js",
	"./nn": "./node_modules/handsontable/node_modules/moment/locale/nn.js",
	"./nn.js": "./node_modules/handsontable/node_modules/moment/locale/nn.js",
	"./pa-in": "./node_modules/handsontable/node_modules/moment/locale/pa-in.js",
	"./pa-in.js": "./node_modules/handsontable/node_modules/moment/locale/pa-in.js",
	"./pl": "./node_modules/handsontable/node_modules/moment/locale/pl.js",
	"./pl.js": "./node_modules/handsontable/node_modules/moment/locale/pl.js",
	"./pt": "./node_modules/handsontable/node_modules/moment/locale/pt.js",
	"./pt-br": "./node_modules/handsontable/node_modules/moment/locale/pt-br.js",
	"./pt-br.js": "./node_modules/handsontable/node_modules/moment/locale/pt-br.js",
	"./pt.js": "./node_modules/handsontable/node_modules/moment/locale/pt.js",
	"./ro": "./node_modules/handsontable/node_modules/moment/locale/ro.js",
	"./ro.js": "./node_modules/handsontable/node_modules/moment/locale/ro.js",
	"./ru": "./node_modules/handsontable/node_modules/moment/locale/ru.js",
	"./ru.js": "./node_modules/handsontable/node_modules/moment/locale/ru.js",
	"./sd": "./node_modules/handsontable/node_modules/moment/locale/sd.js",
	"./sd.js": "./node_modules/handsontable/node_modules/moment/locale/sd.js",
	"./se": "./node_modules/handsontable/node_modules/moment/locale/se.js",
	"./se.js": "./node_modules/handsontable/node_modules/moment/locale/se.js",
	"./si": "./node_modules/handsontable/node_modules/moment/locale/si.js",
	"./si.js": "./node_modules/handsontable/node_modules/moment/locale/si.js",
	"./sk": "./node_modules/handsontable/node_modules/moment/locale/sk.js",
	"./sk.js": "./node_modules/handsontable/node_modules/moment/locale/sk.js",
	"./sl": "./node_modules/handsontable/node_modules/moment/locale/sl.js",
	"./sl.js": "./node_modules/handsontable/node_modules/moment/locale/sl.js",
	"./sq": "./node_modules/handsontable/node_modules/moment/locale/sq.js",
	"./sq.js": "./node_modules/handsontable/node_modules/moment/locale/sq.js",
	"./sr": "./node_modules/handsontable/node_modules/moment/locale/sr.js",
	"./sr-cyrl": "./node_modules/handsontable/node_modules/moment/locale/sr-cyrl.js",
	"./sr-cyrl.js": "./node_modules/handsontable/node_modules/moment/locale/sr-cyrl.js",
	"./sr.js": "./node_modules/handsontable/node_modules/moment/locale/sr.js",
	"./ss": "./node_modules/handsontable/node_modules/moment/locale/ss.js",
	"./ss.js": "./node_modules/handsontable/node_modules/moment/locale/ss.js",
	"./sv": "./node_modules/handsontable/node_modules/moment/locale/sv.js",
	"./sv.js": "./node_modules/handsontable/node_modules/moment/locale/sv.js",
	"./sw": "./node_modules/handsontable/node_modules/moment/locale/sw.js",
	"./sw.js": "./node_modules/handsontable/node_modules/moment/locale/sw.js",
	"./ta": "./node_modules/handsontable/node_modules/moment/locale/ta.js",
	"./ta.js": "./node_modules/handsontable/node_modules/moment/locale/ta.js",
	"./te": "./node_modules/handsontable/node_modules/moment/locale/te.js",
	"./te.js": "./node_modules/handsontable/node_modules/moment/locale/te.js",
	"./tet": "./node_modules/handsontable/node_modules/moment/locale/tet.js",
	"./tet.js": "./node_modules/handsontable/node_modules/moment/locale/tet.js",
	"./tg": "./node_modules/handsontable/node_modules/moment/locale/tg.js",
	"./tg.js": "./node_modules/handsontable/node_modules/moment/locale/tg.js",
	"./th": "./node_modules/handsontable/node_modules/moment/locale/th.js",
	"./th.js": "./node_modules/handsontable/node_modules/moment/locale/th.js",
	"./tl-ph": "./node_modules/handsontable/node_modules/moment/locale/tl-ph.js",
	"./tl-ph.js": "./node_modules/handsontable/node_modules/moment/locale/tl-ph.js",
	"./tlh": "./node_modules/handsontable/node_modules/moment/locale/tlh.js",
	"./tlh.js": "./node_modules/handsontable/node_modules/moment/locale/tlh.js",
	"./tr": "./node_modules/handsontable/node_modules/moment/locale/tr.js",
	"./tr.js": "./node_modules/handsontable/node_modules/moment/locale/tr.js",
	"./tzl": "./node_modules/handsontable/node_modules/moment/locale/tzl.js",
	"./tzl.js": "./node_modules/handsontable/node_modules/moment/locale/tzl.js",
	"./tzm": "./node_modules/handsontable/node_modules/moment/locale/tzm.js",
	"./tzm-latn": "./node_modules/handsontable/node_modules/moment/locale/tzm-latn.js",
	"./tzm-latn.js": "./node_modules/handsontable/node_modules/moment/locale/tzm-latn.js",
	"./tzm.js": "./node_modules/handsontable/node_modules/moment/locale/tzm.js",
	"./ug-cn": "./node_modules/handsontable/node_modules/moment/locale/ug-cn.js",
	"./ug-cn.js": "./node_modules/handsontable/node_modules/moment/locale/ug-cn.js",
	"./uk": "./node_modules/handsontable/node_modules/moment/locale/uk.js",
	"./uk.js": "./node_modules/handsontable/node_modules/moment/locale/uk.js",
	"./ur": "./node_modules/handsontable/node_modules/moment/locale/ur.js",
	"./ur.js": "./node_modules/handsontable/node_modules/moment/locale/ur.js",
	"./uz": "./node_modules/handsontable/node_modules/moment/locale/uz.js",
	"./uz-latn": "./node_modules/handsontable/node_modules/moment/locale/uz-latn.js",
	"./uz-latn.js": "./node_modules/handsontable/node_modules/moment/locale/uz-latn.js",
	"./uz.js": "./node_modules/handsontable/node_modules/moment/locale/uz.js",
	"./vi": "./node_modules/handsontable/node_modules/moment/locale/vi.js",
	"./vi.js": "./node_modules/handsontable/node_modules/moment/locale/vi.js",
	"./x-pseudo": "./node_modules/handsontable/node_modules/moment/locale/x-pseudo.js",
	"./x-pseudo.js": "./node_modules/handsontable/node_modules/moment/locale/x-pseudo.js",
	"./yo": "./node_modules/handsontable/node_modules/moment/locale/yo.js",
	"./yo.js": "./node_modules/handsontable/node_modules/moment/locale/yo.js",
	"./zh-cn": "./node_modules/handsontable/node_modules/moment/locale/zh-cn.js",
	"./zh-cn.js": "./node_modules/handsontable/node_modules/moment/locale/zh-cn.js",
	"./zh-hk": "./node_modules/handsontable/node_modules/moment/locale/zh-hk.js",
	"./zh-hk.js": "./node_modules/handsontable/node_modules/moment/locale/zh-hk.js",
	"./zh-tw": "./node_modules/handsontable/node_modules/moment/locale/zh-tw.js",
	"./zh-tw.js": "./node_modules/handsontable/node_modules/moment/locale/zh-tw.js"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./node_modules/handsontable/node_modules/moment/locale sync recursive ^\\.\\/.*$";

/***/ }),

/***/ "./node_modules/moment/locale sync recursive ^\\.\\/.*$":
/*!**************************************************!*\
  !*** ./node_modules/moment/locale sync ^\.\/.*$ ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": "./node_modules/moment/locale/af.js",
	"./af.js": "./node_modules/moment/locale/af.js",
	"./ar": "./node_modules/moment/locale/ar.js",
	"./ar-dz": "./node_modules/moment/locale/ar-dz.js",
	"./ar-dz.js": "./node_modules/moment/locale/ar-dz.js",
	"./ar-kw": "./node_modules/moment/locale/ar-kw.js",
	"./ar-kw.js": "./node_modules/moment/locale/ar-kw.js",
	"./ar-ly": "./node_modules/moment/locale/ar-ly.js",
	"./ar-ly.js": "./node_modules/moment/locale/ar-ly.js",
	"./ar-ma": "./node_modules/moment/locale/ar-ma.js",
	"./ar-ma.js": "./node_modules/moment/locale/ar-ma.js",
	"./ar-sa": "./node_modules/moment/locale/ar-sa.js",
	"./ar-sa.js": "./node_modules/moment/locale/ar-sa.js",
	"./ar-tn": "./node_modules/moment/locale/ar-tn.js",
	"./ar-tn.js": "./node_modules/moment/locale/ar-tn.js",
	"./ar.js": "./node_modules/moment/locale/ar.js",
	"./az": "./node_modules/moment/locale/az.js",
	"./az.js": "./node_modules/moment/locale/az.js",
	"./be": "./node_modules/moment/locale/be.js",
	"./be.js": "./node_modules/moment/locale/be.js",
	"./bg": "./node_modules/moment/locale/bg.js",
	"./bg.js": "./node_modules/moment/locale/bg.js",
	"./bm": "./node_modules/moment/locale/bm.js",
	"./bm.js": "./node_modules/moment/locale/bm.js",
	"./bn": "./node_modules/moment/locale/bn.js",
	"./bn-bd": "./node_modules/moment/locale/bn-bd.js",
	"./bn-bd.js": "./node_modules/moment/locale/bn-bd.js",
	"./bn.js": "./node_modules/moment/locale/bn.js",
	"./bo": "./node_modules/moment/locale/bo.js",
	"./bo.js": "./node_modules/moment/locale/bo.js",
	"./br": "./node_modules/moment/locale/br.js",
	"./br.js": "./node_modules/moment/locale/br.js",
	"./bs": "./node_modules/moment/locale/bs.js",
	"./bs.js": "./node_modules/moment/locale/bs.js",
	"./ca": "./node_modules/moment/locale/ca.js",
	"./ca.js": "./node_modules/moment/locale/ca.js",
	"./cs": "./node_modules/moment/locale/cs.js",
	"./cs.js": "./node_modules/moment/locale/cs.js",
	"./cv": "./node_modules/moment/locale/cv.js",
	"./cv.js": "./node_modules/moment/locale/cv.js",
	"./cy": "./node_modules/moment/locale/cy.js",
	"./cy.js": "./node_modules/moment/locale/cy.js",
	"./da": "./node_modules/moment/locale/da.js",
	"./da.js": "./node_modules/moment/locale/da.js",
	"./de": "./node_modules/moment/locale/de.js",
	"./de-at": "./node_modules/moment/locale/de-at.js",
	"./de-at.js": "./node_modules/moment/locale/de-at.js",
	"./de-ch": "./node_modules/moment/locale/de-ch.js",
	"./de-ch.js": "./node_modules/moment/locale/de-ch.js",
	"./de.js": "./node_modules/moment/locale/de.js",
	"./dv": "./node_modules/moment/locale/dv.js",
	"./dv.js": "./node_modules/moment/locale/dv.js",
	"./el": "./node_modules/moment/locale/el.js",
	"./el.js": "./node_modules/moment/locale/el.js",
	"./en-au": "./node_modules/moment/locale/en-au.js",
	"./en-au.js": "./node_modules/moment/locale/en-au.js",
	"./en-ca": "./node_modules/moment/locale/en-ca.js",
	"./en-ca.js": "./node_modules/moment/locale/en-ca.js",
	"./en-gb": "./node_modules/moment/locale/en-gb.js",
	"./en-gb.js": "./node_modules/moment/locale/en-gb.js",
	"./en-ie": "./node_modules/moment/locale/en-ie.js",
	"./en-ie.js": "./node_modules/moment/locale/en-ie.js",
	"./en-il": "./node_modules/moment/locale/en-il.js",
	"./en-il.js": "./node_modules/moment/locale/en-il.js",
	"./en-in": "./node_modules/moment/locale/en-in.js",
	"./en-in.js": "./node_modules/moment/locale/en-in.js",
	"./en-nz": "./node_modules/moment/locale/en-nz.js",
	"./en-nz.js": "./node_modules/moment/locale/en-nz.js",
	"./en-sg": "./node_modules/moment/locale/en-sg.js",
	"./en-sg.js": "./node_modules/moment/locale/en-sg.js",
	"./eo": "./node_modules/moment/locale/eo.js",
	"./eo.js": "./node_modules/moment/locale/eo.js",
	"./es": "./node_modules/moment/locale/es.js",
	"./es-do": "./node_modules/moment/locale/es-do.js",
	"./es-do.js": "./node_modules/moment/locale/es-do.js",
	"./es-mx": "./node_modules/moment/locale/es-mx.js",
	"./es-mx.js": "./node_modules/moment/locale/es-mx.js",
	"./es-us": "./node_modules/moment/locale/es-us.js",
	"./es-us.js": "./node_modules/moment/locale/es-us.js",
	"./es.js": "./node_modules/moment/locale/es.js",
	"./et": "./node_modules/moment/locale/et.js",
	"./et.js": "./node_modules/moment/locale/et.js",
	"./eu": "./node_modules/moment/locale/eu.js",
	"./eu.js": "./node_modules/moment/locale/eu.js",
	"./fa": "./node_modules/moment/locale/fa.js",
	"./fa.js": "./node_modules/moment/locale/fa.js",
	"./fi": "./node_modules/moment/locale/fi.js",
	"./fi.js": "./node_modules/moment/locale/fi.js",
	"./fil": "./node_modules/moment/locale/fil.js",
	"./fil.js": "./node_modules/moment/locale/fil.js",
	"./fo": "./node_modules/moment/locale/fo.js",
	"./fo.js": "./node_modules/moment/locale/fo.js",
	"./fr": "./node_modules/moment/locale/fr.js",
	"./fr-ca": "./node_modules/moment/locale/fr-ca.js",
	"./fr-ca.js": "./node_modules/moment/locale/fr-ca.js",
	"./fr-ch": "./node_modules/moment/locale/fr-ch.js",
	"./fr-ch.js": "./node_modules/moment/locale/fr-ch.js",
	"./fr.js": "./node_modules/moment/locale/fr.js",
	"./fy": "./node_modules/moment/locale/fy.js",
	"./fy.js": "./node_modules/moment/locale/fy.js",
	"./ga": "./node_modules/moment/locale/ga.js",
	"./ga.js": "./node_modules/moment/locale/ga.js",
	"./gd": "./node_modules/moment/locale/gd.js",
	"./gd.js": "./node_modules/moment/locale/gd.js",
	"./gl": "./node_modules/moment/locale/gl.js",
	"./gl.js": "./node_modules/moment/locale/gl.js",
	"./gom-deva": "./node_modules/moment/locale/gom-deva.js",
	"./gom-deva.js": "./node_modules/moment/locale/gom-deva.js",
	"./gom-latn": "./node_modules/moment/locale/gom-latn.js",
	"./gom-latn.js": "./node_modules/moment/locale/gom-latn.js",
	"./gu": "./node_modules/moment/locale/gu.js",
	"./gu.js": "./node_modules/moment/locale/gu.js",
	"./he": "./node_modules/moment/locale/he.js",
	"./he.js": "./node_modules/moment/locale/he.js",
	"./hi": "./node_modules/moment/locale/hi.js",
	"./hi.js": "./node_modules/moment/locale/hi.js",
	"./hr": "./node_modules/moment/locale/hr.js",
	"./hr.js": "./node_modules/moment/locale/hr.js",
	"./hu": "./node_modules/moment/locale/hu.js",
	"./hu.js": "./node_modules/moment/locale/hu.js",
	"./hy-am": "./node_modules/moment/locale/hy-am.js",
	"./hy-am.js": "./node_modules/moment/locale/hy-am.js",
	"./id": "./node_modules/moment/locale/id.js",
	"./id.js": "./node_modules/moment/locale/id.js",
	"./is": "./node_modules/moment/locale/is.js",
	"./is.js": "./node_modules/moment/locale/is.js",
	"./it": "./node_modules/moment/locale/it.js",
	"./it-ch": "./node_modules/moment/locale/it-ch.js",
	"./it-ch.js": "./node_modules/moment/locale/it-ch.js",
	"./it.js": "./node_modules/moment/locale/it.js",
	"./ja": "./node_modules/moment/locale/ja.js",
	"./ja.js": "./node_modules/moment/locale/ja.js",
	"./jv": "./node_modules/moment/locale/jv.js",
	"./jv.js": "./node_modules/moment/locale/jv.js",
	"./ka": "./node_modules/moment/locale/ka.js",
	"./ka.js": "./node_modules/moment/locale/ka.js",
	"./kk": "./node_modules/moment/locale/kk.js",
	"./kk.js": "./node_modules/moment/locale/kk.js",
	"./km": "./node_modules/moment/locale/km.js",
	"./km.js": "./node_modules/moment/locale/km.js",
	"./kn": "./node_modules/moment/locale/kn.js",
	"./kn.js": "./node_modules/moment/locale/kn.js",
	"./ko": "./node_modules/moment/locale/ko.js",
	"./ko.js": "./node_modules/moment/locale/ko.js",
	"./ku": "./node_modules/moment/locale/ku.js",
	"./ku.js": "./node_modules/moment/locale/ku.js",
	"./ky": "./node_modules/moment/locale/ky.js",
	"./ky.js": "./node_modules/moment/locale/ky.js",
	"./lb": "./node_modules/moment/locale/lb.js",
	"./lb.js": "./node_modules/moment/locale/lb.js",
	"./lo": "./node_modules/moment/locale/lo.js",
	"./lo.js": "./node_modules/moment/locale/lo.js",
	"./lt": "./node_modules/moment/locale/lt.js",
	"./lt.js": "./node_modules/moment/locale/lt.js",
	"./lv": "./node_modules/moment/locale/lv.js",
	"./lv.js": "./node_modules/moment/locale/lv.js",
	"./me": "./node_modules/moment/locale/me.js",
	"./me.js": "./node_modules/moment/locale/me.js",
	"./mi": "./node_modules/moment/locale/mi.js",
	"./mi.js": "./node_modules/moment/locale/mi.js",
	"./mk": "./node_modules/moment/locale/mk.js",
	"./mk.js": "./node_modules/moment/locale/mk.js",
	"./ml": "./node_modules/moment/locale/ml.js",
	"./ml.js": "./node_modules/moment/locale/ml.js",
	"./mn": "./node_modules/moment/locale/mn.js",
	"./mn.js": "./node_modules/moment/locale/mn.js",
	"./mr": "./node_modules/moment/locale/mr.js",
	"./mr.js": "./node_modules/moment/locale/mr.js",
	"./ms": "./node_modules/moment/locale/ms.js",
	"./ms-my": "./node_modules/moment/locale/ms-my.js",
	"./ms-my.js": "./node_modules/moment/locale/ms-my.js",
	"./ms.js": "./node_modules/moment/locale/ms.js",
	"./mt": "./node_modules/moment/locale/mt.js",
	"./mt.js": "./node_modules/moment/locale/mt.js",
	"./my": "./node_modules/moment/locale/my.js",
	"./my.js": "./node_modules/moment/locale/my.js",
	"./nb": "./node_modules/moment/locale/nb.js",
	"./nb.js": "./node_modules/moment/locale/nb.js",
	"./ne": "./node_modules/moment/locale/ne.js",
	"./ne.js": "./node_modules/moment/locale/ne.js",
	"./nl": "./node_modules/moment/locale/nl.js",
	"./nl-be": "./node_modules/moment/locale/nl-be.js",
	"./nl-be.js": "./node_modules/moment/locale/nl-be.js",
	"./nl.js": "./node_modules/moment/locale/nl.js",
	"./nn": "./node_modules/moment/locale/nn.js",
	"./nn.js": "./node_modules/moment/locale/nn.js",
	"./oc-lnc": "./node_modules/moment/locale/oc-lnc.js",
	"./oc-lnc.js": "./node_modules/moment/locale/oc-lnc.js",
	"./pa-in": "./node_modules/moment/locale/pa-in.js",
	"./pa-in.js": "./node_modules/moment/locale/pa-in.js",
	"./pl": "./node_modules/moment/locale/pl.js",
	"./pl.js": "./node_modules/moment/locale/pl.js",
	"./pt": "./node_modules/moment/locale/pt.js",
	"./pt-br": "./node_modules/moment/locale/pt-br.js",
	"./pt-br.js": "./node_modules/moment/locale/pt-br.js",
	"./pt.js": "./node_modules/moment/locale/pt.js",
	"./ro": "./node_modules/moment/locale/ro.js",
	"./ro.js": "./node_modules/moment/locale/ro.js",
	"./ru": "./node_modules/moment/locale/ru.js",
	"./ru.js": "./node_modules/moment/locale/ru.js",
	"./sd": "./node_modules/moment/locale/sd.js",
	"./sd.js": "./node_modules/moment/locale/sd.js",
	"./se": "./node_modules/moment/locale/se.js",
	"./se.js": "./node_modules/moment/locale/se.js",
	"./si": "./node_modules/moment/locale/si.js",
	"./si.js": "./node_modules/moment/locale/si.js",
	"./sk": "./node_modules/moment/locale/sk.js",
	"./sk.js": "./node_modules/moment/locale/sk.js",
	"./sl": "./node_modules/moment/locale/sl.js",
	"./sl.js": "./node_modules/moment/locale/sl.js",
	"./sq": "./node_modules/moment/locale/sq.js",
	"./sq.js": "./node_modules/moment/locale/sq.js",
	"./sr": "./node_modules/moment/locale/sr.js",
	"./sr-cyrl": "./node_modules/moment/locale/sr-cyrl.js",
	"./sr-cyrl.js": "./node_modules/moment/locale/sr-cyrl.js",
	"./sr.js": "./node_modules/moment/locale/sr.js",
	"./ss": "./node_modules/moment/locale/ss.js",
	"./ss.js": "./node_modules/moment/locale/ss.js",
	"./sv": "./node_modules/moment/locale/sv.js",
	"./sv.js": "./node_modules/moment/locale/sv.js",
	"./sw": "./node_modules/moment/locale/sw.js",
	"./sw.js": "./node_modules/moment/locale/sw.js",
	"./ta": "./node_modules/moment/locale/ta.js",
	"./ta.js": "./node_modules/moment/locale/ta.js",
	"./te": "./node_modules/moment/locale/te.js",
	"./te.js": "./node_modules/moment/locale/te.js",
	"./tet": "./node_modules/moment/locale/tet.js",
	"./tet.js": "./node_modules/moment/locale/tet.js",
	"./tg": "./node_modules/moment/locale/tg.js",
	"./tg.js": "./node_modules/moment/locale/tg.js",
	"./th": "./node_modules/moment/locale/th.js",
	"./th.js": "./node_modules/moment/locale/th.js",
	"./tk": "./node_modules/moment/locale/tk.js",
	"./tk.js": "./node_modules/moment/locale/tk.js",
	"./tl-ph": "./node_modules/moment/locale/tl-ph.js",
	"./tl-ph.js": "./node_modules/moment/locale/tl-ph.js",
	"./tlh": "./node_modules/moment/locale/tlh.js",
	"./tlh.js": "./node_modules/moment/locale/tlh.js",
	"./tr": "./node_modules/moment/locale/tr.js",
	"./tr.js": "./node_modules/moment/locale/tr.js",
	"./tzl": "./node_modules/moment/locale/tzl.js",
	"./tzl.js": "./node_modules/moment/locale/tzl.js",
	"./tzm": "./node_modules/moment/locale/tzm.js",
	"./tzm-latn": "./node_modules/moment/locale/tzm-latn.js",
	"./tzm-latn.js": "./node_modules/moment/locale/tzm-latn.js",
	"./tzm.js": "./node_modules/moment/locale/tzm.js",
	"./ug-cn": "./node_modules/moment/locale/ug-cn.js",
	"./ug-cn.js": "./node_modules/moment/locale/ug-cn.js",
	"./uk": "./node_modules/moment/locale/uk.js",
	"./uk.js": "./node_modules/moment/locale/uk.js",
	"./ur": "./node_modules/moment/locale/ur.js",
	"./ur.js": "./node_modules/moment/locale/ur.js",
	"./uz": "./node_modules/moment/locale/uz.js",
	"./uz-latn": "./node_modules/moment/locale/uz-latn.js",
	"./uz-latn.js": "./node_modules/moment/locale/uz-latn.js",
	"./uz.js": "./node_modules/moment/locale/uz.js",
	"./vi": "./node_modules/moment/locale/vi.js",
	"./vi.js": "./node_modules/moment/locale/vi.js",
	"./x-pseudo": "./node_modules/moment/locale/x-pseudo.js",
	"./x-pseudo.js": "./node_modules/moment/locale/x-pseudo.js",
	"./yo": "./node_modules/moment/locale/yo.js",
	"./yo.js": "./node_modules/moment/locale/yo.js",
	"./zh-cn": "./node_modules/moment/locale/zh-cn.js",
	"./zh-cn.js": "./node_modules/moment/locale/zh-cn.js",
	"./zh-hk": "./node_modules/moment/locale/zh-hk.js",
	"./zh-hk.js": "./node_modules/moment/locale/zh-hk.js",
	"./zh-mo": "./node_modules/moment/locale/zh-mo.js",
	"./zh-mo.js": "./node_modules/moment/locale/zh-mo.js",
	"./zh-tw": "./node_modules/moment/locale/zh-tw.js",
	"./zh-tw.js": "./node_modules/moment/locale/zh-tw.js"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./node_modules/moment/locale sync recursive ^\\.\\/.*$";

/***/ }),

/***/ "./src/App.tsx":
/*!*********************!*\
  !*** ./src/App.tsx ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Controller__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Controller */ "./src/Controller.ts");
/* harmony import */ var _component_UserSearchSidebarView__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./component/UserSearchSidebarView */ "./src/component/UserSearchSidebarView.ts");
/* harmony import */ var _component_ChatSidebarView__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./component/ChatSidebarView */ "./src/component/ChatSidebarView.ts");
/* harmony import */ var _component_BoardGameSearchSidebarView__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./component/BoardGameSearchSidebarView */ "./src/component/BoardGameSearchSidebarView.ts");
/* harmony import */ var _component_BoardGameView__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./component/BoardGameView */ "./src/component/BoardGameView.tsx");
/* harmony import */ var _AppTypes__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./AppTypes */ "./src/AppTypes.ts");
/* harmony import */ var _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./util/BrowserUtil */ "./src/util/BrowserUtil.ts");
/* harmony import */ var _component_ScoreSheetController__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./component/ScoreSheetController */ "./src/component/ScoreSheetController.ts");
/* harmony import */ var _component_ScoreSheetView__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./component/ScoreSheetView */ "./src/component/ScoreSheetView.ts");
/* harmony import */ var _component_ScoreSheetSidebarView__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./component/ScoreSheetSidebarView */ "./src/component/ScoreSheetSidebarView.ts");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/* eslint "react/react-in-jsx-scope":"off" */

/* eslint "react/jsx-no-undef":"off" */













var logger = debug__WEBPACK_IMPORTED_MODULE_2___default()('app');

var Root = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(Root, _React$Component);

  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  function Root() {
    var _this;

    // @ts-ignore
    _this = _React$Component.call(this) || this;
    _this.state = {
      isLoggedIn: false,
      loggedInUserId: -1,
      boardGames: [],
      scoreSheet: {
        room: '',
        boardGameName: '',
        sheetLayoutOptions: {},
        timer: 0,
        sheetData: {}
      },
      stateNames: {
        users: 'users',
        boardGames: 'boardGames',
        scores: 'scores',
        selectedEntry: 'selectedEntry',
        recentUserSearches: 'recentUserSearches',
        bggSearchResults: 'bggSearchResults',
        scoreSheet: 'scoreSheet'
      },
      apis: {
        login: '/login',
        graphQL: '/graphql',
        bggSearchCall: 'query search($queryString: String!) {findBoardGames(query: $queryString) {gameId, name, year}}',
        bggSearchCallById: {
          queryString: 'query getDetails($gameId:Int!) {getBoardGameDetails(gameId:$gameId) {gameId,thumb,image,name,description,year, minPlayers, maxPlayers, minPlayTime, maxPlayTime, minAge, designers, artists, publisher, numOfRaters, averageScore, rank, categories}}',
          resultName: 'getBoardGameDetails'
        },
        findUsers: {
          queryString: 'query {findUsers {id, username}}',
          resultName: 'findUsers'
        },
        addToMyCollection: {
          queryString: 'mutation addBoardGame($userId: Int!, $boardGame: BoardGameDetailInput!){addToMyCollection(userId: $userId, boardGame: $boardGame) {id,gameId}}',
          resultName: 'addToMyCollection'
        },
        removeFromMyCollection: {
          queryString: 'mutation removeBoardGame($userId: Int!, $boardGameId: Int!) {removeFromMyCollection(userId: $userId, boardGameId: $boardGameId) {result}}',
          resultName: 'removeFromMyCollection'
        },
        getMyBoardGameCollection: {
          queryString: 'query myCollection($userId: Int!) {getMyBoardGameCollection(userId: $userId) {id,gameId,thumb,image,name,description,year, minPlayers, maxPlayers, minPlayTime, maxPlayTime, minAge, designers, artists, publisher, numOfRaters, averageScore, rank, categories,scoresheets {id, player1, score1, player2, score2, player3, score3, player4, score4, player5, score5, player6, score6, player7, score7, createdOn}}}',
          resultName: 'getMyBoardGameCollection'
        },
        addScoreSheetToBoardGame: {
          queryString: 'mutation addScore($userId: Int!, $boardGameId: Int!, $sheet: ScoreSheetInput) {addScoreSheetToBoardGame(userId: $userId, boardGameId: $boardGameId, sheet: $sheet){id}}',
          resultName: 'addScoreSheetToBoardGame'
        },
        removeScoreSheet: {
          queryString: 'mutation removeSheet($sheetId: String!) {removeScoreSheet(sheetId: $sheetId) {result}}',
          resultName: 'removeFromMyCollection'
        }
      },
      ui: {
        draggable: {
          draggableDataKeyId: 'text/plain',
          draggedType: 'draggedType',
          draggedFrom: 'draggedFrom',
          draggedTypeUser: 'user',
          draggedTypeBoardGame: 'boardGame',
          draggedFromUserSearch: 'userSearch',
          draggedFromBoardGameSearch: 'boardGameSearch'
        },
        alert: {
          modalId: "alert",
          titleId: "alert-title",
          contentId: "alert-content",
          cancelButtonId: "alert-cancel",
          confirmButtonId: "alert-confirm",
          closeButtonId: "alert-close",
          hideClass: "d-none",
          showClass: "d-block"
        },
        navigation: {
          showMyCollection: 'navigationItemMyCollection',
          boardGameSearchId: 'navigationItemBoardGameSearch',
          userSearchId: 'navigationItemUserSearch',
          chatId: 'navigationItemChat',
          showScoreSheet: 'navigationItemScoreSheet'
        },
        chatSideBar: {
          dom: {
            sideBarId: 'chatSideBar',
            resultsId: 'chatLogs',
            resultsElementType: 'a',
            resultsElementAttributes: [['href', '#']],
            resultsClasses: 'list-group-item my-list-item truncate-comment list-group-item-action',
            resultDataKeyId: 'room',
            resultLegacyDataKeyId: 'room',
            resultDataSourceId: 'chatLogs',
            modifierClassNormal: '',
            modifierClassInactive: 'list-group-item-dark',
            modifierClassActive: 'list-group-item-primary',
            modifierClassWarning: '',
            iconNormal: '',
            iconInactive: '',
            iconActive: '',
            iconWarning: '',
            isDraggable: false,
            isClickable: true,
            isDeleteable: true,
            deleteButtonClasses: 'btn btn-circle bg-warning btn-sm',
            deleteButtonText: '',
            deleteButtonIconClasses: 'text-black fas fa-sign-out-alt',
            hasBadge: true,
            resultContentDivClasses: 'd-flex w-100 justify-content-between',
            resultContentTextElementType: 'span',
            resultContentTextClasses: 'mb-1',
            badgeElementType: 'span',
            badgeElementAttributes: [['style', 'font-size:12pt']],
            badgeClasses: 'badge badge-pill badge-primary mr-1',
            newFormId: "newMessage",
            commentId: "message",
            submitCommentId: "submitMessage",
            chatLogId: 'chatLog',
            chatLogRoomId: 'chatLogRoom',
            leaveChatId: 'leaveChat',
            chatFastSearchUserNames: 'chatFastSearchUserNames'
          }
        },
        userSearchSideBar: {
          dom: {
            sideBarId: 'userSearchSideBar',
            resultsId: 'recentUserSearches',
            favouriteUsersId: 'favouriteUsers',
            blockedUsersId: 'blockedUsers',
            favouriteUsersDropZone: 'favouriteUsersDropZone',
            blockedUsersDropZone: 'blockedUsersDropZone',
            resultsElementType: 'a',
            resultsElementAttributes: [['href', '#']],
            resultsClasses: 'list-group-item my-list-item truncate-notification list-group-item-action',
            resultDataKeyId: 'user-id',
            resultLegacyDataKeyId: 'legacy-user-id',
            resultDataSourceId: 'data-source',
            resultDataSourceValue: 'recentUserSearches',
            resultDataSourceFavUsers: 'favouriteUsers',
            resultDataSourceBlockedUsers: 'blockedUsers',
            modifierClassNormal: 'list-group-item-primary',
            modifierClassInactive: 'list-group-item-light',
            modifierClassActive: 'list-group-item-info',
            modifierClassWarning: 'list-group-item-danger',
            iconNormal: '   <i class="fas fa-comment"></i>',
            iconInactive: '   <i class="fas fa-comment"></i>',
            iconActive: '   <i class="fas fa-heart"></i>',
            iconWarning: '  <i class="fas fa-exclamation-circle"></i>',
            resultContentDivClasses: 'd-flex w-100 justify-content-between',
            resultContentTextElementType: 'span',
            resultContentTextClasses: 'mb-1',
            isDraggable: true,
            isClickable: true,
            isDeleteable: true,
            deleteButtonClasses: 'btn bg-danger text-white btn-circle btn-sm',
            deleteButtonText: '',
            deleteButtonIconClasses: 'fas fa-trash-alt',
            extra: {
              fastSearchInputId: 'fastSearchUserNames'
            },
            extraAction1Classes: 'btn bg-info text-white btn-circle btn-sm mr-1',
            extraAction1Text: '',
            extraAction1IconClasses: 'fas fa-user-plus',
            extraAction2Classes: 'btn bg-warning text-white btn-circle btn-sm mr-1',
            extraAction2Text: '',
            extraAction2IconClasses: 'fas fa-user-slash'
          }
        },
        boardGameSearchSideBar: {
          dom: {
            sideBarId: 'boardGameSearchSidebar',
            resultsId: 'bggSearchResults',
            resultsElementType: 'a',
            resultsElementAttributes: [['href', '#']],
            resultsClasses: 'list-group-item my-list-item truncate-notification list-group-item-action',
            resultDataKeyId: 'bgg-id',
            resultLegacyDataKeyId: 'bgg-id',
            resultDataSourceId: 'data-source',
            resultDataSourceValue: 'bggSearch',
            modifierClassNormal: 'list-group-item-primary',
            modifierClassInactive: 'list-group-item-light',
            modifierClassActive: 'list-group-item-info',
            modifierClassWarning: 'list-group-item-danger',
            iconNormal: '   <i class="fas fa-dice"></i>',
            iconInactive: '   <i class="fas fa-dice"></i>',
            iconActive: '   <i class="fas fa-dice"></i>',
            iconWarning: '  <i class="fas fa-dice"></i>',
            resultContentDivClasses: 'd-flex w-100 justify-content-between',
            resultContentTextElementType: 'span',
            resultContentTextClasses: 'mb-1',
            isDraggable: true,
            isClickable: true,
            formId: 'bggSearch',
            queryId: 'queryText',
            buttonId: 'bggSearchButton'
          }
        },
        scoreSheetSideBar: {
          dom: {
            sideBarId: 'scoreSheetSidebar',
            resultsId: 'scoreSheets',
            resultsElementType: 'div',
            resultsElementAttributes: [],
            resultsClasses: 'text-white bg-info col-sm-6 col-md-3 col-lg-2 score-card',
            resultDataKeyId: 'bgg-id',
            resultLegacyDataKeyId: 'bgg-id',
            resultDataSourceId: 'data-source',
            resultDataSourceValue: 'scoreSheet',
            modifierClassNormal: '',
            modifierClassInactive: '',
            modifierClassActive: '',
            modifierClassWarning: '',
            iconNormal: ' ',
            iconInactive: ' ',
            iconActive: ' ',
            iconWarning: ' ',
            isDraggable: false,
            isClickable: false,
            isDeleteable: true,
            deleteButtonClasses: 'btn btn-rounded btn-warning ml-6 mt-4',
            deleteButtonText: 'Delete&nbsp;',
            deleteButtonIconClasses: 'fas fa-trash-alt',
            resultContentDivClasses: 'card-img-overlay',
            resultContentTextElementType: 'div',
            resultContentTextClasses: 'ml-2',
            hasBackgroundImage: true,
            imgElementType: 'img',
            imgClasses: 'score-card-img'
          }
        },
        scoreSheet: {
          dom: {
            dropZone: "scoreSheetZone",
            boardGame: "selectedBoardGame",
            startStopTimer: "startStopTimer",
            timer: "timerDisplay",
            end: "leaveScoreSheet",
            scoreSheet: "scoreSheet",
            iconStart: "<i class='fas fa-hourglass-start'></i>",
            iconInProgress: "<i class='fas fa-hourglass-half'></i>",
            iconEnd: "<i class='fas fa-hourglass-end'></i>",
            iconLeave: "<i class='fas fa-sign-out-alt'></i>",
            ssFastSearchUserNames: 'ssFastSearchUserNames',
            webrtc: 'webrtc'
          }
        }
      },
      uiPrefs: {
        navigation: {},
        blogEntry: {},
        userSearchSideBar: {
          view: {
            location: 'left',
            expandedSize: '35%'
          }
        },
        boardGameSearchSideBar: {
          view: {
            location: 'left',
            expandedSize: '35%'
          }
        },
        chatSideBar: {
          view: {
            location: 'right',
            expandedSize: '50%'
          }
        },
        scoreSheetSideBar: {
          view: {
            location: 'bottom',
            expandedSize: '30%'
          }
        }
      },
      controller: {
        events: {
          boardGames: {
            eventDataKeyId: 'board-game-id'
          }
        },
        dataLimit: {
          recentUserSearches: 10
        }
      }
    }; // event handlers

    _this.cancelDelete = _this.cancelDelete.bind(_assertThisInitialized(_this));
    _this.confirmDelete = _this.confirmDelete.bind(_assertThisInitialized(_this));
    _this.handleDeleteBoardGame = _this.handleDeleteBoardGame.bind(_assertThisInitialized(_this));
    _this.handleShowUserSearch = _this.handleShowUserSearch.bind(_assertThisInitialized(_this));
    _this.handleShowChat = _this.handleShowChat.bind(_assertThisInitialized(_this));
    _this.handleShowBGGSearch = _this.handleShowBGGSearch.bind(_assertThisInitialized(_this));
    _this.handleDragOver = _this.handleDragOver.bind(_assertThisInitialized(_this));
    _this.handleDrop = _this.handleDrop.bind(_assertThisInitialized(_this));
    _this.handleShowCollection = _this.handleShowCollection.bind(_assertThisInitialized(_this));
    _this.handleShowScoreSheet = _this.handleShowScoreSheet.bind(_assertThisInitialized(_this));
    _this.handleStartScoreSheet = _this.handleStartScoreSheet.bind(_assertThisInitialized(_this));
    _this.handleShowScores = _this.handleShowScores.bind(_assertThisInitialized(_this));
    _Controller__WEBPACK_IMPORTED_MODULE_3__["default"].connectToApplication(_assertThisInitialized(_this), window.localStorage);
    return _this;
  }

  var _proto = Root.prototype;

  _proto.addBoardGameToDisplay = function addBoardGameToDisplay(draggedObject) {
    // ok, we are just the dumb view, pass this onto the controller to work out the logic for us
    _Controller__WEBPACK_IMPORTED_MODULE_3__["default"].addBoardGameToDisplay(draggedObject);
  };

  _proto.getCurrentUser = function getCurrentUser() {
    return _Controller__WEBPACK_IMPORTED_MODULE_3__["default"].getLoggedInUserId();
  };

  _proto.alert = function alert(title, content) {
    this.titleEl.textContent = title;
    this.contentEl.textContent = content; // @ts-ignore

    this.modalEl.classList.remove(this.state.ui.alert.hideClass); // @ts-ignore

    this.modalEl.classList.add(this.state.ui.alert.showClass);
  };

  _proto.render = function render() {
    var _this2 = this;

    logger("Rendering App"); // @ts-ignore

    var boardGames = this.state.boardGames;
    logger(boardGames);
    var games = boardGames.map(function (entry, index) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_component_BoardGameView__WEBPACK_IMPORTED_MODULE_7__["default"], {
        key: index,
        boardGame: entry,
        showScoresHandler: _this2.handleShowScores,
        addToCollectionHandler: _Controller__WEBPACK_IMPORTED_MODULE_3__["default"].addBoardGameToCollection,
        removeFromCollectionHandler: _this2.handleDeleteBoardGame,
        startScoreSheetHandler: _this2.handleStartScoreSheet
      });
    });
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "root container-fluid"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "card-group"
    }, games));
  };

  _proto.cancelDelete = function cancelDelete(event) {
    // @ts-ignore
    this.modalEl.classList.remove(this.state.ui.alert.showClass); // @ts-ignore

    this.modalEl.classList.add(this.state.ui.alert.hideClass);
    event.preventDefault();
  };

  _proto.confirmDelete = function confirmDelete(event) {
    // @ts-ignore
    this.modalEl.classList.remove(this.state.ui.alert.showClass); // @ts-ignore

    this.modalEl.classList.add(this.state.ui.alert.hideClass);
    event.preventDefault(); // @ts-ignore

    var id = this.modalEl.getAttribute(this.state.controller.events.boardGames.eventDataKeyId);
    id = parseInt(id);
    logger("Handling Delete with id " + id); // @ts-ignore

    var currentBoardGamesOnDisplay = this.state.boardGames;
    var index = currentBoardGamesOnDisplay.findIndex(function (game) {
      return game.gameId === id;
    });

    if (index >= 0) {
      var boardGame = currentBoardGamesOnDisplay[index];
      _Controller__WEBPACK_IMPORTED_MODULE_3__["default"].removeBoardGameFromCollection(boardGame);
    }
  };

  _proto.handleStartScoreSheet = function handleStartScoreSheet(event) {
    event.preventDefault(); // do we already have an active score sheet?

    if (_component_ScoreSheetController__WEBPACK_IMPORTED_MODULE_10__["ScoreSheetController"].getInstance().hasActiveScoreSheet()) {
      if (confirm("You already have an active score sheet, do you want to finish that one and start a new one?")) {
        _component_ScoreSheetController__WEBPACK_IMPORTED_MODULE_10__["ScoreSheetController"].getInstance().endScoreSheet();
      } else {
        // user cancelled, finish
        return;
      }
    }

    this.hideAllSideBars(); // @ts-ignore

    var id = event.target.getAttribute(this.state.controller.events.boardGames.eventDataKeyId);
    logger("Handling starting score sheet for " + id);

    if (id) {
      // find the entry from the state manager
      id = parseInt(id); // @ts-ignore

      var currentBoardGamesOnDisplay = this.state.boardGames;
      var index = currentBoardGamesOnDisplay.findIndex(function (game) {
        return game.gameId === id;
      });

      if (index >= 0) {
        var boardGame = currentBoardGamesOnDisplay[index];
        logger(boardGame);
        _component_ScoreSheetController__WEBPACK_IMPORTED_MODULE_10__["ScoreSheetController"].getInstance().startScoreSheet(boardGame);
        this.switchBetweenCollectionAndScoreSheet(false);
      }
    }
  };

  _proto.handleDeleteBoardGame = function handleDeleteBoardGame(event) {
    event.preventDefault(); //this.hideAllSideBars();
    // @ts-ignore

    var id = event.target.getAttribute(this.state.controller.events.boardGames.eventDataKeyId);
    logger("Handling Delete Board Game " + id);

    if (id) {
      // find the entry from the state manager
      id = parseInt(id); // @ts-ignore

      var currentBoardGamesOnDisplay = this.state.boardGames;
      var index = currentBoardGamesOnDisplay.findIndex(function (game) {
        return game.gameId === id;
      });

      if (index >= 0) {
        var boardGame = currentBoardGamesOnDisplay[index];

        if (boardGame.decorator && boardGame.decorator === _AppTypes__WEBPACK_IMPORTED_MODULE_8__["Decorator"].Persisted) {
          logger("Handling Delete Board Game " + id + " - persisted, confirming with user, but only if logged in");

          if (_Controller__WEBPACK_IMPORTED_MODULE_3__["default"].isLoggedIn()) {
            // @ts-ignore
            this.modalEl.setAttribute(this.state.controller.events.boardGames.eventDataKeyId, id);
            this.alert(boardGame.name + " (" + boardGame.year + ")", "Are you sure you want to delete this board game from your collection?");
          } else {
            logger("Handling Delete Board Game " + id + " - IS persisted but not logged in, just deleting from local storage  asking controller to remove"); // not persisted yet, let the controller manage this one

            _Controller__WEBPACK_IMPORTED_MODULE_3__["default"].removeBoardGameFromDisplay(boardGame);
          }
        } else {
          logger("Handling Delete Board Game " + id + " - NOT persisted, asking controller to remove"); // not persisted yet, let the controller manage this one

          _Controller__WEBPACK_IMPORTED_MODULE_3__["default"].removeBoardGameFromDisplay(boardGame);
        }
      }
    }
  };

  _proto.componentDidMount = /*#__PURE__*/function () {
    var _componentDidMount = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              logger('component Did Mount');
              this.chatView = new _component_ChatSidebarView__WEBPACK_IMPORTED_MODULE_5__["default"](this, document, _Controller__WEBPACK_IMPORTED_MODULE_3__["default"].getStateManager());
              this.chatView.onDocumentLoaded();
              this.userSearchView = new _component_UserSearchSidebarView__WEBPACK_IMPORTED_MODULE_4__["default"](this, document, _Controller__WEBPACK_IMPORTED_MODULE_3__["default"].getStateManager());
              this.userSearchView.onDocumentLoaded();
              this.bggSearchView = new _component_BoardGameSearchSidebarView__WEBPACK_IMPORTED_MODULE_6__["default"](this, document, _Controller__WEBPACK_IMPORTED_MODULE_3__["default"].getStateManager());
              this.bggSearchView.onDocumentLoaded();
              this.scoresView = new _component_ScoreSheetSidebarView__WEBPACK_IMPORTED_MODULE_12__["default"](this, document, _Controller__WEBPACK_IMPORTED_MODULE_3__["default"].getStateManager());
              this.scoresView.onDocumentLoaded();
              this.scoreSheetView = _component_ScoreSheetView__WEBPACK_IMPORTED_MODULE_11__["ScoreSheetView"].getInstance();
              this.scoreSheetView.setApplication(this);
              this.scoreSheetView.onDocumentLoaded(this); // navigation item handlers

              if (document) {
                // @ts-ignore
                document.getElementById(this.state.ui.navigation.boardGameSearchId).addEventListener('click', this.handleShowBGGSearch); // @ts-ignore

                document.getElementById(this.state.ui.navigation.userSearchId).addEventListener('click', this.handleShowUserSearch); // @ts-ignore

                this.chatNavigationItem = document.getElementById(this.state.ui.navigation.chatId); // @ts-ignore

                this.chatNavigationItem.addEventListener('click', this.handleShowChat); // @ts-ignore

                document.getElementById(this.state.ui.navigation.showMyCollection).addEventListener('click', this.handleShowCollection); // @ts-ignore

                document.getElementById(this.state.ui.navigation.showScoreSheet).addEventListener('click', this.handleShowScoreSheet);
              } // alert modal dialog setup
              // @ts-ignore


              this.modalEl = document.getElementById(this.state.ui.alert.modalId); // @ts-ignore

              this.titleEl = document.getElementById(this.state.ui.alert.titleId); // @ts-ignore

              this.contentEl = document.getElementById(this.state.ui.alert.contentId); // @ts-ignore

              this.cancelBtnEl = document.getElementById(this.state.ui.alert.cancelButtonId); // @ts-ignore

              this.confirmBtnEl = document.getElementById(this.state.ui.alert.confirmButtonId); // @ts-ignore

              this.closeBtnEl = document.getElementById(this.state.ui.alert.closeButtonId); // event listeners for the confirm delete of entry

              if (this.cancelBtnEl) this.cancelBtnEl.addEventListener('click', this.cancelDelete);
              if (this.confirmBtnEl) this.confirmBtnEl.addEventListener('click', this.confirmDelete);
              if (this.closeBtnEl) this.closeBtnEl.addEventListener('click', this.cancelDelete); // a reference to the div containing ourselves
              // @ts-ignore

              this.thisEl = document.getElementById('root'); // @ts-ignore

              this.scoreSheetEl = document.getElementById('scoreSheetZone');

              if (this.thisEl) {
                this.thisEl.addEventListener('dragover', this.handleDragOver);
                this.thisEl.addEventListener('drop', this.handleDrop);
              } // ok lets try get things done


              _component_ScoreSheetController__WEBPACK_IMPORTED_MODULE_10__["ScoreSheetController"].getInstance().initialise(this);
              _Controller__WEBPACK_IMPORTED_MODULE_3__["default"].initialise();

            case 27:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function componentDidMount() {
      return _componentDidMount.apply(this, arguments);
    }

    return componentDidMount;
  }();

  _proto.hideAllSideBars = function hideAllSideBars() {
    this.chatView.eventHide(null);
    this.userSearchView.eventHide(null);
    this.bggSearchView.eventHide(null);
  };

  _proto.handleShowCollection = function handleShowCollection(event) {
    this.switchBetweenCollectionAndScoreSheet(true);
  };

  _proto.handleShowScoreSheet = function handleShowScoreSheet(event) {
    this.switchBetweenCollectionAndScoreSheet(false);
  };

  _proto.handleShowUserSearch = function handleShowUserSearch(event) {
    logger('Handling Show User Search');
    event.preventDefault(); //this.hideAllSideBars();
    // prevent anything from happening if we are not logged in

    if (!_Controller__WEBPACK_IMPORTED_MODULE_3__["default"].isLoggedIn()) {
      // @ts-ignore
      window.location.href = this.state.apis.login;
      return;
    }

    this.userSearchView.eventShow(event);
  };

  _proto.handleShowScores = function handleShowScores(event) {
    logger("Handling show board game scores");
    event.preventDefault(); // @ts-ignore

    var id = event.target.getAttribute(this.state.controller.events.boardGames.eventDataKeyId);
    logger("Handling Show board game scores " + id);

    if (id) {
      // find the entry from the state manager
      id = parseInt(id); // @ts-ignore

      var currentBoardGamesOnDisplay = this.state.boardGames;
      var index = currentBoardGamesOnDisplay.findIndex(function (game) {
        return game.gameId === id;
      });

      if (index >= 0) {
        var boardGame = currentBoardGamesOnDisplay[index];
        this.scoresView.setSelectedBoardGame(boardGame);
        this.scoresView.eventShow(null);
      }
    }
  };

  _proto.handleShowChat = function handleShowChat(event, roomName) {
    logger('Handling Show Chat');
    event.preventDefault(); //this.hideAllSideBars();
    // prevent anything from happening if we are not logged in

    if (!_Controller__WEBPACK_IMPORTED_MODULE_3__["default"].isLoggedIn()) {
      // @ts-ignore
      window.location.href = this.state.apis.login;
      return;
    }

    this.chatView.eventShow(event);

    if (roomName) {
      this.chatView.selectChatRoom(roomName);
    }
  };

  _proto.handleShowBGGSearch = function handleShowBGGSearch(event) {
    logger('Handling Show BGG Search View');
    event.preventDefault(); // prevent anything from happening if we are not logged in

    if (!_Controller__WEBPACK_IMPORTED_MODULE_3__["default"].isLoggedIn()) {
      this.hideAllSideBars(); // @ts-ignore
    }

    this.bggSearchView.eventShow(event);
  };

  _proto.countChanged = function countChanged(newCount) {
    //
    var buffer = 'Chat <i class="fas fa-inbox"></i>';

    if (newCount > 0) {
      buffer += " <span class=\"badge badge-pill badge-primary\">&nbsp;" + newCount + "&nbsp;</span>";
    }

    if (this.chatNavigationItem) this.chatNavigationItem.innerHTML = "" + buffer;
  };

  _proto.handleDragOver = function handleDragOver(event) {
    event.preventDefault();
  };

  _proto.handleDrop = function handleDrop(event) {
    // @ts-ignore
    var draggedObjectJSON = event.dataTransfer.getData(this.state.ui.draggable.draggableDataKeyId);
    logger(draggedObjectJSON);
    var draggedObject = JSON.parse(draggedObjectJSON);
    logger(draggedObject); // @ts-ignore

    if (draggedObject[this.state.ui.draggable.draggedType] === this.state.ui.draggable.draggedTypeBoardGame) {
      this.addBoardGameToDisplay(draggedObject);
    }
  };

  _proto.switchBetweenCollectionAndScoreSheet = function switchBetweenCollectionAndScoreSheet(showCollection) {
    if (showCollection) {
      if (this.thisEl) _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_9__["default"].addRemoveClasses(this.thisEl, 'd-none', false);
      if (this.thisEl) _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_9__["default"].addRemoveClasses(this.thisEl, 'd-block', true);
      if (this.scoreSheetEl) _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_9__["default"].addRemoveClasses(this.scoreSheetEl, 'd-none', true);
      if (this.scoreSheetEl) _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_9__["default"].addRemoveClasses(this.scoreSheetEl, 'd-block', false);
    } else {
      if (_component_ScoreSheetController__WEBPACK_IMPORTED_MODULE_10__["ScoreSheetController"].getInstance().hasActiveScoreSheet()) {
        if (this.thisEl) _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_9__["default"].addRemoveClasses(this.thisEl, 'd-none', true);
        if (this.thisEl) _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_9__["default"].addRemoveClasses(this.thisEl, 'd-block', false);
        if (this.scoreSheetEl) _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_9__["default"].addRemoveClasses(this.scoreSheetEl, 'd-none', false);
        if (this.scoreSheetEl) _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_9__["default"].addRemoveClasses(this.scoreSheetEl, 'd-block', true);
      }
    }
  };

  return Root;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component); //localStorage.debug = 'app view-ts controller-ts socket-ts api-ts local-storage-ts state-manager-ts view-ts:blogentry view-ts:comments view-ts:details';
//localStorage.debug = 'app controller-ts socket-ts api-ts local-storage-ts state-manager-ts indexeddb-ts user-search-sidebar user-search-sidebar:detail state-manager-ms state-manager-api state-manager-aggregate state-manager-async';
//localStorage.debug = 'app controller-ts  chat-sidebar chat-sidebar:detail board-game-search-sidebar board-game-search-sidebar:detail ';
//localStorage.debug = 'app controller-ts controller-ts-detail api-ts socket-ts chat-sidebar chat-sidebar:detail socket-listener notification-controller chat-manager board-game-search-sidebar board-game-search-sidebar:detail score-sheet-controller score-sheet-view score-sheet-sidebar score-sheet-sidebar:detail view-ts template-manager' ;


localStorage.debug = 'score-sheet-controller call-manager peer';
debug__WEBPACK_IMPORTED_MODULE_2___default.a.log = console.info.bind(console); // @ts-ignore

var element = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Root, {
  className: "container-fluid justify-content-around"
});
react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render(element, document.getElementById('root'));

/***/ }),

/***/ "./src/AppTypes.ts":
/*!*************************!*\
  !*** ./src/AppTypes.ts ***!
  \*************************/
/*! exports provided: Decorator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Decorator", function() { return Decorator; });
var Decorator;

(function (Decorator) {
  Decorator[Decorator["Incomplete"] = 0] = "Incomplete";
  Decorator[Decorator["Complete"] = 1] = "Complete";
  Decorator[Decorator["Persisted"] = 2] = "Persisted";
  Decorator[Decorator["PersistedLocally"] = 3] = "PersistedLocally";
})(Decorator || (Decorator = {}));

/***/ }),

/***/ "./src/Controller.ts":
/*!***************************!*\
  !*** ./src/Controller.ts ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _state_MemoryBufferStateManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./state/MemoryBufferStateManager */ "./src/state/MemoryBufferStateManager.ts");
/* harmony import */ var _state_RESTApiStateManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./state/RESTApiStateManager */ "./src/state/RESTApiStateManager.ts");
/* harmony import */ var _socket_SocketManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./socket/SocketManager */ "./src/socket/SocketManager.ts");
/* harmony import */ var _state_AsyncStateManagerWrapper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./state/AsyncStateManagerWrapper */ "./src/state/AsyncStateManagerWrapper.ts");
/* harmony import */ var _state_AggregateStateManager__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./state/AggregateStateManager */ "./src/state/AggregateStateManager.ts");
/* harmony import */ var _SocketListenerDelegate__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./SocketListenerDelegate */ "./src/SocketListenerDelegate.ts");
/* harmony import */ var _socket_ChatManager__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./socket/ChatManager */ "./src/socket/ChatManager.ts");
/* harmony import */ var _socket_NotificationController__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./socket/NotificationController */ "./src/socket/NotificationController.ts");
/* harmony import */ var _state_GraphQLApiStateManager__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./state/GraphQLApiStateManager */ "./src/state/GraphQLApiStateManager.ts");
/* harmony import */ var _AppTypes__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./AppTypes */ "./src/AppTypes.ts");
/* harmony import */ var _network_DownloadManager__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./network/DownloadManager */ "./src/network/DownloadManager.ts");
/* harmony import */ var _state_BrowserStorageStateManager__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./state/BrowserStorageStateManager */ "./src/state/BrowserStorageStateManager.ts");
/* harmony import */ var _component_ScoreSheetController__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./component/ScoreSheetController */ "./src/component/ScoreSheetController.ts");
/* harmony import */ var _util_EqualityFunctions__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./util/EqualityFunctions */ "./src/util/EqualityFunctions.ts");















var cLogger = debug__WEBPACK_IMPORTED_MODULE_0___default()('controller-ts');
var cLoggerDetail = debug__WEBPACK_IMPORTED_MODULE_0___default()('controller-ts-detail');

var Controller = /*#__PURE__*/function () {
  // @ts-ignore
  // @ts-ignore
  function Controller() {}

  var _proto = Controller.prototype;

  _proto.connectToApplication = function connectToApplication(applicationView, clientSideStorage) {
    this.applicationView = applicationView;
    this.clientSideStorage = clientSideStorage;
    this.config = this.applicationView.state; // setup the API calls

    var apiStateManager = _state_RESTApiStateManager__WEBPACK_IMPORTED_MODULE_2__["RESTApiStateManager"].getInstance();
    apiStateManager.initialise([{
      stateName: this.config.stateNames.boardGames,
      serverURL: this.getServerAPIURL(),
      api: this.config.apis.entries,
      isActive: true
    }, {
      stateName: this.config.stateNames.scores,
      serverURL: this.getServerAPIURL(),
      api: this.config.apis.comments,
      isActive: true
    }]);
    var graphSM = new _state_GraphQLApiStateManager__WEBPACK_IMPORTED_MODULE_9__["GraphQLApiStateManager"]();
    graphSM.initialise([{
      stateName: this.config.stateNames.users,
      apiURL: this.getServerAPIURL() + this.config.apis.graphQL,
      apis: {
        find: '',
        create: '',
        destroy: '',
        update: '',
        findAll: this.config.apis.findUsers.queryString
      },
      data: {
        find: '',
        create: '',
        destroy: '',
        update: '',
        findAll: this.config.apis.findUsers.resultName
      },
      isActive: true
    }]);
    var aggregateSM = _state_AggregateStateManager__WEBPACK_IMPORTED_MODULE_5__["AggregateStateManager"].getInstance();
    var memorySM = _state_MemoryBufferStateManager__WEBPACK_IMPORTED_MODULE_1__["default"].getInstance();
    var asyncDBSM = new _state_AsyncStateManagerWrapper__WEBPACK_IMPORTED_MODULE_4__["default"](aggregateSM, apiStateManager);
    var asyncQLSM = new _state_AsyncStateManagerWrapper__WEBPACK_IMPORTED_MODULE_4__["default"](aggregateSM, graphSM);
    aggregateSM.addStateManager(memorySM, [], false);
    aggregateSM.addStateManager(asyncQLSM, [this.config.stateNames.selectedEntry, this.config.stateNames.recentUserSearches, this.config.stateNames.boardGames, this.config.stateNames.scores], false);
    aggregateSM.addStateManager(asyncDBSM, [this.config.stateNames.users, this.config.stateNames.boardGames, this.config.stateNames.scores, this.config.stateNames.selectedEntry, this.config.stateNames.recentUserSearches], false);
    this.stateManager = aggregateSM; // state listener

    this.stateChanged = this.stateChanged.bind(this);
    this.stateChangedItemAdded = this.stateChangedItemAdded.bind(this);
    this.stateChangedItemRemoved = this.stateChangedItemRemoved.bind(this);
    this.stateChangedItemUpdated = this.stateChangedItemUpdated.bind(this); // call backs

    this.callbackBoardGameDetails = this.callbackBoardGameDetails.bind(this);
    this.callbackAddToCollection = this.callbackAddToCollection.bind(this);
    this.callbackRemoveFromCollection = this.callbackRemoveFromCollection.bind(this);
    this.callbackGetCollection = this.callbackGetCollection.bind(this); //event handlers

    this.addBoardGameToCollection = this.addBoardGameToCollection.bind(this);
    this.removeBoardGameFromCollection = this.removeBoardGameFromCollection.bind(this);
    this.removeBoardGameFromDisplay = this.removeBoardGameFromDisplay.bind(this); // further state management

    this.displayedBoardGamesStateManager = new _state_BrowserStorageStateManager__WEBPACK_IMPORTED_MODULE_12__["default"](true);
    return this;
  }
  /*
      Get the base data for the application (users, entries)
  */
  ;

  _proto.initialise = function initialise() {
    cLogger('Initialising data state'); // listen for socket events

    var socketListerDelegate = new _SocketListenerDelegate__WEBPACK_IMPORTED_MODULE_6__["default"](this.config);
    _socket_SocketManager__WEBPACK_IMPORTED_MODULE_3__["default"].setListener(socketListerDelegate); // now that we have all the user we can setup the chat system but only if we are logged in

    cLogger("Setting up chat system for user " + this.getLoggedInUserId() + ": " + this.getLoggedInUsername());

    if (this.getLoggedInUserId() > 0) {
      // setup the chat system
      var chatManager = _socket_ChatManager__WEBPACK_IMPORTED_MODULE_7__["ChatManager"].getInstance(); // this connects the manager to the socket system
      // setup the chat notification system

      _socket_NotificationController__WEBPACK_IMPORTED_MODULE_8__["NotificationController"].getInstance();
      chatManager.setCurrentUser(this.getLoggedInUsername());
      _component_ScoreSheetController__WEBPACK_IMPORTED_MODULE_13__["ScoreSheetController"].getInstance().setCurrentUser(this.getLoggedInUsername()); // let the application view know about message counts

      chatManager.setUnreadCountListener(this.applicationView);
      chatManager.login(); // load the users

      this.getStateManager().getStateByName(this.config.stateNames.users);
    }

    var currentGameList = this.displayedBoardGamesStateManager.getStateByName(this.config.stateNames.boardGames);
    currentGameList = this.cleanupBoardGameState(currentGameList); // load board games from local storage if any

    this.applicationView.setState({
      boardGames: currentGameList
    }); // download the current board game collection

    this.downloadAndSyncSavedBoardGameCollection();
  };

  _proto.getStateManager = function getStateManager() {
    return this.stateManager;
  };

  _proto.isLoggedIn = function isLoggedIn() {
    var isLoggedIn = false;

    try {
      // @ts-ignore
      if (loggedInUserId) {
        isLoggedIn = true;
      }
    } catch (error) {}

    return isLoggedIn;
  };

  _proto.getLoggedInUserId = function getLoggedInUserId() {
    var result = -1;

    try {
      // @ts-ignore
      if (loggedInUserId) {
        // @ts-ignore
        result = loggedInUserId;
      }
    } catch (error) {}

    cLoggerDetail("Logged in user id is " + result);
    return result;
  };

  _proto.getLoggedInUsername = function getLoggedInUsername() {
    var result = '';

    try {
      // @ts-ignore
      if (loggedInUsername) {
        // @ts-ignore
        result = loggedInUsername;
      }
    } catch (error) {}

    cLoggerDetail("Logged in user is " + result);
    return result;
  };

  _proto.handleMessage = function handleMessage(message) {
    cLogger(message);
  };

  _proto.getCurrentUser = function getCurrentUser() {
    return this.getLoggedInUserId();
  } //  State Management listening
  ;

  _proto.stateChangedItemAdded = function stateChangedItemAdded(managerName, name, itemAdded) {
    cLogger("State changed " + name + " from " + managerName + " - item Added");
    cLogger(itemAdded);

    switch (managerName) {
      case 'aggregate':
      case 'memory':
        {
          cLogger("received state from " + managerName + " for state " + name + " - updating application view");

          switch (name) {
            case this.config.stateNames.entries:
              {
                break;
              }
          }

          break;
        }
    }
  }
  /*
  *  sockets -
  *  Handling data changes by other users
  *
   */
  ;

  _proto.stateChangedItemRemoved = function stateChangedItemRemoved(managerName, name, itemRemoved) {
    cLogger("State changed " + name + " from " + managerName + "  - item Removed");
    cLogger(itemRemoved);

    switch (managerName) {
      case 'aggregate':
      case 'memory':
        {
          cLogger("received state from " + managerName + " for state " + name + " - updating application view");

          switch (name) {
            case this.config.stateNames.comments:
              {
                break;
              }
          }

          break;
        }
    }
  };

  _proto.stateChangedItemUpdated = function stateChangedItemUpdated(managerName, name, itemUpdated, itemNewValue) {
    cLogger("State changed " + name + " from " + managerName + " - item updated");
    cLogger(itemUpdated);

    switch (managerName) {
      case 'aggregate':
      case 'memory':
        {
          cLogger("received state from " + managerName + " for state " + name + " - updating application view");

          switch (name) {
            case this.config.stateNames.entries:
              {
                break;
              }
          }

          break;
        }
    }
  };

  _proto.stateChanged = function stateChanged(managerName, name, values) {
    cLogger("State changed " + name + " from " + managerName + " ");
    cLogger(values); // what has changed and by whom?

    switch (managerName) {
      case 'aggregate':
      case 'memory':
        {
          cLogger("received state from " + managerName + " for state " + name + " - sending to application view");

          switch (name) {
            case this.config.stateNames.entries:
              {
                break;
              }

            case this.config.stateNames.comments:
              {
                break;
              }

            case this.config.stateNames.users:
              {
                break;
              }
          }

          break;
        }
    }
  } // Data logic
  ;

  _proto.addBoardGameToDisplay = function addBoardGameToDisplay(boardGame) {
    // this will just the basics of a board game from the search then click/dragged over
    cLogger("Handling addition of board game");
    cLogger(boardGame); // don't add if already in the users display

    var currentListOfGames = this.applicationView.state.boardGames;
    var index = currentListOfGames.findIndex(function (value) {
      return value.gameId === boardGame.gameId;
    });

    if (index >= 0) {
      cLogger("Board game in display already");
      return;
    } // start with what we have and let the main view know, but mark it incomplete for partial rendering with user information


    boardGame.decorator = _AppTypes__WEBPACK_IMPORTED_MODULE_10__["Decorator"].Incomplete;
    currentListOfGames.push(boardGame);
    cLogger("Adding received board game to application");
    cLogger(boardGame);
    this.displayedBoardGamesStateManager.setStateByName(this.config.stateNames.boardGames, currentListOfGames, false);
    this.applicationView.setState({
      boardGames: currentListOfGames
    }); // now we need an API call to fill in the details

    _network_DownloadManager__WEBPACK_IMPORTED_MODULE_11__["default"].addQLApiRequest(this.config.apis.graphQL, this.config.apis.bggSearchCallById.queryString, {
      gameId: boardGame.gameId
    }, this.callbackBoardGameDetails, this.config.stateNames.boardGames, false);
  };

  _proto.callbackBoardGameDetails = function callbackBoardGameDetails(data, status, associatedStateName) {
    cLogger("callback for bgg search for single board game " + associatedStateName + " with status " + status);

    if (status >= 200 && status <= 299) {
      // do we have any data?
      cLogger(data);
      var boardGameDetails = data.data[this.config.apis.bggSearchCallById.resultName];
      cLogger(boardGameDetails);
      var regex = /&#10;/g;
      boardGameDetails.description = boardGameDetails.description.replace(regex, '\r\n');
      regex = /&ldquo;/g;
      boardGameDetails.description = boardGameDetails.description.replace(regex, '"');
      regex = /&rdquo;/g;
      boardGameDetails.description = boardGameDetails.description.replace(regex, '"');
      regex = /&quot;/g;
      boardGameDetails.description = boardGameDetails.description.replace(regex, '"');
      regex = /&mdash;/g;
      boardGameDetails.description = boardGameDetails.description.replace(regex, '"'); //this.getStateManager().addNewItemToState(this.config.stateNames.boardGames,data.data[this.config.apis.bggSearchCallById.resultName],true);

      var currentListOfGames = this.applicationView.state.boardGames;
      var index = currentListOfGames.findIndex(function (value) {
        return value.gameId === boardGameDetails.gameId;
      });

      if (index >= 0) {
        cLogger("Updating application state");
        currentListOfGames.splice(index, 1, boardGameDetails);
        cLogger(currentListOfGames);
        boardGameDetails.decorator = _AppTypes__WEBPACK_IMPORTED_MODULE_10__["Decorator"].PersistedLocally;
        this.displayedBoardGamesStateManager.setStateByName(this.config.stateNames.boardGames, currentListOfGames, false);
        this.applicationView.setState({
          boardGames: currentListOfGames
        });
      } else {
        cLogger("Board game " + boardGameDetails.id + " not found in current state");
      }
    }
  };

  _proto.callbackAddToCollection = function callbackAddToCollection(data, status, associatedStateName) {
    var _this = this;

    cLogger("callback for add single board game " + associatedStateName + " to my collection with status " + status);

    if (status >= 200 && status <= 299) {
      // do we have any data?
      cLogger(data);
      var id = data.data[this.config.apis.addToMyCollection.resultName];
      cLogger(id); // Find and update the board game in the state

      var currentGameList = this.applicationView.state.boardGames;
      var index = currentGameList.findIndex(function (game) {
        return game.gameId === id.gameId;
      });

      if (index >= 0) {
        var updatingBoardGame = currentGameList[index];
        cLogger("Updating board game " + updatingBoardGame.gameId + " with database id " + id.id + " and new Persisted state");
        updatingBoardGame.decorator = _AppTypes__WEBPACK_IMPORTED_MODULE_10__["Decorator"].Persisted;
        updatingBoardGame.id = id.id;

        if (updatingBoardGame.scoresheets) {
          var cb = function cb(data, status, associatedStateName) {}; // add the scoresheets to database


          updatingBoardGame.scoresheets.forEach(function (scoreSheet) {
            _this.convertScoreSheetToApiCallFormat(scoreSheet);

            _network_DownloadManager__WEBPACK_IMPORTED_MODULE_11__["default"].addQLApiRequest(_this.config.apis.graphQL, _this.config.apis.addScoreSheetToBoardGame.queryString, {
              userId: _this.getCurrentUser(),
              boardGameId: updatingBoardGame.id,
              sheet: scoreSheet
            }, cb, _this.config.stateNames.scoreSheet, false);

            _this.convertScoreSheetToDatabaseFormat(scoreSheet);

            scoreSheet.decorator = _AppTypes__WEBPACK_IMPORTED_MODULE_10__["Decorator"].Persisted;
          });
        }

        this.applicationView.setState({
          boardGames: currentGameList
        });
        this.displayedBoardGamesStateManager.updateItemInState(this.config.stateNames.boardGames, updatingBoardGame, _util_EqualityFunctions__WEBPACK_IMPORTED_MODULE_14__["isSameGame"], false);
      }
    }
  };

  _proto.callbackRemoveFromCollection = function callbackRemoveFromCollection(data, status, associatedStateName) {
    cLogger("callback for remove single board game " + associatedStateName + " from my collection with status " + status);

    if (status >= 200 && status <= 299) {
      // do we have any data?
      cLogger(data);
      var id = data.data[this.config.apis.removeFromMyCollection.resultName];
      cLogger(id);
    }
  };

  _proto.callbackGetCollection = function callbackGetCollection(data, status, associatedStateName) {
    var _this2 = this;

    cLogger("callback for getting my collection of board games " + associatedStateName + " to my collection with status " + status);

    if (status >= 200 && status <= 299) {
      // do we have any data?
      cLogger(data);
      var collectionData = data.data[this.config.apis.getMyBoardGameCollection.resultName]; // loop through the collection data and see if it already exists in the state

      var currentGameList = this.applicationView.state.boardGames;
      cLoggerDetail("Starting with local state of " + currentGameList.length);
      collectionData.forEach(function (boardGame) {
        boardGame.decorator = _AppTypes__WEBPACK_IMPORTED_MODULE_10__["Decorator"].Persisted;
        cLoggerDetail("Loading board game from collection ");
        cLoggerDetail(boardGame);

        _this2.decorateScoreSheets(boardGame);

        var index = currentGameList.findIndex(function (game) {
          return game.gameId === boardGame.gameId;
        });
        cLoggerDetail("have found the board game locally? " + (index >= 0));

        if (index >= 0) {
          var locallySaveBoardGame = currentGameList[index];
          cLoggerDetail("in current state, replacing"); // copy any locally saved score sheets to the database object

          _this2.copyLocallySavedScoreSheetsToBoardGame(boardGame, locallySaveBoardGame); // replace the current entry


          currentGameList.splice(index, 1, boardGame);
        } else {
          cLoggerDetail("not in current state, adding");
          currentGameList.push(boardGame);
        }
      });
      currentGameList = this.cleanupBoardGameState(currentGameList);
      cLoggerDetail("Ending with local state of " + currentGameList.length);
      this.applicationView.setState({
        boardGames: currentGameList
      });
      this.displayedBoardGamesStateManager.setStateByName(this.config.stateNames.boardGames, currentGameList, false);
    }
  };

  _proto.scoreSheetAddedToBoardGame = function scoreSheetAddedToBoardGame(boardGame, scoreSheet) {
    var cb = function cb(data, status, associatedStateName) {};

    if (this.isLoggedIn() && boardGame.decorator && boardGame.decorator === _AppTypes__WEBPACK_IMPORTED_MODULE_10__["Decorator"].Persisted) {
      //mutation addScore($userId: Int!, $boardGameId: Int!, $sheet: ScoreSheetInput) {addScoreSheetToBoardGame(userId: $userId, boardGameId: $boardGameId, sheet: $sheet){id}
      _network_DownloadManager__WEBPACK_IMPORTED_MODULE_11__["default"].addQLApiRequest(this.config.apis.graphQL, this.config.apis.addScoreSheetToBoardGame.queryString, {
        userId: this.getCurrentUser(),
        boardGameId: boardGame.id,
        sheet: scoreSheet
      }, cb, this.config.stateNames.scoreSheet, false);
      scoreSheet.decorator = _AppTypes__WEBPACK_IMPORTED_MODULE_10__["Decorator"].Persisted;
    } else {
      scoreSheet.decorator = _AppTypes__WEBPACK_IMPORTED_MODULE_10__["Decorator"].PersistedLocally;
    } // convert the scoresheet into the usual received format from the database


    this.convertScoreSheetToDatabaseFormat(scoreSheet);
    var currentListOfGames = this.applicationView.state.boardGames;
    var index = currentListOfGames.findIndex(function (value) {
      return value.gameId === boardGame.gameId;
    });

    if (index >= 0) {
      var oldBoardGame = currentListOfGames[index];
      boardGame.decorator = oldBoardGame.decorator;
      cLogger("Updating application state");
      currentListOfGames.splice(index, 1, boardGame);
      cLogger(currentListOfGames);
      this.displayedBoardGamesStateManager.setStateByName(this.config.stateNames.boardGames, currentListOfGames, false);
      this.applicationView.setState({
        boardGames: currentListOfGames
      });
    } else {
      cLogger("Board game " + boardGame.id + " not found in current state");
    }
  };

  _proto.scoreSheetRemovedFromBoardGame = function scoreSheetRemovedFromBoardGame(boardGame, scoreSheetId) {
    var cb = function cb(data, status, associatedStateName) {};

    if (this.isLoggedIn() && boardGame.decorator && boardGame.decorator === _AppTypes__WEBPACK_IMPORTED_MODULE_10__["Decorator"].Persisted) {
      //mutation addScore($userId: Int!, $boardGameId: Int!, $sheet: ScoreSheetInput) {addScoreSheetToBoardGame(userId: $userId, boardGameId: $boardGameId, sheet: $sheet){id}
      _network_DownloadManager__WEBPACK_IMPORTED_MODULE_11__["default"].addQLApiRequest(this.config.apis.graphQL, this.config.apis.removeScoreSheet.queryString, {
        sheetId: scoreSheetId
      }, cb, this.config.stateNames.scoreSheet, false);
    }

    var currentListOfGames = this.applicationView.state.boardGames;
    var index = currentListOfGames.findIndex(function (value) {
      return value.gameId === boardGame.gameId;
    });

    if (index >= 0) {
      var oldBoardGame = currentListOfGames[index];
      boardGame.decorator = oldBoardGame.decorator;
      cLogger("Updating application state");
      currentListOfGames.splice(index, 1, boardGame);
      cLogger(currentListOfGames);
      this.displayedBoardGamesStateManager.setStateByName(this.config.stateNames.boardGames, currentListOfGames, false);
      this.applicationView.setState({
        boardGames: currentListOfGames
      });
    } else {
      cLogger("Board game " + boardGame.id + " not found in current state");
    }
  };

  _proto.addBoardGameToCollection = function addBoardGameToCollection(event) {
    cLogger("Handling Add Board Game to collection");
    var boardGame = this.findBoardGameInStateFromEvent(event);

    if (boardGame) {
      if (boardGame.decorator) {
        switch (boardGame.decorator) {
          case _AppTypes__WEBPACK_IMPORTED_MODULE_10__["Decorator"].Persisted:
            {
              // already in collection, nothing to do
              break;
            }

          case _AppTypes__WEBPACK_IMPORTED_MODULE_10__["Decorator"].Incomplete:
            {
              // not ready to add to collection yet, do nothing
              break;
            }

          case _AppTypes__WEBPACK_IMPORTED_MODULE_10__["Decorator"].PersistedLocally:
          case _AppTypes__WEBPACK_IMPORTED_MODULE_10__["Decorator"].Complete:
            {
              // loaded and ready to save
              this.displayedBoardGamesStateManager.addNewItemToState(this.config.stateNames.boardGames, boardGame, true); // add the board game to my collection
              // now we need an API call to fill in the details

              delete boardGame.decorator;
              delete boardGame.id;

              if (this.isLoggedIn()) {
                var scoreSheets = boardGame.scoresheets;
                delete boardGame.scoresheets;
                _network_DownloadManager__WEBPACK_IMPORTED_MODULE_11__["default"].addQLApiRequest(this.config.apis.graphQL, this.config.apis.addToMyCollection.queryString, {
                  userId: this.getCurrentUser(),
                  boardGame: boardGame
                }, this.callbackAddToCollection, this.config.stateNames.boardGames, true);
                boardGame.decorator = _AppTypes__WEBPACK_IMPORTED_MODULE_10__["Decorator"].Complete;
                boardGame.scoresheets = scoreSheets;
              } else {
                boardGame.decorator = _AppTypes__WEBPACK_IMPORTED_MODULE_10__["Decorator"].PersistedLocally;
              }

              break;
            }
        }
      }
    }
  };

  _proto.removeBoardGameFromCollection = function removeBoardGameFromCollection(boardGame) {
    // should be persisted
    cLogger("Handling Remove Board Game from collection with id " + boardGame.gameId);

    if (boardGame) {
      if (boardGame.decorator) {
        switch (boardGame.decorator) {
          case _AppTypes__WEBPACK_IMPORTED_MODULE_10__["Decorator"].PersistedLocally:
          case _AppTypes__WEBPACK_IMPORTED_MODULE_10__["Decorator"].Persisted:
            {
              // already in collection,
              this.removeBoardGameFromState(boardGame);

              if (this.isLoggedIn()) {
                _network_DownloadManager__WEBPACK_IMPORTED_MODULE_11__["default"].addQLApiRequest(this.config.apis.graphQL, this.config.apis.removeFromMyCollection.queryString, {
                  userId: this.getCurrentUser(),
                  boardGameId: boardGame.gameId
                }, this.callbackRemoveFromCollection, this.config.stateNames.boardGames, false);
              }

              break;
            }

          case _AppTypes__WEBPACK_IMPORTED_MODULE_10__["Decorator"].Incomplete:
            {
              // not ready to add to collection yet, do nothing
              break;
            }

          case _AppTypes__WEBPACK_IMPORTED_MODULE_10__["Decorator"].Complete:
            {
              // loaded and ready to save, but not yet saved, nothing to delete
              break;
            }
        }
      }
    }
  };

  _proto.removeBoardGameFromDisplay = function removeBoardGameFromDisplay(boardGame) {
    // shouldn't be persisted yet
    cLogger("Handling Remove Board Game from display " + boardGame.gameId);

    if (boardGame) {
      if (boardGame.decorator) {
        switch (boardGame.decorator) {
          case _AppTypes__WEBPACK_IMPORTED_MODULE_10__["Decorator"].Incomplete:
            {
              // not ready to add to collection yet, do nothing
              break;
            }

          case _AppTypes__WEBPACK_IMPORTED_MODULE_10__["Decorator"].Persisted:
          case _AppTypes__WEBPACK_IMPORTED_MODULE_10__["Decorator"].PersistedLocally:
          case _AppTypes__WEBPACK_IMPORTED_MODULE_10__["Decorator"].Complete:
            {
              // loaded and ready to save
              this.removeBoardGameFromState(boardGame);
              break;
            }
        }
      }
    }
  };

  _proto.cleanupBoardGameState = function cleanupBoardGameState(boardGames) {
    // lets tidy up any duplicates, keeping Persisted ones by preference
    var cleanedUpList = [];
    boardGames.forEach(function (boardGame) {
      // is already in the list?
      var index = cleanedUpList.findIndex(function (game) {
        return game.gameId === boardGame.gameId;
      });

      if (index >= 0) {
        // found in the list
        // is this a persisted board game?
        var existingListGame = cleanedUpList[index];

        if (existingListGame.decorator && existingListGame.decorator === _AppTypes__WEBPACK_IMPORTED_MODULE_10__["Decorator"].Persisted) {// leave the persisted version in the cleaned up list
        } else {
          // do we have persisted game to replace the one in the list
          if (boardGame.decorator && boardGame.decorator === _AppTypes__WEBPACK_IMPORTED_MODULE_10__["Decorator"].Persisted) {
            // replace the existing one with this one
            cleanedUpList.splice(index, 1, boardGame);
          } else {// just leave the one there, neither are persisted to a database
          }
        }
      } else {
        // not found yet, add to list
        cleanedUpList.push(boardGame);
      }
    });
    return cleanedUpList;
  };

  _proto.downloadAndSyncSavedBoardGameCollection = function downloadAndSyncSavedBoardGameCollection() {
    if (this.isLoggedIn()) {
      // start the call to retrieve the saved collection of board games
      _network_DownloadManager__WEBPACK_IMPORTED_MODULE_11__["default"].addQLApiRequest(this.config.apis.graphQL, this.config.apis.getMyBoardGameCollection.queryString, {
        userId: this.getLoggedInUserId()
      }, this.callbackGetCollection, this.config.stateNames.boardGames, false);
    }
  }
  /*
  *
  * Simple Application state (URL, logged in user)
  *
   */
  ;

  _proto.getServerAPIURL = function getServerAPIURL() {
    var result = ""; // @ts-ignore

    if (window.ENV && window.ENV.serverURL) {
      // @ts-ignore
      result = window.ENV.serverURL;
    }

    return result;
  };

  _proto.removeBoardGameFromState = function removeBoardGameFromState(boardGame) {
    var currentBoardGamesOnDisplay = this.applicationView.state.boardGames;
    var index = currentBoardGamesOnDisplay.findIndex(function (game) {
      return game.gameId === boardGame.gameId;
    });

    if (index >= 0) {
      currentBoardGamesOnDisplay.splice(index, 1);
      this.applicationView.setState({
        boardGames: currentBoardGamesOnDisplay
      });
    } // save locally


    this.displayedBoardGamesStateManager.setStateByName(this.config.stateNames.boardGames, currentBoardGamesOnDisplay, false);
  };

  _proto.findBoardGameInStateFromEvent = function findBoardGameInStateFromEvent(event) {
    var boardGame = null;
    cLoggerDetail("Finding board game id in event"); // @ts-ignore

    var id = event.target.getAttribute(this.config.controller.events.boardGames.eventDataKeyId);
    cLoggerDetail(id);

    if (id) {
      // find the entry from the state manager
      id = parseInt(id); // @ts-ignore

      var currentBoardGamesOnDisplay = this.applicationView.state.boardGames;
      var index = currentBoardGamesOnDisplay.findIndex(function (game) {
        return game.gameId === id;
      });
      cLoggerDetail(index);

      if (index >= 0) {
        boardGame = currentBoardGamesOnDisplay[index];
      }
    }

    cLoggerDetail(boardGame);
    return boardGame;
  };

  _proto.decorateScoreSheets = function decorateScoreSheets(boardGame) {
    if (boardGame) {
      if (boardGame.scoresheets) {
        boardGame.scoresheets.forEach(function (sheet) {
          sheet.decorator = _AppTypes__WEBPACK_IMPORTED_MODULE_10__["Decorator"].Persisted;
        });
      } else {
        boardGame.scoresheets = [];
      }
    }
  };

  _proto.copyLocallySavedScoreSheetsToBoardGame = function copyLocallySavedScoreSheetsToBoardGame(target, source) {
    var _this3 = this;

    if (source.scoresheets) {
      var toSave = [];
      source.scoresheets.forEach(function (sheet) {
        // is the scoresheet already in the target?
        var index = target.scoresheets.findIndex(function (item) {
          return item.id === sheet.id;
        });

        if (index < 0) {
          sheet.decorator = _AppTypes__WEBPACK_IMPORTED_MODULE_10__["Decorator"].PersistedLocally;
          target.scoresheets.push(sheet);
          toSave.push(sheet);
        }
      }); // do we have any sheets to save?

      if (toSave.length > 0) {
        var cb = function cb(data, status, associatedStateName) {};

        toSave.forEach(function (sheetToSave) {
          _this3.convertScoreSheetToApiCallFormat(sheetToSave);

          _network_DownloadManager__WEBPACK_IMPORTED_MODULE_11__["default"].addQLApiRequest(_this3.config.apis.graphQL, _this3.config.apis.addScoreSheetToBoardGame.queryString, {
            userId: _this3.getCurrentUser(),
            boardGameId: target.id,
            sheet: sheetToSave
          }, cb, _this3.config.stateNames.scoreSheet, false);

          _this3.convertScoreSheetToDatabaseFormat(sheetToSave);

          sheetToSave.decorator = _AppTypes__WEBPACK_IMPORTED_MODULE_10__["Decorator"].Persisted;
        });
      }
    }
  };

  _proto.convertScoreSheetToDatabaseFormat = function convertScoreSheetToDatabaseFormat(scoreSheet) {
    if (scoreSheet.players) {
      if (scoreSheet.players.length >= 1) {
        scoreSheet.player1 = scoreSheet.players[0];
        scoreSheet.score1 = scoreSheet.scores[0];
      }

      if (scoreSheet.players.length >= 2) {
        scoreSheet.player2 = scoreSheet.players[1];
        scoreSheet.score2 = scoreSheet.scores[1];
      }

      if (scoreSheet.players.length >= 3) {
        scoreSheet.player3 = scoreSheet.players[2];
        scoreSheet.score3 = scoreSheet.scores[2];
      }

      if (scoreSheet.players.length >= 4) {
        scoreSheet.player4 = scoreSheet.players[3];
        scoreSheet.score4 = scoreSheet.scores[3];
      }

      if (scoreSheet.players.length >= 5) {
        scoreSheet.player5 = scoreSheet.players[4];
        scoreSheet.score5 = scoreSheet.scores[4];
      }

      if (scoreSheet.players.length >= 6) {
        scoreSheet.player6 = scoreSheet.players[5];
        scoreSheet.score6 = scoreSheet.scores[5];
      }

      if (scoreSheet.players.length >= 7) {
        scoreSheet.player7 = scoreSheet.players[6];
        scoreSheet.score7 = scoreSheet.scores[6];
      }
    }
  };

  _proto.convertScoreSheetToApiCallFormat = function convertScoreSheetToApiCallFormat(scoreSheet) {
    delete scoreSheet.decorator;
    delete scoreSheet.player1;
    delete scoreSheet.score1;
    delete scoreSheet.player2;
    delete scoreSheet.score2;
    delete scoreSheet.player3;
    delete scoreSheet.score3;
    delete scoreSheet.player4;
    delete scoreSheet.score4;
    delete scoreSheet.player5;
    delete scoreSheet.score5;
    delete scoreSheet.player6;
    delete scoreSheet.score6;
    delete scoreSheet.player7;
    delete scoreSheet.score7;
  };

  return Controller;
}();

var controller = new Controller();
/* harmony default export */ __webpack_exports__["default"] = (controller);

/***/ }),

/***/ "./src/SocketListenerDelegate.ts":
/*!***************************************!*\
  !*** ./src/SocketListenerDelegate.ts ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SocketListenerDelegate; });
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _notification_NotificationManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./notification/NotificationManager */ "./src/notification/NotificationManager.ts");
/* harmony import */ var _Controller__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Controller */ "./src/Controller.ts");
/* harmony import */ var _util_EqualityFunctions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./util/EqualityFunctions */ "./src/util/EqualityFunctions.ts");




var slLogger = debug__WEBPACK_IMPORTED_MODULE_0___default()('socket-listener');

var SocketListenerDelegate = /*#__PURE__*/function () {
  function SocketListenerDelegate(config) {
    this.config = config;
  }

  var _proto = SocketListenerDelegate.prototype;

  _proto.handleDataChangedByAnotherUser = function handleDataChangedByAnotherUser(message) {
    slLogger("Handling data change " + message.type + " on object type " + message.stateName + " made by user " + message.user);
    var changeUser = _Controller__WEBPACK_IMPORTED_MODULE_2__["default"].getStateManager().findItemInState(this.config.stateNames.users, {
      id: message.user
    }, _util_EqualityFunctions__WEBPACK_IMPORTED_MODULE_3__["isSame"]);
    var username = "unknown";

    if (changeUser) {
      username = changeUser.username;
    }

    slLogger("Handling data change " + message.type + " on object type " + message.stateName + " made by user " + username);
    var stateObj = message.data;
    slLogger(stateObj); // ok lets work out where this change belongs

    try {
      switch (message.type) {
        case "create":
          {
            switch (message.stateName) {
              case this.config.stateNames.comments:
                {
                  _Controller__WEBPACK_IMPORTED_MODULE_2__["default"].getStateManager().addNewItemToState(this.config.stateNames.comments, stateObj, true); // find the entry in question

                  var changedEntry = _Controller__WEBPACK_IMPORTED_MODULE_2__["default"].getStateManager().findItemInState(this.config.stateNames.entries, {
                    id: stateObj.commentOn
                  }, _util_EqualityFunctions__WEBPACK_IMPORTED_MODULE_3__["isSame"]);

                  if (changedEntry) {
                    _notification_NotificationManager__WEBPACK_IMPORTED_MODULE_1__["default"].show(changedEntry.title, username + " added comment " + stateObj.content);
                  }

                  break;
                }

              case this.config.stateNames.entries:
                {
                  _Controller__WEBPACK_IMPORTED_MODULE_2__["default"].getStateManager().addNewItemToState(this.config.stateNames.entries, stateObj, true);
                  _notification_NotificationManager__WEBPACK_IMPORTED_MODULE_1__["default"].show(stateObj.title, username + " added new entry");
                  break;
                }

              case this.config.stateNames.users:
                {
                  _Controller__WEBPACK_IMPORTED_MODULE_2__["default"].getStateManager().addNewItemToState(this.config.stateNames.users, stateObj, true);
                  _notification_NotificationManager__WEBPACK_IMPORTED_MODULE_1__["default"].show(stateObj.username, stateObj.username + " has just registered.", 'message');
                  break;
                }
            }

            break;
          }

        case "update":
          {
            switch (message.stateName) {
              case this.config.stateNames.entries:
                {
                  _Controller__WEBPACK_IMPORTED_MODULE_2__["default"].getStateManager().updateItemInState(this.config.stateNames.entries, stateObj, _util_EqualityFunctions__WEBPACK_IMPORTED_MODULE_3__["isSame"], true); // the entry could be selected by this (different user) but that would only be for comments, which is not what changed, so we are done

                  break;
                }
            }

            break;
          }

        case "delete":
          {
            switch (message.stateName) {
              case this.config.stateNames.comments:
                {
                  _Controller__WEBPACK_IMPORTED_MODULE_2__["default"].getStateManager().removeItemFromState(this.config.stateNames.comments, stateObj, _util_EqualityFunctions__WEBPACK_IMPORTED_MODULE_3__["isSame"], true);
                  break;
                }

              case this.config.stateNames.entries:
                {
                  var deletedEntry = _Controller__WEBPACK_IMPORTED_MODULE_2__["default"].getStateManager().findItemInState(this.config.stateNames.entries, stateObj, _util_EqualityFunctions__WEBPACK_IMPORTED_MODULE_3__["isSame"]);
                  _Controller__WEBPACK_IMPORTED_MODULE_2__["default"].getStateManager().removeItemFromState(this.config.stateNames.entries, stateObj, _util_EqualityFunctions__WEBPACK_IMPORTED_MODULE_3__["isSame"], true);
                  _notification_NotificationManager__WEBPACK_IMPORTED_MODULE_1__["default"].show(deletedEntry.title, username + " has deleted this entry.", 'priority');
                  break;
                }
            }

            break;
          }
      }
    } catch (err) {
      slLogger(err);
    }
  };

  _proto.handleMessage = function handleMessage(message) {
    slLogger("Received message: " + message);
  };

  _proto.getCurrentUser = function getCurrentUser() {
    return _Controller__WEBPACK_IMPORTED_MODULE_2__["default"].getLoggedInUserId();
  };

  return SocketListenerDelegate;
}();



/***/ }),

/***/ "./src/component/AbstractView.ts":
/*!***************************************!*\
  !*** ./src/component/AbstractView.ts ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AbstractView; });
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/BrowserUtil */ "./src/util/BrowserUtil.ts");


var avLogger = debug__WEBPACK_IMPORTED_MODULE_0___default()('view-ts');

var AbstractView = /*#__PURE__*/function () {
  function AbstractView(applicationView, htmlDocument, uiConfig, uiPrefs, stateManager) {
    this.applicationView = applicationView;
    this.document = document;
    this.uiConfig = uiConfig;
    this.uiPrefs = uiPrefs;
    this.config = applicationView.state;
    this.stateManager = stateManager; // state change listening

    this.stateChanged = this.stateChanged.bind(this); // event handlers

    this.eventStartDrag = this.eventStartDrag.bind(this);
    this.eventClickItem = this.eventClickItem.bind(this);
    this.eventDeleteClickItem = this.eventDeleteClickItem.bind(this);
    this.eventAction2Clicked = this.eventAction2Clicked.bind(this);
    this.eventAction1Clicked = this.eventAction1Clicked.bind(this);
  }

  var _proto = AbstractView.prototype;

  _proto.stateChanged = function stateChanged(managerName, name, newValue) {
    this.updateView(name, newValue);
  };

  _proto.stateChangedItemAdded = function stateChangedItemAdded(managerName, name, itemAdded) {
    this.updateView(name, this.stateManager.getStateByName(name));
  };

  _proto.stateChangedItemRemoved = function stateChangedItemRemoved(managerName, name, itemRemoved) {
    this.updateView(name, this.stateManager.getStateByName(name));
  };

  _proto.stateChangedItemUpdated = function stateChangedItemUpdated(managerName, name, itemUpdated, itemNewValue) {
    this.updateView(name, this.stateManager.getStateByName(name));
  }
  /* abstract */
  ;

  _proto.eventAction1Clicked = function eventAction1Clicked(event) {
    event.preventDefault();
    event.stopPropagation();
  };

  _proto.eventAction2Clicked = function eventAction2Clicked(event) {
    event.preventDefault();
    event.stopPropagation();
  };

  _proto.eventStartDrag = function eventStartDrag(event) {
    avLogger('Abstract View : drag start', 10);
    var data = JSON.stringify(this.getDragData(event));
    avLogger(data, 10); // @ts-ignore

    event.dataTransfer.setData(this.applicationView.state.ui.draggable.draggableDataKeyId, data);
  };

  _proto.createResultForItem = function createResultForItem(name, item, dataSource) {
    var _this = this;

    if (dataSource === void 0) {
      dataSource = null;
    }

    avLogger('Abstract View : creating Result');
    avLogger(item);
    var domConfig = this.uiConfig.dom;
    var resultDataKeyId = this.getIdForStateItem(name, item);
    var legacyDataKeyId = this.getLegacyIdForStateItem(name, item);

    if (!dataSource) {
      dataSource = domConfig.resultDataSourceValue;
    }

    var childEl = this.document.createElement(domConfig.resultsElementType);
    _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_1__["default"].addRemoveClasses(childEl, domConfig.resultsClasses);
    _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_1__["default"].addAttributes(childEl, domConfig.resultsElementAttributes); // the content may be structured

    var textEl = childEl;

    if (domConfig.resultContentDivClasses) {
      var contentEl = this.document.createElement('div');
      _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_1__["default"].addRemoveClasses(contentEl, domConfig.resultContentDivClasses);
      contentEl.setAttribute(domConfig.resultDataKeyId, resultDataKeyId);
      contentEl.setAttribute(domConfig.resultLegacyDataKeyId, legacyDataKeyId);
      contentEl.setAttribute(domConfig.resultDataSourceId, dataSource);
      textEl = this.document.createElement(domConfig.resultContentTextElementType);
      _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_1__["default"].addRemoveClasses(textEl, domConfig.resultContentTextClasses);
      textEl.setAttribute(domConfig.resultDataKeyId, resultDataKeyId);
      textEl.setAttribute(domConfig.resultLegacyDataKeyId, legacyDataKeyId);
      textEl.setAttribute(domConfig.resultDataSourceId, dataSource);
      contentEl.appendChild(textEl);

      if (domConfig.hasBackgroundImage) {
        var imgEl = this.document.createElement(domConfig.imgElementType);
        _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_1__["default"].addRemoveClasses(imgEl, domConfig.imgClasses);
        imgEl.setAttribute('src', this.getBackgroundImage(name, item));
        childEl.appendChild(imgEl);
      }

      var buttonBadgeEl = this.document.createElement('div');
      contentEl.appendChild(buttonBadgeEl);

      if (domConfig.hasBadge) {
        var badgeValue = this.getBadgeValue(name, item);

        if (badgeValue > 0) {
          var badgeEl = this.document.createElement(domConfig.badgeElementType);
          _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_1__["default"].addRemoveClasses(badgeEl, domConfig.badgeClasses);
          badgeEl.setAttribute(domConfig.resultDataKeyId, resultDataKeyId);
          badgeEl.setAttribute(domConfig.resultLegacyDataKeyId, legacyDataKeyId);
          badgeEl.setAttribute(domConfig.resultDataSourceId, dataSource);
          buttonBadgeEl.appendChild(badgeEl);
          badgeEl.innerHTML = "&nbsp;&nbsp;&nbsp;" + badgeValue + "&nbsp;&nbsp;&nbsp;";
          _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_1__["default"].addAttributes(badgeEl, domConfig.badgeElementAttributes);
        }
      }

      if (domConfig.extraAction1Classes) {
        var action = this.document.createElement('button');
        action.setAttribute('type', 'button');
        _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_1__["default"].addRemoveClasses(action, domConfig.extraAction1Classes);

        if (domConfig.extraAction1Text) {
          if (domConfig.extraAction1Text.trim().length > 0) {
            action.innerHTML = domConfig.extraAction1Text;
          }
        }

        if (domConfig.extraAction1IconClasses) {
          var iconEl = document.createElement('i');
          _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_1__["default"].addRemoveClasses(iconEl, domConfig.extraAction1IconClasses);
          iconEl.setAttribute(domConfig.resultDataKeyId, resultDataKeyId);
          iconEl.setAttribute(domConfig.resultLegacyDataKeyId, legacyDataKeyId);
          iconEl.setAttribute(domConfig.resultDataSourceId, dataSource);
          action.appendChild(iconEl);
        }

        action.setAttribute(domConfig.resultDataKeyId, resultDataKeyId);
        action.setAttribute(domConfig.resultLegacyDataKeyId, legacyDataKeyId);
        action.setAttribute(domConfig.resultDataSourceId, dataSource);
        action.addEventListener('click', function (event) {
          event.preventDefault();
          event.stopPropagation();

          _this.eventAction1Clicked(event);
        });
        buttonBadgeEl.appendChild(action);
      }

      if (domConfig.extraAction2Classes) {
        var _action = this.document.createElement('button');

        _action.setAttribute('type', 'button');

        _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_1__["default"].addRemoveClasses(_action, domConfig.extraAction2Classes);

        if (domConfig.extraAction2Text) {
          if (domConfig.extraAction2Text.trim().length > 0) {
            _action.innerHTML = domConfig.extraAction1Text;
          }
        }

        if (domConfig.extraAction2IconClasses) {
          var _iconEl = document.createElement('i');

          _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_1__["default"].addRemoveClasses(_iconEl, domConfig.extraAction2IconClasses);

          _iconEl.setAttribute(domConfig.resultDataKeyId, resultDataKeyId);

          _iconEl.setAttribute(domConfig.resultLegacyDataKeyId, legacyDataKeyId);

          _iconEl.setAttribute(domConfig.resultDataSourceId, dataSource);

          _action.appendChild(_iconEl);
        }

        _action.setAttribute(domConfig.resultDataKeyId, resultDataKeyId);

        _action.setAttribute(domConfig.resultLegacyDataKeyId, legacyDataKeyId);

        _action.setAttribute(domConfig.resultDataSourceId, dataSource);

        _action.addEventListener('click', function (event) {
          event.preventDefault();
          event.stopPropagation();

          _this.eventAction2Clicked(event);
        });

        buttonBadgeEl.appendChild(_action);
      }

      if (domConfig.isDeleteable) {
        var deleteButtonEl = this.document.createElement('button');
        deleteButtonEl.setAttribute('type', 'button');
        _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_1__["default"].addRemoveClasses(deleteButtonEl, domConfig.deleteButtonClasses);

        if (domConfig.deleteButtonText) {
          if (domConfig.deleteButtonText.trim().length > 0) {
            deleteButtonEl.innerHTML = domConfig.deleteButtonText;
          }
        }

        if (domConfig.deleteButtonIconClasses) {
          var _iconEl2 = document.createElement('i');

          _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_1__["default"].addRemoveClasses(_iconEl2, domConfig.deleteButtonIconClasses);

          _iconEl2.setAttribute(domConfig.resultDataKeyId, resultDataKeyId);

          _iconEl2.setAttribute(domConfig.resultLegacyDataKeyId, legacyDataKeyId);

          _iconEl2.setAttribute(domConfig.resultDataSourceId, dataSource);

          deleteButtonEl.appendChild(_iconEl2);
        }

        deleteButtonEl.setAttribute(domConfig.resultDataKeyId, resultDataKeyId);
        deleteButtonEl.setAttribute(domConfig.resultLegacyDataKeyId, legacyDataKeyId);
        deleteButtonEl.setAttribute(domConfig.resultDataSourceId, dataSource);
        deleteButtonEl.addEventListener('click', function (event) {
          event.preventDefault();
          event.stopPropagation();

          _this.eventDeleteClickItem(event);
        });
        buttonBadgeEl.appendChild(deleteButtonEl);
      }

      childEl.appendChild(contentEl);
    } // add the key ids for selection


    childEl.setAttribute(domConfig.resultDataKeyId, resultDataKeyId);
    childEl.setAttribute(domConfig.resultLegacyDataKeyId, legacyDataKeyId);
    childEl.setAttribute(domConfig.resultDataSourceId, dataSource);
    var displayText = this.getDisplayValueForStateItem(name, item); // add modifiers for patient state

    var modifier = this.getModifierForStateItem(name, item);
    var secondModifier = this.getSecondaryModifierForStateItem(name, item);

    switch (modifier) {
      case 'normal':
        {
          avLogger('Abstract View: normal item');
          _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_1__["default"].addRemoveClasses(childEl, domConfig.modifierClassNormal);

          if (domConfig.iconNormal !== '') {
            textEl.innerHTML = displayText + '  ' + domConfig.iconNormal;
          } else {
            textEl.innerText = displayText;
          }

          switch (secondModifier) {
            case 'warning':
              {
                _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_1__["default"].addRemoveClasses(childEl, domConfig.modifierClassNormal, false);
                _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_1__["default"].addRemoveClasses(childEl, domConfig.modifierClassWarning, true);

                if (domConfig.iconWarning !== '') {
                  textEl.innerHTML += '  ' + domConfig.iconWarning;
                }

                break;
              }

            case 'normal':
              {
                break;
              }

            case 'active':
              {
                if (domConfig.iconActive !== '') {
                  textEl.innerHTML += '  ' + domConfig.iconActive;
                }
              }
          }

          break;
        }

      case 'active':
        {
          avLogger('Abstract View: active item', 10);
          _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_1__["default"].addRemoveClasses(childEl, domConfig.modifierClassActive);

          if (domConfig.iconActive !== '') {
            textEl.innerHTML = displayText + '  ' + domConfig.iconActive;
          } else {
            textEl.innerText = displayText;
          }

          switch (secondModifier) {
            case 'warning':
              {
                _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_1__["default"].addRemoveClasses(childEl, domConfig.modifierClassActive, false);
                _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_1__["default"].addRemoveClasses(childEl, domConfig.modifierClassWarning, true);

                if (domConfig.iconWarning !== '') {
                  textEl.innerHTML += '  ' + domConfig.iconWarning;
                }

                break;
              }

            case 'normal':
              {
                break;
              }
          }

          break;
        }

      case 'inactive':
        {
          avLogger('Abstract View: inactive item', 10);
          _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_1__["default"].addRemoveClasses(childEl, domConfig.modifierClassInactive);

          if (domConfig.iconInactive !== '') {
            textEl.innerHTML = displayText + '  ' + domConfig.iconInactive;
          } else {
            textEl.innerText = displayText;
          }

          switch (secondModifier) {
            case 'warning':
              {
                if (domConfig.iconWarning !== '') {
                  _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_1__["default"].addRemoveClasses(childEl, domConfig.modifierClassInactive, false);
                  _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_1__["default"].addRemoveClasses(childEl, domConfig.modifierClassWarning, true);
                  textEl.innerHTML += '  ' + domConfig.iconWarning;
                }

                break;
              }

            case 'normal':
              {
                break;
              }

            case 'active':
              {
                if (domConfig.iconActive !== '') {
                  textEl.innerHTML += '  ' + domConfig.iconActive;
                }

                break;
              }
          }

          break;
        }
    }

    return childEl;
  };

  _proto.createResultsForState = function createResultsForState(name, newState) {
    var _this2 = this;

    avLogger('Abstract View : creating Results', 10);
    avLogger(newState);
    var domConfig = this.uiConfig.dom; // remove the previous items from list

    var viewEl = document.getElementById(domConfig.resultsId);
    if (viewEl) _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_1__["default"].removeAllChildren(viewEl); // add the new children

    newState.map(function (item, index) {
      var childEl = _this2.createResultForItem(name, item); // add draggable actions


      if (domConfig.isDraggable) {
        childEl.setAttribute('draggable', 'true');
        childEl.addEventListener('dragstart', _this2.eventStartDrag);
      } // add selection actions


      if (domConfig.isClickable) {
        childEl.addEventListener('click', _this2.eventClickItem);
      }

      avLogger("Abstract View: Adding child " + item.id);
      if (viewEl) viewEl.appendChild(childEl);
    });
  };

  return AbstractView;
}();



/***/ }),

/***/ "./src/component/BoardGameSearchSidebarView.ts":
/*!*****************************************************!*\
  !*** ./src/component/BoardGameSearchSidebarView.ts ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _SidebarView__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SidebarView */ "./src/component/SidebarView.ts");
/* harmony import */ var _util_EqualityFunctions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/EqualityFunctions */ "./src/util/EqualityFunctions.ts");
/* harmony import */ var _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util/BrowserUtil */ "./src/util/BrowserUtil.ts");
/* harmony import */ var _network_DownloadManager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../network/DownloadManager */ "./src/network/DownloadManager.ts");
/* harmony import */ var _state_MemoryBufferStateManager__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../state/MemoryBufferStateManager */ "./src/state/MemoryBufferStateManager.ts");
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;

  _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}







var vLogger = debug__WEBPACK_IMPORTED_MODULE_0___default()('board-game-search-sidebar');
var vLoggerDetail = debug__WEBPACK_IMPORTED_MODULE_0___default()('board-game-search-sidebar:detail');

var BoardGameSearchSidebarView = /*#__PURE__*/function (_SidebarView) {
  _inheritsLoose(BoardGameSearchSidebarView, _SidebarView); // @ts-ignore
  // @ts-ignore
  // @ts-ignore


  function BoardGameSearchSidebarView(applicationView, htmlDocument, stateManager) {
    var _this;

    _this = _SidebarView.call(this, applicationView, htmlDocument, applicationView.state.ui.boardGameSearchSideBar, applicationView.state.uiPrefs.boardGameSearchSideBar, stateManager) || this;
    _this.config = applicationView.state; // handler binding

    _this.updateView = _this.updateView.bind(_assertThisInitialized(_this));
    _this.eventClickItem = _this.eventClickItem.bind(_assertThisInitialized(_this));
    _this.handleSearch = _this.handleSearch.bind(_assertThisInitialized(_this));
    _this.handleSearchResultsCB = _this.handleSearchResultsCB.bind(_assertThisInitialized(_this)); // register state change listening

    _this.localisedSM = new _state_MemoryBufferStateManager__WEBPACK_IMPORTED_MODULE_5__["default"]();

    _this.localisedSM.addChangeListenerForName(_this.config.stateNames.bggSearchResults, _assertThisInitialized(_this));

    vLogger(_this.localisedSM.getStateByName(_this.config.stateNames.bggSearchResults));
    return _this;
  }

  var _proto = BoardGameSearchSidebarView.prototype;

  _proto.handleSearchResultsCB = function handleSearchResultsCB(data, status, associatedStateName) {
    this.changeSearchButton(true);
    vLogger("callback for bgg search " + associatedStateName + " with status " + status + " - ");

    if (status >= 200 && status <= 299) {
      // do we have any data?
      vLoggerDetail(data);
      vLoggerDetail(data.data.findBoardGames);
      this.localisedSM.setStateByName(this.config.stateNames.bggSearchResults, data.data.findBoardGames, true);
    }
  };

  _proto.onDocumentLoaded = function onDocumentLoaded() {
    _SidebarView.prototype.onDocumentLoaded.call(this); // get a link to the search button and search field and form
    // @ts-ignore


    this.formEl = this.document.getElementById(this.uiConfig.dom.formId); // @ts-ignore

    this.buttonEl = this.document.getElementById(this.uiConfig.dom.buttonId); // @ts-ignore

    this.queryEl = this.document.getElementById(this.uiConfig.dom.queryId);
    this.formEl.addEventListener('submit', this.handleSearch);
  };

  _proto.getIdForStateItem = function getIdForStateItem(name, item) {
    return item.gameId;
  };

  _proto.getLegacyIdForStateItem = function getLegacyIdForStateItem(name, item) {
    return item.gameId;
  };

  _proto.getDisplayValueForStateItem = function getDisplayValueForStateItem(name, item) {
    return item.name + " (" + item.year + ")     ";
  };

  _proto.getModifierForStateItem = function getModifierForStateItem(name, item) {
    return 'normal';
  };

  _proto.getSecondaryModifierForStateItem = function getSecondaryModifierForStateItem(name, item) {
    return 'normal';
  };

  _proto.eventClickItem = function eventClickItem(event) {
    event.preventDefault();
    event.stopPropagation();
    console.log(event.target); // @ts-ignore

    var boardGameId = event.target.getAttribute(this.uiConfig.dom.resultDataKeyId); // @ts-ignore

    var dataSource = event.target.getAttribute(this.uiConfig.dom.resultDataSourceId); // @ts-ignore

    vLoggerDetail("Board Game " + event.target + " with id " + boardGameId + " clicked from " + dataSource);
    var boardGame = this.localisedSM.findItemInState(this.config.stateNames.bggSearchResults, {
      gameId: parseInt(boardGameId)
    }, _util_EqualityFunctions__WEBPACK_IMPORTED_MODULE_2__["isSameGame"]);

    if (boardGame) {
      this.applicationView.addBoardGameToDisplay(boardGame);
    }

    this.eventHide(null);
  };

  _proto.updateView = function updateView(name, newState) {
    if (name === this.config.stateNames.bggSearchResults) {
      vLogger("Updating for recent searches");
      newState = this.localisedSM.getStateByName(this.config.stateNames.bggSearchResults);
      vLogger(newState);
      this.createResultsForState(name, newState);
    }
  };

  _proto.getDragData = function getDragData(event) {
    // use the actual id to pass the user to the droppable target
    // @ts-ignore
    var boardGameId = event.target.getAttribute(this.uiConfig.dom.resultDataKeyId); // @ts-ignore

    vLoggerDetail("Board Game " + event.target.innerText + " with id " + boardGameId + " dragging");
    var boardGame = this.localisedSM.findItemInState(this.config.stateNames.bggSearchResults, {
      gameId: parseInt(boardGameId)
    }, _util_EqualityFunctions__WEBPACK_IMPORTED_MODULE_2__["isSameGame"]);
    vLoggerDetail(boardGame);
    boardGame[this.config.ui.draggable.draggedType] = this.config.ui.draggable.draggedTypeBoardGame;
    boardGame[this.config.ui.draggable.draggedFrom] = this.config.ui.draggable.draggedFromBoardGameSearch;
    return boardGame;
  };

  _proto.eventDeleteClickItem = function eventDeleteClickItem(event) {
    // @ts-ignore
    var boardGameId = event.target.getAttribute(this.uiConfig.dom.resultDataKeyId); // @ts-ignore

    var dataSource = event.target.getAttribute(this.uiConfig.dom.resultDataSourceId); // @ts-ignore

    vLoggerDetail("Board Game " + event.target + " with id " + boardGameId + " delete clicked from " + dataSource);
    var boardGame = this.localisedSM.findItemInState(this.config.stateNames.bggSearchResults, {
      id: parseInt(boardGameId)
    }, _util_EqualityFunctions__WEBPACK_IMPORTED_MODULE_2__["isSameGame"]);
    vLogger(boardGameId);

    if (boardGame) {
      this.localisedSM.removeItemFromState(this.config.stateNames.bggSearchResults, boardGame, _util_EqualityFunctions__WEBPACK_IMPORTED_MODULE_2__["isSameGame"], true);
    }
  };

  _proto.getBadgeValue = function getBadgeValue(name, item) {
    return 0;
  };

  _proto.getBackgroundImage = function getBackgroundImage(name, item) {
    return "";
  };

  _proto.changeSearchButton = function changeSearchButton(enable) {
    if (enable === void 0) {
      enable = false;
    }

    _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_3__["default"].removeAllChildren(this.buttonEl);

    if (enable) {
      if (this.buttonEl) this.buttonEl.removeAttribute("disabled");
      if (this.buttonEl) this.buttonEl.innerHTML = 'Search';
    } else {
      if (this.buttonEl) this.buttonEl.setAttribute("disabled", "true");
      if (this.buttonEl) this.buttonEl.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>  Loading...';
    }
  };

  _proto.handleSearch = function handleSearch(event) {
    vLogger("Handling search");
    event.preventDefault();
    event.stopPropagation(); // do we have anything to search for?

    var queryText = this.queryEl.value.trim();
    if (queryText.length == 0) return; // ok, have a search term, lets start a search

    this.changeSearchButton(false); // get the query string from state obj

    var query = this.config.apis.bggSearchCall;
    _network_DownloadManager__WEBPACK_IMPORTED_MODULE_4__["default"].addQLApiRequest(this.config.apis.graphQL, query, {
      queryString: queryText
    }, this.handleSearchResultsCB, this.config.stateNames.bggSearchResults);
  };

  return BoardGameSearchSidebarView;
}(_SidebarView__WEBPACK_IMPORTED_MODULE_1__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (BoardGameSearchSidebarView);

/***/ }),

/***/ "./src/component/BoardGameView.tsx":
/*!*****************************************!*\
  !*** ./src/component/BoardGameView.tsx ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BoardGameView; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Controller__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Controller */ "./src/Controller.ts");
/* harmony import */ var _AppTypes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../AppTypes */ "./src/AppTypes.ts");




var beLogger = debug__WEBPACK_IMPORTED_MODULE_1___default()('view-ts:boardgameview'); // @ts-ignore

function BoardGameView(_ref) {
  var boardGame = _ref.boardGame,
      showScoresHandler = _ref.showScoresHandler,
      addToCollectionHandler = _ref.addToCollectionHandler,
      removeFromCollectionHandler = _ref.removeFromCollectionHandler,
      startScoreSheetHandler = _ref.startScoreSheetHandler;

  if (boardGame) {
    beLogger("Board Game " + boardGame.gameId);
    var addButton = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
      type: "button",
      className: "btn-primary btn-sm rounded p-1 mt-1 w-100",
      "board-game-id": boardGame.gameId,
      onClick: addToCollectionHandler
    }, "\xA0\xA0Add to ", !_Controller__WEBPACK_IMPORTED_MODULE_2__["default"].isLoggedIn() ? 'Browser' : '', " Collection \xA0", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: "fas fa-star"
    }), "\xA0\xA0"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
      type: "button",
      className: "btn-primary btn-sm rounded p-1 mt-1 w-100",
      "board-game-id": boardGame.gameId,
      onClick: removeFromCollectionHandler
    }, "\xA0\xA0Remove from Display\xA0", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: "fas fa-trash-alt"
    })));
    var deleteButton = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
      type: "button",
      className: "btn-warning btn-sm rounded p-1 mt-1 w-100",
      "board-game-id": boardGame.gameId,
      onClick: removeFromCollectionHandler
    }, "\xA0\xA0Remove from ", !_Controller__WEBPACK_IMPORTED_MODULE_2__["default"].isLoggedIn() ? 'Browser' : '', " Collection \xA0", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: "far fa-star"
    }), "\xA0\xA0");
    var startScoreSheetButton = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
      type: "button",
      className: "btn-secondary btn-sm rounded p-1 mr-2 mt-2 w-100",
      "board-game-id": boardGame.gameId,
      onClick: startScoreSheetHandler
    }, "\xA0\xA0Start Score Sheet \xA0", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: "fas fa-list-alt"
    }), "\xA0\xA0"); // do we have any scores?

    var scoreCount = 0;

    if (boardGame.scoresheets) {
      scoreCount = boardGame.scoresheets.length;
    } //        let overlay = <div className="card-img-overlay">


    var favouriteIcon = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: "fas fa-star text-black"
    });
    var scoreBadge = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      "board-game-id": boardGame.gameId,
      className: "badge badge-pill badge-info ml-1",
      onClick: showScoresHandler
    }, "Scores: ", scoreCount);

    if (boardGame.decorator && boardGame.decorator !== _AppTypes__WEBPACK_IMPORTED_MODULE_3__["Decorator"].Incomplete) {
      var bggURL = "https://boardgamegeek.com/boardgame/" + boardGame.gameId;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-sm-12 col-md-6 col-lg-4 col-xl-3 p-2"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "card"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: bggURL,
        target: "_blank"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
        className: "card-img-top",
        src: boardGame.image,
        alt: "Card image cap"
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "card-body scroll"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h5", {
        className: "card-title"
      }, boardGame.name, " (", boardGame.year, ") ", boardGame.decorator === _AppTypes__WEBPACK_IMPORTED_MODULE_3__["Decorator"].Persisted || boardGame.decorator === _AppTypes__WEBPACK_IMPORTED_MODULE_3__["Decorator"].PersistedLocally ? favouriteIcon : '', " ", boardGame.decorator === _AppTypes__WEBPACK_IMPORTED_MODULE_3__["Decorator"].Persisted || boardGame.decorator === _AppTypes__WEBPACK_IMPORTED_MODULE_3__["Decorator"].PersistedLocally ? scoreBadge : '', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), " ", _Controller__WEBPACK_IMPORTED_MODULE_2__["default"].isLoggedIn() ? boardGame.decorator === _AppTypes__WEBPACK_IMPORTED_MODULE_3__["Decorator"].Persisted ? deleteButton : addButton : deleteButton), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
        className: "card-text"
      }, boardGame.description), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
        className: "card-text"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("small", {
        className: "text-muted"
      }, "Play Time: ", boardGame.minPlayTime, " - ", boardGame.maxPlayTime, " min", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "Players: ", boardGame.minPlayers, " - ", boardGame.maxPlayers, " Min Age:", boardGame.minAge, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "Categories: ", boardGame.categories))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "card-footer text-right text-muted"
      }, "Rank: ", boardGame.rank, " Score: ", boardGame.averageScore, " from ", boardGame.numOfRaters, " raters", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), startScoreSheetButton)));
    } else {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-sm-12 col-md-6 col-lg-4 col-xl-3 p-2"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "card"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
        className: "card-img-top",
        src: "/img/spinner.gif",
        alt: "Card image cap"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "card-body"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h5", {
        className: "card-title"
      }, boardGame.name, " (", boardGame.year, ") "), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
        className: "card-text"
      }, "Loading..."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
        className: "card-text"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("small", {
        className: "text-muted"
      }, "Loading..."))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "card-footer text-right text-muted"
      }, "Loading...")));
    }
  } else {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "col-sm-12 col-md-6 col-lg-4 col-xl-3 p-2"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "card"
    }));
  }
}

/***/ }),

/***/ "./src/component/CallManager.ts":
/*!**************************************!*\
  !*** ./src/component/CallManager.ts ***!
  \**************************************/
/*! exports provided: CallManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CallManager", function() { return CallManager; });
/* harmony import */ var _Controller__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Controller */ "./src/Controller.ts");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/BrowserUtil */ "./src/util/BrowserUtil.ts");



var callLogger = debug__WEBPACK_IMPORTED_MODULE_1___default()('call-manager');
var CallManager = /*#__PURE__*/function () {
  CallManager.getInstance = function getInstance() {
    if (!CallManager._instance) {
      CallManager._instance = new CallManager();
    }

    return CallManager._instance;
  };

  function CallManager() {
    this.peer = null;
    this.webrtcDiv = null;
    this.myVideoStream = null;
    this.myVideo = null;
    this.callUser = this.callUser.bind(this);
    this.currentUserList = [];
  }

  var _proto = CallManager.prototype;

  _proto.startPeerConnection = function startPeerConnection() {
    if (_Controller__WEBPACK_IMPORTED_MODULE_0__["default"].isLoggedIn()) {
      // @ts-ignore  - is for the WebRTC peer via Nodejs
      this.peer = new Peer(_Controller__WEBPACK_IMPORTED_MODULE_0__["default"].getLoggedInUsername(), {
        path: '/peerjs',
        host: '/',
        debug: 2,
        secure: true
      }); //this.peer = new Peer(controller.getLoggedInUsername(), {path: '/peerjs', host: '/', port: '3000', debug:1, secure:false});

      this.peer.on('open', function (id) {
        callLogger('My peer ID is: ' + id);
      });
    }
  };

  _proto.initialise = function initialise(applicationView) {
    this.startPeerConnection(); // @ts-ignore

    this.webrtcDiv = document.getElementById(applicationView.state.ui.scoreSheet.dom.webrtc); //this.reset();
  };

  _proto.startScoreSheet = function startScoreSheet() {
    var _this = this;

    try {
      if (_Controller__WEBPACK_IMPORTED_MODULE_0__["default"].isLoggedIn()) {
        if (navigator.mediaDevices.getUserMedia) {
          callLogger('Starting scoresheet stream');
          navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true
          }).then(function (stream) {
            callLogger('Scoresheet stream started - adding video element');
            _this.myVideoStream = stream;

            _this.addVideoStream(_Controller__WEBPACK_IMPORTED_MODULE_0__["default"].getLoggedInUsername(), _this.myVideoStream, true);
          });
        }
      }
    } catch (err) {
      callLogger(err);
      callLogger("Non-secure context or no camera capability");
    }
  };

  _proto.reset = function reset() {
    var _this2 = this;

    callLogger('Reset');

    if (this.currentUserList && this.currentUserList.length > 0) {
      callLogger('Removing previous users');
      this.currentUserList.forEach(function (user) {
        callLogger('Removing previous user ${user}');

        _this2.removeUser(user);
      });
    }

    if (this.webrtcDiv) _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_2__["default"].removeAllChildren(this.webrtcDiv);
    this.currentUserList = [];

    if (this.peer) {
      callLogger('Stopping video stream'); //this.peer.disconnect();

      if (this.myVideoStream) {
        this.myVideoStream.getTracks().forEach(function (track) {
          return track.stop();
        });
      }

      if (this.myVideo) this.myVideo.srcObject = null;
      this.myVideoStream = null;
    }
  };

  _proto.addVideoStream = function addVideoStream(username, stream, isCurrentUser) {
    var _this3 = this;

    if (isCurrentUser === void 0) {
      isCurrentUser = false;
    } // check to see if they are already there


    var index = this.currentUserList.findIndex(function (user) {
      return user === username;
    });
    if (index >= 0) return;
    this.currentUserList.push(username);
    var videoCardHolder = document.createElement('div');
    videoCardHolder.setAttribute("id", username);
    _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_2__["default"].addRemoveClasses(videoCardHolder, 'col-sm-12 col-md-4 col-lg-2');
    var videoCard = document.createElement('div');
    _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_2__["default"].addRemoveClasses(videoCard, 'card');
    var videoCardTitle = document.createElement('div');
    _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_2__["default"].addRemoveClasses(videoCardTitle, 'card-header');
    videoCardTitle.innerHTML = "<h5 class=\"card-title\">" + username + "</h5>";
    var videoCardBody = document.createElement('div');
    _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_2__["default"].addRemoveClasses(videoCardBody, 'card-body p-0 text-center');
    var video = document.createElement('video');
    _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_2__["default"].addRemoveClasses(video, 'video ');
    videoCard.appendChild(videoCardTitle);
    videoCard.appendChild(videoCardBody);
    videoCardBody.appendChild(video);

    if (isCurrentUser) {
      var videoCardFooter = document.createElement('div');
      _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_2__["default"].addRemoveClasses(videoCardFooter, 'card-footer');
      var footerContent = document.createElement('div');
      _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_2__["default"].addRemoveClasses(footerContent, 'd-flex w-100 justify-content-between mt-2');
      var stopVideoButton = document.createElement('button');
      stopVideoButton.setAttribute('type', 'button');
      _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_2__["default"].addRemoveClasses(stopVideoButton, 'btn btn-circle btn-warning');
      stopVideoButton.innerHTML = '<i class="fas fa-video-slash"></i>';
      var muteMicButton = document.createElement('button');
      muteMicButton.setAttribute('type', 'button');
      _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_2__["default"].addRemoveClasses(muteMicButton, 'btn btn-circle btn-warning');
      muteMicButton.innerHTML = '<i class="fa fa-microphone"></i>';
      footerContent.appendChild(stopVideoButton);
      footerContent.appendChild(muteMicButton);
      videoCardFooter.appendChild(footerContent);
      videoCard.appendChild(videoCardFooter);
      stopVideoButton.addEventListener('click', function () {
        var isPaused = video.paused;

        if (isPaused) {
          video.play();
          _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_2__["default"].addRemoveClasses(stopVideoButton, 'btn-success', false);
          _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_2__["default"].addRemoveClasses(stopVideoButton, 'btn-warning', true);
        } else {
          video.pause();
          _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_2__["default"].addRemoveClasses(stopVideoButton, 'btn-success', true);
          _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_2__["default"].addRemoveClasses(stopVideoButton, 'btn-warning', false);
        }
      });
      muteMicButton.addEventListener('click', function () {
        var isMuted = video.muted;

        if (isMuted) {
          video.muted = false;
          _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_2__["default"].addRemoveClasses(muteMicButton, 'btn-success', false);
          _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_2__["default"].addRemoveClasses(muteMicButton, 'btn-warning', true);
        } else {
          video.muted = true;
          _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_2__["default"].addRemoveClasses(muteMicButton, 'btn-success', true);
          _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_2__["default"].addRemoveClasses(muteMicButton, 'btn-warning', false);
        }
      });
      this.myVideo = video;
    }

    videoCardHolder.appendChild(videoCard);
    video.srcObject = stream;
    video.addEventListener("loadedmetadata", function () {
      video.play();
      if (_this3.webrtcDiv) _this3.webrtcDiv.append(videoCardHolder);
    });
  };

  _proto.callUser = function callUser(userId) {
    var _this4 = this;

    callLogger("Asked to call user " + userId);
    if (userId === _Controller__WEBPACK_IMPORTED_MODULE_0__["default"].getLoggedInUsername()) return; // don't call ourself

    var numberOfAttempts = 0;
    var index = this.currentUserList.findIndex(function (user) {
      return user === userId;
    }); // don't call the same users

    if (index >= 0) return; // wait a small time for the sockets and peer to sync

    var interval = setInterval(function () {
      callLogger("Calling user " + userId);

      if (_this4.myVideoStream) {
        var call = _this4.peer.call(userId, _this4.myVideoStream);

        if (call) {
          call.on('stream', function (userVideoStream) {
            callLogger("User " + userId + " answered, showing stream");

            _this4.addVideoStream(userId, userVideoStream, false);
          });
          clearInterval(interval);
        } else {
          // try again shortly
          numberOfAttempts++;
          if (numberOfAttempts > 3) clearInterval(interval);
        }
      }
    }, 5000);
  };

  _proto.removeUser = function removeUser(userId) {
    callLogger("Asked to remove user " + userId);
    var index = this.currentUserList.findIndex(function (user) {
      return user === userId;
    });

    if (index >= 0) {
      this.currentUserList.splice(index, 1);
    }

    var userVideoCard = document.getElementById(userId);

    if (userVideoCard) {
      callLogger("Asked to remove user " + userId + " - removing video element");
      var videoEl = userVideoCard.querySelector(".video");

      if (videoEl) {
        videoEl.srcObject = null;
      }

      _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_2__["default"].removeAllChildren(userVideoCard);
      var parentNode = userVideoCard.parentNode;
      if (parentNode) parentNode.removeChild(userVideoCard);
    }
  };

  _proto.prepareToAnswerCallFrom = function prepareToAnswerCallFrom(userId) {
    var _this5 = this;

    try {
      if (_Controller__WEBPACK_IMPORTED_MODULE_0__["default"].isLoggedIn()) {
        callLogger("Preparing to answer call from " + userId);

        if (navigator.mediaDevices.getUserMedia) {
          navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true
          }).then(function (stream) {
            _this5.myVideoStream = stream;

            _this5.addVideoStream(_Controller__WEBPACK_IMPORTED_MODULE_0__["default"].getLoggedInUsername(), _this5.myVideoStream, true);

            callLogger("Awaiting call from " + userId);

            _this5.peer.on('call', function (call) {
              callLogger("Answering call from " + userId);
              call.answer(_this5.myVideoStream);
              call.on('stream', function (userVideoStream) {
                alert("Answered");
                callLogger("Have answered, showing stream");

                _this5.addVideoStream(userId, userVideoStream, false);
              });
            });
          });
        }
      }
    } catch (err) {
      callLogger(err);
      callLogger("Insecure context or no video capability");
    }
  };

  return CallManager;
}();

/***/ }),

/***/ "./src/component/ChatSidebarView.ts":
/*!******************************************!*\
  !*** ./src/component/ChatSidebarView.ts ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _SidebarView__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SidebarView */ "./src/component/SidebarView.ts");
/* harmony import */ var _socket_NotificationController__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../socket/NotificationController */ "./src/socket/NotificationController.ts");
/* harmony import */ var _socket_ChatManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../socket/ChatManager */ "./src/socket/ChatManager.ts");
/* harmony import */ var _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../util/BrowserUtil */ "./src/util/BrowserUtil.ts");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _socket_Types__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../socket/Types */ "./src/socket/Types.ts");
/* harmony import */ var _Controller__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../Controller */ "./src/Controller.ts");
/* harmony import */ var _notification_NotificationManager__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../notification/NotificationManager */ "./src/notification/NotificationManager.ts");
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;

  _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}










var csLogger = debug__WEBPACK_IMPORTED_MODULE_0___default()('chat-sidebar');
var csLoggerDetail = debug__WEBPACK_IMPORTED_MODULE_0___default()('chat-sidebar:detail');

var ChatSidebarView = /*#__PURE__*/function (_SidebarView) {
  _inheritsLoose(ChatSidebarView, _SidebarView); // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  // @ts-ignore


  function ChatSidebarView(applicationView, htmlDocument, stateManager) {
    var _this;

    _this = _SidebarView.call(this, applicationView, htmlDocument, applicationView.state.ui.chatSideBar, applicationView.state.uiPrefs.chatSideBar, stateManager) || this;
    _this.selectedChatLog = null;
    _this.config = applicationView.state; // handler binding

    _this.updateView = _this.updateView.bind(_assertThisInitialized(_this));
    _this.eventClickItem = _this.eventClickItem.bind(_assertThisInitialized(_this));
    _this.handleAddMessage = _this.handleAddMessage.bind(_assertThisInitialized(_this));
    _this.handleChatLogsUpdated = _this.handleChatLogsUpdated.bind(_assertThisInitialized(_this));
    _this.handleChatLogUpdated = _this.handleChatLogUpdated.bind(_assertThisInitialized(_this));
    _this.handleChatStarted = _this.handleChatStarted.bind(_assertThisInitialized(_this));
    _this.handleUserDrop = _this.handleUserDrop.bind(_assertThisInitialized(_this));
    _this.leaveChat = _this.leaveChat.bind(_assertThisInitialized(_this));
    _this.eventUserSelected = _this.eventUserSelected.bind(_assertThisInitialized(_this));
    _this.eventHide = _this.eventHide.bind(_assertThisInitialized(_this));
    _socket_NotificationController__WEBPACK_IMPORTED_MODULE_2__["NotificationController"].getInstance().addListener(_assertThisInitialized(_this));
    stateManager.addChangeListenerForName(_this.config.stateNames.users, _assertThisInitialized(_this));
    return _this;
  }

  var _proto = ChatSidebarView.prototype;

  _proto.handleNewInviteReceived = function handleNewInviteReceived(invite) {
    throw new Error('Method not implemented.');
  };

  _proto.handleUserDrop = function handleUserDrop(event) {
    csLogger('drop event on current chat room');

    if (this.selectedChatLog) {
      // @ts-ignore
      var draggedObjectJSON = event.dataTransfer.getData(this.config.ui.draggable.draggableDataKeyId);
      var draggedObject = JSON.parse(draggedObjectJSON);
      csLogger(draggedObject);

      if (draggedObject[this.config.ui.draggable.draggedType] === this.config.ui.draggable.draggedTypeUser) {
        //add the user to the current chat if not already there
        _socket_ChatManager__WEBPACK_IMPORTED_MODULE_3__["ChatManager"].getInstance().sendInvite(draggedObject.username, this.selectedChatLog.roomName);
        _notification_NotificationManager__WEBPACK_IMPORTED_MODULE_8__["default"].show('Chat', "Invited " + draggedObject.username + " to the chat.");
      }
    }
  };

  _proto.handleChatLogUpdated = function handleChatLogUpdated(log) {
    csLogger("Handling chat log updates");
    this.checkCanComment();
    this.renderChatLog(log);
    this.updateView('', {});
  };

  _proto.handleAddMessage = function handleAddMessage(event) {
    event.preventDefault();
    event.stopPropagation();
    csLogger("Handling message event");

    if (this.selectedChatLog) {
      // @ts-ignore
      if (this.commentEl && this.commentEl.value.trim().length === 0) return; // @ts-ignore

      var messageContent = this.commentEl.value.trim(); // @ts-ignore

      this.commentEl.value = '';
      var sentMessage = _socket_ChatManager__WEBPACK_IMPORTED_MODULE_3__["ChatManager"].getInstance().sendMessage(this.selectedChatLog.roomName, messageContent, _socket_Types__WEBPACK_IMPORTED_MODULE_6__["Priority"].Normal, {});

      if (sentMessage) {
        // add the message to our display
        var messageEl = this.addChatMessage(sentMessage); // scroll to bottom

        _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_4__["default"].scrollSmoothTo(messageEl);
      }
    }
  };

  _proto.onDocumentLoaded = function onDocumentLoaded() {
    var _this2 = this;

    _SidebarView.prototype.onDocumentLoaded.call(this); // @ts-ignore


    this.chatLogDiv = document.getElementById(this.uiConfig.dom.chatLogId); // @ts-ignore

    this.commentEl = document.getElementById(this.uiConfig.dom.commentId); // @ts-ignore

    this.chatForm = document.getElementById(this.uiConfig.dom.newFormId); // @ts-ignore

    this.sendMessageButton = document.getElementById(this.uiConfig.dom.submitCommentId); // @ts-ignore

    this.leaveChatButton = document.getElementById(this.uiConfig.dom.leaveChatId); // @ts-ignore

    this.chatRoomDiv = document.getElementById(this.uiConfig.dom.chatLogRoomId); // @ts-ignore

    this.fastUserSearch = document.getElementById(this.uiConfig.dom.chatFastSearchUserNames);
    this.chatRoomDiv.addEventListener('dragover', function (event) {
      csLoggerDetail('Dragged over');
      if (_this2.selectedChatLog) event.preventDefault();
    });
    this.chatRoomDiv.addEventListener('drop', this.handleUserDrop);
    this.chatForm.addEventListener('submit', this.handleAddMessage);
    this.leaveChatButton.addEventListener('click', this.leaveChat);
    this.checkCanComment(); // fast user search
    // @ts-ignore

    var fastSearchEl = $("#" + this.uiConfig.dom.chatFastSearchUserNames);
    fastSearchEl.on('autocompleteselect', this.eventUserSelected);
    this.updateView('', {});
  };

  _proto.eventUserSelected = function eventUserSelected(event, ui) {
    event.preventDefault();
    event.stopPropagation();
    csLogger("User " + ui.item.label + " with id " + ui.item.value + " selected"); // @ts-ignore

    event.target.innerText = ''; // add to the chat, if one selected

    if (this.selectedChatLog) _socket_ChatManager__WEBPACK_IMPORTED_MODULE_3__["ChatManager"].getInstance().sendInvite(ui.item.label, this.selectedChatLog.roomName);
    _notification_NotificationManager__WEBPACK_IMPORTED_MODULE_8__["default"].show('Chat', "Invited " + ui.item.label + " to the chat.");
  };

  _proto.getIdForStateItem = function getIdForStateItem(name, item) {
    return item.roomName;
  };

  _proto.getLegacyIdForStateItem = function getLegacyIdForStateItem(name, item) {
    return item.roomName;
  };

  _proto.getDisplayValueForStateItem = function getDisplayValueForStateItem(name, item) {
    return item.users.join(',');
  };

  _proto.getModifierForStateItem = function getModifierForStateItem(name, item) {
    var result = 'inactive';

    if (this.selectedChatLog) {
      if (this.selectedChatLog.roomName === item.roomName) {
        result = 'active';
      }
    }

    return result;
  };

  _proto.getSecondaryModifierForStateItem = function getSecondaryModifierForStateItem(name, item) {
    return this.getModifierForStateItem(name, item);
  };

  _proto.addChatMessage = function addChatMessage(message) {
    var chatMessageEl = document.createElement('div');
    _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_4__["default"].addRemoveClasses(chatMessageEl, "message"); // are we dealing with an "join"/"exit" message?

    if (message.from.trim().length === 0) {
      var messageSenderEl = document.createElement('div');
      _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_4__["default"].addRemoveClasses(messageSenderEl, 'message-sender');
      messageSenderEl.innerText = message.message;
      chatMessageEl.appendChild(messageSenderEl);
    } else {
      if (message.from === _socket_ChatManager__WEBPACK_IMPORTED_MODULE_3__["ChatManager"].getInstance().getCurrentUser()) {
        _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_4__["default"].addRemoveClasses(chatMessageEl, "my-message");
      } else {
        var _messageSenderEl = document.createElement('div');

        _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_4__["default"].addRemoveClasses(_messageSenderEl, 'message-sender');
        _messageSenderEl.innerText = message.from + '   ' + moment__WEBPACK_IMPORTED_MODULE_5___default()(message.created, 'YYYYMMDDHHmmss').format('DD/MM/YYYY ');
        chatMessageEl.appendChild(_messageSenderEl);
      }

      var contentEl = document.createElement('div');

      if (message.from === _socket_ChatManager__WEBPACK_IMPORTED_MODULE_3__["ChatManager"].getInstance().getCurrentUser()) {
        _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_4__["default"].addRemoveClasses(contentEl, "my-message-content");
      } else {
        _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_4__["default"].addRemoveClasses(contentEl, 'message-content');
      }

      contentEl.innerText = message.message;
      chatMessageEl.appendChild(contentEl);
    }

    this.chatLogDiv.appendChild(chatMessageEl);
    return chatMessageEl;
  };

  _proto.reRenderChatMessages = function reRenderChatMessages(chatLog) {
    var _this3 = this;

    _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_4__["default"].removeAllChildren(this.chatLogDiv);
    var messageEl = null;
    chatLog.messages.forEach(function (message) {
      messageEl = _this3.addChatMessage(message);
    }); // scroll to the last message (if any)

    if (messageEl) _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_4__["default"].scrollTo(messageEl);
  };

  _proto.renderChatLog = function renderChatLog(chatLog) {
    csLoggerDetail("Chat Log " + chatLog.roomName + " rendering");

    if (this.selectedChatLog) {
      if (this.selectedChatLog.roomName === chatLog.roomName) {
        this.selectedChatLog = chatLog;
        _socket_ChatManager__WEBPACK_IMPORTED_MODULE_3__["ChatManager"].getInstance().touchChatLog(chatLog.roomName); // render the chat conversation

        this.reRenderChatMessages(chatLog);
      }
    }

    this.updateView('', {});
  };

  _proto.eventClickItem = function eventClickItem(event) {
    event.preventDefault();
    event.stopPropagation();
    console.log(event.target); // @ts-ignore

    var room = event.target.getAttribute(this.uiConfig.dom.resultDataKeyId); // @ts-ignore

    var dataSource = event.target.getAttribute(this.uiConfig.dom.resultDataSourceId); // @ts-ignore

    csLoggerDetail("Chat Log " + event.target + " with id " + room + " clicked from " + dataSource);
    this.selectedChatLog = _socket_ChatManager__WEBPACK_IMPORTED_MODULE_3__["ChatManager"].getInstance().getChatLog(room);

    if (this.selectedChatLog) {
      this.checkCanComment();
      this.renderChatLog(this.selectedChatLog);
    }
  };

  _proto.selectChatRoom = function selectChatRoom(room) {
    csLoggerDetail("Chat Log with id " + room + " selected");
    this.selectedChatLog = _socket_ChatManager__WEBPACK_IMPORTED_MODULE_3__["ChatManager"].getInstance().getChatLog(room);

    if (this.selectedChatLog) {
      this.checkCanComment();
      this.renderChatLog(this.selectedChatLog);
    }
  };

  _proto.updateView = function updateView(name, newState) {
    if (name === this.config.stateNames.users) {
      // load the search names into the search field
      // except for the users already in the chat
      csLoggerDetail("Updating the fast user search");
      csLoggerDetail(newState); // what is my username?

      var myUsername = _Controller__WEBPACK_IMPORTED_MODULE_7__["default"].getLoggedInUsername(); // @ts-ignore

      var fastSearchEl = $("#" + this.uiConfig.dom.chatFastSearchUserNames); // for each name, construct the patient details to display and the id referenced

      var fastSearchValues = [];

      if (newState) {
        newState.forEach(function (item) {
          var searchValue = {
            label: item.username,
            value: item.id
          }; // @ts-ignore

          if (myUsername !== item.username) fastSearchValues.push(searchValue); // don't search for ourselves
        });
        fastSearchEl.autocomplete({
          source: fastSearchValues
        });
        fastSearchEl.autocomplete('option', {
          disabled: false,
          minLength: 1
        });
      }
    } else {
      csLoggerDetail("Updating state with chat manager");
      newState = _socket_ChatManager__WEBPACK_IMPORTED_MODULE_3__["ChatManager"].getInstance().getChatLogs();
      csLoggerDetail(newState);
      this.createResultsForState(name, newState);
      this.checkCanComment();
    }
  };

  _proto.getDragData = function getDragData(event) {};

  _proto.handleChatLogsUpdated = function handleChatLogsUpdated() {
    if (this.selectedChatLog) {
      _socket_ChatManager__WEBPACK_IMPORTED_MODULE_3__["ChatManager"].getInstance().touchChatLog(this.selectedChatLog.roomName); // render the chat conversation

      this.reRenderChatMessages(this.selectedChatLog);
    }

    this.updateView('', {});
    this.checkCanComment();
  };

  _proto.handleChatStarted = function handleChatStarted(log) {
    this.selectedChatLog = log;
    this.renderChatLog(log);
    this.updateView('', {});
  };

  _proto.eventHide = function eventHide(event) {
    _SidebarView.prototype.eventHide.call(this, event); // deselect the selected chat


    if (this.selectedChatLog) {
      this.selectedChatLog = null;
      this.checkCanComment();
      this.clearChatLog();
    }
  };

  _proto.handleOfflineMessagesReceived = function handleOfflineMessagesReceived(messages) {};

  _proto.handleInvitationDeclined = function handleInvitationDeclined(room, username) {};

  _proto.getBadgeValue = function getBadgeValue(name, item) {
    return item.numOfNewMessages;
  };

  _proto.eventDeleteClickItem = function eventDeleteClickItem(event) {
    event.preventDefault();
    event.stopPropagation();
    console.log(event.target); // @ts-ignore

    var room = event.target.getAttribute(this.uiConfig.dom.resultDataKeyId); // @ts-ignore

    var dataSource = event.target.getAttribute(this.uiConfig.dom.resultDataSourceId); // @ts-ignore

    csLoggerDetail("Chat Log " + event.target + " with id " + room + " deleted from " + dataSource);

    if (room) {
      var log = _socket_ChatManager__WEBPACK_IMPORTED_MODULE_3__["ChatManager"].getInstance().getChatLog(room);

      if (log) {
        _socket_ChatManager__WEBPACK_IMPORTED_MODULE_3__["ChatManager"].getInstance().leaveChat(room);

        if (this.selectedChatLog && this.selectedChatLog.roomName === room) {
          this.selectedChatLog = null;
          this.clearChatLog();
          this.checkCanComment();
        }

        this.updateView('', {});
      }
    }
  };

  _proto.getBackgroundImage = function getBackgroundImage(name, item) {
    return "";
  };

  _proto.leaveChat = function leaveChat(event) {
    event.preventDefault();
    event.stopPropagation();

    if (this.selectedChatLog) {
      _socket_ChatManager__WEBPACK_IMPORTED_MODULE_3__["ChatManager"].getInstance().leaveChat(this.selectedChatLog.roomName);
      this.selectedChatLog = null;
      this.clearChatLog();
      this.checkCanComment();
    }

    this.updateView('', {});
  };

  _proto.checkCanComment = function checkCanComment() {
    if (this.selectedChatLog) {
      if (this.commentEl) this.commentEl.removeAttribute("readonly");
      if (this.commentEl) this.commentEl.removeAttribute("disabled");
      if (this.sendMessageButton) this.sendMessageButton.removeAttribute("disabled");
      if (this.leaveChatButton) this.leaveChatButton.removeAttribute("disabled");
      if (this.fastUserSearch) this.fastUserSearch.removeAttribute("disabled");
    } else {
      if (this.commentEl) this.commentEl.setAttribute("readonly", "true");
      if (this.commentEl) this.commentEl.setAttribute("disabled", "true");
      if (this.sendMessageButton) this.sendMessageButton.setAttribute("disabled", "true");
      if (this.leaveChatButton) this.leaveChatButton.setAttribute("disabled", "true");
      if (this.fastUserSearch) this.fastUserSearch.setAttribute("disabled", "true");
    }
  };

  _proto.clearChatLog = function clearChatLog() {
    _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_4__["default"].removeAllChildren(this.chatLogDiv);
  };

  return ChatSidebarView;
}(_SidebarView__WEBPACK_IMPORTED_MODULE_1__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (ChatSidebarView);

/***/ }),

/***/ "./src/component/ScoreSheetController.ts":
/*!***********************************************!*\
  !*** ./src/component/ScoreSheetController.ts ***!
  \***********************************************/
/*! exports provided: ScoreSheetController */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScoreSheetController", function() { return ScoreSheetController; });
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _socket_Types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../socket/Types */ "./src/socket/Types.ts");
/* harmony import */ var _notification_NotificationManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../notification/NotificationManager */ "./src/notification/NotificationManager.ts");
/* harmony import */ var _ScoreSheetView__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ScoreSheetView */ "./src/component/ScoreSheetView.ts");
/* harmony import */ var _util_UUID__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../util/UUID */ "./src/util/UUID.ts");
/* harmony import */ var _socket_SocketManager__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../socket/SocketManager */ "./src/socket/SocketManager.ts");
/* harmony import */ var _socket_ChatManager__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../socket/ChatManager */ "./src/socket/ChatManager.ts");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _Controller__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../Controller */ "./src/Controller.ts");
/* harmony import */ var _template_TemplateManager__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../template/TemplateManager */ "./src/template/TemplateManager.ts");
/* harmony import */ var _CallManager__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./CallManager */ "./src/component/CallManager.ts");
/* harmony import */ var _state_MemoryBufferStateManager__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../state/MemoryBufferStateManager */ "./src/state/MemoryBufferStateManager.ts");












var sscLogger = debug__WEBPACK_IMPORTED_MODULE_0___default()('score-sheet-controller');
var ScoreSheetController = /*#__PURE__*/function () {
  function ScoreSheetController() {
    this.applicationView = null;
    this.currentScoreRoom = null;
    this.currentlySelectedBoardGame = null;
    this.currentScoreSheet = null;
    this.currentUsername = '';
    this.isRoomCreator = false;
    this.currentUsersInScoreSheet = [];
    this.intervalTimer = -1;
    this.stateManager = new _state_MemoryBufferStateManager__WEBPACK_IMPORTED_MODULE_11__["default"]();
    _socket_SocketManager__WEBPACK_IMPORTED_MODULE_5__["default"].addChatReceiver(this); // bind events

    this.receiveLogin = this.receiveLogin.bind(this);
    this.receiveLogout = this.receiveLogout.bind(this);
    this.receiveInvitation = this.receiveInvitation.bind(this);
    this.receiveMessage = this.receiveMessage.bind(this);
    this.receiveQueuedMessages = this.receiveQueuedMessages.bind(this);
    this.receiveQueuedInvites = this.receiveQueuedInvites.bind(this);
    this.receiveJoinedRoom = this.receiveJoinedRoom.bind(this);
    this.receivedLeftRoom = this.receivedLeftRoom.bind(this);
    this.userChangedValue = this.userChangedValue.bind(this);
    this.endScoreSheet = this.endScoreSheet.bind(this);
    this.pauseTimer = this.pauseTimer.bind(this);
    this.isSheetOwner = this.isSheetOwner.bind(this);
    this.inviteUser = this.inviteUser.bind(this);
    this.getCurrentRoom = this.getCurrentRoom.bind(this);
    this.getSelectedBoardGame = this.getSelectedBoardGame.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.stopTimerStoppedByAnotherUser = this.stopTimerStoppedByAnotherUser.bind(this);
    this.isTimerGoing = this.isTimerGoing.bind(this);
    this.reset = this.reset.bind(this); // reset state

    this.reset();
  }

  ScoreSheetController.getInstance = function getInstance() {
    if (!ScoreSheetController._instance) {
      ScoreSheetController._instance = new ScoreSheetController();
    }

    return ScoreSheetController._instance;
  };

  var _proto = ScoreSheetController.prototype;

  _proto.isTimerGoing = function isTimerGoing() {
    var result = false;

    if (this.currentScoreSheet) {
      result = this.currentScoreSheet.timerGoing;
    }

    return result;
  };

  _proto.getStateManager = function getStateManager() {
    return this.stateManager;
  };

  _proto.getCurrentRoom = function getCurrentRoom() {
    return this.currentScoreRoom;
  };

  _proto.receiveLogin = function receiveLogin(username) {};

  _proto.receiveLogout = function receiveLogout(username) {};

  _proto.setCurrentUser = function setCurrentUser(username) {
    sscLogger("Setting current user " + username);
    this.currentUsername = username;
  };

  _proto.getCurrentUser = function getCurrentUser() {
    return this.currentUsername;
  };

  _proto.initialise = function initialise(applicationView) {
    this.applicationView = applicationView;
    _CallManager__WEBPACK_IMPORTED_MODULE_10__["CallManager"].getInstance().initialise(applicationView);
  };

  _proto.receiveInvitation = function receiveInvitation(invite) {
    if (!this.isLoggedIn()) return; // we are not logged in

    if (invite.type !== _socket_Types__WEBPACK_IMPORTED_MODULE_1__["InviteType"].ScoreSheet) return; //ignore non-score sheets

    if (_socket_ChatManager__WEBPACK_IMPORTED_MODULE_6__["ChatManager"].getInstance().isUserInBlockedList(invite.from)) {
      sscLogger("Received invite from blocked user - ignoring");
      return;
    } // are we already in a scoresheet?


    if (this.currentScoreSheet) {
      sscLogger("Received invite - already in score sheet - declining"); // are we already in this score sheet?

      if (this.currentScoreSheet.room !== invite.room) {
        // decline the invite, only one score sheet at a time
        sscLogger("Received invite - already in score sheet - declining");
        _socket_SocketManager__WEBPACK_IMPORTED_MODULE_5__["default"].sendDeclineInvite(invite.room, this.getCurrentUser(), _socket_Types__WEBPACK_IMPORTED_MODULE_1__["InviteType"].ScoreSheet); // user declines to join the scoresheet

        return;
      }
    }

    if (invite.requiresAcceptDecline) {
      // notify the user of the invitation
      if (!confirm("You have been invited by user " + invite.from + " to joint a chat room for the board game " + invite.subject + " score sheet")) {
        _socket_SocketManager__WEBPACK_IMPORTED_MODULE_5__["default"].sendDeclineInvite(invite.room, this.getCurrentUser(), _socket_Types__WEBPACK_IMPORTED_MODULE_1__["InviteType"].ScoreSheet); // user declines to join the scoresheet

        return;
      }
    } // prepare to receive a call


    _CallManager__WEBPACK_IMPORTED_MODULE_10__["CallManager"].getInstance().prepareToAnswerCallFrom(invite.from); // notify the user of the new chat

    _notification_NotificationManager__WEBPACK_IMPORTED_MODULE_2__["default"].show('Score Sheet', "Joining score sheet", 'info', 7000);
    _socket_SocketManager__WEBPACK_IMPORTED_MODULE_5__["default"].joinChat(this.getCurrentUser(), invite.room, _socket_Types__WEBPACK_IMPORTED_MODULE_1__["InviteType"].ScoreSheet);
    this.currentScoreRoom = invite.room;
    this.currentlySelectedBoardGame = invite.attachment.boardGame;
    this.currentScoreSheet = invite.attachment.scoreSheet;
    _Controller__WEBPACK_IMPORTED_MODULE_8__["default"].addBoardGameToDisplay(invite.attachment.boardGame); // check to see if the timer should be going

    if (this.isTimerGoing()) {
      this.stopTimerStoppedByAnotherUser();
      this.startTimer();
    } // ask the view to initialise with these values


    _ScoreSheetView__WEBPACK_IMPORTED_MODULE_3__["ScoreSheetView"].getInstance().stateChanged("", "", this.currentScoreSheet); // change to the score sheet

    this.applicationView.handleShowScoreSheet(null);
  };

  _proto.getSelectedBoardGame = function getSelectedBoardGame() {
    return this.currentlySelectedBoardGame;
  };

  _proto.receiveQueuedMessages = function receiveQueuedMessages(messages) {
    var _this = this;

    if (!this.isLoggedIn()) return; // we are not logged in

    if (!this.currentScoreRoom) return; // we are not in a room

    messages.forEach(function (message) {
      if (message.type === _socket_Types__WEBPACK_IMPORTED_MODULE_1__["InviteType"].ScoreSheet) {
        // only process offline messages for scoresheet and our current room
        if (_this.currentScoreRoom === message.room) {
          _this.receiveMessage(message);
        }
      }
    });
  };

  _proto.receiveQueuedInvites = function receiveQueuedInvites(invites) {
    var _this2 = this;

    if (!this.isLoggedIn()) return; // we are not logged in

    invites.forEach(function (invite) {
      if (invite.type === _socket_Types__WEBPACK_IMPORTED_MODULE_1__["InviteType"].ScoreSheet) {
        // only process offline invites to scoresheet
        _this2.receiveInvitation(invite);
      }
    });
  };

  _proto.receiveDecline = function receiveDecline(room, username, type) {
    if (type !== _socket_Types__WEBPACK_IMPORTED_MODULE_1__["InviteType"].ScoreSheet) return; //ignore non-score sheets

    sscLogger("Receive decline for room " + room + " from " + username);

    if (this.currentScoreRoom) {
      if (this.currentScoreRoom === room) {
        _notification_NotificationManager__WEBPACK_IMPORTED_MODULE_2__["default"].show('Score Sheet', "User " + username + " declined the invitation.", 'warning');
      }
    }
  };

  _proto.receiveJoinedRoom = function receiveJoinedRoom(users) {
    if (users.type !== _socket_Types__WEBPACK_IMPORTED_MODULE_1__["InviteType"].ScoreSheet) return; //ignore non-score sheets

    if (!this.isLoggedIn()) return; // we are not logged in

    if (users.username === this.getCurrentUser()) return;
    if (this.currentScoreRoom !== users.room) return;
    sscLogger("Handling user joined " + users.username); // update the sheet to include the user

    var index = this.currentUsersInScoreSheet.findIndex(function (username) {
      return username === users.username;
    });

    if (index < 0) {
      this.currentUsersInScoreSheet.push(users.username); // update the sheet data
      // the owner of the sheet should send a sync message of the data

      if (this.currentScoreSheet) this.saveCurrentScoreSheet(this.currentScoreSheet);
    }

    if (this.isRoomCreator && this.currentScoreSheet) {
      sscLogger("Handling user joined " + users.username + " - sending");
      this.addUserToScoreSheet(users.username);
      this.sendScoreSheetState(this.currentScoreSheet, false);
    }

    _notification_NotificationManager__WEBPACK_IMPORTED_MODULE_2__["default"].show(this.currentlySelectedBoardGame.name, "User " + users.username + " joined the scoresheet.", 'message', 120000);
  };

  _proto.receivedLeftRoom = function receivedLeftRoom(users) {
    if (users.type !== _socket_Types__WEBPACK_IMPORTED_MODULE_1__["InviteType"].ScoreSheet) return; //ignore non-score sheets

    if (!this.isLoggedIn()) return; // we are not logged in

    if (users.username === this.getCurrentUser()) return;
    if (this.currentScoreRoom !== users.room) return; // update the sheet to remove the user

    sscLogger("Handling user left " + users.username);
    var index = this.currentUsersInScoreSheet.findIndex(function (username) {
      return username === users.username;
    });

    if (index >= 0) {
      this.currentUsersInScoreSheet.splice(index, 1); // update the sheet data

      this.removeUserFromScoreSheet(users.username); // the owner of the sheet should send a sync message of the data

      if (this.currentScoreSheet) this.saveCurrentScoreSheet(this.currentScoreSheet);
    }

    if (this.isRoomCreator && this.currentScoreSheet) {
      sscLogger("Handling user left " + users.username + " - sending");
      this.sendScoreSheetState(this.currentScoreSheet, false);
    }

    _notification_NotificationManager__WEBPACK_IMPORTED_MODULE_2__["default"].show(this.currentlySelectedBoardGame.name, "User " + users.username + " left the scoresheet.", 'warning', 100000);
  };

  _proto.receiveUserList = function receiveUserList(users) {} // will be managed in the transfer of sheet data
  ;

  _proto.endScoreSheet = function endScoreSheet() {
    // this can only be done by the room creator
    // send the final score to everyone
    sscLogger("Handling end of score sheet");
    if (this.isRoomCreator && this.currentScoreSheet) this.saveScoreSheetToBoardGame(this.currentScoreSheet);

    if (this.isLoggedIn()) {
      if (this.currentScoreRoom && this.currentScoreSheet) {
        sscLogger("Handling end of score sheet - sending");
        this.sendScoreSheetState(this.currentScoreSheet, true); // if we are logged in and the scoresheet creator then we need to save the score sheet to the selected board game
      } // close the room


      this.leave();
    } // reset the controller


    this.reset();
    this.applicationView.switchBetweenCollectionAndScoreSheet(true);
  };

  _proto.startScoreSheet = function startScoreSheet(boardGame) {
    if (boardGame) {
      sscLogger("Starting score sheet for " + boardGame.name);
      this.currentlySelectedBoardGame = boardGame;
      if (this.isLoggedIn()) this.currentUsersInScoreSheet = [this.getCurrentUser()];
      this.isRoomCreator = true;
      this.currentScoreRoom = _util_UUID__WEBPACK_IMPORTED_MODULE_4__["default"].getUniqueId();
      this.currentScoreSheet = {
        room: this.currentScoreRoom,
        boardGameName: boardGame.name,
        sheetLayoutOptions: _template_TemplateManager__WEBPACK_IMPORTED_MODULE_9__["TemplateManager"].getInstance().getScoreSheetTemplate(boardGame),
        timer: 0,
        timerGoing: false,
        data: _template_TemplateManager__WEBPACK_IMPORTED_MODULE_9__["TemplateManager"].getInstance().getScoreSheetStartingData(boardGame),
        isFinished: false
      };
      sscLogger(this.currentScoreSheet);
      _CallManager__WEBPACK_IMPORTED_MODULE_10__["CallManager"].getInstance().startScoreSheet(); // store the score sheet locally

      this.stateManager.setStateByName(this.applicationView.state.stateNames.scoreSheet, this.currentScoreSheet, true); // start a new chat room, will automatically manage if logged in or not

      if (this.isLoggedIn()) _socket_SocketManager__WEBPACK_IMPORTED_MODULE_5__["default"].joinChat(this.getCurrentUser(), this.currentScoreRoom, _socket_Types__WEBPACK_IMPORTED_MODULE_1__["InviteType"].ScoreSheet);
    }
  };

  _proto.hasActiveScoreSheet = function hasActiveScoreSheet() {
    var result = false;

    if (this.currentScoreRoom && this.currentScoreRoom !== null) {
      sscLogger(this.currentScoreRoom);
      result = true;
    }

    return result;
  };

  _proto.inviteUser = function inviteUser(username) {
    if (!this.isLoggedIn()) return; // we are not logged in
    // only the user who created the score sheet can do this as they are the only ones with a selected board game

    if (this.currentScoreRoom && this.currentlySelectedBoardGame) {
      sscLogger("Inviting user " + username + " to score sheet");

      if (this.isRoomCreator) {
        _notification_NotificationManager__WEBPACK_IMPORTED_MODULE_2__["default"].show(this.currentlySelectedBoardGame.name, "You have invited user " + username + " to the scoresheet", 'message');
        _socket_SocketManager__WEBPACK_IMPORTED_MODULE_5__["default"].sendInvite(this.getCurrentUser(), username, this.currentScoreRoom, _socket_Types__WEBPACK_IMPORTED_MODULE_1__["InviteType"].ScoreSheet, true, this.currentlySelectedBoardGame.name, {
          scoreSheet: this.currentScoreSheet,
          boardGame: this.currentlySelectedBoardGame
        });
      } else {
        alert("Only the score sheet creator can invite other users.");
      }
    }
  };

  _proto.receiveMessage = function receiveMessage(message) {
    sscLogger("'Handling receive message");
    sscLogger(message);
    if (!this.isLoggedIn()) return; // we are not logged in

    if (message.type !== _socket_Types__WEBPACK_IMPORTED_MODULE_1__["InviteType"].ScoreSheet) return; //ignore non-score sheets

    if (message.from === this.getCurrentUser()) return; // my own messages can be ignored

    if (this.currentScoreRoom) {
      // are we in a room?
      if (this.currentScoreRoom === message.room) {
        // are we listening to this score sheet room?
        if (_socket_ChatManager__WEBPACK_IMPORTED_MODULE_6__["ChatManager"].getInstance().isUserInBlockedList(message.from)) {
          sscLogger("Received message from blocked user - ignoring");
          return;
        } // are we scoring the right sheet?


        sscLogger("Received message for score sheet " + message.room);
        sscLogger(message);

        if (message.attachment) {
          // the attachment should be a ScoreSheet object
          var scoreSheet = message.attachment;
          sscLogger(scoreSheet); // @ts-ignore

          if (this.currentScoreSheet) {
            var timerWasGoing = this.currentScoreSheet.timerGoing;
            this.currentScoreSheet.room = message.room;
            this.currentScoreSheet.boardGameName = scoreSheet.boardGameName;
            this.currentScoreSheet.data = scoreSheet.data;
            this.currentScoreSheet.timer = scoreSheet.timer > this.currentScoreSheet.timer ? scoreSheet.timer : this.currentScoreSheet.timer;
            this.currentScoreSheet.timerGoing = scoreSheet.timerGoing;
            this.currentScoreSheet.sheetLayoutOptions = scoreSheet.sheetLayoutOptions;
            this.currentScoreSheet.isFinished = scoreSheet.isFinished; // has the timer changed?

            if (scoreSheet.timerGoing) {
              if (timerWasGoing) {// both timers going, no need to do anything
              } else {
                // timer is going with another user, but we aren't going - start timer
                this.stopTimerStoppedByAnotherUser();
                this.startTimer();
              }
            } else {
              // timer not going at the other users end
              if (timerWasGoing) {
                // our timer is active - pause it
                this.stopTimerStoppedByAnotherUser();
              } else {// neither timer going
              }
            }
          }

          sscLogger('Updated score sheet');
          sscLogger(this.currentScoreSheet); // save the new state

          if (this.currentScoreSheet) this.saveCurrentScoreSheet(this.currentScoreSheet, true);

          if (scoreSheet.isFinished) {
            alert('Score sheet has been finished - closing'); // reset the controller

            this.reset(); // close the room

            this.leave(); // reset the view

            _ScoreSheetView__WEBPACK_IMPORTED_MODULE_3__["ScoreSheetView"].getInstance().resetDisplay();
            this.applicationView.switchBetweenCollectionAndScoreSheet(true);
          }
        }
      }
    }
  };

  _proto.isSheetOwner = function isSheetOwner() {
    return this.isRoomCreator;
  };

  _proto.createScoreSheetFromTable = function createScoreSheetFromTable() {
    var scoreSheet = null;
    var tableData = _ScoreSheetView__WEBPACK_IMPORTED_MODULE_3__["ScoreSheetView"].getInstance().getTableData();

    if (this.currentScoreSheet && this.currentScoreRoom) {
      scoreSheet = {
        room: this.currentScoreRoom,
        data: tableData,
        boardGameName: this.currentlySelectedBoardGame.name,
        timer: this.currentScoreSheet.timer,
        sheetLayoutOptions: this.currentlySelectedBoardGame ? _template_TemplateManager__WEBPACK_IMPORTED_MODULE_9__["TemplateManager"].getInstance().getScoreSheetTemplate(this.currentlySelectedBoardGame) : null,
        timerGoing: this.currentScoreSheet.timerGoing,
        isFinished: false
      };
    }

    return scoreSheet;
  };

  _proto.sendScoreSheetState = function sendScoreSheetState(scoreSheet, isFinished) {
    if (isFinished === void 0) {
      isFinished = false;
    }

    if (this.currentScoreRoom && this.isLoggedIn()) {
      var created = parseInt(moment__WEBPACK_IMPORTED_MODULE_7___default()().format('YYYYMMDDHHmmss')); // @ts-ignore

      _socket_SocketManager__WEBPACK_IMPORTED_MODULE_5__["default"].sendMessage(this.getCurrentUser(), this.currentScoreRoom, 'data', created, _socket_Types__WEBPACK_IMPORTED_MODULE_1__["InviteType"].ScoreSheet, _socket_Types__WEBPACK_IMPORTED_MODULE_1__["Priority"].Normal, scoreSheet);
    }
  };

  _proto.startTimer = function startTimer() {
    var _this3 = this;

    sscLogger("Handling pause timer");
    if (!this.currentScoreSheet) return;
    this.currentScoreSheet.timerGoing = true;
    this.intervalTimer = setInterval(function () {
      if (_this3.currentScoreSheet && _this3.currentScoreSheet.timerGoing) {
        _this3.currentScoreSheet.timer++;
        _ScoreSheetView__WEBPACK_IMPORTED_MODULE_3__["ScoreSheetView"].getInstance().updateTimer(_this3.currentScoreSheet.timer, !_this3.currentScoreSheet.timerGoing);
      } else {
        if (_this3.currentScoreSheet) {
          _this3.currentScoreSheet.timerGoing = false;
          _ScoreSheetView__WEBPACK_IMPORTED_MODULE_3__["ScoreSheetView"].getInstance().updateTimer(_this3.currentScoreSheet.timer, !_this3.currentScoreSheet.timerGoing);
        }
      }
    }, 1000);

    if (this.currentScoreSheet) {
      this.saveCurrentScoreSheet(this.currentScoreSheet);
    }

    if (this.isLoggedIn() && this.currentScoreSheet) {
      // start the timer for everyone
      sscLogger("Handling pause timer - sending score sheet");
      this.sendScoreSheetState(this.currentScoreSheet, false);
    }
  };

  _proto.pauseTimer = function pauseTimer() {
    sscLogger("Handling pause timer");

    if (this.intervalTimer > 0) {
      clearInterval(this.intervalTimer);
      this.intervalTimer = -1;

      if (this.currentScoreSheet) {
        this.currentScoreSheet.timerGoing = false;
        this.saveCurrentScoreSheet(this.currentScoreSheet);
        _ScoreSheetView__WEBPACK_IMPORTED_MODULE_3__["ScoreSheetView"].getInstance().updateTimer(this.currentScoreSheet.timer, !this.currentScoreSheet.timerGoing);
      } // ask everyone to pause their timers


      if (this.isLoggedIn() && this.currentScoreSheet) {
        sscLogger("Handling pause timer - updating all users");
        this.sendScoreSheetState(this.currentScoreSheet, false);
      }
    }
  };

  _proto.userChangedValue = function userChangedValue(value, source) {
    sscLogger("Handling user changed value " + source);
    if (source === ScoreSheetController.SOURCE_View) return; // is the source an edit?

    if (source !== 'edit') return;
    var scoreSheet = this.createScoreSheetFromTable();
    sscLogger("Handling user changed Value");
    sscLogger(value);
    sscLogger(scoreSheet);

    if (scoreSheet) {
      sscLogger("Letting the template manager change any values");
      var changedByTM = _template_TemplateManager__WEBPACK_IMPORTED_MODULE_9__["TemplateManager"].getInstance().transformDataAfterUserChange(this.currentlySelectedBoardGame, scoreSheet);

      if (changedByTM) {
        sscLogger(scoreSheet);
      }

      this.saveCurrentScoreSheet(scoreSheet, changedByTM);

      if (this.isLoggedIn()) {
        sscLogger("Handling user change - updating all users");
        this.sendScoreSheetState(scoreSheet, false);
      }
    }
  };

  _proto.leave = function leave() {
    sscLogger("Handling user leaving");

    if (this.currentScoreSheet && this.currentScoreRoom) {
      if (this.isLoggedIn()) {
        _socket_SocketManager__WEBPACK_IMPORTED_MODULE_5__["default"].leaveChat(this.getCurrentUser(), this.currentScoreRoom, _socket_Types__WEBPACK_IMPORTED_MODULE_1__["InviteType"].ScoreSheet);
      }

      this.reset();
      this.applicationView.switchBetweenCollectionAndScoreSheet(true);
    }
  };

  _proto.addUserToScoreSheet = function addUserToScoreSheet(username) {
    if (_Controller__WEBPACK_IMPORTED_MODULE_8__["default"].isLoggedIn()) {
      sscLogger("Calling user " + username);
      _CallManager__WEBPACK_IMPORTED_MODULE_10__["CallManager"].getInstance().callUser(username);
    }
  };

  _proto.removeUserFromScoreSheet = function removeUserFromScoreSheet(username) {
    sscLogger("Removing user " + username);
    _CallManager__WEBPACK_IMPORTED_MODULE_10__["CallManager"].getInstance().removeUser(username);
  };

  _proto.reset = function reset() {
    this.currentScoreRoom = null;
    this.currentScoreSheet = null;
    this.currentlySelectedBoardGame = null;
    this.isRoomCreator = false;
    this.currentUsersInScoreSheet = [];
    this.stopTimerStoppedByAnotherUser();
    _CallManager__WEBPACK_IMPORTED_MODULE_10__["CallManager"].getInstance().reset();
  };

  _proto.isLoggedIn = function isLoggedIn() {
    return this.getCurrentUser().trim().length > 0;
  };

  _proto.saveScoreSheetToBoardGame = function saveScoreSheetToBoardGame(scoreSheet) {
    sscLogger('Handling save'); // add the data to the selected board game

    if (this.currentlySelectedBoardGame) {
      var saveData = _template_TemplateManager__WEBPACK_IMPORTED_MODULE_9__["TemplateManager"].getInstance().getSaveData(this.currentlySelectedBoardGame, scoreSheet);
      sscLogger(saveData);

      if (!this.currentlySelectedBoardGame.scoresheets) {
        this.currentlySelectedBoardGame.scoresheets = [];
      }

      this.currentlySelectedBoardGame.scoresheets.push(saveData);
      _Controller__WEBPACK_IMPORTED_MODULE_8__["default"].scoreSheetAddedToBoardGame(this.currentlySelectedBoardGame, saveData);
    }
  };

  _proto.saveCurrentScoreSheet = function saveCurrentScoreSheet(scoreSheet, informListeners) {
    if (informListeners === void 0) {
      informListeners = true;
    }

    this.currentScoreSheet = scoreSheet;
    this.stateManager.setStateByName(this.applicationView.state.stateNames.scoreSheet, this.currentScoreSheet, informListeners);
  };

  _proto.stopTimerStoppedByAnotherUser = function stopTimerStoppedByAnotherUser() {
    sscLogger("Handling timer stopped by another user");

    if (this.intervalTimer > 0) {
      clearInterval(this.intervalTimer);
      if (this.currentScoreSheet) _ScoreSheetView__WEBPACK_IMPORTED_MODULE_3__["ScoreSheetView"].getInstance().updateTimer(this.currentScoreSheet.timer, true);
    }

    this.intervalTimer = -1;
  };

  return ScoreSheetController;
}();
ScoreSheetController.SOURCE_View = 'ssv';

/***/ }),

/***/ "./src/component/ScoreSheetSidebarView.ts":
/*!************************************************!*\
  !*** ./src/component/ScoreSheetSidebarView.ts ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _SidebarView__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SidebarView */ "./src/component/SidebarView.ts");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Controller__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Controller */ "./src/Controller.ts");
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;

  _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}





var csLogger = debug__WEBPACK_IMPORTED_MODULE_0___default()('score-sheet-sidebar');
var csLoggerDetail = debug__WEBPACK_IMPORTED_MODULE_0___default()('score-sheet-sidebar:detail');

var ScoreSheetSidebarView = /*#__PURE__*/function (_SidebarView) {
  _inheritsLoose(ScoreSheetSidebarView, _SidebarView);

  function ScoreSheetSidebarView(applicationView, htmlDocument, stateManager) {
    var _this;

    _this = _SidebarView.call(this, applicationView, htmlDocument, applicationView.state.ui.scoreSheetSideBar, applicationView.state.uiPrefs.scoreSheetSideBar, stateManager) || this;
    _this.selectedBoardGame = null;
    _this.config = applicationView.state; // handler binding

    _this.updateView = _this.updateView.bind(_assertThisInitialized(_this));
    _this.eventClickItem = _this.eventClickItem.bind(_assertThisInitialized(_this));
    return _this;
  }

  var _proto = ScoreSheetSidebarView.prototype;

  _proto.onDocumentLoaded = function onDocumentLoaded() {
    _SidebarView.prototype.onDocumentLoaded.call(this);

    this.updateView('', {});
  };

  _proto.setSelectedBoardGame = function setSelectedBoardGame(boardGame) {
    csLogger("setting selected board game to");
    csLoggerDetail(boardGame);

    if (boardGame) {
      this.selectedBoardGame = boardGame;
      this.updateView('', boardGame);
    }
  };

  _proto.getIdForStateItem = function getIdForStateItem(name, item) {
    return item.id;
  };

  _proto.getLegacyIdForStateItem = function getLegacyIdForStateItem(name, item) {
    return item.id;
  }
  /*
      <h5 class="card-title">Card title</h5>
  <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
  <p class="card-text">Last updated 3 mins ago</p>
   */
  ;

  _proto.getDisplayValueForStateItem = function getDisplayValueForStateItem(name, item) {
    var buffer = '';
    /*
    type ScoreSheet {
        id:Int!
        players: [String],
        scores: [Int],
        jsonData: String,
        createdOn: Int
    }
    */

    buffer += "<h5 class=\"card-title\">" + this.selectedBoardGame.name + " (" + this.selectedBoardGame.year + ")</h5>";
    buffer += "<p class=\"card-text\">Played On: " + moment__WEBPACK_IMPORTED_MODULE_2___default()(item.createdOn, 'YYYYMMDDHHmmss').format('ddd, DD/MM/YYYY HH:mm') + "</p>";
    buffer += "<p class=\"card-text\">Scores: ";

    if (item.player1) {
      if (item.score1 > 0) {
        buffer += item.player1 + ":" + item.score1 + " ";
      }
    }

    if (item.player2) {
      if (item.score2 > 0) {
        buffer += item.player2 + ":" + item.score2 + " ";
      }
    }

    if (item.player3) {
      if (item.score3 > 0) {
        buffer += item.player3 + ":" + item.score3 + " ";
      }
    }

    if (item.player4) {
      if (item.score4 > 0) {
        buffer += item.player4 + ":" + item.score4 + " ";
      }
    }

    if (item.player5) {
      if (item.score5 > 0) {
        buffer += item.player5 + ":" + item.score5 + " ";
      }
    }

    if (item.player6) {
      if (item.score6 > 0) {
        buffer += item.player6 + ":" + item.score6 + " ";
      }
    }

    if (item.player7) {
      if (item.score7 > 0) {
        buffer += item.player7 + ":" + item.score7 + " ";
      }
    }

    if (item.players) {
      for (var index = 0; index < item.players.length; index++) {}
    }

    buffer += "</p>";
    return buffer;
  };

  _proto.getModifierForStateItem = function getModifierForStateItem(name, item) {
    return 'normal';
  };

  _proto.getSecondaryModifierForStateItem = function getSecondaryModifierForStateItem(name, item) {
    return this.getModifierForStateItem(name, item);
  };

  _proto.eventClickItem = function eventClickItem(event) {};

  _proto.updateView = function updateView(name, newState) {
    csLoggerDetail("Updating state with selected board game");

    if (newState) {
      if (newState.scoresheets) {
        this.createResultsForState(name, newState.scoresheets);
      }
    }
  };

  _proto.getDragData = function getDragData(event) {};

  _proto.getBadgeValue = function getBadgeValue(name, item) {
    return 0;
  };

  _proto.getBackgroundImage = function getBackgroundImage(name, item) {
    return './img/scorecard-vertical.jpg';
  };

  _proto.eventDeleteClickItem = function eventDeleteClickItem(event) {
    // @ts-ignore
    var sheetId = event.target.getAttribute(this.uiConfig.dom.resultDataKeyId); // @ts-ignore

    var dataSource = event.target.getAttribute(this.uiConfig.dom.resultDataSourceId); // @ts-ignore

    csLogger("Score Sheet " + event.target + " with id " + sheetId + " delete clicked from " + dataSource);

    if (this.selectedBoardGame && confirm("Are you sure you want to delete this Score Sheet?")) {
      // remove the sheet from the selected board game
      if (this.selectedBoardGame.scoresheets) {
        var index = this.selectedBoardGame.scoresheets.findIndex(function (sheet) {
          return sheet.id === sheetId;
        });

        if (index >= 0) {
          this.selectedBoardGame.scoresheets.splice(index, 1); // let the controller know to remove from the database if the user is logged in

          _Controller__WEBPACK_IMPORTED_MODULE_3__["default"].scoreSheetRemovedFromBoardGame(this.selectedBoardGame, sheetId);
        }
      }

      this.updateView('', this.selectedBoardGame);
    }
  };

  return ScoreSheetSidebarView;
}(_SidebarView__WEBPACK_IMPORTED_MODULE_1__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (ScoreSheetSidebarView);

/***/ }),

/***/ "./src/component/ScoreSheetView.ts":
/*!*****************************************!*\
  !*** ./src/component/ScoreSheetView.ts ***!
  \*****************************************/
/*! exports provided: ScoreSheetView */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScoreSheetView", function() { return ScoreSheetView; });
/* harmony import */ var _ScoreSheetController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ScoreSheetController */ "./src/component/ScoreSheetController.ts");
/* harmony import */ var handsontable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! handsontable */ "./node_modules/handsontable/index.mjs");
/* harmony import */ var _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/BrowserUtil */ "./src/util/BrowserUtil.ts");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _template_TemplateManager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../template/TemplateManager */ "./src/template/TemplateManager.ts");
/* harmony import */ var _Controller__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Controller */ "./src/Controller.ts");






var ssvLogger = debug__WEBPACK_IMPORTED_MODULE_3___default()('score-sheet-view');
var ScoreSheetView = /*#__PURE__*/function () {
  // @ts-ignore
  function ScoreSheetView() {
    this.applicationView = null;
    this.thisEl = null;
    this.boardGameTitleEl = null;
    this.startStopTimer = null;
    this.timerEl = null;
    this.endOrLeaveEl = null;
    this.scoreSheetEl = null;
    this.table = null;
    this.controller = _ScoreSheetController__WEBPACK_IMPORTED_MODULE_0__["ScoreSheetController"].getInstance();
    this.stateManager = _Controller__WEBPACK_IMPORTED_MODULE_5__["default"].getStateManager();
    this.eventUserSelected = this.eventUserSelected.bind(this);
  }

  ScoreSheetView.getInstance = function getInstance() {
    if (!ScoreSheetView._instance) {
      ScoreSheetView._instance = new ScoreSheetView();
    }

    return ScoreSheetView._instance;
  };

  var _proto = ScoreSheetView.prototype;

  _proto.setApplication = function setApplication(applicationView) {
    this.config = applicationView.state;
    this.stateManager.addChangeListenerForName(this.config.stateNames.users, this);
  };

  _proto.onDocumentLoaded = function onDocumentLoaded(applicationView) {
    this.applicationView = applicationView;
    this.resetDisplay(); // @ts-ignore

    this.ssFastSearchUserNames = document.getElementById(this.config.ui.scoreSheet.dom.ssFastSearchUserNames); // fast user search
    // @ts-ignore

    var fastSearchEl = $("#" + this.config.ui.scoreSheet.dom.ssFastSearchUserNames);
    fastSearchEl.on('autocompleteselect', this.eventUserSelected);
    _ScoreSheetController__WEBPACK_IMPORTED_MODULE_0__["ScoreSheetController"].getInstance().getStateManager().addChangeListenerForName(this.applicationView.state.stateNames.scoreSheet, this); // load references to the key elements on the page
    // @ts-ignore

    this.thisEl = document.getElementById(this.applicationView.state.ui.scoreSheet.dom.dropZone); // @ts-ignore

    this.boardGameTitleEl = document.getElementById(this.applicationView.state.ui.scoreSheet.dom.boardGame); // @ts-ignore

    this.startStopTimer = document.getElementById(this.applicationView.state.ui.scoreSheet.dom.startStopTimer); // @ts-ignore

    this.timerEl = document.getElementById(this.applicationView.state.ui.scoreSheet.dom.timer); // @ts-ignore

    this.endOrLeaveEl = document.getElementById(this.applicationView.state.ui.scoreSheet.dom.end); // @ts-ignore

    this.scoreSheetEl = document.getElementById(this.applicationView.state.ui.scoreSheet.dom.scoreSheet); // bind event handlers

    this.handleStartStopTimer = this.handleStartStopTimer.bind(this);
    this.handleEndOrLeave = this.handleEndOrLeave.bind(this);
    this.handleUserDrop = this.handleUserDrop.bind(this); // setup event handlers

    if (this.startStopTimer) this.startStopTimer.addEventListener('click', this.handleStartStopTimer);
    if (this.endOrLeaveEl) this.endOrLeaveEl.addEventListener('click', this.handleEndOrLeave);

    if (this.thisEl) {
      this.thisEl.addEventListener('dragover', function (event) {
        event.preventDefault();
      });
      this.thisEl.addEventListener('drop', this.handleUserDrop);
    }
  };

  _proto.eventUserSelected = function eventUserSelected(event, ui) {
    event.preventDefault();
    event.stopPropagation();
    ssvLogger("User " + ui.item.label + " with id " + ui.item.value + " selected"); // @ts-ignore

    event.target.innerText = ''; // add to the chat, if one selected, and is scoresheet owner

    if (_ScoreSheetController__WEBPACK_IMPORTED_MODULE_0__["ScoreSheetController"].getInstance().isSheetOwner()) {
      _ScoreSheetController__WEBPACK_IMPORTED_MODULE_0__["ScoreSheetController"].getInstance().inviteUser(ui.item.label);
    } else {
      alert("Only the score sheet creator can invite users.");
    }
  };

  _proto.handleEndOrLeave = function handleEndOrLeave(event) {
    ssvLogger('leave or end'); // are we leaving or ending?

    if (this.controller.hasActiveScoreSheet() && this.controller.isSheetOwner()) {
      // finishing the score sheet
      // double check this is want we want
      if (!confirm("Are you sure you want to close the score sheet")) return; // user wants to finish

      this.controller.endScoreSheet(); // reset the display

      this.resetDisplay();
    } else {
      // leaving the score sheet
      // double check this is want we want
      if (!confirm("Are you sure you want to leave the score sheet")) return; // user wants to finish

      this.controller.leave(); // reset the display

      this.resetDisplay();
    }
  };

  _proto.handleStartStopTimer = function handleStartStopTimer(event) {
    ssvLogger('start/pause timer');

    if (this.controller.isTimerGoing()) {
      this.controller.pauseTimer();
    } else {
      this.controller.startTimer();
    }
  };

  _proto.handleUserDrop = function handleUserDrop(event) {
    ssvLogger('drop event on current score sheet');

    if (this.controller.hasActiveScoreSheet() && this.controller.isSheetOwner()) {
      // @ts-ignore
      var draggedObjectJSON = event.dataTransfer.getData(this.applicationView.state.ui.draggable.draggableDataKeyId);
      var draggedObject = JSON.parse(draggedObjectJSON);
      ssvLogger(draggedObject);

      if (draggedObject[this.applicationView.state.ui.draggable.draggedType] === this.applicationView.state.ui.draggable.draggedTypeUser) {
        //add the user to the current chat if not already there
        this.controller.inviteUser(draggedObject.username);
      }
    }
  };

  _proto.resetDisplay = function resetDisplay() {
    this.table = null; // reset the display

    if (this.boardGameTitleEl) this.boardGameTitleEl.innerText = '';

    if (this.startStopTimer) {
      this.startStopTimer.innerHTML = 'Start ' + this.applicationView.state.ui.scoreSheet.dom.iconStart;
      this.startStopTimer.setAttribute("disabled", "true");
      _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_2__["default"].addRemoveClasses(this.startStopTimer, 'btn-warning', false);
      _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_2__["default"].addRemoveClasses(this.startStopTimer, 'btn-success', true);
    }

    if (this.timerEl) this.timerEl.innerText = this.createTimerDisplay(0);
    if (this.endOrLeaveEl) this.endOrLeaveEl.innerHTML = this.applicationView.state.ui.scoreSheet.dom.iconLeave;
    if (this.scoreSheetEl) _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_2__["default"].removeAllChildren(this.scoreSheetEl);
  };

  _proto.updateTimer = function updateTimer(time, isPaused) {
    if (isPaused === void 0) {
      isPaused = false;
    } // update the view


    ssvLogger("Updating timer " + time + " " + isPaused);

    if (this.startStopTimer) {
      if (isPaused) {
        this.startStopTimer.innerHTML = 'Start   ' + this.applicationView.state.ui.scoreSheet.dom.iconStart;
        _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_2__["default"].addRemoveClasses(this.startStopTimer, 'btn-warning', false);
        _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_2__["default"].addRemoveClasses(this.startStopTimer, 'btn-success', true);
      } else {
        this.startStopTimer.innerHTML = 'Pause   ' + this.applicationView.state.ui.scoreSheet.dom.iconInProgress;
        _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_2__["default"].addRemoveClasses(this.startStopTimer, 'btn-warning', true);
        _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_2__["default"].addRemoveClasses(this.startStopTimer, 'btn-success', false);
      }

      this.startStopTimer.removeAttribute("disabled");
    }

    if (this.timerEl) this.timerEl.innerText = this.createTimerDisplay(time);
  };

  _proto.stateChanged = function stateChanged(managerName, name, newValue) {
    if (name === this.config.stateNames.users) {
      // @ts-ignore
      var fastSearchEl = $("#" + this.config.ui.scoreSheet.dom.ssFastSearchUserNames); // what is my username?

      var myUsername = _Controller__WEBPACK_IMPORTED_MODULE_5__["default"].getLoggedInUsername(); // for each name, construct the patient details to display and the id referenced

      var fastSearchValues = [];
      newValue.forEach(function (item) {
        var searchValue = {
          label: item.username,
          value: item.id
        }; // @ts-ignore

        if (myUsername !== item.username) fastSearchValues.push(searchValue); // don't search for ourselves
      });
      fastSearchEl.autocomplete({
        source: fastSearchValues
      });
      fastSearchEl.autocomplete('option', {
        disabled: false,
        minLength: 1
      });
    } else {
      var scoreSheet = newValue;
      ssvLogger("Processing new state");
      ssvLogger(scoreSheet);
      if (this.startStopTimer) this.startStopTimer.removeAttribute("disabled"); // update the board game name

      if (this.boardGameTitleEl) this.boardGameTitleEl.innerText = "" + scoreSheet.boardGameName; // update the table

      if (this.table) {
        // process the data in the state change, will be array of array (rows) into what the table wants
        var tableData = []; // @ts-ignore

        scoreSheet.data.forEach(function (row, rowIndex) {
          row.forEach(function (column, columnIndex) {
            tableData.push([rowIndex, columnIndex, column]);
          });
        });
        ssvLogger("Table data is ");
        ssvLogger(tableData); // @ts-ignore

        this.table.setDataAtCell(tableData, _ScoreSheetController__WEBPACK_IMPORTED_MODULE_0__["ScoreSheetController"].SOURCE_View);
      } else {
        // create a new table
        if (this.scoreSheetEl) {
          var boardGame = this.controller.getSelectedBoardGame();

          if (boardGame) {
            scoreSheet.sheetLayoutOptions = _template_TemplateManager__WEBPACK_IMPORTED_MODULE_4__["TemplateManager"].getInstance().getScoreSheetTemplate(boardGame);
          }

          scoreSheet.sheetLayoutOptions.data = scoreSheet.data;
          this.table = new handsontable__WEBPACK_IMPORTED_MODULE_1__["default"](this.scoreSheetEl, scoreSheet.sheetLayoutOptions); // @ts-ignore

          this.table.addHook('afterChange', this.controller.userChangedValue);
        }
      } // update the timer


      if (this.timerEl) this.timerEl.innerText = this.createTimerDisplay(scoreSheet.timer);
    }
  };

  _proto.getTableData = function getTableData() {
    if (this.table) {
      return this.table.getData();
    } else {
      return [];
    }
  };

  _proto.stateChangedItemAdded = function stateChangedItemAdded(managerName, name, itemAdded) {
    this.stateChanged(managerName, name, this.stateManager.getStateByName(name));
  };

  _proto.stateChangedItemRemoved = function stateChangedItemRemoved(managerName, name, itemRemoved) {};

  _proto.stateChangedItemUpdated = function stateChangedItemUpdated(managerName, name, itemUpdated, itemNewValue) {};

  _proto.createTimerDisplay = function createTimerDisplay(timer) {
    var result = '';

    if (timer === 0) {
      result = '00:00';
    } else {
      if (timer >= 60) {
        var hours = Math.floor(timer / 3600);
        var minutes = Math.floor(timer / 60);
        var seconds = timer - hours * 3600 - minutes * 60;

        if (hours > 0) {
          result += hours + ":";
        }

        if (minutes > 0) {
          if (minutes < 10) {
            result += "0" + minutes + ":";
          } else {
            result += minutes + ":";
          }
        } else {
          result += '00:';
        }

        if (seconds > 0) {
          if (seconds < 10) {
            result += "0" + seconds;
          } else {
            result += "" + seconds;
          }
        } else {
          result += '00';
        }
      } else {
        result = "00:";

        if (timer > 0) {
          if (timer < 10) {
            result += "0" + timer;
          } else {
            result += "" + timer;
          }
        } else {
          result += '00';
        }
      }
    }

    return result;
  };

  return ScoreSheetView;
}();

/***/ }),

/***/ "./src/component/SidebarView.ts":
/*!**************************************!*\
  !*** ./src/component/SidebarView.ts ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _AbstractView__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractView */ "./src/component/AbstractView.ts");
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;

  _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}



var SidebarView = /*#__PURE__*/function (_AbstractView) {
  _inheritsLoose(SidebarView, _AbstractView);

  function SidebarView(applicationView, htmlDocument, uiConfig, uiPrefs, stateManager) {
    var _this;

    _this = _AbstractView.call(this, applicationView, htmlDocument, uiConfig, uiPrefs, stateManager) || this; // event handlers

    _this.eventHide = _this.eventHide.bind(_assertThisInitialized(_this));
    _this.eventShow = _this.eventShow.bind(_assertThisInitialized(_this));
    return _this;
  }

  var _proto = SidebarView.prototype;

  _proto.onDocumentLoaded = function onDocumentLoaded() {
    // this should be called once at startup
    // hide the side bar panel
    this.eventHide(null); // add the event listener for the close button

    var sidePanelEl = this.document.getElementById(this.uiConfig.dom.sideBarId);
    if (sidePanelEl === null) return;
    var closeButtonEl = sidePanelEl.querySelector('.close');

    if (closeButtonEl) {
      closeButtonEl.addEventListener('click', this.eventHide);
    }
  };

  _proto.eventHide = function eventHide(event) {
    if (event) event.preventDefault();
    this.showHide('0%');
  };

  _proto.eventShow = function eventShow(event) {
    //414,768,1024
    var size = this.uiPrefs.view.expandedSize;

    if (window.innerWidth < 769) {
      size = '50%';
    }

    if (window.innerWidth < 415) {
      size = '100%';
    }

    this.showHide(size);
  };

  _proto.showHide = function showHide(newStyleValue) {
    var sidePanelEl = this.document.getElementById(this.uiConfig.dom.sideBarId);
    if (sidePanelEl === null) return;

    switch (this.uiPrefs.view.location) {
      case 'left':
        {
          sidePanelEl.style.width = newStyleValue;
          break;
        }

      case 'right':
        {
          sidePanelEl.style.width = newStyleValue;
          break;
        }

      case 'bottom':
        {
          sidePanelEl.style.height = newStyleValue;
          break;
        }

      case 'top':
        {
          sidePanelEl.style.height = newStyleValue;
          break;
        }
    }
  };

  return SidebarView;
}(_AbstractView__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (SidebarView);

/***/ }),

/***/ "./src/component/UserSearchSidebarView.ts":
/*!************************************************!*\
  !*** ./src/component/UserSearchSidebarView.ts ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _SidebarView__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SidebarView */ "./src/component/SidebarView.ts");
/* harmony import */ var _util_EqualityFunctions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/EqualityFunctions */ "./src/util/EqualityFunctions.ts");
/* harmony import */ var _socket_NotificationController__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../socket/NotificationController */ "./src/socket/NotificationController.ts");
/* harmony import */ var _Controller__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Controller */ "./src/Controller.ts");
/* harmony import */ var _state_BrowserStorageStateManager__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../state/BrowserStorageStateManager */ "./src/state/BrowserStorageStateManager.ts");
/* harmony import */ var _socket_ChatManager__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../socket/ChatManager */ "./src/socket/ChatManager.ts");
/* harmony import */ var _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../util/BrowserUtil */ "./src/util/BrowserUtil.ts");
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;

  _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}









var vLogger = debug__WEBPACK_IMPORTED_MODULE_0___default()('user-search-sidebar');
var vLoggerDetail = debug__WEBPACK_IMPORTED_MODULE_0___default()('user-search-sidebar:detail');

var UserSearchSidebarView = /*#__PURE__*/function (_SidebarView) {
  _inheritsLoose(UserSearchSidebarView, _SidebarView); // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  // @ts-ignore


  function UserSearchSidebarView(applicationView, htmlDocument, stateManager) {
    var _this;

    _this = _SidebarView.call(this, applicationView, htmlDocument, applicationView.state.ui.userSearchSideBar, applicationView.state.uiPrefs.userSearchSideBar, stateManager) || this;
    _this.config = applicationView.state;
    _this.loggedInUsers = []; // handler binding

    _this.updateView = _this.updateView.bind(_assertThisInitialized(_this));
    _this.eventClickItem = _this.eventClickItem.bind(_assertThisInitialized(_this));
    _this.eventUserSelected = _this.eventUserSelected.bind(_assertThisInitialized(_this));
    _this.handleLoggedInUsersUpdated = _this.handleLoggedInUsersUpdated.bind(_assertThisInitialized(_this));
    _this.handleFavouriteUserLoggedIn = _this.handleFavouriteUserLoggedIn.bind(_assertThisInitialized(_this));
    _this.handleFavouriteUserLoggedOut = _this.handleFavouriteUserLoggedOut.bind(_assertThisInitialized(_this));
    _this.handleFavouriteUsersChanged = _this.handleFavouriteUsersChanged.bind(_assertThisInitialized(_this));
    _this.handleBlockedUsersChanged = _this.handleBlockedUsersChanged.bind(_assertThisInitialized(_this));
    _this.handleLoggedInUsersUpdated = _this.handleLoggedInUsersUpdated.bind(_assertThisInitialized(_this));
    _this.handleFavouriteUserDrop = _this.handleFavouriteUserDrop.bind(_assertThisInitialized(_this));
    _this.handleBlockedUserDrop = _this.handleBlockedUserDrop.bind(_assertThisInitialized(_this)); // register state change listening

    stateManager.addChangeListenerForName(_this.config.stateNames.users, _assertThisInitialized(_this));
    _this.localisedSM = new _state_BrowserStorageStateManager__WEBPACK_IMPORTED_MODULE_5__["default"](true);

    _this.localisedSM.addChangeListenerForName(_this.config.stateNames.recentUserSearches, _assertThisInitialized(_this));

    _socket_NotificationController__WEBPACK_IMPORTED_MODULE_3__["NotificationController"].getInstance().addUserListener(_assertThisInitialized(_this));
    vLogger(_this.localisedSM.getStateByName(_this.config.stateNames.recentUserSearches));
    return _this;
  }

  var _proto = UserSearchSidebarView.prototype;

  _proto.handleFavouriteUserDrop = function handleFavouriteUserDrop(event) {
    vLogger('drop event on favourites'); // @ts-ignore

    var draggedObjectJSON = event.dataTransfer.getData(this.config.ui.draggable.draggableDataKeyId);
    var draggedObject = JSON.parse(draggedObjectJSON);
    vLogger(draggedObject);

    if (draggedObject[this.config.ui.draggable.draggedType] === this.config.ui.draggable.draggedTypeUser) {
      switch (draggedObject[this.config.ui.draggable.draggedFrom]) {
        case this.config.ui.draggable.draggedFromUserSearch:
          {
            // we know we have dragged a user from the user search to our favorites and dropped it
            // is this user already in the favourites?
            if (_socket_ChatManager__WEBPACK_IMPORTED_MODULE_6__["ChatManager"].getInstance().isUserInFavouriteList(draggedObject.username)) {
              vLogger(draggedObject.username + " already in favourite list, ignoring");
              return;
            } // ok, so we have a new user to add to the favourite list
            // add the user to the Chat Manager and we should get an event about it


            _socket_ChatManager__WEBPACK_IMPORTED_MODULE_6__["ChatManager"].getInstance().addUserToFavouriteList(draggedObject.username);
            break;
          }
      }
    }
  };

  _proto.handleBlockedUserDrop = function handleBlockedUserDrop(event) {
    vLogger('drop event on blocked users'); // @ts-ignore

    var draggedObjectJSON = event.dataTransfer.getData(this.config.ui.draggable.draggableDataKeyId);
    var draggedObject = JSON.parse(draggedObjectJSON);
    vLogger(draggedObject);

    if (draggedObject[this.config.ui.draggable.draggedType] === this.config.ui.draggable.draggedTypeUser) {
      switch (draggedObject[this.config.ui.draggable.draggedFrom]) {
        case this.config.ui.draggable.draggedFromUserSearch:
          {
            // we know we have dragged a user from the user search to our blocked users and dropped it
            // is this user already in the favourites?
            if (_socket_ChatManager__WEBPACK_IMPORTED_MODULE_6__["ChatManager"].getInstance().isUserInBlockedList(draggedObject.username)) {
              vLogger(draggedObject.username + " already in blocked list, ignoring");
              return;
            } // ok, so we have a new user to add to the favourite list
            // add the user to the Chat Manager and we should get an event about it


            _socket_ChatManager__WEBPACK_IMPORTED_MODULE_6__["ChatManager"].getInstance().addUserToBlockedList(draggedObject.username);
            break;
          }
      }
    }
  };

  _proto.handleLoggedInUsersUpdated = function handleLoggedInUsersUpdated(usernames) {
    vLogger("Received new list of users who are logged in ");
    vLogger(usernames);
    this.loggedInUsers = usernames;
    this.reRenderView();
  };

  _proto.handleFavouriteUserLoggedIn = function handleFavouriteUserLoggedIn(username) {
    vLogger("Handle Favourite User " + username + " logged in");
    this.reRenderView();
  };

  _proto.handleFavouriteUserLoggedOut = function handleFavouriteUserLoggedOut(username) {
    vLogger("Handle Favourite User " + username + " logged in");
    this.reRenderView();
  };

  _proto.handleFavouriteUsersChanged = function handleFavouriteUsersChanged(usernames) {
    vLogger("Handle Favourite Users changed to " + usernames);
    this.reRenderView();
  };

  _proto.handleBlockedUsersChanged = function handleBlockedUsersChanged(usernames) {
    vLogger("Handle Blocked Users changed to " + usernames);
    this.reRenderView();
  };

  _proto.onDocumentLoaded = function onDocumentLoaded() {
    _SidebarView.prototype.onDocumentLoaded.call(this); // @ts-ignore


    var fastSearchEl = $("#" + this.uiConfig.dom.extra.fastSearchInputId);
    fastSearchEl.on('autocompleteselect', this.eventUserSelected); // ok lets add the favourite users area and event handling for that now
    // @ts-ignore

    this.favUsersDropZone = document.getElementById(this.uiConfig.dom.favouriteUsersDropZone);
    this.favUsersDropZone.addEventListener('dragover', function (event) {
      vLogger('Dragged over');
      event.preventDefault();
    });
    this.favUsersDropZone.addEventListener('drop', this.handleFavouriteUserDrop); // @ts-ignore

    this.favUsersDiv = document.getElementById(this.uiConfig.dom.favouriteUsersId); // ok lets add the favourite users area and event handling for that now
    // @ts-ignore

    this.blockedUsersDropZone = document.getElementById(this.uiConfig.dom.blockedUsersDropZone);
    this.blockedUsersDropZone.addEventListener('dragover', function (event) {
      vLogger('Dragged over');
      event.preventDefault();
    });
    this.blockedUsersDropZone.addEventListener('drop', this.handleBlockedUserDrop); // @ts-ignore

    this.blockedUsersDiv = document.getElementById(this.uiConfig.dom.blockedUsersId);
    this.renderFavouriteUsers();
    this.renderBlockedUsers();
  };

  _proto.getIdForStateItem = function getIdForStateItem(name, item) {
    return item.id;
  };

  _proto.getLegacyIdForStateItem = function getLegacyIdForStateItem(name, item) {
    return item.id;
  };

  _proto.getDisplayValueForStateItem = function getDisplayValueForStateItem(name, item) {
    return item.username;
  };

  _proto.getModifierForStateItem = function getModifierForStateItem(name, item) {
    var result = 'normal';
    vLoggerDetail("Checking for item modifiers");
    vLoggerDetail(item); // if the user is currently logged out make the item inactive

    if (!_socket_ChatManager__WEBPACK_IMPORTED_MODULE_6__["ChatManager"].getInstance().isUserLoggedIn(item.username)) {
      result = 'inactive';
    }

    return result;
  };

  _proto.getSecondaryModifierForStateItem = function getSecondaryModifierForStateItem(name, item) {
    var result = 'normal';
    vLoggerDetail("Checking for item secondary modifiers " + item.username); // if the user is in the black list then show warning and a favourite user is highlighted

    if (_socket_NotificationController__WEBPACK_IMPORTED_MODULE_3__["NotificationController"].getInstance().isFavouriteUser(item.username)) {
      vLoggerDetail("is favourite");
      result = 'active';
    }

    if (_socket_NotificationController__WEBPACK_IMPORTED_MODULE_3__["NotificationController"].getInstance().isBlockedUser(item.username)) {
      vLoggerDetail("is blocked");
      result = 'warning';
    }

    return result;
  };

  _proto.eventClickItem = function eventClickItem(event) {
    event.preventDefault();
    event.stopPropagation();
    console.log(event.target); // @ts-ignore

    var userId = event.target.getAttribute(this.uiConfig.dom.resultDataKeyId); // @ts-ignore

    var dataSource = event.target.getAttribute(this.uiConfig.dom.resultDataSourceId);

    if (dataSource === this.uiConfig.dom.resultDataSourceBlockedUsers) {
      vLoggerDetail("Blocked user clicked - not activating");
      return;
    } // @ts-ignore


    vLoggerDetail("User " + event.target + " with id " + userId + " clicked from " + dataSource);
    var user = this.stateManager.findItemInState(this.config.stateNames.users, {
      id: parseInt(userId)
    }, _util_EqualityFunctions__WEBPACK_IMPORTED_MODULE_2__["isSame"]);
    vLogger(user);
    var roomName = _socket_NotificationController__WEBPACK_IMPORTED_MODULE_3__["NotificationController"].getInstance().startChatWithUser(user.username);
    this.applicationView.handleShowChat(event, roomName);
  };

  _proto.eventUserSelected = function eventUserSelected(event, ui) {
    event.preventDefault();
    event.stopPropagation();
    vLogger("User " + ui.item.label + " with id " + ui.item.value + " selected"); // @ts-ignore

    event.target.innerText = ''; // add the selected user to the recent user searches

    if (this.localisedSM.isItemInState(this.config.stateNames.recentUserSearches, {
      id: ui.item.value
    }, _util_EqualityFunctions__WEBPACK_IMPORTED_MODULE_2__["isSame"])) return;
    var recentUserSearches = this.localisedSM.getStateByName(this.config.stateNames.recentUserSearches);
    vLogger("saved searches too long? " + this.config.controller.dataLimit.recentUserSearches);

    if (recentUserSearches.length >= this.config.controller.dataLimit.recentUserSearches) {
      vLogger('saved searches too long - removing first'); // remove the first item from recent searches

      var item = recentUserSearches.shift();
      this.localisedSM.removeItemFromState(this.config.stateNames.recentUserSearches, item, _util_EqualityFunctions__WEBPACK_IMPORTED_MODULE_2__["isSame"], true);
    } // save the searches


    this.localisedSM.addNewItemToState(this.config.stateNames.recentUserSearches, {
      id: ui.item.value,
      username: ui.item.label
    }, true);
  };

  _proto.reRenderView = function reRenderView() {
    this.updateView(this.config.stateNames.recentUserSearches, this.localisedSM.getStateByName(this.config.stateNames.recentUserSearches));
    this.renderFavouriteUsers();
    this.renderBlockedUsers();
  };

  _proto.updateView = function updateView(name, newState) {
    if (name === this.config.stateNames.recentUserSearches) {
      vLogger("Updating for recent searches");
      newState = this.localisedSM.getStateByName(this.config.stateNames.recentUserSearches);
      vLogger(newState);
      this.createResultsForState(name, newState);
    }

    if (name === this.config.stateNames.users) {
      // load the search names into the search field
      // what is my username?
      var myUsername = _Controller__WEBPACK_IMPORTED_MODULE_4__["default"].getLoggedInUsername(); // @ts-ignore

      var fastSearchEl = $("#" + this.uiConfig.dom.extra.fastSearchInputId); // for each name, construct the patient details to display and the id referenced

      var fastSearchValues = [];
      newState.forEach(function (item) {
        var searchValue = {
          label: item.username,
          value: item.id
        };
        if (myUsername !== item.username) fastSearchValues.push(searchValue); // don't search for ourselves
      });
      fastSearchEl.autocomplete({
        source: fastSearchValues
      });
      fastSearchEl.autocomplete('option', {
        disabled: false,
        minLength: 1
      });
    }
  };

  _proto.getDragData = function getDragData(event) {
    // use the actual id to pass the user to the droppable target
    // @ts-ignore
    var userId = event.target.getAttribute(this.uiConfig.dom.resultDataKeyId); // @ts-ignore

    vLoggerDetail("User " + event.target.innerText + " with id " + userId + " dragging");
    var user = this.stateManager.findItemInState(this.config.stateNames.users, {
      id: parseInt(userId)
    }, _util_EqualityFunctions__WEBPACK_IMPORTED_MODULE_2__["isSame"]);
    vLoggerDetail(user);
    user[this.config.ui.draggable.draggedType] = this.config.ui.draggable.draggedTypeUser;
    user[this.config.ui.draggable.draggedFrom] = this.config.ui.draggable.draggedFromUserSearch;
    return user;
  };

  _proto.deleteFavouriteUser = function deleteFavouriteUser(user) {
    // @ts-ignore
    vLogger("Favourite user " + user.username + " with id " + user.id + " deleted - removing");
    _socket_ChatManager__WEBPACK_IMPORTED_MODULE_6__["ChatManager"].getInstance().removeUserFromFavouriteList(user.username);
  };

  _proto.deleteBlockedUser = function deleteBlockedUser(user) {
    // @ts-ignore
    vLogger("Blocked user " + user.username + " with id " + user.id + " deleted - removing");
    _socket_ChatManager__WEBPACK_IMPORTED_MODULE_6__["ChatManager"].getInstance().removeUserFromBlockedList(user.username);
  };

  _proto.deleteRecentSearchUser = function deleteRecentSearchUser(user) {
    // @ts-ignore
    vLogger("Recent search user " + user.username + " with id " + user.id + " deleted - removing");
    this.localisedSM.removeItemFromState(this.config.stateNames.recentUserSearches, user, _util_EqualityFunctions__WEBPACK_IMPORTED_MODULE_2__["isSame"], true);
  };

  _proto.eventDeleteClickItem = function eventDeleteClickItem(event) {
    event.preventDefault();
    event.stopPropagation(); // @ts-ignore

    var userId = event.target.getAttribute(this.uiConfig.dom.resultDataKeyId); // @ts-ignore

    var dataSource = event.target.getAttribute(this.uiConfig.dom.resultDataSourceId); // @ts-ignore

    vLoggerDetail("User " + event.target + " with id " + userId + " delete clicked from " + dataSource);
    var user = this.stateManager.findItemInState(this.config.stateNames.users, {
      id: parseInt(userId)
    }, _util_EqualityFunctions__WEBPACK_IMPORTED_MODULE_2__["isSame"]);
    vLogger(user);

    if (user) {
      switch (dataSource) {
        case this.uiConfig.dom.resultDataSourceFavUsers:
          {
            this.deleteFavouriteUser(user);
            break;
          }

        case this.uiConfig.dom.resultDataSourceBlockedUsers:
          {
            this.deleteBlockedUser(user);
            break;
          }

        case this.uiConfig.dom.resultDataSourceValue:
          {
            this.deleteRecentSearchUser(user);
            break;
          }
      }
    }
  };

  _proto.getBadgeValue = function getBadgeValue(name, item) {
    return 0;
  };

  _proto.getBackgroundImage = function getBackgroundImage(name, item) {
    return "";
  };

  _proto.eventAction1Clicked = function eventAction1Clicked(event) {
    _SidebarView.prototype.eventAction1Clicked.call(this, event); // add this user to the favourites
    // @ts-ignore


    var userId = event.target.getAttribute(this.uiConfig.dom.resultDataKeyId);
    var user = this.stateManager.findItemInState(this.config.stateNames.users, {
      id: parseInt(userId)
    }, _util_EqualityFunctions__WEBPACK_IMPORTED_MODULE_2__["isSame"]);

    if (user) {
      if (_socket_ChatManager__WEBPACK_IMPORTED_MODULE_6__["ChatManager"].getInstance().isUserInFavouriteList(user.username)) {
        vLogger(user.username + " already in favourite list, ignoring");
        return;
      } // ok, so we have a new user to add to the favourite list
      // add the user to the Chat Manager and we should get an event about it


      _socket_ChatManager__WEBPACK_IMPORTED_MODULE_6__["ChatManager"].getInstance().addUserToFavouriteList(user.username);
    }
  };

  _proto.eventAction2Clicked = function eventAction2Clicked(event) {
    _SidebarView.prototype.eventAction2Clicked.call(this, event); // add this user to the blocked list
    // @ts-ignore


    var userId = event.target.getAttribute(this.uiConfig.dom.resultDataKeyId);
    var user = this.stateManager.findItemInState(this.config.stateNames.users, {
      id: parseInt(userId)
    }, _util_EqualityFunctions__WEBPACK_IMPORTED_MODULE_2__["isSame"]);

    if (user) {
      if (_socket_ChatManager__WEBPACK_IMPORTED_MODULE_6__["ChatManager"].getInstance().isUserInBlockedList(user.username)) {
        vLogger(user.username + " already in blocked list, ignoring");
        return;
      } // ok, so we have a new user to add to the blocked list
      // add the user to the Chat Manager and we should get an event about it


      _socket_ChatManager__WEBPACK_IMPORTED_MODULE_6__["ChatManager"].getInstance().addUserToBlockedList(user.username);
    }
  };

  _proto.renderFavouriteUsers = function renderFavouriteUsers() {
    var _this2 = this;

    var usernames = _socket_ChatManager__WEBPACK_IMPORTED_MODULE_6__["ChatManager"].getInstance().getFavouriteUserList();
    if (this.favUsersDiv) _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_7__["default"].removeAllChildren(this.favUsersDiv);
    usernames.forEach(function (username) {
      // find the user in the state manager
      var user = _this2.stateManager.findItemInState(_this2.config.stateNames.users, {
        username: username
      }, _util_EqualityFunctions__WEBPACK_IMPORTED_MODULE_2__["isSameUsername"]);

      if (user) {
        var childElement = _this2.createResultForItem(_this2.config.stateNames.users, user, _this2.uiConfig.dom.resultDataSourceFavUsers);

        childElement.addEventListener('click', _this2.eventClickItem);
        childElement.setAttribute('draggable', 'true');
        childElement.addEventListener('dragstart', _this2.eventStartDrag);

        _this2.favUsersDiv.appendChild(childElement);
      }
    });
  };

  _proto.renderBlockedUsers = function renderBlockedUsers() {
    var _this3 = this;

    var usernames = _socket_ChatManager__WEBPACK_IMPORTED_MODULE_6__["ChatManager"].getInstance().getBlockedUserList();
    if (this.blockedUsersDiv) _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_7__["default"].removeAllChildren(this.blockedUsersDiv);
    usernames.forEach(function (username) {
      // find the user in the state manager
      var user = _this3.stateManager.findItemInState(_this3.config.stateNames.users, {
        username: username
      }, _util_EqualityFunctions__WEBPACK_IMPORTED_MODULE_2__["isSameUsername"]);

      if (user) {
        var childElement = _this3.createResultForItem(_this3.config.stateNames.users, user, _this3.uiConfig.dom.resultDataSourceBlockedUsers);

        childElement.setAttribute('draggable', 'false');
        childElement.addEventListener('dragstart', function (event) {
          event.preventDefault();
        });

        _this3.blockedUsersDiv.appendChild(childElement);
      }
    });
  };

  return UserSearchSidebarView;
}(_SidebarView__WEBPACK_IMPORTED_MODULE_1__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (UserSearchSidebarView);

/***/ }),

/***/ "./src/network/ApiUtil.ts":
/*!********************************!*\
  !*** ./src/network/ApiUtil.ts ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_0__);
function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}


var apiLogger = debug__WEBPACK_IMPORTED_MODULE_0___default()('api-ts');

var ApiUtil = /*#__PURE__*/function () {
  function ApiUtil() {}

  var _proto = ApiUtil.prototype;

  _proto.postFetchJSON = /*#__PURE__*/function () {
    var _postFetchJSON = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(url, query) {
      var postParameters, response;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              postParameters = {
                method: "POST",
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  query: query
                })
              };
              _context.next = 3;
              return fetch(url, postParameters);

            case 3:
              response = _context.sent;
              return _context.abrupt("return", response.json());

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function postFetchJSON(_x, _x2) {
      return _postFetchJSON.apply(this, arguments);
    }

    return postFetchJSON;
  }()
  /*
      Utility function for calling JSON POST requests
      Parameters:
      1.  URL to send the POST request too;
      2.  parameters object whose attribute (name/values) are the request parameters; and
      3.  A function to receive the results when the fetch has completed
          The callback function should have the following form
          callback (jsonDataReturned, httpStatusCode)
          a)  A successful fetch will return the JSON data in the first parameter and a status code of the server
          b)  Parameters that cannot be converted to JSON format will give a null data and code 404
          c)  A server error will give that code and no data
    */
  ;

  _proto.apiFetchJSONWithPost = function apiFetchJSONWithPost(request) {
    apiLogger("Executing fetch with URL " + request.originalRequest.url + " with body " + request.originalRequest.params);

    try {
      JSON.stringify(request.originalRequest.params);
    } catch (error) {
      apiLogger('Unable to convert parameters to JSON');
      apiLogger(request.originalRequest.params, 100);
      request.callback(null, 404, request.queueType, request.requestId);
    }

    var postParameters = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(_extends({}, request.originalRequest.params))
    };
    this.fetchJSON(request.originalRequest.url, postParameters, request.callback, request.queueType, request.requestId);
  };

  _proto.apiFetchJSONWithGet = function apiFetchJSONWithGet(request) {
    apiLogger("Executing GET fetch with URL " + request.originalRequest.url + " with id " + request.originalRequest.params.id);
    var getParameters = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    };
    if (request.originalRequest.params.id) request.originalRequest.url += "/" + request.originalRequest.params.id;
    this.fetchJSON(request.originalRequest.url, getParameters, request.callback, request.queueType, request.requestId);
  };

  _proto.apiFetchJSONWithDelete = function apiFetchJSONWithDelete(request) {
    apiLogger("Executing DELETE fetch with URL " + request.originalRequest.url + " with id " + request.originalRequest.params.id);
    var delParameters = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    };
    if (request.originalRequest.params.id) request.originalRequest.url += "/" + request.originalRequest.params.id;
    this.fetchJSON(request.originalRequest.url, delParameters, request.callback, request.queueType, request.requestId);
  };

  _proto.apiFetchJSONWithPut = function apiFetchJSONWithPut(request) {
    apiLogger("Executing PUT fetch with URL " + request.originalRequest.url + " with id " + request.originalRequest.params.id);
    var putParameters = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(_extends({}, request.originalRequest.params))
    };
    if (request.originalRequest.params.id) request.originalRequest.url += "/" + request.originalRequest.params.id;
    this.fetchJSON(request.originalRequest.url, putParameters, request.callback, request.queueType, request.requestId);
  };

  _proto.fetchJSON = function fetchJSON(url, parameters, callback, queueType, requestId) {
    fetch(url, parameters).then(function (response) {
      apiLogger("Response code was " + response.status);

      if (response.status >= 200 && response.status <= 299) {
        return response.json();
      }

      if (response.status === 400) {
        apiLogger(response.json());
      }
    }).then(function (data) {
      apiLogger(data);
      callback(data, 200, queueType, requestId);
    }).catch(function (error) {
      apiLogger(error);
      callback(null, 500, queueType, requestId);
    });
  };

  return ApiUtil;
}();

var apiUtil = new ApiUtil();
/* harmony default export */ __webpack_exports__["default"] = (apiUtil);

/***/ }),

/***/ "./src/network/DownloadManager.ts":
/*!****************************************!*\
  !*** ./src/network/DownloadManager.ts ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ApiUtil__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ApiUtil */ "./src/network/ApiUtil.ts");
/* harmony import */ var _util_UUID__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/UUID */ "./src/util/UUID.ts");
/* harmony import */ var _Types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Types */ "./src/network/Types.ts");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_3__);
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}





var dlLogger = debug__WEBPACK_IMPORTED_MODULE_3___default()('api-ts');

var DownloadManager = /*#__PURE__*/function () {
  function DownloadManager() {
    this.backgroundQueue = [];
    this.priorityQueue = [];
    this.inProgress = [];
    this.backgroundChangeListener = null;
    this.priorityChangeListener = null;
    this.callbackForQueueRequest = this.callbackForQueueRequest.bind(this);
  }

  var _proto = DownloadManager.prototype;

  _proto.setBackgroundChangeListener = function setBackgroundChangeListener(uiChangeListener) {
    this.backgroundChangeListener = uiChangeListener;
  };

  _proto.setPriorityChangeListener = function setPriorityChangeListener(uiChangeListener) {
    this.priorityChangeListener = uiChangeListener;
  };

  _proto.getPriorityQueueCount = function getPriorityQueueCount() {
    return this.priorityQueue.length;
  };

  _proto.getBackgroundQueueCount = function getBackgroundQueueCount() {
    return this.backgroundQueue.length;
  };

  _proto.addQLApiRequest = function addQLApiRequest(url, query, variables, callback, state, isPriority) {
    if (isPriority === void 0) {
      isPriority = false;
    }

    var request = {
      url: url,
      type: _Types__WEBPACK_IMPORTED_MODULE_2__["RequestType"].POST,
      params: {
        query: query,
        variables: variables
      },
      callback: callback,
      associatedStateName: state
    };
    downloader.addApiRequest(request, isPriority);
  };

  _proto.addQLMutationRequest = function addQLMutationRequest(url, mutation, variables, callback, state, isPriority) {
    if (isPriority === void 0) {
      isPriority = false;
    }

    var request = {
      url: url,
      type: _Types__WEBPACK_IMPORTED_MODULE_2__["RequestType"].POST,
      params: {
        mutation: mutation,
        variables: variables
      },
      callback: callback,
      associatedStateName: state
    };
    downloader.addApiRequest(request, isPriority);
  };

  _proto.addApiRequest = function addApiRequest(jsonRequest, isPriority) {
    if (isPriority === void 0) {
      isPriority = false;
    } // add a new requestId to the request for future tracking


    var requestId = _util_UUID__WEBPACK_IMPORTED_MODULE_1__["default"].getUniqueId();
    dlLogger("Download Manger: Adding Queue Request " + requestId);
    dlLogger(jsonRequest, 200);

    if (isPriority) {
      var _managerRequest = {
        originalRequest: jsonRequest,
        requestId: requestId,
        queueType: _Types__WEBPACK_IMPORTED_MODULE_2__["queueType"].PRIORITY,
        callback: this.callbackForQueueRequest
      };
      this.priorityQueue.push(_managerRequest);
      if (this.priorityChangeListener) this.priorityChangeListener.handleEventAddToQueue();
    } else {
      var _managerRequest2 = {
        originalRequest: jsonRequest,
        requestId: requestId,
        queueType: _Types__WEBPACK_IMPORTED_MODULE_2__["queueType"].BACKGROUND,
        callback: this.callbackForQueueRequest
      };
      this.backgroundQueue.push(_managerRequest2);
      if (this.backgroundChangeListener) this.backgroundChangeListener.handleEventAddToQueue();
    }

    this.processQueues();
  };

  _proto.processPriorityQueue = /*#__PURE__*/function () {
    var _processPriorityQueue = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var queueItem;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              queueItem = this.priorityQueue.shift();
              if (queueItem !== undefined) this.inProgress.push(queueItem);
              if (queueItem !== undefined) this.initiateFetchForQueueItem(queueItem);

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function processPriorityQueue() {
      return _processPriorityQueue.apply(this, arguments);
    }

    return processPriorityQueue;
  }();

  _proto.processBackgroundQueue = /*#__PURE__*/function () {
    var _processBackgroundQueue = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var queueItem;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              queueItem = this.backgroundQueue.shift();
              if (queueItem !== undefined) this.inProgress.push(queueItem);
              if (queueItem !== undefined) this.initiateFetchForQueueItem(queueItem);

            case 3:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function processBackgroundQueue() {
      return _processBackgroundQueue.apply(this, arguments);
    }

    return processBackgroundQueue;
  }();

  _proto.processQueues = /*#__PURE__*/function () {
    var _processQueues = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      var totalQueuedItems;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              totalQueuedItems = this.priorityQueue.length + this.backgroundQueue.length;

            case 1:
              if (!(totalQueuedItems > 0)) {
                _context3.next = 14;
                break;
              }

              dlLogger("Download Manager: processing queue, items remaining " + totalQueuedItems); // priority queue takes priority

              if (!(this.priorityQueue.length > 0)) {
                _context3.next = 8;
                break;
              }

              _context3.next = 6;
              return this.processPriorityQueue();

            case 6:
              _context3.next = 11;
              break;

            case 8:
              if (!(this.backgroundQueue.length > 0)) {
                _context3.next = 11;
                break;
              }

              _context3.next = 11;
              return this.processBackgroundQueue();

            case 11:
              totalQueuedItems = this.priorityQueue.length + this.backgroundQueue.length;
              _context3.next = 1;
              break;

            case 14:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function processQueues() {
      return _processQueues.apply(this, arguments);
    }

    return processQueues;
  }();

  _proto.callbackForQueueRequest = function callbackForQueueRequest(jsonData, httpStatus, queueId, requestId) {
    // let the listeners know about the completion
    if (queueId === _Types__WEBPACK_IMPORTED_MODULE_2__["queueType"].PRIORITY) {
      // priority
      if (this.priorityChangeListener) this.priorityChangeListener.handleEventRemoveFromQueue();
    } else if (this.backgroundChangeListener) this.backgroundChangeListener.handleEventRemoveFromQueue();

    dlLogger("Download Manager: received callback for queue " + queueId + " request " + requestId + " with status " + httpStatus); // find the item in the in progress

    var foundIndex = this.inProgress.findIndex(function (element) {
      return element.requestId === requestId;
    });

    if (foundIndex >= 0) {
      // remove from in progress
      var queueItem = this.inProgress[foundIndex];
      this.inProgress.splice(foundIndex, 1);
      dlLogger(queueItem);
      dlLogger("Download Manager: finished for queue item " + queueItem.requestId); // let the callback function know

      queueItem.originalRequest.callback(jsonData, httpStatus, queueItem.originalRequest.associatedStateName);
    }
  };

  _proto.initiateFetchForQueueItem = function initiateFetchForQueueItem(item) {
    dlLogger("Download Manager: initiating fetch for queue item " + item.requestId);
    dlLogger(item);

    if (item.originalRequest.url !== null && item.originalRequest.params != null && item.originalRequest.callback != null) {
      switch (item.originalRequest.type) {
        case _Types__WEBPACK_IMPORTED_MODULE_2__["RequestType"].POST:
          {
            _ApiUtil__WEBPACK_IMPORTED_MODULE_0__["default"].apiFetchJSONWithPost(item);
            break;
          }

        case _Types__WEBPACK_IMPORTED_MODULE_2__["RequestType"].GET:
          {
            _ApiUtil__WEBPACK_IMPORTED_MODULE_0__["default"].apiFetchJSONWithGet(item);
            break;
          }

        case _Types__WEBPACK_IMPORTED_MODULE_2__["RequestType"].DELETE:
          {
            _ApiUtil__WEBPACK_IMPORTED_MODULE_0__["default"].apiFetchJSONWithDelete(item);
            break;
          }

        case _Types__WEBPACK_IMPORTED_MODULE_2__["RequestType"].PUT:
          {
            _ApiUtil__WEBPACK_IMPORTED_MODULE_0__["default"].apiFetchJSONWithPut(item);
            break;
          }
      }
    }
  };

  return DownloadManager;
}();

var downloader = new DownloadManager();
/* harmony default export */ __webpack_exports__["default"] = (downloader);

/***/ }),

/***/ "./src/network/Types.ts":
/*!******************************!*\
  !*** ./src/network/Types.ts ***!
  \******************************/
/*! exports provided: RequestType, queueType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RequestType", function() { return RequestType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "queueType", function() { return queueType; });
var RequestType;

(function (RequestType) {
  RequestType[RequestType["POST"] = 0] = "POST";
  RequestType[RequestType["GET"] = 1] = "GET";
  RequestType[RequestType["PUT"] = 2] = "PUT";
  RequestType[RequestType["DELETE"] = 3] = "DELETE";
})(RequestType || (RequestType = {}));

var queueType;

(function (queueType) {
  queueType[queueType["PRIORITY"] = 0] = "PRIORITY";
  queueType[queueType["BACKGROUND"] = 1] = "BACKGROUND";
})(queueType || (queueType = {}));

/***/ }),

/***/ "./src/notification/BootstrapNotification.ts":
/*!***************************************************!*\
  !*** ./src/notification/BootstrapNotification.ts ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BootstrapNotification; });
/* harmony import */ var _Notification__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Notification */ "./src/notification/Notification.ts");
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;

  _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}



var BootstrapNotification = /*#__PURE__*/function (_Notification) {
  _inheritsLoose(BootstrapNotification, _Notification);

  function BootstrapNotification(notificationManager) {
    return _Notification.call(this, notificationManager) || this;
  } // Make the notification visible on the screen


  var _proto = BootstrapNotification.prototype;

  _proto.show = function show(title, message, topOffset, context, duration) {
    var _this = this;

    if (topOffset === void 0) {
      topOffset = 0;
    }

    if (context === void 0) {
      context = 'info';
    }

    if (duration === void 0) {
      duration = 3000;
    }

    var containerId = this.notificationManager.getContainerId(); // convert the context to a background colour

    var bgColorClass = '';

    switch (context) {
      case 'info':
        {
          bgColorClass = 'bg-info';
          break;
        }

      case 'warning':
        {
          bgColorClass = 'bg-warning';
          break;
        }

      case 'message':
        {
          bgColorClass = 'bg-primary';
          break;
        }

      case 'priority':
        {
          bgColorClass = 'bg-danger';
          break;
        }

      default:
        {
          bgColorClass = "bg-info";
        }
    } // Creating the notification container div


    var containerNode = document.createElement('div');
    containerNode.className = 'notification toast';
    containerNode.style.top = topOffset + "px";
    containerNode.setAttribute("role", "alert");
    containerNode.setAttribute("data-autohide", "false"); // Adding the notification title node

    var titleNode = document.createElement('div');
    titleNode.className = "toast-header text-white " + bgColorClass;
    var titleTextNode = document.createElement('strong');
    titleTextNode.className = "mr-auto";
    titleTextNode.textContent = title; // Adding a little button on the notification

    var closeButtonNode = document.createElement('button');
    closeButtonNode.className = 'ml-2 mb-1 close';
    closeButtonNode.textContent = 'x';
    closeButtonNode.addEventListener('click', function () {
      _this.notificationManager.remove(containerNode);
    }); // Adding the notification message content node

    var messageNode = document.createElement('div');
    messageNode.className = 'toast-body';
    messageNode.textContent = message; // Appending the container with all the elements newly created

    titleNode.appendChild(titleTextNode);
    titleNode.appendChild(closeButtonNode);
    containerNode.appendChild(titleNode);
    containerNode.appendChild(messageNode);
    containerNode.classList.add("is-" + context); // Inserting the notification to the page body

    var containerEl = document.getElementById(containerId);
    if (containerEl) containerEl.appendChild(containerNode); // activate it
    // @ts-ignore

    $(".notification").toast('show'); // Default duration delay

    if (duration <= 0) {
      duration = 2000;
    }

    setTimeout(function () {
      _this.notificationManager.remove(containerNode);
    }, duration);
    return containerNode;
  };

  return BootstrapNotification;
}(_Notification__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ }),

/***/ "./src/notification/Notification.ts":
/*!******************************************!*\
  !*** ./src/notification/Notification.ts ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Notification; });
var Notification = function Notification(notificationManager) {
  this.show = this.show.bind(this);
  this.notificationManager = notificationManager; // Create DOM notification structure when instantiated

  this.containerId = this.notificationManager.getContainerId();
} // Make the notification visible on the screen
;



/***/ }),

/***/ "./src/notification/NotificationFactory.ts":
/*!*************************************************!*\
  !*** ./src/notification/NotificationFactory.ts ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _BootstrapNotification__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BootstrapNotification */ "./src/notification/BootstrapNotification.ts");


var NotificationFactory = /*#__PURE__*/function () {
  function NotificationFactory() {}

  var _proto = NotificationFactory.prototype;

  _proto.createNotification = function createNotification(manager) {
    return new _BootstrapNotification__WEBPACK_IMPORTED_MODULE_0__["default"](manager);
  };

  return NotificationFactory;
}();

var notificationFactory = new NotificationFactory();
/* harmony default export */ __webpack_exports__["default"] = (notificationFactory);

/***/ }),

/***/ "./src/notification/NotificationManager.ts":
/*!*************************************************!*\
  !*** ./src/notification/NotificationManager.ts ***!
  \*************************************************/
/*! exports provided: NotificationManager, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotificationManager", function() { return NotificationManager; });
/* harmony import */ var _NotificationFactory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NotificationFactory */ "./src/notification/NotificationFactory.ts");

var NotificationManager = /*#__PURE__*/function () {
  function NotificationManager() {
    this.notifications = [];
    this.currentCount = 0;
    this.offsetPerNotification = 120;
    this.containerId = 'notifications';
    this.show = this.show.bind(this);
  }

  var _proto = NotificationManager.prototype;

  _proto.getContainerId = function getContainerId() {
    return this.containerId;
  };

  _proto.show = function show(title, message, context, duration) {
    if (context === void 0) {
      context = 'info';
    }

    if (duration === void 0) {
      duration = 5000;
    }

    var notification = _NotificationFactory__WEBPACK_IMPORTED_MODULE_0__["default"].createNotification(this);
    var notificationNode = notification.show(title, message, this.currentCount * this.offsetPerNotification, context, duration);
    this.currentCount++;
    this.notifications.push(notificationNode);
  };

  _proto.remove = function remove(notificationNode) {
    var _this = this;

    var foundIndex = this.notifications.findIndex(function (element) {
      return element === notificationNode;
    });

    if (foundIndex >= 0) {
      this.notifications.splice(foundIndex, 1); // re-arrange the remaining notifications

      this.notifications.map(function (notificationNode, index) {
        // @ts-ignore
        notificationNode.style.top = _this.offsetPerNotification * index + "px";
      });
    }

    var parentEl = notificationNode.parentElement;
    if (parentEl !== null) parentEl.removeChild(notificationNode);
    this.currentCount--;
    if (this.currentCount < 0) this.currentCount = 0;
  };

  return NotificationManager;
}();
var notifier = new NotificationManager();
/* harmony default export */ __webpack_exports__["default"] = (notifier);

/***/ }),

/***/ "./src/socket/ChatManager.ts":
/*!***********************************!*\
  !*** ./src/socket/ChatManager.ts ***!
  \***********************************/
/*! exports provided: ChatManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChatManager", function() { return ChatManager; });
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _SocketManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SocketManager */ "./src/socket/SocketManager.ts");
/* harmony import */ var _Types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Types */ "./src/socket/Types.ts");
/* harmony import */ var _state_BrowserStorageStateManager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../state/BrowserStorageStateManager */ "./src/state/BrowserStorageStateManager.ts");
/* harmony import */ var _util_UUID__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../util/UUID */ "./src/util/UUID.ts");






var UserStatus;

(function (UserStatus) {
  UserStatus[UserStatus["LoggedOut"] = 0] = "LoggedOut";
  UserStatus[UserStatus["LoggedIn"] = 1] = "LoggedIn";
})(UserStatus || (UserStatus = {}));

var cmLogger = debug__WEBPACK_IMPORTED_MODULE_0___default()('chat-manager');
var ChatManager = /*#__PURE__*/function () {
  function ChatManager() {
    this.blockedList = [];
    this.favouriteList = [];
    this.loggedInUsers = [];
    this.currentUsername = '';
    this.unreadListener = null;
    cmLogger('Setting up chat logs, blocked list, and favourites');
    this.chatLogs = [];
    this.chatListeners = [];
    this.chatUserListeners = [];
    this.localStorage = new _state_BrowserStorageStateManager__WEBPACK_IMPORTED_MODULE_4__["default"](true); // connect to the socket manager

    _SocketManager__WEBPACK_IMPORTED_MODULE_2__["default"].addChatReceiver(this); // bind the receiver methods

    this.receiveLogin = this.receiveLogin.bind(this);
    this.receiveLogout = this.receiveLogout.bind(this);
    this.receiveInvitation = this.receiveInvitation.bind(this);
    this.receiveMessage = this.receiveMessage.bind(this);
    this.receiveQueuedMessages = this.receiveQueuedMessages.bind(this);
    this.receiveQueuedInvites = this.receiveQueuedInvites.bind(this);
    this.receiveJoinedRoom = this.receiveJoinedRoom.bind(this);
    this.receivedLeftRoom = this.receivedLeftRoom.bind(this);
  }

  ChatManager.getInstance = function getInstance() {
    if (!ChatManager._instance) {
      ChatManager._instance = new ChatManager();
    }

    return ChatManager._instance;
  };

  var _proto = ChatManager.prototype;

  _proto.addChatEventHandler = function addChatEventHandler(receiver) {
    this.chatListeners.push(receiver);
  };

  _proto.addChatUserEventHandler = function addChatUserEventHandler(receiver) {
    this.chatUserListeners.push(receiver);
  };

  _proto.isUserLoggedIn = function isUserLoggedIn(username) {
    return this.loggedInUsers.findIndex(function (name) {
      return name === username;
    }) >= 0;
  };

  _proto.receiveUserList = function receiveUserList(users) {
    this.loggedInUsers = users;
    this.chatUserListeners.forEach(function (listener) {
      return listener.handleLoggedInUsersUpdated(users);
    });
  };

  _proto.addUserToBlockedList = function addUserToBlockedList(username) {
    var _this = this;

    var index = this.blockedList.findIndex(function (blocked) {
      return blocked === username;
    });

    if (index < 0) {
      this.blockedList.push(username);
      this.saveBlockedList();
      this.chatUserListeners.forEach(function (listener) {
        return listener.handleBlockedUsersChanged(_this.favouriteList);
      });
    }
  };

  _proto.removeUserFromBlockedList = function removeUserFromBlockedList(username) {
    var _this2 = this;

    var index = this.blockedList.findIndex(function (blocked) {
      return blocked === username;
    });

    if (index >= 0) {
      this.blockedList.splice(index, 1);
      this.saveBlockedList();
      this.chatUserListeners.forEach(function (listener) {
        return listener.handleBlockedUsersChanged(_this2.favouriteList);
      });
    }
  };

  _proto.isUserInBlockedList = function isUserInBlockedList(username) {
    return this.blockedList.findIndex(function (blocked) {
      return blocked === username;
    }) >= 0;
  };

  _proto.addUserToFavouriteList = function addUserToFavouriteList(username) {
    var _this3 = this;

    var index = this.favouriteList.findIndex(function (favourite) {
      return favourite === username;
    });

    if (index < 0) {
      this.favouriteList.push(username);
      this.saveFavouriteList();
      this.chatUserListeners.forEach(function (listener) {
        return listener.handleFavouriteUsersChanged(_this3.favouriteList);
      });
    }
  };

  _proto.removeUserFromFavouriteList = function removeUserFromFavouriteList(username) {
    var _this4 = this;

    var index = this.favouriteList.findIndex(function (blocked) {
      return blocked === username;
    });

    if (index >= 0) {
      this.favouriteList.splice(index, 1);
      this.saveFavouriteList();
      this.chatUserListeners.forEach(function (listener) {
        return listener.handleFavouriteUsersChanged(_this4.favouriteList);
      });
    }
  };

  _proto.isUserInFavouriteList = function isUserInFavouriteList(username) {
    return this.favouriteList.findIndex(function (user) {
      return user === username;
    }) >= 0;
  };

  _proto.getFavouriteUserList = function getFavouriteUserList() {
    return [].concat(this.favouriteList);
  };

  _proto.getBlockedUserList = function getBlockedUserList() {
    return [].concat(this.blockedList);
  };

  _proto.setCurrentUser = function setCurrentUser(username) {
    cmLogger("Setting current user " + username);
    this.currentUsername = username; // load previous logs

    var savedLogs = this.localStorage.getStateByName(ChatManager.chatLogKey + this.currentUsername);
    cmLogger(savedLogs);

    if (savedLogs) {
      this.chatLogs = savedLogs;
    } // load previous blocked list


    var blockedList = this.localStorage.getStateByName(ChatManager.blockedListKey + this.currentUsername);
    cmLogger(blockedList);

    if (blockedList) {
      this.blockedList = blockedList;
    } // load previous favourite list


    var favouriteList = this.localStorage.getStateByName(ChatManager.favouriteListKey + this.currentUsername);
    cmLogger(favouriteList);

    if (favouriteList) {
      this.favouriteList = favouriteList;
    }

    this.chatListeners.forEach(function (listener) {
      return listener.handleChatLogsUpdated();
    });
  };

  _proto.getCurrentUser = function getCurrentUser() {
    return this.currentUsername;
  };

  _proto.receiveJoinedRoom = function receiveJoinedRoom(users) {
    // we get this for all changes to a room, if the username is us can safely ignore
    //if (users.username === this.currentUsername) return;
    if (users.type !== _Types__WEBPACK_IMPORTED_MODULE_3__["InviteType"].ChatRoom) return;
    var log = this.ensureChatLogExists(users.room);
    cmLogger("User list for room " + users.room + " - " + users.userList.join(','));
    log.users = users.userList; // add a "message" for joined user

    var created = parseInt(moment__WEBPACK_IMPORTED_MODULE_1___default()().format('YYYYMMDDHHmmss'));
    var joinDateTime = moment__WEBPACK_IMPORTED_MODULE_1___default()().format('DD/MM/YYYY HH:mm');
    var message = {
      from: '',
      created: created,
      room: users.room,
      priority: 0,
      type: _Types__WEBPACK_IMPORTED_MODULE_3__["InviteType"].ChatRoom,
      message: users.username + " joined the chat on " + joinDateTime
    };
    log.messages.push(message);
    this.saveLogs();
    this.chatListeners.forEach(function (listener) {
      return listener.handleChatLogUpdated(log, false);
    });
  };

  _proto.receivedLeftRoom = function receivedLeftRoom(users) {
    // we get this for all changes to a room, if the username is us can safely ignore
    if (users.type !== _Types__WEBPACK_IMPORTED_MODULE_3__["InviteType"].ChatRoom) return;
    if (users.username === this.currentUsername) return;
    var log = this.ensureChatLogExists(users.room);
    cmLogger("User list for room " + users.room + " - " + users.userList.join(','));
    log.users = users.userList; // add a "message" for leaving user

    var created = parseInt(moment__WEBPACK_IMPORTED_MODULE_1___default()().format('YYYYMMDDHHmmss'));
    var joinDateTime = moment__WEBPACK_IMPORTED_MODULE_1___default()().format('DD/MM/YYYY HH:mm');
    var message = {
      from: '',
      created: created,
      room: users.room,
      priority: 0,
      type: _Types__WEBPACK_IMPORTED_MODULE_3__["InviteType"].ChatRoom,
      message: users.username + " left the chat on " + joinDateTime
    };
    log.messages.push(message);
    this.saveLogs();
    this.chatListeners.forEach(function (listener) {
      return listener.handleChatLogUpdated(log, false);
    });
  };

  _proto.receiveInvitation = function receiveInvitation(invite) {
    if (invite.type !== _Types__WEBPACK_IMPORTED_MODULE_3__["InviteType"].ChatRoom) return; //  unless we are receiving an invite from someone in our blocked list, we automatically accept this invite

    if (!this.isUserInBlockedList(invite.from)) {
      cmLogger("Invited to chat " + invite.room);
      var didChatAlreadyExist = this.doesChatRoomExist(invite.room);
      cmLogger(invite);
      cmLogger("Letting the listeners know, if they are all happy to accept then we will join the room");
      var happyToProceed = true;

      if (!didChatAlreadyExist) {
        this.chatListeners.forEach(function (listener) {
          if (!listener.handleNewInviteReceived(invite)) {
            happyToProceed = false;
          }
        });
      }

      if (happyToProceed) {
        var chatLog = this.ensureChatLogExists(invite.room); // keep a record of the type of invite

        chatLog.type = invite.type; // add the users in the invitation user list for the room, if not already added

        if (invite.userList) {
          invite.userList.forEach(function (username) {
            if (chatLog.users.findIndex(function (user) {
              return user === username;
            }) < 0) chatLog.users.push(invite.from);
          });
        }

        if (chatLog.users.findIndex(function (user) {
          return user === invite.from;
        }) < 0) chatLog.users.push(invite.from);
        this.saveLogs();
        cmLogger("Joining chat " + invite.room);
        _SocketManager__WEBPACK_IMPORTED_MODULE_2__["default"].joinChat(this.getCurrentUser(), invite.room, _Types__WEBPACK_IMPORTED_MODULE_3__["InviteType"].ChatRoom);
        this.chatListeners.forEach(function (listener) {
          return listener.handleChatLogUpdated(chatLog, false);
        });
      }
    } else {
      cmLogger("User " + invite.from + " blocked");
    }
  };

  _proto.receiveLogin = function receiveLogin(username) {
    var _this5 = this;

    cmLogger("Handle login received for " + username); // keep track of the logged in users

    var index = this.loggedInUsers.findIndex(function (user) {
      return user === username;
    });
    if (index < 0) this.loggedInUsers.push(username);
    cmLogger(this.loggedInUsers);
    this.chatUserListeners.forEach(function (listener) {
      return listener.handleLoggedInUsersUpdated(_this5.loggedInUsers);
    }); // if the user in in favourites and not in blocked list passing this on to the listener

    if (!this.isUserInBlockedList(username) && this.isUserInFavouriteList(username)) {
      cmLogger("User " + username + " logging in");
      this.chatUserListeners.forEach(function (listener) {
        return listener.handleFavouriteUserLoggedIn(username);
      });
    }
  };

  _proto.receiveLogout = function receiveLogout(username) {
    var _this6 = this;

    var index = this.loggedInUsers.findIndex(function (user) {
      return user === username;
    });
    if (index >= 0) this.loggedInUsers.splice(index, 1);
    this.chatUserListeners.forEach(function (listener) {
      return listener.handleLoggedInUsersUpdated(_this6.loggedInUsers);
    }); // if the user in in favourites and not in blocked list passing this on to the listener

    if (!this.isUserInBlockedList(username) && this.isUserInFavouriteList(username)) {
      cmLogger("User " + username + " logging out");
      this.chatUserListeners.forEach(function (listener) {
        return listener.handleFavouriteUserLoggedOut(username);
      });
    }
  };

  _proto.receiveDecline = function receiveDecline(room, username, type) {
    if (type !== _Types__WEBPACK_IMPORTED_MODULE_3__["InviteType"].ChatRoom) return; // we get this for all changes to a room, if the username is us can safely ignore

    if (username === this.currentUsername) return;

    if (!this.isUserInBlockedList(username)) {
      cmLogger("User " + username + " declined invitation to room");
      this.chatListeners.forEach(function (listener) {
        return listener.handleInvitationDeclined(room, username);
      });
    }
  };

  _proto.setUnreadCountListener = function setUnreadCountListener(listener) {
    this.unreadListener = listener;
  };

  _proto.touchChatLog = function touchChatLog(room) {
    var chatLog = this.ensureChatLogExists(room);
    chatLog.numOfNewMessages = 0;
    chatLog.lastViewed = parseInt(moment__WEBPACK_IMPORTED_MODULE_1___default()().format('YYYYMMDDHHmmss'));
    this.emitUnreadMessageCountChanged();
    this.saveLogs();
  };

  _proto.getChatLog = function getChatLog(room) {
    var log = null;
    var index = this.chatLogs.findIndex(function (log) {
      return log.roomName === room;
    });
    if (index >= 0) log = this.chatLogs[index];
    return log;
  };

  _proto.receiveMessage = function receiveMessage(message, wasOffline) {
    if (wasOffline === void 0) {
      wasOffline = false;
    }

    if (message.type !== _Types__WEBPACK_IMPORTED_MODULE_3__["InviteType"].ChatRoom) return; // ignore messages that aren't for chat rooms
    // double check the message is not from us somehow

    if (message.from === this.getCurrentUser()) return; // don't receive messages from the blocked users

    if (!this.isUserInBlockedList(message.from)) {
      // ok, so we need to add the message to the chat log, increase the new message count, save the logs and pass it on
      var chatLog = this.ensureChatLogExists(message.room);
      this.addSenderToRoomIfNotAlreadyPresent(chatLog, message.from);
      this.addMessageToChatLog(chatLog, message);
      cmLogger("Message received");
      cmLogger(message);
      this.chatListeners.forEach(function (listener) {
        return listener.handleChatLogUpdated(chatLog, wasOffline);
      });
    } else {
      cmLogger("Message received from user " + message.from + " - is in blocked list, not passed on.");
    }
  };

  _proto.receiveQueuedInvites = function receiveQueuedInvites(invites) {
    var _this7 = this; // just loop through and process each invite


    invites.forEach(function (invite) {
      _this7.receiveInvitation(invite);
    });
  };

  _proto.receiveQueuedMessages = function receiveQueuedMessages(messages) {
    var _this8 = this; // just loop through a process each message


    messages.forEach(function (message) {
      _this8.receiveMessage(message, true);
    });
    this.chatListeners.forEach(function (listener) {
      return listener.handleOfflineMessagesReceived(messages);
    });
  };

  _proto.joinChat = function joinChat(room) {
    if (this.getCurrentUser().trim().length === 0) return; // we are not logged in

    this.ensureChatLogExists(room);
    _SocketManager__WEBPACK_IMPORTED_MODULE_2__["default"].joinChat(this.getCurrentUser(), room, _Types__WEBPACK_IMPORTED_MODULE_3__["InviteType"].ChatRoom);
  };

  _proto.leaveChat = function leaveChat(room) {
    if (this.getCurrentUser().trim().length === 0) return; // we are not logged in

    this.removeChatLog(room);
    _SocketManager__WEBPACK_IMPORTED_MODULE_2__["default"].leaveChat(this.getCurrentUser(), room, _Types__WEBPACK_IMPORTED_MODULE_3__["InviteType"].ChatRoom);
  };

  _proto.login = function login() {
    var _this9 = this;

    if (this.getCurrentUser().trim().length === 0) return; // we are not logged in

    _SocketManager__WEBPACK_IMPORTED_MODULE_2__["default"].login(this.getCurrentUser()); // get the current user list

    _SocketManager__WEBPACK_IMPORTED_MODULE_2__["default"].getUserList(); // connect to the chat rooms already in logs

    this.chatLogs.forEach(function (log) {
      if (log.type === _Types__WEBPACK_IMPORTED_MODULE_3__["InviteType"].ChatRoom) {
        _SocketManager__WEBPACK_IMPORTED_MODULE_2__["default"].joinChat(_this9.currentUsername, log.roomName, _Types__WEBPACK_IMPORTED_MODULE_3__["InviteType"].ChatRoom);
      }
    });
  };

  _proto.logout = function logout() {
    if (this.getCurrentUser().trim().length === 0) return; // we are not logged in

    _SocketManager__WEBPACK_IMPORTED_MODULE_2__["default"].logout(this.getCurrentUser());
  };

  _proto.declineInvite = function declineInvite(room) {
    if (this.getCurrentUser().trim().length === 0) return; // we are not logged in

    _SocketManager__WEBPACK_IMPORTED_MODULE_2__["default"].sendDeclineInvite(room, this.getCurrentUser(), _Types__WEBPACK_IMPORTED_MODULE_3__["InviteType"].ChatRoom);
  };

  _proto.sendInvite = function sendInvite(to, room, type, requiresAcceptDecline, subject) {
    if (type === void 0) {
      type = _Types__WEBPACK_IMPORTED_MODULE_3__["InviteType"].ChatRoom;
    }

    if (requiresAcceptDecline === void 0) {
      requiresAcceptDecline = false;
    }

    if (subject === void 0) {
      subject = '';
    }

    if (this.getCurrentUser().trim().length === 0) return; // we are not logged in
    // can't accidentally send an invite to blacklisted

    if (this.isUserInBlockedList(to)) return; // only send an invite if the user isn't already in the room

    var log = this.ensureChatLogExists(room);

    if (log.users.findIndex(function (user) {
      return user === to;
    }) < 0) {
      _SocketManager__WEBPACK_IMPORTED_MODULE_2__["default"].sendInvite(this.getCurrentUser(), to, room, type, requiresAcceptDecline, subject);
    }
  };

  _proto.sendMessage = function sendMessage(room, content, priority, attachment) {
    if (priority === void 0) {
      priority = _Types__WEBPACK_IMPORTED_MODULE_3__["Priority"].Normal;
    }

    if (this.getCurrentUser().trim().length === 0) return null; // we are not logged in

    var log = this.ensureChatLogExists(room); // send the message

    var created = parseInt(moment__WEBPACK_IMPORTED_MODULE_1___default()().format('YYYYMMDDHHmmss'));
    _SocketManager__WEBPACK_IMPORTED_MODULE_2__["default"].sendMessage(this.getCurrentUser(), room, content, created, _Types__WEBPACK_IMPORTED_MODULE_3__["InviteType"].ChatRoom, _Types__WEBPACK_IMPORTED_MODULE_3__["Priority"].Normal, {}); // add the message to the chat log

    if (!attachment) attachment = {};
    var sent = {
      from: this.getCurrentUser(),
      room: room,
      message: content,
      created: created,
      priority: priority,
      type: _Types__WEBPACK_IMPORTED_MODULE_3__["InviteType"].ChatRoom,
      attachment: attachment
    };
    this.addMessageToChatLog(log, sent);
    return sent;
  };

  _proto.getChatLogs = function getChatLogs() {
    return [].concat(this.chatLogs);
  };

  _proto.startChatWithUser = function startChatWithUser(username) {
    var roomName = null;

    if (username) {
      cmLogger("Starting chat with " + username); // first thing, do we have a chat log with this user (and just this user) already?

      var chatLog = this.ensureChatLogExistsWithUser(username);
      this.chatListeners.forEach(function (listener) {
        return listener.handleChatLogUpdated(chatLog, false);
      }); // invite the other user

      _SocketManager__WEBPACK_IMPORTED_MODULE_2__["default"].sendInvite(this.getCurrentUser(), username, chatLog.roomName, _Types__WEBPACK_IMPORTED_MODULE_3__["InviteType"].ChatRoom, false, ''); // ok, lets connect to the server

      _SocketManager__WEBPACK_IMPORTED_MODULE_2__["default"].joinChat(this.getCurrentUser(), chatLog.roomName, _Types__WEBPACK_IMPORTED_MODULE_3__["InviteType"].ChatRoom);
      roomName = chatLog.roomName;
    }

    return roomName;
  };

  _proto.saveLogs = function saveLogs() {
    this.localStorage.setStateByName(ChatManager.chatLogKey + this.currentUsername, this.chatLogs, false);
  };

  _proto.saveBlockedList = function saveBlockedList() {
    this.localStorage.setStateByName(ChatManager.blockedListKey + this.currentUsername, this.blockedList, false);
  };

  _proto.saveFavouriteList = function saveFavouriteList() {
    this.localStorage.setStateByName(ChatManager.favouriteListKey + this.currentUsername, this.favouriteList, false);
  };

  _proto.ensureChatLogExists = function ensureChatLogExists(room) {
    var log;
    var index = this.chatLogs.findIndex(function (log) {
      return log.roomName === room;
    });

    if (index < 0) {
      log = {
        roomName: room,
        users: [this.getCurrentUser()],
        messages: [],
        lastViewed: parseInt(moment__WEBPACK_IMPORTED_MODULE_1___default()().format('YYYYMMDDHHmmss')),
        numOfNewMessages: 0,
        type: _Types__WEBPACK_IMPORTED_MODULE_3__["InviteType"].ChatRoom
      };
      this.chatLogs.push(log);
      this.saveLogs();
    } else {
      log = this.chatLogs[index];
    }

    return log;
  };

  _proto.ensureChatLogExistsWithUser = function ensureChatLogExistsWithUser(username) {
    var foundLog = null;
    var index = 0;

    while (index < this.chatLogs.length) {
      var log = this.chatLogs[index];

      if (log.users.length === 2) {
        // is the username in the two of this room?
        if (log.users.findIndex(function (value) {
          return value === username;
        }) >= 0) {
          foundLog = log;
          index = this.chatLogs.length;
        }
      }

      index++;
    }

    if (!foundLog) {
      foundLog = {
        roomName: _util_UUID__WEBPACK_IMPORTED_MODULE_5__["default"].getUniqueId(),
        users: [this.getCurrentUser(), username],
        messages: [],
        lastViewed: parseInt(moment__WEBPACK_IMPORTED_MODULE_1___default()().format('YYYYMMDDHHmmss')),
        numOfNewMessages: 0,
        type: _Types__WEBPACK_IMPORTED_MODULE_3__["InviteType"].ChatRoom
      };
      this.chatLogs.push(foundLog);
      this.saveLogs();
    }

    return foundLog;
  };

  _proto.doesChatRoomExist = function doesChatRoomExist(room) {
    var index = this.chatLogs.findIndex(function (log) {
      return log.roomName === room;
    });
    return index >= 0;
  };

  _proto.emitUnreadMessageCountChanged = function emitUnreadMessageCountChanged() {
    var _this$unreadListener;

    var unreadCount = 0;
    this.chatLogs.forEach(function (log) {
      unreadCount += log.numOfNewMessages;
    });
    (_this$unreadListener = this.unreadListener) == null ? void 0 : _this$unreadListener.countChanged(unreadCount);
  };

  _proto.addMessageToChatLog = function addMessageToChatLog(log, message) {
    log.numOfNewMessages++;
    log.messages.push(message);
    this.emitUnreadMessageCountChanged();

    if (message.from === this.getCurrentUser()) {
      this.touchChatLog(log.roomName); // this will also save the logs
    } else {
      this.saveLogs();
    }
  };

  _proto.addSenderToRoomIfNotAlreadyPresent = function addSenderToRoomIfNotAlreadyPresent(chatLog, sender) {
    var index = chatLog.users.findIndex(function (user) {
      return user === sender;
    });

    if (index < 0) {
      chatLog.users.push(sender);
    }
  };

  _proto.removeChatLog = function removeChatLog(room) {
    var index = this.chatLogs.findIndex(function (log) {
      return log.roomName === room;
    });

    if (index >= 0) {
      cmLogger("Removing Chat log for room " + room);
      var result = this.chatLogs.splice(index, 1);
      cmLogger(result.length);
      this.saveLogs();
    }
  };

  return ChatManager;
}();
ChatManager.chatLogKey = 'im-board-chat-logs';
ChatManager.blockedListKey = 'im-board-blocked-list';
ChatManager.favouriteListKey = 'im-board-favourite-list';

/***/ }),

/***/ "./src/socket/NotificationController.ts":
/*!**********************************************!*\
  !*** ./src/socket/NotificationController.ts ***!
  \**********************************************/
/*! exports provided: NotificationController */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotificationController", function() { return NotificationController; });
/* harmony import */ var _ChatManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ChatManager */ "./src/socket/ChatManager.ts");
/* harmony import */ var _notification_NotificationManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../notification/NotificationManager */ "./src/notification/NotificationManager.ts");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Types */ "./src/socket/Types.ts");




var notLogger = debug__WEBPACK_IMPORTED_MODULE_2___default()('notification-controller');
var NotificationController = /*#__PURE__*/function () {
  function NotificationController() {
    this.doNotDisturb = false;
    this.chatManager = _ChatManager__WEBPACK_IMPORTED_MODULE_0__["ChatManager"].getInstance();
    this.doNotDisturb = false;
    this.chatListeners = [];
    this.chatUserListeners = []; //bind the methods

    this.handleChatLogUpdated = this.handleChatLogUpdated.bind(this);
    this.handleLoggedInUsersUpdated = this.handleLoggedInUsersUpdated.bind(this);
    this.handleFavouriteUserLoggedIn = this.handleFavouriteUserLoggedIn.bind(this);
    this.handleFavouriteUserLoggedOut = this.handleFavouriteUserLoggedOut.bind(this);
    this.chatManager.addChatEventHandler(this);
    this.chatManager.addChatUserEventHandler(this);
  }

  NotificationController.getInstance = function getInstance() {
    if (!NotificationController._instance) {
      NotificationController._instance = new NotificationController();
    }

    return NotificationController._instance;
  };

  var _proto = NotificationController.prototype;

  _proto.handleInvitationDeclined = function handleInvitationDeclined(room, username) {
    if (this.doNotDisturb) return; // notify the user of the new chat

    _notification_NotificationManager__WEBPACK_IMPORTED_MODULE_1__["default"].show('Room', "User " + username + " has declined the invitation to join you.", 'info', 7000);
  };

  _proto.handleNewInviteReceived = function handleNewInviteReceived(invite) {
    var result = true; // is this a chat room or score sheet?

    if (invite.type === _Types__WEBPACK_IMPORTED_MODULE_3__["InviteType"].ScoreSheet) return true;
    if (this.doNotDisturb && !invite.requiresAcceptDecline) return result;

    if (invite.requiresAcceptDecline) {// notify the user of the invitation
      //result = controller.askUserAboutInvitation(invite); ///////TO FIX
    } else {
      // notify the user of the new chat
      _notification_NotificationManager__WEBPACK_IMPORTED_MODULE_1__["default"].show('Chat Room', "User " + invite.from + " has invited you.", 'info', 7000);
    }

    return result;
  };

  _proto.addListener = function addListener(listener) {
    this.chatListeners.push(listener);
  };

  _proto.addUserListener = function addUserListener(listener) {
    this.chatUserListeners.push(listener);
  };

  _proto.setDoNotDisturb = function setDoNotDisturb(dontDisturbMe) {
    if (dontDisturbMe === void 0) {
      dontDisturbMe = true;
    }

    this.doNotDisturb = dontDisturbMe;
  };

  _proto.blackListUser = function blackListUser(username, isBlackedListed) {
    if (isBlackedListed === void 0) {
      isBlackedListed = true;
    }

    if (isBlackedListed) {
      this.chatManager.addUserToBlockedList(username);
    } else {
      this.chatManager.removeUserFromBlockedList(username);
    }
  };

  _proto.favouriteUser = function favouriteUser(username, isFavourited) {
    if (isFavourited === void 0) {
      isFavourited = true;
    }

    if (isFavourited) {
      this.chatManager.addUserToFavouriteList(username);
    } else {
      this.chatManager.removeUserFromFavouriteList(username);
    }
  };

  _proto.isFavouriteUser = function isFavouriteUser(username) {
    return this.chatManager.isUserInFavouriteList(username);
  };

  _proto.isBlockedUser = function isBlockedUser(username) {
    return this.chatManager.isUserInBlockedList(username);
  };

  _proto.handleChatLogsUpdated = function handleChatLogsUpdated() {
    this.chatListeners.forEach(function (listener) {
      return listener.handleChatLogsUpdated();
    });
  };

  _proto.handleChatLogUpdated = function handleChatLogUpdated(log, wasOffline) {
    if (wasOffline === void 0) {
      wasOffline = false;
    }

    notLogger("Handle chat log updated");
    notLogger(log); // pass on the changes

    this.chatListeners.forEach(function (listener) {
      return listener.handleChatLogUpdated(log, wasOffline);
    }); // provide visual notifications if do not disturb is not on

    if (this.doNotDisturb) return;

    if (!wasOffline) {
      // get the last message added, it won't be from ourselves (the chat manager takes care of that)
      if (log.messages.length > 0) {
        var displayMessage = log.messages[log.messages.length - 1];
        _notification_NotificationManager__WEBPACK_IMPORTED_MODULE_1__["default"].show(displayMessage.from, displayMessage.message, 'message', 3000);
      }
    }
  };

  _proto.handleLoggedInUsersUpdated = function handleLoggedInUsersUpdated(usernames) {
    notLogger("Handle logged in users updated");
    notLogger(usernames); // allow the view to change the user statuses

    this.chatUserListeners.forEach(function (listener) {
      return listener.handleLoggedInUsersUpdated(usernames);
    });
  };

  _proto.handleFavouriteUserLoggedIn = function handleFavouriteUserLoggedIn(username) {
    notLogger("Handle favourite user " + username + " logged in"); // allow the view to change the user statuses

    this.chatUserListeners.forEach(function (listener) {
      return listener.handleFavouriteUserLoggedIn(username);
    }); // provide visual notifications if do not disturb is not on

    if (this.doNotDisturb) return;
    _notification_NotificationManager__WEBPACK_IMPORTED_MODULE_1__["default"].show(username, "User " + username + " has logged in.", 'warning', 5000);
  };

  _proto.handleFavouriteUserLoggedOut = function handleFavouriteUserLoggedOut(username) {
    notLogger("Handle favourite user " + username + " logged out"); // allow the view to change the user statuses

    this.chatUserListeners.forEach(function (listener) {
      return listener.handleFavouriteUserLoggedOut(username);
    }); // provide visual notifications if do not disturb is not on

    if (this.doNotDisturb) return;
    _notification_NotificationManager__WEBPACK_IMPORTED_MODULE_1__["default"].show(username, "User " + username + " has logged out.", 'priority', 4000);
  };

  _proto.handleBlockedUsersChanged = function handleBlockedUsersChanged(usernames) {
    notLogger("Handle blocked users changed to " + usernames);
    this.chatUserListeners.forEach(function (listener) {
      return listener.handleBlockedUsersChanged(usernames);
    });
  };

  _proto.handleFavouriteUsersChanged = function handleFavouriteUsersChanged(usernames) {
    notLogger("Handle favourite users changed to " + usernames);
    this.chatUserListeners.forEach(function (listener) {
      return listener.handleFavouriteUsersChanged(usernames);
    });
  };

  _proto.startChatWithUser = function startChatWithUser(username) {
    return _ChatManager__WEBPACK_IMPORTED_MODULE_0__["ChatManager"].getInstance().startChatWithUser(username);
  };

  _proto.handleChatStarted = function handleChatStarted(log) {
    this.chatListeners.forEach(function (listener) {
      return listener.handleChatStarted(log);
    });
  };

  _proto.handleOfflineMessagesReceived = function handleOfflineMessagesReceived(messages) {
    // provide visual notifications if do not disturb is not on
    if (this.doNotDisturb) return;
    if (messages.length === 0) return;
    _notification_NotificationManager__WEBPACK_IMPORTED_MODULE_1__["default"].show("Offline messages received", "You have received " + messages.length + " messages since you last logged out.");
  };

  return NotificationController;
}();

/***/ }),

/***/ "./src/socket/SocketManager.ts":
/*!*************************************!*\
  !*** ./src/socket/SocketManager.ts ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Types */ "./src/socket/Types.ts");


var sDebug = debug__WEBPACK_IMPORTED_MODULE_0___default()('socket-ts');

var SocketManager = /*#__PURE__*/function () {
  function SocketManager() {
    this.chatReceivers = [];
    this.callbackForMessage = this.callbackForMessage.bind(this);
    this.callbackForData = this.callbackForData.bind(this);
    this.listener = null;
    this.socket = null;
    this.chatReceivers = [];
    this.callbackForMessage = this.callbackForMessage.bind(this);
    this.callbackForLogin = this.callbackForLogin.bind(this);
    this.callbackForLogout = this.callbackForLogout.bind(this);
    this.callbackForJoinRoom = this.callbackForJoinRoom.bind(this);
    this.callbackForExitRoom = this.callbackForExitRoom.bind(this);
    this.callbackForInvite = this.callbackForInvite.bind(this);
    this.callbackForChat = this.callbackForChat.bind(this);
    this.callbackForQueue = this.callbackForQueue.bind(this);
    this.callbackForUserList = this.callbackForUserList.bind(this);
    this.callbackForDeclineInvite = this.callbackForDeclineInvite.bind(this);
  }

  var _proto = SocketManager.prototype;

  _proto.addChatReceiver = function addChatReceiver(receiver) {
    this.chatReceivers.push(receiver);
  };

  _proto.setListener = function setListener(listener) {
    sDebug('Setting listener');
    this.listener = listener;
    sDebug('Creating socket connection'); // @ts-ignore

    this.socket = io();
    sDebug('Waiting for messages');
    this.socket.on('message', this.callbackForMessage);
    this.socket.on('data', this.callbackForData);
    this.socket.on('login', this.callbackForLogin);
    this.socket.on('logout', this.callbackForLogout);
    this.socket.on('joinroom', this.callbackForJoinRoom);
    this.socket.on('exitroom', this.callbackForExitRoom);
    this.socket.on('invite', this.callbackForInvite);
    this.socket.on('declineinvite', this.callbackForDeclineInvite);
    this.socket.on('chat', this.callbackForChat);
    this.socket.on('queue', this.callbackForQueue);
    this.socket.on('userlist', this.callbackForUserList);
  };

  _proto.login = function login(username) {
    this.socket.emit('login', {
      username: username
    });
  };

  _proto.logout = function logout(username) {
    this.socket.emit('logout', {
      username: username
    });
  };

  _proto.joinChat = function joinChat(username, room, type) {
    this.socket.emit('joinroom', {
      username: username,
      room: room,
      type: type
    });
  };

  _proto.leaveChat = function leaveChat(username, room, type) {
    this.socket.emit('exitroom', {
      username: username,
      room: room,
      type: type
    });
  };

  _proto.sendInvite = function sendInvite(from, to, room, type, requiresAcceptDecline, subject, attachment) {
    if (type === void 0) {
      type = _Types__WEBPACK_IMPORTED_MODULE_1__["InviteType"].ChatRoom;
    }

    if (requiresAcceptDecline === void 0) {
      requiresAcceptDecline = false;
    }

    if (subject === void 0) {
      subject = '';
    }

    if (attachment === void 0) {
      attachment = {};
    }

    var inviteObj = {
      from: from,
      to: to,
      room: room,
      type: type,
      requiresAcceptDecline: requiresAcceptDecline,
      subject: subject,
      attachment: attachment
    };
    sDebug("Sending invite");
    sDebug(inviteObj);
    this.socket.emit('invite', inviteObj);
  };

  _proto.sendMessage = function sendMessage(from, room, message, created, type, priority, attachment) {
    if (priority === void 0) {
      priority = _Types__WEBPACK_IMPORTED_MODULE_1__["Priority"].Normal;
    }

    if (attachment === void 0) {
      attachment = {};
    }

    var messageObj = {
      from: from,
      room: room,
      message: message,
      created: created,
      priority: priority,
      type: type,
      attachment: attachment
    };
    this.socket.emit('chat', messageObj);
  };

  _proto.getUserList = function getUserList() {
    this.socket.emit('userlist');
  };

  _proto.sendDeclineInvite = function sendDeclineInvite(room, from, type) {
    this.socket.emit('declineinvite', {
      room: room,
      from: from,
      type: type
    });
  };

  _proto.callbackForMessage = function callbackForMessage(content) {
    sDebug("Received message : " + content);

    try {
      sDebug(content); // should be a server side ChatMessage {room, message,user}

      var dataObj = JSON.parse(content);
      this.chatReceivers.forEach(function (receiver) {
        return receiver.receiveMessage(dataObj);
      });
    } catch (err) {
      sDebug(err);
      sDebug('Not JSON data');
    }
  };

  _proto.callbackForLogin = function callbackForLogin(message) {
    sDebug("Received login : " + message);
    this.chatReceivers.forEach(function (receiver) {
      return receiver.receiveLogin(message);
    });
  };

  _proto.callbackForUserList = function callbackForUserList(message) {
    sDebug("Received user list : " + message);
    this.chatReceivers.forEach(function (receiver) {
      return receiver.receiveUserList(message);
    });
  };

  _proto.callbackForLogout = function callbackForLogout(message) {
    sDebug("Received logout : " + message);
    this.chatReceivers.forEach(function (receiver) {
      return receiver.receiveLogout(message);
    });
  };

  _proto.callbackForJoinRoom = function callbackForJoinRoom(data) {
    sDebug("Received joined room : " + data);

    try {
      var dataObj = JSON.parse(data);
      sDebug(dataObj);
      this.chatReceivers.forEach(function (receiver) {
        return receiver.receiveJoinedRoom(dataObj);
      });
    } catch (err) {
      sDebug('Not JSON data');
    }
  };

  _proto.callbackForExitRoom = function callbackForExitRoom(data) {
    sDebug("Received left room : " + data);

    try {
      var dataObj = JSON.parse(data);
      sDebug(dataObj);
      this.chatReceivers.forEach(function (receiver) {
        return receiver.receivedLeftRoom(dataObj);
      });
    } catch (err) {
      sDebug('Not JSON data');
    }
  };

  _proto.callbackForInvite = function callbackForInvite(data) {
    sDebug("Received invite : " + data);

    try {
      var dataObj = JSON.parse(data);
      sDebug(dataObj);
      this.chatReceivers.forEach(function (receiver) {
        return receiver.receiveInvitation(dataObj);
      });
    } catch (err) {
      sDebug('Not JSON data');
    }
  };

  _proto.callbackForDeclineInvite = function callbackForDeclineInvite(data) {
    sDebug("Received declined invite : " + data);

    try {
      var dataObj = JSON.parse(data);
      sDebug(dataObj);
      this.chatReceivers.forEach(function (receiver) {
        return receiver.receiveDecline(dataObj.room, dataObj.username, dataObj.type);
      });
    } catch (err) {
      sDebug(err);
      sDebug('Not JSON data');
    }
  };

  _proto.callbackForChat = function callbackForChat(content) {
    sDebug("Received chat : " + content);

    try {
      // should be a server side ChatMessage {room, message,user}
      var dataObj = JSON.parse(content);
      sDebug(dataObj);
      this.chatReceivers.forEach(function (receiver) {
        return receiver.receiveMessage(dataObj);
      });
    } catch (err) {
      sDebug('Not JSON data');
    }
  };

  _proto.callbackForQueue = function callbackForQueue(data) {
    sDebug("Received queued items : " + data);

    try {
      var dataObj = JSON.parse(data);
      sDebug(dataObj); // this object should contain two arrays of invites and messages

      if (dataObj.invites && dataObj.invites.length > 0) {
        this.chatReceivers.forEach(function (receiver) {
          return receiver.receiveQueuedInvites(dataObj.invites);
        });
      }

      if (dataObj.messages && dataObj.messages.length > 0) {
        this.chatReceivers.forEach(function (receiver) {
          return receiver.receiveQueuedMessages(dataObj.messages);
        });
      }
    } catch (err) {
      sDebug('Not JSON data');
    }
  }
  /*
  *
  *  expecting a JSON data object with the following attributes
  *  1.  type: "create"|"update"|"delete"
  *  2.  objectType: string name of the object type changed
  *  3.  data: the new representation of the object
  *  4.  user: application specific id for the user who made the change
  *        - the application view is required to implement getCurrentUser() to compare the user who made the change
  *
   */
  ;

  _proto.callbackForData = function callbackForData(message) {
    sDebug("Received data");

    try {
      var dataObj = JSON.parse(message);
      sDebug(dataObj);
      if (this.listener === null) return;

      if (dataObj.user === this.listener.getCurrentUser()) {
        sDebug("change made by this user, ignoring");
      } else {
        sDebug("change made by another user, passing off to the application");
        this.listener.handleDataChangedByAnotherUser(dataObj);
      }
    } catch (err) {
      sDebug('Not JSON data');
    }
  };

  return SocketManager;
}();

var socketManager = new SocketManager();
/* harmony default export */ __webpack_exports__["default"] = (socketManager);

/***/ }),

/***/ "./src/socket/Types.ts":
/*!*****************************!*\
  !*** ./src/socket/Types.ts ***!
  \*****************************/
/*! exports provided: Priority, InviteType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Priority", function() { return Priority; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InviteType", function() { return InviteType; });
var Priority;

(function (Priority) {
  Priority[Priority["Normal"] = 0] = "Normal";
  Priority[Priority["High"] = 1] = "High";
  Priority[Priority["Urgent"] = 2] = "Urgent";
})(Priority || (Priority = {}));

var InviteType;

(function (InviteType) {
  InviteType[InviteType["ChatRoom"] = 0] = "ChatRoom";
  InviteType[InviteType["ScoreSheet"] = 1] = "ScoreSheet";
})(InviteType || (InviteType = {}));

/***/ }),

/***/ "./src/state/AbstractStateManager.ts":
/*!*******************************************!*\
  !*** ./src/state/AbstractStateManager.ts ***!
  \*******************************************/
/*! exports provided: AbstractStateManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AbstractStateManager", function() { return AbstractStateManager; });
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _StateManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./StateManager */ "./src/state/StateManager.ts");
/* harmony import */ var _StateChangedDelegate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./StateChangedDelegate */ "./src/state/StateChangedDelegate.ts");



var smLogger = debug__WEBPACK_IMPORTED_MODULE_0___default()('state-manager-ts');
var AbstractStateManager = /*#__PURE__*/function () {
  function AbstractStateManager(managerName) {
    this.forceSaves = true;
    this.managerName = '';
    this.delegate = new _StateChangedDelegate__WEBPACK_IMPORTED_MODULE_2__["default"](managerName);
    this.managerName = managerName;
    this.emitEvents();
    this.forceSaves = true;
  }

  var _proto = AbstractStateManager.prototype;

  _proto.suppressEvents = function suppressEvents() {
    this.delegate.suppressEvents();
  };

  _proto.emitEvents = function emitEvents() {
    this.delegate.emitEvents();
  };

  _proto.dontForceSavesOnAddRemoveUpdate = function dontForceSavesOnAddRemoveUpdate() {
    this.forceSaves = false;
  };

  _proto.forceSavesOnAddRemoveUpdate = function forceSavesOnAddRemoveUpdate() {
    this.forceSaves = true;
  };

  _proto.informChangeListenersForStateWithName = function informChangeListenersForStateWithName(name, stateObjValue, eventType, previousObjValue) {
    if (eventType === void 0) {
      eventType = _StateManager__WEBPACK_IMPORTED_MODULE_1__["stateEventType"].StateChanged;
    }

    if (previousObjValue === void 0) {
      previousObjValue = null;
    }

    this.delegate.informChangeListenersForStateWithName(name, stateObjValue, eventType, previousObjValue);
  };

  _proto.addChangeListenerForName = function addChangeListenerForName(name, listener) {
    this.delegate.addChangeListenerForName(name, listener);
  };

  _proto.addStateByName = function addStateByName(name, stateObjForName) {
    this._ensureStatePresent(name);
    /* create a new state attribute for the application state */


    var state = {
      name: name,
      value: stateObjForName
    };
    /* get the current state value and replace it */

    this._replaceNamedStateInStorage(state);

    this.informChangeListenersForStateWithName(name, stateObjForName, _StateManager__WEBPACK_IMPORTED_MODULE_1__["stateEventType"].StateChanged);
    return stateObjForName;
  };

  _proto.getStateByName = function getStateByName(name) {
    this._ensureStatePresent(name);

    smLogger("State Manager: Getting state for " + name);
    var stateValueObj = {}; // get the current state

    var state = this._getState(name);

    stateValueObj = state.value;
    smLogger("State Manager: Found previous state for " + name);
    smLogger(stateValueObj);
    return stateValueObj;
  };

  _proto.setStateByName = function setStateByName(name, stateObjectForName, informListeners) {
    if (informListeners === void 0) {
      informListeners = true;
    }

    this._ensureStatePresent(name);

    smLogger("State Manager: Setting state for " + name);
    smLogger(stateObjectForName); // set the current state

    var state = this._getState(name);

    state.value = stateObjectForName;
    if (this.forceSaves) this._saveState(name, stateObjectForName);
    if (informListeners) this.informChangeListenersForStateWithName(name, stateObjectForName);
    return stateObjectForName;
  };

  _proto.addNewItemToState = function addNewItemToState(name, item, isPersisted) {
    if (isPersisted === void 0) {
      isPersisted = false;
    } // assumes state is an array


    this._ensureStatePresent(name);

    smLogger("State Manager: Adding item to state " + name); // const state = this.getStateByName(name);
    // state.push(item);
    // smLogger(state);

    this._addItemToState(name, item, isPersisted);

    this.informChangeListenersForStateWithName(name, item, _StateManager__WEBPACK_IMPORTED_MODULE_1__["stateEventType"].ItemAdded);
  };

  _proto.findItemInState = function findItemInState(name, item, testForEqualityFunction) {
    // assumes state is an array
    this._ensureStatePresent(name);

    var result = {};
    var state = this.getStateByName(name);
    var foundIndex = state.findIndex(function (element) {
      return testForEqualityFunction(element, item);
    });
    smLogger("Finding item in state " + name + " - found index " + foundIndex);
    smLogger(item);

    if (foundIndex >= 0) {
      result = state[foundIndex];
    }

    return result;
  };

  _proto.isItemInState = function isItemInState(name, item, testForEqualityFunction) {
    // assumes state is an array
    this._ensureStatePresent(name);

    var result = false;
    var state = this.getStateByName(name);
    var foundIndex = state.findIndex(function (element) {
      return testForEqualityFunction(element, item);
    });

    if (foundIndex >= 0) {
      result = true;
    }

    return result;
  };

  _proto.removeItemFromState = function removeItemFromState(name, item, testForEqualityFunction, isPersisted) {
    this._ensureStatePresent(name);

    var result = true;
    var oldItem = this.findItemInState(name, item, testForEqualityFunction); // remove the item from the state

    smLogger('State Manager: Found item - removing ');

    this._removeItemFromState(name, item, testForEqualityFunction, isPersisted); //this.setStateByName(name, state, false);


    this.informChangeListenersForStateWithName(name, oldItem, _StateManager__WEBPACK_IMPORTED_MODULE_1__["stateEventType"].ItemDeleted);
    return result;
  };

  _proto.updateItemInState = function updateItemInState(name, item, testForEqualityFunction, isPersisted) {
    this._ensureStatePresent(name);

    var result = true;
    var oldItem = this.findItemInState(name, item, testForEqualityFunction);
    smLogger('State Manager: Found item - replacing ');

    this._updateItemInState(name, item, testForEqualityFunction, isPersisted); //this.setStateByName(name, this.getStateByName(name), false);


    this.informChangeListenersForStateWithName(name, item, _StateManager__WEBPACK_IMPORTED_MODULE_1__["stateEventType"].ItemUpdated, oldItem);
    return result;
  };

  return AbstractStateManager;
}();

/***/ }),

/***/ "./src/state/AggregateStateManager.ts":
/*!********************************************!*\
  !*** ./src/state/AggregateStateManager.ts ***!
  \********************************************/
/*! exports provided: AggregateStateManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AggregateStateManager", function() { return AggregateStateManager; });
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _AbstractStateManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AbstractStateManager */ "./src/state/AbstractStateManager.ts");
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;

  _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}



var aggLogger = debug__WEBPACK_IMPORTED_MODULE_0___default()('state-manager-aggregate');
var AggregateStateManager = /*#__PURE__*/function (_AbstractStateManager) {
  _inheritsLoose(AggregateStateManager, _AbstractStateManager);

  function AggregateStateManager() {
    var _this;

    _this = _AbstractStateManager.call(this, 'aggregate') || this;
    _this.stateManagers = [];

    _this.emitEvents();

    return _this;
  }

  AggregateStateManager.getInstance = function getInstance() {
    if (!AggregateStateManager._instance) {
      AggregateStateManager._instance = new AggregateStateManager();
    }

    return AggregateStateManager._instance;
  };

  var _proto = AggregateStateManager.prototype;

  _proto.addStateManager = function addStateManager(stateManager, filters, emitEvents) {
    if (filters === void 0) {
      filters = [];
    }

    var mWF = {
      manager: stateManager,
      filters: filters
    };
    this.stateManagers.push(mWF);
    if (!emitEvents) stateManager.suppressEvents();
    aggLogger('adding state manager with/without filters');
  };

  _proto._addNewNamedStateToStorage = function _addNewNamedStateToStorage(state) {
    var _this2 = this;

    this.stateManagers.forEach(function (managerWithFilters) {
      if (!_this2.stateNameInFilters(state.name, managerWithFilters.filters)) {
        managerWithFilters.manager._addNewNamedStateToStorage(state);
      }
    });
  };

  _proto._getState = function _getState(name) {
    var _this3 = this;

    var state = {
      name: name,
      value: []
    };
    this.stateManagers.forEach(function (sm) {
      if (!_this3.stateNameInFilters(state.name, sm.filters)) {
        aggLogger("get state from state manager for state " + name);
        aggLogger(sm.manager);

        sm.manager._getState(name);
      }
    }); // assuming the state manager is holding all the values

    if (this.stateManagers.length > 0) {
      state = this.stateManagers[0].manager._getState(name);
    }

    return state;
  };

  _proto._ensureStatePresent = function _ensureStatePresent(name) {
    var _this4 = this;

    this.stateManagers.forEach(function (managerWithFilters) {
      if (!_this4.stateNameInFilters(name, managerWithFilters.filters)) {
        managerWithFilters.manager._ensureStatePresent(name);
      }
    });
  };

  _proto._replaceNamedStateInStorage = function _replaceNamedStateInStorage(state) {
    var _this5 = this;

    this.stateManagers.forEach(function (managerWithFilters) {
      if (!_this5.stateNameInFilters(state.name, managerWithFilters.filters)) {
        managerWithFilters.manager._replaceNamedStateInStorage(state);
      }
    });
  };

  _proto._saveState = function _saveState(name, stateObj) {
    var _this6 = this;

    this.stateManagers.forEach(function (managerWithFilters) {
      if (!_this6.stateNameInFilters(name, managerWithFilters.filters)) {
        aggLogger("saving state in state manager for state " + name);
        aggLogger(managerWithFilters.manager);
        aggLogger(stateObj);

        managerWithFilters.manager._saveState(name, stateObj);
      }
    });
  };

  _proto._addItemToState = function _addItemToState(name, stateObj, isPersisted) {
    var _this7 = this;

    if (isPersisted === void 0) {
      isPersisted = false;
    }

    this.stateManagers.forEach(function (managerWithFilters) {
      if (!_this7.stateNameInFilters(name, managerWithFilters.filters)) {
        aggLogger("adding item to state in  state manager for state " + name + ", is persisted = " + isPersisted);
        aggLogger(managerWithFilters.manager);
        aggLogger(stateObj);

        managerWithFilters.manager._addItemToState(name, stateObj, isPersisted);
      }
    });
  };

  _proto._removeItemFromState = function _removeItemFromState(name, stateObj, testForEqualityFunction, isPersisted) {
    var _this8 = this;

    this.stateManagers.forEach(function (managerWithFilters) {
      if (!_this8.stateNameInFilters(name, managerWithFilters.filters)) {
        aggLogger("removing item from state in state manager for state " + name);
        aggLogger(managerWithFilters.manager);
        aggLogger(stateObj);

        managerWithFilters.manager._removeItemFromState(name, stateObj, testForEqualityFunction, isPersisted);
      }
    });
  };

  _proto._updateItemInState = function _updateItemInState(name, stateObj, testForEqualityFunction, isPersisted) {
    var _this9 = this;

    this.stateManagers.forEach(function (managerWithFilters) {
      if (!_this9.stateNameInFilters(name, managerWithFilters.filters)) {
        aggLogger("updating item in state in  state manager for state " + name);
        aggLogger(managerWithFilters.manager);
        aggLogger(stateObj);

        managerWithFilters.manager._updateItemInState(name, stateObj, testForEqualityFunction, isPersisted);
      }
    });
  };

  _proto.stateNameInFilters = function stateNameInFilters(name, filters) {
    var foundIndex = filters.findIndex(function (filter) {
      return filter === name;
    });
    return foundIndex >= 0;
  };

  return AggregateStateManager;
}(_AbstractStateManager__WEBPACK_IMPORTED_MODULE_1__["AbstractStateManager"]);

/***/ }),

/***/ "./src/state/AsyncStateManagerWrapper.ts":
/*!***********************************************!*\
  !*** ./src/state/AsyncStateManagerWrapper.ts ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AsyncStateManagerWrapper; });
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _AbstractStateManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AbstractStateManager */ "./src/state/AbstractStateManager.ts");
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;

  _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}



var asyncLogger = debug__WEBPACK_IMPORTED_MODULE_0___default()('state-manager-async');

var AsyncStateManagerWrapper = /*#__PURE__*/function (_AbstractStateManager) {
  _inheritsLoose(AsyncStateManagerWrapper, _AbstractStateManager);

  function AsyncStateManagerWrapper(topLevelSM, wrappedSM) {
    var _this;

    _this = _AbstractStateManager.call(this, 'async') || this;
    _this.topLevelSM = topLevelSM;
    _this.wrappedSM = wrappedSM;
    _this.forceSaves = false;

    _this.wrappedSM.emitEvents();

    var stateNamesToMonitor = _this.wrappedSM.getConfiguredStateNames();

    _this.stateChanged = _this.stateChanged.bind(_assertThisInitialized(_this));
    _this.stateChangedItemAdded = _this.stateChangedItemAdded.bind(_assertThisInitialized(_this));
    _this.stateChangedItemRemoved = _this.stateChangedItemRemoved.bind(_assertThisInitialized(_this));
    _this.stateChangedItemUpdated = _this.stateChangedItemUpdated.bind(_assertThisInitialized(_this));
    stateNamesToMonitor.forEach(function (stateName) {
      _this.wrappedSM.addChangeListenerForName(stateName, _assertThisInitialized(_this));
    });
    return _this;
  }

  var _proto = AsyncStateManagerWrapper.prototype;

  _proto._addItemToState = function _addItemToState(name, stateObj, isPersisted) {
    if (isPersisted === void 0) {
      isPersisted = false;
    }

    asyncLogger("adding item to state " + name + " - is persisted " + isPersisted);
    this.wrappedSM.addNewItemToState(name, stateObj, isPersisted);
  };

  _proto._getState = function _getState(name) {
    // assume wrapped SM is asynchronous
    // make the call to get state but supply the caller with an empty state for now
    asyncLogger("getting state " + name);
    this.wrappedSM.getStateByName(name);
    return {
      name: name,
      value: []
    };
  };

  _proto._removeItemFromState = function _removeItemFromState(name, stateObj, testForEqualityFunction, isPersisted) {
    asyncLogger("removing item from state " + name);
    this.wrappedSM.removeItemFromState(name, stateObj, testForEqualityFunction, isPersisted);
  };

  _proto._updateItemInState = function _updateItemInState(name, stateObj, testForEqualityFunction, isPersisted) {
    asyncLogger("updating item in state " + name);
    this.wrappedSM.updateItemInState(name, stateObj, testForEqualityFunction, isPersisted);
  };

  _proto._ensureStatePresent = function _ensureStatePresent(name) {} // assume already present
  ;

  _proto._addNewNamedStateToStorage = function _addNewNamedStateToStorage(state) {} // assume already present
  ;

  _proto._replaceNamedStateInStorage = function _replaceNamedStateInStorage(state) {} // not implemented, not replacing state wholesale
  ;

  _proto._saveState = function _saveState(name, stateObj) {} // not implemented, not replacing state wholesale
  ;

  _proto.stateChangedItemRemoved = function stateChangedItemRemoved(managerName, name, itemRemoved) {} // not implemented, assumes called to wrapped SM worked
  ;

  _proto.stateChangedItemUpdated = function stateChangedItemUpdated(managerName, name, itemUpdated, itemNewValue) {} // not implemented, assumes called to wrapped SM worked
  ;

  _proto.stateChanged = function stateChanged(managerName, name, newValue) {
    // received new state from the wrapped SM
    // pass the received state to the top level SM
    asyncLogger("Wrapped SM has supplied new state " + name + " passing to top level SM");
    asyncLogger(newValue);
    this.topLevelSM.setStateByName(name, newValue);
  };

  _proto.stateChangedItemAdded = function stateChangedItemAdded(managerName, name, itemAdded) {
    asyncLogger("Wrapped SM has supplied new completed item for state " + name + " passing to top level SM");
    this.topLevelSM.addNewItemToState(name, itemAdded, true);
  };

  return AsyncStateManagerWrapper;
}(_AbstractStateManager__WEBPACK_IMPORTED_MODULE_1__["AbstractStateManager"]);



/***/ }),

/***/ "./src/state/BrowserStorageStateManager.ts":
/*!*************************************************!*\
  !*** ./src/state/BrowserStorageStateManager.ts ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BrowserStorageStateManager; });
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _AbstractStateManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AbstractStateManager */ "./src/state/AbstractStateManager.ts");
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;

  _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}



var lsLogger = debug__WEBPACK_IMPORTED_MODULE_0___default()('local-storage');

var BrowserStorageStateManager = /*#__PURE__*/function (_AbstractStateManager) {
  _inheritsLoose(BrowserStorageStateManager, _AbstractStateManager); // @ts-ignore


  function BrowserStorageStateManager(useLocalStorage) {
    var _this;

    if (useLocalStorage === void 0) {
      useLocalStorage = false;
    }

    _this = _AbstractStateManager.call(this, 'browser') || this;
    _this.configuration = [];
    _this.storage = window.sessionStorage;
    if (useLocalStorage) _this.storage = window.localStorage;
    _this.forceSaves = true;
    return _this;
  }

  BrowserStorageStateManager.getInstance = function getInstance(useLocalStorage) {
    if (useLocalStorage === void 0) {
      useLocalStorage = false;
    }

    if (!BrowserStorageStateManager._instance) {
      BrowserStorageStateManager._instance = new BrowserStorageStateManager(useLocalStorage);
    }

    return BrowserStorageStateManager._instance;
  };

  var _proto = BrowserStorageStateManager.prototype;

  _proto._ensureStatePresent = function _ensureStatePresent(name) {
    if (this.storage.getItem(name) === null) {
      this._addNewNamedStateToStorage({
        name: name,
        value: []
      });
    }
  };

  _proto._addNewNamedStateToStorage = function _addNewNamedStateToStorage(state) {
    lsLogger("Local Storage: Saving with key " + state.name);
    lsLogger(state);
    var stringifiedSaveData = JSON.stringify(state.value);
    lsLogger(stringifiedSaveData);
    this.storage.setItem(state.name, stringifiedSaveData);
  };

  _proto._replaceNamedStateInStorage = function _replaceNamedStateInStorage(state) {
    this._addNewNamedStateToStorage(state);
  };

  _proto._getState = function _getState(name) {
    var savedResults = [];
    lsLogger("Local Storage: Loading with key " + name);
    var savedResultsJSON = this.storage.getItem(name);
    lsLogger(savedResultsJSON);

    if (savedResultsJSON !== null) {
      savedResults = JSON.parse(savedResultsJSON);
    }

    return {
      name: name,
      value: savedResults
    };
  };

  _proto._saveState = function _saveState(name, newValue) {
    this._addNewNamedStateToStorage({
      name: name,
      value: newValue
    });
  };

  _proto._addItemToState = function _addItemToState(name, stateObj, isPersisted) {
    if (isPersisted === void 0) {
      isPersisted = false;
    }

    if (!isPersisted) return;

    var state = this._getState(name);

    lsLogger("adding item to state " + name);
    lsLogger(stateObj);
    state.value.push(stateObj);

    this._replaceNamedStateInStorage(state);
  };

  _proto._removeItemFromState = function _removeItemFromState(name, stateObj, testForEqualityFunction, isPersisted) {
    var state = this._getState(name);

    var valueIndex = state.value.findIndex(function (element) {
      return testForEqualityFunction(element, stateObj);
    });

    if (valueIndex >= 0) {
      lsLogger("removing item from state " + name);
      lsLogger(stateObj);
      state.value.splice(valueIndex, 1);
    }

    this._replaceNamedStateInStorage(state);
  };

  _proto._updateItemInState = function _updateItemInState(name, stateObj, testForEqualityFunction, isPersisted) {
    var state = this._getState(name);

    var valueIndex = state.value.findIndex(function (element) {
      return testForEqualityFunction(element, stateObj);
    });

    if (valueIndex >= 0) {
      state.value.splice(valueIndex, 1, stateObj);
      lsLogger("updating item in state " + name);
      lsLogger(stateObj);
    }

    this._replaceNamedStateInStorage(state);
  };

  _proto.forceResetForGet = function forceResetForGet(stateName) {};

  _proto.getConfiguredStateNames = function getConfiguredStateNames() {
    return this.configuration;
  };

  _proto.hasCompletedRun = function hasCompletedRun(stateName) {
    return false;
  };

  _proto.initialise = function initialise(config) {
    this.configuration = config;
  };

  return BrowserStorageStateManager;
}(_AbstractStateManager__WEBPACK_IMPORTED_MODULE_1__["AbstractStateManager"]);



/***/ }),

/***/ "./src/state/GraphQLApiStateManager.ts":
/*!*********************************************!*\
  !*** ./src/state/GraphQLApiStateManager.ts ***!
  \*********************************************/
/*! exports provided: GraphQLApiStateManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GraphQLApiStateManager", function() { return GraphQLApiStateManager; });
/* harmony import */ var _StateManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./StateManager */ "./src/state/StateManager.ts");
/* harmony import */ var _network_Types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../network/Types */ "./src/network/Types.ts");
/* harmony import */ var _network_DownloadManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../network/DownloadManager */ "./src/network/DownloadManager.ts");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _StateChangedDelegate__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./StateChangedDelegate */ "./src/state/StateChangedDelegate.ts");





/*
*
*   WORK IN PROGRESS
*
 */

var graphSMLogger = debug__WEBPACK_IMPORTED_MODULE_3___default()('state-manager-graphql');
var GraphQLApiStateManager = /*#__PURE__*/function () {
  function GraphQLApiStateManager() {
    this.configuration = [];
    this.delegate = new _StateChangedDelegate__WEBPACK_IMPORTED_MODULE_4__["default"]('graphql');
    this.emitEvents();
    this.bHasCompletedRun = [];
    this.callbackForAddItem = this.callbackForAddItem.bind(this);
    this.callbackForRemoveItem = this.callbackForRemoveItem.bind(this);
    this.callbackForUpdateItem = this.callbackForUpdateItem.bind(this);
    this.callbackForGetItems = this.callbackForGetItems.bind(this);
  }

  var _proto = GraphQLApiStateManager.prototype;

  _proto.getConfiguredStateNames = function getConfiguredStateNames() {
    var results = [];
    this.configuration.forEach(function (config) {
      results.push(config.stateName);
    });
    return results;
  };

  _proto.hasCompletedRun = function hasCompletedRun(stateName) {
    var result = false;
    var foundIndex = this.configuration.findIndex(function (config) {
      return config.stateName === stateName;
    });

    if (foundIndex >= 0) {
      result = this.bHasCompletedRun[foundIndex];
    }

    return result;
  };

  _proto.setCompletedRun = function setCompletedRun(stateName) {
    var foundIndex = this.configuration.findIndex(function (config) {
      return config.stateName === stateName;
    });

    if (foundIndex >= 0) {
      this.bHasCompletedRun[foundIndex] = true;
    }
  };

  _proto.forceResetForGet = function forceResetForGet(stateName) {
    var foundIndex = this.configuration.findIndex(function (config) {
      return config.stateName === stateName;
    });

    if (foundIndex >= 0) {
      this.bHasCompletedRun[foundIndex] = false;
    }
  };

  _proto.initialise = function initialise(config) {
    this.configuration = config;
    var runsComplete = [];
    this.configuration.forEach(function (configItem) {
      runsComplete.push(false);
    });
    this.bHasCompletedRun = runsComplete;
  };

  _proto._addNewNamedStateToStorage = function _addNewNamedStateToStorage(state) {
    /* assume model on the other end exists */
  };

  _proto._getState = function _getState(name) {
    graphSMLogger("Getting All " + name);

    if (this.hasCompletedRun(name)) {
      graphSMLogger("Getting All " + name + " - not done - previously retrieved");
    } else {
      var config = this.getConfigurationForStateName(name);

      if (config.isActive) {
        var query = config.apis.findAll;
        var jsonRequest = {
          url: config.apiURL,
          type: _network_Types__WEBPACK_IMPORTED_MODULE_1__["RequestType"].POST,
          params: {
            query: query
          },
          callback: this.callbackForGetItems,
          associatedStateName: name
        };
        graphSMLogger("Getting All " + name + " with query \"" + query + "\"");
        _network_DownloadManager__WEBPACK_IMPORTED_MODULE_2__["default"].addApiRequest(jsonRequest, true);
      } else {
        graphSMLogger("No configuration for state " + name);
      }
    }

    var state = {
      name: name,
      value: []
    };
    return state;
  };

  _proto._ensureStatePresent = function _ensureStatePresent(name) {
    /* assume state exists */
  };

  _proto._replaceNamedStateInStorage = function _replaceNamedStateInStorage(state) {
    /* not going to replace all state */
  };

  _proto._saveState = function _saveState(name, stateObj) {
    /* not going to replace all state */
  };

  _proto._addItemToState = function _addItemToState(name, stateObj, isPersisted) {
    if (isPersisted === void 0) {
      isPersisted = false;
    }

    if (isPersisted) return; // dont add complete objects to the state - they are already processed

    graphSMLogger("Adding item to " + name);
    graphSMLogger(stateObj);
    var config = this.getConfigurationForStateName(name);

    if (config.isActive) {
      var mutation = {};
      mutation[config.apis.create] = {};
      var jsonRequest = {
        url: config.apiURL,
        type: _network_Types__WEBPACK_IMPORTED_MODULE_1__["RequestType"].POST,
        params: {
          mutation: mutation
        },
        callback: this.callbackForAddItem,
        associatedStateName: name
      };
      _network_DownloadManager__WEBPACK_IMPORTED_MODULE_2__["default"].addApiRequest(jsonRequest, true);
    } else {
      graphSMLogger("No configuration for state " + name);
    }
  };

  _proto._removeItemFromState = function _removeItemFromState(name, stateObj, testForEqualityFunction, isPersisted) {
    if (isPersisted) return; // dont remove complete objects to the state - they are already processed

    graphSMLogger("Removing item to " + name);
    graphSMLogger(stateObj);
    var config = this.getConfigurationForStateName(name);

    if (config.isActive) {
      var mutation = {};
      mutation[config.apis.destroy] = {};
      var jsonRequest = {
        url: config.apiURL,
        type: _network_Types__WEBPACK_IMPORTED_MODULE_1__["RequestType"].POST,
        params: {
          mutation: mutation
        },
        callback: this.callbackForRemoveItem,
        associatedStateName: name
      };
      _network_DownloadManager__WEBPACK_IMPORTED_MODULE_2__["default"].addApiRequest(jsonRequest, true);
    } else {
      graphSMLogger("No configuration for state " + name);
    }
  };

  _proto._updateItemInState = function _updateItemInState(name, stateObj, testForEqualityFunction, isPersisted) {
    if (isPersisted) return; // dont update complete objects to the state - they are already processed

    graphSMLogger("Updating item in " + name);
    graphSMLogger(stateObj);
    var config = this.getConfigurationForStateName(name);

    if (config.isActive) {
      var mutation = {};
      mutation[config.apis.destroy] = {};
      var jsonRequest = {
        url: config.apiURL,
        type: _network_Types__WEBPACK_IMPORTED_MODULE_1__["RequestType"].POST,
        params: {
          mutation: mutation
        },
        callback: this.callbackForUpdateItem,
        associatedStateName: name
      };
      _network_DownloadManager__WEBPACK_IMPORTED_MODULE_2__["default"].addApiRequest(jsonRequest, true);
    } else {
      graphSMLogger("No configuration for state " + name);
    }
  };

  _proto.addChangeListenerForName = function addChangeListenerForName(name, listener) {
    this.delegate.addChangeListenerForName(name, listener);
  };

  _proto.addNewItemToState = function addNewItemToState(name, item, isPersisted) {
    this._addItemToState(name, item, isPersisted);
  };

  _proto.emitEvents = function emitEvents() {
    this.delegate.emitEvents();
  };

  _proto.findItemInState = function findItemInState(name, item, testForEqualityFunction) {
    throw Error("not implemented");
  };

  _proto.getStateByName = function getStateByName(name) {
    this._getState(name);
  };

  _proto.informChangeListenersForStateWithName = function informChangeListenersForStateWithName(name, stateObjValue, eventType, previousObjValue) {
    this.delegate.informChangeListenersForStateWithName(name, stateObjValue, eventType, previousObjValue);
  };

  _proto.isItemInState = function isItemInState(name, item, testForEqualityFunction) {
    return true;
  };

  _proto.removeItemFromState = function removeItemFromState(name, item, testForEqualityFunction, isPersisted) {
    this._removeItemFromState(name, item, testForEqualityFunction, isPersisted);

    return true;
  };

  _proto.setStateByName = function setStateByName(name, stateObjectForName, informListeners) {};

  _proto.suppressEvents = function suppressEvents() {
    this.delegate.suppressEvents();
  };

  _proto.updateItemInState = function updateItemInState(name, item, testForEqualityFunction, isPersisted) {
    this._updateItemInState(name, item, testForEqualityFunction, isPersisted);

    return true;
  };

  _proto.getConfigurationForStateName = function getConfigurationForStateName(name) {
    var config = {
      stateName: name,
      apiURL: '/graphql',
      apis: {
        findAll: '',
        create: '',
        destroy: '',
        update: '',
        find: ''
      },
      data: {
        findAll: '',
        create: '',
        destroy: '',
        update: '',
        find: ''
      },
      isActive: false
    };
    var foundIndex = this.configuration.findIndex(function (config) {
      return config.stateName === name;
    });

    if (foundIndex >= 0) {
      config = this.configuration[foundIndex];
    }

    return config;
  };

  _proto.callbackForRemoveItem = function callbackForRemoveItem(data, status, associatedStateName) {
    graphSMLogger("callback for remove item for state " + associatedStateName + " with status " + status + " - not forwarded");

    if (status >= 200 && status <= 299) {
      // do we have any data?
      graphSMLogger(data);
    }
  };

  _proto.callbackForUpdateItem = function callbackForUpdateItem(data, status, associatedStateName) {
    graphSMLogger("callback for update item for state " + associatedStateName + " with status " + status + " - not forwarded");

    if (status >= 200 && status <= 299) {
      // do we have any data?
      graphSMLogger(data);
    }
  };

  _proto.callbackForGetItems = function callbackForGetItems(data, status, associatedStateName) {
    graphSMLogger("callback for get items for state " + associatedStateName + " with status " + status + " - FORWARDING");

    if (status >= 200 && status <= 299) {
      // do we have any data?
      graphSMLogger(data);
      var config = this.getConfigurationForStateName(associatedStateName);
      var dataAttribute = config.data.findAll;
      this.setCompletedRun(associatedStateName);
      this.delegate.informChangeListenersForStateWithName(associatedStateName, data.data[dataAttribute], _StateManager__WEBPACK_IMPORTED_MODULE_0__["stateEventType"].StateChanged, null);
    }
  };

  _proto.callbackForAddItem = function callbackForAddItem(data, status, associatedStateName) {
    graphSMLogger("callback for add item for state " + associatedStateName + " with status " + status + " - FORWARDING");

    if (status >= 200 && status <= 299) {
      // do we have any data?
      graphSMLogger(data);
      this.delegate.informChangeListenersForStateWithName(associatedStateName, data, _StateManager__WEBPACK_IMPORTED_MODULE_0__["stateEventType"].ItemAdded, null);
    }
  };

  return GraphQLApiStateManager;
}();

/***/ }),

/***/ "./src/state/MemoryBufferStateManager.ts":
/*!***********************************************!*\
  !*** ./src/state/MemoryBufferStateManager.ts ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _AbstractStateManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AbstractStateManager */ "./src/state/AbstractStateManager.ts");
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;

  _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}



var msManager = debug__WEBPACK_IMPORTED_MODULE_0___default()('state-manager-ms');
/** To Do - make state unchangeable outside of this class (i.e. deep copies) */

var MemoryBufferStateManager = /*#__PURE__*/function (_AbstractStateManager) {
  _inheritsLoose(MemoryBufferStateManager, _AbstractStateManager);

  function MemoryBufferStateManager() {
    var _this;

    _this = _AbstractStateManager.call(this, 'memory') || this;
    _this.applicationState = [];
    _this.forceSaves = true;
    return _this;
  }

  MemoryBufferStateManager.getInstance = function getInstance() {
    if (!MemoryBufferStateManager._instance) {
      MemoryBufferStateManager._instance = new MemoryBufferStateManager();
    }

    return MemoryBufferStateManager._instance;
  };

  var _proto = MemoryBufferStateManager.prototype;

  _proto._ensureStatePresent = function _ensureStatePresent(name) {
    var foundIndex = this.applicationState.findIndex(function (element) {
      return element.name === name;
    });

    if (foundIndex < 0) {
      var state = {
        name: name,
        value: []
      };
      this.applicationState.push(state);
    }
  };

  _proto._addNewNamedStateToStorage = function _addNewNamedStateToStorage(state) {
    msManager("Adding new complete state " + name);
    msManager(state.value);
    this.applicationState.push(state);
  };

  _proto._replaceNamedStateInStorage = function _replaceNamedStateInStorage(state) {
    var foundIndex = this.applicationState.findIndex(function (element) {
      return element.name === state.name;
    });

    if (foundIndex >= 0) {
      msManager("replacing complete state " + name);
      msManager(state.value);
      this.applicationState.splice(foundIndex, 1, state);
    }
  };

  _proto._getState = function _getState(name) {
    // @ts-ignore
    var state = this.applicationState.find(function (element) {
      return element.name === name;
    });
    msManager("getting complete state " + name);
    msManager(state.value);
    return state;
  };

  _proto._saveState = function _saveState(name, stateObject) {
    var foundIndex = this.applicationState.findIndex(function (element) {
      return element.name === name;
    });

    if (foundIndex >= 0) {
      var state = this.applicationState[foundIndex];
      msManager("SAVING complete state " + name);
      msManager(state.value);
      state.value = stateObject;
    }
  };

  _proto._addItemToState = function _addItemToState(name, stateObj, isPersisted) {
    if (isPersisted === void 0) {
      isPersisted = false;
    }

    if (!isPersisted) return; // dont add incomplete objects to the state

    var foundIndex = this.applicationState.findIndex(function (element) {
      return element.name === name;
    });

    if (foundIndex >= 0) {
      var state = this.applicationState[foundIndex];
      msManager("adding item to state " + name);
      msManager(stateObj);
      state.value.push(stateObj);
    }
  };

  _proto._removeItemFromState = function _removeItemFromState(name, stateObj, testForEqualityFunction, isPersisted) {
    var foundIndex = this.applicationState.findIndex(function (element) {
      return element.name === name;
    });

    if (foundIndex >= 0) {
      var state = this.applicationState[foundIndex];
      var valueIndex = state.value.findIndex(function (element) {
        return testForEqualityFunction(element, stateObj);
      });

      if (valueIndex >= 0) {
        msManager("removing item from state " + name);
        msManager(stateObj);
        state.value.splice(valueIndex, 1);
      }
    }
  };

  _proto._updateItemInState = function _updateItemInState(name, stateObj, testForEqualityFunction, isPersisted) {
    var foundIndex = this.applicationState.findIndex(function (element) {
      return element.name === name;
    });

    if (foundIndex >= 0) {
      var state = this.applicationState[foundIndex];
      var valueIndex = state.value.findIndex(function (element) {
        return testForEqualityFunction(element, stateObj);
      });

      if (valueIndex >= 0) {
        state.value.splice(valueIndex, 1, stateObj);
        msManager("updating item in state " + name);
        msManager(stateObj);
      }
    } else {
      this._addItemToState(name, stateObj, true);
    }
  };

  return MemoryBufferStateManager;
}(_AbstractStateManager__WEBPACK_IMPORTED_MODULE_1__["AbstractStateManager"]);

/* harmony default export */ __webpack_exports__["default"] = (MemoryBufferStateManager);

/***/ }),

/***/ "./src/state/RESTApiStateManager.ts":
/*!******************************************!*\
  !*** ./src/state/RESTApiStateManager.ts ***!
  \******************************************/
/*! exports provided: RESTApiStateManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RESTApiStateManager", function() { return RESTApiStateManager; });
/* harmony import */ var _StateManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./StateManager */ "./src/state/StateManager.ts");
/* harmony import */ var _network_Types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../network/Types */ "./src/network/Types.ts");
/* harmony import */ var _network_DownloadManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../network/DownloadManager */ "./src/network/DownloadManager.ts");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _StateChangedDelegate__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./StateChangedDelegate */ "./src/state/StateChangedDelegate.ts");





var apiSMLogger = debug__WEBPACK_IMPORTED_MODULE_3___default()('state-manager-api');
var RESTApiStateManager = /*#__PURE__*/function () {
  function RESTApiStateManager() {
    this.configuration = [];
    this.delegate = new _StateChangedDelegate__WEBPACK_IMPORTED_MODULE_4__["default"]('restapi');
    this.emitEvents();
    this.bHasCompletedRun = [];
    this.callbackForAddItem = this.callbackForAddItem.bind(this);
    this.callbackForRemoveItem = this.callbackForRemoveItem.bind(this);
    this.callbackForUpdateItem = this.callbackForUpdateItem.bind(this);
    this.callbackForGetItems = this.callbackForGetItems.bind(this);
  }

  RESTApiStateManager.getInstance = function getInstance() {
    if (!RESTApiStateManager._instance) {
      RESTApiStateManager._instance = new RESTApiStateManager();
    }

    return RESTApiStateManager._instance;
  };

  var _proto = RESTApiStateManager.prototype;

  _proto.getConfiguredStateNames = function getConfiguredStateNames() {
    var results = [];
    this.configuration.forEach(function (config) {
      results.push(config.stateName);
    });
    return results;
  };

  _proto.hasCompletedRun = function hasCompletedRun(stateName) {
    var result = false;
    var foundIndex = this.configuration.findIndex(function (config) {
      return config.stateName === stateName;
    });

    if (foundIndex >= 0) {
      result = this.bHasCompletedRun[foundIndex];
    }

    return result;
  };

  _proto.setCompletedRun = function setCompletedRun(stateName) {
    var foundIndex = this.configuration.findIndex(function (config) {
      return config.stateName === stateName;
    });

    if (foundIndex >= 0) {
      this.bHasCompletedRun[foundIndex] = true;
    }
  };

  _proto.forceResetForGet = function forceResetForGet(stateName) {
    var foundIndex = this.configuration.findIndex(function (config) {
      return config.stateName === stateName;
    });

    if (foundIndex >= 0) {
      this.bHasCompletedRun[foundIndex] = false;
    }
  };

  _proto.initialise = function initialise(config) {
    this.configuration = config;
    var runsComplete = [];
    this.configuration.forEach(function (configItem) {
      runsComplete.push(false);
    });
    this.bHasCompletedRun = runsComplete;
  };

  _proto._addNewNamedStateToStorage = function _addNewNamedStateToStorage(state) {
    /* assume model on the other end exists */
  };

  _proto._getState = function _getState(name) {
    apiSMLogger("Getting All " + name);

    if (this.hasCompletedRun(name)) {
      apiSMLogger("Getting All " + name + " - not done - previously retrieved");
    } else {
      var config = this.getConfigurationForStateName(name);

      if (config.isActive) {
        var jsonRequest = {
          url: config.serverURL + config.api,
          type: _network_Types__WEBPACK_IMPORTED_MODULE_1__["RequestType"].GET,
          params: {},
          callback: this.callbackForGetItems,
          associatedStateName: name
        };
        _network_DownloadManager__WEBPACK_IMPORTED_MODULE_2__["default"].addApiRequest(jsonRequest, true);
      } else {
        apiSMLogger("No configuration for state " + name);
      }
    }

    var state = {
      name: name,
      value: []
    };
    return state;
  };

  _proto._ensureStatePresent = function _ensureStatePresent(name) {
    /* assume state exists */
  };

  _proto._replaceNamedStateInStorage = function _replaceNamedStateInStorage(state) {
    /* not going to replace all state */
  };

  _proto._saveState = function _saveState(name, stateObj) {
    /* not going to replace all state */
  };

  _proto._addItemToState = function _addItemToState(name, stateObj, isPersisted) {
    if (isPersisted === void 0) {
      isPersisted = false;
    }

    if (isPersisted) return; // dont add complete objects to the state - they are already processed

    apiSMLogger("Adding item to " + name);
    apiSMLogger(stateObj);
    var config = this.getConfigurationForStateName(name);

    if (config.isActive) {
      var jsonRequest = {
        url: config.serverURL + config.api,
        type: _network_Types__WEBPACK_IMPORTED_MODULE_1__["RequestType"].POST,
        params: stateObj,
        callback: this.callbackForAddItem,
        associatedStateName: name
      };
      _network_DownloadManager__WEBPACK_IMPORTED_MODULE_2__["default"].addApiRequest(jsonRequest, true);
    } else {
      apiSMLogger("No configuration for state " + name);
    }
  };

  _proto._removeItemFromState = function _removeItemFromState(name, stateObj, testForEqualityFunction, isPersisted) {
    if (isPersisted) return; // dont remove complete objects to the state - they are already processed

    apiSMLogger("Removing item to " + name);
    apiSMLogger(stateObj);
    var config = this.getConfigurationForStateName(name);

    if (config.isActive) {
      var jsonRequest = {
        url: config.serverURL + config.api,
        type: _network_Types__WEBPACK_IMPORTED_MODULE_1__["RequestType"].DELETE,
        params: {
          id: stateObj.id
        },
        callback: this.callbackForRemoveItem,
        associatedStateName: name
      };
      _network_DownloadManager__WEBPACK_IMPORTED_MODULE_2__["default"].addApiRequest(jsonRequest, true);
    } else {
      apiSMLogger("No configuration for state " + name);
    }
  };

  _proto._updateItemInState = function _updateItemInState(name, stateObj, testForEqualityFunction, isPersisted) {
    if (isPersisted) return; // dont update complete objects to the state - they are already processed

    apiSMLogger("Updating item in " + name);
    apiSMLogger(stateObj);
    var config = this.getConfigurationForStateName(name);

    if (config.isActive) {
      var jsonRequest = {
        url: config.serverURL + config.api,
        type: _network_Types__WEBPACK_IMPORTED_MODULE_1__["RequestType"].PUT,
        params: stateObj,
        callback: this.callbackForUpdateItem,
        associatedStateName: name
      };
      _network_DownloadManager__WEBPACK_IMPORTED_MODULE_2__["default"].addApiRequest(jsonRequest, true);
    } else {
      apiSMLogger("No configuration for state " + name);
    }
  };

  _proto.addChangeListenerForName = function addChangeListenerForName(name, listener) {
    this.delegate.addChangeListenerForName(name, listener);
  };

  _proto.addNewItemToState = function addNewItemToState(name, item, isPersisted) {
    this._addItemToState(name, item, isPersisted);
  };

  _proto.emitEvents = function emitEvents() {
    this.delegate.emitEvents();
  };

  _proto.findItemInState = function findItemInState(name, item, testForEqualityFunction) {
    throw Error("not implemented");
  };

  _proto.getStateByName = function getStateByName(name) {
    this._getState(name);
  };

  _proto.informChangeListenersForStateWithName = function informChangeListenersForStateWithName(name, stateObjValue, eventType, previousObjValue) {
    this.delegate.informChangeListenersForStateWithName(name, stateObjValue, eventType, previousObjValue);
  };

  _proto.isItemInState = function isItemInState(name, item, testForEqualityFunction) {
    return true;
  };

  _proto.removeItemFromState = function removeItemFromState(name, item, testForEqualityFunction, isPersisted) {
    this._removeItemFromState(name, item, testForEqualityFunction, isPersisted);

    return true;
  };

  _proto.setStateByName = function setStateByName(name, stateObjectForName, informListeners) {};

  _proto.suppressEvents = function suppressEvents() {
    this.delegate.suppressEvents();
  };

  _proto.updateItemInState = function updateItemInState(name, item, testForEqualityFunction, isPersisted) {
    this._updateItemInState(name, item, testForEqualityFunction, isPersisted);

    return true;
  };

  _proto.getConfigurationForStateName = function getConfigurationForStateName(name) {
    var config = {
      stateName: name,
      serverURL: '',
      api: '',
      isActive: false
    };
    var foundIndex = this.configuration.findIndex(function (config) {
      return config.stateName === name;
    });

    if (foundIndex >= 0) {
      config = this.configuration[foundIndex];
    }

    return config;
  };

  _proto.callbackForRemoveItem = function callbackForRemoveItem(data, status, associatedStateName) {
    apiSMLogger("callback for remove item for state " + associatedStateName + " with status " + status + " - not forwarded");

    if (status >= 200 && status <= 299) {
      // do we have any data?
      apiSMLogger(data);
    }
  };

  _proto.callbackForUpdateItem = function callbackForUpdateItem(data, status, associatedStateName) {
    apiSMLogger("callback for update item for state " + associatedStateName + " with status " + status + " - not forwarded");

    if (status >= 200 && status <= 299) {
      // do we have any data?
      apiSMLogger(data);
    }
  };

  _proto.callbackForGetItems = function callbackForGetItems(data, status, associatedStateName) {
    apiSMLogger("callback for get items for state " + associatedStateName + " with status " + status + " - FORWARDING");

    if (status >= 200 && status <= 299) {
      // do we have any data?
      apiSMLogger(data);
      this.setCompletedRun(associatedStateName);
      this.delegate.informChangeListenersForStateWithName(associatedStateName, data, _StateManager__WEBPACK_IMPORTED_MODULE_0__["stateEventType"].StateChanged, null);
    }
  };

  _proto.callbackForAddItem = function callbackForAddItem(data, status, associatedStateName) {
    apiSMLogger("callback for add item for state " + associatedStateName + " with status " + status + " - FORWARDING");

    if (status >= 200 && status <= 299) {
      // do we have any data?
      apiSMLogger(data);
      this.delegate.informChangeListenersForStateWithName(associatedStateName, data, _StateManager__WEBPACK_IMPORTED_MODULE_0__["stateEventType"].ItemAdded, null);
    }
  };

  return RESTApiStateManager;
}();

/***/ }),

/***/ "./src/state/StateChangedDelegate.ts":
/*!*******************************************!*\
  !*** ./src/state/StateChangedDelegate.ts ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _StateManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./StateManager */ "./src/state/StateManager.ts");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_1__);


var smLogger = debug__WEBPACK_IMPORTED_MODULE_1___default()('state-manager-delegate');

var StateChangedDelegate = /*#__PURE__*/function () {
  function StateChangedDelegate(managerName) {
    this.suppressEventEmits = false;
    this.managerName = managerName;
    this.stateChangeListeners = [];
  }

  var _proto = StateChangedDelegate.prototype;

  _proto.suppressEvents = function suppressEvents() {
    this.suppressEventEmits = true;
  };

  _proto.emitEvents = function emitEvents() {
    this.suppressEventEmits = false;
  };

  _proto.informChangeListenersForStateWithName = function informChangeListenersForStateWithName(name, stateObjValue, eventType, previousObjValue) {
    if (eventType === void 0) {
      eventType = _StateManager__WEBPACK_IMPORTED_MODULE_0__["stateEventType"].StateChanged;
    }

    if (previousObjValue === void 0) {
      previousObjValue = null;
    }

    smLogger("State Manager: Informing state listeners of " + name);

    if (this.suppressEventEmits) {
      smLogger("State Manager: Events suppressed");
      return;
    }

    var foundIndex = this.stateChangeListeners.findIndex(function (element) {
      return element.name === name;
    });

    if (foundIndex >= 0) {
      smLogger("State Manager: Found state listeners of " + name + " with event type " + eventType);
      /* let each state change listener know */

      var changeListenersForName = this.stateChangeListeners[foundIndex];

      for (var index = 0; index < changeListenersForName.listeners.length; index++) {
        smLogger("State Manager: Found state listener of " + name + " - informing");
        var listener = changeListenersForName.listeners[index];

        switch (eventType) {
          case _StateManager__WEBPACK_IMPORTED_MODULE_0__["stateEventType"].StateChanged:
            {
              listener.stateChanged(this.managerName, name, stateObjValue);
              break;
            }

          case _StateManager__WEBPACK_IMPORTED_MODULE_0__["stateEventType"].ItemAdded:
            {
              listener.stateChangedItemAdded(this.managerName, name, stateObjValue);
              break;
            }

          case _StateManager__WEBPACK_IMPORTED_MODULE_0__["stateEventType"].ItemUpdated:
            {
              listener.stateChangedItemUpdated(this.managerName, name, previousObjValue, stateObjValue);
              break;
            }

          case _StateManager__WEBPACK_IMPORTED_MODULE_0__["stateEventType"].ItemDeleted:
            {
              listener.stateChangedItemRemoved(this.managerName, name, stateObjValue);
              break;
            }
        }
      }
    }
  }
  /*
        Add a state listener for a given state name
        the listener should be a function with two parameters
        name - string - the name of the state variable that they want to be informed about
        stateObjValue - object - the new state value
       */
  ;

  _proto.addChangeListenerForName = function addChangeListenerForName(name, listener) {
    this.ensureListenerSetupForName(name);
    smLogger("State Manager: Adding state listener for " + name);
    var foundIndex = this.stateChangeListeners.findIndex(function (element) {
      return element.name === name;
    });

    if (foundIndex >= 0) {
      var changeListenersForName = this.stateChangeListeners[foundIndex];
      changeListenersForName.listeners.push(listener);
    }
  };

  _proto.ensureListenerSetupForName = function ensureListenerSetupForName(name) {
    var foundIndex = this.stateChangeListeners.findIndex(function (element) {
      return element.name === name;
    });

    if (foundIndex < 0) {
      var listenersNameArrayPair = {
        name: name,
        listeners: []
      };
      this.stateChangeListeners.push(listenersNameArrayPair);
    }
  };

  return StateChangedDelegate;
}();

/* harmony default export */ __webpack_exports__["default"] = (StateChangedDelegate);

/***/ }),

/***/ "./src/state/StateManager.ts":
/*!***********************************!*\
  !*** ./src/state/StateManager.ts ***!
  \***********************************/
/*! exports provided: stateEventType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stateEventType", function() { return stateEventType; });
var stateEventType;

(function (stateEventType) {
  stateEventType[stateEventType["ItemAdded"] = 0] = "ItemAdded";
  stateEventType[stateEventType["ItemUpdated"] = 1] = "ItemUpdated";
  stateEventType[stateEventType["ItemDeleted"] = 2] = "ItemDeleted";
  stateEventType[stateEventType["StateChanged"] = 3] = "StateChanged";
})(stateEventType || (stateEventType = {}));

/***/ }),

/***/ "./src/template/TemplateManager.ts":
/*!*****************************************!*\
  !*** ./src/template/TemplateManager.ts ***!
  \*****************************************/
/*! exports provided: TemplateManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TemplateManager", function() { return TemplateManager; });
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_1__);


var templateLogger = debug__WEBPACK_IMPORTED_MODULE_1___default()('template-manager');
var TemplateManager = /*#__PURE__*/function () {
  function TemplateManager() {}

  TemplateManager.getInstance = function getInstance() {
    if (!TemplateManager._instance) {
      TemplateManager._instance = new TemplateManager();
    }

    return TemplateManager._instance;
  };

  var _proto = TemplateManager.prototype;

  _proto.getScoreSheetTemplate = function getScoreSheetTemplate(boardGame) {
    if (boardGame.gameId === 270314) {
      return this.getOhanamiTemplate();
    }

    if (boardGame.gameId === 333201) {
      return this.getSkullKingTemplate();
    }

    return this.getDefaultScoreSheetTemplate(boardGame);
  };

  _proto.getScoreSheetStartingData = function getScoreSheetStartingData(boardGame) {
    if (boardGame.gameId === 270314) {
      return this.getOhanamiStartingData();
    }

    if (boardGame.gameId === 333201) {
      return this.getSkullKingStartingData();
    }

    return this.getDefaultScoreSheetStartingData(boardGame);
  };

  _proto.getSaveData = function getSaveData(boardGame, scoreSheet) {
    if (boardGame.gameId === 270314) {
      return this.getOhanamiSaveData(scoreSheet);
    }

    if (boardGame.gameId === 333201) {
      return this.getSkullKingSaveData(scoreSheet);
    }

    return this.getDefaultSaveData(scoreSheet);
  };

  _proto.transformDataAfterUserChange = function transformDataAfterUserChange(boardGame, scoreSheet) {
    var result = false;

    if (boardGame.gameId === 270314) {
      result = true;
      this.transformOhanamiData(scoreSheet);
    }

    if (boardGame.gameId === 333201) {
      result = true;
      this.transformSkullKingData(scoreSheet);
    }

    return result; // do nothing unless for a specific game
  };

  _proto.getOhanamiTemplate = function getOhanamiTemplate() {
    var template = {
      colHeaders: false,
      rowHeaders: false,
      licenseKey: 'non-commercial-and-evaluation',
      manualColumnResize: false,
      manualRowResize: false,
      selectionMode: 'single',
      cells: function cells(row, column) {
        if (column === 0 || column === 1 || row === 8) {
          return {
            readOnly: true,
            className: 'bg-readonly-heading'
          };
        }

        if (column > 1) {
          if (row === 1 || row === 2 || row === 4) {
            return {
              className: 'bg-ohanami-blue',
              forceNumeric: true
            };
          }

          if (row === 3 || row === 5) {
            return {
              className: 'bg-ohanami-green',
              forceNumeric: true
            };
          }

          if (row === 6) {
            return {
              className: 'bg-ohanami-grey',
              forceNumeric: true
            };
          }

          if (row === 7) {
            return {
              className: 'bg-ohanami-pink',
              forceNumeric: true
            };
          }
        }
      }
    };
    templateLogger(template);
    return template;
  };

  _proto.getSkullKingTemplate = function getSkullKingTemplate() {
    var template = {
      colHeaders: false,
      rowHeaders: false,
      licenseKey: 'non-commercial-and-evaluation',
      manualColumnResize: false,
      manualRowResize: false,
      selectionMode: 'single',
      cells: function cells(row, column) {
        if (column === 0 || column === 1 || row === 21) {
          return {
            readOnly: true,
            className: 'bg-readonly-heading'
          };
        }

        if (column % 2 === 0) {
          if (row % 2 === 0) {
            return {
              className: 'bg-readonly'
            };
          }
        }
      }
    };
    templateLogger(template);
    return template;
  };

  _proto.getSkullKingStartingData = function getSkullKingStartingData() {
    return [['Round', '', 'P 1', '', 'P 2', '', 'P 3', '', 'P 4', ''], ['1', 'bid', '', '', '', '', '', '', '', ''], ['', 'bonus', '', '', '', '', '', '', '', ''], ['2', 'bid', '', '', '', '', '', '', '', ''], ['', 'bonus', '', '', '', '', '', '', '', ''], ['3', 'bid', '', '', '', '', '', '', '', ''], ['', 'bonus', '', '', '', '', '', '', '', ''], ['4', 'bid', '', '', '', '', '', '', '', ''], ['', 'bonus', '', '', '', '', '', '', '', ''], ['5', 'bid', '', '', '', '', '', '', '', ''], ['', 'bonus', '', '', '', '', '', '', '', ''], ['6', 'bid', '', '', '', '', '', '', '', ''], ['', 'bonus', '', '', '', '', '', '', '', ''], ['7', 'bid', '', '', '', '', '', '', '', ''], ['', 'bonus', '', '', '', '', '', '', '', ''], ['8', 'bid', '', '', '', '', '', '', '', ''], ['', 'bonus', '', '', '', '', '', '', '', ''], ['9', 'bid', '', '', '', '', '', '', '', ''], ['', 'bonus', '', '', '', '', '', '', '', ''], ['10', 'bid', '', '', '', '', '', '', '', ''], ['', 'bonus', '', '', '', '', '', '', '', ''], ['Total', '', '', '', '', '', '', '', '', '']];
  };

  _proto.getOhanamiStartingData = function getOhanamiStartingData() {
    return [['Round', 'Mult.', 'P 1', 'P 2', 'P 3', 'P 4'], ['1', 'x3', '0', '0', '0', '0'], ['2', 'x3', '0', '0', '0', '0'], ['', 'x4', '0', '0', '0', '0'], ['3', 'x3', '0', '0', '0', '0'], ['', 'x4', '0', '0', '0', '0'], ['', 'x7', '0', '0', '0', '0'], ['', 'var', '0', '0', '0', '0'], ['Total', '', '0', '0', '0', '0']];
  };

  _proto.getDefaultScoreSheetTemplate = function getDefaultScoreSheetTemplate(boardGame) {
    return {
      //width:'90%',
      //height:'90%',
      colHeaders: false,
      rowHeaders: false,
      licenseKey: 'non-commercial-and-evaluation',
      manualColumnResize: false,
      manualRowResize: false,
      selectionMode: 'single',
      columnSummary: [{
        destinationRow: 0,
        destinationColumn: 0,
        reversedRowCoords: true,
        type: 'sum',
        forceNumeric: true
      }, {
        destinationRow: 0,
        destinationColumn: 1,
        reversedRowCoords: true,
        type: 'sum',
        forceNumeric: true
      }, {
        destinationRow: 0,
        destinationColumn: 2,
        reversedRowCoords: true,
        type: 'sum',
        forceNumeric: true
      }, {
        destinationRow: 0,
        destinationColumn: 3,
        reversedRowCoords: true,
        type: 'sum',
        forceNumeric: true
      }, {
        destinationRow: 0,
        destinationColumn: 4,
        reversedRowCoords: true,
        type: 'sum',
        forceNumeric: true
      }, {
        destinationRow: 0,
        destinationColumn: 5,
        reversedRowCoords: true,
        type: 'sum',
        forceNumeric: true
      }, {
        destinationRow: 0,
        destinationColumn: 6,
        reversedRowCoords: true,
        type: 'sum',
        forceNumeric: true
      }]
    };
  };

  _proto.getDefaultScoreSheetStartingData = function getDefaultScoreSheetStartingData(boardGame) {
    return [['P 1', 'P 2', 'P 3', 'P 4', 'P 5', 'P 6', 'P 7'], ['0', '0', '0', '0', '0', '0', '0'], ['0', '0', '0', '0', '0', '0', '0'], ['0', '0', '0', '0', '0', '0', '0'], ['0', '0', '0', '0', '0', '0', '0'], ['0', '0', '0', '0', '0', '0', '0'], ['0', '0', '0', '0', '0', '0', '0'], ['0', '0', '0', '0', '0', '0', '0'], ['0', '0', '0', '0', '0', '0', '0'], ['0', '0', '0', '0', '0', '0', '0'], ['0', '0', '0', '0', '0', '0', '0'], ['0', '0', '0', '0', '0', '0', '0']];
  };

  _proto.getDefaultSaveData = function getDefaultSaveData(scoreSheet) {
    var saveData = {
      id: scoreSheet.room,
      jsonData: JSON.stringify(scoreSheet),
      createdOn: moment__WEBPACK_IMPORTED_MODULE_0___default()().format('YYYYMMDDHHmmss'),
      players: [],
      scores: []
    }; // process the table data for names and scores
    // the first row is the player names
    // @ts-ignore

    var playerNames = scoreSheet.data[0]; // @ts-ignore

    var scores = scoreSheet.data[scoreSheet.data.length - 1]; // ensure the scores are numbers

    scores.forEach(function (score, index) {
      var parsed = parseInt(score);

      if (isNaN(parsed)) {
        scores[index] = 0;
      } else {
        scores[index] = parsed;
      }
    }); // @ts-ignore

    saveData.players = playerNames; // @ts-ignore

    saveData.scores = scores;
    return saveData;
  };

  _proto.getOhanamiSaveData = function getOhanamiSaveData(scoreSheet) {
    var saveData = {
      id: scoreSheet.room,
      jsonData: JSON.stringify(scoreSheet),
      createdOn: moment__WEBPACK_IMPORTED_MODULE_0___default()().format('YYYYMMDDHHmmss'),
      players: [],
      scores: []
    }; // process the table data for names and scores
    // the first row is the player names, after the first two columns
    // @ts-ignore

    var playerNames = scoreSheet.data[0]; // @ts-ignore

    var scores = scoreSheet.data[scoreSheet.data.length - 1];

    for (var index = 2; index < playerNames.length; index++) {
      // @ts-ignore
      saveData.players.push(playerNames[index]);
      var parsed = parseInt(scores[index]);

      if (isNaN(parsed)) {
        parsed = 0;
      } // @ts-ignore


      saveData.scores.push(parsed);
    }

    templateLogger("Save data for ohanami is");
    templateLogger(saveData);
    return saveData;
  };

  _proto.getSkullKingSaveData = function getSkullKingSaveData(scoreSheet) {
    var saveData = {
      id: scoreSheet.room,
      jsonData: JSON.stringify(scoreSheet),
      createdOn: moment__WEBPACK_IMPORTED_MODULE_0___default()().format('YYYYMMDDHHmmss'),
      players: [],
      scores: []
    }; // process the table data for names and scores
    // the first row is the player names, after the first three columns, every second column
    // @ts-ignore

    var playerNames = scoreSheet.data[0]; // last row is the scores, following the same pattern as the playr names
    // @ts-ignore

    var scores = scoreSheet.data[scoreSheet.data.length - 1];

    for (var index = 3; index < playerNames.length; index += 2) {
      // @ts-ignore
      saveData.players.push(playerNames[index]);
      var parsed = parseInt(scores[index]);

      if (isNaN(parsed)) {
        parsed = 0;
      } // @ts-ignore


      saveData.scores.push(parsed);
    }

    templateLogger("Save data for skull king is");
    templateLogger(saveData);
    return saveData;
  };

  _proto.calculateOhanamiPinkScore = function calculateOhanamiPinkScore(numOfCards) {
    var score = 0;

    if (numOfCards > 0) {
      if (numOfCards > 15) numOfCards = 15;

      while (numOfCards > 0) {
        score += numOfCards;
        numOfCards--;
      }
    }

    return score;
  };

  _proto.transformOhanamiData = function transformOhanamiData(scoreSheet) {
    // need to calculate the player scores
    for (var index = 0; index < 4; index++) {
      /*
       *  for each player the score is the sum of
       *  3 x row 1, 2, and 4
       *  4 x row 3 and 5
       *  7 x row 6
       *  row 7 is complicated
       */
      var score = 0; // @ts-ignore

      var parsed = parseInt(scoreSheet.data[1][index + 2]);
      if (!isNaN(parsed)) score += 3 * parsed; // @ts-ignore

      parsed = parseInt(scoreSheet.data[2][index + 2]);
      if (!isNaN(parsed)) score += 3 * parsed; // @ts-ignore

      parsed = parseInt(scoreSheet.data[4][index + 2]);
      if (!isNaN(parsed)) score += 3 * parsed; // @ts-ignore

      parsed = parseInt(scoreSheet.data[3][index + 2]);
      if (!isNaN(parsed)) score += 4 * parsed; // @ts-ignore

      parsed = parseInt(scoreSheet.data[5][index + 2]);
      if (!isNaN(parsed)) score += 4 * parsed; // @ts-ignore

      parsed = parseInt(scoreSheet.data[6][index + 2]);
      if (!isNaN(parsed)) score += 7 * parsed; // @ts-ignore

      parsed = parseInt(scoreSheet.data[7][index + 2]);
      if (!isNaN(parsed)) score += this.calculateOhanamiPinkScore(parsed); // @ts-ignore

      scoreSheet.data[8][index + 2] = score;
    }
  };

  _proto.transformSkullKingData = function transformSkullKingData(scoreSheet) {
    // need to calculate the player scores
    for (var index = 2; index < 10; index += 2) {
      /*
       *  for each player the score is the sum of
       *  each bid score plus a bonus
       *  if bid is 0, and actual is 0, score is 10 x round
       *  if bid is x, and actual is x, score is 20 x bid
       *  if bid ix x, and actual is y (x != y), score is 10 x abs(x-y)
       */
      var score = 0;

      for (var round = 1; round <= 10; round++) {
        var row = 2 * round - 1; // @ts-ignore

        var parsedBid = parseInt(scoreSheet.data[row][index]); // @ts-ignore

        var parsedActual = parseInt(scoreSheet.data[row][index + 1]); // @ts-ignore

        var parsedBonus = parseInt(scoreSheet.data[row + 1][index + 1]); // @ts-ignore

        if (!isNaN(parsedBid) && !isNaN(parsedActual)) {
          if (parsedBid === 0 && parsedActual === 0) {
            score += round * 10;
          }

          if (parsedBid === parsedActual) {
            score += 20 * parsedBid;
          }

          if (parsedBid > 0 && parsedBid !== parsedActual) {
            score -= 10 * Math.abs(parsedBid - parsedActual);
          }

          if (!isNaN(parsedBonus)) score += parsedBonus;
        }
      } // @ts-ignore


      scoreSheet.data[21][index + 1] = score;
    }
  };

  return TemplateManager;
}();

/***/ }),

/***/ "./src/util/BrowserUtil.ts":
/*!*********************************!*\
  !*** ./src/util/BrowserUtil.ts ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var BrowserUtil = /*#__PURE__*/function () {
  function BrowserUtil() {}

  var _proto = BrowserUtil.prototype;

  _proto.scrollSmoothToId = function scrollSmoothToId(elementId) {
    var element = document.getElementById(elementId);

    if (element !== null) {
      element.scrollIntoView({
        block: 'start',
        behavior: 'smooth'
      });
    }
  };

  _proto.scrollToBottomNow = function scrollToBottomNow(element) {
    if (element) {
      element.scrollTop = element.scrollHeight - element.clientHeight + 100;
    }
  };

  _proto.scrollToBottomSmooth = function scrollToBottomSmooth(element) {
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
      element.scrollTop = element.scrollHeight - element.clientHeight + 100;
    }
  };

  _proto.scrollSmoothTo = function scrollSmoothTo(element) {
    element.scrollIntoView({
      block: 'start',
      behavior: 'smooth'
    });
  };

  _proto.scrollTo = function scrollTo(element) {
    element.scrollIntoView({
      block: 'start'
    });
  };

  _proto.removeAllChildren = function removeAllChildren(element) {
    if (element && element.firstChild) {
      while (element.firstChild) {
        var lastChild = element.lastChild;
        if (lastChild) element.removeChild(lastChild);
      }
    }
  };

  _proto.addRemoveClasses = function addRemoveClasses(element, classesText, isAdding) {
    if (isAdding === void 0) {
      isAdding = true;
    }

    var classes = classesText.split(' ');
    classes.forEach(function (classValue) {
      if (classValue.trim().length > 0) {
        if (isAdding) {
          element.classList.add(classValue);
        } else {
          element.classList.remove(classValue);
        }
      }
    });
  };

  _proto.addAttributes = function addAttributes(element, attributes) {
    if (attributes) {
      attributes.forEach(function (attribute) {
        element.setAttribute(attribute[0], attribute[1]);
      });
    }
  };

  return BrowserUtil;
}();

var browserUtil = new BrowserUtil();
/* harmony default export */ __webpack_exports__["default"] = (browserUtil);

/***/ }),

/***/ "./src/util/EqualityFunctions.ts":
/*!***************************************!*\
  !*** ./src/util/EqualityFunctions.ts ***!
  \***************************************/
/*! exports provided: isSame, isSameUsername, isSameGame */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isSame", function() { return isSame; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isSameUsername", function() { return isSameUsername; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isSameGame", function() { return isSameGame; });
function isSame(item1, item2) {
  return item1.id === item2.id;
}
function isSameUsername(item1, item2) {
  return item1.username === item2.username;
}
function isSameGame(item1, item2) {
  return item1.gameId === item2.gameId;
}

/***/ }),

/***/ "./src/util/UUID.ts":
/*!**************************!*\
  !*** ./src/util/UUID.ts ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var UUID = /*#__PURE__*/function () {
  function UUID() {}

  var _proto = UUID.prototype;

  _proto.getUniqueId = function getUniqueId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0;
      var v = c == 'x' ? r : r & 0x3 | 0x8;
      return v.toString(16);
    });
  };

  return UUID;
}();

var uuid = new UUID();
/* harmony default export */ __webpack_exports__["default"] = (uuid);

/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/App.tsx ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./src/App.tsx */"./src/App.tsx");


/***/ })

/******/ });
//# sourceMappingURL=app.bundle.js.map