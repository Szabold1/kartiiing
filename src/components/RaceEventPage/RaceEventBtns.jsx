import styled from "styled-components";
import RaceEventBtnResults from "./RaceEventBtnResults";
import Btn from "../Btn";

const StyledRaceEventBtns = styled.div`
  margin-bottom: ${({ $noBtns }) => ($noBtns ? "0" : "1rem")};
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

export default function RaceEventBtns({ ...race }) {
  const { status, results_links, live_links } = race;

  const isLive = status === "upcoming";
  const liveTime = live_links?.find((link) => link.name === "timing");
  const liveStream = live_links?.find((link) => link.name === "streaming");

  const showTimingBtn = liveTime && isLive;
  const showStreamingBtn = liveStream && isLive;
  const noBtns = !showTimingBtn && !showStreamingBtn && !results_links;

  function openLink(link) {
    window.open(link, "_blank");
  }

  return (
    <StyledRaceEventBtns $noBtns={noBtns}>
      {showTimingBtn && (
        <Btn live={true} onClick={() => openLink(liveTime.url)}>
          Live Timing
        </Btn>
      )}

      {showStreamingBtn && (
        <Btn live={true} onClick={() => openLink(liveStream.url)}>
          Live Streaming
        </Btn>
      )}

      {results_links && (
        <RaceEventBtnResults results={results_links} openLink={openLink} />
      )}
    </StyledRaceEventBtns>
  );
}
