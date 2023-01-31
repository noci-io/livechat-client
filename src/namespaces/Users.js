import Routes from '../Routes'

export default class Users {
  client = null;

  constructor(client) {
    this.client = client;
  }

  /**
   * Returns a specific user
   *
   * @param userId
   * @return {Promise<*>}
   */
  async get(userId) {
    const ret = await this.client.api.get(
      Routes.users.get(userId),
      {
        customerId: this.client.customerId,
        chatbotId: this.client.chatbotId
      }
    );
    return ret.data;
  }

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
  async create(name, email, type, languages, photo = '', maxConversationQty = -1, universes = []) {
    const ret = await this.client.api.post(
      Routes.users.create,
      {
        chatbotId: this.client.chatbotId,
        customerId: this.client.customerId,
        id: this.client.userId,
        name,
        email,
        type,
        photo,
        languages,
        maxConversationQty,
        universes
      }
    )
    return ret.data;
  }

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
  async update(name, email, type, languages, photo = '', maxConversationQty = -1, universes = []) {
    console.log(universes)
    const ret = await this.client.api.put(
      Routes.users.update(this.client.userId),
      {
        chatbotId: this.client.chatbotId,
        customerId: this.client.customerId,
        name,
        email,
        type,
        languages,
        universes,
        photo,
        maxConversationQty
      }
    )
    console.log(ret)
    return ret.data;
  }

  /**
   * Ban visitor to forbid him to create a new conversation
   *
   * @param userId
   * @param conversationId
   * @param by
   * @param reason
   * @return {Promise<T>}
   */
  async ban(userId, conversationId, by, reason) {
    const ret = await this.client.api.put(
      Routes.users.ban(userId),
      {
        chatbotId: this.client.chatbotId,
        customerId: this.client.customerId,
        conversationId,
        by,
        reason
      }
    )
    return ret.data;
  }

  /**
   * Some events aren't always send to socket because they are too big, like visitor_screen_sharing
   * This method enable agent to start being sent given event
   *
   * @param eventName
   * @return {Promise<T>}
   */
  async askToReceiveEvent(eventName) {
    const ret = await this.client.api.put(
      Routes.users.askToReceiveEvent(this.client.userId, this.client.socket.id),
      {
        chatbotId: this.client.chatbotId,
        eventName
      }
    )
    return ret.data;
  }

  /**
   * Ask server to stop sending given event
   *
   * @param eventName
   * @return {Promise<T>}
   */
  async stopReceivingEvent(eventName) {
    const ret = await this.client.api.put(
      Routes.users.stopReceivingEvent(this.client.userId, this.client.socket.id),
      {
        chatbotId: this.client.chatbotId,
        eventName
      }
    )
    return ret.data;
  }

  /**
   * Ask to start being sent screen sharing event
   *
   * @return {Promise<T>}
   */
  async askToReceiveScreenSharing() {
    return await this.askToReceiveEvent('visitor_screen_sharing');
  }

  /**
   * Stop receiving screen sharing
   *
   * @return {Promise<*>}
   */
  async stopReceivingScreenSharing() {
    return await this.stopReceivingEvent('visitor_screen_sharing');
  }
}