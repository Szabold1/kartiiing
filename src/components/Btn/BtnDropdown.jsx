import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import { IoChevronDownOutline, IoChevronUpOutline } from "react-icons/io5";
import Btn from "@components/Btn/Btn";

const StyledDropdown = styled.div`
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

export default function BtnDropdown({
  items,
  onItemSelect,
  buttonLabel,
  itemLabel,
}) {
  const ref = useRef();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleButtonClick = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleItemClick = (item) => {
    onItemSelect(item);
    setShowDropdown(false);
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target))
        setShowDropdown(false);
    };

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  return (
    <div style={{ position: "relative" }} ref={ref}>
      <Btn onClick={handleButtonClick}>
        {buttonLabel}
        <span style={{ marginRight: "-0.15rem", display: "flex" }}>
          {showDropdown ? <IoChevronUpOutline /> : <IoChevronDownOutline />}
        </span>
      </Btn>

      <StyledDropdown $show={showDropdown}>
        {items?.map((item, index) => (
          <span key={index} onClick={() => handleItemClick(item)}>
            {item[itemLabel] ? item[itemLabel] : item}
          </span>
        ))}
      </StyledDropdown>
    </div>
  );
}
