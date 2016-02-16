const defaultLocale = 'ru';

const getLocale = (location) => {
    var match = location
        ? location.pathname.match(/\/(ru|en)/)
        : null;

    return match ? match[1] : defaultLocale;
};

const isDefaultLocale = (locale) => {
    return locale === defaultLocale;
};

export {getLocale, isDefaultLocale};