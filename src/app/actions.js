import {set} from "cerebral/operators";
import {state} from "cerebral/tags";

const defaultData = {
  timeShift: 5,
  srcSchedule: {
    name: 'Regular',
    milestones: [],
    activities: [],
    timeBlocks: [],
  },
  dstSchedule: {
    name: 'Optimized',
    milestones: [],
    activities: [],
    timeBlocks: [],
  },
  conditions: [],
  chart: {
    color: 'clMint',
    schedule: 'dstSchedule',
  },
};

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
  let response;
  try {
    response = await fetch(props.url, {
      method: props.method,
      body: JSON.stringify(props.body)
    });
  } catch(e) {
    return Promise.reject(e);
  }
  // debugger;
  // const json = await response.json();
  // debugger;
  return response.json();
}

export async function convertOnlineSuccess({ props }) {
  set(state`resultJSON`, props.json);
}

export function clearDoc({ state }) {
  state.set('data', defaultData);
}

function pathBuilder(props, root, item) {
  const schedule = props.schedule;
  const entity = props.entity;

  const path = [root];
  if (schedule) path.push(schedule);
  if (entity) path.push(entity);
  if (item) path.push(item);
  return path.join('.');
}

export function selectItem({ state, props }) {
  state.set(pathBuilder(props, 'sideEditor', 'selected'), props.id);
}

export function deleteItem({ state, props }) {
  const path = pathBuilder(props, 'data');
  const newList = state.get(path).filter(item => item.id !== props.id).map(item => {
    return { ...item }
  });
  state.set(path, newList);
}

export function editItem({ state, props }) {
  const id = props.id;
  const isCopy = props.isCopy;
  state.set(pathBuilder(props, 'sideEditor', 'edited'), id ? id : -1);
  state.set(pathBuilder(props, 'sideEditor', 'isCopy'), isCopy);
}

export function closeModalEditor({ state, props }) {
  state.set(pathBuilder(props, 'sideEditor', 'edited'), null);
}

export function saveItem({ state, props }) {
  const data = props.data;
  let id = data.id;
  const path = pathBuilder(props, 'data');
  if (id === -1) {
    // new
    id = Date.now();
    const newDataItem = {
      ...data,
      id,
    };
    state.push(path, newDataItem);
  } else {
    //edit
    const stateData = state.get(path);
    const newData = stateData.map(item => item.id === id ? data : item);
    state.set(path, newData);
  }
}

/**
 * Clear undo buffer
 * @param state
 */
export function undoClear({ state }) {
  state.set('undo.stack', []);
  state.set('undo.head', -1);
}

/**
 * Push state in buffer
 * @param state
 */
export function undoPush({ state }) {
  state.splice(`undo.stack`, state.get('undo.head') + 1, 20);
  state.push(`undo.stack`, JSON.parse(JSON.stringify(state.get(`data`))));
  const stack = state.get('undo.stack');
  if (stack.length > 20) {
    state.shift('undo.stack');
    state.set('undo.head', 19)
  } else {
    state.increment('undo.head', 1);
  }
}

/**
 * Undo
 * @param state
 */
export function undoUndo({ state }) {
  const head = state.get(`undo.head`);

  // get prev
  const val = Object.assign({}, JSON.parse(JSON.stringify(state.get(`undo.stack`)[head-1])));
  state.set('data', val);
  state.set('undo.head', head - 1);
}

/**
 * Redo
 * @param state
 */
export function undoRedo({ state }) {
  const head = state.get(`undo.head`);
  state.increment('undo.head', 1);
  const val = Object.assign({}, JSON.parse(JSON.stringify(state.get(`undo.stack`)[head+1])));
  state.set('data', val);
}

/**
 * Demo data
 * @param state
 * @param props
 */
export function setData({ state, props }) {
  state.set('data', props.data);
}
