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
var _Routes = _interopRequireDefault(require("../Routes"));
var Agents = /*#__PURE__*/function () {
  function Agents(client) {
    (0, _classCallCheck2["default"])(this, Agents);
    (0, _defineProperty2["default"])(this, "client", null);
    this.client = client;
  }

  /**
   * Returns a list of agents
   *
   * @return {Promise<*>}
   */
  (0, _createClass2["default"])(Agents, [{
    key: "list",
    value: function () {
      var _list = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var _this$client$userLang;
        var ret;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return this.client.api.get(_Routes["default"].agents.list, {
                customerId: this.client.customerId,
                chatbotId: this.client.chatbotId,
                languages: (_this$client$userLang = this.client.userLanguages) !== null && _this$client$userLang !== void 0 ? _this$client$userLang : this.client.languages,
                universes: this.client.userUniverses
              });
            case 2:
              ret = _context.sent;
              return _context.abrupt("return", ret.data);
            case 4:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function list() {
        return _list.apply(this, arguments);
      }
      return list;
    }()
    /**
     * Returns a list of available agents
     *
     * @return {Promise<*>}
     */
  }, {
    key: "availableAgents",
    value: function () {
      var _availableAgents = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
        var _this$client$userLang2;
        var all,
          ret,
          _args2 = arguments;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              all = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : false;
              _context2.next = 3;
              return this.client.api.get(_Routes["default"].agents.list, {
                available: 1,
                customerId: this.client.customerId,
                chatbotId: this.client.chatbotId,
                languages: all ? undefined : (_this$client$userLang2 = this.client.userLanguages) !== null && _this$client$userLang2 !== void 0 ? _this$client$userLang2 : this.client.languages,
                universes: all ? undefined : this.client.userUniverses
              });
            case 3:
              ret = _context2.sent;
              return _context2.abrupt("return", ret.data);
            case 5:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function availableAgents() {
        return _availableAgents.apply(this, arguments);
      }
      return availableAgents;
    }()
    /**
     * Returns the quantity of agents
     *
     * @return {any}
     */
  }, {
    key: "count",
    value: function () {
      var _count = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
        var _this$client$userLang3;
        var ret;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return this.client.api.get(_Routes["default"].agents.count, {
                customerId: this.client.customerId,
                chatbotId: this.client.chatbotId,
                languages: (_this$client$userLang3 = this.client.userLanguages) !== null && _this$client$userLang3 !== void 0 ? _this$client$userLang3 : this.client.languages,
                universes: this.client.userUniverses
              });
            case 2:
              ret = _context3.sent;
              return _context3.abrupt("return", ret.data.count);
            case 4:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this);
      }));
      function count() {
        return _count.apply(this, arguments);
      }
      return count;
    }()
    /**
     * Returns the quantity of available agents
     *
     * @return {any}
     */
  }, {
    key: "countAvailableAgents",
    value: function () {
      var _countAvailableAgents = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
        var _this$client$userLang4;
        var ret;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return this.client.api.get(_Routes["default"].agents.count, {
                available: 1,
                customerId: this.client.customerId,
                chatbotId: this.client.chatbotId,
                languages: (_this$client$userLang4 = this.client.userLanguages) !== null && _this$client$userLang4 !== void 0 ? _this$client$userLang4 : this.client.languages,
                universes: this.client.userUniverses
              });
            case 2:
              ret = _context4.sent;
              return _context4.abrupt("return", ret.data.count);
            case 4:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this);
      }));
      function countAvailableAgents() {
        return _countAvailableAgents.apply(this, arguments);
      }
      return countAvailableAgents;
    }()
    /**
     * Returns the current user status
     *
     * @return {any}
     */
  }, {
    key: "status",
    value: function () {
      var _status = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
        var ret;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return this.client.api.get(_Routes["default"].agents.status(this.client.userId), {
                chatbotId: this.client.chatbotId
              });
            case 2:
              ret = _context5.sent;
              return _context5.abrupt("return", ret.data.status);
            case 4:
            case "end":
              return _context5.stop();
          }
        }, _callee5, this);
      }));
      function status() {
        return _status.apply(this, arguments);
      }
      return status;
    }()
    /**
     * Set the current user status
     *
     * @param isOnline
     * @return {Promise<{headers: *, code: *, data: *}|*|AxiosResponse<any>|void>}
     */
  }, {
    key: "setOnlineStatus",
    value: function () {
      var _setOnlineStatus = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(isOnline) {
        var ret;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return this.client.api.put(_Routes["default"].agents.status(this.client.userId), {
                chatbotId: this.client.chatbotId,
                loggedIn: isOnline
              });
            case 2:
              ret = _context6.sent;
              return _context6.abrupt("return", ret);
            case 4:
            case "end":
              return _context6.stop();
          }
        }, _callee6, this);
      }));
      function setOnlineStatus(_x) {
        return _setOnlineStatus.apply(this, arguments);
      }
      return setOnlineStatus;
    }()
    /**
     * Returns the current user languages
     *
     * @return {any}
     */
  }, {
    key: "languages",
    value: function () {
      var _languages = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7() {
        var ret;
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return this.client.api.get(_Routes["default"].agents.languages(this.client.userId), {
                customerId: this.client.customerId,
                chatbotId: this.client.chatbotId
              });
            case 2:
              ret = _context7.sent;
              return _context7.abrupt("return", ret.data.languages);
            case 4:
            case "end":
              return _context7.stop();
          }
        }, _callee7, this);
      }));
      function languages() {
        return _languages.apply(this, arguments);
      }
      return languages;
    }()
    /**
     * Returns the current user languages
     *
     * @return {any}
     */
  }, {
    key: "universes",
    value: function () {
      var _universes = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8() {
        var ret;
        return _regenerator["default"].wrap(function _callee8$(_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return this.client.api.get(_Routes["default"].agents.universes(this.client.userId), {
                customerId: this.client.customerId,
                chatbotId: this.client.chatbotId
              });
            case 2:
              ret = _context8.sent;
              return _context8.abrupt("return", ret.data.universes);
            case 4:
            case "end":
              return _context8.stop();
          }
        }, _callee8, this);
      }));
      function universes() {
        return _universes.apply(this, arguments);
      }
      return universes;
    }()
  }]);
  return Agents;
}();
exports["default"] = Agents;