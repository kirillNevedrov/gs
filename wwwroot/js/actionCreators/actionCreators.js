let nextQuiltId = 0;
const addQuilt = (text) => {
    return {
        type: 'ADD_QUILT',
        id: nextQuiltId++,
        text
    };
};

//const setLocale = (locale) => {
//    return {
//        type: 'SET_LOCALE',
//        locale
//    };
//};

export {addQuilt};
