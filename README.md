react-observable-subscribe
=========================

Subscribe to an Observable declaratively with the `<Subscribe>{observable}</Subscribe>` component.

<a href="https://app.codesponsor.io/link/zs7vWiDv2F99bX6Ay7PJa5WE/jayphelps/react-observable-subscribe" rel="nofollow"><img src="https://app.codesponsor.io/embed/zs7vWiDv2F99bX6Ay7PJa5WE/jayphelps/react-observable-subscribe.svg" style="width: 888px; height: 68px;" alt="Sponsor" /></a>

## Install

```bash
npm install --save react-observable-subscribe
```

## Usage

This library's default export is a `Subscribe` component which you can use in your JSX to declaratively subscribe and render Observable streams. Just pass the observable as the only child to the the component.

You can apply any operators you want to your observable before passing it to `<Subscribe>`--you don't have to use [RxJS v5.0](https://github.com/ReactiveX/rxjs), the only requirement is the the observable supports `observable[Symbol.observable]()` [from the proposed Observable spec](https://github.com/zenparsing/es-observable#observable).

*This library doesn't come with any actual Observable implementation itself.*

```jsx
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
          <h3>Every 100ms w/ &lt;input&gt; element: </h3>
          <div>
            <Subscribe>
              {this.props.stream.map(
                value => <input value={value} readOnly />
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
let stream = Observable.interval(100);
ReactDOM.render(<Example stream={stream} />, container);

```
![ezgif-79206338](https://cloud.githubusercontent.com/assets/762949/14999593/166d7bbe-113f-11e6-9097-69dd24b76781.gif)

The observable can emit simple primitives (e.g. strings, numbers) or you can even emit JSX elements! Each "onNext" just needs to be a single value, arrays are not supported because of React limitations.

When the observable emits new values, only the content inside `<Subscribe>` will re-render, not the component in which you declare it, so it's very efficient.

Depending on your preferences, you might find it helpful to use a shorter name for `Subscribe` when you import it. Since it's the default export, what you name it is totally up to you:

```jsx
import Sub from 'react-observable-subscribe';

// etc

<div>
  <Sub>{stream.throttleTime(1000)}</Sub>
</div>
```
## Server-side rendering

If you do Server-side rendering with `React.renderToString`, it's important to note that since React doesn't support asynchronous rendering `<Subscribe>` will `subscribe()` to the stream but then immediately `unsubscribe()`, so any *synchronously emitted* value will be rendered, otherwise nothing. One approach to emit a synchronous value in RxJS v5 is the [`startWith(value)`](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-startWith) operator, e.g. you might emit some "Loading..." text or `<img src="spinner.gif />`.

```jsx
Observable.ajax('/some/resource/that/will/render/asynchronously')
  .map(event => event.response) // event == { response: 'async value', ... }
  .startWith('initial value rendered synchronously')
```

[Learn more about Schedulers in RxJS](https://github.com/ReactiveX/rxjs/blob/master/doc/scheduler.md)
