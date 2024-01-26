import React, { useState } from 'react';
import s from './editor.module.css';
import { useDispatch, useSelector } from 'react-redux';
import Builder from '../Bulder/Builder';
import { changeElem } from '../../store/contentSlice';
import { get_type_of_value_by_path, get_value_type, string_to_object } from '../../utils/utils';

const Editor = () => {
  const dispatch = useDispatch();
  const { content } = useSelector((s) => s.content);
  const [expected_value_type, set_expected_value_type] = useState('');
  const [path_is_valid, set_path_is_valid] = useState(false);
  const [new_value_is_valid, set_new_value_is_valid] = useState(false);
  const [error, set_error] = useState('');

  function formSubmitter(e) {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));
  }

  function validate_path(e) {
    if (e.target.value) {
      let path_keys = e.target.value.match(/\w*[^\.\[\]]/g);
      let type = get_type_of_value_by_path(path_keys, { content });

      if (type) {
        set_expected_value_type(type);
        set_path_is_valid(true);
        set_error('');
      } else {
        set_expected_value_type('');
        set_path_is_valid(false);
        set_error('Неверно указан путь');
      }
    } else {
      set_expected_value_type('');
      set_path_is_valid(false);
    }
  }

  function validate_new_value(e) {
    let input_value = e.target.value;
    if (input_value) {
      let input_value_type = get_value_type(input_value);
      if (expected_value_type === input_value_type) {
        set_new_value_is_valid(true);
      }
      else {
        set_new_value_is_valid(false);
      }
    }
    else {
      set_new_value_is_valid(false);
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
                list='jopa'
                autoComplete='off'
              />
              {!!error && <span>{error}</span>}
            </div>
          </label>
          <label>
            Новое назначение
            <div>
              <input
                onChange={validate_new_value}
                name='newValue'
                type='text'
                disabled={path_is_valid ? false : true}
              />
              {!!expected_value_type && <span>{expected_value_type}</span>}
            </div>
          </label>
          <button disabled={new_value_is_valid && path_is_valid ? false : true}>Применить</button>
        </form>
      </div>
      <div className={s.content}>
        <Builder content={content} />
      </div>
      <datalist id='jopa'>
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
