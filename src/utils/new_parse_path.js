

const state = {
  content: [
    {
      type: 'panel',
      props: {
        width: 500,
        height: 200,
        visible: true,
      },
      content: [, , {}],
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

const value_types = {
  width: 'number',
  height: 'number',
  visible: 'boolean',
  caption: 'string',
  type: new Error ('Нельзя изменять свойство "type"')
}

export function get_type_of_value_by_path(keys_arr, state) {

  let key, is_object, is_array, is_last_key, is_not_last_key, is_undefined;

  for (let i = 0; i < keys_arr.length; i++) {

    key = keys_arr[i];
    is_object = typeof state[key] === 'object';
    is_array = Array.isArray(state[key]);
    is_last_key = i === keys_arr.length - 1;
    is_not_last_key = i < keys_arr.length - 1;
    is_undefined = state[key] === undefined;

    if (is_object && is_not_last_key) {
      state = state[key];
      continue;
    }

    if (is_object && is_last_key && key !== 'props' && !is_array) {
      console.log(1);
      return 'object';
    }
    
    if (is_object && is_last_key && key !== 'props' && is_array) {
      console.log(2);
      return new Error('Указан неверный путь');
    }
    
    if (is_object && is_last_key && key === 'props') {
      console.log(3);
      return new Error('Указан неверный путь');
    }
    
    if (is_undefined && is_last_key && keys_arr[i - 1] === 'content' && !isNaN(key)) {
      console.log(4);
      return 'object';
    }
    
    if (is_undefined && is_not_last_key && keys_arr[i - 1] === 'content') {
      console.log(5);
      return new Error('Указан неверный путь');
    }
    
    if (is_undefined && keys_arr[i - 1] !== 'content') {
      console.log(6);
      return new Error('Указан неверный путь');
    }
    
    if (is_undefined) {
      console.log(7);
      return new Error('Указан неверный путь');
    }
    
    if (typeof state[key] !== 'object' && state[key] !== undefined) {;
      console.log(8);
      return value_types[keys_arr.at(-1)];
    }
  }
}

let tests = [
  "content[0]",
  "content[3]",
  "content[0].",
  "content[0].props",
  "content[0].props.",
  "content[0].props.width",
  "content[1].props.width",
  "content[1].props.visible",
  "content[1].props.caption",
  "content.test",
  "content[0].type",
  "content[0].content",
  "content[0].content[3]",
  "content[1].content[3]",
]

tests.forEach((path) => {
  console.log(path, get_type_of_value_by_path(path.match(/\w*[^\.\[\]]/g), state));
})
