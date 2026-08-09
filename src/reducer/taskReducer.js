export const initialState = {
  tasks: [],
  loading: false,
  error: null,
  submitting: false,
};

export function taskReducer(state, action) {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, loading: true, error: null };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, tasks: action.payload };
    case "FETCH_ERROR":
      return { ...state, loading: false, error: action.payload };
    case "ADD_START":
      return { ...state, submitting: true };
    case "ADD_TASK":
      return {
        ...state,
        submitting: false,
        tasks: [...state.tasks, action.payload],
      };
    case "ADD_ERROR":
      return { ...state, submitting: false };
    case "UPDATE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === action.payload.id ? action.payload : t
        ),
      };
    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((t) => t.id !== action.payload),
      };
    case "REORDER_TASKS":
      return {
        ...state,
        tasks: action.payload,
      };
    default:
      return state;
  }
}