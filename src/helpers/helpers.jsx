import React from "react";

// Display a list of items sorted in alphabetical order with separators
function renderSortedArray(arr) {
  if (!arr) return null;
  return (
    <>
      {arr.sort().map((item, index) => (
        <React.Fragment key={index}>
          <span>{item}</span>
          {index < arr.length - 1 ? <span className="separator">-</span> : ""}
        </React.Fragment>
      ))}
    </>
  );
}

export { renderSortedArray };
