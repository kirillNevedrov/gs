import React from 'react';

import AddQuilt from './addQuilt';
import QuiltList from './quiltList';

class Main extends React.Component {
  render() {
    return (
      <div>
          <AddQuilt />
          <QuiltList />
      </div>
    );
  }
}

export default Main;
