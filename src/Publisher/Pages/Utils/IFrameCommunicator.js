export default class IFrameCommunicator {
    constructor(origin, authKey, otherWindow, onMessage) {
        this.onMessage = onMessage;
        this.origin = origin;
        this.otherWindow = otherWindow;
        this.counter = 0;
        this.authKey = authKey;
        this.callbacks = {};
        this.responses = {};

        window.addEventListener("message", this.messageHandler);
    }

    messageHandler = (event) => {
        if (this.origin && event.origin !== this.origin) {
            return;
        }

        this.processIncomingMessage(event);
    }

    dispose = () => {
        window.removeEventListener("message", this.messageHandler);
    }

    processIncomingMessage = (event) => {
        let data = event.data;

        if (!data || data.authKey !== this.authKey)
            return;

        if (data && data.r) {
            let r = data.r;
            console.log("processIncomingMessage r", r, this.callbacks[r])
            this.callbacks[r](data);
            delete this.callbacks[r];
        }
        else
        {
            let responseFunc = () => {};
            if (data && data.c) {
                let c = data.c;
                responseFunc = this.responses[c] = (result) => {
                    let newData = {r: c, result};
                    this.post(newData);
                }
            }

            this.onMessage(event.data, responseFunc);
        }
    };

    post = (data, callback) => {
        if (callback) {
            this.counter++;
            data.c = this.counter;
            console.log("post c", data.c, callback)
            this.callbacks[data.c] = callback;
        }

        data.authKey = this.authKey;

        let otherWindow = typeof(this.otherWindow) === 'function' ? this.otherWindow() : this.otherWindow;

        if (!otherWindow)
            return;

        otherWindow.postMessage(data, this.origin || "*");
    };
}
