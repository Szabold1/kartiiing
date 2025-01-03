import React from "react";

// Display a list of items sorted in alphabetical order with separators
export default function RenderArray({ array, sort = false }) {
  if (!array) return null;
  const sortedArray = sort ? array.sort() : array;

  return (
    <>
      {sortedArray.map((item, index) => (
        <React.Fragment key={index}>
          <span>{item}</span>
          {index < array.length - 1 ? (
            <span className="separator">&middot;</span>
          ) : (
            ""
          )}
        </React.Fragment>
      ))}
    </>
  );
}
