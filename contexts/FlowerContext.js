import { createContext, useReducer } from 'react';

export const FlowersContext = createContext({
  flowers: [],
  addFlower: ({ title, price, stock, image, composition, description }) => {},
  setFlowers: (flowers) => {},
  deleteFlower: (id) => {},
  updateFlower: (id, { title, price, stock, image, composition, description }) => {},
});

function flowersReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return [action.payload, ...state];
    case 'SET':
      const inverted = action.payload;
      return inverted;
    case 'UPDATE':
      const updatableFlowerIndex = state.findIndex(
        (flower) => flower.id === action.payload.id
      );
      const updatableFlower = state[updatableFlowerIndex];
      const updatedItem = { ...updatableFlower, ...action.payload.data };
      const updatedFlowers = [...state];
      updatedFlowers[updatableFlowerIndex] = updatedItem;
      return updatedFlowers;
    case 'DELETE':
      return state.filter((flower) => flower.id !== action.payload);
    default:
      return state;
  }
}

function FlowersContextProvider({ children }) {
  const [flowersState, dispatch] = useReducer(flowersReducer, []);

  function addFlower(flowerData) {
    dispatch({ type: 'ADD', payload: flowerData });
  }

  function setFlowers(flowers) {
    dispatch({ type: 'SET', payload: flowers });
  }

  function deleteFlower(id) {
    dispatch({ type: 'DELETE', payload: id });
  }

  function updateFlower(id, flowerData) {
    dispatch({ type: 'UPDATE', payload: { id: id, data: flowerData } });
  }

  const value = {
    flowers: flowersState,
    setFlowers: setFlowers,
    addFlower: addFlower,
    deleteFlower: deleteFlower,
    updateFlower: updateFlower,
  };

  return (
    <FlowersContext.Provider value={value}>
      {children}
    </FlowersContext.Provider>
  );
}

export default FlowersContextProvider;

