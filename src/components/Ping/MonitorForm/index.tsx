import React from 'react';
import {Button, Form, Input, Select, Space} from 'antd';

import SuccessButtonWrap from '@/components/common/SuccessButton';

/* eslint-disable-next-line */
const hostnameRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$|^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)+([A-Za-z]|[A-Za-z][A-Za-z0-9\-]*[A-Za-z0-9])$/;

const pingPeriods = [
  {
    label: '1min',
    value: 60,
  },
  {
    label: '3mins',
    value: 180,
  },
  {
    label: '5mins',
    value: 300,
  },
  {
    label: '15mins',
    value: 300,
  },
  {
    label: '30mins',
    value: 1800,
  },
  {
    label: '1h',
    value: 3600,
  },
  {
    label: '6h',
    value: 21600,
  },
  {
    label: '12h',
    value: 43200,
  },
  {
    label: '1d',
    value: 86400,
  },
];

const MonitorForm = () => {
  const onSubmit = (data: never) => console.log(data);

  return (
    <Form
      layout="vertical"
      style={{ maxWidth: 600 }}
      onFinish={() => console.log('submitted')}
    >
      <Form.Item
        name="name"
        label="Name"
        rules={[
            { required: true, message: 'Field is required' },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="hostname"
        label="Hostname"
        rules={[
          { required: true, message: 'Please, enter a valid hostname', pattern: hostnameRegex },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Period"
        name="period"
        rules={[
          { required: true },
        ]}
      >
        <Select>
          {pingPeriods.map((p, idx) => (
            <Select.Option key={idx} value={p.value}>{p.label}</Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Space size="middle">
        <SuccessButtonWrap>
          <Button
            type="primary"
            htmlType="submit"
          >Create</Button>
        </SuccessButtonWrap>
        <Button>Cancel</Button>
      </Space>

    </Form>
  );
};

export default MonitorForm;