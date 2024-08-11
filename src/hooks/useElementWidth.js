import { useState, useEffect, useRef } from "react";

// hook which returns ref (the element) and its width
export default function useElementWidth() {
  const [width, setWidth] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    // create resize observer which will set the width to the observed element's width
    const observer = new ResizeObserver((entries) => {
      if (entries[0]) setWidth(entries[0].contentRect.width);
    });

    // observe the ref element
    if (element) observer.observe(element);

    // unobserve when component unmounts
    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return { ref, width };
}
