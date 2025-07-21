import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

const translations = {
  en: {
    searchSkills: "Search for Skills",
    registerWorker: "Register as Worker", 
    adminPanel: "Admin Panel",
    searchPlaceholder: "Enter skill (e.g., electrician, carpenter, farmer)",
    villagePlaceholder: "Enter village name",
    search: "Search",
    findSkilled: "Find Skilled Workers in Your Village",
    connectCommunity: "Connect with skilled professionals in rural communities across India",
    noLoginRequired: "No login required • Direct phone contact • Multilingual support",
    // Registration form translations
    registerWorkerAdmin: "Register Worker (Admin)",
    fullName: "Full Name",
    phoneNumber: "Phone Number",
    village: "Village",
    skills: "Skills",
    yearsExperience: "Years of Experience",
    description: "Description (Optional)",
    registerButton: "Register Worker",
    enterFullName: "Enter full name",
    enterPhoneNumber: "Enter phone number",
    enterVillageName: "Enter village name",
    addSkill: "Add a skill",
    commonSkills: "Common skills:",
    descriptionPlaceholder: "Describe your work experience and specializations...",
    enterYearsExperience: "Enter years of experience"
  },
  te: {
    searchSkills: "నైపుణ్యాలు వెతకండి",
    registerWorker: "కార్మికుడిగా నమోదు చేయండి",
    adminPanel: "అడ్మిన్ ప్యానెల్",
    searchPlaceholder: "నైపుణ్యం నమోదు చేయండి (ఉదా: ఎలక్ట్రీషియన్, వడ్రంగి, రైతు)",
    villagePlaceholder: "గ్రామం పేరు నమోదు చేయండి",
    search: "వెతకండి",
    findSkilled: "మీ గ్రామంలో నైపుణ్యం గల కార్మికులను కనుగొనండి",
    connectCommunity: "భారతదేశంలోని గ్రామీణ సమాజాలలో నైపుణ్యం గల వృత్తిపరులతో అనుసంధానం పొందండి",
    noLoginRequired: "లాగిన్ అవసరం లేదు • ప్రత్యక్ష ఫోన్ సంపర్కం • బహుభాషా మద్దతు",
    // Registration form translations
    registerWorkerAdmin: "కార్మికుని నమోదు చేయండి (అడ్మిన్)",
    fullName: "పూర్తి పేరు",
    phoneNumber: "ఫోన్ నంబర్",
    village: "గ్రామం",
    skills: "నైపుణ్యాలు",
    yearsExperience: "అనుభవ సంవత్సరాలు",
    description: "వివరణ (ఐచ్ఛికం)",
    registerButton: "కార్మికుని నమోదు చేయండి",
    enterFullName: "పూర్తి పేరు నమోదు చేయండి",
    enterPhoneNumber: "ఫోన్ నంబర్ నమోదు చేయండి",
    enterVillageName: "గ్రామం పేరు నమోదు చేయండి",
    addSkill: "నైపుణ్యం జోడించండి",
    commonSkills: "సాధారణ నైపుణ్యాలు:",
    descriptionPlaceholder: "మీ పని అనుభవం మరియు ప్రత్యేకతలను వివరించండి...",
    enterYearsExperience: "అనుభవ సంవత్సరాలు నమోదు చేయండి"
  }
};

interface LanguageToggleProps {
  language: 'en' | 'te';
  onLanguageChange: (lang: 'en' | 'te') => void;
}

export const LanguageToggle = ({ language, onLanguageChange }: LanguageToggleProps) => {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => onLanguageChange(language === 'en' ? 'te' : 'en')}
      className="gap-2"
    >
      <Globe className="h-4 w-4" />
      {language === 'en' ? 'తెలుగు' : 'English'}
    </Button>
  );
};

export { translations };
export type Language = 'en' | 'te';