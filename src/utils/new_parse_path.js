

const state = {
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

// let path_str = "content[0]";
// let path_str = "content[0].prors.width";
// let path_str = "content[0].props";
// let path_str = "content[0].content[1].props.width";
// let path_str = "content[2].props.width";
let path_str = "content[0].content[0]";
let reg_exp = /\w*[^\.\[\]]/g
let result = path_str.match(reg_exp)
console.log(result);

const types = {
  width: 'number',
  height: 'number',
  visible: 'boolean',
  caption: 'string',
}

function get_value_type_by_path(pathArr, state) {
  let key = '';

  for (let i = 0; i < pathArr.length; i++) {
    key = pathArr[i];

    if (typeof state[key] === 'object' && i < pathArr.length - 1) {
      state = state[key];
      continue;
    }
    
    if (typeof state[key] === 'object' && i === pathArr.length - 1) {
      return 'object';
    }
    
    if (state[key] === undefined && pathArr[i - 1] === 'content' && i === pathArr.length - 1) {
      return 'object';
    }
    
    if (state[key] === undefined && pathArr[i - 1] === 'content' && i < pathArr.length - 1) {
      return new Error('Указан неверный путь');
    }
    
    if (state[key] === undefined && pathArr[i - 1] ==! 'content') {
      return new Error('Указан неверный путь');
    }
    
    if (state[key] === undefined) {
      return new Error('Указан неверный путь');
    }
    
    if (typeof state[key] !== 'object' && state[key]) {;
      return types[pathArr.at(-1)];
    }
  }
}

console.log(get_value_type_by_path(result, state));


// Проверить существование пути
// Проверить ожидаемые данные по этому пути

// let path_str = "content[0]";
// let path_str = "content[0].prors.width";
// let path_str = "content[0].props";
// let path_str = "content[0].content[1].props.width";