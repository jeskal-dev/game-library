import { FooterSection } from "./FooterSection";
import { LogoSection } from "./LogoSection";
import { footerSections } from "./const";

export function FooterContent() {
  return (
    <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
      <LogoSection />
      {footerSections.map((section, index) => (
        <FooterSection key={index} section={section} />
      ))}
    </div>
  );
}
