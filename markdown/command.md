```js
const { StructuredCommand, NaturalCommand, CommandRegistry } = require('bot-manager/Command');
```
명령어 관련 모듈은 `bot-manager` 하위 폴더인 `bot-manager/Command`에서 가져온다.
 - `StructuredCommand`는 구조화된 명령어를 사용할 때 사용하는 클래스이다.
 - `NaturalCommand`는 자연어 명령어를 사용할 때 사용하는 클래스이다.
 - `CommandRegistry`는 명령어를 등록하고 관리하는 클래스이다.

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
    .setUsage('명령어 <인자1:int> <인자2:string>')
    .setExamples('명령어 1 test', '명령어 2 test2')
    .setChannels(channel, channel2)
    .setExecute((self, chat, channel, args) => {
        // 명령어 실행 코드
    })
    .build();
```

`StructuredCommand`는 `Builder` 클래스를 통해 생성하며, 마지막에 `build` 메서드를 호출하여 `StructuredCommand` 인스턴스를 생성한다.

`StructuredCommand`는 여러 속성을 가진다. 그 중 필수 속성은 다음과 같다.
 - `name`: 명령어의 이름. 겹칠 수 없다.
 - `description`: 명령어에 대한 설명.
 - `usage`: 명령어의 사용법. `<인자명:타입>` 형식으로 작성한다. 더 자세하게는 뒤에서 다룬다.
 - `execute`: 명령어가 실행될 때 실행되는 콜백 함수. `(self: StructuredCommand, chat: Chat, channel: Channel, args: any[]) => void` 형식이다.  
    - `self`: `StructuredCommand` 인스턴스 자신.
    - `chat`: 메시지를 보낸 사람의 정보와 메시지 내용을 담고 있는 `Chat` 인스턴스.
    - `channel`: 메시지를 받은 채널의 정보를 담고 있는 `Channel` 인스턴스.
    - `args`: 명령어의 인자들. `usage`에 작성한 타입에 따라 달라진다.

또한, 선택 속성은 다음과 같다.
 - `examples`: 명령어의 사용 예시. 여러 개를 작성할 수 있다.
 - `channels`: 명령어를 사용할 수 있는 채널. 여러 개를 작성할 수 있다. 생략하면 모든 채널에서 사용할 수 있다.
 - `cronjob`: 명령어를 주기적으로 실행할 수 있는 cronjob. 생략하면 주기적으로 실행되지 않는다. 뒤에서 자세히 다룬다.

전부 `Builder` 클래스의 메서드에서는 `set`으로 시작하는 메서드를 사용하여 속성을 설정할 수 있다.

### StructuredCommand의 `usage`
간단하게는 `명령어 <인자1:타입> <인자2:타입> ...`와 같이 작성한다.  

`<인자명:타입 설정>`은 다음과 같이 작성한다.
 - `인자명`: 인자의 이름. 명령어 실행 시 인자의 이름으로 사용된다.
 - `타입`: 인자의 타입. `int`, `string`, `date`가 있다. 타입에 따라 `execute` 함수에서 받는 인자의 타입이 달라진다. 특히, `date`의 경우 [DateTime](https://github.com/essentialib/datetime)의 parse 기능을 사용한다. `타입[]`, `타입?`과 같이 작성하여 배열이나 선택적으로 받을 수 있다.
   - `타입[]`: 여러 개의 인자를 받을 수 있다. 이 경우, `execute` 콜백 함수의 `args` 인자에서 배열의 형태로 전달된다. 예시를 들어, `<인자명:int[]>`와 같이 사용할 수 있다.
   - `타입?`: 선택적으로 받을 수 있다. 이 경우, `execute` 콜백 함수의 `args` 인자에서 `null`이 될 수 있다. 예시를 들어, `<인자명:string?>`와 같이 사용할 수 있다.
 - `설정`: 인자의 설정. 생략할 수 있다.
   - `int`: 최소값(`min`)과 최대값(`max`)을 설정할 수 있다. 예시를 들어, `<수:int min=1 max=10>` 와 같이 사용할 수 있다.
   - `string`: 최소 길이(`minLength`), 최대 길이(`maxLength`), 또는 길이를 특정할 수 있다(`length`). 예시를 들어, `<문자열:string length=4>`와 같이 사용할 수 있다.
   - `date`: 아직 설정할 수 있는 것이 없다.

#### examples
```js
...
    .setUsage("기수방 <기수:int min=38>")
    .setExecute((self, chat, channel, args) => {
		// 만약 chat.text = "기수 40"
        // args = { 기수: 38 }
    })
```

```js
...
    .setUsage("합계 <numbers:int[]>")
    .setExecute((self, chat, channel, args) => {
		// 만약 chat.text = "합계 1 2 3 4 5"
        // args = { numbers: [1, 2, 3, 4, 5] }
    })
```

```js
...
    .setUsage("이름 <name:string length=3>")
    .setExecute((self, chat, channel, args) => {
        // 만약 chat.text = "이름 abc"
        // args = { name: "abc" }
    })
```

```js
...
    .setUsage("합계 <number1:int> <number2:int?>")
    .setExecute((self, chat, channel, args) => {
        // 만약 chat.text = "합계 1"
        // args = { number1: 1, number2: null }
    })
```

```js
...
    .setUsage("생일 <날짜:date>")
    .setExecute((self, chat, channel, args) => {
        // 만약 chat.text = "생일 2021-01-01"
        // args = { 날짜: DateTime.parse("2021-01-01") }
    })
```

### StructuredCommand의 `cronjob`
`cronjob`은 명령어를 주기적으로 실행할 수 있는 기능이다. 이에 대해서는 [한글](https://ko.wikipedia.org/wiki/Cron), [영문](https://en.wikipedia.org/wiki/Cron)을 참고한다.  
[crontab 직접 사용해보기](https://crontab.guru/)에서 직접 사용해보며 쉽게 이해할 수 있다.

`cronjob`은 다음과 같이 사용한다.
```js
let cmd = StructuredCommand.Builder()
    .setName('명령어')
    .setDescription('명령어에 대한 설명')
    .setUsage('명령어 <인자1:int> <인자2:string>')
    .setExecute((self, chat, channel, args) => {
        // 명령어 실행 코드
    })
    .setCronjob({
       '아침': '30 7 0 * * *',
        '점심': '0 12 0 * * *',
    }, (self, tag) => {
        // 주기적으로 실행될 때 실행되는 콜백 함수
    })
    .build();
```

`cronjob`은 `Builder` 클래스의 `setCronjob` 메서드를 통해 설정할 수 있다.
    - 첫 번째 인자는 `cron` 설정이다. `cron` 설정은 `cron` 표현식을 값으로 가진다. 키는 `cron` 표현식을 설명하는 문자열이다. `cron` 표현식은 주기적으로 실행될 시간을 설정하는 문자열이다.
    - 두 번째 인자는 주기적으로 실행될 때 실행되는 콜백 함수이다. `(self: StructuredCommand, tag: string) => void` 형식이다.
    - `self`: `StructuredCommand` 인스턴스 자신.
    - `tag`: `cron` 설정의 키. `cron` 설정의 키가 전달된다.

#### examples
```js
...
    .setCronjob({
        '아침': '30 7 0 * * *',
        '점심': '0 12 0 * * *',
    }, (self, tag) => {
        if (tag === '아침') {
            // 아침에 실행될 코드
        } else if (tag === '점심') {
            // 점심에 실행될 코드
        }
    })
    .build();
```

```js
...
    .setCronjob({
        '매일': '0 0 0 * * *',
    }, (self, tag) => {
        // 매일 실행될 코드
    })
    .build();
```

### StructuredCommand의 `execute`
`execute` 콜백 함수는 명령어가 실행될 때 실행되는 함수이다. 그러나, 명령어가 예를 들어 공지 명령어 같이 쓸 내용이 많을 경우에는 명령어 호출을 하고 그 다음 메시지의 내용도 같이 처리해주면 편할 것이다.
이를 위해, `setExecute` 메서드의 두 번째 인자로 `executeLazy` 콜백 함수를 전달하면 된다. `executeLazy` 콜백 함수는 명령어 호출 후 같은 사람이 같은 채팅방에서 다시 문자를 보낼 때 실행된다.

`executeLazy` 콜백 함수는 다음과 같이 사용한다.
```js
let cmd = StructuredCommand.Builder()
    .setName('명령어')
    .setDescription('명령어에 대한 설명')
    .setUsage('명령어 <인자1:int> <인자2:string>')
    .setExecute((self, chat, channel, args) => {
        // 명령어 실행 코드
    }, (self, chat, prevChat, channel, prevChannel, args) => {
        // 명령어 호출 후 한 번 더 메시지의 내용을 처리하는 코드
    })
    .build();
```

`executeLazy` 콜백 함수는 `setExecute` 메서드의 두 번째 인자로 전달한다.
    - `self`: `StructuredCommand` 인스턴스 자신.
    - `chat`: 메시지를 보낸 사람의 정보와 메시지 내용을 담고 있는 `Chat` 인스턴스.
    - `prevChat`: `setExecute` 메서드의 첫 번째 인자 `execute` 콜백 함수의 `chat` 인자와 같다.
    - `channel`: 메시지를 받은 채널의 정보를 담고 있는 `Channel` 인스턴스.
    - `prevChannel`: `setExecute` 메서드의 첫 번째 인자 `execute` 콜백 함수의 `channel` 인자와 같다.
    - `args`: 명령어의 인자들. `usage`에 작성한 타입에 따라 달라진다.



---
## NaturalCommand

`NaturalCommand`는 자연어 명령어를 사용할 때 사용하는 클래스이다.  
자연어 명령어, 즉 인자의 타입과 자리가 고정되어 있지 않고, 사용자가 자유롭게 명령어를 사용할 수 있는 명령어를 말한다. 사용자에게는 훨씬 자유로우나 섬세한 명령어를 구현하기는 힘들다.  

자연어 명령어는 우선, `bot-manager/Command` 폴더 내부의 `dict.json`을 단어 사전으로 사용한다. 이 단어 사전은 명령어를 인식할 때 사용된다.  
```json
{
  "token": ["string1", "string2", "string3", ...],
  "token2": ["string4", "string5", "string6", ...],
  ...
}
```
위와 같은 형태로 `dict.json`을 작성한다. 각 토큰의 값들은 배열로 작성한다. 이 배열에 있는 값들은 모두 같은 토큰으로 인식된다.
즉, `"meal": ["밥", "식사", "점심", "저녁"]`이라면, 메시지 속의 `"밥"`, `"식사"`, `"점심"`, `"저녁"`은 모두 `"meal"`로 인식된다.

`NaturalCommand`는 다음과 같이 사용한다.
```js
const { NaturalCommand } = require('bot-manager/Command');

let channel1 = BotManager.getChannelById('채널ID');
let channel2 = BotManager.getChannelById('채널ID2');

let cmd = NaturalCommand.Builder()
    .setName('명령어')
    .setDescription('명령어에 대한 설명')
    .setQuery({})
    .setExecute((self, chat, channel, args) => {
        // 명령어 실행 코드
    })
    .build();
```