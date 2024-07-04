import React from "react";

function Button({ children, textOnly, className, ...props }) {
  let classes = textOnly ? "text-button" : "button";
  classes += " " + className;
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}

export default Button;
