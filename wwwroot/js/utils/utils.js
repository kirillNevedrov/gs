const defaultLocale = 'ru';

const getLocale = (location) => {
    var match = location
        ? location.pathname.match(/\/(ru|en)/)
        : null;

    return match ? match[1] : '';
};

const getLocaleOrDefault = (locale) => {
    return locale ? locale : defaultLocale;
};

const isDefaultLocale = (locale) => {
    return locale === defaultLocale;
};

export {defaultLocale, getLocale, getLocaleOrDefault, isDefaultLocale};