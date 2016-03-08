import React from 'react';

class Blog extends React.Component {
  render() {
    return (
        <div className="test-bc2" style={this.props.style}>
          <ul>
            <li>Post #1</li>
            <li>Post #2</li>
            <li>Post #3</li>
            <li>Post #4</li>
            <li>Post #5</li>
          </ul>
        </div>
    );
  }
}

export default Blog;
