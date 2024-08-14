import React from "react";

// Display a list of items sorted in alphabetical order with separators
function renderArray(arr, sort = false) {
  if (!arr) return null;
  const sortedArr = sort ? arr.sort() : arr;

  return (
    <>
      {sortedArr.map((item, index) => (
        <React.Fragment key={index}>
          <span>{item}</span>
          {index < arr.length - 1 ? <span className="separator">-</span> : ""}
        </React.Fragment>
      ))}
    </>
  );
}

export { renderArray };
