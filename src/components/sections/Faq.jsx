import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";

export function Faq() {
  return (
    <section id="faq" className="scroll-mt-20 py-16">
      <Container className="max-w-3xl">
        <h2 className="font-display text-3xl font-bold sm:text-4xl">
          Questions
        </h2>
        <div className="mt-8 divide-y divide-mist border-y border-mist">
          {site.faq.map((item) => (
            <details key={item.q} className="py-4">
              <summary className="cursor-pointer list-none font-semibold marker:hidden">
                {item.q}
              </summary>
              <p className="mt-2 max-w-prose text-navy/80">{item.a}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
  