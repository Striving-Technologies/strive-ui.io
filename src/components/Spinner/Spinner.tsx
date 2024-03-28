import { SpinnerProps } from "./Spinner.type";

const Spinner = ({ size = "medium", spinSpeed = 5 }: SpinnerProps) => {
  return (
    <span
      className="stc-spinner"
      data-spin-speed={spinSpeed}
      data-size={size}
    >
      <svg
        width="16"
        height="16"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
      >
        <circle
          cx="50"
          cy="50"
          fill="none"
          stroke="currentColor"
          strokeWidth="var(--stroke-width)"
          r="40"
          strokeDasharray="164.93361431346415 56.97787143782138"
          transform="rotate(159.821 50 50)"
        ></circle>
      </svg>
    </span>
  );
};

export default Spinner;
