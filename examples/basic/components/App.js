import React, { Component } from 'react';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/startWith';
import Example from './Example';

export default
class App extends Component {
  render() {
    // However you get your stream, e.g. redux or traditional state management
    // Can be any Observable that has observable[Symbol.observable]() which
    // is part of the TC39 observable spec for interop
    const stream = Observable.interval(100).startWith('--');
    return (
      <div>
        <h1>Example of Observable streaming</h1>
        <Example stream={stream} />
      </div>
    );
  }
}
