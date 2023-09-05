// Global Store Factory
/**
 * Creates a global store.
 * @param {function} reducer - A reducer function to update the state based on actions.
 * @returns {object} The store object with methods for state management.
 */
export function createStore(reducer) {
  let state = { count: 0 };
  const listeners = [];

  /**
   * Retrieves the current state.
   * @returns {object} The current state.
   */
  function getState() {
    return { ...state };
  }

  /**
   * Dispatches an action to update the state.
   * @param {object} action - An action object describing the state change.
   */
  function dispatch(action) {
    state = reducer(state, action);
    listeners.forEach((listener) => listener());
  }

  /**
   * Subscribes a listener to state changes.
   * @param {function} listener - The listener function to be notified on state changes.
   * @returns {function} A function to unsubscribe the listener.
   */
  function subscribe(listener) {
    listeners.push(listener);
    return function unsubscribe() {
      const index = listeners.indexOf(listener);
      if (index !== -1) {
        listeners.splice(index, 1);
      }
    };
  }

  return {
    getState,
    dispatch,
    subscribe,
  };
}

// Reducer Factory
/**
 * Creates a reducer function.
 * @returns {function} The reducer function.
 */
export function createReducer() {
  return function reducer(state = { count: 0 }, action) {
    switch (action.type) {
      case "ADD":
        return { count: state.count + 1 };
      case "SUBTRACT":
        return { count: state.count - 1 };
      case "RESET":
        return { count: 0 };
      default:
        return state;
    }
  };
}
