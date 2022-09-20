import React from "react";

import { Select } from "antd";

const { Option, OptGroup } = Select;

export default function SelectGroupedInput({ options, placeholder, handleChange }) {
  return (
    <Select
      className="selection"
      size="large"
      showSearch
      placeholder={placeholder}
      optionFilterProp="children"
      filterOption={(input, option) => {
        if (option.children) {
          return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 ? true : false;
        } else if (option.label) {
          return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0 ? true : false;
        }
      }}
      onChange={handleChange}
    >
      {Object.keys(options).map((data, index) => (
        <OptGroup label={data} key={index}>
          {options[data].map((template) => (
            <Option value={template?._id} key={template?._id}>
              {`${data}-${template?.name}`}
            </Option>
          ))}
        </OptGroup>
      ))}
      {
        // options?.map((data, index) => <Option value={data?._id}>{`${data?.size}-${data?.name}`}</Option>)
      }
    </Select>
  );
}
