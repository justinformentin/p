import React, { PureComponent } from 'react';
import { TransitionGroup, Transition as ReactTransition } from 'react-transition-group';
import PropTypes from 'prop-types';

const timeout = 500;
const getTransitionStyles = {
  entering: {
    position: `absolute`,
    opacity: 0,
  },
  entered: {
    transition: `opacity ${timeout}ms ease-in-out`,
  },
  exiting: {
    transition: `all ${timeout}ms ease-in-out`,
  },
};

// const Transition = ({children, location}) => {
class Transition extends PureComponent {
  render() {
    const { children, location } = this.props;
    return (
      <TransitionGroup>
        <ReactTransition
          key={location.pathname}
          timeout={{
            enter: timeout,
            exit: timeout,
          }}
        >
          {status => (
            <div
              style={{
                ...getTransitionStyles[status],
              }}
            >
              {children}
            </div>
          )}
        </ReactTransition>
      </TransitionGroup>
    );
  }
}

export default Transition;

Transition.propTypes = {
  children: PropTypes.any.isRequired,
  location: PropTypes.any.isRequired,
};
