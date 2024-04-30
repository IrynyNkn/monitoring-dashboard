import React from 'react';
import {Form, FormInstance, Input, Select} from 'antd';

import { CreateIcmpPingFieldType } from '@/types/ping.ts';
import { pingPeriods, hostnameRegex } from '@/utils/consts.ts';

type Props = {
  formId: string;
  onFinish: (values: CreateIcmpPingFieldType) => void;
  formInstance: FormInstance
};

const CreateMonitorForm = ({ formId, onFinish, formInstance }: Props) => {
  return (
    <Form
      id={formId}
      form={formInstance}
      layout="vertical"
      style={{ maxWidth: 600 }}
      onFinish={onFinish}
    >
      {/*<Form.Item<CreateIcmpPingFieldType>*/}
      {/*  name="name"*/}
      {/*  label="Name"*/}
      {/*  rules={[*/}
      {/*      { required: true, message: 'Field is required' },*/}
      {/*  ]}*/}
      {/*>*/}
      {/*  <Input />*/}
      {/*</Form.Item>*/}
      <Form.Item<CreateIcmpPingFieldType>
        name="hostname"
        label="Hostname"
        rules={[
          { required: true, message: 'Please, enter a valid hostname', pattern: hostnameRegex },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item<CreateIcmpPingFieldType>
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

export default CreateMonitorForm;