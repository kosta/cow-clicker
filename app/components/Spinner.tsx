import "@/components/Spinner.css";

export default function Spinner() {
  return (
    <div className="spinner_container" role="status" aria-label="Loading">
      <div className="spinner" />
    </div>
  );
}
