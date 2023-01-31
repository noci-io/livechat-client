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
var _socket = _interopRequireDefault(require("socket.io-client"));
var _socket2 = _interopRequireDefault(require("socket.io-msgpack-parser"));
var _Api = _interopRequireDefault(require("./Api"));
var _Conversations = _interopRequireDefault(require("./namespaces/Conversations"));
var _Agents = _interopRequireDefault(require("./namespaces/Agents"));
var _Users = _interopRequireDefault(require("./namespaces/Users"));
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var LivechatClient = /*#__PURE__*/function () {
  /**
   * Namespaces
   */

  function LivechatClient(customerId, userId, chatbotId) {
    var baseUrl = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    (0, _classCallCheck2["default"])(this, LivechatClient);
    (0, _defineProperty2["default"])(this, "socket", null);
    (0, _defineProperty2["default"])(this, "api", null);
    (0, _defineProperty2["default"])(this, "userId", null);
    (0, _defineProperty2["default"])(this, "userRole", null);
    (0, _defineProperty2["default"])(this, "userName", null);
    (0, _defineProperty2["default"])(this, "userEmail", null);
    (0, _defineProperty2["default"])(this, "userLanguages", null);
    (0, _defineProperty2["default"])(this, "userUniverses", null);
    (0, _defineProperty2["default"])(this, "userPhoto", null);
    (0, _defineProperty2["default"])(this, "userMaxConversationQty", null);
    (0, _defineProperty2["default"])(this, "online", null);
    (0, _defineProperty2["default"])(this, "customerId", null);
    (0, _defineProperty2["default"])(this, "chatbotId", null);
    (0, _defineProperty2["default"])(this, "conversationId", null);
    (0, _defineProperty2["default"])(this, "listeners", {});
    (0, _defineProperty2["default"])(this, "conversations", null);
    (0, _defineProperty2["default"])(this, "agents", null);
    (0, _defineProperty2["default"])(this, "users", null);
    this.socket = (0, _socket["default"])(baseUrl !== null && baseUrl !== void 0 ? baseUrl : process.env.LIVECHAT_SERVER_URL, {
      parser: _socket2["default"],
      path: process.env.LIVECHAT_SERVER_SOCKET_PATH
    });
    this.api = new _Api["default"](true, 1000000000, 1000, baseUrl);
    this.customerId = customerId;
    this.userId = userId;
    this.chatbotId = chatbotId;

    /**
     * Init namespaces
     */
    this.conversations = new _Conversations["default"](this);
    this.agents = new _Agents["default"](this);
    this.users = new _Users["default"](this);
  }

  /**
   * Add event listener
   *
   * @param event
   * @param callback
   */
  (0, _createClass2["default"])(LivechatClient, [{
    key: "on",
    value: function on(event, callback) {
      var _this = this;
      if (this.listeners[event] === undefined) {
        this.listeners[event] = [];
        this.socket.on(event, function (data) {
          _this.triggerEventListeners(event, data);
        });
      }
      this.listeners[event].push(callback);
    }

    /**
     * Trigger all callbacks of listener
     *
     * @param event
     * @param data
     */
  }, {
    key: "triggerEventListeners",
    value: function triggerEventListeners(event, data) {
      if (this.listeners[event] === undefined) {
        return;
      }
      var _iterator = _createForOfIteratorHelper(this.listeners[event]),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var callback = _step.value;
          callback(data, this);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }

    /**
     * Start sending heartbeat on socket
     */
  }, {
    key: "startHeartbeat",
    value: function startHeartbeat() {
      var _this2 = this;
      this.sendHeartbeat();
      setInterval(function () {
        _this2.sendHeartbeat();
      }, process.env.LIVECHAT_HEARTBEAT_INTERVAL || 5000);
    }

    /**
     * Send heartbeat event
     */
  }, {
    key: "sendHeartbeat",
    value: function sendHeartbeat() {
      this.socket.emit('heartbeat', {
        id: this.userId,
        customerId: this.customerId,
        chatbotId: this.chatbotId,
        online: this.online
      });
    }

    /**
     * Returns true if given role is an agent one
     *
     * @param role
     * @return {boolean}
     */
  }, {
    key: "setUserData",
    value:
    /**
     * Set user data
     *
     * @param name
     * @param email
     * @param role
     * @param languages
     * @param photo
     * @param maxConversationQty
     */
    function setUserData(name, email, role, languages) {
      var photo = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '';
      var maxConversationQty = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : -1;
      var universes = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : [];
      this.userName = name;
      this.userEmail = email;
      this.userRole = role;
      this.userLanguages = languages;
      this.userUniverses = universes;
      this.userPhoto = photo;
      this.userMaxConversationQty = maxConversationQty;
    }

    /**
     * Update user and set new data
     *
     * @param name
     * @param email
     * @param role
     * @param languages
     * @param photo
     * @param maxConversationQty
     * @return {Promise<void>}
     */
  }, {
    key: "updateUserData",
    value: function () {
      var _updateUserData = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(name, email, role, languages) {
        var photo,
          maxConversationQty,
          universes,
          user,
          _args = arguments;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              photo = _args.length > 4 && _args[4] !== undefined ? _args[4] : '';
              maxConversationQty = _args.length > 5 && _args[5] !== undefined ? _args[5] : -1;
              universes = _args.length > 6 && _args[6] !== undefined ? _args[6] : [];
              console.log(universes);
              _context.next = 6;
              return this.users.update(name, email, role, languages, photo, maxConversationQty, universes);
            case 6:
              user = _context.sent;
              this.setUserData(user.name, user.email, user.type, user.languages, user.photo, user.maxConversationQty, user.universes);
              this.online = user.loggedIn;
            case 9:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function updateUserData(_x, _x2, _x3, _x4) {
        return _updateUserData.apply(this, arguments);
      }
      return updateUserData;
    }()
    /**
     * Fetch user if exist, else create a new one
     * Then start heartbeat
     *
     * @param name
     * @param email
     * @param role
     * @param languages
     * @param photo
     * @param maxConversationQty
     * @return {Promise<void>}
     */
  }, {
    key: "build",
    value: function () {
      var _build = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(name, email, role, languages) {
        var photo,
          maxConversationQty,
          universes,
          user,
          differentLanguages,
          differentUniverses,
          _args2 = arguments;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              photo = _args2.length > 4 && _args2[4] !== undefined ? _args2[4] : '';
              maxConversationQty = _args2.length > 5 && _args2[5] !== undefined ? _args2[5] : -1;
              universes = _args2.length > 6 && _args2[6] !== undefined ? _args2[6] : [];
              _context2.next = 5;
              return this.users.get(this.userId);
            case 5:
              user = _context2.sent;
              if (user) {
                _context2.next = 12;
                break;
              }
              _context2.next = 9;
              return this.users.create(name, email, role, languages, photo, maxConversationQty, universes);
            case 9:
              user = _context2.sent;
              _context2.next = 18;
              break;
            case 12:
              differentLanguages = user.languages.length !== languages.length || JSON.stringify(user.languages.sort()) !== JSON.stringify(languages);
              differentUniverses = user.universes.length !== universes.length || JSON.stringify(user.universes.sort()) !== JSON.stringify(universes);
              if (!(user.name !== name || user.email !== email || user.type !== role || differentLanguages || differentUniverses || user.photo !== photo || user.maxConversationQty !== maxConversationQty)) {
                _context2.next = 18;
                break;
              }
              _context2.next = 17;
              return this.users.update(name, email, role, languages, photo, maxConversationQty, universes);
            case 17:
              user = _context2.sent;
            case 18:
              this.setUserData(user.name, user.email, user.type, user.languages, user.photo, user.maxConversationQty, user.universes);
              return _context2.abrupt("return", user);
            case 20:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function build(_x5, _x6, _x7, _x8) {
        return _build.apply(this, arguments);
      }
      return build;
    }()
  }], [{
    key: "isAgent",
    value: function isAgent(role) {
      return [LivechatClient.ROLE_MODERATOR, LivechatClient.ROLE_AGENT].includes(role);
    }
  }]);
  return LivechatClient;
}();
exports["default"] = LivechatClient;
(0, _defineProperty2["default"])(LivechatClient, "ROLE_VISITOR", 'visitor');
(0, _defineProperty2["default"])(LivechatClient, "ROLE_MODERATOR", 'moderator');
(0, _defineProperty2["default"])(LivechatClient, "ROLE_AGENT", 'agent');
(0, _defineProperty2["default"])(LivechatClient, "ROLE_SYSTEM", 'system');