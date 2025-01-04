import { FC, ReactNode, useContext, createContext } from "react";
import { ParameterStore } from "../stores/ParameterStore";
import { AlgorithmStore } from "@/stores/AlgorithmStore";

interface storesInterface {
  parameterStore?: ParameterStore;
  algorithmStore?: AlgorithmStore;
}

const StoreContext = createContext<storesInterface | null>(null);

export const useStores = () => {
  const stores = useContext(StoreContext);

  if (!stores) {
    throw new Error("useStore must be used within a storeProvider.");
  }
  return stores;
};

interface StoreProviderProps {
  children: ReactNode;
}

export const StoreProvider: FC<StoreProviderProps> = ({ children }) => {
  const parameterStore = new ParameterStore();
  const algorithmStore = new AlgorithmStore();
  const stores = { parameterStore, algorithmStore };

  return (
    <StoreContext.Provider value={stores}>{children}</StoreContext.Provider>
  );
};
