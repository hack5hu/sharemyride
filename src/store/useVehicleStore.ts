import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { mmkvStorage } from '@/utils/storage';

export interface Vehicle {
  id: string; // Backend ID (string or number)
  company: string;
  model: string;
  numberPlate: string;
  color: string;
  seater: '5' | '7';
  type: string;
}

interface VehicleState {
  vehicles: Vehicle[];
  selectedVehicleId: string | null;
  isLoading: boolean;

  // Actions
  addVehicle: (vehicle: Omit<Vehicle, 'id'>) => Promise<void>;
  syncVehicles: () => Promise<void>;
  removeVehicle: (id: string) => void;
  setSelectedVehicle: (id: string | null) => void;
  updateVehicle: (id: string, updates: Partial<Vehicle>) => void;
}

// Mapping between frontend 'seater' and backend 'vehicleType' / 'vehicleTypeId'
const SEATER_TO_TYPE_ID: Record<string, number> = { '5': 1, '7': 2 };
const TYPE_ID_TO_SEATER: Record<number, '5' | '7'> = { 1: '5', 2: '7' };

const TYPE_STRING_TO_SEATER: Record<string, '5' | '7'> = { 'CAR_5_SEATER': '5', 'CAR_7_SEATER': '7' };

export const useVehicleStore = create<VehicleState>()(
  persist(
    (set, get) => ({
      vehicles: [],
      selectedVehicleId: null,
      isLoading: false,

      addVehicle: async (vehicle) => {
        set({ isLoading: true });
        try {
          const { userService } = require('@/serviceManager/userService');
          
          // Map to backend schema (Capitalized number plate)
          const payload = {
            vehicleNumber: vehicle.numberPlate.toUpperCase(),
            vehicleTypeId: SEATER_TO_TYPE_ID[vehicle.seater] || 1,
            company: vehicle.company,
            model: vehicle.model,
            color: vehicle.color,
          };

          const response = await userService.saveVehicle(payload);
          
          // Normalized ID from backend
          const newId = response.id?.toString() || `vehicle-${Date.now()}`;
          
          set((state) => ({
            vehicles: [...state.vehicles, { 
              ...vehicle, 
              id: newId, 
              numberPlate: vehicle.numberPlate.toUpperCase() 
            }],
            isLoading: false
          }));

          get().syncVehicles();
        } catch (error) {
          console.error('Failed to add vehicle to backend:', error);
          set({ isLoading: false });
          throw error;
        }
      },

      syncVehicles: async () => {
        set({ isLoading: true });
        try {
          const { userService } = require('@/serviceManager/userService');
          const data = await userService.getVehicles();
          
          if (Array.isArray(data)) {
            const mappedVehicles: Vehicle[] = data.map((v: any) => {
              // Handle both vehicleTypeId (number) and vehicleType (string)
              let seater: '5' | '7' = '5';
              if (v.vehicleType && TYPE_STRING_TO_SEATER[v.vehicleType]) {
                seater = TYPE_STRING_TO_SEATER[v.vehicleType];
              } else if (v.vehicleTypeId && TYPE_ID_TO_SEATER[v.vehicleTypeId]) {
                seater = TYPE_ID_TO_SEATER[v.vehicleTypeId];
              }

              return {
                id: v.id.toString(),
                company: v.company || 'Unknown',
                model: v.model || 'Unknown',
                numberPlate: (v.vehicleNumber || '').toUpperCase(),
                color: v.color || '#000000',
                seater,
                type: 'sedan',
              };
            });

            set({ vehicles: mappedVehicles, isLoading: false });
            
            if (mappedVehicles.length > 0 && !get().selectedVehicleId) {
              set({ selectedVehicleId: mappedVehicles[0].id });
            }
          }
        } catch (error) {
          console.error('Failed to sync vehicles:', error);
          set({ isLoading: false });
        }
      },

      removeVehicle: async (id) => {
        set({ isLoading: true });
        try {
          const { userService } = require('@/serviceManager/userService');
          await userService.deleteVehicle(id);
          
          set((state) => ({
            vehicles: state.vehicles.filter((v) => v.id !== id),
            selectedVehicleId: state.selectedVehicleId === id ? null : state.selectedVehicleId,
            isLoading: false
          }));
        } catch (error) {
          console.error('Failed to delete vehicle:', error);
          set({ isLoading: false });
          throw error;
        }
      },

      setSelectedVehicle: (id) => set({ selectedVehicleId: id }),

      updateVehicle: async (id, vehicle) => {
        set({ isLoading: true });
        try {
          const { userService } = require('@/serviceManager/userService');
          
          // Map to backend schema
          const payload = {
            vehicleNumber: vehicle.numberPlate.toUpperCase(),
            vehicleTypeId: SEATER_TO_TYPE_ID[vehicle.seater] || 1,
            company: vehicle.company,
            model: vehicle.model,
            color: vehicle.color,
          };

          await userService.updateVehicle(id, payload);
          
          set((state) => ({
            vehicles: state.vehicles.map((v) => (v.id === id ? { ...v, ...vehicle, numberPlate: vehicle.numberPlate.toUpperCase() } : v)),
            isLoading: false
          }));
          
          get().syncVehicles();
        } catch (error) {
          console.error('Failed to update vehicle:', error);
          set({ isLoading: false });
          throw error;
        }
      },
    }),
    {
      name: 'user-vehicles-storage',
      storage: createJSONStorage(() => mmkvStorage),
    }
  )
);
