```js
const BotManager = require('bot-manager').get(BotManager);
const bot = BotManager.getCurrentBot();
```
모든 코드는 위와 같이 시작한다. 재선언된 BotManager는 기존의 API2에서 지원하는 BotManager를 대체한다.

또한, 봇이 작동하게 하기 위한 시작 코드도 필요하다.
```js
bot.start();
```
위치는 고려하지 않고 아무 데나 써도 된다.

---
## Event

`Event`는 `bot-manager` 모듈에서 사용하는 이벤트이다. 이벤트 리스너 함수를 등록하면, 해당 이벤트가 발생했을 때 등록된 함수가 실행된다.

```js
const Event = require('bot-manager/Event').Event;
```
혹은
```js
const { Event } = require('bot-manager/Event');
```
위와 같이 하위 폴더 `Event`를 가져와 사용한다.  

> [!CAUTION]  
> 첫 번째 방법의 경우 `require('bot-manager/Event')` 가 아니라 `require('bot-manager/Event').Event` 이다.

```js
bot.on(Event.MESSAGE, (chat, channel) => {
    channel.send('Hello, world!');
});
```
`Event`는 `bot.on` 메서드의 첫 번째 인자에 들어간다. 두 번째 인자는 첫 번째 인자인 이벤트에 따라 실행되는 콜백 함수이다. 이벤트에 따라 콜백 함수의 인자가 달라진다.  
주로, `chat`과 `channel`이라는 인자를 사용한다. `chat`은 메시지를 보낸 사람의 정보와 메시지 내용을 담고 있고, `channel`은 메시지를 받은 채널의 정보를 담고 있다.

```js
channel.send('Hello, world!')
    .then(() => Log.info('send success'))
    .catch(e => Log.error(e));
```
`channel.send` 메서드는 채널에 메시지를 보내는 메서드이다. 필수는 아니나, 이 메서드는 `Promise`를 반환하기에 위 코드와 같이 메시지 전송에 성공 여부를 확인할 수 있다.

`BotManager` 인스턴스의 `getCurrentBot` 메서드를 제외한 몇 안되는 기능 중에, `getChannelById` 메서드가 존재한다.  
각 채널들은 겹치지 않는 고유한 ID를 `channel.id` 값으로 가지게 되는데 이를 통해 특정 채널을 찾을 수 있다.
```js
const BotManager = require('bot-manager').get(BotManager);
const channel1 = BotManager.getChannelById('channelId1');
const channel2 = BotManager.getChannelById('channelId2');
```

나머지 `Chat`, `Channel` 메서드에 대한 정보는 [Chat](../src/DBManager/classes/chat/Chat.d.ts), [Channel](../src/DBManager/classes/channel/channel.d.ts)에서 확인할 수 있다.

### 이벤트 목록
| Event                 | Description     | Callback                                                                            |
|-----------------------|-----------------|-------------------------------------------------------------------------------------|
| `MESSAGE`             | 메시지를 받았을 때      | `(chat: Chat, channel: Channel) => void`                                            |
| `COMMAND`             | 명령어를 받았을 때      | `(chat: Chat, channel: Channel, command: Command, args: Args) => void`              |
| `JOIN`                | 오픈채팅에 들어왔을 때    | `(chat: OpenChatJoinedFeed, channel: Channel) => void`                              |
| `INVITE`              | 일반채팅에 초대 받았을 때  | `(chat: InviteFeed, channel: Channel) => void`                                      |
| `LEAVE`               | 일반채팅에서 나갔을 때    | `(chat: LeaveFeed, channel: Channel) => void`                                       |
| `KICK`                | 오픈채팅에서 강퇴 당했을 때 | `(chat: LeaveFeed \| OpenChatKickedFeed, channel: Channel) => void`                 |
| `DELETE`              | 메시지가 삭제되었을 때    | `(chat: DeleteFeed, channel: Channel) => void`                                      |
| `HIDE`                | 메시지가 가려졌을 때     | `(chat: Chat, channel: Channel) => void`                                            |
| `MEMBER_TYPE_CHANGE`  | 방장, 부방장이 바뀌었을 때 | `(chat: MemberTypeChangedFeed, channel: Channel) => void`                           |
| `OPEN_PROFILE_CHANGE` | 오픈프로필이 바뀌었을 때   | `(beforeUser: ChangeUserType, afterUser: ChangeUserType, channel: Channel) => void` |

각 인자의 타입에 대한 더 자세한 정보는 [여기](../src/Event/index.d.ts)에서 확인할 수 있다.

<details>
<summary>각 이벤트에 따른 리스너 예시</summary>

```js
bot.on(Event.MESSAGE, (chat, channel) => {
    channel.send('Hello, world!');
});
```

```js
bot.on(Event.COMMAND, (chat, channel, command, args) => {
    channel.send(`명령어: ${command.name}, 인자: ${args.join(", ")}`);
});
```
`COMMAND` 이벤트는 추후, `Command` 모듈을 설명할 때 더 자세히 설명한다. [여기](command.md/#eventcommand) 

```js
bot.on(Event.JOIN, (chat, channel) => {
    channel.send(`${chat.joinUsers[0].nickName}님이 들어왔습니다`);
});
```

```js
bot.on(Event.INVITE, (chat, channel) => {
    channel.send(`${chat.inviteUser.nickName}님이 ${chat.invitedUsers.map((e) => e.nickName).join(", ")}님을 초대했습니다`);
});
```

```js
bot.on(Event.LEAVE, (chat, channel) => {
    if (chat.isKicked())
        channel.send(`${chat.leaveUser.nickName}님이 강퇴당했습니다`);
    else
        channel.send(`${chat.leaveUser.nickName}님이 나갔습니다`);
});
```

```js
bot.on(Event.KICK, (chat, channel) => {
    channel.send(`${chat.kickedBy.name}님이 ${chat.kickedUser.nickName}님을 강퇴했습니다`);
});
```

```js
bot.on(Event.DELETE, (chat, channel) => {
    channel.send(`${chat.deletedChat.text} 메시지가 지워졌습니다`);
});
```

```js
bot.on(Event.HIDE, (chat, channel) => {
    channel.send(`${chat.user.name}님이 메시지를 가렸습니다`);
});
```

```js
bot.on(Event.MEMBER_TYPE_CHANGE, (chat, channel) => {
    if (chat.isDemote())
        channel.send(`${chat.demoteUser.nickName}님이 부방장에서 내려왔습니다`);
    else if (chat.isPromote())
        channel.send(`${chat.promoteUser.nickName}님이 부방장이 되었습니다`);
    else if (chat.isHandover())
        channel.send(`${chat.newHost.nickName}님이 새 방장이 되었습니다`);
});
```

```js
bot.on(Event.OPEN_PROFILE_CHANGE, (beforeUser, afterUser, channel) => {
    channel.send(`누군가 프로필이 바뀌었습니다\n${beforeUser.name}->${afterUser.name}`);
});
```

</details>

---
## 예시 코드

```js
// 이 코드는 ES6 이상의 문법을 활용하고 있어, 그대로 메신저봇R에서 실행하면 오류가 발생합니다.
// 이 코드를 꼭 npm run build/build-js 를 통해 ES5로 변환한 후에 실행해야 합니다.

const BotManager = require('../src').get(BotManager);
const bot = BotManager.getCurrentBot();

const Event = require('../src/Event').Event;

bot.on(Event.MESSAGE, (chat, channel) => {
	/**
	 * 메시지가 'ㅎㅇ'일 경우 '{메시지 보낸 사람의 이름} 안녕하세요'라고 답장합니다.
	 */
	if (chat.text === 'ㅎㅇ') {
		channel.send(`${chat.user.name}님 안녕하세요`);
	}
	
	/**
	 * 답장에 답장이 쭉 이어지는 경우, 답장인 메시지가 '/원본답장'일 경우, 해당 메시지의 원본 메시지를 답장합니다.
	 */
	if (chat.isReply() && chat.text === "/원본답장") {
		let tmpChat = chat.source;
		while (tmpChat.isReply()) {
			tmpChat = tmpChat.source;
		}
		
		channel.send(tmpChat.text);
	}
	
	/**
	 * 답장인 메시지가 '/다음챗'일 경우, 그 답장의 원본 메시지의 다음 챗을 답장합니다.
	 */
	if (chat.isReply() && chat.text === '/다음챗') {
		channel.send(chat.source.getNextChat().text);
	}
	
	/**
	 * 답장인 메시지가 '/이전챗'일 경우, 그 답장의 원본 메시지의 이전 챗을 답장합니다.
	 */
	if (chat.isReply() && chat.text === '/이전챗') {
		channel.send(chat.source.getPrevChat().text);
	}
	
	/**
	 * 비디오 파일을 받았을 경우, 파일의 용량을 답장합니다.
	 */
	if (chat.isVideo()) {
		channel.send(`비디오 파일을 받았습니다. 용량: ${chat.video.s}`);
	}
	
	/**
	 * 지도 메시지를 받았을 경우, 해당 메시지가 가리키는 위치의 위도와 경도를 답장합니다.
	 */
	if (chat.isMap()) {
		channel.send(`위도: ${chat.map.lat}, 경도: ${chat.map.lng}`);
	}
	
	/**
	 * 이외에도 chat.attachment 에는 샵검색, 투표 메시지, 공지 메시지 등 다양한 포맷의 메시지의 정보가 담겨있습니다.
	 */
});
```
