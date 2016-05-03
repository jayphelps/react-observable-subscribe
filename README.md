react-observable-subscribe
=========================

Subscribe to an Observable declaratively with the `<Subscribe>{observable}</Subscribe>` component.

## Install

```bash
npm install --save react-observable-subscribe
```

## Usage

This library default export is a `Subscribe` component which you can use in your JSX to declaratively subscribe and render Observable streams. Just pass the observable as the only child to the the component.

```js
import Subscribe from 'react-observable-subscribe';
// ...other imports

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
          <h3>Every 100ms wrapped in &lt;b&gt; element: </h3>
          <div>
            <Subscribe>
              {this.props.stream.map(
                num => <b>{num}</b>
              )}
            </Subscribe>
          </div>
        </div>
      </div>
    );
  }
}

// This Observable will emit an incrementing
// number every 100ms
let = stream Observable.interval(100);
ReactDOM.render(<Example stream={stream} />, container);

```
You can apply any operators you want to your observable before passing it to `<Subscribe>`--you don't have to use RxJS, the only requirement is the the observable supports `observable[Symbol.observable]()` from the TC39 spec.

When the Observable pumps new values (i.e. onNext) only that section will re-render, not the component in which you declare it, so it's very efficient.