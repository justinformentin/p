import React, { useState, useEffect } from "react";

export const ScrollTop = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    const el = document.querySelector("#child-container");
    setIsScrolled(el.scrollTop > 450)
  };

  const scrollUp = () => {
    const el = document.querySelector("#child-container");
    el.scrollTop = 0;
    setIsScrolled(false)
  }

  useEffect(() => {
    const el = document.querySelector("#child-container");
    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  const styles = {
    MainStyle: {
      backgroundColor: "rgba(50, 50, 50, 0.5)",
      boxShadow: "3px 3px 10px rgba(0, 0, 0, 0.4)",
      borderRadius: "10px",
      height: 50,
      position: "fixed",
      bottom: 20,
      width: 50,
      WebkitTransition: "all 0.5s ease-in-out",
      transition: "all 0.5s ease-in-out",
      transitionProperty: "opacity, right",
      cursor: "pointer",
      opacity: 0,
      right: -50,
      zIndex: 1000
    },
    SvgStyle: {
      display: "inline-block",
      width: "100%",
      height: "100%",
      strokeWidth: 0,
      stroke: "white",
      fill: "white"
    },
    ToggledStyle: {
      opacity: 1,
      right: 20
    }
  };

  return (
    <aside
      role="button"
      aria-label="Scroll to top of page"
      tabIndex={isScrolled ? 0 : -1}
      data-testid="react-scroll-up-button"
      style={{
        ...styles.MainStyle,
        ...(isScrolled && styles.ToggledStyle)
      }}
      onClick={scrollUp}
      onKeyPress={scrollUp}
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
};

export default ScrollTop;
