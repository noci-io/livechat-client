"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  conversations: {
    list: '/api/conversations',
    listArchives: "/api/conversations/archived",
    listModerator: "/api/conversations/moderator",
    listNew: '/api/conversations/new',
    create: '/api/conversation',
    get: function get(conversationId) {
      return "/api/conversation/".concat(conversationId);
    },
    addMessage: function addMessage(conversationId) {
      return "/api/conversation/".concat(conversationId, "/message");
    },
    handle: function handle(conversationId) {
      return "/api/conversation/".concat(conversationId, "/handle");
    },
    take: function take(conversationId) {
      return "/api/conversation/".concat(conversationId, "/take");
    },
    takeDecline: function takeDecline(conversationId) {
      return "/api/conversation/".concat(conversationId, "/take-decline");
    },
    transfer: function transfer(conversationId) {
      return "/api/conversation/".concat(conversationId, "/transfer");
    },
    getMessages: function getMessages(conversationId) {
      return "/api/conversation/".concat(conversationId, "/messages");
    },
    acknowledgeMessages: function acknowledgeMessages(conversationId) {
      return "/api/conversation/".concat(conversationId, "/messages/acknowledge");
    },
    uploadFile: function uploadFile(conversationId) {
      return "/api/conversation/".concat(conversationId, "/file");
    },
    adviseProducts: function adviseProducts(conversationId) {
      return "/api/conversation/".concat(conversationId, "/product");
    },
    askVisitorForScreenSharingPermission: function askVisitorForScreenSharingPermission(conversationId) {
      return "/api/conversation/".concat(conversationId, "/ask-visitor-for-screen-sharing-permission");
    },
    acceptScreenSharing: function acceptScreenSharing(conversationId) {
      return "/api/conversation/".concat(conversationId, "/screen-sharing-accepted");
    },
    refuseScreenSharing: function refuseScreenSharing(conversationId) {
      return "/api/conversation/".concat(conversationId, "/screen-sharing-refused");
    },
    stopScreenSharing: function stopScreenSharing(conversationId) {
      return "/api/conversation/".concat(conversationId, "/screen-sharing-stopped");
    },
    forceVisitorScreenSharing: function forceVisitorScreenSharing(conversationId) {
      return "/api/conversation/".concat(conversationId, "/force-visitor-screen-sharing");
    },
    askVisitorForScreenControlPermission: function askVisitorForScreenControlPermission(conversationId) {
      return "/api/conversation/".concat(conversationId, "/ask-visitor-for-screen-control-permission");
    },
    acceptTakeControl: function acceptTakeControl(conversationId) {
      return "/api/conversation/".concat(conversationId, "/take-control-accepted");
    },
    refuseTakeControl: function refuseTakeControl(conversationId) {
      return "/api/conversation/".concat(conversationId, "/take-control-refused");
    },
    takeControlBack: function takeControlBack(conversationId) {
      return "/api/conversation/".concat(conversationId, "/take-control-back");
    }
  },
  agents: {
    list: '/api/agents',
    count: '/api/agents/count',
    status: function status(userId) {
      return "/api/agent/".concat(userId, "/status");
    },
    languages: function languages(userId) {
      return "/api/agent/".concat(userId, "/languages");
    },
    universes: function universes(userId) {
      return "/api/agent/".concat(userId, "/universes");
    }
  },
  users: {
    get: function get(userId) {
      return "/api/user/".concat(userId);
    },
    create: "/api/user",
    update: function update(userId) {
      return "/api/user/".concat(userId);
    },
    ban: function ban(userId) {
      return "/api/user/".concat(userId, "/ban");
    },
    unban: function unban(userId) {
      return "/api/user/".concat(userId, "/unban");
    },
    askToReceiveEvent: function askToReceiveEvent(userId, socketId) {
      return "/api/user/".concat(userId, "/socket/").concat(socketId, "/ask-to-receive-event");
    },
    stopReceivingEvent: function stopReceivingEvent(userId, socketId) {
      return "/api/user/".concat(userId, "/socket/").concat(socketId, "/stop-receiving-event");
    }
  },
  bans: {
    list: '/api/bans'
  },
  usersNotes: {
    get: function get(userId) {
      return "/api/user-note/".concat(userId);
    },
    update: function update(userId) {
      return "/api/user-note/".concat(userId);
    }
  }
};
exports["default"] = _default;