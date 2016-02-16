import {getLocale} from './utils/utils';

export class RenderingManager {
    constructor(settings) {
        this._settings = settings;

        this._currentLocale = getLocale(this._getLocation());

        this._settings.store.subscribe(() => {
            var newLocale = getLocale(this._getLocation());

            if (newLocale !== this._currentLocale) {
                this._currentLocale = newLocale;
                this._settings.render(newLocale);
            }
        });
    }
    render() {
        this._settings.render(this._currentLocale);
    }
    _getLocation() {
        return this._settings.store.getState().routing.location;
    }
}

export default RenderingManager;