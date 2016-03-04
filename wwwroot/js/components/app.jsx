import React from 'react';
import {IntlProvider} from 'react-intl';
import {connect} from 'react-redux';
import CSSTransitionGroup from './transitions/CSSTransitionGroup'

import CurrentLocaleLink from './currentLocaleLink'
import Languages from './languages';
import Localized from './localized';
import LocalizedBinded from './localizedBinded';
import {getLocale, getLocaleOrDefault} from 'js/utils/utils';
import {activateTransition, deactivateTransition} from 'js/actionCreators/actionCreators';

const ruStrings = {
    'description': 'Гуд сториес это огонь!'
};
const enStrings = {
    'description': 'Good stories are awesome!'
};

const getMessages = (locale) => {
    switch (locale) {
        case 'ru':
            return ruStrings;
        case 'en':
            return enStrings;
        default:
            return ruStrings;
    }
};

export class App extends React.Component {
    constructor() {
        super();
        this.state = {
            test: '123'
        };
    }

    //shouldComponentUpdate(nextProps, nextState) {
    //    return false;
    //}
    render() {
        let {location, onTransitionStart, onTransitionEnd} = this.props;

        let locale = getLocale(location);
        let localeOrDefault = getLocaleOrDefault(locale);



        return (
            //<div>
            //    <section className="grid-one">
            //        <div className="grid-item">1</div>
            //        <div className="grid-item">2</div>
            //        <div className="grid-item">3</div>
            //        <div className="grid-item">4</div>
            //        <div className="grid-item">5</div>
            //        <div className="grid-item">6</div>
            //        <div className="grid-item">7</div>
            //        <div className="grid-item">8</div>
            //        <div className="grid-item">9</div>
            //        <div className="grid-item">10</div>
            //    </section>
            //</div>
            <IntlProvider key={localeOrDefault} locale={locale} messages={getMessages(localeOrDefault)}>
                <div>
                    {location.pathname}
                    <header>Good Stories</header>
                    <nav>
                        <ul>
                            <li><CurrentLocaleLink to="/">Главная</CurrentLocaleLink></li>
                            <li><CurrentLocaleLink to="/quilts">Одеяла</CurrentLocaleLink></li>
                            <li><CurrentLocaleLink to="/blog">Блог</CurrentLocaleLink></li>
                        </ul>
                    </nav>
                    <main>
                        <CSSTransitionGroup
                            component="div"
                            transitionName="example"
                            transitionAppear={true}
                            transitionAppearTimeout={500}
                            transitionEnterTimeout={500}
                            transitionLeaveTimeout={500}
                            onEnterStart = {()=>{console.log('enter start');onTransitionStart();}}
                            onEnterEnd = {()=>{console.log('enter end');onTransitionEnd();}}
                            onLeaveStart = {()=>{console.log('leave start');onTransitionStart();}}
                            onLeaveEnd = {()=>{console.log('leave end');onTransitionEnd();}}
                        >
                            {React.cloneElement(this.props.children, {
                                key: this.props.location.pathname
                                })}
                        </CSSTransitionGroup>
                    </main>
                    <footer>
                        <div className="column">
                            <Localized />
                            <LocalizedBinded />
                        </div>
                        <div className="column">
                            <Languages />
                        </div>
                    </footer>
                </div>
            </IntlProvider>
        );
    }
}

//const mapStateToAppProps = (state) => {
//    return {
//        location: state.routing.location
//    };
//};

const mapDisapatchToAppProps = (dispatch) => {
    return {
        onTransitionStart: () => {
            dispatch(activateTransition());
        },
        onTransitionEnd: () => {
            dispatch(deactivateTransition());
        }
    };
}

export default connect(
    null,//mapStateToAppProps,
    mapDisapatchToAppProps
)(App);

//use classnames package
//use bem for styling