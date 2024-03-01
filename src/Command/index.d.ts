import { Channel, Chat } from "../DBManager/classes";
import { CronJobFactor } from "../CronJob/cron-job-manager/lib/cron-job-factor";

export type ArgType = string | number;
export type Query = { [position: string]: null | string | string[] | (() => string) | { [token: string]: null } };
export type Args = { [key: string]: ArgType | ArgType[] };
export type Execute = (self: Command, chat: Chat, channel: Channel, args: Args) => void;
export type ExecuteLazy = (self: Command, chat: Chat, prevChat: Chat, channel: Channel, prevChannel: Channel, args: Args) => void;
export type ExecuteCron = (tag: string) => void;

export declare abstract class Command {
	protected constructor(
		name: string, description: string,
		execute?: Execute, executeLazy?: ExecuteLazy, executeCron?: ExecuteCron,
		cronJobs?: { [tag: string]: string }, channels?: Channel[], examples?: string[]
	);
	
	public readonly name: string;
	public readonly description: string;
	public readonly channels: Channel[];
	public readonly cronJobs: { [tag: string]: string };
	public readonly examples: string[];
	private readonly _execute: Execute;
	public readonly execute: (chat: Chat, channel: Channel, args: Args) => void;
	private readonly _executeLazy: ExecuteLazy;
	public readonly executeLazy: (chat: Chat, prevChat: Chat, channel: Channel, prevChannel: Channel, args: Args) => void;
	public readonly executeCron: ExecuteCron;
	public readonly lazy: boolean;
	
	abstract manual(): string;
	
	register(): void;
}

export declare abstract class Arg {
	protected constructor(name: string);
	
	public readonly name: string;
	public readonly many: boolean;
	
	abstract toRegExp(): RegExp;
	
	abstract parse(value: string): ArgType | false;
}

export declare class IntArg extends Arg {
	constructor(name: string, min?: number, max?: number);
	
	public readonly min?: number;
	public readonly max?: number;
	
	toRegExp(): RegExp;
	
	parse(value: string): number | false;
}

export declare class StringArg extends Arg {
	constructor(name: string, length?: number, minLength?: number, maxLength?: number);
	
	public readonly length?: number;
	public readonly minLength?: number;
	public readonly maxLength?: number;
	
	toRegExp(): RegExp;
	
	parse(value: string): string | false;
}

export declare interface StructuredCommandOptions {
	name: string;
	description: string;
	usage: string;
	channels?: Channel[];
	cronJobs?: { [tag: string]: string };
	examples?: string[];
	execute?: Execute;
	executeLazy?: ExecuteLazy;
	executeCron?: ExecuteCron;
}

export declare class StructuredCommand extends Command {
	constructor(options: StructuredCommandOptions);
	
	public readonly usage: string;
	public readonly args: Arg[];
	public readonly regex: RegExp;
	
	static add(options: StructuredCommandOptions): void;
	
	manual(): string;
}

export declare namespace StructuredCommand {
	export class Builder {
		constructor();
		
		public name: string;
		public description: string;
		public usage: string;
		public channels: Channel[];
		public cronJobs: { [tag: string]: string };
		public examples: string[];
		public execute: Execute | null;
		public executeLazy: ExecuteLazy | null;
		public executeCron: ExecuteCron | null;
		
		setName(name: string): this;
		
		setDescription(description: string): this;
		
		setUsage(usage: string): this;
		
		setChannels(...channels: Channel[]): this;
		
		setCronJobs(cronJobs: { [tag: string]: string }): this;
		
		setExamples(...examples: string[]): this;
		
		setExecute(execute: Execute): this;
		
		setExecuteLazy(executeLazy: ExecuteLazy): this;
		
		setExecuteCron(executeCron: ExecuteCron): this;
		
		build(): StructuredCommand;
	}
}

export declare interface NaturalCommandOptions {
	name: string;
	description: string;
	query: Query;
	channels?: Channel[];
	cronJobs?: { [tag: string]: string };
	dictionaryPath?: string;
	examples?: string[];
	execute?: Execute;
	executeLazy?: ExecuteLazy;
	executeCron?: ExecuteCron;
}

export declare class NaturalCommand extends Command {
	constructor(options: NaturalCommandOptions);
	
	dictionary: { [token: string]: { [aliase: string]: string[] } };
	
	static add(options: NaturalCommandOptions): void;
	
	manual(): string;
}

export declare namespace NaturalCommand {
	export class Builder {
		constructor();
		
		public name: string;
		public description: string;
		public query: Query;
		public channels: Channel[];
		public cronJobs: { [tag: string]: string };
		public dictionaryPath: string;
		public examples: string[];
		public execute: Execute | null;
		public executeLazy: ExecuteLazy | null;
		public executeCron: ExecuteCron | null;
		
		setName(name: string): this;
		
		setDescription(description: string): this;
		
		setQuery(query: Query): this;
		
		setChannels(...channels: Channel[]): this;
		
		setCronJobs(cronJobs: { [tag: string]: string }): this;
		
		setDictionaryPath(dictionaryPath: string): this;
		
		setExamples(...examples: string[]): this;
		
		setExecute(execute: Execute): this;
		
		setExecuteLazy(executeLazy: ExecuteLazy): this;
		
		setExecuteCron(executeCron: ExecuteCron): this;
		
		build(): NaturalCommand;
	}
}

export declare class Registry {
	constructor();
	
	public data: { [key: string]: Command };
	static CommandRegistry: Registry;
	
	setCronManager(cronManager: CronJobFactor): void;
	
	loop(callback: (command: Command) => void): void;
	
	register(command: Command): void;
	
	get(chat: Chat, channel: Channel): { cmd: Command | null, args: { [key: string]: ArgType | ArgType[] } | null };
}

export declare const CommandRegistry: Registry;