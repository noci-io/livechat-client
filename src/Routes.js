export default {
  conversations: {
    list: '/api/conversations',
    listArchives: `/api/conversations/archived`,
    listModerator: `/api/conversations/moderator`,
    listNew: '/api/conversations/new',
    create: '/api/conversation',
    get: (conversationId) => `/api/conversation/${conversationId}`,
    addMessage: (conversationId) => `/api/conversation/${conversationId}/message`,
    handle: (conversationId) => `/api/conversation/${conversationId}/handle`,
    take: (conversationId) => `/api/conversation/${conversationId}/take`,
    takeDecline: (conversationId) => `/api/conversation/${conversationId}/take-decline`,
    transfer: (conversationId) => `/api/conversation/${conversationId}/transfer`,
    getMessages: (conversationId) => `/api/conversation/${conversationId}/messages`,
    acknowledgeMessages: (conversationId) => `/api/conversation/${conversationId}/messages/acknowledge`,
    uploadFile: (conversationId) => `/api/conversation/${conversationId}/file`,
    adviseProducts: (conversationId) => `/api/conversation/${conversationId}/product`,
    askVisitorForScreenSharingPermission: (conversationId) => `/api/conversation/${conversationId}/ask-visitor-for-screen-sharing-permission`,
    acceptScreenSharing: (conversationId) => `/api/conversation/${conversationId}/screen-sharing-accepted`,
    refuseScreenSharing: (conversationId) => `/api/conversation/${conversationId}/screen-sharing-refused`,
    stopScreenSharing: (conversationId) => `/api/conversation/${conversationId}/screen-sharing-stopped`,
    forceVisitorScreenSharing: (conversationId) => `/api/conversation/${conversationId}/force-visitor-screen-sharing`,
    askVisitorForScreenControlPermission: (conversationId) => `/api/conversation/${conversationId}/ask-visitor-for-screen-control-permission`,
    acceptTakeControl: (conversationId) => `/api/conversation/${conversationId}/take-control-accepted`,
    refuseTakeControl: (conversationId) => `/api/conversation/${conversationId}/take-control-refused`,
    takeControlBack: (conversationId) => `/api/conversation/${conversationId}/take-control-back`
  },
  agents: {
    list: '/api/agents',
    count: '/api/agents/count',
    status: (userId) => `/api/agent/${userId}/status`,
    languages: (userId) => `/api/agent/${userId}/languages`,
    universes: (userId) => `/api/agent/${userId}/universes`
  },
  users: {
    get: (userId) => `/api/user/${userId}`,
    create: `/api/user`,
    update: (userId) => `/api/user/${userId}`,
    ban: (userId) => `/api/user/${userId}/ban`,
    unban: (userId) => `/api/user/${userId}/unban`,
    askToReceiveEvent: (userId, socketId) => `/api/user/${userId}/socket/${socketId}/ask-to-receive-event`,
    stopReceivingEvent: (userId, socketId) => `/api/user/${userId}/socket/${socketId}/stop-receiving-event`
  },
  bans: {
    list: '/api/bans'
  },
  usersNotes: {
    get: (userId) => `/api/user-note/${userId}`,
    update: (userId) => `/api/user-note/${userId}`
  }
}