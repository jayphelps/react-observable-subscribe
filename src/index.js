import React, { Component, Children, isValidElement } from 'react';
import $$observable from 'symbol-observable';

const ERROR_NOT_AN_OBSERVABLE = '<Subscribe> only accepts a single child, an Observable that conforms to observable[Symbol.observable]()';

function childrenToObservable(children) {
  if (typeof children === 'array') {
    if (children.length > 1) {
      throw new TypeError(ERROR_NOT_AN_OBSERVABLE);
    }

    children = children[0];
  }

  if ($$observable in children === false) {
    throw new TypeError(ERROR_NOT_AN_OBSERVABLE);
  }

  return children[$$observable]();
}

export default
class Subscribe extends Component {
  subscription = null;

  state = {
    element: null
  };

  setupSubscription() {
    const { children } = this.props;
    if (children !== undefined || children !== null) {
      this.subscription = childrenToObservable(children).subscribe(element => {
        this.setState({ element });
      });
    }
  }

  teardownSubscription() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  componentWillMount() {
    this.setupSubscription();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.children !== this.props.children) {
      this.teardownSubscription();
      this.setupSubscription();
    }
  }

  componentWillUmount() {
    this.teardownSubscription();
  }

  render() {
    const { element } = this.state;
    return (
      isValidElement(element)
        ? element
        : <span>{element}</span>
    );
  }
}
