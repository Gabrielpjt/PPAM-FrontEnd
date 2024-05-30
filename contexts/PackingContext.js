import { createContext, useReducer } from 'react';

export const PackingsContext = createContext({
  packing: [],
  addPacking: ({ title, price, stock, image, composition, description }) => {},
  setPackings: (flowers) => {},
  deletePacking: (id) => {},
  updatePacking: (id, { title, price, stock, image, composition, description }) => {},
});

function packingsReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return [action.payload, ...state];
    case 'SET':
      const inverted = action.payload;
      return inverted;
    case 'UPDATE':
      const updatablePackingIndex = state.findIndex(
        (packing) => packing.id === action.payload.id
      );
      const updatablePacking = state[updatablePackingIndex];
      const updatedItem = { ...updatablePacking, ...action.payload.data };
      const updatedPackings = [...state];
      updatedPackings[updatablePackingIndex] = updatedItem;
      return updatedPackings;
    case 'DELETE':
      return state.filter((packing) => packing.id !== action.payload);
    default:
      return state;
  }
}

function PackingsContextProvider({ children }) {
  const [packingsState, dispatch] = useReducer(packingsReducer, []);

  function addPacking(packingData) {
    dispatch({ type: 'ADD', payload: packingData });
  }

  function setPackings(packings) {
    dispatch({ type: 'SET', payload: packings });
  }

  function deletePacking(id) {
    dispatch({ type: 'DELETE', payload: id });
  }

  function updatePacking(id, packingData) {
    dispatch({ type: 'UPDATE', payload: { id: id, data: packingData } });
  }

  const value = {
    packings: packingsState,
    setPackings: setPackings,
    addPacking: addPacking,
    deletePacking: deletePacking,
    updatePacking: updatePacking,
  };

  return (
    <PackingsContext.Provider value={value}>
      {children}
    </PackingsContext.Provider>
  );
}

export default PackingsContextProvider;

