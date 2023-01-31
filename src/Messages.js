import { v4 as uuidv4 } from 'uuid';

export default class Messages {
  static FROM_SYSTEM = 'system';
  static FROM_VISITOR = 'visitor';
  static FROM_AGENT = 'agent';

  /**
   * Create a message object from content and user role
   *
   * @param messageContent
   * @param from
   * @return {{from: string, id: *, message: *}}
   */
  static format(messageContent, from = null) {
    return {
      id: uuidv4(),
      message: messageContent,
      from: from || Messages.FROM_SYSTEM
    }
  }
}