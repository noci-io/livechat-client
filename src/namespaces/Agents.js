import Routes from '../Routes'

export default class Agents {
  client = null;

  constructor(client) {
    this.client = client;
  }

  /**
   * Returns a list of agents
   *
   * @return {Promise<*>}
   */
  async list() {
    const ret = await this.client.api.get(
      Routes.agents.list,
      {
        customerId: this.client.customerId,
        chatbotId: this.client.chatbotId,
        languages: this.client.userLanguages ?? this.client.languages,
        universes: this.client.userUniverses
      }
    );
    return ret.data;
  }

  /**
   * Returns a list of available agents
   *
   * @return {Promise<*>}
   */
  async availableAgents(all = false) {
    const ret = await this.client.api.get(
      Routes.agents.list,
      {
        available: 1,
        customerId: this.client.customerId,
        chatbotId: this.client.chatbotId,
        languages: all ? undefined : (this.client.userLanguages ?? this.client.languages),
        universes: all ? undefined : this.client.userUniverses
      }
    );
    return ret.data;
  }

  /**
   * Returns the quantity of agents
   *
   * @return {any}
   */
  async count() {
    const ret = await this.client.api.get(
      Routes.agents.count,
      {
        customerId: this.client.customerId,
        chatbotId: this.client.chatbotId,
        languages: this.client.userLanguages ?? this.client.languages,
        universes: this.client.userUniverses
      }
    );
    return ret.data.count;
  }

  /**
   * Returns the quantity of available agents
   *
   * @return {any}
   */
  async countAvailableAgents() {
    const ret = await this.client.api.get(
      Routes.agents.count,
      {
        available: 1,
        customerId: this.client.customerId,
        chatbotId: this.client.chatbotId,
        languages: this.client.userLanguages ?? this.client.languages,
        universes: this.client.userUniverses
      }
    );
    return ret.data.count;
  }

  /**
   * Returns the current user status
   *
   * @return {any}
   */
  async status() {
    const ret = await this.client.api.get(
      Routes.agents.status(this.client.userId),
      { chatbotId: this.client.chatbotId }
    );
    return ret.data.status;
  }

  /**
   * Set the current user status
   *
   * @param isOnline
   * @return {Promise<{headers: *, code: *, data: *}|*|AxiosResponse<any>|void>}
   */
  async setOnlineStatus(isOnline) {
    const ret = await this.client.api.put(
      Routes.agents.status(this.client.userId),
      { chatbotId: this.client.chatbotId, loggedIn: isOnline }
    );
    return ret;
  }

  /**
   * Returns the current user languages
   *
   * @return {any}
   */
  async languages() {
    const ret = await this.client.api.get(
      Routes.agents.languages(this.client.userId),
      {
        customerId: this.client.customerId,
        chatbotId: this.client.chatbotId
      }
    );
    return ret.data.languages;
  }

  /**
   * Returns the current user languages
   *
   * @return {any}
   */
  async universes() {
    const ret = await this.client.api.get(
      Routes.agents.universes(this.client.userId),
      {
        customerId: this.client.customerId,
        chatbotId: this.client.chatbotId
      }
    );
    return ret.data.universes;
  }
}