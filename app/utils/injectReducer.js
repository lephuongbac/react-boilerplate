import React from 'react';
import PropTypes from 'prop-types';
import hoistNonReactStatics from 'hoist-non-react-statics';

import getInjectors from './reducerInjectors';

/* eslint-disable no-undef */

/**
 * Dynamically injects a reducer
 *
 * @param {string} key A key of the reducer
 * @param {function} reducer A reducer that will be injected
 *
 */
export default ({ key, reducer, isNamespaced = false }) => (WrappedComponent) => {
  class ReducerInjector extends React.Component {
    static WrappedComponent = WrappedComponent;
    static contextTypes = {
      store: PropTypes.object.isRequired,
    };
    static propTypes = {
      reducerKey: PropTypes.string,
    }
  
    static displayName = `withReducer(${(WrappedComponent.displayName || WrappedComponent.name || 'Component')})`;

    componentWillMount() {
      const { injectReducer } = this.injectors;

      injectReducer(
        isNamespaced ? (this.props.reducerKey || key) : key,
        isNamespaced ? reducer(this.props.reducerKey || key) : reducer
      );
    }

    injectors = getInjectors(this.context.store);

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return hoistNonReactStatics(ReducerInjector, WrappedComponent);
};
