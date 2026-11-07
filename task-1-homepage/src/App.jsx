import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Tools } from "@/components/sections/Tools";
import { Programme } from "@/components/sections/Programme";
import { Faq } from "@/components/sections/Faq";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Tools />
        <Programme />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
