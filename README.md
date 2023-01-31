# Livechat client

Package to interact with livechat server

## Setup

Add to package.json :

```json
{
    "dependencies": {
        "livechat-client": "git+ssh://git@bitbucket.org/digital-ize/livechat-client.git"
    }
}
```

And then `npm i`.

### Create client (visitor)

```javascript
import { LivechatClient } from 'livechat-client'

// User ID contained in localStorage
const userId = 'f96ebfa7-4903-457a-82ae-e811d72dfa59'

// Create client
const livechatClient = new LivechatClient(
    customerId,
    userId,
    LivechatClient.ROLE_VISITOR,
    userName,
    userEmail,
    chatbotId
)
```

### Create client (agent)

```javascript
import { LivechatClient } from 'livechat-client'

// User ID contained in localStorage
const userId = 'f96ebfa7-4903-457a-82ae-e811d72dfa59'

// Create client
const livechatClient = new LivechatClient(
    customerId,
    userId,
    LivechatClient.ROLE_VISITOR,
    userName,
    userEmail,
    chatbotId
)

// Get online status and handle socket
await livechatClient.agentBuild()
```

## Conversations

### Create a new conversation

```javascript
import Messages from 'livechat-client/Messages'

let messages = []
messages.push(Messages.format('Hello, do you need some help ?', Messages.FROM_SYSTEM))
messages.push(Messages.format('Yes !', Messages.FROM_VISITOR))
// Add all the chatbot messages

// Create the conversation
const conversationId = await livechatClient.conversations.create(messages)
```

### Configure conversation ID

To configure the conversation ID for an existing conversation : 

```javascript
livechatClient.conversations.setId('e55f876a-405a-4b72-8ef9-0a0fb50ae020')
```

### Add message to conversation

```javascript
import Messages from 'livechat-client/Messages'

await livechatClient.conversations.addMessage('Hello, my name is Anna, how can I help you ?', Messages.FROM_AGENT)

// To force a conversation ID : 
await livechatClient.conversations.addMessage('Hello, my name is Anna, how can I help you ?', Messages.FROM_AGENT, conversationId)
```

### Get all messages in conversation

```javascript
await livechatClient.conversations.getMessages()

// To force a conversation ID : 
await livechatClient.conversations.getMessages(conversationId)
```

### Close a conversation

```javascript
await livechatClient.conversations.close()

// To force a conversation ID : 
await livechatClient.conversations.close(conversationId)
```

### Acknowledge messages in conversation

```javascript
const lastMessageId = '1606b5a0-d586-41f8-bf31-90e713e0844c';
await livechatClient.conversations.acknowledgeMessages(lastMessageId)

// To force a conversation ID : 
await livechatClient.conversations.acknowledgeMessages(lastMessageId, conversationId)
```

### Handle a conversation (as agent)

```javascript
const conversationId = '4aba6ede-9c05-4dfd-a20d-0641b0bb2d6b';
await livechatClient.conversations.handle(conversationId)
```

### Transfer conversation to another agent

```javascript
const newAgentId = '6864cba5-c9d8-4504-9dc8-2252afbdc23a';
await livechatClient.conversations.transfer(newAgentId)

// To force a conversation ID : 
await livechatClient.conversations.transfer(newAgentId, conversationId)
```

### List all active conversations

```javascript
await livechatClient.conversations.list()
```

### List all archived conversations

```javascript
await livechatClient.conversations.listArchived(page, limit) // defaults: page=1, limit=10
```

## Agents

### List all agents

```javascript
await livechatClient.agents.list()
```

### List all available agents

```javascript
await livechatClient.agents.availableAgents()
```

### Count agents

```javascript
await livechatClient.agents.count()
```

### Count available agents

```javascript
await livechatClient.agents.countAvailableAgents()
```

### Set agent status

```javascript
await livechatClient.agents.setOnlineStatus(true) // true if the agent is logged in, else false
```

## Events

```javascript
livechatClient.on('new_message', data => {
    console.log(data)
})
```