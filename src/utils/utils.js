export let conf = {
  content: 'content',
  props: 'props',
  width: 'width',
  height: 'height',
  visible: 'visible',
  caption: 'caption',
}

export function parsePath (path, conf) {
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
    if (str in conf) {
      prop.push(str)
      str = ''
    }
  }
  if (str !== '') {
    return new Error('Неверный путь')
  }
  return prop
}

export function goPath (pathArr, state, newValue) {
  let link = state;
  for (const el of pathArr) {
    if (link[el] !== undefined && typeof link[el] === 'object') {
      link = link[el]
    }
    else if (link[el] !== undefined && typeof link[el] !== 'object'){
      link[el] = parseInt(newValue) || newValue;
    }
    else {
      return new Error('Неверный путь')
    }
  }
  return link;
}