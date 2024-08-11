import styled from "styled-components";

const StyledDate = styled.div`
  font-size: 1.3rem;
  width: 2.4rem;
  height: 2.4rem;
  padding: 0.2rem;
  border-radius: 0.5rem;
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.accent[2]};
  box-shadow: 0 0 0.1rem rgba(0, 0, 0, 0.1);
  font-weight: 500;
  position: relative;

  > .month {
    font-size: 0.6rem;
    font-weight: 400;
    letter-spacing: 0.03rem;
    text-transform: uppercase;
  }
`;

// Accepts a date string and returns an object with 'day' and 'month' properties
function formatDate(date) {
  if (!date) return { day: null, month: null };

  const dateObj = new Date(date);
  const day = dateObj.getDate();
  const month = dateObj.toLocaleDateString("en-US", { month: "short" });

  return { day, month };
}

export default function RaceItemDate({ ...race }) {
  const { end_date } = race;
  const { day: dayEnd, month: monthEnd } = formatDate(end_date);

  if (!end_date) {
    return (
      <StyledDate>
        <span style={{ fontSize: "0.9rem" }}>TBD</span>
      </StyledDate>
    );
  }

  return (
    <StyledDate>
      <span className="month">{monthEnd}</span>
      <span>{dayEnd}</span>
    </StyledDate>
  );
}
