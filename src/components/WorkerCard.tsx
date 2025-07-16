import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, MapPin, Clock, User } from "lucide-react";
import { Worker } from "@/types/worker";
import { Language, translations } from "./LanguageToggle";

interface WorkerCardProps {
  worker: Worker;
  language: Language;
}

export const WorkerCard = ({ worker, language }: WorkerCardProps) => {
  const t = translations[language];
  
  const handleCall = () => {
    window.open(`tel:${worker.phone}`, '_self');
  };
  
  return (
    <Card className="hover:shadow-warm transition-smooth">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground">{worker.name}</h3>
            <div className="flex items-center text-muted-foreground text-sm mt-1">
              <MapPin className="h-4 w-4 mr-1" />
              {worker.village}
            </div>
          </div>
          
          <Button
            onClick={handleCall}
            variant="hero"
            size="sm"
            className="shrink-0"
          >
            <Phone className="h-4 w-4 mr-1" />
            Call
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {/* Skills */}
        <div>
          <div className="flex flex-wrap gap-2">
            {worker.skills.map((skill, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
        
        {/* Experience */}
        <div className="flex items-center text-sm text-muted-foreground">
          <Clock className="h-4 w-4 mr-1" />
          {worker.experience} years experience
        </div>
        
        {/* Description */}
        {worker.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {worker.description}
          </p>
        )}
        
        {/* Registration info */}
        {worker.registeredBy === 'admin' && worker.adminName && (
          <div className="flex items-center text-xs text-muted-foreground pt-2 border-t">
            <User className="h-3 w-3 mr-1" />
            Registered by {worker.adminName}
          </div>
        )}
      </CardContent>
    </Card>
  );
};