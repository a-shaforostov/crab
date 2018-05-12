import { redirect } from "@cerebral/router/operators";
import { set, toggle, unset, when, push, shift, splice, increment } from "cerebral/operators";
import { props, state } from "cerebral/tags";
import * as actions from "./actions";

import data from '../data';

export const loadFile = actions.loadFile;

export const setData = actions.setData; //TODO: REMOVE

export const downloadFile = actions.downloadFile;

// export const convertOnline = [
//   actions.convertOnlineStart,
//   actions.convertOnlineSuccess,
// ];

export const convertOnline = actions.convertOnlineStart;

export const openSideEditor = set(state`sideEditor.visible`, props`visible`);

/* undo sequences */
export const undoPush = [
  splice(state`undo.stack`, 0, state`undo.head`),
  push(state`undo.stack`, state`data`),
  when (state`undo.stack`.length > 20),
  {
    true: shift(state`undo.stack`),
  },
  set(state`undo.head`, state`undo.stack`.length - 1),
];
export const undoUndo = [
  set(state`data`, state`undo.stack[${state`undo.head`}]`),
  increment(state`undo.head`, -1),
];
export const undoRedo = [
  increment(state`undo.head`, 1),
  set(state`data`, state`undo.stack[${state`undo.head`}]`),
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
