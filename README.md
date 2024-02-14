# bot-manager

주요 카카오톡 라이브러리를 모두 합친 봇 관리자 모듈
- CronJob
- DBManager
- Command

> [!WARNING]
> `src` 폴더의 코드를 `npm run build` 또는 `npm run build-js` 명령어로 트랜스파일해 생성되는 `dist` 폴더를 배포합니다.

## Examples
```javascript
const BotManager = require('bot-manager').get(BotManager);
const bot = BotManager.getCurrentBot();

let { StructuredCommand, NaturalCommand } = require('bot-manager/index');
let Event = require('bot-manager/Event').Event;

bot.addCommand(new StructuredCommand.Builder()
    .setName('test')
    .setExecute((self, chat, channel, args) => {
        channel.send('test');
    })
    .build()
);

bot.on(Event.MESSAGE, (chat, channel) => {
    channel.send('hello');
});

bot.start();
```

