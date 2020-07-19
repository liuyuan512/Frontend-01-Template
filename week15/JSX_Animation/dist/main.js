/******/ (function(modules) {
  // webpackBootstrap
  /******/ // The module cache
  /******/ var installedModules = {}; // The require function
  /******/
  /******/ /******/ function __webpack_require__(moduleId) {
    /******/
    /******/ // Check if module is in cache
    /******/ if (installedModules[moduleId]) {
      /******/ return installedModules[moduleId].exports;
      /******/
    } // Create a new module (and put it into the cache)
    /******/ /******/ var module = (installedModules[moduleId] = {
      /******/ i: moduleId,
      /******/ l: false,
      /******/ exports: {}
      /******/
    }); // Execute the module function
    /******/
    /******/ /******/ modules[moduleId].call(
      module.exports,
      module,
      module.exports,
      __webpack_require__
    ); // Flag the module as loaded
    /******/
    /******/ /******/ module.l = true; // Return the exports of the module
    /******/
    /******/ /******/ return module.exports;
    /******/
  } // expose the modules object (__webpack_modules__)
  /******/
  /******/
  /******/ /******/ __webpack_require__.m = modules; // expose the module cache
  /******/
  /******/ /******/ __webpack_require__.c = installedModules; // define getter function for harmony exports
  /******/
  /******/ /******/ __webpack_require__.d = function(exports, name, getter) {
    /******/ if (!__webpack_require__.o(exports, name)) {
      /******/ Object.defineProperty(exports, name, {
        enumerable: true,
        get: getter
      });
      /******/
    }
    /******/
  }; // define __esModule on exports
  /******/
  /******/ /******/ __webpack_require__.r = function(exports) {
    /******/ if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
      /******/ Object.defineProperty(exports, Symbol.toStringTag, {
        value: "Module"
      });
      /******/
    }
    /******/ Object.defineProperty(exports, "__esModule", { value: true });
    /******/
  }; // create a fake namespace object // mode & 1: value is a module id, require it // mode & 2: merge all properties of value into the ns // mode & 4: return value when already ns object // mode & 8|1: behave like require
  /******/
  /******/ /******/ /******/ /******/ /******/ /******/ __webpack_require__.t = function(
    value,
    mode
  ) {
    /******/ if (mode & 1) value = __webpack_require__(value);
    /******/ if (mode & 8) return value;
    /******/ if (
      mode & 4 &&
      typeof value === "object" &&
      value &&
      value.__esModule
    )
      return value;
    /******/ var ns = Object.create(null);
    /******/ __webpack_require__.r(ns);
    /******/ Object.defineProperty(ns, "default", {
      enumerable: true,
      value: value
    });
    /******/ if (mode & 2 && typeof value != "string")
      for (var key in value)
        __webpack_require__.d(
          ns,
          key,
          function(key) {
            return value[key];
          }.bind(null, key)
        );
    /******/ return ns;
    /******/
  }; // getDefaultExport function for compatibility with non-harmony modules
  /******/
  /******/ /******/ __webpack_require__.n = function(module) {
    /******/ var getter =
      module && module.__esModule
        ? /******/ function getDefault() {
            return module["default"];
          }
        : /******/ function getModuleExports() {
            return module;
          };
    /******/ __webpack_require__.d(getter, "a", getter);
    /******/ return getter;
    /******/
  }; // Object.prototype.hasOwnProperty.call
  /******/
  /******/ /******/ __webpack_require__.o = function(object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
  }; // __webpack_public_path__
  /******/
  /******/ /******/ __webpack_require__.p = ""; // Load entry module and return exports
  /******/
  /******/
  /******/ /******/ return __webpack_require__(
    (__webpack_require__.s = "./index.js")
  );
  /******/
})(
  /************************************************************************/
  /******/ {
    /***/ "./animation.js":
      /*!**********************!*\
  !*** ./animation.js ***!
  \**********************/
      /*! exports provided: Timeline, Animation, ColorAnimation */
      /***/ function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        eval(
          '__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Timeline", function() { return Timeline; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Animation", function() { return Animation; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ColorAnimation", function() { return ColorAnimation; });\nfunction _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar Timeline = /*#__PURE__*/function () {\n  function Timeline() {\n    _classCallCheck(this, Timeline);\n\n    this.animations = [];\n    this.animationId = null;\n    this.state = "inited";\n  }\n\n  _createClass(Timeline, [{\n    key: "tick",\n    value: function tick() {\n      var _this = this;\n\n      var t = Date.now() - this.startTime;\n      console.log("tick", t);\n      var animations = this.animations.filter(function (animation) {\n        return !animation.finished;\n      });\n\n      var _iterator = _createForOfIteratorHelper(this.animations),\n          _step;\n\n      try {\n        for (_iterator.s(); !(_step = _iterator.n()).done;) {\n          var animation = _step.value;\n          // if (t > animation.duration + animation.delay) continue;\n          var object = animation.object,\n              property = animation.property,\n              template = animation.template,\n              start = animation.start,\n              end = animation.end,\n              timingFunction = animation.timingFunction,\n              delay = animation.delay,\n              duration = animation.duration,\n              addTime = animation.addTime;\n          var progression = timingFunction((t - delay - addTime) / duration); // 0-1之间的数字\n\n          if (t > duration + delay + addTime) {\n            animation.finished = true;\n          }\n\n          var value = animation.valueFromProgression(progression);\n          object[property] = template(value);\n        }\n      } catch (err) {\n        _iterator.e(err);\n      } finally {\n        _iterator.f();\n      }\n\n      if (animations.length) {\n        this.animationId = requestAnimationFrame(function () {\n          return _this.tick();\n        });\n      }\n    }\n  }, {\n    key: "pause",\n    value: function pause() {\n      if (this.state !== "playing") return;\n      this.state = "paused";\n      this.pauseTime = Date.now();\n      if (this.animationId !== null) cancelAnimationFrame(this.animationId);\n    }\n  }, {\n    key: "resume",\n    value: function resume() {\n      if (this.state !== "paused") return;\n      this.state = "playing";\n      this.startTime += Date.now() - this.pauseTime;\n      this.tick();\n    }\n  }, {\n    key: "start",\n    value: function start() {\n      if (this.state !== "inited") return;\n      this.state = "playing";\n      this.startTime = Date.now();\n      this.tick();\n    }\n  }, {\n    key: "restart",\n    value: function restart() {\n      if (this.state === "playing") {\n        this.pause();\n      }\n\n      this.animations = [];\n      this.animationId = null;\n      this.state = "playing";\n      this.startTime = Date.now();\n      this.pauseTime = null;\n      this.tick();\n    }\n  }, {\n    key: "add",\n    value: function add(animation, addTime) {\n      this.animations.push(animation);\n      animation.finished = false;\n\n      if (this.state === "playing") {\n        animation.addTime = addTime !== void 0 ? addTime : Date.now() - this.startTime;\n      } else {\n        animation.addTime = addTime !== void 0 ? addTime : 0;\n      }\n    }\n  }]);\n\n  return Timeline;\n}();\nvar Animation = /*#__PURE__*/function () {\n  function Animation(object, property, start, end, duration, delay, timingFunction, template) {\n    _classCallCheck(this, Animation);\n\n    this.object = object;\n    this.property = property;\n    this.template = template;\n    this.start = start;\n    this.end = end;\n    this.duration = duration;\n    this.delay = delay || 0;\n\n    this.timingFunction = timingFunction || function (start, end) {\n      return function (t) {\n        return start + t / duration * (end - start);\n      };\n    };\n  }\n\n  _createClass(Animation, [{\n    key: "valueFromProgression",\n    value: function valueFromProgression(progression) {\n      return this.start + progression * (this.end - this.start); // value就是根据progression算出的值\n    }\n  }]);\n\n  return Animation;\n}();\nvar ColorAnimation = /*#__PURE__*/function () {\n  function ColorAnimation(object, property, start, end, duration, delay, timingFunction, template) {\n    _classCallCheck(this, ColorAnimation);\n\n    this.object = object;\n\n    this.template = template || function (v) {\n      return "rgba(".concat(v.r, ",").concat(v.g, ",").concat(v.b, ",").concat(v.a, ")");\n    };\n\n    this.property = property;\n    this.start = start;\n    this.end = end;\n    this.duration = duration;\n    this.delay = delay || 0;\n\n    this.timingFunction = timingFunction || function (start, end) {\n      return function (t) {\n        return start + t / duration * (end - start);\n      };\n    };\n  }\n\n  _createClass(ColorAnimation, [{\n    key: "valueFromProgression",\n    value: function valueFromProgression(progression) {\n      return {\n        r: this.start.r + progression * (this.end.r - this.start.r),\n        g: this.start.g + progression * (this.end.g - this.start.g),\n        b: this.start.b + progression * (this.end.b - this.start.b),\n        a: this.start.a + progression * (this.end.a - this.start.a)\n      }; // value就是根据progression算出的值\n    }\n  }]);\n\n  return ColorAnimation;\n}();\n/*\n\nlet animation = new Animation(object,property,start,end,duration,delay,timingFunction);\nlet animation2 = new Animation(object,property,start,end,duration,delay,timingFunction);\n\nlet timeline = new Timeline;\ntimeline.add(animation);\ntimeline.add(animation2);\n\ntimeline.start()\ntimeline.pasue()\ntimeline.resume()\ntimeline.stop()\n\n\nanimation.start()\nanimation2.start()\n\nanimation.stop()\nanimation2.stop()\n\nanimation.pause()\nanimation2.pause()\n\nanimation.stop()\nanimation2.stop()\n\nsetTimeout\nsetInterval\nrequestAnimationFrame\n\n*/\n\n//# sourceURL=webpack:///./animation.js?'
        );

        /***/
      },

    /***/ "./createElement.js":
      /*!**************************!*\
  !*** ./createElement.js ***!
  \**************************/
      /*! exports provided: createElement, Text, Wrapper */
      /***/ function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        eval(
          '__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createElement", function() { return createElement; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Text", function() { return Text; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Wrapper", function() { return Wrapper; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nfunction createElement(Cls, attributes) {\n  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {\n    children[_key - 2] = arguments[_key];\n  }\n\n  console.log("arguments:", arguments);\n  console.log("children:", children);\n  var o;\n\n  if (typeof Cls === "string") {\n    o = new Wrapper(Cls);\n  } else {\n    o = new Cls({\n      timer: {}\n    });\n  }\n\n  for (var name in attributes) {\n    // o[name] = attributes[name];\n    o.setAttribute(name, attributes[name]);\n  }\n\n  var visit = function visit(children) {\n    var _iterator = _createForOfIteratorHelper(children),\n        _step;\n\n    try {\n      for (_iterator.s(); !(_step = _iterator.n()).done;) {\n        var child = _step.value;\n\n        // o.appendChild(child);\n        if (child instanceof Array) {\n          visit(child);\n          continue;\n        }\n\n        if (typeof child === "string") child = new Text(child);\n        o.children.push(child);\n      }\n    } catch (err) {\n      _iterator.e(err);\n    } finally {\n      _iterator.f();\n    }\n  };\n\n  visit(children);\n  return o;\n}\n\nvar Text = /*#__PURE__*/function () {\n  function Text(text) {\n    _classCallCheck(this, Text);\n\n    this.children = [];\n    this.root = document.createTextNode(text);\n  }\n\n  _createClass(Text, [{\n    key: "mountTo",\n    value: function mountTo(parent) {\n      parent.appendChild(this.root);\n    }\n  }]);\n\n  return Text;\n}();\n\nvar Wrapper = /*#__PURE__*/function () {\n  function Wrapper(type) {\n    _classCallCheck(this, Wrapper);\n\n    this.children = [];\n    this.root = document.createElement(type);\n  }\n\n  _createClass(Wrapper, [{\n    key: "setAttribute",\n    value: function setAttribute(name, value) {\n      this.root.setAttribute(name, value);\n    }\n  }, {\n    key: "appendChild",\n    value: function appendChild(child) {\n      this.children.push(child);\n    } // 监听事件代理到root上\n\n  }, {\n    key: "addEventListener",\n    value: function addEventListener() {\n      var _this$root;\n\n      console.log("addEventListener---arguments:", arguments); // this.root.addEventListener(type, cb);\n\n      (_this$root = this.root).addEventListener.apply(_this$root, arguments);\n    } // 样式获取代理到root上\n\n  }, {\n    key: "mountTo",\n    value: function mountTo(parent) {\n      parent.appendChild(this.root);\n\n      var _iterator2 = _createForOfIteratorHelper(this.children),\n          _step2;\n\n      try {\n        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {\n          var child = _step2.value;\n          child.mountTo(this.root);\n        }\n      } catch (err) {\n        _iterator2.e(err);\n      } finally {\n        _iterator2.f();\n      }\n    }\n  }, {\n    key: "style",\n    get: function get() {\n      return this.root.style;\n    }\n  }]);\n\n  return Wrapper;\n}();\n\n\n\n//# sourceURL=webpack:///./createElement.js?'
        );

        /***/
      },

    /***/ "./cubicBezier.js":
      /*!************************!*\
  !*** ./cubicBezier.js ***!
  \************************/
      /*! exports provided: cubicBezier */
      /***/ function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        eval(
          "__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"cubicBezier\", function() { return cubicBezier; });\nfunction cubicBezier(p1x, p1y, p2x, p2y) {\n  var ZERO_LIMIT = 1e-6; // Calculate the polynomial coefficients,\n  // implicit first and last control points are (0,0) and (1,1).\n\n  var ax = 3 * p1x - 3 * p2x + 1;\n  var bx = 3 * p2x - 6 * p1x;\n  var cx = 3 * p1x;\n  var ay = 3 * p1y - 3 * p2y + 1;\n  var by = 3 * p2y - 6 * p1y;\n  var cy = 3 * p1y;\n\n  function sampleCurveDerivativeX(t) {\n    // `ax t^3 + bx t^2 + cx t' expanded using Horner 's rule.\n    return (3 * ax * t + 2 * bx) * t + cx;\n  }\n\n  function sampleCurveX(t) {\n    return ((ax * t + bx) * t + cx) * t;\n  }\n\n  function sampleCurveY(t) {\n    return ((ay * t + by) * t + cy) * t;\n  } // Given an x value, find a parametric value it came from.\n\n\n  function solveCurveX(x) {\n    var t2 = x;\n    var derivative;\n    var x2; // https://trac.webkit.org/browser/trunk/Source/WebCore/platform/animation\n    // First try a few iterations of Newton's method -- normally very fast.\n    // http://en.wikipedia.org/wiki/Newton's_method\n\n    for (var i = 0; i < 8; i++) {\n      // f(t)-x=0\n      x2 = sampleCurveX(t2) - x;\n\n      if (Math.abs(x2) < ZERO_LIMIT) {\n        return t2;\n      }\n\n      derivative = sampleCurveDerivativeX(t2); // == 0, failure\n\n      /* istanbul ignore if */\n\n      if (Math.abs(derivative) < ZERO_LIMIT) {\n        break;\n      }\n\n      t2 -= x2 / derivative;\n    } // Fall back to the bisection method for reliability.\n    // bisection\n    // http://en.wikipedia.org/wiki/Bisection_method\n\n\n    var t1 = 1;\n    /* istanbul ignore next */\n\n    var t0 = 0;\n    /* istanbul ignore next */\n\n    t2 = x;\n    /* istanbul ignore next */\n\n    while (t1 > t0) {\n      x2 = sampleCurveX(t2) - x;\n\n      if (Math.abs(x2) < ZERO_LIMIT) {\n        return t2;\n      }\n\n      if (x2 > 0) {\n        t1 = t2;\n      } else {\n        t0 = t2;\n      }\n\n      t2 = (t1 + t0) / 2;\n    } // Failure\n\n\n    return t2;\n  }\n\n  function solve(x) {\n    return sampleCurveY(solveCurveX(x));\n  }\n\n  return solve;\n}\n\n//# sourceURL=webpack:///./cubicBezier.js?"
        );

        /***/
      },

    /***/ "./index.js":
      /*!******************!*\
  !*** ./index.js ***!
  \******************/
      /*! no exports provided */
      /***/ function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        eval(
          '__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _animation_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./animation.js */ "./animation.js");\n/* harmony import */ var _cubicBezier_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cubicBezier.js */ "./cubicBezier.js");\n/* harmony import */ var _createElement_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./createElement.js */ "./createElement.js");\n\n\n\nvar el = document.querySelector("#el");\nvar el2 = document.querySelector("#el2"); // el.style.transition = "ease 5s";\n\nvar linear = function linear(t) {\n  return t;\n};\n\nvar ease = Object(_cubicBezier_js__WEBPACK_IMPORTED_MODULE_1__["cubicBezier"])(0.25, 0.1, 0.25, 1);\nvar timeline = Object(_createElement_js__WEBPACK_IMPORTED_MODULE_2__["createElement"])(_animation_js__WEBPACK_IMPORTED_MODULE_0__["Timeline"], null);\ntimeline.add(new _animation_js__WEBPACK_IMPORTED_MODULE_0__["Animation"](el.style, "transform", 0, 200, 5000, 0, linear, function (v) {\n  return "translateX(".concat(v, "px)");\n}));\ntimeline.start(); // document.querySelector("#el2").style.transform = "translateX(200px)";\n\ndocument.querySelector("#btn").addEventListener("click", function () {\n  timeline.pause();\n});\ndocument.querySelector("#resume").addEventListener("click", function () {\n  timeline.resume();\n});\ndocument.querySelector("#restart").addEventListener("click", function () {\n  timeline.restart();\n});\ndocument.querySelector("#el2-start-btn").addEventListener("click", function () {\n  timeline.add(new _animation_js__WEBPACK_IMPORTED_MODULE_0__["ColorAnimation"](el.style, "backgroundColor", {\n    r: 0,\n    g: 0,\n    b: 0,\n    a: 1\n  }, {\n    r: 255,\n    g: 0,\n    b: 0,\n    a: 1\n  }, 5000, 0, linear), 0);\n});\n\n//# sourceURL=webpack:///./index.js?'
        );

        /***/
      }

    /******/
  }
);
