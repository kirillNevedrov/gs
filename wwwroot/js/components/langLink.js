import React from 'react';
import { Link } from 'react-router'
import {injectIntl} from 'react-intl';

import {isDefaultLocale} from 'js/utils/utils';

class LangLink extends React.Component {
  render() {
      const {locale} = this.props.intl;
      const {to, children} = this.props;

    return (
        <Link to={isDefaultLocale(locale) ? to : '/' + locale + to}>{children}</Link>
    );
  }
}

export default injectIntl(LangLink);
