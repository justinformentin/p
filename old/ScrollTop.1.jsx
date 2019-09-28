import React from 'react';
// import TweenFunctions from 'tween-functions';
import PropTypes from 'prop-types';
// import detectPassiveEvents from './detect';

const TweenFunctions = {
  easeOutCubic(t, b, _c, d) {
    const c = _c - b;
    return c * ((t = t / d - 1) * t * t + 1) + b;
  },
};

export const detectPassiveEvents = {
  update() {
    if (typeof window !== 'undefined' && typeof window.addEventListener === 'function') {
      let passive = false;
      const options = Object.defineProperty({}, 'passive', {
        get() {
          return (passive = true);
        },
      });

      const noop = () => {};
      window.addEventListener('testPassiveEventSupport', noop, options);
      window.removeEventListener('testPassiveEventSupport', noop, options);
      detectPassiveEvents.hasSupport = passive;
    }
  },
};

detectPassiveEvents.update();

class ScrollTop extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ToggleScrollUp: '' };
    this.Animation = {
      StartPosition: 0,
      CurrentAnimationTime: 0,
      StartTime: null,
      AnimationFrame: null,
    };
    this.HandleScroll = this.HandleScroll.bind(this);
    this.StopScrollingFrame = this.StopScrollingFrame.bind(this);
    this.ScrollingFrame = this.ScrollingFrame.bind(this);
    this.HandleClick = this.HandleClick.bind(this);
  }

  componentDidMount() {
    this.HandleScroll(); // run HandleScroll() at mount incase we are already scrolled down
    window.addEventListener('scroll', this.HandleScroll);
    window.addEventListener(
      'wheel',
      this.StopScrollingFrame,
      detectPassiveEvents.hasSupport ? { passive: true } : false
    ); // Stop animation if user mouse wheels during animation.
    window.addEventListener(
      'touchstart',
      this.StopScrollingFrame,
      detectPassiveEvents.hasSupport ? { passive: true } : false
    ); // Stop animation if user touches the screen during animation.
  }

  componentWillUnmount() {
    // Remove all events, since component is no longer mounted.
    window.removeEventListener('scroll', this.HandleScroll);
    window.removeEventListener('wheel', this.StopScrollingFrame, false);
    window.removeEventListener('touchstart', this.StopScrollingFrame, false);
  }

  HandleScroll() {
    const { ShowAtPosition, TransitionClassName } = this.props;
    // window.pageYOffset = current scroll position
    // ShowAtPosition = position at which we want the button to show.
    if (window.pageYOffset > ShowAtPosition) {
      // styles.Toggled = the class name we want applied to transition the button in.
      this.setState({ ToggleScrollUp: TransitionClassName });
    } else {
      // remove the class name
      this.setState({ ToggleScrollUp: '' });
    }
  }

  HandleClick() {
    this.StopScrollingFrame(); // Stoping all AnimationFrames
    this.Animation.StartPosition = window.pageYOffset; // current scroll position
    this.Animation.CurrentAnimationTime = 0;
    this.Animation.StartTime = null;
    // Start the scrolling animation.
    this.Animation.AnimationFrame = window.requestAnimationFrame(this.ScrollingFrame);
  }

  ScrollingFrame() {
    const { StopPosition, EasingType, AnimationDuration } = this.props;
    const timestamp = Math.floor(Date.now());
    // If StartTime has not been assigned a value, assign it the start timestamp.
    if (!this.Animation.StartTime) {
      this.Animation.StartTime = timestamp;
    }

    // set CurrentAnimationTime every iteration of ScrollingFrame()
    this.Animation.CurrentAnimationTime = timestamp - this.Animation.StartTime;
    // if we hit the StopPosition, StopScrollingFrame()
    if (window.pageYOffset <= StopPosition) {
      this.StopScrollingFrame();
    } else {
      // Otherwise continue ScrollingFrame to the StopPosition.
      // Does not support horizontal ScrollingFrame.
      // Let TweenFunctions handle the math to give us a new position based on AnimationDuration and EasingType type
      let YPos = TweenFunctions[EasingType](
        this.Animation.CurrentAnimationTime,
        this.Animation.StartPosition,
        StopPosition,
        AnimationDuration
      );
      if (YPos <= StopPosition) {
        YPos = StopPosition;
      }
      window.scrollTo(0, YPos);
      // Request another frame to be painted
      this.Animation.AnimationFrame = window.requestAnimationFrame(this.ScrollingFrame);
    }
  }

  StopScrollingFrame() {
    window.cancelAnimationFrame(this.Animation.AnimationFrame);
  }

  render() {
    const { children, style, ToggledStyle, ContainerClassName } = this.props;
    const { ToggleScrollUp } = this.state;
    if (children) {
      const childrenWithProps = React.Children.map(children, child =>
        React.cloneElement(child, {
          className: this.className,
        })
      );
      return (
        <aside
          role="button"
          aria-label="Scroll to top of page"
          tabIndex={ToggleScrollUp ? 0 : -1}
          data-testid="react-scroll-up-button"
          style={{
            ...style,
            ...(ToggleScrollUp && ToggledStyle),
          }}
          className={`${ContainerClassName} ${ToggleScrollUp}`}
          onClick={this.HandleClick}
          onKeyPress={this.HandleClick}
        >
          {childrenWithProps}
        </aside>
      );
    }
  }
}

export default ScrollTop;

export const VerticalButton = props => {
  const styles = {
    MainStyle: {
      // backgroundColor: 'rgb(58, 56, 56)',
      fontWeight: 'bold',
      position: 'fixed',
      bottom: 60,
      padding: '5px 10px',
      borderRadius: '10px',
      WebkitTransition: 'all 0.5s ease-in-out',
      transition: 'all 0.5s ease-in-out',
      transitionProperty: 'opacity, right',
      cursor: 'pointer',
      opacity: 0,
      right: -75,
      transform: 'rotate(-90deg)',
      zIndex: '100',
    },
    ToggledStyle: {
      opacity: 1,
      right: 10,
    },
  };
  const { style, ToggledStyle } = props;
  return (
    <ScrollTop
      {...props}
      style={{
        ...styles.MainStyle,
        ...style,
      }}
      ToggledStyle={{
        ...styles.ToggledStyle,
        ...ToggledStyle,
      }}
    >
      <span style={{ fontSize: 18, color: 'black' }}>To Top -></span>
    </ScrollTop>
  );
};

ScrollTop.defaultProps = {
  ContainerClassName: 'ScrollUpButton__Container',
  StopPosition: 0,
  ShowAtPosition: 150,
  EasingType: 'easeOutCubic',
  AnimationDuration: 1000,
  TransitionClassName: 'ScrollUpButton__Toggled',
  style: {},
  ToggledStyle: {},
  children: null,
};

function LessThanShowAtPosition(props, propName, componentName) {
  const { ShowAtPosition } = props;
  if (props[propName]) { // eslint-disable-line
    const value = props[propName];
    if (typeof value === 'number') {
      if (value >= ShowAtPosition) {
        // Validate the incoming prop value againt the ShowAtPosition prop
        return new Error(
          `${propName} (${value}) in ${componentName} must be less then prop: ShowAtPosition (${ShowAtPosition})`
        );
      }
      return null;
    }
    return new Error(`${propName} in ${componentName} must be a number.`);
  }
  return null;
}

ScrollTop.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  StopPosition: LessThanShowAtPosition,
  ShowAtPosition: PropTypes.number, // show button under this position,
  EasingType: PropTypes.oneOf(['easeOutCubic']),
  AnimationDuration: PropTypes.number, // seconds
  style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  ToggledStyle: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  ContainerClassName: PropTypes.string,
  TransitionClassName: PropTypes.string,
};
