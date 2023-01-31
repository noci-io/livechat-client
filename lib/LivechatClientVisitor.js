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
var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _LivechatClient2 = _interopRequireDefault(require("./LivechatClient"));
var _Api = _interopRequireDefault(require("./Api"));
var _Routes = _interopRequireDefault(require("./Routes"));
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var LivechatClientVisitor = /*#__PURE__*/function (_LivechatClient) {
  (0, _inherits2["default"])(LivechatClientVisitor, _LivechatClient);
  var _super = _createSuper(LivechatClientVisitor);
  function LivechatClientVisitor(customerId, userId, chatbotId, sessionId, baseUrl) {
    var _this;
    (0, _classCallCheck2["default"])(this, LivechatClientVisitor);
    _this = _super.call(this, customerId, userId, chatbotId, baseUrl);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "sessionId", null);
    _this.sessionId = sessionId;
    return _this;
  }

  /**
   * Build visitor
   *
   * @param name
   * @param email
   * @param languages
   * @return {Promise<void>}
   */
  (0, _createClass2["default"])(LivechatClientVisitor, [{
    key: "buildVisitor",
    value: function () {
      var _buildVisitor = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(name, email, languages) {
        var universes,
          _args = arguments;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              universes = _args.length > 3 && _args[3] !== undefined ? _args[3] : [];
              _context.next = 3;
              return this.build(name, email, _LivechatClient2["default"].ROLE_VISITOR, languages, universes);
            case 3:
              this.online = true;
              this.startHeartbeat();
              this.emitPageview();
            case 6:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function buildVisitor(_x, _x2, _x3) {
        return _buildVisitor.apply(this, arguments);
      }
      return buildVisitor;
    }()
    /**
     * Returns true if some agents are available
     * 
     * @param customerId
     * @param chatbotId
     * @param userId
     * @param languages
     * @return {Promise<boolean>}
     */
  }, {
    key: "emitPageview",
    value:
    /**
     * Emit current pageview to be added on agent dashboard
     */
    function emitPageview() {
      var pageview = {
        url_protocol: window.location.protocol.replace(/:/g, ''),
        url_domain: window.location.host,
        url_path: window.location.pathname,
        url_query: window.location.search.substr(1),
        date: {
          value: +new Date()
        },
        sessionId: this.sessionId
      };
      this.socket.emit('pageview', {
        id: this.userId,
        chatbotId: this.chatbotId,
        pageview: pageview
      });
    }

    /**
     * Emit visitor input value to agents
     *
     * @param conversationId
     * @param content
     */
  }, {
    key: "emitTyping",
    value: function emitTyping(conversationId, content) {
      this.socket.emit('typing', {
        id: this.userId,
        customerId: this.customerId,
        chatbotId: this.chatbotId,
        conversationId: conversationId,
        content: content
      });
    }

    /**
     * Emit screen of visitor
     *
     * @param conversationId
     * @param windowId
     * @param screenshot
     * @param mousePosition
     * @param scrollPosition
     * @param actionId
     */
  }, {
    key: "emitScreen",
    value: function emitScreen(conversationId, windowId, screenshot, mousePosition, scrollPosition, actionId) {
      this.socket.emit('screen', {
        id: this.userId,
        customerId: this.customerId,
        chatbotId: this.chatbotId,
        conversationId: conversationId,
        windowId: windowId,
        screenshot: screenshot,
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight,
        mousePosition: mousePosition,
        scrollPosition: scrollPosition,
        actionId: actionId
      });
    }
  }], [{
    key: "areSomeAgentsAvailable",
    value: function () {
      var _areSomeAgentsAvailable = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(customerId, chatbotId, userId) {
        var languages,
          universes,
          api,
          ret,
          _args2 = arguments;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              languages = _args2.length > 3 && _args2[3] !== undefined ? _args2[3] : null;
              universes = _args2.length > 4 && _args2[4] !== undefined ? _args2[4] : null;
              api = new _Api["default"](false);
              _context2.next = 5;
              return api.get(_Routes["default"].agents.count, {
                available: 1,
                customerId: customerId,
                chatbotId: chatbotId,
                userId: userId,
                languages: languages,
                universes: universes
              });
            case 5:
              ret = _context2.sent;
              return _context2.abrupt("return", ret.data.count > 0);
            case 7:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }));
      function areSomeAgentsAvailable(_x4, _x5, _x6) {
        return _areSomeAgentsAvailable.apply(this, arguments);
      }
      return areSomeAgentsAvailable;
    }()
  }]);
  return LivechatClientVisitor;
}(_LivechatClient2["default"]);
exports["default"] = LivechatClientVisitor;