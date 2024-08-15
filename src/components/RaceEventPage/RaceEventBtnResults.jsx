import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import Btn from "../Btn";
import {
  IoChevronDownOutline,
  IoChevronUpOutline,
  IoArrowForwardOutline,
} from "react-icons/io5";

const StyledResultsDropdown = styled.div`
  position: absolute;
  left: 0;
  top: 3rem;
  background-color: ${({ theme }) => theme.colors.bg[1]};
  border: 1.5px solid ${({ theme }) => theme.colors.accent[0]};
  box-shadow: 0 0 0.3rem rgba(0, 0, 0, 0.2);
  border-radius: 0.5rem;
  padding: 0.3rem;
  z-index: 10;
  width: max-content;
  transition: visibility 0.15s ease-in-out, opacity 0.15s ease-in-out;
  pointer-events: ${({ $show }) => ($show ? "auto" : "none")};
  visibility: ${({ $show }) => ($show ? "visible" : "hidden")};
  opacity: ${({ $show }) => ($show ? 1 : 0)};

  > span {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.6rem;
    border-radius: 0.4rem;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.accent[0]};
    transition: all 0.15s ease-in-out;

    &:hover {
      background-color: ${({ theme }) => theme.colors.accent[2]};
    }
  }
`;

export default function RaceEventBtnResults({ results, openLink }) {
  const ref = useRef();
  const [showModal, setShowModal] = useState(false);

  // Handle button click
  function handleResultsClick() {
    if (results?.length === 1) openLink(results[0].url);
    else setShowModal((prev) => !prev);
  }

  // Handle dropdown item click
  function handleResultItemClick(link) {
    openLink(link);
    setShowModal(false);
  }

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setShowModal(false);
    }

    if (showModal) document.addEventListener("mousedown", handleClickOutside);
    else document.removeEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showModal]);

  return (
    <div style={{ position: "relative" }} ref={ref}>
      <Btn onClick={handleResultsClick}>
        Results
        <span style={{ marginRight: "-0.15rem", display: "flex" }}>
          {results?.length > 1 &&
            (showModal ? <IoChevronUpOutline /> : <IoChevronDownOutline />)}
          {results?.length === 1 && <IoArrowForwardOutline />}
        </span>
      </Btn>

      <StyledResultsDropdown $show={showModal}>
        {results?.map((result) => (
          <span
            key={result.url}
            onClick={() => handleResultItemClick(result.url)}
          >
            {result.category}
          </span>
        ))}
      </StyledResultsDropdown>
    </div>
  );
}
