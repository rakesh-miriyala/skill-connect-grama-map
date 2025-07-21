import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { User, Phone, MapPin, Wrench, Clock, Plus, X } from "lucide-react";
import { WorkerFormData } from "@/types/worker";
import { Language, translations } from "./LanguageToggle";

interface WorkerRegistrationProps {
  language: Language;
  onSubmit: (data: WorkerFormData) => void;
  isAdmin?: boolean;
}

const commonSkills = [
  'Electrician', 'Carpenter', 'Plumber', 'Mason', 'Painter', 'Farmer', 
  'Mechanic', 'Welder', 'Tailor', 'Barber', 'Cook', 'Driver',
  'Gardener', 'Cleaner', 'Security Guard', 'Teacher'
];

export const WorkerRegistration = ({ language, onSubmit, isAdmin = false }: WorkerRegistrationProps) => {
  const t = translations[language];
  const [formData, setFormData] = useState<WorkerFormData>({
    name: '',
    phone: '',
    village: '',
    skills: [],
    experience: 0,
    description: ''
  });
  
  const [newSkill, setNewSkill] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };
  
  const addSkill = (skill: string) => {
    if (skill && !formData.skills.includes(skill)) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, skill]
      }));
    }
    setNewSkill('');
  };
  
  const removeSkill = (skillToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };
  
  return (
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-warm">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            {isAdmin ? t.registerWorkerAdmin : t.registerWorker}
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium flex items-center gap-2">
                <User className="h-4 w-4" />
                {t.fullName}
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                required
                placeholder={t.enterFullName}
              />
            </div>
            
            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium flex items-center gap-2">
                <Phone className="h-4 w-4" />
                {t.phoneNumber}
              </Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                required
                placeholder={t.enterPhoneNumber}
              />
            </div>
            
            {/* Village */}
            <div className="space-y-2">
              <Label htmlFor="village" className="text-sm font-medium flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {t.village}
              </Label>
              <Input
                id="village"
                value={formData.village}
                onChange={(e) => setFormData(prev => ({ ...prev, village: e.target.value }))}
                required
                placeholder={t.enterVillageName}
              />
            </div>
            
            {/* Skills */}
            <div className="space-y-3">
              <Label className="text-sm font-medium flex items-center gap-2">
                <Wrench className="h-4 w-4" />
                {t.skills}
              </Label>
              
              {/* Selected Skills */}
              {formData.skills.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.skills.map((skill, index) => (
                    <Badge key={index} variant="default" className="flex items-center gap-1">
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        className="ml-1 hover:bg-destructive/20 rounded-full"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
              
              {/* Add Custom Skill */}
              <div className="flex gap-2">
                <Input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder={t.addSkill}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill(newSkill))}
                />
                <Button
                  type="button"
                  onClick={() => addSkill(newSkill)}
                  variant="outline"
                  size="sm"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              
              {/* Common Skills */}
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground">{t.commonSkills}</p>
                <div className="flex flex-wrap gap-2">
                  {commonSkills
                    .filter(skill => !formData.skills.includes(skill))
                    .slice(0, 8)
                    .map((skill) => (
                    <Button
                      key={skill}
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addSkill(skill)}
                      className="text-xs"
                    >
                      {skill}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Experience */}
            <div className="space-y-2">
              <Label htmlFor="experience" className="text-sm font-medium flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {t.yearsExperience}
              </Label>
              <Input
                id="experience"
                type="number"
                min="0"
                max="50"
                value={formData.experience}
                onChange={(e) => setFormData(prev => ({ ...prev, experience: parseInt(e.target.value) || 0 }))}
                required
                placeholder={t.enterYearsExperience}
              />
            </div>
            
            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium">
                {t.description}
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder={t.descriptionPlaceholder}
                rows={3}
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full h-12" 
              variant="hero"
              disabled={formData.skills.length === 0}
            >
              {t.registerButton}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};