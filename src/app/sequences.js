import { redirect } from "@cerebral/router/operators";
import { set, toggle, unset, when } from "cerebral/operators";
import { props, state } from "cerebral/tags";
import * as actions from "./actions";

// import data from '../data';

/* undo sequences */
export const undoPush = actions.undoPush;
export const undoUndo = actions.undoUndo;
export const undoRedo = actions.undoRedo;

export const loadFile = [
  actions.undoClear,
  actions.loadFile,
  actions.undoPush,
];

export const setData = actions.setData; //TODO: REMOVE

export const downloadFile = actions.downloadFile;

// export const convertOnline = [
//   actions.convertOnlineStart,
//   actions.convertOnlineSuccess,
// ];

export const convertOnline = actions.convertOnlineStart;

export const openSideEditor = set(state`sideEditor.visible`, props`visible`);
export const setSideEditorTab = set(state`sideEditor.activeTab`, props`tab`);

export const deleteItem = [
  // set(state`data.conditions`, (state`data.conditions`).filter(id => id !== props`id`)),
  actions.deleteItem,
  set(state`sideEditor.conditions.selected`, null),
  undoPush,
];
export const selectItem = actions.selectItem;
export const editItem = actions.editCondition;

export const closeModalEditor = set(state`sideEditor.${props`entity`}.edited`, null);
export const saveEntityData = [
  actions.saveEntityData,
  undoPush,
];


export const redirectToAll = redirect("/all");

export const changeNewTodoTitle = set(state`newTodoTitle`, props`title`);

export const removeTodo = unset(state`todos.${props`uid`}`);

export const toggleAllChecked = actions.toggleAllChecked;

export const toggleTodoCompleted = toggle(state`todos.${props`uid`}.completed`);

export const clearCompletedTodos = actions.clearCompletedTodos;

export const changeFilter = set(state`filter`, props`filter`);

export const submitNewTodo = [
  when(state`newTodoTitle`),
  {
    true: [actions.addTodo, set(state`newTodoTitle`, "")],
    false: []
  }
];

export const changeTodoTitle = set(
  state`todos.${props`uid`}.editedTitle`,
  props`title`
);

export const editTodo = [
  set(state`todos.${props`uid`}.editedTitle`, state`todos.${props`uid`}.title`),
  set(state`editingUid`, props`uid`)
];

export const abortEdit = [
  unset(state`todos.${props`uid`}.editedTitle`),
  set(state`editingUid`, null)
];

export const submitTodoTitle = [
  when(state`todos.${props`uid`}.editedTitle`),
  {
    true: [
      set(
        state`todos.${props`uid`}.title`,
        state`todos.${props`uid`}.editedTitle`
      ),
      unset(state`todos.${props`uid`}.editedTitle`),
      set(state`editingUid`, null)
    ],
    false: []
  }
];
