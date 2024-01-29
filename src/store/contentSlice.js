import { createSlice } from '@reduxjs/toolkit';
import { change_value_by_path } from '../utils/utils';

const initialState = {
  content: [
    {
      type: 'panel',
      props: {
        width: 500,
        height: 200,
        visible: true,
      },
      content: [],
    },
    {
      type: 'label',
      props: {
        caption: 'test',
        visible: false,
      },
    },
    {
      type: 'button',
      props: {
        width: 100,
        height: 50,
        visible: true,
        caption: 'Кнопка',
      },
    },
  ],
};

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    changeElem(state, { payload }) {
      change_value_by_path(payload.path, state, payload.new_value);
    },
  },
});

export const { changeElem } = contentSlice.actions;
export default contentSlice.reducer;
