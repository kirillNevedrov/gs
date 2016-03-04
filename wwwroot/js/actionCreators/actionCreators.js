let nextQuiltId = 0;
const addQuilt = (text) => {
    return {
        type: 'ADD_QUILT',
        id: nextQuiltId++,
        text
    };
};

const activateTransition = () => {
    return {
        type: 'ACTIVATE_TRANSITION'
    };
};

const deactivateTransition = () => {
    return {
        type: 'DEACTIVATE_TRANSITION'
    };
};

export {addQuilt, activateTransition, deactivateTransition};
