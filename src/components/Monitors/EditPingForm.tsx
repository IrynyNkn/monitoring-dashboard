import React from 'react';
import {Form, FormInstance, Select} from 'antd';

import {EditIcmpPingFieldType} from '@/types/ping.ts';
import {pingPeriods} from '@/utils/consts.ts';

type Props = {
  formId: string;
  onFinish: (values: EditIcmpPingFieldType) => void;
  formInstance: FormInstance
};

const EditPingForm = ({ formId, onFinish, formInstance }: Props) => {
  return (
    <Form
      id={formId}
      form={formInstance}
      layout="vertical"
      style={{ maxWidth: 600 }}
      onFinish={onFinish}
    >
      <Form.Item<EditIcmpPingFieldType>
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

export default EditPingForm;