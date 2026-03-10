import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Worker, WorkerFormData } from '@/types/worker';

export const useWorkers = () => {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [loading, setLoading] = useState(true);

  const mapDbWorker = (w: any): Worker => ({
    id: w.id,
    name: w.name,
    phone: w.phone,
    village: w.village,
    skills: w.skills || [],
    experience: w.experience,
    description: w.description,
    registeredBy: w.registered_by,
    adminName: w.admin_name,
    createdAt: new Date(w.created_at),
    isActive: w.is_active,
  });

  const fetchWorkers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('workers')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching workers:', error);
    } else {
      setWorkers((data || []).map(mapDbWorker));
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchWorkers();
  }, []);

  const addWorker = async (workerData: WorkerFormData, registeredBy: 'self' | 'admin' = 'self', adminName?: string) => {
    const { data, error } = await supabase
      .from('workers')
      .insert({
        name: workerData.name,
        phone: workerData.phone,
        village: workerData.village,
        skills: workerData.skills,
        experience: workerData.experience,
        description: workerData.description || null,
        registered_by: registeredBy,
        admin_name: adminName || null,
      })
      .select()
      .single();

    if (error) {
      console.error('Error adding worker:', error);
      throw error;
    }

    if (data) {
      setWorkers(prev => [mapDbWorker(data), ...prev]);
      return mapDbWorker(data);
    }
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

  const toggleWorkerStatus = async (workerId: string) => {
    const worker = workers.find(w => w.id === workerId);
    if (!worker) return;

    const { error } = await supabase
      .from('workers')
      .update({ is_active: !worker.isActive })
      .eq('id', workerId);

    if (error) {
      console.error('Error toggling worker status:', error);
      throw error;
    }

    setWorkers(prev =>
      prev.map(w => w.id === workerId ? { ...w, isActive: !w.isActive } : w)
    );
  };

  const deleteWorker = async (workerId: string) => {
    const { error } = await supabase
      .from('workers')
      .delete()
      .eq('id', workerId);

    if (error) {
      console.error('Error deleting worker:', error);
      throw error;
    }

    setWorkers(prev => prev.filter(w => w.id !== workerId));
  };

  return {
    workers,
    loading,
    addWorker,
    searchWorkers,
    toggleWorkerStatus,
    deleteWorker,
    refetch: fetchWorkers,
  };
};
