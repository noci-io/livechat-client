import io from 'socket.io-client';
import msgpackParser from 'socket.io-msgpack-parser';
import Api from './Api';
import Conversations from './namespaces/Conversations';
import Agents from './namespaces/Agents';
import Users from './namespaces/Users';

export default class LivechatClient {
  static ROLE_VISITOR = 'visitor';
  static ROLE_MODERATOR = 'moderator';
  static ROLE_AGENT = 'agent';
  static ROLE_SYSTEM = 'system';

  socket = null;
  api = null;

  userId = null;
  userRole = null;
  userName = null;
  userEmail = null;
  userLanguages = null;
  userUniverses = null;
  userPhoto = null;
  userMaxConversationQty = null;

  online = null;

  customerId = null;
  chatbotId = null;
  conversationId = null;

  listeners = {};

  /**
   * Namespaces
   */
  conversations = null;
  agents = null;
  users = null;

  constructor(customerId, userId, chatbotId, baseUrl = null) {
    this.socket = io(baseUrl ?? process.env.LIVECHAT_SERVER_URL, {
      parser: msgpackParser,
      path: process.env.LIVECHAT_SERVER_SOCKET_PATH
    });

    this.api = new Api(true, 1000000000, 1000, baseUrl);
    this.customerId = customerId;
    this.userId = userId;
    this.chatbotId = chatbotId;

    /**
     * Init namespaces
     */
    this.conversations = new Conversations(this);
    this.agents = new Agents(this);
    this.users = new Users(this);
  }

  /**
   * Add event listener
   *
   * @param event
   * @param callback
   */
  on(event, callback) {
    if (this.listeners[event] === undefined) {
      this.listeners[event] = [];

      this.socket.on(event, (data) => {
        this.triggerEventListeners(event, data);
      });
    }

    this.listeners[event].push(callback);
  }

  /**
   * Trigger all callbacks of listener
   *
   * @param event
   * @param data
   */
  triggerEventListeners(event, data) {
    if (this.listeners[event] === undefined) {
      return;
    }

    for (let callback of this.listeners[event]) {
      callback(data, this);
    }
  }

  /**
   * Start sending heartbeat on socket
   */
  startHeartbeat() {
    this.sendHeartbeat();

    setInterval(() => {
      this.sendHeartbeat();
    }, process.env.LIVECHAT_HEARTBEAT_INTERVAL || 5000);
  }

  /**
   * Send heartbeat event
   */
  sendHeartbeat() {
    this.socket.emit(
      'heartbeat',
      {
        id: this.userId,
        customerId: this.customerId,
        chatbotId: this.chatbotId,
        online: this.online
      }
    );
  }

  /**
   * Returns true if given role is an agent one
   *
   * @param role
   * @return {boolean}
   */
  static isAgent(role) {
    return [
      LivechatClient.ROLE_MODERATOR,
      LivechatClient.ROLE_AGENT
    ].includes(role);
  }

  /**
   * Set user data
   *
   * @param name
   * @param email
   * @param role
   * @param languages
   * @param photo
   * @param maxConversationQty
   */
  setUserData(name, email, role, languages, photo = '', maxConversationQty = -1, universes = []) {
    this.userName = name;
    this.userEmail = email;
    this.userRole = role;
    this.userLanguages = languages;
    this.userUniverses = universes;
    this.userPhoto = photo;
    this.userMaxConversationQty = maxConversationQty;
  }

  /**
   * Update user and set new data
   *
   * @param name
   * @param email
   * @param role
   * @param languages
   * @param photo
   * @param maxConversationQty
   * @return {Promise<void>}
   */
  async updateUserData(name, email, role, languages, photo = '', maxConversationQty = -1, universes = []) {
    console.log(universes)
    const user = await this.users.update(
      name,
      email,
      role,
      languages,
      photo,
      maxConversationQty,
      universes
    );

    this.setUserData(
      user.name,
      user.email,
      user.type,
      user.languages,
      user.photo,
      user.maxConversationQty,
      user.universes
    );

    this.online = user.loggedIn;
  }

  /**
   * Fetch user if exist, else create a new one
   * Then start heartbeat
   *
   * @param name
   * @param email
   * @param role
   * @param languages
   * @param photo
   * @param maxConversationQty
   * @return {Promise<void>}
   */
  async build(name, email, role, languages, photo = '', maxConversationQty = -1, universes = []) {
    let user = await this.users.get(this.userId);

    if (!user) {
      user = await this.users.create(
        name,
        email,
        role,
        languages,
        photo,
        maxConversationQty,
        universes
      );
    } else {
      let differentLanguages = user.languages.length !== languages.length ||
        JSON.stringify(user.languages.sort()) !== JSON.stringify(languages);
      let differentUniverses = user.universes.length !== universes.length ||
        JSON.stringify(user.universes.sort()) !== JSON.stringify(universes);

      if (
        user.name !== name ||
        user.email !== email ||
        user.type !== role ||
        differentLanguages ||
        differentUniverses ||
        user.photo !== photo ||
        user.maxConversationQty !== maxConversationQty
      ) {
        user = await this.users.update(
          name,
          email,
          role,
          languages,
          photo,
          maxConversationQty,
          universes
        );
      }
    }

    this.setUserData(
      user.name,
      user.email,
      user.type,
      user.languages,
      user.photo,
      user.maxConversationQty,
      user.universes
    );

    return user;
  }
}