"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const fs_1 = __importDefault(require("fs"));
class Logger {
    static getLogFile() {
        if (Logger.logFile === null) {
            Logger.logFile = fs_1.default.createWriteStream(__dirname + '/../log/server.log', { flags: 'w' });
        }
        return Logger.logFile;
    }
    static log(message, debugDepth = 5) {
        if ((message === null) || (message === undefined))
            return;
        if (!this.debugOn)
            return;
        if (debugDepth > this.debugDepth)
            return;
        if (this.debugOn) {
            console.log(message);
            Logger.getLogFile().write(new Date().toString() + ":" + message + '\n');
        }
    }
    static setLevel(newLevel) {
        Logger.debugDepth = newLevel;
    }
    static setOn() {
        Logger.debugOn = true;
    }
    static setOff() {
        Logger.debugOn = false;
    }
}
Logger.debugOn = true;
Logger.debugDepth = 1000;
module.exports = { Logger };
module.exports = Logger;
//# sourceMappingURL=Logger.js.map