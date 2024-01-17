import { createSlice } from '@reduxjs/toolkit';
import { goPath } from '../utils/utils';

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
      try {
        new Function('state', 'str', `return (str.endsWith(']') && typeof ${payload.newValue} === 'object') ? state.${payload.path} = ${payload.newValue} : new Error('Не пихай объект сюда')`)(state, payload.path);
        // new Function('state', `return state.${payload.path} ? state.${payload.path} = ${payload.newValue} : `)(state);
// let path = "content[3]";

        } catch (error) {
        console.log(new Error('Big jopa'));
        }
        
      // goPath(payload.path, state, payload.newValue);
    },
  },
});

export const { changeElem } = contentSlice.actions;
export default contentSlice.reducer;


// Добавление элемента:
// 1. Путь указывает на несуществующий индекс массива (любого content)
// 2. Путь заканчивается на ']'
// 3. Передаем объект
// Надо придумать как не пихать объект в другие поля кроме content