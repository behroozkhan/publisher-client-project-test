let EditorHolderController = {};
let AllowFunctions = {};

EditorHolderController.onMessage = (data, res, holder) => {
    if (data.type === 'Controller' && AllowFunctions[data.func]) {
        res(AllowFunctions[data.func](...data.inputs, holder));
        return;
    }

    if (data.type === 'Holder' && holder[data.func]) {
        holder[data.func](...data.inputs, res);
        return;
    }
};

export default EditorHolderController;