import React, { useState } from 'react';
import s from './editor.module.css';
import { useDispatch, useSelector } from 'react-redux';
import Builder from '../Bulder/Builder';
import { changeElem } from '../../store/contentSlice';
import { convert, get_type_of_value_by_path, get_value_type, string_to_object } from '../../utils/utils';

const Editor = () => {
  const dispatch = useDispatch();
  const { content } = useSelector((s) => s.content);
  const [path, set_path] = useState([]);
  const [expected_value_type, set_expected_value_type] = useState('');
  const [path_is_valid, set_path_is_valid] = useState(false);
  const [path_error, set_path_error] = useState('');
  const [new_value, set_new_value] = useState('');
  const [new_value_is_valid, set_new_value_is_valid] = useState(false);
  const [new_value_error, set_new_value_error] = useState('');

  function formSubmitter(e) {
    e.preventDefault();
    dispatch(changeElem({path, new_value}));
    e.target.reset();
    set_path_error('');
    set_path_is_valid(false);
    set_expected_value_type('');
    set_new_value_error('');
    set_new_value_is_valid(false);
  }

  function validate_path(e) {
    if (e.target.value) {
      let path_keys = e.target.value.match(/\w*[^\.\[\]]/g);
      let type = get_type_of_value_by_path(path_keys, { content });

      if (type) {
        set_expected_value_type(type);
        set_path_is_valid(true);
        set_path_error('');
        set_path(path_keys);
      } else {
        set_expected_value_type('');
        set_path_is_valid(false);
        set_path_error('Неверно указан путь');
        set_path([]);
      }
    } else {
      set_expected_value_type('');
      set_path_is_valid(false);
      set_path_error('');
    }
  }

  function validate_new_value(e) {
    let value = e.target.value;
    let value_type = get_value_type(value);

    if (value && value_type) {
      if (value_type === 'object') {
        if (expected_value_type === value_type) {
          let converted_obj = string_to_object(value);
          if (typeof converted_obj === 'object') {
            set_new_value_is_valid(true);
            set_new_value(converted_obj);
            set_new_value_error('');
          }
          else {
            set_new_value_is_valid(false);
            set_new_value('');
            set_new_value_error(converted_obj);
          }
        }
        else {
          set_new_value_is_valid(false);
          set_new_value('');
          set_new_value_error(`Введенный тип данных - ${value_type}`);
        }
      }
      else {
        if (expected_value_type === value_type) {
          set_new_value_is_valid(true);
          set_new_value(convert(value, value_type));
          set_new_value_error('');
        }
        else {
          set_new_value_is_valid(false);
          set_new_value('');
          set_new_value_error(`Введенный тип данных - ${value_type}`);
        }
      }
    }
    else {
      set_new_value_is_valid(false);
      set_new_value('');
      set_new_value_error('');
    }
  }

  return (
    <div className={s.editor}>
      <div className={s.editor_header}>
        <form onSubmit={formSubmitter}>
          <label>
            Путь
            <div>
              <input
                onBlur={validate_path}
                name='path'
                type='text'
                list='paths'
                autoComplete='off'
              />
              {!!path_error && <span>{path_error}</span>}
            </div>
          </label>
          <label>
            Новое назначение
            <div>
              <input
                onChange={validate_new_value}
                name='new_value'
                type='text'
                disabled={path_is_valid ? false : true}
              />
              {!!new_value_error && <p>{new_value_error}</p>}
              {!!expected_value_type && <p>Введите значение с типом: {expected_value_type}</p>}
            </div>
          </label>
          <button disabled={new_value_is_valid && path_is_valid ? false : true}>Применить</button>
        </form>
      </div>
      <div className={s.content}>
        <Builder content={content} />
      </div>
      <datalist id='paths'>
        <option>{'content[3]'}</option>
        <option>{'content[0].type'}</option>
        <option>{'content[0].props.width'}</option>
        <option>{'content[0].props.height'}</option>
        <option>{'content[0].props.visible'}</option>
        <option>{'content[0].content[0]'}</option>
        <option>{'content[1].props.visible'}</option>
        <option>{'content[1].props.caption'}</option>
        <option>{'content[2].props.height'}</option>
        <option>{'content[2].props.width'}</option>
        <option>{'content[2].props.visible'}</option>
      </datalist>
    </div>
  );
};

export default Editor;
