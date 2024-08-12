import styled from "styled-components";
import { useRef, useEffect } from "react";

const StyledBackdrop = styled.div`
  z-index: 130;
  position: fixed;
  right: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(0.1rem);
  -webkit-backdrop-filter: blur(0.1rem);
  transition: visibility 0.15s ease-in-out, opacity 0.15s ease-in-out;
  pointer-events: ${({ $show }) => ($show ? "auto" : "none")};
  visibility: ${({ $show }) => ($show ? "visible" : "hidden")};
  opacity: ${({ $show }) => ($show ? 1 : 0)};
`;

export default function ModalBackdrop({ children, show, onClose }) {
  const backdropRef = useRef();

  // Close modal if clicked outside (if backdrop is clicked)
  // and disable scrolling when modal is shown
  useEffect(() => {
    function handleClickOutside(e) {
      if (backdropRef.current && backdropRef.current === e.target) onClose();
    }

    if (show) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "";
    };
  }, [show, onClose]);

  return (
    <StyledBackdrop $show={show} ref={backdropRef}>
      {children}
    </StyledBackdrop>
  );
}
