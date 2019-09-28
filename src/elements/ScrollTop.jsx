import React from 'react';
import PropTypes from 'prop-types';

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
    this.HandleScroll();
    window.addEventListener('scroll', this.HandleScroll);
    window.addEventListener(
      'wheel',
      this.StopScrollingFrame,
      detectPassiveEvents.hasSupport ? { passive: true } : false
    );
    window.addEventListener(
      'touchstart',
      this.StopScrollingFrame,
      detectPassiveEvents.hasSupport ? { passive: true } : false
    );
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.HandleScroll);
    window.removeEventListener('wheel', this.StopScrollingFrame, false);
    window.removeEventListener('touchstart', this.StopScrollingFrame, false);
  }

  HandleScroll() {
    const { ShowAtPosition, TransitionClassName } = this.props;

    if (window.pageYOffset > ShowAtPosition) {
      this.setState({ ToggleScrollUp: TransitionClassName });
    } else {
      this.setState({ ToggleScrollUp: '' });
    }
  }

  HandleClick() {
    this.StopScrollingFrame();
    this.Animation.StartPosition = window.pageYOffset;
    this.Animation.CurrentAnimationTime = 0;
    this.Animation.StartTime = null;
    this.Animation.AnimationFrame = window.requestAnimationFrame(this.ScrollingFrame);
  }

  ScrollingFrame() {
    const { StopPosition, EasingType, AnimationDuration } = this.props;
    const timestamp = Math.floor(Date.now());

    if (!this.Animation.StartTime) {
      this.Animation.StartTime = timestamp;
    }

    this.Animation.CurrentAnimationTime = timestamp - this.Animation.StartTime;
    if (window.pageYOffset <= StopPosition) {
      this.StopScrollingFrame();
    } else {
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
      this.Animation.AnimationFrame = window.requestAnimationFrame(this.ScrollingFrame);
    }
  }

  StopScrollingFrame() {
    window.cancelAnimationFrame(this.Animation.AnimationFrame);
  }

  render() {
    const styles = {
      MainStyle: {
        backgroundColor: 'rgba(50, 50, 50, 0.5)',
        boxShadow: '3px 3px 10px rgba(0, 0, 0, 0.4)',
        borderRadius: '10px',
        height: 50,
        position: 'fixed',
        bottom: 20,
        width: 50,
        WebkitTransition: 'all 0.5s ease-in-out',
        transition: 'all 0.5s ease-in-out',
        transitionProperty: 'opacity, right',
        cursor: 'pointer',
        opacity: 0,
        right: -50,
        zIndex: 1000,
      },
      SvgStyle: {
        display: 'inline-block',
        width: '100%',
        height: '100%',
        strokeWidth: 0,
        stroke: 'white',
        fill: 'white',
      },
      ToggledStyle: {
        opacity: 1,
        right: 20,
      },
    };
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
    return (
      <aside
        role="button"
        aria-label="Scroll to top of page"
        tabIndex={ToggleScrollUp ? 0 : -1}
        data-testid="react-scroll-up-button"
        className={`${ContainerClassName} ${ToggleScrollUp}`}
        style={{
          ...styles.MainStyle,
          ...style,
          ...(ToggleScrollUp && styles.ToggledStyle),
          ...(ToggleScrollUp && ToggledStyle),
        }}
        onClick={this.HandleClick}
        onKeyPress={this.HandleClick}
      >
        <svg
          viewBox="0 0 32 32"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          x="0"
          y="0"
          xmlSpace="preserve"
          style={styles.SvgStyle}
        >
          <path
            transform="scale(1.1) translate(4,-2)"
            d="M19.196 23.429q0 0.232-0.179 0.411l-0.893 0.893q-0.179 0.179-0.411 0.179t-0.411-0.179l-7.018-7.018-7.018 7.018q-0.179 0.179-0.411 0.179t-0.411-0.179l-0.893-0.893q-0.179-0.179-0.179-0.411t0.179-0.411l8.321-8.321q0.179-0.179 0.411-0.179t0.411 0.179l8.321 8.321q0.179 0.179 0.179 0.411zM19.196 16.571q0 0.232-0.179 0.411l-0.893 0.893q-0.179 0.179-0.411 0.179t-0.411-0.179l-7.018-7.018-7.018 7.018q-0.179 0.179-0.411 0.179t-0.411-0.179l-0.893-0.893q-0.179-0.179-0.179-0.411t0.179-0.411l8.321-8.321q0.179-0.179 0.411-0.179t0.411 0.179l8.321 8.321q0.179 0.179 0.179 0.411z" // eslint-disable-line
          />
        </svg>
      </aside>
    );
  }
}

export default ScrollTop;

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
  if (props[propName]) {
    const value = props[propName];
    if (typeof value === 'number') {
      if (value >= ShowAtPosition) {
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
  ShowAtPosition: PropTypes.number,
  EasingType: PropTypes.oneOf(['easeOutCubic']),
  AnimationDuration: PropTypes.number,
  style: PropTypes.object,
  ToggledStyle: PropTypes.object,
  ContainerClassName: PropTypes.string,
  TransitionClassName: PropTypes.string,
};
