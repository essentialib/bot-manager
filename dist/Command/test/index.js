"use strict";

var _require = require('../index'),
  StructuredCommand = _require.StructuredCommand,
  NaturalCommand = _require.NaturalCommand,
  CommandRegistry = _require.CommandRegistry;
new StructuredCommand.Builder().setName('add').setDescription('add command').setUsage('add <num1:int> <num2:int?>').setExamples('add 7 8').setExecute(function (self, chat, channel, _ref) {
  var num1 = _ref.num1,
    num2 = _ref.num2;
  console.log(num1, num2);
  console.log('합(add2):', num1 + num2);
}).build().register();

// new StructuredCommand.Builder()
//     .setName('add2')
//     .setDescription('add command')
//     .setUsage('add <numbers:int[]?>')
//     .setExamples('add 1 2 3 4 5')
//     .setExecute((self, chat, channel, { numbers }) => {
//         console.log('합(add):', numbers.reduce((a, b) => a + b, 0));
//     })
//     .build().register();

new NaturalCommand.Builder().setName('할 일').setDescription('할 일 추가 명령어').setQuery({}).setExamples('오늘 병원 하기', '숙제 하기 다음 주 월요일').setUseDateParse(true).setExecute(function (self, chat, channel, _ref2) {
  var datetime = _ref2.datetime;
  console.log('할 일:', chat.text, '| 날짜:', datetime.humanize());
}).build().register();
new NaturalCommand.Builder().setName('급식').setDescription('급식 명령어').setDescription('입력한 시간에 맞춰 다음 급식을 전송합니다. 시간을 생략하면 메시지를 전송한 당시로 설정됩니다.' + '\n또한, 매일 자정 그 날의 모든 급식을 알려주고, 오전 11시 40분에는 점심, 오후 4시 20분에 저녁 급식을 정기적으로 전송합니다.').setCronJob({
  '오늘': '0 0 * * *',
  '점심': '40 11 * * *',
  '저녁': '20 16 * * *'
}, function (self, tag) {
  console.log('executeCron:', tag);
}).setQuery({
  meal: null
}).setUseDateParse(true).setExecute(function (self, chat, channel, _ref3) {
  var meal = _ref3.meal,
    datetime = _ref3.datetime;
  console.log('급식:', meal, '| 날짜:', datetime.humanize(), '| text:', chat.text, '| rawText:', chat.rawText);
  console.log(self.manual());
}).build().register();
function onMessage(chat, channel) {
  var _CommandRegistry$get = CommandRegistry.get(chat, channel),
    cmd = _CommandRegistry$get.cmd,
    args = _CommandRegistry$get.args;
  if (cmd) {
    cmd.execute(chat, channel, args);
  }
}
onMessage({
  text: 'add 3'
}, {
  name: 'test room',
  id: 982981398
});