let nextQuiltId = 0;
const addQuilt = (text) => {
    return {
        type: 'ADD_QUILT',
        id: nextQuiltId++,
        text
    };
};

export {addQuilt};
