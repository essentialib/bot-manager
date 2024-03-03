```js
const { StructuredCommand, NaturalCommand, CommandRegistry } = require('bot-manager/Command');
```

명령어 관련 모듈은 `bot-manager` 하위 폴더인 `bot-manager/Command`에서 가져온다.

- `StructuredCommand`는 구조화된 명령어를 사용할 때 사용하는 클래스이다.
- `NaturalCommand`는 자연어 명령어를 사용할 때 사용하는 클래스이다.
- `CommandRegistry`는 명령어를 등록하고 관리하는 클래스이다.

본 글은 `CommandRegistry`에 대한 설명을 하지 않는다. 궁금하면 [타입 파일](../src/Command/index.d.ts)과 [예시 코드](../src/Command/test/index.js)를
확인.

---

## Command

`Command`는 추상 클래스로, `StructuredCommand`와 `NaturalCommand`의 부모 클래스이다.

모든 `Command`(의 자식 클래스) 인스턴스들은 다음과 같은 여러 속성과 메서드를 상속받는다.

<details>
<summary>속성</summary>

필수 속성은 다음과 같다.

- `name`: 명령어의 이름. 겹칠 수 없다.
- `description`: 명령어에 대한 설명.
- `execute`: 명령어가 실행될 때 실행되는 콜백 함수.  
  `(self: StructuredCommand, chat: Chat, channel: Channel, args: any[]) => void` 형식이다.
    - `self`: `StructuredCommand` 인스턴스 자신.
    - `chat`: 메시지를 보낸 사람의 정보와 메시지 내용을 담고 있는 `Chat` 인스턴스.
    - `channel`: 메시지를 받은 채널의 정보를 담고 있는 `Channel` 인스턴스.
    - `args`: 명령어의 인자들. `usage`에 작성한 타입에 따라 달라진다.

또한, 선택 속성은 다음과 같다.

- `examples`: 명령어의 사용 예시. 여러 개를 작성할 수 있다.
- `channels`: 명령어를 사용할 수 있는 채널. 여러 개를 작성할 수 있다. 생략하면 모든 채널에서 사용할 수 있다.
- `cronjob`: 명령어를 주기적으로 실행할 수 있는 cronjob. 생략하면 주기적으로 실행되지 않는다. 뒤에서 자세히 다룬다.

</details>

<details>
<summary>메서드</summary>

- `manual()`: 명령어의 도움말을 자동으로 생성한다. 명령어의 `name`, `description`, `examples`, `channels`, `cronjob`에 대한 정보를 출력한다.
  또한, `StructuredCommand`의 경우 `usage`, `NaturalCommand`의 경우 `query`의 정보도 출력한다.

</details>

### cronjob

`cronjob`은 명령어를 주기적으로 실행할 수 있는 기능이다. 이에
대해서는 [한글](https://ko.wikipedia.org/wiki/Cron), [영문](https://en.wikipedia.org/wiki/Cron)을 참고한다.  
[crontab 직접 사용해보기](https://crontab.guru/)에서 직접 사용해보며 쉽게 이해할 수 있다.

`cronjob`은 다음과 같이 사용한다.

```js
...
.
setCronjob({
	'아침': '30 7 0 * * *',
	'점심': '0 12 0 * * *',
}, (self, tag) => {
	// 주기적으로 실행될 때 실행되는 콜백 함수
})
```

`cronjob`은 `Builder` 클래스의 `setCronjob` 메서드를 통해 설정할 수 있다.

- 첫 번째 인자는 `cron` 설정이다. `cron` 설정은 `cron` 표현식을 값으로 가진다. 키는 `cron` 표현식을 설명하는 문자열이다. `cron` 표현식은 주기적으로 실행될 시간을 설정하는 문자열이다.
- 두 번째 인자는 주기적으로 실행될 때 실행되는 콜백 함수이다.  
  `(self: StructuredCommand, tag: string) => void` 형식이다.
    - `self`: `StructuredCommand` 인스턴스 자신.
    - `tag`: `cron` 설정의 키. `cron` 설정의 키가 전달된다.

#### examples

```js
...
.
setCronjob({
	'아침': '30 7 0 * * *',
	'점심': '0 12 0 * * *',
}, (self, tag) => {
	if (tag === '아침') {
		// 아침에 실행될 코드
	}
	else if (tag === '점심') {
		// 점심에 실행될 코드
	}
})
	.build();
```

```js
...
.
setCronjob({
	'매일': '0 0 0 * * *',
}, (self, tag) => {
	// 매일 실행될 코드
})
	.build();
```

### execute

`execute` 콜백 함수는 명령어가 실행될 때 실행되는 함수이다. 그러나, 명령어가 예를 들어 공지 명령어 같이 쓸 내용이 많을 경우에는 명령어 호출을 하고 그 다음 메시지의 내용도 같이 처리해주면 편할 것이다.
이를 위해, `setExecute` 메서드의 두 번째 인자로 `executeLazy` 콜백 함수를 전달하면 된다. `executeLazy` 콜백 함수는 명령어 호출 후 같은 사람이 같은 채팅방에서 다시 문자를 보낼
때 실행된다.

`executeLazy` 콜백 함수는 다음과 같이 사용한다.

```js
...
.
setExecute((self, chat, channel, args) => {
	// 명령어 실행 코드
}, (self, chat, prevChat, channel, prevChannel, args) => {
	// 명령어 호출 후 한 번 더 메시지의 내용을 처리하는 코드
})
```

`executeLazy` 콜백 함수는 `setExecute` 메서드의 두 번째 인자로 전달한다.

- `self`: `StructuredCommand` 인스턴스 자신.
- `chat`: 메시지를 보낸 사람의 정보와 메시지 내용을 담고 있는 `Chat` 인스턴스.
- `prevChat`: `setExecute` 메서드의 첫 번째 인자 `execute` 콜백 함수의 `chat` 인자와 같다.
- `channel`: 메시지를 받은 채널의 정보를 담고 있는 `Channel` 인스턴스.
- `prevChannel`: `setExecute` 메서드의 첫 번째 인자 `execute` 콜백 함수의 `channel` 인자와 같다.
- `args`: 명령어의 인자들.

---

## StructuredCommand

`StructuredCommand`는 구조화된 명령어를 사용할 때 사용하는 클래스이다.  
구조화된 명령어란 흔히 `!명령어 인자1 인자2 ...`와 같이 명령어의 이름과 인자들의 자리가 고정되어 있는 명령어를 말한다.

`StructuredCommand`는 다음과 같이 사용한다.

```js
const { StructuredCommand } = require('bot-manager/Command');

let channel1 = BotManager.getChannelById('채널ID');
let channel2 = BotManager.getChannelById('채널ID2');

let cmd = StructuredCommand.Builder()
	.setName('명령어')
	.setDescription('명령어에 대한 설명')
	.setUsage('명령어 <인자1:int> <인자2:str>')
	.setExamples('명령어 1 test', '명령어 2 test2')
	.setChannels(channel, channel2)
	.setExecute((self, chat, channel, args) => {
		// 명령어 실행 코드
	})
	.build();
```

`StructuredCommand`는 `StructuredCommand.Builder` 클래스를 통해 생성하며, 마지막에 `build` 메서드를 호출하여 `StructuredCommand` 인스턴스를 생성한다.

`StructuredCommand`는 `Command`로부터 상속받은 속성들과 특이 속성인 `usage`라는 필수 속성을 가진다.  
전부 `StructuredCommand.Builder` 클래스의 메서드에서는 `set`으로 시작하는 메서드를 사용하여 속성을 설정할 수 있다.

### usage

간단하게는 `명령어 <인자1:타입> <인자2:타입> ...`와 같이 작성한다.  
`StructuredCommand.Builder` 에서는 `setUsage(usage: string): StructuredCommand.Builder`으로 사용한다.

`<인자명:타입 설정>`은 다음과 같이 작성한다.

- `인자명`: 인자의 이름. 명령어 실행 시 인자의 이름으로 사용된다.
- `타입`: 인자의 타입. `int`, `str`, `date`가 있다. 타입에 따라 `execute` 함수에서 받는 인자의 타입이 달라진다. 특히, `date`의
  경우 [DateTime](https://github.com/essentialib/datetime)의 parse 기능을 사용한다. `타입[]`, `타입?`과 같이 작성하여 배열이나 선택적으로 받을 수 있다.
    - `타입[]`: 여러 개의 인자를 받을 수 있다. 이 경우, `execute` 콜백 함수의 `args` 인자에서 배열의 형태로 전달된다. 예시를 들어, `<인자명:int[]>`와 같이 사용할 수 있다.
    - `타입?`: 선택적으로 받을 수 있다. 이 경우, `execute` 콜백 함수의 `args` 인자에서 `null`이 될 수 있다. 예시를 들어, `<인자명:str?>`와 같이 사용할 수 있다.
- `설정`: 인자의 설정. 생략할 수 있다.
    - `int`: 최소값(`min`)과 최대값(`max`)을 설정할 수 있다. 예시를 들어, `<수:int min=1 max=10>` 와 같이 사용할 수 있다.
    - `str`: 최소 길이(`minLength`), 최대 길이(`maxLength`), 또는 길이를 특정할 수 있다(`length`). 예시를 들어, `<문자열:str length=4>`와 같이
      사용할 수 있다.
    - `date`: 아직 설정할 수 있는 것이 없다.

> [!CAUTION]  
> `<인자명 : 타입>`, `<인자명: 타입>` 처럼 띄어서 쓰면 안됨. 무조건 `<인자명:타입>

#### examples

```js
...
.
setUsage("기수방 <기수:int min=38>")
	.setExecute((self, chat, channel, args) => {
		// 만약 chat.text = "기수 40"
		// args = { 기수: 38 }
	})
```

```js
...
.
setUsage("합계 <numbers:int[]>")
	.setExecute((self, chat, channel, args) => {
		// 만약 chat.text = "합계 1 2 3 4 5"
		// args = { numbers: [1, 2, 3, 4, 5] }
	})
```

```js
...
.
setUsage("이름 <name:str length=3>")
	.setExecute((self, chat, channel, args) => {
		// 만약 chat.text = "이름 abc"
		// args = { name: "abc" }
	})
```

```js
...
.
setUsage("합계 <number1:int> <number2:int?>")
	.setExecute((self, chat, channel, args) => {
		// 만약 chat.text = "합계 1"
		// args = { number1: 1, number2: null }
	})
```

```js
...
.
setUsage("생일 <날짜:date>")
	.setExecute((self, chat, channel, args) => {
		// 만약 chat.text = "생일 2021-01-01"
		// args = { 날짜: DateTime.parse("2021-01-01") }
	})
```

---

## NaturalCommand

`NaturalCommand`는 자연어 명령어를 사용할 때 사용하는 클래스이다.  
자연어 명령어, 즉 인자의 타입과 자리가 고정되어 있지 않고, 사용자가 자유롭게 명령어를 사용할 수 있는 명령어를 말한다. 사용자에게는 훨씬 자유로우나 섬세한 명령어를 구현하기는 힘들다.

자연어 명령어는 우선, `bot-manager/Command` 폴더 내부의 `dict.json`을 단어 사전으로 사용한다. 이 단어 사전은 명령어를 인식할 때 사용된다.

```json
{
  "token": [
    "string1",
    "string2",
    "string3",
    ...
  ],
  "token2": [
    "string4",
    "string5",
    "string6",
    ...
  ],
  ...
}
```

위와 같은 형태로 `dict.json`을 작성한다. 각 토큰의 값들은 배열로 작성한다. 이 배열에 있는 값들은 모두 같은 토큰으로 인식된다.
즉, `"meal": ["밥", "식사", "점심", "저녁"]`이라면, 메시지 속의 `"밥"`, `"식사"`, `"점심"`, `"저녁"`은 모두 `"meal"`로 인식된다.  
자연어 명령어는 구체적으로 인자의 자리와 값을 특정할 수 없기에, 순서를 고려하지 않고 단어 사전을 통해 비슷한 의미를 가진 단어들을 토큰으로 모두 같게 치환한 뒤, `query`라는 속성에서 메시지에 적어도 어떤
토큰이 존재해야 함을 조건적으로 명시하는 간접적인 방식으로 명령어를 구현한다.

`NaturalCommand`는 다음과 같이 사용한다.

```js
const { NaturalCommand } = require('bot-manager/Command');

let channel1 = BotManager.getChannelById('채널ID');
let channel2 = BotManager.getChannelById('채널ID2');

let cmd = NaturalCommand.Builder()
	.setName('명령어')
	.setDescription('명령어에 대한 설명')
	.setUseDateParse(false)
	.setQuery({
		token1: 기본값1,
		token2: 기본값2,
		...
	})
	.setExecute((self, chat, channel, args) => {
		// 명령어 실행 코드
	})
	.build();
```

`NaturalCommand`는 `NaturalCommand.Builder` 클래스를 통해 생성하며, 마지막에 `build` 메서드를 호출하여 `NaturalCommand` 인스턴스를 생성한다.

`NaturalCommand`는 `Command`로부터 상속받은 속성들과 특이 속성인 `useDateParse`, `query`라는 필수 속성을 가진다.  
전부 `NaturalCommand.Builder` 클래스의 메서드에서는 `set`으로 시작하는 메서드를 사용하여 속성을 설정할 수 있다.

`NaturalCommand`는 `query`에 있는 모든 항목이 `null`(또는 `undefined`)이 아닐 경우 호출될 수 있다.

### query

`{ [token: string]: null | string | (() => string) }` 타입으로 작성한다. 키는 요구하는 토큰의 이름(`dict.json`에 있는 토큰들 중 하나)을 의미하고, 값은
기본값이다.    
`NaturalCommand.Builder`
에서는 `setQuery(query: { [token: string]: null | string | (() => string) }): NaturalCommand.Builder` 이다.

값의 타입에 따라 의미하는 것이 다르다.

- `null`: 기본값이 없다. 즉, 필수로 포함되어야할 토큰을 의미한다.
- `string`: 메시지에서 해당 토큰이 존재하면 바뀌나, 토큰이 존재하지 않았더라도 기본값으로 그대로 유지된다. 즉, 선택적 토큰이다.
- `() => string`: `string`의 경우와 비슷하나, 함수로 기본값을 정의한 경우 `execute` 함수가 호출될 때 기본값도 호출된다. 날짜 클래스 같이 호출 시간이 중요한 경우를 고려해 만들어졌다.

명령어가 조건을 모두 만족하여 호출될 경우, `execute` 함수의 네 번째 인자인 `args`가 `query`가 된다.
`StructuredCommand`에서는 `usage`로부터 얻어지는 `args`에서는 각 인자에 대한 값이 중요했지만, `NaturalCommand`에서의 `query`로부터 얻어지는 `args`에서는 메시지에
이러한 토큰이 있어야함을 명시한 수준이지, 값이 중요하지는 않다.

#### examples

```js
...
.
setQuery({
	meal: null
})  // 'meal' 토큰을 의미하는 문자열들(ex. '급식', '밥', '끼니' 등)이 필수적으로 텍스트에 포함되어야 한다.
	.setExecute((self, chat, channel, args) => {
		// 만약 chat.text = '밥 뭐 나와'
		// args = { meal: '밥' }
	})
```

```js
...
.
setQuery({
	meal: '밥'
})  // 'meal' 토큰을 의미하는 문자열들(ex. '급식', '밥', '끼니' 등)이 텍스트에 포함되지 않아도 '밥'으로 기본값이 정해져 있다.
	.setExecute((self, chat, channel, args) => {
		// 만약 chat.text = '뭐 나와'
		// args = { meal: '밥' }
	})
```

```js
...
.
setQuery({
	meal: () => {
		let date = new Date();
		if (date.getHours() < 12)
			return '오전';
		else
			return '오후';
	}
})  // 'meal' 토큰을 의미하는 문자열들(ex. '급식', '밥', '끼니' 등)이 텍스트에 포함되지 않아도 '밥'으로 기본값이 정해져 있다.
	.setExecute((self, chat, channel, args) => {
		// 만약 chat.text = '뭐 나와' 그리고 시간이 12시 이전일 경우
		// args = { meal: '오전' }
	})
```

### useDateParse

[DateTime](https://github.com/essentialib/datetime)의 `parseWithFilteredString` 함수를 사용할지 여부를 의미한다.  
`NaturalCommand.Builder`에서는 `setUseDateParse(useDateParse: boolean): NaturalCommand.Builder` 이다.

`useDateParse`의 기본값은 `false`이며, `true`일 경우

- `chat.text`가 `parseWithFilteredString` 함수에 의해 날짜 문자열로 인식되는 부분이 모두 잘린 문자열로 대체된다.
- 원본 문자열은 `chat.rawText`로 확인할 수 있다.
- `query`에 `datetime` 키가 추가되며, 자동으로 parse된 `DateTime` 인스턴스가 들어간다.

#### examples

```js
...
.
setQuery({})   // 아무 조건도 명시하지 않아 이 명령어는 항상 만족됨
	.setUseDateParse(true)  // 텍스트에서 날짜와 시간을 알아서 추출함
	.setExecute((self, chat, channel, args) => {
		// 만약 메시지가 '내일 아침 병원 가기' 였다면,
		// chat.text = '병원 가기'
		// chat.rawText = '내일 아침 병원 가기'
		// args = { datetime: DateTime.parse('내일 아침') }
	})
```

---

## 명령어 등록

`bot.addCommand(command: Command)` 함수를 사용한다.

예시 코드는 다음과 같다.

```js
const BotManager = require('bot-manager').get(BotManager);
const bot = BotManager.getCurrentBot();

const { StructuredCommand, NaturalCommand } = require('bot-manager/Command');

bot.addCommand(new StructuredCommand.Builder()
	.setName('add')
	.setDescription('add command')
	.setUsage('add <num1:int> <num2:int>')
	.setExamples('add 7 8')
	.setExecute((self, chat, channel, { num1, num2 }) => {
		Log.info(`${num1} + ${num2} = ${num1 + num2}`);
	})
	.build()
);
```

> [!CAUTION]  
> `Builder` 클래스의 인스턴스에서 마지막에 꼭 `.build()`를 해야 `Command`의 인스턴스가 됨에 주의.

---

## Event.COMMAND

[basic.md](basic.md)에서 `Event`를 설명했으나, `Event.COMMAND`에 대해 설명하지는 않았다.

```js
bot.on(Event.COMMAND, (chat, channel, command, args) => {
	channel.send(`명령어: ${command.name}, 인자: ${args.join(", ")}`);
});
```

콜백 함수의 인자들은 다음과 같다.

| 인자        | 타입                     | 설명                                  |
|-----------|------------------------|-------------------------------------|
| `chat`    | `Chat`                 | 수신 받은 메시지와 그에 대한 정보                 |
| `channel` | `Channel`              | 수신 받은 메시지가 온 채널(방)과 그에 대한 정보        |
| `command` | `Command`              | 레지스트리에 등록된 모든 명령어 중 조건을 만족한 명령어     |
| `args`    | `Args \| ArgsWithDate` | 세 번째 인자 `command`의 조건에 부합해서 추출된 인자들 |

`Event.MESSAGE`, `Event.COMMAND`, `Command#execute()` 를 모두 사용할 때, 실행 순서는 다음과 같다.

1. `Event.MESSAGE`: 메시지를 수신 받으면 바로 실행된다.
2. `Event.COMMAND`: 조건에 만족하는 명령어를 얻으면 바로 실행된다. `Command#execute()`의 호출 전에 먼저 실행된다.
3. `Command#execute()`: 마지막에 실행된다.

> [!NOTE]  
> `bot.on` 이벤트 리스너를 의무적으로 등록하지 않아도 `bot.addCommand`를 통해 추가된 명령어들은 잘 작동함.

---

## 예시 코드

```js
const BotManager = require('bot-manager').get(BotManager);
const bot = BotManager.getCurrentBot();

const { StructuredCommand, NaturalCommand } = require('bot-manager/Command');
const { Event } = require('bot-manager/Event');

const 기수39 = BotManager.getChannelById(/* 채널 ID */); 

bot.addCommand(new NaturalCommand.Builder()
	.setName('급식 명령어')
	.setDescription('입력한 시간에 맞춰 다음 급식을 전송합니다. 시간을 생략하면 메시지를 전송한 당시로 설정됩니다.' +
		'\n또한, 매일 자정 그 날의 모든 급식을 알려주고, 오전 11시 40분에는 점심, 오후 4시 20분에 저녁 급식을 정기적으로 전송합니다.')
	.setCronJobs({
		'오늘': '0 0 * * *',
		'점심': '40 11 * * *',
		'저녁': '20 16 * * *'
	}, (self, tag) => {
		if (tag === '오늘')
			;   // 오늘 급식을 알려주는 명령어
		else if (tag === '점심')
			;   // 오늘 점심 급식을 알려주는 명령어
		else if (tag === '저녁')
			;   // 오늘 저녁 급식을 알려주는 명령어
	})
	.setExamples('오늘 밥', '오늘 급식', '다음 주 급식', '급식 저녁', '...등 자유로운 형태')
	.setQuery({ 'meal': null })
    .setUseDateParse(true)
    .setChannels(기수39)
	.setExecute((self, chat, channel, { meal, datetime }) => {
		channel.send(`${datetime.month}월 ${datetime.day}일 급식: ${/* 급식 */}`);
	})
);

bot.addCommand(new StructuredCommand.Builder()
    .setName('더하기')
    .setDescription('입력한 인자들을 더하는 명령어입니다')
    .setUsage('add <numbers:int[]?>')
    .setExecute((self, chat, channel, { numbers }) => {
		channel.send('합: ' + numbers.reduce((acc, cur) => acc + cur, 0));
    })
);

bot.on(Event.MESSAGE, (chat, channel) => {
    if (chat.user.name !== '관리자')
		return;
});
```