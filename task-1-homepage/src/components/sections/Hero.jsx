import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { IdeaSpinner } from "@/features/idea-spinner/IdeaSpinner";

export function Hero() {
  const { hero } = site;
  return (
    <section className="bg-sun py-14 sm:py-24">
      <Container>
        <h1 className="text-lg font-semibold">{hero.title}</h1>
        <IdeaSpinner>
          <ButtonLink href={hero.link.href} variant="outline">
            {hero.link.label}
          </ButtonLink>
        </IdeaSpinner>
        <p className="mt-8 max-w-prose text-navy/80">{hero.body}</p>
      </Container>
    </section>
  );
}
