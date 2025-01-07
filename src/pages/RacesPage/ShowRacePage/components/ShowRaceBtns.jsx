import styled from "styled-components";
import Btn from "@components/Btn/Btn";
import Dropdown from "@components/Btn/BtnDropdown";

const StyledBtns = styled.div`
  margin-bottom: ${({ $noBtns }) => ($noBtns ? "0" : "1rem")};
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

export default function ShowRaceBtns({ race }) {
  const { status, results_links, live_links } = race;

  const isLive = status === "ongoing";
  const liveTime = live_links?.find((link) => link.name === "timing");
  const liveStream = live_links?.find((link) => link.name === "streaming");

  const showTimingBtn = liveTime && isLive;
  const showStreamingBtn = liveStream && isLive;
  const noBtns = !showTimingBtn && !showStreamingBtn && !results_links;

  function openLink(link) {
    window.open(link, "_blank");
  }

  return (
    <StyledBtns $noBtns={noBtns}>
      {showTimingBtn && (
        <Btn color="red" onClick={() => openLink(liveTime.url)}>
          Live Timing
        </Btn>
      )}
      {showStreamingBtn && (
        <Btn color="red" onClick={() => openLink(liveStream.url)}>
          Live Streaming
        </Btn>
      )}

      {results_links?.length === 1 && (
        <Btn onClick={() => openLink(results_links[0].url)}>Results</Btn>
      )}
      {results_links?.length > 1 && (
        <Dropdown
          items={results_links}
          onItemSelect={(item) => openLink(item.url)}
          buttonLabel="Results"
          itemLabel="category"
        />
      )}
    </StyledBtns>
  );
}
