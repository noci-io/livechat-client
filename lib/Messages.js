"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _uuid = require("uuid");
var Messages = /*#__PURE__*/function () {
  function Messages() {
    (0, _classCallCheck2["default"])(this, Messages);
  }
  (0, _createClass2["default"])(Messages, null, [{
    key: "format",
    value:
    /**
     * Create a message object from content and user role
     *
     * @param messageContent
     * @param from
     * @return {{from: string, id: *, message: *}}
     */
    function format(messageContent) {
      var from = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      return {
        id: (0, _uuid.v4)(),
        message: messageContent,
        from: from || Messages.FROM_SYSTEM
      };
    }
  }]);
  return Messages;
}();
exports["default"] = Messages;
(0, _defineProperty2["default"])(Messages, "FROM_SYSTEM", 'system');
(0, _defineProperty2["default"])(Messages, "FROM_VISITOR", 'visitor');
(0, _defineProperty2["default"])(Messages, "FROM_AGENT", 'agent');