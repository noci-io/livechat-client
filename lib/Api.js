"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _axios = _interopRequireDefault(require("axios"));
var _axiosRetry = _interopRequireDefault(require("axios-retry"));
/**
 * Handles the API communication
 */
var Api = /*#__PURE__*/function () {
  /**
   * Contains the axios instance
   */

  /**
   * Initializes the API, and creates the Axios instance with proper parameters
   */
  function Api() {
    var axiosRetryEnable = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    var axiosRetriesQty = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;
    var axiosRetryDelay = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1000;
    var baseUrl = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    (0, _classCallCheck2["default"])(this, Api);
    (0, _defineProperty2["default"])(this, "axios", null);
    this.baseURL = baseUrl;
    this.axios = _axios["default"].create({
      baseURL: baseUrl !== null && baseUrl !== void 0 ? baseUrl : process.env.LIVECHAT_SERVER_URL,
      responseType: "json",
      headers: {
        "Content-Type": "application/json"
      },
      transformRequest: function transformRequest(data) {
        return JSON.stringify(data);
      }
    });
    if (axiosRetryEnable) {
      (0, _axiosRetry["default"])(this.axios, {
        retries: axiosRetriesQty,
        retryDelay: function retryDelay() {
          return axiosRetryDelay;
        }
      });
    }
  }

  /**
   * Makes a GET request on the API
   *
   * @param endpoint    Endpoint URL, without start-slash and parameters
   * @param params      GET parameters
   * @param parse       Tells if we must parse returned JSON data
   */
  (0, _createClass2["default"])(Api, [{
    key: "get",
    value: function () {
      var _get = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(endpoint) {
        var params,
          parse,
          response,
          _args = arguments;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              params = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
              parse = _args.length > 2 && _args[2] !== undefined ? _args[2] : true;
              _context.next = 4;
              return this.axios.get(endpoint, {
                params: params
              });
            case 4:
              response = _context.sent;
              if (!parse) {
                _context.next = 7;
                break;
              }
              return _context.abrupt("return", {
                data: response.data,
                code: response.status,
                headers: response.headers
              });
            case 7:
              return _context.abrupt("return", response);
            case 8:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function get(_x) {
        return _get.apply(this, arguments);
      }
      return get;
    }()
    /**
     * Makes a POST request on the API
     *
     * @param endpoint    Endpoint URL, without start-slash and parameters
     * @param params      JSON body parameters
     * @param parse       Tells if we must parse returned JSON data
     */
  }, {
    key: "post",
    value: function () {
      var _post = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(endpoint) {
        var params,
          parse,
          response,
          _args2 = arguments;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              params = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};
              parse = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : true;
              _context2.next = 4;
              return this.axios.post(endpoint, params);
            case 4:
              response = _context2.sent;
              if (!parse) {
                _context2.next = 7;
                break;
              }
              return _context2.abrupt("return", {
                data: response.data,
                code: response.status,
                headers: response.headers
              });
            case 7:
              return _context2.abrupt("return", response);
            case 8:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function post(_x2) {
        return _post.apply(this, arguments);
      }
      return post;
    }()
    /**
     * Makes a PUT request on the API
     *
     * @param endpoint    Endpoint URL, without start-slash and parameters
     * @param params      JSON body parameters
     * @param parse       Tells if we must parse returned JSON data
     */
  }, {
    key: "put",
    value: function () {
      var _put = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(endpoint) {
        var params,
          parse,
          response,
          _args3 = arguments;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              params = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : {};
              parse = _args3.length > 2 && _args3[2] !== undefined ? _args3[2] : true;
              _context3.next = 4;
              return this.axios.put(endpoint, params);
            case 4:
              response = _context3.sent;
              if (!parse) {
                _context3.next = 7;
                break;
              }
              return _context3.abrupt("return", {
                data: response.data,
                code: response.status,
                headers: response.headers
              });
            case 7:
              return _context3.abrupt("return", response);
            case 8:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this);
      }));
      function put(_x3) {
        return _put.apply(this, arguments);
      }
      return put;
    }()
    /**
     * Makes a PATCH request on the API
     *
     * @param endpoint    Endpoint URL, without start-slash and parameters
     * @param params      JSON body parameters
     * @param parse       Tells if we must parse returned JSON data
     */
  }, {
    key: "patch",
    value: function () {
      var _patch = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(endpoint) {
        var params,
          parse,
          response,
          _args4 = arguments;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              params = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : {};
              parse = _args4.length > 2 && _args4[2] !== undefined ? _args4[2] : true;
              _context4.next = 4;
              return this.axios.patch(endpoint, params);
            case 4:
              response = _context4.sent;
              if (!parse) {
                _context4.next = 7;
                break;
              }
              return _context4.abrupt("return", {
                data: response.data,
                code: response.status,
                headers: response.headers
              });
            case 7:
              return _context4.abrupt("return", response);
            case 8:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this);
      }));
      function patch(_x4) {
        return _patch.apply(this, arguments);
      }
      return patch;
    }()
    /**
     * Makes a DELETE request on the API
     *
     * @param endpoint    Endpoint URL, without start-slash and parameters
     * @param params      GET parameters
     * @param parse       Tells if we must parse returned JSON data
     */
  }, {
    key: "delete",
    value: function () {
      var _delete2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(endpoint) {
        var params,
          parse,
          response,
          _args5 = arguments;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              params = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : {};
              parse = _args5.length > 2 && _args5[2] !== undefined ? _args5[2] : true;
              _context5.next = 4;
              return this.axios["delete"](endpoint, {
                params: params
              });
            case 4:
              response = _context5.sent;
              if (!parse) {
                _context5.next = 7;
                break;
              }
              return _context5.abrupt("return", {
                data: response.data,
                code: response.status,
                headers: response.headers
              });
            case 7:
              return _context5.abrupt("return", response);
            case 8:
            case "end":
              return _context5.stop();
          }
        }, _callee5, this);
      }));
      function _delete(_x5) {
        return _delete2.apply(this, arguments);
      }
      return _delete;
    }()
  }]);
  return Api;
}();
exports["default"] = Api;