import { columns } from "./ideas.data";
import { useIdeaSpinner } from "./useIdeaSpinner";

const label = Object.fromEntries(columns.map((c) => [c.id, c.label]));

function Slot({ id, value, onCycle }) {
  return (
    <button
      type="button"
      onClick={() => onCycle(id)}
      aria-label={`${label[id]}: ${value}. Press to change.`}
      className="rounded-md text-left underline decoration-[6px] underline-offset-[10px] transition-colors hover:bg-navy/10">
      {value}
    </button>
  );
}
// The sentence is the headline: every highlighted phrase is a control.
export function IdeaSpinner({ children }) {
  const { values, cycle, shuffle } = useIdeaSpinner();

  return (
    <div id="generator" className="scroll-mt-24">
      <p
        aria-live="polite"
        className="mt-6 max-w-4xl font-display text-4xl font-bold leading-[1.5] sm:text-6xl sm:leading-[1.45]">
        A <Slot id="tech" value={values.tech} onCycle={cycle} /> that helps{" "}
        <Slot id="market" value={values.market} onCycle={cycle} />{" "}
        <Slot id="value" value={values.value} onCycle={cycle} />.
      </p>
      <div className="mt-10 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={shuffle}
          className="rounded-lg bg-navy text-white px-5 py-3 font-semibold text-sun transition-colors hover:bg-navy/85">
          Shuffle all three
        </button>
        {children}
      </div>
    </div>
  );
}
