import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer className="border-t border-mist py-10 text-sm">
      <Container>
        © {new Date().getFullYear()} {site.name}
      </Container>
    </footer>
  );
}
