import "@/components/Spinner.css";

export default function Spinner() {
  return (
    <div className="spinner_container" role="status" aria-label="Loading" aria-live="polite" aria-busy="true">
      <div className="spinner" aria-hidden="true" />
    </div>
  );
}
