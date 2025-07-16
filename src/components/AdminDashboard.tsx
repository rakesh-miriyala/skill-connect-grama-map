import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { WorkerRegistration } from "./WorkerRegistration";
import { Worker, WorkerFormData } from "@/types/worker";
import { Language, translations } from "./LanguageToggle";
import { 
  Users, 
  UserPlus, 
  Search, 
  ToggleLeft, 
  ToggleRight, 
  Trash2,
  Phone,
  MapPin,
  Clock,
  ChevronLeft
} from "lucide-react";

interface AdminDashboardProps {
  language: Language;
  workers: Worker[];
  onAddWorker: (data: WorkerFormData, registeredBy: 'admin', adminName: string) => void;
  onToggleWorkerStatus: (workerId: string) => void;
  onDeleteWorker: (workerId: string) => void;
  onBack: () => void;
}

export const AdminDashboard = ({ 
  language, 
  workers, 
  onAddWorker, 
  onToggleWorkerStatus, 
  onDeleteWorker,
  onBack 
}: AdminDashboardProps) => {
  const [currentView, setCurrentView] = useState<'dashboard' | 'register'>('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [adminName, setAdminName] = useState('');
  
  const filteredWorkers = workers.filter(worker =>
    worker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    worker.village.toLowerCase().includes(searchTerm.toLowerCase()) ||
    worker.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  const handleAddWorker = (data: WorkerFormData) => {
    if (!adminName.trim()) {
      alert('Please enter your name as the registering admin');
      return;
    }
    onAddWorker(data, 'admin', adminName);
    setCurrentView('dashboard');
  };
  
  if (currentView === 'register') {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button 
            variant="outline" 
            onClick={() => setCurrentView('dashboard')}
            className="mb-4"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
          
          <Card className="mb-6">
            <CardContent className="p-4">
              <label className="block text-sm font-medium mb-2">
                Admin Name (Required)
              </label>
              <Input
                value={adminName}
                onChange={(e) => setAdminName(e.target.value)}
                placeholder="Enter your name as the registering admin"
                required
              />
            </CardContent>
          </Card>
        </div>
        
        <WorkerRegistration 
          language={language}
          onSubmit={handleAddWorker}
          isAdmin={true}
        />
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <Button 
            variant="outline" 
            onClick={onBack}
            className="mb-4"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
          <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage worker registrations and listings</p>
        </div>
        
        <Button 
          variant="hero"
          onClick={() => setCurrentView('register')}
        >
          <UserPlus className="mr-2 h-4 w-4" />
          Register Worker
        </Button>
      </div>
      
      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Workers</p>
                <p className="text-2xl font-bold">{workers.length}</p>
              </div>
              <Users className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Workers</p>
                <p className="text-2xl font-bold">{workers.filter(w => w.isActive).length}</p>
              </div>
              <ToggleRight className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Admin Registered</p>
                <p className="text-2xl font-bold">{workers.filter(w => w.registeredBy === 'admin').length}</p>
              </div>
              <UserPlus className="h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Search */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search workers by name, village, or skill..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>
      
      {/* Workers List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold mb-4">
          Workers ({filteredWorkers.length})
        </h2>
        
        {filteredWorkers.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No workers found</p>
            </CardContent>
          </Card>
        ) : (
          filteredWorkers.map((worker) => (
            <Card key={worker.id} className="hover:shadow-soft transition-smooth">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">{worker.name}</h3>
                      <Badge 
                        variant={worker.isActive ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {worker.isActive ? "Active" : "Inactive"}
                      </Badge>
                      {worker.registeredBy === 'admin' && (
                        <Badge variant="outline" className="text-xs">
                          Admin Registered
                        </Badge>
                      )}
                    </div>
                    
                    <div className="grid gap-2 md:grid-cols-2 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Phone className="h-4 w-4" />
                        {worker.phone}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {worker.village}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {worker.experience} years experience
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      {worker.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    
                    {worker.description && (
                      <p className="text-sm text-muted-foreground mb-3">
                        {worker.description}
                      </p>
                    )}
                    
                    {worker.registeredBy === 'admin' && worker.adminName && (
                      <p className="text-xs text-muted-foreground">
                        Registered by: {worker.adminName}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex gap-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onToggleWorkerStatus(worker.id)}
                    >
                      {worker.isActive ? (
                        <ToggleLeft className="h-4 w-4" />
                      ) : (
                        <ToggleRight className="h-4 w-4" />
                      )}
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        if (confirm('Are you sure you want to delete this worker?')) {
                          onDeleteWorker(worker.id);
                        }
                      }}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};