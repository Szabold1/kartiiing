import styled from "styled-components";

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

export default function ModalBackdrop({ children, show }) {
  return <StyledBackdrop $show={show}>{children}</StyledBackdrop>;
}
