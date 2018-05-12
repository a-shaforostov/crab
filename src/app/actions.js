import computedIsAllChecked from "../computed/isAllChecked";
import computedVisibleTodosUids from "../computed/visibleTodosUids";
import {set} from "cerebral/operators";
import {state, props} from "cerebral/tags";

export function toggleAllChecked({ state, resolve }) {
  const isCompleted = !resolve.value(computedIsAllChecked);
  const currentTodosUids = resolve.value(computedVisibleTodosUids);

  currentTodosUids.forEach(uid => {
    state.set(`todos.${uid}.completed`, isCompleted);
  });
}

export function addTodo({ state, id }) {
  state.set(`todos.${id.create()}`, {
    title: state.get("newTodoTitle"),
    completed: false
  });
}

export function clearCompletedTodos({ state }) {
  const todos = state.get("todos");

  Object.keys(todos).forEach(uid => {
    if (todos[uid].completed) {
      state.unset(`todos.${uid}`);
    }
  });
}

export function downloadFile({ props }) {
  const { data, filename } = props;
  const link = document.createElement("a");
  link.download = filename;
  link.href = data;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export async function loadFile({ state, props }) {

  function readFile(file){
    return new Promise((resolve, reject) => {
      const fr = new FileReader();
      fr.onload = () => {
        resolve(fr.result)
      };
      fr.readAsText(file);
    });
  }

  const { filename } = props;

  let data;
  try {
    data = await readFile(filename);
  } catch(e) {
    alert('Can`t read file');
    return;
  }

  let dataObj;
  try {
    dataObj = JSON.parse(data);
  } catch(e) {
    alert('wrong file format');
    return;
  }

  state.set('data', dataObj);
}

export async function convertOnlineStart({ props }) {
  debugger;
  let response;
  try {
    response = await fetch(props.url, {
      method: props.method,
      body: JSON.stringify(props.body)
    });
  } catch(e) {
    console.error(e);
    return Promise.reject(e);
  }
  // debugger;
  // const json = await response.json();
  // debugger;
  return response.json();
}

export async function convertOnlineSuccess({ props }) {
  debugger;
  set(state`resultJSON`, props.json);
}

export function deleteCondition({ state, props }) {
  const newList = state.get('data.outerConditions').filter(cond => cond.id !== props.id).map(item => {
    return { ...item }
  });
  state.set('data.outerConditions', newList);
}

// export const undoPush = [
//   // splice(state`undo.stack`, state`undo.head` + 1, 20),
//   push(state`undo.stack`, state`data`),
//   when (state`undo.stack`, value => value.length > 20),
//   {
//     true: [
//       shift(state`undo.stack`),
//       set(state`undo.head`, 19),
//     ],
//     false: [
//       increment(state`undo.head`, 1),
//     ],
//   },
// ];

export function undoClear({ state }) {
  state.set('undo.stack', []);
  state.set('undo.head', -1);
}

export function undoPush({ state }) {
  state.splice(`undo.stack`, state.get('undo.head') + 1, 20);
  state.push(`undo.stack`, Object.assign({}, state.get(`data`)));
  const stack = state.get('undo.stack');
  if (stack.length > 20) {
    state.shift('undo.stack');
    state.set('undo.head', 19)
  } else {
    state.increment('undo.head', 1);
  }
};

export function undoUndo({ state }) {
  const head = state.get(`undo.head`);

  // push current
  // state.push(`undo.stack`, Object.assign({}, state.get(`data`)));
  // const stack = state.get('undo.stack');
  // if (stack.length > 20) {
  //   state.shift('undo.stack');
  //   state.set('undo.head', 19)
  // } else {
  //   state.increment('undo.head', -1);
  // }

  // get prev
  const val = Object.assign({}, state.get(`undo.stack`)[head-1]);
  state.set('data', val);
  state.set('undo.head', head - 1);
}

export function undoRedo({ state }) {
  const head = state.get(`undo.head`);
  state.increment('undo.head', 1);
  const val = Object.assign({}, state.get(`undo.stack`)[head+1]);
  state.set('data', val);
};



//TODO: REMOVE
export function setData({ state, props }) {
  state.set('data', props.data);
}
