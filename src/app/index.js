import { Module } from "cerebral";
import * as sequences from "./sequences";
import { id } from "./providers";
import { router, storage } from "./modules";

export default Module({
  state: {
    colors: {
      clBlue: '#0095f3',
      clRed: '#ff4b8b',
      clYellow: '#ffe632',
      clGreen: '#00cc05',
      clMint: '#ccf5cd',
    },
    sideEditor: {
      visible: true,
      activeTab: 0,
      conditions: {
        selected: null,
        edited: null,
      },
      schedule: {
        srcSchedule: {
          activities: {
            selected: null,
            edited: null,
          },
          timeBlocks: {
            selected: null,
            edited: null,
          },
          milestones: {
            selected: null,
            edited: null,
          },
        },
        dstSchedule: {
          activities: {
            selected: null,
            edited: null,
          },
          timeBlocks: {
            selected: null,
            edited: null,
          },
          milestones: {
            selected: null,
            edited: null,
          },
        },
      }
    },
    undo: {
      stack: [],
      head: -1,
    }
  },
  signals: {
    loadFile: sequences.loadFile,
    setData: sequences.setData, //TODO: REMOVE
    downloadFile: sequences.downloadFile,
    convertOnline: sequences.convertOnline,
    openSideEditor: sequences.openSideEditor,
    setSideEditorTab: sequences.setSideEditorTab,
    /* edit conditions */
    deleteItem: sequences.deleteItem,
    selectItem: sequences.selectItem,
    editItem: sequences.editItem,
    closeModalEditor: sequences.closeModalEditor,
    saveEntityData: sequences.saveEntityData,
    /* undo sequences */
    undoPush: sequences.undoPush,
    undoUndo: sequences.undoUndo,
    undoRedo: sequences.undoRedo,

    rootRouted: sequences.redirectToAll,
    newTodoTitleChanged: sequences.changeNewTodoTitle,
    newTodoSubmitted: sequences.submitNewTodo,
    todoNewTitleChanged: sequences.changeTodoTitle,
    todoNewTitleSubmitted: sequences.submitTodoTitle,
    removeTodoClicked: sequences.removeTodo,
    todoDoubleClicked: sequences.editTodo,
    toggleAllChanged: sequences.toggleAllChecked,
    toggleTodoCompletedChanged: sequences.toggleTodoCompleted,
    todoNewTitleAborted: sequences.abortEdit,
    clearCompletedClicked: sequences.clearCompletedTodos,
    filterClicked: sequences.changeFilter
  },
  providers: {
    id
  },
  modules: {
    router,
    storage
  }
});
