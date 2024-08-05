import styled from "styled-components";

const StyledDate = styled.div`
  background-color: inherit;
  border: 1.5px solid ${({ theme }) => theme.colors.accent[0]};

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  text-transform: uppercase;
  font-weight: 600;
  padding: 0.7rem;
  margin-top: -1.2rem;
  border-radius: 0.6rem;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.2);
  width: 65%;

  & div {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
  }

  @media screen and (min-width: 70rem) {
    border: none;
    border-radius: 0;
    border-right: 1.5px solid ${({ theme }) => theme.colors.accent[0]};
    width: auto;
    margin-top: 0;
    justify-content: flex-end;
    padding-right: 1.4rem;
    min-width: 9.9rem;
    box-shadow: none;
  }
`;

function formatDate(date) {
  if (!date) return { day: null, month: null };

  const dateObj = new Date(date);
  const day = dateObj.getDate();
  const month = dateObj.toLocaleDateString("en-US", { month: "short" });

  return { day, month };
}

export default function EventItemDate({ date }) {
  const { day: dayStart, month: monthStart } = formatDate(date?.start);
  const { day: dayEnd, month: monthEnd } = formatDate(date?.end);

  if (!date) {
    return (
      <StyledDate>
        <span>TBD</span>
      </StyledDate>
    );
  }

  return (
    <StyledDate>
      {dayStart && monthStart && (
        <div>
          <span>{monthStart}</span>
          <span>{dayStart}</span>
        </div>
      )}

      {dayStart && dayEnd && <span>-</span>}

      {dayEnd && monthEnd && (
        <div>
          {monthStart !== monthEnd && <span>{monthEnd}</span>}
          <span>{dayEnd}</span>
        </div>
      )}
    </StyledDate>
  );
}
