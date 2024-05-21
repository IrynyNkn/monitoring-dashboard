import React from 'react';
import { Form, FormInstance, Input, Select } from 'antd';

import { CreateHealthCheckFieldType } from '@/types/ping.ts';
import { pingPeriods, urlRegex } from '@/utils/consts.ts';

type Props = {
  formId: string;
  onFinish: (values: CreateHealthCheckFieldType) => void;
  formInstance: FormInstance
};

const CreateHcForm = ({ formId, onFinish, formInstance }: Props) => {
  return (
    <Form
      id={formId}
      form={formInstance}
      layout="vertical"
      style={{ maxWidth: 600 }}
      onFinish={onFinish}
    >
      <Form.Item<CreateHealthCheckFieldType>
        name="endpoint_url"
        label="Endpoint URL"
        rules={[
          { required: true, message: 'Please, enter a valid url', pattern: urlRegex },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item<CreateHealthCheckFieldType>
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
    </Form>
  );
};

export default CreateHcForm;