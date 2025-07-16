import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search, MapPin, Wrench } from "lucide-react";
import { translations, Language } from "./LanguageToggle";

interface SearchFormProps {
  language: Language;
  onSearch: (skill: string, village: string) => void;
}

export const SearchForm = ({ language, onSearch }: SearchFormProps) => {
  const [skill, setSkill] = useState("");
  const [village, setVillage] = useState("");
  const t = translations[language];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(skill, village);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-warm">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Wrench className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t.searchPlaceholder}
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
              className="pl-10 h-12 text-base"
              required
            />
          </div>
          
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t.villagePlaceholder}
              value={village}
              onChange={(e) => setVillage(e.target.value)}
              className="pl-10 h-12 text-base"
              required
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full h-12 text-base font-semibold"
            variant="hero"
          >
            <Search className="mr-2 h-5 w-5" />
            {t.search}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};