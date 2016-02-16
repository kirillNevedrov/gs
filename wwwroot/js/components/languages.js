import React from 'react';
import {connect} from 'react-redux';

import { Link } from 'react-router'

import {setLocale} from 'js/actionCreators/actionCreators';
import {getLocale, getLocaleOrDefault} from 'js/utils/utils';

class Languages extends React.Component {
    //shouldComponentUpdate(nextProps, nextState) {
    //    return false;
    //}
    componentDidMount() {
        console.log("mount");
    }
    getNewPath(currentPath, currentLocale, newLocale){
        return currentPath.replace(
            new RegExp('/' + currentLocale + '(/)?(.*)'),
            '/' + newLocale + '/$2');
    }
    render() {
        const {location} = this.props;
        let locale = getLocale(location);
        let localeOrDefault = getLocaleOrDefault(locale);

        var getLink = (linkLocale) => {
            return linkLocale === localeOrDefault
                ? <span>{linkLocale}</span>
                : <Link to={this.getNewPath(location.pathname, locale, linkLocale)}>{linkLocale}</Link>
        };

        return (
            <div>
                {getLink('ru')}
                |
                {getLink('en')}
            </div>
        );
    }
}

const mapStateToLanguagesProps = (state) => {
    return {
        location: state.routing.location
    };
};

export default connect(
    mapStateToLanguagesProps
)(Languages);