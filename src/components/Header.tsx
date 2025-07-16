import { Button } from "@/components/ui/button";
import { LanguageToggle, translations, Language } from "./LanguageToggle";
import { UserPlus, Settings } from "lucide-react";

interface HeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onNavigate: (page: 'home' | 'register' | 'admin') => void;
}

export const Header = ({ language, onLanguageChange, onNavigate }: HeaderProps) => {
  const t = translations[language];
  
  return (
    <header className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button 
            onClick={() => onNavigate('home')}
            className="text-2xl font-bold text-primary hover:text-primary/80 transition-smooth"
          >
            SkillMap
          </button>
          
          {/* Navigation */}
          <div className="flex items-center gap-4">
            <Button
              variant="warm"
              onClick={() => onNavigate('register')}
              className="hidden sm:flex"
            >
              <UserPlus className="mr-2 h-4 w-4" />
              {t.registerWorker}
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => onNavigate('admin')}
              className="hidden sm:flex"
            >
              <Settings className="mr-2 h-4 w-4" />
              {t.adminPanel}
            </Button>
            
            <LanguageToggle 
              language={language} 
              onLanguageChange={onLanguageChange} 
            />
          </div>
        </div>
      </div>
    </header>
  );
};