const IS_DIST = false;
const COMPRESS = '\u200b'.repeat(500);

class Command {
    constructor(name, description, execute, executeLazy, executeCron, cronJobs, channels, examples) {
        if (this.constructor === Command)
            throw new TypeError("Cannot construct abstract class");

        if (name === undefined)
            throw new TypeError("name is required");
        if (description === undefined)
            throw new TypeError("description is required");

        this.name = name;
        this.description = description;
        this.channels = channels || [];
        this.cronJobs = cronJobs || {};
        this.examples = examples || [];

        this._execute = execute || ((command, chat, channel, args) => {});
        this.execute = (chat, channel, args) => this._execute(this, chat, channel, args);

        this._executeLazy = executeLazy || ((command, chat, prevChat, channel, prevChannel, args) => {});
        this.executeLazy = (chat, prevChat, channel, prevChannel, args) => this._executeLazy(this, chat, prevChat, channel, prevChannel, args);

        this.executeCron = executeCron || (tag => {});
        this.lazy = executeLazy !== undefined;
    }

    manual(content) {
        let ret = [
            `🧩 \`${this.name}\` 명령어 도움말${COMPRESS}`,
            '——————————',
            this.description,
            '',
            '📌 인자',
            '——',
            ...content,
            ''
        ];
        
        if (this.channels.length > 0) {
            ret.push('📌 활성화된 방');
            ret.push('——');
            ret.push(...this.channels.map(c => `· ${c.name}`));
            ret.push('');
        }

        if (this.examples.length > 0) {
            ret.push('📌 예시');
            ret.push('——');
            ret.push(...this.examples.map(e => `"${e}"`));
        }

        return ret.join('\n');
    }

    register() {
        Registry.CommandRegistry.register(this);
    }
}

class Arg {
    constructor(name) {
        if (this.constructor === Arg)
            throw new TypeError("Cannot construct abstract class");

        this.name = name;
        this.many = false;
        this.includeEmpty = false;
    }

    toRegExp() {
        throw new Error("Not implemented");
    }

    parse(value) {
        throw new Error("Not implemented");
    }
}

class IntArg extends Arg {
    constructor(name, min, max) {
        super(name);
        this.min = min;
        this.max = max;
    }

    toRegExp() {
        if (this.min && this.max && this.min > this.max)
            throw new RangeError("min must be less than or equal to max");

        let ret = new RegExp("[+-]?\\d" + (this.includeEmpty ? "*" : "+"));

        if (!this.many)
            return ret;
        else
            return new RegExp(`(?:${ret.source}\\s?)${this.includeEmpty ? "*" : "+"}`);
    }

    parse(value) {
        if (value != null && !this.toRegExp().test(value))
            return false;

        if (this.many) {
            if (value == null)
                return [];

            let ret = value.split(' ').map(Number);
            if (this.min && ret.some(v => v < this.min))
                return false;
            else if (this.max && ret.some(v => v > this.max))
                return false;
            else
                return ret;
        } else {
            if (value == null)
                return null;

            let ret = Number(value);
            if (this.min && ret < this.min)
                return false;
            else if (this.max && ret > this.max)
                return false;
            else
                return ret;
        }
    }
}

class StringArg extends Arg {
    constructor(name, length, minLength, maxLength) {
        super(name);
        this.length = length;
        this.minLength = minLength;
        this.maxLength = maxLength;
    }

    toRegExp() {
        if (this.length && (this.minLength || this.maxLength))
            throw new Error("length cannot be used with minLength or maxLength");
        if (this.minLength && this.maxLength && this.minLength > this.maxLength)
            throw new RangeError("minLength must be less than or equal to maxLength");
        if (this.minLength && this.minLength < 1)
            throw new RangeError("minLength must be greater than or equal to 1");
        if (this.maxLength && this.maxLength < 1)
            throw new RangeError("maxLength must be greater than or equal to 1");
        if (!this.minLength && this.maxLength)
            this.minLength = 1;

        let ret;

        if (this.length)
            ret = new RegExp(`\\S{${this.length}}`);
        else if (this.minLength && this.maxLength)
            ret = new RegExp(`\\S{${this.minLength},${this.maxLength}}`);
        else if (this.minLength)
            ret = new RegExp(`\\S{${this.minLength},}`);
        else
            ret = new RegExp(`\\S${this.includeEmpty ? "*" : "+"}`);

        if (!this.many)
            return ret;
        else
            return new RegExp(`(?:${ret.source}\\s?)${this.includeEmpty ? "*" : "+"}`);
    }

    parse(value) {
        if (value != null && !this.toRegExp().test(value))
            return false;

        if (this.many) {
            if (value == null)
                return [];

            return value.split(' ');
        }
        else {
            if (value == null)
                return null;

            return value;
        }
    }
}

class StructuredCommand extends Command {
    constructor(options) {
        if (options.usage === undefined)
            throw new TypeError("usage is required");

        super(options.name, options.description, options.execute, options.executeLazy, options.executeCron, options.cronJobs, options.channels, options.examples);

        this.usage = options.usage;

        this._argumentStr = [];

        let args = [];
        let regexed = this.usage.replace(/\s*<.+?>/g, m => {
            const pos = m.indexOf('<');

            const whitespaces = m.slice(0, pos);
            let [ nameAndType, ...options ] = m.slice(pos + 1, -1).split(/\s+/);
            let [ name, type ] = nameAndType.split(":");
            this._argumentStr.push([name, type]);

            options = options.map(o => {
                let splited = o.split("=");
                if (!isNaN(Number(splited[1]))) {
                    splited[1] = Number(splited[1]);
                }

                return splited;
            });

            const map = {
                'int': IntArg,
                'string': StringArg
            }

            let k;
            for (let key in map) {
                if (type.startsWith(key)) {
                    k = key;
                    break;
                }
            }

            if (k === undefined)
                throw new TypeError(`Invalid type: ${type}`);

            args.push(new map[k](name));

            for (let [key, value] of options) {
                args[args.length - 1][key] = value;
            }

            type = type.slice(k.length).trim();
            if (type === '[]')
                args[args.length - 1].many = true;
            else if (type === '?')
                args[args.length - 1].includeEmpty = true;
            else if (type === '[]?') {
                args[args.length - 1].many = true;
                args[args.length - 1].includeEmpty = true;
            } else if (type !== '') {
                throw new TypeError(`Invalid type options: ${type}`);
            }

            let ret = `${whitespaces}(${args[args.length - 1].toRegExp().source})`;
            if (args[args.length - 1].includeEmpty)
                return `(?:${ret})?`;
            else
                return ret;
        });

        this.args = args;
        this.regex = new RegExp(`^${regexed}$`);
    }

    static Builder = class {
        constructor() {
            this.name = null;
            this.description = null;
            this.usage = null;
            this.execute = null;
            this.executeLazy = null;
            this.executeCron = null;
            this.cronJobs = {};
            this.channels = [];
            this.examples = [];
        }

        setName(name) {
            this.name = name;
            return this;
        }

        setDescription(description) {
            this.description = description;
            return this;
        }

        setUsage(usage) {
            this.usage = usage;
            return this;
        }

        setExecute(execute) {
            this.execute = execute;
            return this;
        }

        setExecuteLazy(executeLazy) {
            this.executeLazy = executeLazy;
            return this;
        }

        setExecuteCron(executeCron) {
            this.executeCron = executeCron;
            return this;
        }

        setCronJobs(cronJobs) {
            this.cronJobs = cronJobs;
            return this;
        }

        setChannels(...channels) {
            this.channels = channels;
            return this;
        }

        setExamples(...examples) {
            this.examples = examples;
            return this;
        }

        build() {
            if (this.name === null)
                throw new TypeError("name is required");
            if (this.description === null)
                throw new TypeError("description is required");
            if (this.usage === null)
                throw new TypeError("usage is required");
            if (this.execute === null)
                throw new TypeError("execute is required");

            return new StructuredCommand({
                name: this.name,
                description: this.description,
                usage: this.usage,
                execute: this.execute,
                executeLazy: this.executeLazy,
                executeCron: this.executeCron,
                cronJobs: this.cronJobs,
                channels: this.channels,
                examples: this.examples
            });
        }
    }

    static add(options) {
        new StructuredCommand(options).register();
    }

    manual() {
        return super.manual([
            `"${this.usage.replace(/<.+?>/g, m => m.slice(0, m.indexOf(':')) + '>')}"`,
            ...this.args.map((arg, i) => {
                let ret = `· ${this._argumentStr[i][0]}: ${this._argumentStr[i][1]}`;
                
                let options = [];
                Object.keys(arg).forEach(key => {
                    if (key === 'name' || key === 'many' || key === 'includeEmpty')
                        return;

                    if (arg[key])   // null, undefined, 0, false 등이 아닐 경우
                        options.push(`${key}=${arg[key]}`);
                });

                if (options.length > 0)
                    ret += ` (${options.join(', ')})`;

                return ret;
            })
        ]);
    }
}

class NaturalCommand extends Command {
    constructor(options) {
        if (options.query === undefined)
            throw new TypeError("query is required");

        super(options.name, options.description, options.execute, options.executeLazy, options.executeCron, options.cronJobs, options.channels, options.examples);

        this.query = options.query;
        options.dictionaryPath = options.dictionaryPath || 'dict.json';

        let dictionary;
        if (IS_DIST)
            dictionary = JSON.parse(FileStream.read(`/sdcard/msgbot/global_modules/command-handler/${options.dictionaryPath}`));
        else
            dictionary = require(`./${options.dictionaryPath}`);

        this.map = {};
        for (let position in dictionary) {
            for (let tok in dictionary[position]) {
                for (let alias of dictionary[position][tok]) {
                    this.map[alias] = { token: tok, position: position };
                }
            }
        }
    }

    static Builder = class {
        constructor() {
            this.name = null;
            this.description = null;
            this.query = null;
            this.dictionaryPath = null;
            this.execute = null;
            this.executeLazy = null;
            this.executeCron = null;
            this.cronJobs = {};
            this.channels = [];
            this.examples = [];
        }

        setName(name) {
            this.name = name;
            return this;
        }

        setDescription(description) {
            this.description = description;
            return this;
        }

        setQuery(query) {
            this.query = query;
            return this;
        }

        setDictionaryPath(dictionaryPath) {
            this.dictionaryPath = dictionaryPath;
            return this;
        }

        setExecute(execute) {
            this.execute = execute;
            return this;
        }

        setExecuteLazy(executeLazy) {
            this.executeLazy = executeLazy;
            return this;
        }

        setExecuteCron(executeCron) {
            this.executeCron = executeCron;
            return this;
        }

        setCronJobs(cronJobs) {
            this.cronJobs = cronJobs;
            return this;
        }

        setChannels(...channels) {
            this.channels = channels;
            return this;
        }

        setExamples(...examples) {
            this.examples = examples;
            return this;
        }

        build() {
            if (this.name === null)
                throw new TypeError("name is required");
            if (this.description === null)
                throw new TypeError("description is required");
            if (this.query === null)
                throw new TypeError("query is required");
            if (this.execute === null)
                throw new TypeError("execute is required");

            return new NaturalCommand({
                name: this.name,
                description: this.description,
                query: this.query,
                dictionaryPath: this.dictionaryPath,
                execute: this.execute,
                executeLazy: this.executeLazy,
                executeCron: this.executeCron,
                cronJobs: this.cronJobs,
                channels: this.channels,
                examples: this.examples
            });
        }
    }

    static add(options) {
        new NaturalCommand(options).register();
    }

    input(text) {
        text = text.replace(/[!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]/g, "");
        let query = this.query;

        for (let word of text.split(' ')) {
            if (word in this.map) {
                let position = this.map[word].position;
                let token = this.map[word].token;

                if (position in query) {
                    if (query[position].constructor.name === 'Object') {
                        if (token in query[position]) {
                            query[position] = token;
                        }
                    } else if (Array.isArray(query[position])) {
                        if (query[position].includes(token)) {
                            query[position] = token;
                        }
                    } else {    // string || null || (() => string)
                        query[position] = token;
                    }
                }
            }
        }

        return query;
    }

    manual() {
        let ret = [];
        for (let position in this.query) {
            let tmp = `· ${position} `;

            if (this.query[position].constructor.name === 'Object')
                tmp += '\n' + Object.keys(this.query[position]).map(k => `    · ${k}`).join('\n');
            else if (Array.isArray(this.query[position]))
                tmp += '\n' + this.query[position].map(k => `    · ${k}`).join('\n');
            else if (typeof this.query[position] === 'function')
                tmp += `(default=${this.query[position]()})`;
            else if (this.query[position] !== null)
                tmp += `(default=${this.query[position]})`;

            ret.push(tmp);
        }

        return super.manual(ret);
    }
}

class Registry {
    static CommandRegistry = new Registry();

    constructor() {
        if (Registry.CommandRegistry)
            return Registry.CommandRegistry;

        this.data = {};
        Registry.CommandRegistry = this;
    }

    setCronManager(cronManager) {
        this.cronManager = cronManager;
        this.cronManager.setWakeLock(true);
    }

    loop(callback) {
        for (let cmdName in this.data) {
            callback(this.data[cmdName]);
        }
    }

    register(command) {
        if (!(command instanceof Command))
            throw new TypeError("command must be instance of Command");

        if (command.name in this.data)
            throw new Error("command already exists");

        this.data[command.name] = command;

        if (this.cronManager != null && Object.keys(command.cronJobs).length > 0 && command.executeCron != null) {
            for (let tag in command.cronJobs) {
                this.cronManager.add(command.cronJobs[tag], () => command.executeCron(tag));
            }
        }
    }

    get(chat, channel) {
        for (let cmdName in this.data) {
            let cmd = this.data[cmdName];

            if (cmd.channels.length !== 0 && !cmd.channels.map(c => c.id).includes(channel.id))    // 방이 포함되어 있지 않을 경우
                continue;

            let args;

            if (cmd instanceof StructuredCommand) {
                args = {};

                let matched = chat.text.match(cmd.regex);
                if (matched == null)
                    continue;

                let groups = matched.slice(1);  // 매치된 인자들
                let is_satisfy = true;    // 세부 속성을 만족하는지 여부
                cmd.args.forEach((arg, i) => {
                    let ret = arg.parse(groups[i]);
                    if (ret === false) {
                        is_satisfy = false;
                        return false;
                    }

                    args[arg.name] = ret;
                });

                if (!is_satisfy)  // 세부 속성을 만족하지 못했을 경우
                    continue;
            }
            else if (cmd instanceof NaturalCommand) {
                args = cmd.input(chat.text);

                let is_full = true;
                for (let key in args) {
                    if (args[key] === null || args[key].constructor.name === 'Object' || Array.isArray(args[key])) {
                        is_full = false;
                        break;
                    } else if (typeof args[key] === 'function') {
                        args[key] = args[key]();
                    }
                }

                if (!is_full)
                    continue;
            }

            return { cmd, args };
        }

        return { cmd: null, args: null };
    }
}

exports.StructuredCommand = StructuredCommand;
exports.NaturalCommand = NaturalCommand;
exports.CommandRegistry = Registry.CommandRegistry;
