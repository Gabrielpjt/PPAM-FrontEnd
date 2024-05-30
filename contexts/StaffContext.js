import { createContext, useReducer } from 'react';

export const StaffsContext = createContext({
  staffs: [],
  addStaff: ({ name, deliveries, status, destination, gender, vehicleNumber, phone, photo }) => {},
  setStaffs: (staffs) => {},
  deleteStaff: (id) => {},
  updateStaff: (id, { name, deliveries, status, destination, gender, vehicleNumber, phone, photo }) => {},
});

function staffsReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return [action.payload, ...state];
    case 'SET':
      const inverted = action.payload;
      return inverted;
    case 'UPDATE':
      const updatableStaffIndex = state.findIndex(
        (staff) => staff.id === action.payload.id
      );
      const updatableStaff = state[updatableStaffIndex];
      const updatedItem = { ...updatableStaff, ...action.payload.data };
      const updatedStaffs = [...state];
      updatedStaffs[updatableStaffIndex] = updatedItem;
      return updatedStaffs;
    case 'DELETE':
      return state.filter((staff) => staff.id !== action.payload);
    default:
      return state;
  }
}

function StaffsContextProvider({ children }) {
  const [staffsState, dispatch] = useReducer(staffsReducer, []);

  function addStaff(staffData) {
    dispatch({ type: 'ADD', payload: staffData });
  }

  function setStaffs(staffs) {
    dispatch({ type: 'SET', payload: staffs });
  }

  function deleteStaff(id) {
    dispatch({ type: 'DELETE', payload: id });
  }

  function updateStaff(id, staffData) {
    dispatch({ type: 'UPDATE', payload: { id: id, data: staffData } });
  }

  const value = {
    staffs: staffsState,
    setStaffs: setStaffs,
    addStaff: addStaff,
    deleteStaff: deleteStaff,
    updateStaff: updateStaff,
  };

  return (
    <StaffsContext.Provider value={value}>
      {children}
    </StaffsContext.Provider>
  );
}

export default StaffsContextProvider;

