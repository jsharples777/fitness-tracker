import fs, {WriteStream} from 'fs';

class Logger {
    static debugOn:boolean = true;
    static debugDepth:number = 1000;
    static logFile:WriteStream;

    static getLogFile() {
        if (Logger.logFile === null) {
            Logger.logFile = fs.createWriteStream(__dirname + '/../log/server.log', {flags: 'w'});
        }
        return Logger.logFile;
    }

    static log(message:string, debugDepth = 5) {
        if ((message === null) || (message === undefined)) return;
        if (!this.debugOn) return;
        if (debugDepth > this.debugDepth) return;
        if (this.debugOn) {
            console.log(message);
            Logger.getLogFile().write(new Date().toString() + ":" + message + '\n');
        }
    }

    static setLevel(newLevel:number) {
        Logger.debugDepth = newLevel;
    }

    static setOn() {
        Logger.debugOn = true;
    }

    static setOff() {
        Logger.debugOn = false;
    }

}

module.exports = {Logger};
export = Logger;