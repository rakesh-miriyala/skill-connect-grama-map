import { Language, translations } from "@/components/LanguageToggle";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Search, Shield, Globe, Phone, MapPin } from "lucide-react";

const aboutTranslations = {
  en: {
    title: "About SkillMap",
    subtitle: "Connecting Rural Skills with Community Needs",
    mission: "Our Mission",
    missionText: "SkillMap bridges the gap between skilled workers and people who need their services in rural India. We believe every village has untapped talent — electricians, carpenters, farmers, plumbers, and more — waiting to be discovered.",
    howItWorks: "How It Works",
    step1Title: "Search for Skills",
    step1Desc: "Enter the skill you need and your village name to find nearby workers instantly.",
    step2Title: "Direct Contact",
    step2Desc: "Call workers directly — no middleman, no fees, no login required.",
    step3Title: "Register Your Skills",
    step3Desc: "Skilled workers can register themselves to be discovered by their community.",
    features: "Key Features",
    feat1: "No login required for searching",
    feat2: "Direct phone contact with workers",
    feat3: "Bilingual support (English & Telugu)",
    feat4: "Admin-managed worker verification",
    feat5: "Village-level search granularity",
    feat6: "Free for all users",
    techStack: "Technology",
    techText: "Built with React, TypeScript, Tailwind CSS, and powered by Lovable Cloud for secure data storage and authentication.",
    contact: "Contact",
    contactText: "For feedback or support, reach out to the SkillMap team.",
  },
  te: {
    title: "SkillMap గురించి",
    subtitle: "గ్రామీణ నైపుణ్యాలను సమాజ అవసరాలతో అనుసంధానం చేయడం",
    mission: "మా లక్ష్యం",
    missionText: "SkillMap గ్రామీణ భారతదేశంలో నైపుణ్యం కలిగిన కార్మికులు మరియు వారి సేవలు అవసరమైన వ్యక్తుల మధ్య అంతరాన్ని తగ్గిస్తుంది. ప్రతి గ్రామంలో ఎలక్ట్రీషియన్లు, వడ్రంగులు, రైతులు, ప్లంబర్లు వంటి అన్వేషించబడని ప్రతిభ ఉందని మేము నమ్ముతున్నాము.",
    howItWorks: "ఎలా పనిచేస్తుంది",
    step1Title: "నైపుణ్యాలు వెతకండి",
    step1Desc: "మీకు అవసరమైన నైపుణ్యం మరియు మీ గ్రామం పేరు నమోదు చేసి సమీపంలోని కార్మికులను తక్షణమే కనుగొనండి.",
    step2Title: "ప్రత్యక్ష సంపర్కం",
    step2Desc: "కార్మికులను నేరుగా కాల్ చేయండి — మధ్యవర్తి లేదు, ఫీజు లేదు, లాగిన్ అవసరం లేదు.",
    step3Title: "మీ నైపుణ్యాలను నమోదు చేయండి",
    step3Desc: "నైపుణ్యం కలిగిన కార్మికులు తమ సమాజం ద్వారా కనుగొనబడటానికి తమను తాము నమోదు చేసుకోవచ్చు.",
    features: "ముఖ్య లక్షణాలు",
    feat1: "వెతకడానికి లాగిన్ అవసరం లేదు",
    feat2: "కార్మికులతో ప్రత్యక్ష ఫోన్ సంపర్కం",
    feat3: "ద్విభాషా మద్దతు (ఆంగ్లం & తెలుగు)",
    feat4: "అడ్మిన్-నిర్వహించిన కార్మిక ధృవీకరణ",
    feat5: "గ్రామ-స్థాయి శోధన",
    feat6: "అందరి వినియోగదారులకు ఉచితం",
    techStack: "సాంకేతికత",
    techText: "React, TypeScript, Tailwind CSS తో నిర్మించబడింది మరియు సురక్షిత డేటా నిల్వ మరియు ప్రమాణీకరణ కోసం Lovable Cloud ద్వారా శక్తివంతం చేయబడింది.",
    contact: "సంప్రదించండి",
    contactText: "అభిప్రాయం లేదా మద్దతు కోసం, SkillMap బృందాన్ని సంప్రదించండి.",
  },
};

interface AboutPageProps {
  language: Language;
}

export const AboutPage = ({ language }: AboutPageProps) => {
  const t = aboutTranslations[language];

  const steps = [
    { icon: Search, title: t.step1Title, desc: t.step1Desc },
    { icon: Phone, title: t.step2Title, desc: t.step2Desc },
    { icon: Users, title: t.step3Title, desc: t.step3Desc },
  ];

  const features = [t.feat1, t.feat2, t.feat3, t.feat4, t.feat5, t.feat6];

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary mb-3">{t.title}</h1>
        <p className="text-lg text-muted-foreground">{t.subtitle}</p>
      </div>

      {/* Mission */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <h2 className="text-2xl font-semibold text-foreground mb-3 flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            {t.mission}
          </h2>
          <p className="text-muted-foreground leading-relaxed">{t.missionText}</p>
        </CardContent>
      </Card>

      {/* How It Works */}
      <h2 className="text-2xl font-semibold text-foreground mb-6 text-center">{t.howItWorks}</h2>
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {steps.map((step, i) => (
          <Card key={i} className="text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <step.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Features */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Globe className="h-6 w-6 text-primary" />
            {t.features}
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {features.map((feat, i) => (
              <div key={i} className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary shrink-0" />
                <span className="text-muted-foreground">{feat}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tech & Contact */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold text-foreground mb-2">{t.techStack}</h2>
            <p className="text-sm text-muted-foreground">{t.techText}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold text-foreground mb-2">{t.contact}</h2>
            <p className="text-sm text-muted-foreground">{t.contactText}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
