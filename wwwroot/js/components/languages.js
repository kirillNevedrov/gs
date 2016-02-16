import React from 'react';
import {connect} from 'react-redux';
import {injectIntl} from 'react-intl';
import { Link } from 'react-router'

import {setLocale} from 'js/actionCreators/actionCreators';
import {isDefaultLocale} from 'js/utils/utils';

class Languages extends React.Component {
    //shouldComponentUpdate(nextProps, nextState) {
    //    return false;
    //}
    componentDidMount() {
    }
    getNewPath(currentPath, currentLocale, newLocale){
        if(isDefaultLocale(currentLocale)){
            if(isDefaultLocale(newLocale))
            {
                return currentPath;
            }
            else {
                return '/' + newLocale + (currentPath === '/' ? '' : currentPath);
            }
        }
        else{
            if(isDefaultLocale(newLocale))
            {
                var newPath = currentPath.replace('/' + currentLocale, '');
                return newPath ? newPath : '/';
            }
            else {
                return currentPath.replace('/' + currentLocale, '/' + newLocale);
            }
        }
    }
    render() {
        const {formatMessage, locale} = this.props.intl;
        const {path, dispatch} = this.props;

        var getLink = (linkLocale) => {
            return linkLocale === locale
                ? <span>{linkLocale}</span>
                : <Link to={this.getNewPath(path, locale, linkLocale)}>{linkLocale}</Link>
        };

        var formattedMessage = formatMessage({id: 'description'});

        return (
            <div>
                {path}
                {formattedMessage}
                {getLink('ru')}
                |
                {getLink('en')}
            </div>
        );
    }
}

const mapStateToLanguagesProps = (state) => {
    return {
        path: state.routing.location.pathname
    };
};

export default injectIntl(connect(mapStateToLanguagesProps)(Languages));