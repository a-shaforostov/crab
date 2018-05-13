export const conditionsForm = () => ({
  elements: [
    {
      type: 'TimeEditorFactory',
      default: '12:00',
      options: {
        name: "time1",
        label: "Start time",
        required: true,
        autofocus: true,
      },
    },
    {
      type: 'TimeEditorFactory',
      default: null,
      options: {
        name: "duration",
        label: "Duration",
      },
    },
    {
      type: 'TimeEditorFactory',
      default: '13:00',
      options: {
        name: "time2",
        label: "Finish time",
      },
    },
    {
      type: 'TextEditorFactory',
      default: '',
      options: {
        name: "name",
        label: "Description",
        required: true,
      },
    },
    {
      type: 'SelectEditorFactory',
      default: '0.5',
      options: {
        name: "opacity",
        label: "Pattern",
        required: true,
      },
      children: [
        { key: 1, value: '0.4', text: '40%' },
        { key: 2, value: '0.5', text: '50%' },
        { key: 3, value: '0.6', text: '60%' },
        { key: 4, value: '0.7', text: '70%' },
        { key: 5, value: '0.8', text: '80%' },
        { key: 6, value: '0.9', text: '90%' },
      ],
    },
  ]
});

export const activitiesForm = () => ({
  elements: [
    {
      type: 'TimeEditorFactory',
      default: '00:00',
      options: {
        name: "time1",
        label: "Start time",
        required: true,
        autofocus: true,
      },
    },
    {
      type: 'TimeEditorFactory',
      default: null,
      options: {
        name: "duration",
        label: "Duration",
      },
    },
    {
      type: 'TimeEditorFactory',
      default: '00:00',
      options: {
        name: "time2",
        label: "Finish time",
      },
    },
    {
      type: 'TextEditorFactory',
      default: '',
      options: {
        name: "name",
        label: "Description",
        required: true,
      },
    },
    {
      type: 'SwitchEditorFactory',
      default: false,
      options: {
        name: "isWork",
        label: "Work",
      },
    },
    {
      type: 'SwitchEditorFactory',
      default: false,
      options: {
        name: "isTransport",
        label: "Transport",
      },
    },
  ]
});

export const milestonesForm = () => ({
  elements: [
    {
      type: 'TimeEditorFactory',
      default: '00:00',
      options: {
        name: "time1",
        label: "Time",
        required: true,
        autofocus: true,
      },
    },
    {
      type: 'TextEditorFactory',
      default: '',
      options: {
        name: "name",
        label: "Description",
        required: true,
      },
    },
    {
      type: 'SelectEditorFactory',
      default: 'clBlue',
      options: {
        name: "color",
        label: "Color",
        required: true,
      },
      children: [
        { key: 1, value: 'clBlue', text: 'Blue' },
        { key: 2, value: 'clRed', text: 'Red' },
        { key: 3, value: 'clYellow', text: 'Yellow' },
        { key: 4, value: 'clGreen', text: 'Green' },
        { key: 5, value: 'clMint', text: 'Mint' },
      ],
    },
  ]
});

export const timeBlocksForm = () => ({
  elements: [
    {
      type: 'TimeEditorFactory',
      default: '00:00',
      options: {
        name: "time1",
        label: "Start time",
        required: true,
        autofocus: true,
      },
    },
    {
      type: 'TimeEditorFactory',
      default: null,
      options: {
        name: "duration",
        label: "Duration",
      },
    },
    {
      type: 'TimeEditorFactory',
      default: '00:00',
      options: {
        name: "time2",
        label: "Finish time",
      },
    },
    {
      type: 'TextEditorFactory',
      default: '',
      options: {
        name: "name",
        label: "Description",
        required: true,
      },
    },
    {
      type: 'SelectEditorFactory',
      default: '0',
      options: {
        name: "type",
        label: "Productivity level",
        required: true,
      },
      children: [
        { key: 0, value: '0', text: 'Loss of time' },
        { key: 1, value: '1', text: 'Work' },
        { key: 2, value: '2', text: 'Flow' },
      ],
    },
    {
      type: 'SelectEditorFactory',
      default: 'clBlue',
      options: {
        name: "color",
        label: "Color",
        required: true,
      },
      children: [
        { key: 1, value: 'clBlue', text: 'Blue' },
        { key: 2, value: 'clRed', text: 'Red' },
        { key: 3, value: 'clYellow', text: 'Yellow' },
        { key: 4, value: 'clGreen', text: 'Green' },
        { key: 5, value: 'clMint', text: 'Mint' },
      ],
    },
    {
      type: 'SwitchEditorFactory',
      default: false,
      options: {
        name: "isHigh",
        label: "High block",
      },
    },
    {
      type: 'SwitchEditorFactory',
      default: false,
      options: {
        name: "isHidden",
        label: "Hide block label",
      },
    },
  ]
});
