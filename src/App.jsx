import EventList from "./components/EventList/EventList";

export default function App() {
  const style = {
    padding: "0 1rem",
    maxWidth: "100rem",
    margin: "0 auto",
  };
  return (
    <div style={style}>
      <EventList />
    </div>
  );
}
