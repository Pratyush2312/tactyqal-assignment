import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";

export function Programme() {
  const { programme } = site;
  return (
    <section id="programme" className="scroll-mt-20 bg-navy py-20 text-chalk">
      <Container>
        <h2 className="max-w-2xl font-display text-3xl font-bold sm:text-4xl">
          {programme.title}
        </h2>
        <p className="mt-4 max-w-prose text-chalk/80">{programme.body}</p>
        {/* A genuine sequence, so an ordered list with week labels is the right structure. */}
        <ol className="mt-12 divide-y divide-chalk/20 border-y border-chalk/20">
          {programme.weeks.map((w, i) => (
            <li
              key={w.title}
              className="grid gap-2 py-6 sm:grid-cols-12 sm:gap-8">
              <p className="font-display font-semibold text-sun sm:col-span-2">
                Week {i + 1}
              </p>
              <h3 className="font-display text-xl font-semibold sm:col-span-4">
                {w.title}
              </h3>
              <p className="text-chalk/80 sm:col-span-6">{w.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
