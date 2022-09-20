import React from 'react';
import { Select } from 'antd';
import _ from 'lodash';

const { Option } = Select;

export default function SelectInput({ options, placeholder, handleChange }) {
  return (
    <Select
      className='selection'
      size="large"
      showSearch
      placeholder={placeholder}
      optionFilterProp="children"
      filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
      onChange={handleChange}
      disabled={_.isEmpty(options)}
    >
      {
        options?.map((data, index) => <Option key={index} value={data?.id}>{!_.isEmpty(data?.versionName) ? data?.versionName : `Version ${index + 1}` }</Option>)
      }
    </Select>
  );
}
