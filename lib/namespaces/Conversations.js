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
var _Routes = _interopRequireDefault(require("../Routes"));
var _Messages = _interopRequireDefault(require("../Messages"));
var Conversations = /*#__PURE__*/function () {
  function Conversations(client) {
    (0, _classCallCheck2["default"])(this, Conversations);
    (0, _defineProperty2["default"])(this, "client", null);
    this.client = client;
  }

  /**
   * Set client conversation id
   *
   * @param conversationId
   */
  (0, _createClass2["default"])(Conversations, [{
    key: "setId",
    value: function setId(conversationId) {
      this.client.conversationId = conversationId;
    }

    /**
     * Returns the client conversationId if null given
     *
     * @param conversationId
     * @return {*}
     */
  }, {
    key: "ensureConversationId",
    value: function ensureConversationId(conversationId) {
      if (conversationId === null) {
        if (this.client.conversationId === null) {
          throw new Error('Conversation ID is not defined.');
        }
        conversationId = this.client.conversationId;
      }
      return conversationId;
    }

    /**
     * Returns a specific conversation
     *
     * @param conversationId
     * @return {Promise<*>}
     */
  }, {
    key: "get",
    value: function () {
      var _get = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var conversationId,
          ret,
          _args = arguments;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              conversationId = _args.length > 0 && _args[0] !== undefined ? _args[0] : null;
              conversationId = this.ensureConversationId(conversationId);
              _context.next = 4;
              return this.client.api.get(_Routes["default"].conversations.get(conversationId), {
                chatbotId: this.client.chatbotId,
                customerId: this.client.customerId
              });
            case 4:
              ret = _context.sent;
              return _context.abrupt("return", ret.data);
            case 6:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function get() {
        return _get.apply(this, arguments);
      }
      return get;
    }()
    /**
     * Create a new conversation
     *
     * @param messages
     * @param handleTimeout    timeout to set conversation to not_handled (default 5 minutes)
     * @param results          data of system results
     * @return {Promise<*>}
     */
  }, {
    key: "create",
    value: function () {
      var _create = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
        var messages,
          handleTimeout,
          results,
          universe,
          ret,
          _args2 = arguments;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              messages = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : [];
              handleTimeout = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : 5;
              results = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : {};
              universe = _args2.length > 3 && _args2[3] !== undefined ? _args2[3] : null;
              _context2.next = 6;
              return this.client.api.post(_Routes["default"].conversations.create, {
                userId: this.client.userId,
                sessionId: this.client.sessionId,
                chatbotId: this.client.chatbotId,
                customerId: this.client.customerId,
                messages: messages,
                handleTimeout: handleTimeout,
                name: this.client.userName,
                results: results,
                universeId: universe
              });
            case 6:
              ret = _context2.sent;
              return _context2.abrupt("return", ret.data.id);
            case 8:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function create() {
        return _create.apply(this, arguments);
      }
      return create;
    }()
    /**
     * Add a message to a conversation
     *
     * @param message
     * @param from
     * @param conversationId
     * @return {Promise<*>}
     */
  }, {
    key: "addMessage",
    value: function () {
      var _addMessage = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(message) {
        var from,
          conversationId,
          ret,
          _args3 = arguments;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              from = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : null;
              conversationId = _args3.length > 2 && _args3[2] !== undefined ? _args3[2] : null;
              conversationId = this.ensureConversationId(conversationId);
              _context3.next = 5;
              return this.client.api.post(_Routes["default"].conversations.addMessage(conversationId), {
                chatbotId: this.client.chatbotId,
                customerId: this.client.customerId,
                userId: this.client.userId,
                message: _Messages["default"].format(message, from)
              });
            case 5:
              ret = _context3.sent;
              return _context3.abrupt("return", ret.data.id);
            case 7:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this);
      }));
      function addMessage(_x) {
        return _addMessage.apply(this, arguments);
      }
      return addMessage;
    }()
    /**
     * Returns all messages of a conversation
     *
     * @param conversationId
     * @return {Promise<*>}
     */
  }, {
    key: "getMessages",
    value: function () {
      var _getMessages = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
        var conversationId,
          ret,
          _args4 = arguments;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              conversationId = _args4.length > 0 && _args4[0] !== undefined ? _args4[0] : null;
              conversationId = this.ensureConversationId(conversationId);
              _context4.next = 4;
              return this.client.api.get(_Routes["default"].conversations.getMessages(conversationId), {
                chatbotId: this.client.chatbotId,
                customerId: this.client.customerId,
                userId: this.client.userId
              });
            case 4:
              ret = _context4.sent;
              return _context4.abrupt("return", ret.data);
            case 6:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this);
      }));
      function getMessages() {
        return _getMessages.apply(this, arguments);
      }
      return getMessages;
    }()
    /**
     * Close a conversation
     *
     * @param conversationId
     * @return {Promise<{headers: *, code: *, data: *}|*|AxiosResponse<any>|boolean>}
     */
  }, {
    key: "close",
    value: function () {
      var _close = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
        var conversationId,
          ret,
          _args5 = arguments;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              conversationId = _args5.length > 0 && _args5[0] !== undefined ? _args5[0] : null;
              conversationId = this.ensureConversationId(conversationId);
              _context5.next = 4;
              return this.client.api["delete"](_Routes["default"].conversations.get(conversationId), {
                chatbotId: this.client.chatbotId,
                customerId: this.client.customerId,
                userId: this.client.userId
              });
            case 4:
              ret = _context5.sent;
              return _context5.abrupt("return", ret);
            case 6:
            case "end":
              return _context5.stop();
          }
        }, _callee5, this);
      }));
      function close() {
        return _close.apply(this, arguments);
      }
      return close;
    }()
    /**
     * Acknowledge all messages before given last message with last message
     *
     * @param lastMessageId
     * @param conversationId
     * @return {Promise<{headers: *, code: *, data: *}|*|AxiosResponse<any>|void>}
     */
  }, {
    key: "acknowledgeMessages",
    value: function () {
      var _acknowledgeMessages = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(lastMessageId) {
        var conversationId,
          ret,
          _args6 = arguments;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              conversationId = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : null;
              conversationId = this.ensureConversationId(conversationId);
              _context6.next = 4;
              return this.client.api.put(_Routes["default"].conversations.acknowledgeMessages(conversationId), {
                chatbotId: this.client.chatbotId,
                customerId: this.client.customerId,
                userId: this.client.userId,
                userRole: this.client.userRole,
                lastMessageId: lastMessageId
              });
            case 4:
              ret = _context6.sent;
              return _context6.abrupt("return", ret);
            case 6:
            case "end":
              return _context6.stop();
          }
        }, _callee6, this);
      }));
      function acknowledgeMessages(_x2) {
        return _acknowledgeMessages.apply(this, arguments);
      }
      return acknowledgeMessages;
    }()
    /**
     * Handle a conversation
     *
     * @param conversationId
     * @return {Promise<{headers: *, code: *, data: *}|*|AxiosResponse<any>|void>}
     */
  }, {
    key: "handle",
    value: function () {
      var _handle = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7() {
        var conversationId,
          ret,
          _args7 = arguments;
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              conversationId = _args7.length > 0 && _args7[0] !== undefined ? _args7[0] : null;
              conversationId = this.ensureConversationId(conversationId);
              _context7.next = 4;
              return this.client.api.put(_Routes["default"].conversations.handle(conversationId), {
                chatbotId: this.client.chatbotId,
                customerId: this.client.customerId,
                userId: this.client.userId
              });
            case 4:
              ret = _context7.sent;
              return _context7.abrupt("return", ret);
            case 6:
            case "end":
              return _context7.stop();
          }
        }, _callee7, this);
      }));
      function handle() {
        return _handle.apply(this, arguments);
      }
      return handle;
    }()
    /**
     * Take conversation, transfer it to yourself
     *
     * @param conversationId
     * @return {Promise<{headers: *, code: *, data: *}|*|AxiosResponse<any>|void>}
     */
  }, {
    key: "take",
    value: function () {
      var _take = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8() {
        var conversationId,
          ret,
          _args8 = arguments;
        return _regenerator["default"].wrap(function _callee8$(_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              conversationId = _args8.length > 0 && _args8[0] !== undefined ? _args8[0] : null;
              conversationId = this.ensureConversationId(conversationId);
              _context8.next = 4;
              return this.client.api.put(_Routes["default"].conversations.take(conversationId), {
                chatbotId: this.client.chatbotId,
                customerId: this.client.customerId,
                userId: this.client.userId
              });
            case 4:
              ret = _context8.sent;
              return _context8.abrupt("return", ret);
            case 6:
            case "end":
              return _context8.stop();
          }
        }, _callee8, this);
      }));
      function take() {
        return _take.apply(this, arguments);
      }
      return take;
    }()
    /**
     * Transfer a conversation to another agent
     *
     * @param newUserId
     * @param conversationId
     * @return {Promise<{headers: *, code: *, data: *}|*|AxiosResponse<any>|void>}
     */
  }, {
    key: "transfer",
    value: function () {
      var _transfer = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(newUserId) {
        var conversationId,
          ret,
          _args9 = arguments;
        return _regenerator["default"].wrap(function _callee9$(_context9) {
          while (1) switch (_context9.prev = _context9.next) {
            case 0:
              conversationId = _args9.length > 1 && _args9[1] !== undefined ? _args9[1] : null;
              conversationId = this.ensureConversationId(conversationId);
              _context9.next = 4;
              return this.client.api.put(_Routes["default"].conversations.transfer(conversationId), {
                chatbotId: this.client.chatbotId,
                customerId: this.client.customerId,
                userId: this.client.userId,
                newUserId: newUserId
              });
            case 4:
              ret = _context9.sent;
              return _context9.abrupt("return", ret);
            case 6:
            case "end":
              return _context9.stop();
          }
        }, _callee9, this);
      }));
      function transfer(_x3) {
        return _transfer.apply(this, arguments);
      }
      return transfer;
    }()
    /**
     * Returns the list of conversation of the current user
     *
     * @return {Promise<*>}
     */
  }, {
    key: "list",
    value: function () {
      var _list = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10() {
        var ret;
        return _regenerator["default"].wrap(function _callee10$(_context10) {
          while (1) switch (_context10.prev = _context10.next) {
            case 0:
              _context10.next = 2;
              return this.client.api.get(_Routes["default"].conversations.list, {
                chatbotId: this.client.chatbotId,
                customerId: this.client.customerId,
                userId: this.client.userId
              });
            case 2:
              ret = _context10.sent;
              return _context10.abrupt("return", ret.data);
            case 4:
            case "end":
              return _context10.stop();
          }
        }, _callee10, this);
      }));
      function list() {
        return _list.apply(this, arguments);
      }
      return list;
    }()
    /**
     * Returns the list of archived conversation of the current user
     *
     * @param page
     * @param limit
     * @param search
     * @return {Promise<*>}
     */
  }, {
    key: "listArchived",
    value: function () {
      var _listArchived = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11() {
        var page,
          limit,
          search,
          ret,
          _args11 = arguments;
        return _regenerator["default"].wrap(function _callee11$(_context11) {
          while (1) switch (_context11.prev = _context11.next) {
            case 0:
              page = _args11.length > 0 && _args11[0] !== undefined ? _args11[0] : 1;
              limit = _args11.length > 1 && _args11[1] !== undefined ? _args11[1] : 10;
              search = _args11.length > 2 && _args11[2] !== undefined ? _args11[2] : "";
              _context11.next = 5;
              return this.client.api.get(_Routes["default"].conversations.listArchives, {
                chatbotId: this.client.chatbotId,
                customerId: this.client.customerId,
                userId: this.client.userId,
                page: page,
                limit: limit,
                search: search
              });
            case 5:
              ret = _context11.sent;
              return _context11.abrupt("return", ret.data);
            case 7:
            case "end":
              return _context11.stop();
          }
        }, _callee11, this);
      }));
      function listArchived() {
        return _listArchived.apply(this, arguments);
      }
      return listArchived;
    }()
    /**
     * Returns the list of all conversations
     *
     * @return {Promise<*>}
     */
  }, {
    key: "listModerator",
    value: function () {
      var _listModerator = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12() {
        var ret;
        return _regenerator["default"].wrap(function _callee12$(_context12) {
          while (1) switch (_context12.prev = _context12.next) {
            case 0:
              _context12.next = 2;
              return this.client.api.get(_Routes["default"].conversations.listModerator, {
                chatbotId: this.client.chatbotId,
                customerId: this.client.customerId,
                userId: this.client.userId
              });
            case 2:
              ret = _context12.sent;
              return _context12.abrupt("return", ret.data);
            case 4:
            case "end":
              return _context12.stop();
          }
        }, _callee12, this);
      }));
      function listModerator() {
        return _listModerator.apply(this, arguments);
      }
      return listModerator;
    }()
    /**
     * Returns the list of conversation that are not handled yet
     *
     * @return {Promise<*>}
     */
  }, {
    key: "listNew",
    value: function () {
      var _listNew = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13() {
        var ret;
        return _regenerator["default"].wrap(function _callee13$(_context13) {
          while (1) switch (_context13.prev = _context13.next) {
            case 0:
              _context13.next = 2;
              return this.client.api.get(_Routes["default"].conversations.listNew, {
                chatbotId: this.client.chatbotId,
                customerId: this.client.customerId
              });
            case 2:
              ret = _context13.sent;
              return _context13.abrupt("return", ret.data);
            case 4:
            case "end":
              return _context13.stop();
          }
        }, _callee13, this);
      }));
      function listNew() {
        return _listNew.apply(this, arguments);
      }
      return listNew;
    }()
    /**
     * Upload given files to the conversation
     *
     * @param files
     * @param conversationId
     * @return {Promise<*>}
     */
  }, {
    key: "uploadFiles",
    value: function () {
      var _uploadFiles = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee14(files) {
        var _this$client$api$base;
        var conversationId,
          formData,
          endpointUrl,
          _args14 = arguments;
        return _regenerator["default"].wrap(function _callee14$(_context14) {
          while (1) switch (_context14.prev = _context14.next) {
            case 0:
              conversationId = _args14.length > 1 && _args14[1] !== undefined ? _args14[1] : null;
              conversationId = this.ensureConversationId(conversationId);
              formData = new FormData();
              files.forEach(function (file, index) {
                formData.append('file' + index, file);
              });
              formData.set('customerId', this.client.customerId);
              formData.set('chatbotId', this.client.chatbotId);
              formData.set('userId', this.client.userId);
              formData.set('from', this.client.userRole);
              endpointUrl = ((_this$client$api$base = this.client.api.baseURL) !== null && _this$client$api$base !== void 0 ? _this$client$api$base : process.env.LIVECHAT_SERVER_URL) + _Routes["default"].conversations.uploadFile(conversationId);
              _context14.next = 11;
              return _axios["default"].post(endpointUrl, formData, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              });
            case 11:
              return _context14.abrupt("return", _context14.sent);
            case 12:
            case "end":
              return _context14.stop();
          }
        }, _callee14, this);
      }));
      function uploadFiles(_x4) {
        return _uploadFiles.apply(this, arguments);
      }
      return uploadFiles;
    }()
    /**
     * Send products to visitor
     *
     * @param products
     * @param conversationId
     * @return {Promise<{headers: *, code: *, data: *}|AxiosResponse<any>|void>}
     */
  }, {
    key: "adviseProducts",
    value: function () {
      var _adviseProducts = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee15(products) {
        var conversationId,
          ret,
          _args15 = arguments;
        return _regenerator["default"].wrap(function _callee15$(_context15) {
          while (1) switch (_context15.prev = _context15.next) {
            case 0:
              conversationId = _args15.length > 1 && _args15[1] !== undefined ? _args15[1] : null;
              conversationId = this.ensureConversationId(conversationId);
              _context15.next = 4;
              return this.client.api.post(_Routes["default"].conversations.adviseProducts(conversationId), {
                chatbotId: this.client.chatbotId,
                customerId: this.client.customerId,
                by: this.client.userId,
                products: products
              });
            case 4:
              ret = _context15.sent;
              return _context15.abrupt("return", ret);
            case 6:
            case "end":
              return _context15.stop();
          }
        }, _callee15, this);
      }));
      function adviseProducts(_x5) {
        return _adviseProducts.apply(this, arguments);
      }
      return adviseProducts;
    }()
    /**
     * Ask visitor the permission to share his screen
     *
     * @param conversationId
     * @return {Promise<*>}
     */
  }, {
    key: "askVisitorForScreenSharingPermission",
    value: function () {
      var _askVisitorForScreenSharingPermission = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee16() {
        var conversationId,
          ret,
          _args16 = arguments;
        return _regenerator["default"].wrap(function _callee16$(_context16) {
          while (1) switch (_context16.prev = _context16.next) {
            case 0:
              conversationId = _args16.length > 0 && _args16[0] !== undefined ? _args16[0] : null;
              conversationId = this.ensureConversationId(conversationId);
              _context16.next = 4;
              return this.client.api.post(_Routes["default"].conversations.askVisitorForScreenSharingPermission(conversationId), {
                chatbotId: this.client.chatbotId,
                customerId: this.client.customerId,
                userId: this.client.userId
              });
            case 4:
              ret = _context16.sent;
              return _context16.abrupt("return", ret);
            case 6:
            case "end":
              return _context16.stop();
          }
        }, _callee16, this);
      }));
      function askVisitorForScreenSharingPermission() {
        return _askVisitorForScreenSharingPermission.apply(this, arguments);
      }
      return askVisitorForScreenSharingPermission;
    }()
    /**
     * Accept to share the screen
     *
     * @param conversationId
     * @return {Promise<*>}
     */
  }, {
    key: "acceptScreenSharing",
    value: function () {
      var _acceptScreenSharing = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee17() {
        var conversationId,
          ret,
          _args17 = arguments;
        return _regenerator["default"].wrap(function _callee17$(_context17) {
          while (1) switch (_context17.prev = _context17.next) {
            case 0:
              conversationId = _args17.length > 0 && _args17[0] !== undefined ? _args17[0] : null;
              conversationId = this.ensureConversationId(conversationId);
              _context17.next = 4;
              return this.client.api.post(_Routes["default"].conversations.acceptScreenSharing(conversationId), {
                chatbotId: this.client.chatbotId,
                customerId: this.client.customerId,
                userId: this.client.userId
              });
            case 4:
              ret = _context17.sent;
              return _context17.abrupt("return", ret);
            case 6:
            case "end":
              return _context17.stop();
          }
        }, _callee17, this);
      }));
      function acceptScreenSharing() {
        return _acceptScreenSharing.apply(this, arguments);
      }
      return acceptScreenSharing;
    }()
    /**
     * Refuse to share screen
     *
     * @param conversationId
     * @return {Promise<*>}
     */
  }, {
    key: "refuseScreenSharing",
    value: function () {
      var _refuseScreenSharing = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee18() {
        var conversationId,
          ret,
          _args18 = arguments;
        return _regenerator["default"].wrap(function _callee18$(_context18) {
          while (1) switch (_context18.prev = _context18.next) {
            case 0:
              conversationId = _args18.length > 0 && _args18[0] !== undefined ? _args18[0] : null;
              conversationId = this.ensureConversationId(conversationId);
              _context18.next = 4;
              return this.client.api.post(_Routes["default"].conversations.refuseScreenSharing(conversationId), {
                chatbotId: this.client.chatbotId,
                customerId: this.client.customerId,
                userId: this.client.userId
              });
            case 4:
              ret = _context18.sent;
              return _context18.abrupt("return", ret);
            case 6:
            case "end":
              return _context18.stop();
          }
        }, _callee18, this);
      }));
      function refuseScreenSharing() {
        return _refuseScreenSharing.apply(this, arguments);
      }
      return refuseScreenSharing;
    }()
    /**
     * Visitor stop screen sharing
     *
     * @param conversationId
     * @return {Promise<*>}
     */
  }, {
    key: "stopScreenSharing",
    value: function () {
      var _stopScreenSharing = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee19() {
        var conversationId,
          ret,
          _args19 = arguments;
        return _regenerator["default"].wrap(function _callee19$(_context19) {
          while (1) switch (_context19.prev = _context19.next) {
            case 0:
              conversationId = _args19.length > 0 && _args19[0] !== undefined ? _args19[0] : null;
              conversationId = this.ensureConversationId(conversationId);
              _context19.next = 4;
              return this.client.api.post(_Routes["default"].conversations.stopScreenSharing(conversationId), {
                chatbotId: this.client.chatbotId,
                customerId: this.client.customerId,
                userId: this.client.userId
              });
            case 4:
              ret = _context19.sent;
              return _context19.abrupt("return", ret);
            case 6:
            case "end":
              return _context19.stop();
          }
        }, _callee19, this);
      }));
      function stopScreenSharing() {
        return _stopScreenSharing.apply(this, arguments);
      }
      return stopScreenSharing;
    }()
    /**
     * Force visitor to share his screen
     *
     * @param conversationId
     * @return {Promise<*>}
     */
  }, {
    key: "forceVisitorScreenSharing",
    value: function () {
      var _forceVisitorScreenSharing = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee20() {
        var conversationId,
          ret,
          _args20 = arguments;
        return _regenerator["default"].wrap(function _callee20$(_context20) {
          while (1) switch (_context20.prev = _context20.next) {
            case 0:
              conversationId = _args20.length > 0 && _args20[0] !== undefined ? _args20[0] : null;
              conversationId = this.ensureConversationId(conversationId);
              _context20.next = 4;
              return this.client.api.post(_Routes["default"].conversations.forceVisitorScreenSharing(conversationId), {
                chatbotId: this.client.chatbotId,
                customerId: this.client.customerId,
                userId: this.client.userId
              });
            case 4:
              ret = _context20.sent;
              return _context20.abrupt("return", ret);
            case 6:
            case "end":
              return _context20.stop();
          }
        }, _callee20, this);
      }));
      function forceVisitorScreenSharing() {
        return _forceVisitorScreenSharing.apply(this, arguments);
      }
      return forceVisitorScreenSharing;
    }()
    /**
     * Ask visitor the permission to control his screen
     *
     * @param conversationId
     * @return {Promise<*>}
     */
  }, {
    key: "askVisitorForScreenControlPermission",
    value: function () {
      var _askVisitorForScreenControlPermission = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee21() {
        var conversationId,
          ret,
          _args21 = arguments;
        return _regenerator["default"].wrap(function _callee21$(_context21) {
          while (1) switch (_context21.prev = _context21.next) {
            case 0:
              conversationId = _args21.length > 0 && _args21[0] !== undefined ? _args21[0] : null;
              conversationId = this.ensureConversationId(conversationId);
              _context21.next = 4;
              return this.client.api.post(_Routes["default"].conversations.askVisitorForScreenControlPermission(conversationId), {
                chatbotId: this.client.chatbotId,
                customerId: this.client.customerId,
                userId: this.client.userId
              });
            case 4:
              ret = _context21.sent;
              return _context21.abrupt("return", ret);
            case 6:
            case "end":
              return _context21.stop();
          }
        }, _callee21, this);
      }));
      function askVisitorForScreenControlPermission() {
        return _askVisitorForScreenControlPermission.apply(this, arguments);
      }
      return askVisitorForScreenControlPermission;
    }()
    /**
     * Visitor accept control of agent
     *
     * @param conversationId
     * @param agentId
     * @return {Promise<*>}
     */
  }, {
    key: "acceptTakeControl",
    value: function () {
      var _acceptTakeControl = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee22() {
        var conversationId,
          agentId,
          ret,
          _args22 = arguments;
        return _regenerator["default"].wrap(function _callee22$(_context22) {
          while (1) switch (_context22.prev = _context22.next) {
            case 0:
              conversationId = _args22.length > 0 && _args22[0] !== undefined ? _args22[0] : null;
              agentId = _args22.length > 1 ? _args22[1] : undefined;
              conversationId = this.ensureConversationId(conversationId);
              _context22.next = 5;
              return this.client.api.post(_Routes["default"].conversations.acceptTakeControl(conversationId), {
                chatbotId: this.client.chatbotId,
                customerId: this.client.customerId,
                userId: this.client.userId,
                agentId: agentId
              });
            case 5:
              ret = _context22.sent;
              return _context22.abrupt("return", ret);
            case 7:
            case "end":
              return _context22.stop();
          }
        }, _callee22, this);
      }));
      function acceptTakeControl() {
        return _acceptTakeControl.apply(this, arguments);
      }
      return acceptTakeControl;
    }()
    /**
     * Visitor refuse control of agent
     *
     * @param conversationId
     * @param agentId
     * @return {Promise<*>}
     */
  }, {
    key: "refuseTakeControl",
    value: function () {
      var _refuseTakeControl = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee23() {
        var conversationId,
          agentId,
          ret,
          _args23 = arguments;
        return _regenerator["default"].wrap(function _callee23$(_context23) {
          while (1) switch (_context23.prev = _context23.next) {
            case 0:
              conversationId = _args23.length > 0 && _args23[0] !== undefined ? _args23[0] : null;
              agentId = _args23.length > 1 ? _args23[1] : undefined;
              conversationId = this.ensureConversationId(conversationId);
              _context23.next = 5;
              return this.client.api.post(_Routes["default"].conversations.refuseTakeControl(conversationId), {
                chatbotId: this.client.chatbotId,
                customerId: this.client.customerId,
                userId: this.client.userId,
                agentId: agentId
              });
            case 5:
              ret = _context23.sent;
              return _context23.abrupt("return", ret);
            case 7:
            case "end":
              return _context23.stop();
          }
        }, _callee23, this);
      }));
      function refuseTakeControl() {
        return _refuseTakeControl.apply(this, arguments);
      }
      return refuseTakeControl;
    }()
    /**
     * Visitor take back control
     *
     * @param conversationId
     * @return {Promise<*>}
     */
  }, {
    key: "giveVisitorControlBack",
    value: function () {
      var _giveVisitorControlBack = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee24() {
        var conversationId,
          ret,
          _args24 = arguments;
        return _regenerator["default"].wrap(function _callee24$(_context24) {
          while (1) switch (_context24.prev = _context24.next) {
            case 0:
              conversationId = _args24.length > 0 && _args24[0] !== undefined ? _args24[0] : null;
              conversationId = this.ensureConversationId(conversationId);
              _context24.next = 4;
              return this.client.api.post(_Routes["default"].conversations.takeControlBack(conversationId), {
                chatbotId: this.client.chatbotId,
                customerId: this.client.customerId,
                userId: this.client.userId
              });
            case 4:
              ret = _context24.sent;
              return _context24.abrupt("return", ret);
            case 6:
            case "end":
              return _context24.stop();
          }
        }, _callee24, this);
      }));
      function giveVisitorControlBack() {
        return _giveVisitorControlBack.apply(this, arguments);
      }
      return giveVisitorControlBack;
    }()
  }]);
  return Conversations;
}();
exports["default"] = Conversations;