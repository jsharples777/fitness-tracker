import debug from "debug";

const logger = debug('poller');

export type serverAvailable = () => void;

export class Poller {
    private static _instance: Poller;
    private static INTERVAL_DEFAULT = 10000; // 30 seconds
    private static URL_CALL = '/ping';
    private interval: any | null = null;
    private isPollingBool: boolean = false;

    private constructor() {
    }

    public static getInstance(): Poller {
        if (!(Poller._instance)) {
            Poller._instance = new Poller();
        }
        return Poller._instance;
    }

    startPolling(callback: serverAvailable, delay: number = Poller.INTERVAL_DEFAULT): void {
        this.isPollingBool = true;
        this.interval = setInterval(() => {
            logger(`Checking for server availability`)
            fetch(Poller.URL_CALL, {method: 'GET'}).then((response) => {
                logger(`Response code was ${response.status} - server is now available`);
                this.stopPolling();
                callback();
            }).catch((error) => {
                logger(error);
            });
        }, delay);
    }

    isPolling(): boolean {
        return this.isPollingBool;
    }

    stopPolling() {
        if (this.interval) clearInterval(this.interval);
        this.interval = null;
        this.isPollingBool = false;
    }


}