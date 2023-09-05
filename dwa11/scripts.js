import { createStore, createReducer } from "./store.mjs";

// Scenarios
const reducer = createReducer();
const store = createStore(reducer);

/**
 * Logs the current state to the console.
 */
function logState() {
  console.log("Current state:", store.getState());
}

logState(); // Expect: { count: 0 }

store.dispatch({ type: "ADD" });
store.dispatch({ type: "ADD" });
logState(); // Expect: { count: 2 }

store.dispatch({ type: "SUBTRACT" });
logState(); // Expect: { count: 1 }

store.dispatch({ type: "RESET" });
logState(); // Expect: { count: 0 };
