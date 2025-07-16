import { SearchForm } from "./SearchForm";
import { translations, Language } from "./LanguageToggle";
import heroImage from "@/assets/hero-community.jpg";

interface HeroSectionProps {
  language: Language;
  onSearch: (skill: string, village: string) => void;
}

export const HeroSection = ({ language, onSearch }: HeroSectionProps) => {
  const t = translations[language];
  
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center bg-warm-gradient">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-background/60" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            {t.findSkilled}
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            {t.connectCommunity}
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground mb-12">
            {t.noLoginRequired.split(' • ').map((feature, index) => (
              <span key={index} className="bg-background/80 px-3 py-1 rounded-full">
                {feature}
              </span>
            ))}
          </div>
        </div>
        
        <SearchForm language={language} onSearch={onSearch} />
      </div>
    </section>
  );
};