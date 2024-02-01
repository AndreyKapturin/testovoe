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

export function change_value_by_path(keys_arr, state, new_value) {

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
      state[key] = new_value;
    }
    
    if (typeof state[key] !== 'object' && state[key] !== undefined) {
      state[key] = new_value;
    }

  }
  return state;

}

const regConfig = {
  type: /{.*type\s*:\s*'*"*(?<type>[\w\s]*)'*"*\s*.*}/i,
  caption: /.*{.*{.*caption\s*:\s*('|")(?<caption>.*)('|").*}.*}/i,
  visible: /.*{.*{.*visible\s*:\s*(?<visible>(true|false)).*}.*}/i,
  width: /.*{.*{.*width\s*:\s*(?<width>\d*).*}.*}/i,
  height: /.*{.*{.*height\s*:\s*(?<height>\d*).*}.*}/i,
  is_object: /{\s*type:\s*[\w\s'"]*, props: {.*}\s*}|{\s*props: {.*}, type:\s*[\w\s'"]*\s*}/,
  is_number: /^\d*$/,
  is_string: /^.*[^{}\[\]]$/,
  is_boolean: /^true|false$/,
};

export function get_value_type(str) {
  if (regConfig.is_object.test(str)) {
    return 'object';
  }
  if (regConfig.is_number.test(str)) {
    return 'number';
  }
  if (regConfig.is_boolean.test(str)) {
    return 'boolean';
  }
  if (regConfig.is_string.test(str)) {
    return 'string';
  }
  return false;
}

export function string_to_object(str) {
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
        return 'Напишите свойство "width" в виде числа';
      }

      let height = str.match(regConfig.height)?.groups?.height;

      if (height) {
        result.props.height = Number(height);
      } else {
        return 'Напишите свойство "height" в виде числа'
      }

      let visible = str.match(regConfig.visible)?.groups?.visible;

      if (visible) {
        result.props.visible = visible === 'true' || visible === 'True';
      } else {
        return 'Напишите свойство "visible" в виде true или false';
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
        return 'Напишите свойство "caption" в виде строки в кавычках \'\'';
      }

      let visible = str.match(regConfig.visible)?.groups?.visible;

      if (visible) {
        result.props.visible = visible === 'true' || visible === 'True';
      } else {
        return 'Напишите свойство "visible" в виде true или false';
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
        return 'Напишите свойство "width" в виде числа';
      }

      let height = str.match(regConfig.height)?.groups?.height;

      if (height) {
        result.props.height = Number(height);
      } else {
        return 'Напишите свойство "height" в виде числа';
      }
      let caption = str.match(regConfig.caption)?.groups?.caption;

      if (caption) {
        result.props.caption = caption;
      } else {
        return 'Напишите свойство "caption" в виде строки в кавычках \'\'';
      }

      let visible = str.match(regConfig.visible)?.groups?.visible;

      if (visible) {
        result.props.visible = visible === 'true' || visible === 'True';
      } else {
        return 'Напишите свойство "visible" в виде true или false';
      }
      return result;
    }
    default: {
      return 'Неверно указано свойство "type". Свойство должно "panel", "label" или "button"';
    }
  }
}

export function convert(str, type) {
  switch(type){
    case 'number': {
      return Number(str);
    }
    case 'boolean': {
      return str === 'true' ? true : false;
    }
    case 'string': {
      return str;
    }
    default:
      new console.error('Ошибка конвертации');
  }
}

const value_types = {
  width: 'number',
  height: 'number',
  visible: 'boolean',
  caption: 'string',
  type: false,
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
    
    if (typeof state[key] !== 'object' && state[key] !== undefined) {
      return value_types[keys_arr.at(-1)];
    }

    if (is_undefined) {
      return false;
    }
    
  }

  return false;

}