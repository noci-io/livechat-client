import axios from "axios";
import Routes from '../Routes'
import Messages from '../Messages'

export default class Conversations {
  client = null;

  constructor(client) {
    this.client = client;
  }

  /**
   * Set client conversation id
   *
   * @param conversationId
   */
  setId(conversationId) {
    this.client.conversationId = conversationId;
  }

  /**
   * Returns the client conversationId if null given
   *
   * @param conversationId
   * @return {*}
   */
  ensureConversationId(conversationId) {
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
  async get(conversationId = null) {
    conversationId = this.ensureConversationId(conversationId);
    const ret = await this.client.api.get(Routes.conversations.get(conversationId), {
      chatbotId: this.client.chatbotId,
      customerId: this.client.customerId,
    })
    return ret.data;
  }

  /**
   * Create a new conversation
   *
   * @param messages
   * @param handleTimeout    timeout to set conversation to not_handled (default 5 minutes)
   * @param results          data of system results
   * @return {Promise<*>}
   */
  async create(messages = [], handleTimeout = 5, results = {}, universe = null) {
    const ret = await this.client.api.post(Routes.conversations.create, {
      userId: this.client.userId,
      sessionId: this.client.sessionId,
      chatbotId: this.client.chatbotId,
      customerId: this.client.customerId,
      messages,
      handleTimeout,
      name: this.client.userName,
      results,
      universeId: universe
    })
    return ret.data.id;
  }

  /**
   * Add a message to a conversation
   *
   * @param message
   * @param from
   * @param conversationId
   * @return {Promise<*>}
   */
  async addMessage(message, from = null, conversationId = null) {
    conversationId = this.ensureConversationId(conversationId);
    const ret = await this.client.api.post(
      Routes.conversations.addMessage(conversationId),
      {
        chatbotId: this.client.chatbotId,
        customerId: this.client.customerId,
        userId: this.client.userId,
        message: Messages.format(message, from)
      }
    );
    return ret.data.id;
  }

  /**
   * Returns all messages of a conversation
   *
   * @param conversationId
   * @return {Promise<*>}
   */
  async getMessages(conversationId = null) {
    conversationId = this.ensureConversationId(conversationId);
    const ret = await this.client.api.get(
      Routes.conversations.getMessages(conversationId),
      {
        chatbotId: this.client.chatbotId,
        customerId: this.client.customerId,
        userId: this.client.userId
      }
    );
    return ret.data;
  }

  /**
   * Close a conversation
   *
   * @param conversationId
   * @return {Promise<{headers: *, code: *, data: *}|*|AxiosResponse<any>|boolean>}
   */
  async close(conversationId = null) {
    conversationId = this.ensureConversationId(conversationId);
    const ret = await this.client.api.delete(
      Routes.conversations.get(conversationId),
      {
        chatbotId: this.client.chatbotId,
        customerId: this.client.customerId,
        userId: this.client.userId
      }
    );
    return ret;
  }

  /**
   * Acknowledge all messages before given last message with last message
   *
   * @param lastMessageId
   * @param conversationId
   * @return {Promise<{headers: *, code: *, data: *}|*|AxiosResponse<any>|void>}
   */
  async acknowledgeMessages(lastMessageId, conversationId = null) {
    conversationId = this.ensureConversationId(conversationId);
    const ret = await this.client.api.put(
      Routes.conversations.acknowledgeMessages(conversationId),
      {
        chatbotId: this.client.chatbotId,
        customerId: this.client.customerId,
        userId: this.client.userId,
        userRole: this.client.userRole,
        lastMessageId
      }
    );
    return ret;
  }

  /**
   * Handle a conversation
   *
   * @param conversationId
   * @return {Promise<{headers: *, code: *, data: *}|*|AxiosResponse<any>|void>}
   */
  async handle(conversationId = null) {
    conversationId = this.ensureConversationId(conversationId);
    const ret = await this.client.api.put(
      Routes.conversations.handle(conversationId),
      {
        chatbotId: this.client.chatbotId,
        customerId: this.client.customerId,
        userId: this.client.userId
      }
    );
    return ret;
  }

  /**
   * Take conversation, transfer it to yourself
   *
   * @param conversationId
   * @return {Promise<{headers: *, code: *, data: *}|*|AxiosResponse<any>|void>}
   */
  async take(conversationId = null) {
    conversationId = this.ensureConversationId(conversationId);
    const ret = await this.client.api.put(
      Routes.conversations.take(conversationId),
      {
        chatbotId: this.client.chatbotId,
        customerId: this.client.customerId,
        userId: this.client.userId
      }
    );
    return ret;
  }

  /**
   * Transfer a conversation to another agent
   *
   * @param newUserId
   * @param conversationId
   * @return {Promise<{headers: *, code: *, data: *}|*|AxiosResponse<any>|void>}
   */
  async transfer(newUserId, conversationId = null) {
    conversationId = this.ensureConversationId(conversationId);
    const ret = await this.client.api.put(
      Routes.conversations.transfer(conversationId),
      {
        chatbotId: this.client.chatbotId,
        customerId: this.client.customerId,
        userId: this.client.userId,
        newUserId
      }
    );
    return ret;
  }

  /**
   * Returns the list of conversation of the current user
   *
   * @return {Promise<*>}
   */
  async list() {
    const ret = await this.client.api.get(
      Routes.conversations.list,
      {
        chatbotId: this.client.chatbotId,
        customerId: this.client.customerId,
        userId: this.client.userId
      }
    );
    return ret.data;
  }

  /**
   * Returns the list of archived conversation of the current user
   *
   * @param page
   * @param limit
   * @param search
   * @return {Promise<*>}
   */
  async listArchived(page = 1, limit = 10, search = "") {
    const ret = await this.client.api.get(
      Routes.conversations.listArchives,
      {
        chatbotId: this.client.chatbotId,
        customerId: this.client.customerId,
        userId: this.client.userId,
        page,
        limit,
        search
      }
    );
    return ret.data;
  }

  /**
   * Returns the list of all conversations
   *
   * @return {Promise<*>}
   */
  async listModerator() {
    const ret = await this.client.api.get(
      Routes.conversations.listModerator,
      {
        chatbotId: this.client.chatbotId,
        customerId: this.client.customerId,
        userId: this.client.userId
      }
    );
    return ret.data;
  }

  /**
   * Returns the list of conversation that are not handled yet
   *
   * @return {Promise<*>}
   */
  async listNew() {
    const ret = await this.client.api.get(
      Routes.conversations.listNew,
      {
        chatbotId: this.client.chatbotId,
        customerId: this.client.customerId
      }
    );
    return ret.data;
  }

  /**
   * Upload given files to the conversation
   *
   * @param files
   * @param conversationId
   * @return {Promise<*>}
   */
  async uploadFiles(files, conversationId = null) {
    conversationId = this.ensureConversationId(conversationId);

    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append('file' + index, file);
    });
    formData.set('customerId', this.client.customerId);
    formData.set('chatbotId', this.client.chatbotId);
    formData.set('userId', this.client.userId);
    formData.set('from', this.client.userRole);

    const endpointUrl = (this.client.api.baseURL ?? process.env.LIVECHAT_SERVER_URL) +
      Routes.conversations.uploadFile(conversationId);

    return await axios.post(
      endpointUrl,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )
  }

  /**
   * Send products to visitor
   *
   * @param products
   * @param conversationId
   * @return {Promise<{headers: *, code: *, data: *}|AxiosResponse<any>|void>}
   */
  async adviseProducts(products, conversationId = null) {
    conversationId = this.ensureConversationId(conversationId);
    const ret = await this.client.api.post(
      Routes.conversations.adviseProducts(conversationId),
      {
        chatbotId: this.client.chatbotId,
        customerId: this.client.customerId,
        by: this.client.userId,
        products
      }
    );
    return ret;
  }

  /**
   * Ask visitor the permission to share his screen
   *
   * @param conversationId
   * @return {Promise<*>}
   */
  async askVisitorForScreenSharingPermission(conversationId = null) {
    conversationId = this.ensureConversationId(conversationId);
    const ret = await this.client.api.post(
      Routes.conversations.askVisitorForScreenSharingPermission(conversationId),
      {
        chatbotId: this.client.chatbotId,
        customerId: this.client.customerId,
        userId: this.client.userId
      }
    );
    return ret;
  }

  /**
   * Accept to share the screen
   *
   * @param conversationId
   * @return {Promise<*>}
   */
  async acceptScreenSharing(conversationId = null) {
    conversationId = this.ensureConversationId(conversationId);
    const ret = await this.client.api.post(
      Routes.conversations.acceptScreenSharing(conversationId),
      {
        chatbotId: this.client.chatbotId,
        customerId: this.client.customerId,
        userId: this.client.userId
      }
    );
    return ret;
  }

  /**
   * Refuse to share screen
   *
   * @param conversationId
   * @return {Promise<*>}
   */
  async refuseScreenSharing(conversationId = null) {
    conversationId = this.ensureConversationId(conversationId);
    const ret = await this.client.api.post(
      Routes.conversations.refuseScreenSharing(conversationId),
      {
        chatbotId: this.client.chatbotId,
        customerId: this.client.customerId,
        userId: this.client.userId
      }
    );
    return ret;
  }

  /**
   * Visitor stop screen sharing
   *
   * @param conversationId
   * @return {Promise<*>}
   */
  async stopScreenSharing(conversationId = null) {
    conversationId = this.ensureConversationId(conversationId);
    const ret = await this.client.api.post(
      Routes.conversations.stopScreenSharing(conversationId),
      {
        chatbotId: this.client.chatbotId,
        customerId: this.client.customerId,
        userId: this.client.userId
      }
    );
    return ret;
  }

  /**
   * Force visitor to share his screen
   *
   * @param conversationId
   * @return {Promise<*>}
   */
  async forceVisitorScreenSharing(conversationId = null) {
    conversationId = this.ensureConversationId(conversationId);
    const ret = await this.client.api.post(
      Routes.conversations.forceVisitorScreenSharing(conversationId),
      {
        chatbotId: this.client.chatbotId,
        customerId: this.client.customerId,
        userId: this.client.userId
      }
    );
    return ret;
  }

  /**
   * Ask visitor the permission to control his screen
   *
   * @param conversationId
   * @return {Promise<*>}
   */
  async askVisitorForScreenControlPermission(conversationId = null) {
    conversationId = this.ensureConversationId(conversationId);
    const ret = await this.client.api.post(
      Routes.conversations.askVisitorForScreenControlPermission(conversationId),
      {
        chatbotId: this.client.chatbotId,
        customerId: this.client.customerId,
        userId: this.client.userId
      }
    );
    return ret;
  }

  /**
   * Visitor accept control of agent
   *
   * @param conversationId
   * @param agentId
   * @return {Promise<*>}
   */
  async acceptTakeControl(conversationId = null, agentId) {
    conversationId = this.ensureConversationId(conversationId);
    const ret = await this.client.api.post(
      Routes.conversations.acceptTakeControl(conversationId),
      {
        chatbotId: this.client.chatbotId,
        customerId: this.client.customerId,
        userId: this.client.userId,
        agentId
      }
    );
    return ret;
  }

  /**
   * Visitor refuse control of agent
   *
   * @param conversationId
   * @param agentId
   * @return {Promise<*>}
   */
  async refuseTakeControl(conversationId = null, agentId) {
    conversationId = this.ensureConversationId(conversationId);
    const ret = await this.client.api.post(
      Routes.conversations.refuseTakeControl(conversationId),
      {
        chatbotId: this.client.chatbotId,
        customerId: this.client.customerId,
        userId: this.client.userId,
        agentId
      }
    );
    return ret;
  }

  /**
   * Visitor take back control
   *
   * @param conversationId
   * @return {Promise<*>}
   */
  async giveVisitorControlBack(conversationId = null) {
    conversationId = this.ensureConversationId(conversationId);
    const ret = await this.client.api.post(
      Routes.conversations.takeControlBack(conversationId),
      {
        chatbotId: this.client.chatbotId,
        customerId: this.client.customerId,
        userId: this.client.userId
      }
    );
    return ret;
  }
}