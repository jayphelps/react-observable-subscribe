import React, { Component } from 'react';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/throttleTime';
import Subscribe from 'react-observable-subscribe';

export default
class Example extends Component {
  render() {
    return (
      <div>
        <div>
          <h3>Every 100ms:</h3>
          <div>
            <Subscribe>{this.props.stream}</Subscribe>
          </div>
        </div>
        <div>
          <h3>Every 1s:</h3>
          <div>
            <Subscribe>{this.props.stream.throttleTime(1000)}</Subscribe>
          </div>
        </div>
        <div>
          <h3>Every 100ms, returning an &lt;input&gt; element: </h3>
          <div>
            <Subscribe>
              {this.props.stream.map(
                num => <input value={num} readOnly />
              )}
            </Subscribe>
          </div>
        </div>
      </div>
    );
  }
}
