import { useState, useEffect } from 'react';
import { Worker, WorkerFormData } from '@/types/worker';

// Mock data for demonstration
const mockWorkers: Worker[] = [
  {
    id: '1',
    name: 'Ravi Kumar',
    phone: '+91 9876543210',
    village: 'Anantapur',
    skills: ['Electrician', 'Solar Panel Installation'],
    experience: 8,
    description: 'Experienced in house wiring, electrical repairs, and solar panel installations.',
    registeredBy: 'self',
    createdAt: new Date('2024-01-15'),
    isActive: true
  },
  {
    id: '2',
    name: 'Lakshmi Devi',
    phone: '+91 9876543211',
    village: 'Anantapur',
    skills: ['Tailor', 'Embroidery'],
    experience: 12,
    description: 'Specializes in traditional saree blouses and modern alterations.',
    registeredBy: 'admin',
    adminName: 'Grama Volunteer Suresh',
    createdAt: new Date('2024-01-20'),
    isActive: true
  },
  {
    id: '3',
    name: 'Mohan Reddy',
    phone: '+91 9876543212',
    village: 'Kadiri',
    skills: ['Carpenter', 'Furniture Making'],
    experience: 15,
    description: 'Expert in custom furniture, door/window installation, and wooden crafts.',
    registeredBy: 'self',
    createdAt: new Date('2024-02-01'),
    isActive: true
  },
  {
    id: '4',
    name: 'Sita Ramulu',
    phone: '+91 9876543213',
    village: 'Anantapur',
    skills: ['Farmer', 'Organic Farming'],
    experience: 20,
    description: 'Grows organic vegetables and provides farming consultation.',
    registeredBy: 'admin',
    adminName: 'Panchayat Secretary',
    createdAt: new Date('2024-02-10'),
    isActive: true
  },
  {
    id: '5',
    name: 'Venkat Rao',
    phone: '+91 9876543214',
    village: 'Kadiri',
    skills: ['Plumber', 'Bore Well Maintenance'],
    experience: 10,
    description: 'All types of plumbing work, bore well repairs, and water system installation.',
    registeredBy: 'self',
    createdAt: new Date('2024-02-15'),
    isActive: true
  },
  {
    id: '6',
    name: 'Manjula Rani',
    phone: '+91 9876543215',
    village: 'Hindupur',
    skills: ['Cook', 'Catering'],
    experience: 7,
    description: 'Traditional Andhra cuisine for events and daily cooking services.',
    registeredBy: 'admin',
    adminName: 'Village Head',
    createdAt: new Date('2024-02-20'),
    isActive: true
  }
];

export const useWorkers = () => {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading from localStorage or API
    const savedWorkers = localStorage.getItem('skillmap-workers');
    if (savedWorkers) {
      try {
        const parsed = JSON.parse(savedWorkers);
        setWorkers(parsed.map((w: any) => ({
          ...w,
          createdAt: new Date(w.createdAt)
        })));
      } catch (error) {
        console.error('Error parsing saved workers:', error);
        setWorkers(mockWorkers);
      }
    } else {
      setWorkers(mockWorkers);
    }
    setLoading(false);
  }, []);

  const saveWorkers = (newWorkers: Worker[]) => {
    setWorkers(newWorkers);
    localStorage.setItem('skillmap-workers', JSON.stringify(newWorkers));
  };

  const addWorker = (workerData: WorkerFormData, registeredBy: 'self' | 'admin' = 'self', adminName?: string) => {
    const newWorker: Worker = {
      id: Date.now().toString(),
      ...workerData,
      registeredBy,
      adminName,
      createdAt: new Date(),
      isActive: true
    };
    
    const updatedWorkers = [...workers, newWorker];
    saveWorkers(updatedWorkers);
    return newWorker;
  };

  const searchWorkers = (skill: string, village: string) => {
    return workers.filter(worker => {
      const skillMatch = worker.skills.some(s => 
        s.toLowerCase().includes(skill.toLowerCase())
      );
      const villageMatch = worker.village.toLowerCase().includes(village.toLowerCase());
      return skillMatch && villageMatch && worker.isActive;
    });
  };

  const toggleWorkerStatus = (workerId: string) => {
    const updatedWorkers = workers.map(worker =>
      worker.id === workerId 
        ? { ...worker, isActive: !worker.isActive }
        : worker
    );
    saveWorkers(updatedWorkers);
  };

  const deleteWorker = (workerId: string) => {
    const updatedWorkers = workers.filter(worker => worker.id !== workerId);
    saveWorkers(updatedWorkers);
  };

  return {
    workers,
    loading,
    addWorker,
    searchWorkers,
    toggleWorkerStatus,
    deleteWorker
  };
};