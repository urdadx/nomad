import { createContext, useContext, useState } from 'react';
import { addDays } from 'date-fns';

const StoreContext = createContext();

const StoreProvider = ({ children }) => {
  const [response, setResponse] = useState(null);
  const [tripdate, setTripDate] = useState('');
  const [scheduleDate, setScheduleDate] = useState(
    undefined >
      {
        from: new Date(2022, 0, 20),
        to: addDays(new Date(2022, 0, 20), 20),
      }
  );

  const value = {
    response,
    setResponse,
    tripdate,
    setTripDate,
    scheduleDate,
    setScheduleDate,
  };
  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
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
