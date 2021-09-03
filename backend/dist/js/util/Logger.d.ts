/// <reference types="node" />
import fs, { WriteStream } from 'fs';
declare class Logger {
    static debugOn: boolean;
    static debugDepth: number;
    static logFile: WriteStream;
    static getLogFile(): fs.WriteStream;
    static log(message: string, debugDepth?: number): void;
    static setLevel(newLevel: number): void;
    static setOn(): void;
    static setOff(): void;
}
export = Logger;
