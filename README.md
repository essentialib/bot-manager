# bot-manager

[`CronJob`](https://github.com/NyangBotLab/kakao-cron-deploy), [`DBManager`](https://github.com/NyangBotLab/DBManager_deploy) 모듈에 [`DateTime`](https://github.com/essentialib/datetime)과 자체 `Command` 모듈을 추가하여 카카오톡 봇 코딩을 더 원활하게 한 대규모 api 입니다.

> [!NOTE]  
> `src` 폴더의 코드를 `npm run build/build-js` 명령어로 트랜스파일해 생성되는 `dist` 폴더의 코드를 사용하세요. (es5 코드로 트랜스파일됨)  
> `d.ts`와 `.js` 파일로 구현된 모듈은 `npm run build-js`, `.ts` 파일로 구현된 모듈은 `npm run build` 명령어로 트랜스파일합니다.

> [!TIP]  
> 모든 모듈은 `d.ts` 파일도 구현되어 있어, 타입 힌트를 제공합니다. 따라서, IDE(ex. PyCharm, WebStorm)를 사용하여 개발하는 것을 권장합니다.

## 기본 세팅
1. 폰을 루팅한다. (루팅이 안 되어 있으면 `DBManager` 모듈이 완전히 작동할 수 없다.)
2. [`메신저봇 R`](https://play.google.com/store/apps/details?id=com.xfl.msgbot)앱을 설치한 후 봇 프로젝트 하나를 만든다. (무조건 레거시 API 체크 해제한, API2여야 한다.)
3. `dist` 폴더의 모든 파일을 그대로 `/sdcard/{메신저봇 R 앱 디렉토리}/global_modules/bot-manager` 폴더에 넣는다. 기본값은 `msgbot`.
4. `카카오톡` 앱에서 오픈 프로필을 하나 생성한다. (`getCurrentBot()` 함수에서 `InstanceType.userID`를 자동으로 구하는 데 필요하다.)
5. `메신저봇 R`앱에서 `examples` 폴더의 코드와 위키를 참고해 모듈을 사용해 코드를 작성하고 저장 및 컴파일해 실행한다.

## 예시
```js
const BotManager = require('bot-manager').get(BotManager);
const bot = BotManager.getCurrentBot();

const Event = require('bot-manager/Event');

bot.on(Event.MESSAGE, (chat, channel) => {
    channel.send('Hello, world!');
});
```
