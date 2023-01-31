import LivechatClient from './LivechatClient';
import Api from './Api';
import Routes from './Routes';

export default class LivechatClientVisitor extends LivechatClient {
  sessionId = null;

  constructor(customerId, userId, chatbotId, sessionId, baseUrl) {
    super(customerId, userId, chatbotId, baseUrl);

    this.sessionId = sessionId;
  }

  /**
   * Build visitor
   *
   * @param name
   * @param email
   * @param languages
   * @return {Promise<void>}
   */
  async buildVisitor(name, email, languages, universes = []) {
    await this.build(name, email, LivechatClient.ROLE_VISITOR, languages, universes);

    this.online = true;
    this.startHeartbeat();
    this.emitPageview();
  }

  /**
   * Returns true if some agents are available
   * 
   * @param customerId
   * @param chatbotId
   * @param userId
   * @param languages
   * @return {Promise<boolean>}
   */
  static async areSomeAgentsAvailable(customerId, chatbotId, userId, languages = null, universes = null) {
    const api = new Api(false);
    const ret = await api.get(
      Routes.agents.count,
      {
        available: 1,
        customerId,
        chatbotId,
        userId,
        languages,
        universes
      }
    );
    return ret.data.count > 0;
  }

  /**
   * Emit current pageview to be added on agent dashboard
   */
  emitPageview() {
    const pageview = {
      url_protocol: window.location.protocol.replace(/:/g, ''),
      url_domain: window.location.host,
      url_path: window.location.pathname,
      url_query: window.location.search.substr(1),
      date: { value: +new Date() },
      sessionId: this.sessionId
    };

    this.socket.emit('pageview', {
      id: this.userId,
      chatbotId: this.chatbotId,
      pageview
    });
  }

  /**
   * Emit visitor input value to agents
   *
   * @param conversationId
   * @param content
   */
  emitTyping(conversationId, content) {
    this.socket.emit(
      'typing',
      {
        id: this.userId,
        customerId: this.customerId,
        chatbotId: this.chatbotId,
        conversationId: conversationId,
        content
      }
    );
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
  emitScreen(conversationId, windowId, screenshot, mousePosition, scrollPosition, actionId) {
    this.socket.emit(
      'screen',
      {
        id: this.userId,
        customerId: this.customerId,
        chatbotId: this.chatbotId,
        conversationId,
        windowId,
        screenshot,
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight,
        mousePosition,
        scrollPosition,
        actionId
      }
    );
  }
}