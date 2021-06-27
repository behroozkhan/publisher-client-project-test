import { Server } from '../Contexts/WeblancerContext';

let EditorHolderController = {};
let AllowFunctions = {};

EditorHolderController.onMessage = (data, res, holder) => {
    console.log("EditorHolderController.onMessage");
    if (data.type === 'Controller' && AllowFunctions[data.func]) {
        res(AllowFunctions[data.func](...data.inputs, holder));
        return;
    }

    if (data.type === 'Holder' && holder[data.func]) {
        holder[data.func](...data.inputs, res);
        return;
    }

    if (data.type === 'Server') {
        if (data.method.toLowerCase() === "get") {
            Server.get(data.route, (success, resData, error) => {
                let responseData = {
                    success, data: resData, error: error && error.message
                };
                res(responseData);
            });
        }
        else if (data.method.toLowerCase() === "post") {
            Server.post(data.route, data.input, (success, resData, error) => {
                let responseData = {
                    success, data: resData, error: error && error.message
                };
                res(responseData);
            });
        }
        else if (data.method.toLowerCase() === "put") {
            Server.put(data.route, data.input, (success, resData, error) => {
                let responseData = {
                    success, data: resData, error: error && error.message
                };
                res(responseData);
            });
        }
        return;
    }
};

export default EditorHolderController;