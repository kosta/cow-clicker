import "@/components/Spinner.css";

export interface SpinnerProps {
  className?: string;
}

export default function Spinner({ className }: SpinnerProps) {
  return (
    <div className={`${className} spinner_container`} role="status" aria-label="Loading" aria-live="polite" aria-busy="true">
      <div className="spinner" aria-hidden="true" />
    </div>
  );
}
