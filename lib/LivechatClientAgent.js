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
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _LivechatClient2 = _interopRequireDefault(require("./LivechatClient"));
var _Api = _interopRequireDefault(require("./Api"));
var _Routes = _interopRequireDefault(require("./Routes"));
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var LivechatClientAgent = /*#__PURE__*/function (_LivechatClient) {
  (0, _inherits2["default"])(LivechatClientAgent, _LivechatClient);
  var _super = _createSuper(LivechatClientAgent);
  function LivechatClientAgent(customerId, userId, chatbotId, baseUrl) {
    (0, _classCallCheck2["default"])(this, LivechatClientAgent);
    return _super.call(this, customerId, userId, chatbotId, baseUrl);
  }

  /**
   * Build agent
   *
   * @param name
   * @param email
   * @param role
   * @param languages
   * @param photo
   * @param maxConversationQty
   * @return {Promise<void>}
   */
  (0, _createClass2["default"])(LivechatClientAgent, [{
    key: "buildAgent",
    value: function () {
      var _buildAgent = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(name, email, role, languages, photo, maxConversationQty, universes) {
        var userData;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return this.build(name, email, role, languages, photo, maxConversationQty, universes);
            case 2:
              userData = _context.sent;
              this.online = userData.loggedIn;
              this.startHeartbeat();
            case 5:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function buildAgent(_x, _x2, _x3, _x4, _x5, _x6, _x7) {
        return _buildAgent.apply(this, arguments);
      }
      return buildAgent;
    }()
    /**
     * Returns all agents of customer
     *
     * @param customerId
     * @return {Promise<boolean>}
     */
  }, {
    key: "emitViewingScreen",
    value:
    /**
     * Emit event to alert visitor to keep sharing his screen
     *
     * @param conversationId
     */
    function emitViewingScreen(conversationId) {
      this.socket.emit('viewing_screen', {
        customerId: this.customerId,
        chatbotId: this.chatbotId,
        conversationId: conversationId
      });
    }

    /**
     * Emit event to point out on visitor screen at given position
     *
     * @param conversationId
     * @param cursorPosition
     */
  }, {
    key: "emitPointOutVisitorScreen",
    value: function emitPointOutVisitorScreen(conversationId, cursorPosition) {
      this.socket.emit('point_out_visitor_screen', {
        customerId: this.customerId,
        chatbotId: this.chatbotId,
        conversationId: conversationId,
        cursorPosition: cursorPosition
      });
    }

    /**
     * Emit event to scroll visitor screen to given position
     *
     * @param conversationId
     * @param windowId
     * @param scrollPosition
     * @param actionId
     */
  }, {
    key: "emitScrollToPosition",
    value: function emitScrollToPosition(conversationId, windowId, scrollPosition, actionId) {
      this.socket.emit('scroll_to_position_on_visitor_screen', {
        customerId: this.customerId,
        chatbotId: this.chatbotId,
        conversationId: conversationId,
        windowId: windowId,
        scrollPosition: scrollPosition,
        actionId: actionId
      });
    }

    /**
     * Emit event to click on visitor screen at given position
     *
     * @param conversationId
     * @param windowId
     * @param clickPosition
     * @param actionId
     */
  }, {
    key: "emitClickToPosition",
    value: function emitClickToPosition(conversationId, windowId, clickPosition, actionId) {
      this.socket.emit('click_to_position_on_visitor_screen', {
        customerId: this.customerId,
        chatbotId: this.chatbotId,
        conversationId: conversationId,
        windowId: windowId,
        clickPosition: clickPosition,
        actionId: actionId
      });
    }
  }], [{
    key: "listAllAgents",
    value: function () {
      var _listAllAgents = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(customerId) {
        var api, ret;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              api = new _Api["default"](false);
              _context2.next = 3;
              return api.get(_Routes["default"].agents.list, {
                customerId: customerId
              });
            case 3:
              ret = _context2.sent;
              return _context2.abrupt("return", ret.data);
            case 5:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }));
      function listAllAgents(_x8) {
        return _listAllAgents.apply(this, arguments);
      }
      return listAllAgents;
    }()
    /**
     * Returns all bans of customer
     *
     * @param customerId
     * @return {Promise<*>}
     */
  }, {
    key: "listAllBans",
    value: function () {
      var _listAllBans = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(customerId) {
        var api, ret;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              api = new _Api["default"](false);
              _context3.next = 3;
              return api.get(_Routes["default"].bans.list, {
                customerId: customerId
              });
            case 3:
              ret = _context3.sent;
              return _context3.abrupt("return", ret.data);
            case 5:
            case "end":
              return _context3.stop();
          }
        }, _callee3);
      }));
      function listAllBans(_x9) {
        return _listAllBans.apply(this, arguments);
      }
      return listAllBans;
    }()
    /**
     * Fetch specific user note
     *
     * @param userId
     * @param customerId
     * @return {Promise<*>}
     */
  }, {
    key: "getUserNote",
    value: function () {
      var _getUserNote = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(userId, customerId) {
        var api, ret;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              api = new _Api["default"](false);
              _context4.next = 3;
              return api.get(_Routes["default"].usersNotes.get(userId), {
                customerId: customerId
              });
            case 3:
              ret = _context4.sent;
              return _context4.abrupt("return", ret.data);
            case 5:
            case "end":
              return _context4.stop();
          }
        }, _callee4);
      }));
      function getUserNote(_x10, _x11) {
        return _getUserNote.apply(this, arguments);
      }
      return getUserNote;
    }()
    /**
     * Unban specific user
     *
     * @param userId
     * @param customerId
     * @param chatbotId
     * @return {Promise<*>}
     */
  }, {
    key: "unban",
    value: function () {
      var _unban = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(userId, customerId, chatbotId) {
        var api, ret;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              api = new _Api["default"](false);
              _context5.next = 3;
              return api.put(_Routes["default"].users.unban(userId), {
                customerId: customerId,
                chatbotId: chatbotId
              });
            case 3:
              ret = _context5.sent;
              return _context5.abrupt("return", ret.data);
            case 5:
            case "end":
              return _context5.stop();
          }
        }, _callee5);
      }));
      function unban(_x12, _x13, _x14) {
        return _unban.apply(this, arguments);
      }
      return unban;
    }()
    /**
     * Return specific conversation
     *
     * @param conversationId
     * @param customerId
     * @param chatbotId
     * @return {Promise<*>}
     */
  }, {
    key: "getConversation",
    value: function () {
      var _getConversation = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(conversationId, customerId, chatbotId) {
        var api, ret;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              api = new _Api["default"](false);
              _context6.next = 3;
              return api.get(_Routes["default"].conversations.get(conversationId), {
                customerId: customerId,
                chatbotId: chatbotId
              });
            case 3:
              ret = _context6.sent;
              return _context6.abrupt("return", ret.data);
            case 5:
            case "end":
              return _context6.stop();
          }
        }, _callee6);
      }));
      function getConversation(_x15, _x16, _x17) {
        return _getConversation.apply(this, arguments);
      }
      return getConversation;
    }()
    /**
     * Update or create user note
     *
     * @param userId
     * @param customerId
     * @param lastName
     * @param firstName
     * @param email
     * @param phoneNumber
     * @param note
     * @return {Promise<*>}
     */
  }, {
    key: "updateUserNote",
    value: function () {
      var _updateUserNote = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(userId, customerId, lastName, firstName, email, phoneNumber, note) {
        var api, ret;
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              api = new _Api["default"](false);
              _context7.next = 3;
              return api.put(_Routes["default"].usersNotes.update(userId), {
                customerId: customerId,
                lastName: lastName,
                firstName: firstName,
                email: email,
                phoneNumber: phoneNumber,
                note: note
              });
            case 3:
              ret = _context7.sent;
              return _context7.abrupt("return", ret.data);
            case 5:
            case "end":
              return _context7.stop();
          }
        }, _callee7);
      }));
      function updateUserNote(_x18, _x19, _x20, _x21, _x22, _x23, _x24) {
        return _updateUserNote.apply(this, arguments);
      }
      return updateUserNote;
    }()
  }]);
  return LivechatClientAgent;
}(_LivechatClient2["default"]);
exports["default"] = LivechatClientAgent;