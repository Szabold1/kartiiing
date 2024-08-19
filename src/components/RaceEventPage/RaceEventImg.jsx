import styled from "styled-components";
import { useEffect, useState } from "react";

const StyledImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: ${({ theme }) =>
    theme.name === "dark" ? "brightness(0.6)" : "brightness(0.9)"};
`;

export default function RaceEventImg({ ...race }) {
  const { series, end_date, engine_type } = race;
  const [selectedSeries, setSelectedSeries] = useState(series[0]);
  const [imgSrc, setImgSrc] = useState(null);
  const fallbackImg = "/kartiiing/assets/images/series/default.jpg";

  // Set the image src based on the selected series and the race year
  useEffect(() => {
    async function loadImage() {
      // Select a random series if there are multiple
      if (series?.length > 1) {
        const randomIndex = Math.floor(Math.random() * series.length);
        const selected = series[randomIndex];
        setSelectedSeries(selected);
      }

      const currentYear = new Date().getFullYear();
      const raceYear = new Date(end_date).getFullYear();

      // Function to try loading the image
      function tryLoadImage(seriesName, year, engineType) {
        return new Promise((resolve, reject) => {
          const seriesModified = seriesName.replaceAll(" ", "-").toLowerCase();
          let basePath = `/kartiiing/assets/images/series/${seriesModified}/`;

          if (
            seriesModified === "fia-european-championship" ||
            seriesModified === "fia-world-championship"
          ) {
            basePath += `${engineType[0].toLowerCase()}/`;
          }

          const image = new Image();
          const imageUrl = basePath + `${seriesModified}_${year}.jpg`;
          image.src = imageUrl;

          image.onload = () => resolve(imageUrl);
          image.onerror = () =>
            reject(new Error(`Image for ${seriesName} in ${year} not found.`));
        });
      }

      // Try loading the image for the race year
      try {
        const imgUrl = await tryLoadImage(
          selectedSeries,
          raceYear,
          engine_type
        );
        setImgSrc(imgUrl);
      } catch {
        // Try loading the image for the next and previous years if the race year was not found
        let imgFound = false;
        let offset = 1;
        while (!imgFound) {
          try {
            const nextYear = raceYear + offset;
            const prevYear = raceYear - offset;

            if (nextYear <= currentYear) {
              const imgUrl = await tryLoadImage(
                selectedSeries,
                nextYear,
                engine_type
              );
              setImgSrc(imgUrl);
              imgFound = true;
            }
            if (!imgFound && prevYear > 2000) {
              const imgUrl = await tryLoadImage(
                selectedSeries,
                prevYear,
                engine_type
              );
              setImgSrc(imgUrl);
              imgFound = true;
            }

            if (!imgFound && nextYear > currentYear && prevYear <= 2000) {
              setImgSrc(fallbackImg);
              console.error(`No image found for ${selectedSeries}`);
              imgFound = true;
            }
          } catch (e) {
            console.warn(e.message);
          }

          offset++;
        }
      }
    }

    loadImage();
  }, [series, end_date, selectedSeries, engine_type]);

  return (
    <StyledImg
      alt={"Image for " + selectedSeries}
      src={imgSrc || fallbackImg}
    />
  );
}
