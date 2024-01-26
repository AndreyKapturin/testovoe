

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

  let key, is_object, is_last_key, is_not_last_key, is_undefined;

  for (let i = 0; i < keys_arr.length; i++) {

    key = keys_arr[i];
    is_object = typeof state[key] === 'object';
    is_last_key = i === keys_arr.length - 1;
    is_not_last_key = i < keys_arr.length - 1;
    is_undefined = state[key] === undefined;

    if (is_object && is_not_last_key) {
      state = state[key];
      continue;
    }

    if ((is_object || is_undefined) && is_last_key && !isNaN(key)) {
      return 'object';
    }

    if (typeof state[key] !== 'object' && state[key] !== undefined) {;
      return value_types[keys_arr.at(-1)];
    }
    
  }

  return new Error('Указан неверный путь');

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
