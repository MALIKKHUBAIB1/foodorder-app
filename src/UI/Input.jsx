import React from "react";

function Input({ label, id, ...props }) {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input name={id} id={id} required {...props} />
    </>
  );
}

export default Input;
