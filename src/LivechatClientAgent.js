import LivechatClient from './LivechatClient';
import Api from './Api';
import Routes from './Routes';

export default class LivechatClientAgent extends LivechatClient {
  constructor(customerId, userId, chatbotId, baseUrl) {
    super(customerId, userId, chatbotId, baseUrl);
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
  async buildAgent(name, email, role, languages, photo, maxConversationQty, universes) {
    const userData = await this.build(name, email, role, languages, photo, maxConversationQty, universes);

    this.online = userData.loggedIn;
    this.startHeartbeat();
  }

  /**
   * Returns all agents of customer
   *
   * @param customerId
   * @return {Promise<boolean>}
   */
  static async listAllAgents(customerId) {
    const api = new Api(false);
    const ret = await api.get(
      Routes.agents.list,
      { customerId }
    );
    return ret.data;
  }

  /**
   * Returns all bans of customer
   *
   * @param customerId
   * @return {Promise<*>}
   */
  static async listAllBans(customerId) {
    const api = new Api(false);
    const ret = await api.get(
      Routes.bans.list,
      { customerId }
    );
    return ret.data;
  }

  /**
   * Fetch specific user note
   *
   * @param userId
   * @param customerId
   * @return {Promise<*>}
   */
  static async getUserNote(userId, customerId) {
    const api = new Api(false);
    const ret = await api.get(
      Routes.usersNotes.get(userId),
      { customerId }
    );
    return ret.data;
  }

  /**
   * Unban specific user
   *
   * @param userId
   * @param customerId
   * @param chatbotId
   * @return {Promise<*>}
   */
  static async unban(userId, customerId, chatbotId) {
    const api = new Api(false);
    const ret = await api.put(
      Routes.users.unban(userId),
      { customerId, chatbotId }
    )
    return ret.data;
  }

  /**
   * Return specific conversation
   *
   * @param conversationId
   * @param customerId
   * @param chatbotId
   * @return {Promise<*>}
   */
  static async getConversation(conversationId, customerId, chatbotId) {
    const api = new Api(false);
    const ret = await api.get(
      Routes.conversations.get(conversationId),
      { customerId, chatbotId }
    )
    return ret.data;
  }
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
  static async updateUserNote(userId, customerId, lastName, firstName, email, phoneNumber, note) {
    const api = new Api(false);
    const ret = await api.put(
      Routes.usersNotes.update(userId),
      { customerId, lastName, firstName, email, phoneNumber, note }
    );
    return ret.data;
  }

  /**
   * Emit event to alert visitor to keep sharing his screen
   *
   * @param conversationId
   */
  emitViewingScreen(conversationId) {
    this.socket.emit(
      'viewing_screen',
      {
        customerId: this.customerId,
        chatbotId: this.chatbotId,
        conversationId
      }
    );
  }

  /**
   * Emit event to point out on visitor screen at given position
   *
   * @param conversationId
   * @param cursorPosition
   */
  emitPointOutVisitorScreen(conversationId, cursorPosition) {
    this.socket.emit(
      'point_out_visitor_screen',
      {
        customerId: this.customerId,
        chatbotId: this.chatbotId,
        conversationId,
        cursorPosition
      }
    );
  }

  /**
   * Emit event to scroll visitor screen to given position
   *
   * @param conversationId
   * @param windowId
   * @param scrollPosition
   * @param actionId
   */
  emitScrollToPosition(conversationId, windowId, scrollPosition, actionId) {
    this.socket.emit(
      'scroll_to_position_on_visitor_screen',
      {
        customerId: this.customerId,
        chatbotId: this.chatbotId,
        conversationId,
        windowId,
        scrollPosition,
        actionId
      }
    )
  }

  /**
   * Emit event to click on visitor screen at given position
   *
   * @param conversationId
   * @param windowId
   * @param clickPosition
   * @param actionId
   */
  emitClickToPosition(conversationId, windowId, clickPosition, actionId) {
    this.socket.emit(
      'click_to_position_on_visitor_screen',
      {
        customerId: this.customerId,
        chatbotId: this.chatbotId,
        conversationId,
        windowId,
        clickPosition,
        actionId
      }
    )
  }
}