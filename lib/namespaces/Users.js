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
var Users = /*#__PURE__*/function () {
  function Users(client) {
    (0, _classCallCheck2["default"])(this, Users);
    (0, _defineProperty2["default"])(this, "client", null);
    this.client = client;
  }

  /**
   * Returns a specific user
   *
   * @param userId
   * @return {Promise<*>}
   */
  (0, _createClass2["default"])(Users, [{
    key: "get",
    value: function () {
      var _get = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(userId) {
        var ret;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return this.client.api.get(_Routes["default"].users.get(userId), {
                customerId: this.client.customerId,
                chatbotId: this.client.chatbotId
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
      function get(_x) {
        return _get.apply(this, arguments);
      }
      return get;
    }()
    /**
     * Create a new user
     *
     * @param name
     * @param email
     * @param type
     * @param languages
     * @param photo
     * @param maxConversationQty
     * @return {Promise<*>}
     */
  }, {
    key: "create",
    value: function () {
      var _create = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(name, email, type, languages) {
        var photo,
          maxConversationQty,
          universes,
          ret,
          _args2 = arguments;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              photo = _args2.length > 4 && _args2[4] !== undefined ? _args2[4] : '';
              maxConversationQty = _args2.length > 5 && _args2[5] !== undefined ? _args2[5] : -1;
              universes = _args2.length > 6 && _args2[6] !== undefined ? _args2[6] : [];
              _context2.next = 5;
              return this.client.api.post(_Routes["default"].users.create, {
                chatbotId: this.client.chatbotId,
                customerId: this.client.customerId,
                id: this.client.userId,
                name: name,
                email: email,
                type: type,
                photo: photo,
                languages: languages,
                maxConversationQty: maxConversationQty,
                universes: universes
              });
            case 5:
              ret = _context2.sent;
              return _context2.abrupt("return", ret.data);
            case 7:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function create(_x2, _x3, _x4, _x5) {
        return _create.apply(this, arguments);
      }
      return create;
    }()
    /**
     * Update a specific user
     *
     * @param name
     * @param email
     * @param type
     * @param languages
     * @param photo
     * @param maxConversationQty
     * @return {Promise<*>}
     */
  }, {
    key: "update",
    value: function () {
      var _update = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(name, email, type, languages) {
        var photo,
          maxConversationQty,
          universes,
          ret,
          _args3 = arguments;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              photo = _args3.length > 4 && _args3[4] !== undefined ? _args3[4] : '';
              maxConversationQty = _args3.length > 5 && _args3[5] !== undefined ? _args3[5] : -1;
              universes = _args3.length > 6 && _args3[6] !== undefined ? _args3[6] : [];
              console.log(universes);
              _context3.next = 6;
              return this.client.api.put(_Routes["default"].users.update(this.client.userId), {
                chatbotId: this.client.chatbotId,
                customerId: this.client.customerId,
                name: name,
                email: email,
                type: type,
                languages: languages,
                universes: universes,
                photo: photo,
                maxConversationQty: maxConversationQty
              });
            case 6:
              ret = _context3.sent;
              console.log(ret);
              return _context3.abrupt("return", ret.data);
            case 9:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this);
      }));
      function update(_x6, _x7, _x8, _x9) {
        return _update.apply(this, arguments);
      }
      return update;
    }()
    /**
     * Ban visitor to forbid him to create a new conversation
     *
     * @param userId
     * @param conversationId
     * @param by
     * @param reason
     * @return {Promise<T>}
     */
  }, {
    key: "ban",
    value: function () {
      var _ban = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(userId, conversationId, by, reason) {
        var ret;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return this.client.api.put(_Routes["default"].users.ban(userId), {
                chatbotId: this.client.chatbotId,
                customerId: this.client.customerId,
                conversationId: conversationId,
                by: by,
                reason: reason
              });
            case 2:
              ret = _context4.sent;
              return _context4.abrupt("return", ret.data);
            case 4:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this);
      }));
      function ban(_x10, _x11, _x12, _x13) {
        return _ban.apply(this, arguments);
      }
      return ban;
    }()
    /**
     * Some events aren't always send to socket because they are too big, like visitor_screen_sharing
     * This method enable agent to start being sent given event
     *
     * @param eventName
     * @return {Promise<T>}
     */
  }, {
    key: "askToReceiveEvent",
    value: function () {
      var _askToReceiveEvent = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(eventName) {
        var ret;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return this.client.api.put(_Routes["default"].users.askToReceiveEvent(this.client.userId, this.client.socket.id), {
                chatbotId: this.client.chatbotId,
                eventName: eventName
              });
            case 2:
              ret = _context5.sent;
              return _context5.abrupt("return", ret.data);
            case 4:
            case "end":
              return _context5.stop();
          }
        }, _callee5, this);
      }));
      function askToReceiveEvent(_x14) {
        return _askToReceiveEvent.apply(this, arguments);
      }
      return askToReceiveEvent;
    }()
    /**
     * Ask server to stop sending given event
     *
     * @param eventName
     * @return {Promise<T>}
     */
  }, {
    key: "stopReceivingEvent",
    value: function () {
      var _stopReceivingEvent = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(eventName) {
        var ret;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return this.client.api.put(_Routes["default"].users.stopReceivingEvent(this.client.userId, this.client.socket.id), {
                chatbotId: this.client.chatbotId,
                eventName: eventName
              });
            case 2:
              ret = _context6.sent;
              return _context6.abrupt("return", ret.data);
            case 4:
            case "end":
              return _context6.stop();
          }
        }, _callee6, this);
      }));
      function stopReceivingEvent(_x15) {
        return _stopReceivingEvent.apply(this, arguments);
      }
      return stopReceivingEvent;
    }()
    /**
     * Ask to start being sent screen sharing event
     *
     * @return {Promise<T>}
     */
  }, {
    key: "askToReceiveScreenSharing",
    value: function () {
      var _askToReceiveScreenSharing = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7() {
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return this.askToReceiveEvent('visitor_screen_sharing');
            case 2:
              return _context7.abrupt("return", _context7.sent);
            case 3:
            case "end":
              return _context7.stop();
          }
        }, _callee7, this);
      }));
      function askToReceiveScreenSharing() {
        return _askToReceiveScreenSharing.apply(this, arguments);
      }
      return askToReceiveScreenSharing;
    }()
    /**
     * Stop receiving screen sharing
     *
     * @return {Promise<*>}
     */
  }, {
    key: "stopReceivingScreenSharing",
    value: function () {
      var _stopReceivingScreenSharing = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8() {
        return _regenerator["default"].wrap(function _callee8$(_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return this.stopReceivingEvent('visitor_screen_sharing');
            case 2:
              return _context8.abrupt("return", _context8.sent);
            case 3:
            case "end":
              return _context8.stop();
          }
        }, _callee8, this);
      }));
      function stopReceivingScreenSharing() {
        return _stopReceivingScreenSharing.apply(this, arguments);
      }
      return stopReceivingScreenSharing;
    }()
  }]);
  return Users;
}();
exports["default"] = Users;