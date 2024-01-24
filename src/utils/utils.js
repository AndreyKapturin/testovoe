export let config_parse_path = {
  content: 'content',
  props: 'props',
  width: 'width',
  height: 'height',
  visible: 'visible',
  caption: 'caption',
  type: 'type',
}

export function parsePath (path) {
  let str = '';
  let prop = [];

  for (let i = 0; i < path.length; i++) {
    if (path[i] === '.') continue
    if (path[i] === '[') {
      prop.push(Number(path[i + 1]))
      i += 2
      continue
    }
    str += path[i];
    if (str in config_parse_path) {
      prop.push(str)
      str = ''
    }
  }
  if (str !== '') {
    return new Error('Неверный путь')
  }
  return prop
}

export function goPath (pathStr, state, newValue) {
  let pathArr = parsePath(pathStr);
  console.log(pathArr);
  let link = state;
  for (const el of pathArr) {
    if (link[el] !== undefined && typeof link[el] === 'object') {
      link = link[el]
    }
    else if (link[el] !== undefined && typeof link[el] !== 'object'){
      link[el] = parse(newValue);
    }
    else {
      link[el] = parse(newValue);
    }
  }
  return link;
}

// export function check_path (pathStr, state) {
//   let pathArr = parsePath(pathStr);

//   for (const el of pathArr) {
//     if (state[el] !== undefined && typeof state[el] === 'object') {
//       state = state[el]
//     }
//     else if (state[el] !== undefined && typeof state[el] !== 'object'){
//       return 
//     }
//     else {
//       state[el] =
//     }
//   }
//   return state;
// }


const regConfig = {
  type: /{.*type\s*:\s*'*"*(?<type>[\w\s]*)'*"*\s*.*}/i,
  props: /.*{.*props\s*:\s*{.*}.*}/i,
  caption: /.*{.*{.*caption\s*:\s*('|")(?<caption>.*)('|").*}.*}/i,
  visible: /.*{.*{.*visible\s*:\s*(?<visible>(true|false)).*}.*}/i,
  width: /.*{.*{.*width\s*:\s*(?<width>\d*).*}.*}/i,
  height: /.*{.*{.*height\s*:\s*(?<height>\d*).*}.*}/i,
  isObj: /.*{.*props\s*:.*{.*}.*}/i,
};

function parse(str) {
  if (regConfig.isObj.test(str)) {
    return string_to_object(str);
  }
  else {
    return parseInt(str) || str;
  }
}

function string_to_object (str) {
  let result;
  let type = str.match(regConfig.type).groups.type;

  switch (type) {
    case 'panel': {
      result = {
        type: 'panel',
        props: {},
        content: [],
      };

      let width = str.match(regConfig.width)?.groups?.width;

      if (width) {
        result.props.width = Number(width);
      } else {
        return new Error(
          'Неверно указано свойство "width". Свойство должно быть записано в виде числа'
        );
      }

      let height = str.match(regConfig.height)?.groups?.height;

      if (height) {
        result.props.height = Number(height);
      } else {
        return new Error(
          'Неверно указано свойство "height". Свойство должно быть записано в виде числа'
        );
      }

      let visible = str.match(regConfig.visible)?.groups?.visible;

      if (visible) {
        result.props.visible = visible === 'true' || visible === 'True';
      } else {
        return new Error('Неверно указано свойство "visible". Свойство должно быть true или false');
      }
      return result;
    }
    case 'label': {
      result = {
        type: 'label',
        props: {},
      };

      let caption = str.match(regConfig.caption)?.groups?.caption;

      if (caption) {
        result.props.caption = caption;
      } else {
        return new Error(
          'Неверно указано свойство "caption". Свойство должно быть записано в виде строки'
        );
      }

      let visible = str.match(regConfig.visible)?.groups?.visible;

      if (visible) {
        result.props.visible = visible === 'true' || visible === 'True';
      } else {
        return new Error('Неверно указано свойство "visible". Свойство должно быть true или false');
      }
      return result;
    }
    case 'button': {
      result = {
        type: 'button',
        props: {},
      };
      let width = str.match(regConfig.width)?.groups?.width;

      if (width) {
        result.props.width = Number(width);
      } else {
        return new Error(
          'Неверно указано свойство "width". Свойство должно быть записано в виде числа'
        );
      }

      let height = str.match(regConfig.height)?.groups?.height;

      if (height) {
        result.props.height = Number(height);
      } else {
        return new Error(
          'Неверно указано свойство "height". Свойство должно быть записано в виде числа'
        );
      }
      let caption = str.match(regConfig.caption)?.groups?.caption;

      if (caption) {
        result.props.caption = caption;
      } else {
        return new Error(
          'Неверно указано свойство "caption". Свойство должно быть записано в виде строки'
        );
      }

      let visible = str.match(regConfig.visible)?.groups?.visible;

      if (visible) {
        result.props.visible = visible === 'true' || visible === 'True';
      } else {
        return new Error('Неверно указано свойство "visible". Свойство должно быть true или false');
      }
      return result;
    }
    default: {
      return new Error('Неверно указано свойство "type". Свойство должно "panel", "label" или "button"');
    }
  }
}

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