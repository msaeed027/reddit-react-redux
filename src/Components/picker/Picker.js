import React from "react";

export default function Picker({ value, options, onChange }) {
  return (
    <>
      <h1>{value}</h1>
      <select value={value} onChange={e => onChange(e.target.value)}>
        {options.map(option => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </select>
    </>
  );
}
