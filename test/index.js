const BotManager = require('../src').get(BotManager);
const bot = BotManager.getCurrentBot();

// TODO: natural command와 date parser의 합작
let { StructuredCommand, NaturalCommand } = require('../src/Command');
let Event = require('../src/Event').Event;
let { DateTime } = require('../src/DateTime');

let 공지방 = BotManager.getChannelById('394288262769869');

let cmd = new StructuredCommand.Builder()
    .setName('시간표 명령어')
    .setDescription('설명입니다.')
    .setChannels(공지방)
    .setUsage('시간표 알림 <날:date>')
    .setCronJob({
        '아침': '5 3 * * *',
        '점심': '5 3 * * *'
    }, (self, tag) => {

    })
    .setExecute((self, chat, channel, args) => {

    }, (self, prevChat, chat, prevChannel, channel, args) => {

    })

bot.addCommand(new StructuredCommand.Builder()
    .setName('학생회 알림')
    .setDescription('알림을 보냅니다.')
    .setUsage('<부서:string length=3> 알림 <기수:int[]?>')
    .setExamples(
        '학생회 알림 1 2 3',
        '정보부 알림 1'
    )
    .setExecute((self, chat, channel, args) => {
        공지방.send('execute: ' + JSON.stringify(args, null, 4));
    })
    .setExecuteLazy((self, chat, prevChat, channel, prevChannel, args) => {
        공지방.send('executeLazy: ' + JSON.stringify(args, null, 4));
    })
    .setCronJobs({
        '오늘': "20 19 * * *",
        '점심': "21 19 * * *",
        '저녁': "22 19 * * *"
    })
    .setExecuteCron((tag) => {
        공지방.send('executeCron: ' + tag);
    })
    .build()
);

bot.addCommand(new NaturalCommand.Builder()
    .setName('할 일 추가 명령어')
    .setDescription('입력한 날짜와 시간, 할 일을 자동으로 분리해내어 할 일로 추가합니다.')
    .setQuery({
        'date': null,

    })
);

bot.addCommand(new NaturalCommand.Builder()
    .setName('급식 명령어')
    .setDescription('입력한 시간에 맞춰 다음 급식을 전송합니다. 시간을 생략하면 메시지를 전송한 당시로 설정됩니다.' +
        '\n또한, 매일 자정 그 날의 모든 급식을 알려주고, 오전 11시 40분에는 점심, 오후 4시 20분에 저녁 급식을 정기적으로 전송합니다.')
    .setCronJobs({ '오늘': '0 0 * * *', '점심': '40 11 * * *', '저녁': '20 16 * * *' })
    .setExamples('오늘 밥', '오늘 급식', '다음 주 급식', '급식 저녁', '...등 자유로운 형태')
    .setQuery({
        'meal': null,
        'date': null
    })
    .setExecute((self, chat, channel, args) => {

    })
    .setExecuteCron(tag => {

    })
);

bot.on(Event.COMMAND, (chat, channel, command, args) => {
    공지방.send('Event.COMMAND: ' + command.name);
});

bot.on(Event.MESSAGE, (chat, channel) => {
    공지방.send('Event.MESSAGE: ' + chat.text);
});

bot.on(Event.MEMBER_TYPE_CHANGE, (chat, channel) => {
    chat.demoteUser.nickName
});

// TEST: 뒤에 start해도 정상 작동하지?
bot.start();