import { Module } from "cerebral";
import * as sequences from "./sequences";
import { id } from "./providers";
import { router } from "./modules";

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
      visible: false,
      activeTab: 0,
      conditions: {
        selected: null,
        edited: null,
      },
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
    },
    undo: {
      stack: [],
      head: -1,
    }
  },
  signals: {
    /* services */
    loadFile: sequences.loadFile,
    setData: sequences.setData,
    clearDoc: sequences.clearDoc,
    downloadFile: sequences.downloadFile,
    convertOnline: sequences.convertOnline,
    /* common behavior */
    openSideEditor: sequences.openSideEditor,
    setSideEditorTab: sequences.setSideEditorTab,
    selectGraphSchedule: sequences.selectGraphSchedule,
    /* edit conditions */
    deleteItem: sequences.deleteItem,
    selectItem: sequences.selectItem,
    editItem: sequences.editItem,
    closeModalEditor: sequences.closeModalEditor,
    saveItem: sequences.saveItem,
    /* undo sequences */
    undoPush: sequences.undoPush,
    undoUndo: sequences.undoUndo,
    undoRedo: sequences.undoRedo,

    rootRouted: sequences.redirectToAll,
  },
  providers: {
    id,
  },
  modules: {
    router,
  }
});
