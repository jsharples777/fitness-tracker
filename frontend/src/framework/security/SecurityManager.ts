import debug from "debug";

const logger = debug('security-manager');

export class SecurityManager {
    private static _instance: SecurityManager;
    private hash: string | null = null;
    private logoutEl: HTMLElement | null = null;

    private constructor() {
    }

    public static getInstance(): SecurityManager {
        if (!(SecurityManager._instance)) {
            SecurityManager._instance = new SecurityManager();
        }
        return SecurityManager._instance;
    }

    public onDocumentLoaded(logoutElementId: string) {
        this.logoutEl = document.getElementById(logoutElementId);

        // find the secret hash for the current user (if any)
        const username = this.getLoggedInUsername();
        if (username && username.trim().length > 0) {
            logger(`found user ${username}`);
            this.hash = localStorage.getItem(username);
            if (this.hash) {
                sessionStorage.setItem(username, this.hash);
            } else {
                this.hash = sessionStorage.getItem(username);
            }
            localStorage.removeItem(username);
            logger(`found user ${username} hash - removed from local storage`);
        }

        if (this.logoutEl) {
            this.logoutEl.addEventListener('click', (event) => {
                localStorage.removeItem(username);
                sessionStorage.removeItem(username);
            });
        }
    }


    public isLoggedIn(): boolean {
        let isLoggedIn = false;
        try {
            // @ts-ignore
            if (loggedInUser) {
                isLoggedIn = true;
            }
        } catch (error) {
        }
        return isLoggedIn;
    }

    public getLoggedInUserId(): string {
        let result = '';
        try {
            // @ts-ignore
            if (loggedInUser) {
                // @ts-ignore
                result = loggedInUser._id;
            }
        } catch (error) {
        }
        logger(`Logged in user id is ${result}`);
        return result;
    }

    public getLoggedInUsername(): string {
        let result = '';
        try {
            // @ts-ignore
            if (loggedInUser) {
                // @ts-ignore
                result = loggedInUser.username;
            }
        } catch (error) {
        }
        logger(`Logged in user is ${result}`);
        return result;
    }

    public getCurrentUser(): string {
        return this.getLoggedInUserId();
    }


    public encryptString(value: string): string {
        let result = value;
        if (this.hash) {
            // @ts-ignore
            result = CryptoJS.AES.encrypt(value, this.hash).toString();
        }
        return result;
    }

    public decryptString(value: string): string {
        let result = value;
        if (this.hash) {
            // @ts-ignore
            result = CryptoJS.AES.decrypt(value, this.hash).toString(CryptoJS.enc.Utf8);
        }
        return result;
    }

    public encryptObject(dataObj: any): string {
        return this.encryptString(JSON.stringify(dataObj));
    }

    public decryptObject(value: string): any {
        return JSON.parse(this.decryptString(value));
    }
}