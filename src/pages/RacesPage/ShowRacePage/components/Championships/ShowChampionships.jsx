import useRaces from "@hooks/useRaces";
import ShowChampionshipRaces from "./ShowChampionshipRaces";

export default function ShowChampionships({ race }) {
  const { data } = useRaces();

  return (
    <>
      {race.championships.map((championship) => (
        <ShowChampionshipRaces
          key={championship}
          championship={championship}
          data={data}
          initialYear={race.end_date.slice(0, 4)}
        />
      ))}
    </>
  );
}
