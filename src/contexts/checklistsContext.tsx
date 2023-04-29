import { createContext, useContext, useState } from 'react';

export interface ChecklistData {
  _id: string;
  amount_of_milk_produced: number;
  farmer: { city: string; name: string };
  from: { name: string };
  had_supervision: boolean;
  location: { latitude: number; longitude: number };
  number_of_cows_head: number;
  to: { name: string };
  type: string;
  created_at: string;
  updated_at: string;
}

interface ChecklistContextProps {
  checklists: ChecklistData[];
  setChecklists: React.Dispatch<React.SetStateAction<ChecklistData[]>>;
  selectedChecklist: ChecklistData;
  setSelectedChecklist: React.Dispatch<React.SetStateAction<ChecklistData>>;
}

const ChecklistContext = createContext<ChecklistContextProps>(
  {} as ChecklistContextProps
);

interface ChecklistProviderProps {
  children: React.ReactNode;
}

export const ChecklistProvider = ({ children }: ChecklistProviderProps) => {
  const [checklists, setChecklists] = useState<ChecklistData[]>([]);
  const [selectedChecklist, setSelectedChecklist] = useState<ChecklistData>(
    {} as ChecklistData
  );

  return (
    <ChecklistContext.Provider
      value={{
        checklists,
        setChecklists,
        selectedChecklist,
        setSelectedChecklist,
      }}
    >
      {children}
    </ChecklistContext.Provider>
  );
};

export const useChecklistData = () => {
  const context = useContext(ChecklistContext);

  return context;
};
