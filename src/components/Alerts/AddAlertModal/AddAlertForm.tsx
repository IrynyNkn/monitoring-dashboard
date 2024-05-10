import React, {useState} from 'react';
import {Form, FormInstance, Input, Radio, Select, Tooltip, Typography} from 'antd';

import {emailRegex} from '@/utils/consts.ts';
import {
  AddAlertFieldType,
  AlertGroups,
  HttpPingAlerts,
  httpPingAlertsArray,
  IcmpPingAlerts,
  icmpPingAlertsArray,
  k8sAlertsArray,
  KubernetesAlerts
} from '@/types/alerts.ts';

type Props = {
  formId: string;
  onFinish: (values: AddAlertFieldType) => void;
  formInstance: FormInstance
};

const forTooltipInfo = 'A duration for which the expression must be true before the alert is fired';

const AddAlertForm = ({formId, formInstance, onFinish}: Props) => {
  const [alertTypes, setAlertTypes] = useState<
    {key: IcmpPingAlerts | HttpPingAlerts| KubernetesAlerts, label: string}[] | null
  >(null);

  const onAlertGroupChange = ({ alertGroup }: AddAlertFieldType) => {
    switch (alertGroup) {
      case AlertGroups.icmpPing:
        setAlertTypes(icmpPingAlertsArray);
        formInstance.setFieldValue('alertType', icmpPingAlertsArray[0].key);
        return;
      case AlertGroups.httpPing:
        setAlertTypes(httpPingAlertsArray);
        formInstance.setFieldValue('alertType', httpPingAlertsArray[0].key);
        return;
      case AlertGroups.kubernetes:
        setAlertTypes(k8sAlertsArray);
        formInstance.setFieldValue('alertType', undefined);
        return;
    }
  };

  return (
    <Form
      id={formId}
      form={formInstance}
      layout="vertical"
      style={{ maxWidth: 600 }}
      onFinish={onFinish}
      onValuesChange={onAlertGroupChange}
    >
      <Form.Item<AddAlertFieldType>
        name="email"
        label="Email"
        rules={[
          { required: true, message: 'Please, enter a valid email', pattern: emailRegex },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item<AddAlertFieldType>
        name="for"
        label="For (in seconds)"
        rules={[
          { required: true, type: 'number' },
        ]}
        style={{ marginBottom: 8 }}
      >
        <Input />
      </Form.Item>
      <Tooltip
        title={forTooltipInfo}
        placement="topLeft"
      >
        <Typography.Link href="#for">Need Help?</Typography.Link>
      </Tooltip>
      <Form.Item<AddAlertFieldType>
        name="repeatRate"
        label="Repeat Alert (in seconds)"
        rules={[
          { required: true, type: 'number' },
        ]}
        style={{ marginTop: 16 }}
      >
        <Input />
      </Form.Item>

      <Form.Item<AddAlertFieldType>
        name="alertGroup"
        label="Alert Group"
        rules={[{ required: true, message: 'Please pick a group!' }]}
      >
        <Radio.Group>
          <Radio.Button value={AlertGroups.icmpPing}>Icmp Ping</Radio.Button>
          <Radio.Button value={AlertGroups.httpPing}>Http Ping</Radio.Button>
          <Radio.Button value={AlertGroups.kubernetes}>Kubernetes</Radio.Button>
        </Radio.Group>
      </Form.Item>

      {
        alertTypes?.length && !!(formInstance.getFieldsValue()?.alertGroup) && (
          <Form.Item<AddAlertFieldType>
            label="Alert Type"
            name="alertType"
            rules={[
              { required: true },
            ]}
          >
            <Select>
              {alertTypes.map((a, idx) => (
                <Select.Option key={idx} value={a.key}>{a.label}</Select.Option>
              ))}
            </Select>
          </Form.Item>
        )
      }
    </Form>
  );
};

export default AddAlertForm;