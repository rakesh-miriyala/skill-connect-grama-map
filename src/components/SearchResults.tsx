import { WorkerCard } from "./WorkerCard";
import { Worker } from "@/types/worker";
import { Language, translations } from "./LanguageToggle";
import { SearchX } from "lucide-react";

interface SearchResultsProps {
  workers: Worker[];
  language: Language;
  searchTerm?: string;
  village?: string;
}

export const SearchResults = ({ workers, language, searchTerm, village }: SearchResultsProps) => {
  const t = translations[language];
  
  if (workers.length === 0) {
    return (
      <div className="text-center py-12">
        <SearchX className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-foreground mb-2">
          No workers found
        </h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          {searchTerm && village 
            ? `No ${searchTerm} workers found in ${village}. Try searching in nearby villages or check for different skills.`
            : "Try adjusting your search criteria or check your spelling."
          }
        </p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Search Results
        </h2>
        <p className="text-muted-foreground">
          Found {workers.length} skilled worker{workers.length !== 1 ? 's' : ''}
          {searchTerm && ` for "${searchTerm}"`}
          {village && ` in ${village}`}
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {workers.map((worker) => (
          <WorkerCard 
            key={worker.id} 
            worker={worker} 
            language={language}
          />
        ))}
      </div>
    </div>
  );
};