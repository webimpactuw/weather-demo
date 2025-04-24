import Spinner from "./ui/spinner";

export default function Loader() {
  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <Spinner />
      <p>Fetching data...</p>
    </div>
  );
}
