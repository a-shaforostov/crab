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

export const clearDoc = [
  actions.undoClear,
  actions.clearDoc,
  actions.undoPush,
];

export const setData = [
  actions.undoClear,
  actions.setData,
  actions.undoPush,
];

export const downloadFile = actions.downloadFile;

// export const convertOnline = [
//   actions.convertOnlineStart,
//   actions.convertOnlineSuccess,
// ];

export const convertOnline = actions.convertOnlineStart;

export const openSideEditor = set(state`sideEditor.visible`, props`visible`);
export const setSideEditorTab = set(state`sideEditor.activeTab`, props`tab`);
export const selectGraphSchedule = [
  set(state`data.chart.schedule`, props`schedule`),
  undoPush,
];

export const deleteItem = [
  actions.deleteItem,
  set(state`sideEditor.conditions.selected`, null),
  undoPush,
];
export const selectItem = actions.selectItem;
export const editItem = actions.editItem;
export const closeModalEditor = actions.closeModalEditor;

export const saveItem = [
  actions.saveItem,
  undoPush,
];

export const redirectToAll = redirect("/all");
