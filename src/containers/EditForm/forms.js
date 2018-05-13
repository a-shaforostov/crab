import { TimeEditorFactory, TextEditorFactory, SelectEditorFactory } from './editors';

export const conditionForm = () => ({
  elements: [
    {
      type: 'TimeEditorFactory',
      options: {
        name: "time1",
        label: "Start time",
        required: true,
        autofocus: true,
      },
    },
    {
      type: 'TimeEditorFactory',
      options: {
        name: "duration",
        label: "Duration",
      },
    },
    {
      type: 'TimeEditorFactory',
      options: {
        name: "time2",
        label: "Finish time",
      },
    },
    {
      type: 'TextEditorFactory',
      options: {
        name: "name",
        label: "Description",
        required: true,
      },
    },
    {
      type: 'SelectEditorFactory',
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
