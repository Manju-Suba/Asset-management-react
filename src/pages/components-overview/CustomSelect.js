import React, { useRef } from 'react';
import { Select } from 'antd';

const { Option } = Select;

const styles = `
    .anticon.anticon-down.ant-select-suffix{
        font-size: 10px !important;
        width: 10px;
        height: 10px;
    }
`;

const CustomSelect = ({ defaultValue, value, style, mode, allowClear, showSearch, onChange, options, Isdisable }) => {
  const selectRef = useRef(null);

  const handleChange = (newValue) => {
    if (onChange) {
      onChange(newValue);
    }
  };

  //   const handleBlur = () => {
  if (selectRef.current) {
    selectRef.current.blur();
  }
  //   };

  return (
    <>
      <style>{styles}</style>

      <Select
        defaultValue={defaultValue}
        value={value}
        style={style}
        mode={mode}
        allowClear={allowClear}
        ref={selectRef}
        showSearch={showSearch}
        disabled={Isdisable}
        onChange={handleChange}
        //   onBlur={handleBlur}
      >
        {options.map((option) => (
          <Option key={option.value} value={option.value}>
            {option.label}
          </Option>
        ))}
      </Select>
    </>
  );
};

export default CustomSelect;
