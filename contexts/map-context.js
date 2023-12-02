import { createContext, useContext, useState } from 'react';

const StoreContext = createContext();

// Create a context provider
const StoreProvider = ({ children }) => {
  const [response, setResponse] = useState(null);

  return (
    <StoreContext.Provider value={{ response, setResponse }}>
      {children}
    </StoreContext.Provider>
  );
};

// Custom hook to access the context
const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};

export { StoreProvider, useStore };
