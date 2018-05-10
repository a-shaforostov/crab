import computedIsAllChecked from "../computed/isAllChecked";
import computedVisibleTodosUids from "../computed/visibleTodosUids";
import {set} from "cerebral/operators";
import {state} from "cerebral/tags";

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

//TODO: REMOVE
export function setData({ state, props }) {
  state.set('data', props.data);
}
