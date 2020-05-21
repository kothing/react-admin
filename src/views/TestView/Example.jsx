import React, { useReducer} from "react";
import { Layout, Divider } from "antd";
import WebBreadcrumb from "@/components/WebBreadcrumb";

const initialState = {
  past: [
    {
      count: 0
    }
  ],
  present: {
    count: 1
  },
  future: []
};

function init(initialState) {
  return {
    past: initialState.past,
    present: initialState.present,
    future: [],
  };
}
function reducer(state, action) {
  const { past, future, present } = state;
  switch (action.type) {
    case "UNDO":
      const previous = past[past.length - 1];
      const newPast = past.slice(0, past.length - 1);
      return {
        past: newPast,
        present: previous,
        future: [present, ...future],
      };
    case "INCREMENT":
      past.push(present);
      return {
        ...state,
        past: past,
        present: {
          count: present.count + 1
        }
      };
    case "REDO":
      const next = future[0];
      const newFuture = future.slice(1);
      return {
        past: [...past, present],
        present: next,
        future: newFuture,
      };
    default:
      return state;
  }
}

const Example = () => {
  const [state, dispatch] = useReducer(reducer, initialState, init);
  return (
    <Layout>
      <div>
        <WebBreadcrumb arr={["示例"]} />
      </div>
      <div className="base-style">
        <h3>示例</h3>
        <Divider />
        <p>这个示例</p>
        <p>{state.present.count}</p>
        {state.past && state.past.length > 0 ? <button onClick={() => dispatch({ type: "UNDO" })}>后退UNDO</button> : <button disabled>后退UNDO</button>} 
        <button onClick={() => dispatch({type: "INCREMENT"})}>增加INCREMENT</button> 
        {state.future && state.future.length > 0 ? <button onClick={() => dispatch({ type: "REDO" })}>前进REDO</button> : <button disabled>前进REDO</button>}
      </div>
    </Layout>
  );
};

export default Example;
