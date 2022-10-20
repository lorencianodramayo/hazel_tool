import React, { useEffect } from "react";
import { Button, Form, Input } from "antd";
// import axios from 'axios';

const { TextArea } = Input;

const CustomLanguage = () => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields();
  }, [form]);

  const onFinish = (values) => {
    console.log(values);

    form.resetFields();
  };

  return (
    <Form
      layout={"vertical"}
      form={form}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item
        name="name"
        label="Name"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input placeholder="Latin" />
      </Form.Item>
      <Form.Item
        name="content"
        label="Content"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <TextArea
          showCount
          style={{ height: 120, resize: "none" }}
          placeholder="Lorem Ipsum"
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CustomLanguage;
