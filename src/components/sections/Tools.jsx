import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";

export function Tools() {
  return (
    <section id="tools" className="scroll-mt-20 py-20">
      <Container className="grid gap-10 md:grid-cols-12">
        <h2 className="font-display text-3xl font-bold sm:text-4xl md:col-span-4">
          What you get
        </h2>
        <div className="divide-y divide-mist border-y border-mist md:col-span-8">
          {site.tools.map((t) => (
            <div
              key={t.title}
              className="grid gap-2 py-6 sm:grid-cols-3 sm:gap-8">
              <h3 className="font-display text-xl font-semibold">{t.title}</h3>
              <p className="text-navy/80 sm:col-span-2">{t.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
