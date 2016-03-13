import React from 'react';
import {IntlProvider} from 'react-intl';
import {connect} from 'react-redux';

import CurrentLocaleLink from './currentLocaleLink'
import Languages from './languages';
import Localized from './localized';
import LocalizedBinded from './localizedBinded';
import {getLocale, getLocaleOrDefault} from 'js/utils/utils';
import {activateTransition, deactivateTransition} from 'js/actionCreators/actionCreators';
import RoutingMotion from './routingMotion';

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
            test: '123',
            stiffness: 1
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
            <IntlProvider key={localeOrDefault} locale={locale} messages={getMessages(localeOrDefault)}>
                <div className="body">
                    <header>header</header>
                    <div className="content">
                        <main className="main">content</main>
                        <nav className="nav">nav</nav>
                        <aside className="ads">ads</aside>
                    </div>
                    <footer>footer</footer>
                </div>
            </IntlProvider>
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
            //<div>
            //    <button onClick={()=>{this.setState({stiffness: this.state.stiffness + 1})}}>
            //        increase
            //    </button>
            //    <button onClick={()=>{this.setState({stiffness: Math.max(this.state.stiffness - 1, 0)})}}>
            //        decrease
            //    </button>
            //
            //    <Motion defaultStyle={{x: 0}} style={{x: spring(1000, {stiffness: this.state.stiffness, damping: 26})}}>
            //        {interpolatingStyle => <div
            //            style={{transform: `translateX(${interpolatingStyle.x}%)`, backgroundColor: '#666', width: '100px', height: '100px'}}/>}
            //    </Motion>
            //</div>
  //          <StaggeredMotion
  //              defaultStyles={[{h: 0}, {h: 0}, {h: 0}]}
  //              styles={prevInterpolatedStyles => prevInterpolatedStyles.map((_, i) => {
  //  return i === 0
  //    ? {h: spring(100,{stiffness: 10})}
  //    : {h: spring(prevInterpolatedStyles[i - 1].h,{stiffness: 10})}
  //})}>
  //              {interpolatingStyles =>
  //              <div>
  //                  {interpolatingStyles.map((style, i) =>
  //                  <div key={i} style={{border: '1px solid', backgroundColor: '#555', height: style.h}} />)
  //                      }
  //              </div>
  //                  }
  //          </StaggeredMotion>
  //          <IntlProvider key={localeOrDefault} locale={locale} messages={getMessages(localeOrDefault)}>
  //              <div>
  //                  {location.pathname}
  //                  <header>Good Stories</header>
  //                  <nav>
  //                      <ul>
  //                          <li><CurrentLocaleLink to="/">Главная</CurrentLocaleLink></li>
  //                          <li><CurrentLocaleLink to="/quilts">Одеяла</CurrentLocaleLink></li>
  //                          <li><CurrentLocaleLink to="/blog">Блог</CurrentLocaleLink></li>
  //                      </ul>
  //                  </nav>
  //                  <main>
  //                      <RoutingMotion location={this.props.location}>
  //                          {this.props.children}
  //                      </RoutingMotion>
  //                  </main>
  //                  <footer>
  //                      <div className="column">
  //                          <Localized />
  //                          <LocalizedBinded />
  //                      </div>
  //                      <div className="column">
  //                          <Languages />
  //                      </div>
  //                  </footer>
  //              </div>
  //          </IntlProvider>
        );
    }
}

export default App;

//use classnames package
//use bem for styling