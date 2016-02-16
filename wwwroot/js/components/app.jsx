import React from 'react';

import LangLink from './langLink'
import Languages from './languages';
import Localized from './localized';

export class App extends React.Component {
    constructor(){
        super();
        this.state = {
            test: '123'
        };
    }
    //shouldComponentUpdate(nextProps, nextState) {
    //    return false;
    //}
    render() {
        return (
            <div>
                <header>Good Stories</header>
                <nav>
                    <ul>
                        <li><LangLink to="/">Главная</LangLink></li>
                        <li><LangLink to="/quilts">Одеяла</LangLink></li>
                        <li><LangLink to="/blog">Блог</LangLink></li>
                    </ul>
                </nav>
                <main>
                    {this.props.children}
                </main>
                <footer>
                    <Localized />
                    <Languages loc={this.props.params.locale}/>
                </footer>
            </div>
        );
    }
}

export default App;

//use classnames package
//use bem for styling
//{`/${this.props.params.locale ? this.props.params.locale : ''}`}