import { useState } from "react";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { SearchResults } from "@/components/SearchResults";
import { WorkerRegistration } from "@/components/WorkerRegistration";
import { AdminDashboard } from "@/components/AdminDashboard";
import { Auth } from "@/pages/Auth";
import { useWorkers } from "@/hooks/useWorkers";
import { useAuth } from "@/hooks/useAuth";
import { Language } from "@/components/LanguageToggle";
import { Worker, WorkerFormData } from "@/types/worker";
import { useToast } from "@/hooks/use-toast";
import { User } from '@supabase/supabase-js';

type Page = 'home' | 'register' | 'admin' | 'search-results' | 'auth';

const Index = () => {
  const [language, setLanguage] = useState<Language>('en');
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [searchResults, setSearchResults] = useState<Worker[]>([]);
  const [lastSearch, setLastSearch] = useState<{ skill: string; village: string }>({ skill: '', village: '' });
  const [authenticatedAdmin, setAuthenticatedAdmin] = useState<User | null>(null);
  
  const { workers, loading, addWorker, searchWorkers, toggleWorkerStatus, deleteWorker } = useWorkers();
  const { user, isAdmin, signOut } = useAuth();
  const { toast } = useToast();

  const handleSearch = (skill: string, village: string) => {
    const results = searchWorkers(skill, village);
    setSearchResults(results);
    setLastSearch({ skill, village });
    setCurrentPage('search-results');
  };

  const handleWorkerRegistration = (data: WorkerFormData) => {
    try {
      addWorker(data, 'self');
      toast({
        title: "Registration Successful!",
        description: "You have been registered as a skilled worker.",
      });
      setCurrentPage('home');
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  const handleAdminWorkerRegistration = (data: WorkerFormData, registeredBy: 'admin', adminName: string) => {
    try {
      addWorker(data, registeredBy, adminName);
      toast({
        title: "Worker Registered Successfully!",
        description: `${data.name} has been registered by admin.`,
      });
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  const handleToggleWorkerStatus = (workerId: string) => {
    toggleWorkerStatus(workerId);
    toast({
      title: "Worker Status Updated",
      description: "Worker status has been changed successfully.",
    });
  };

  const handleDeleteWorker = (workerId: string) => {
    deleteWorker(workerId);
    toast({
      title: "Worker Deleted",
      description: "Worker has been removed from the system.",
    });
  };

  const handleNavigate = (page: Page) => {
    if (page === 'admin') {
      if (isAdmin && user) {
        setAuthenticatedAdmin(user);
        setCurrentPage('admin');
      } else {
        setCurrentPage('auth');
      }
    } else {
      setCurrentPage(page);
    }
  };

  const handleAuthSuccess = (adminUser: User) => {
    setAuthenticatedAdmin(adminUser);
    setCurrentPage('admin');
    toast({
      title: "Welcome Admin!",
      description: "You have successfully logged in to the admin panel.",
    });
  };

  const handleAdminLogout = async () => {
    await signOut();
    setAuthenticatedAdmin(null);
    setCurrentPage('home');
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully.",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-warm-gradient">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-lg text-muted-foreground">Loading SkillMap...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header 
        language={language}
        onLanguageChange={setLanguage}
        onNavigate={handleNavigate}
        isAdmin={isAdmin}
        user={user}
        onLogout={handleAdminLogout}
      />
      
      {currentPage === 'home' && (
        <HeroSection 
          language={language}
          onSearch={handleSearch}
        />
      )}
      
      {currentPage === 'search-results' && (
        <div className="container mx-auto px-4 py-12">
          <SearchResults 
            workers={searchResults}
            language={language}
            searchTerm={lastSearch.skill}
            village={lastSearch.village}
          />
        </div>
      )}
      
      {currentPage === 'register' && (
        <div className="container mx-auto px-4 py-12">
          <WorkerRegistration 
            language={language}
            onSubmit={handleWorkerRegistration}
          />
        </div>
      )}
      
      {currentPage === 'auth' && (
        <Auth 
          onBack={() => setCurrentPage('home')}
          onAuthSuccess={handleAuthSuccess}
        />
      )}
      
      {currentPage === 'admin' && authenticatedAdmin && (
        <AdminDashboard 
          language={language}
          workers={workers}
          onAddWorker={handleAdminWorkerRegistration}
          onToggleWorkerStatus={handleToggleWorkerStatus}
          onDeleteWorker={handleDeleteWorker}
          onBack={() => setCurrentPage('home')}
        />
      )}
    </div>
  );
};

export default Index;
