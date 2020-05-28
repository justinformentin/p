export const initialState = {
  open: true,
};

export const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR';

export const toggleSidebar = open => ({
  type: TOGGLE_SIDEBAR,
  payload: { open },
});

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case TOGGLE_SIDEBAR:
      return {
        ...state,
        open: payload.open,
      };
    default:
      return state;
  }
};

export default reducer;
