import { useCallback, useState } from "react";
import { columns } from "./ideas.data";

const initial = Object.fromEntries(columns.map((c) => [c.id, 0]));

export function useIdeaSpinner() {
  const [picks, setPicks] = useState(initial);

  const cycle = useCallback((id) => {
    const { options } = columns.find((c) => c.id === id);
    setPicks((p) => ({ ...p, [id]: (p[id] + 1) % options.length }));
  }, []);

  const shuffle = useCallback(() => {
    setPicks((prev) =>
      Object.fromEntries(
        columns.map((c) => {
          let next = Math.floor(Math.random() * c.options.length);
          if (next === prev[c.id]) next = (next + 1) % c.options.length; // always change
          return [c.id, next];
        }),
      ),
    );
  }, []);

  const values = Object.fromEntries(columns.map((c) => [c.id, c.options[picks[c.id]]]));
  return { values, cycle, shuffle };
}