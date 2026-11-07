import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-mist bg-chalk/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <a href="/" className="font-display text-xl font-bold">
          {site.name}
        </a>
        <nav
          aria-label="Primary"
          className="hidden gap-8 text-sm font-medium md:flex">
          {site.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="underline-offset-4 hover:underline">
              {item.label}
            </a>
          ))}
        </nav>
        <a
          href="#programme"
          className="rounded-lg bg-navy px-4 py-2 text-sm font-semibold text-chalk hover:bg-navy/85">
          See the programme
        </a>
      </Container>
    </header>
  );
}
