import React from 'react';
import { useToggle } from 'react-use';
import { useNavigate } from 'react-router-dom';
import {Modal, Space, FormProps, Form, message} from 'antd';
import {useQueryClient} from '@tanstack/react-query';

import SuccessButton from '@/components/common/SuccessButton';
import CreateMonitorForm from '@/components/Monitors/CreateMonitorForm';
import { createAuthFetch } from '@/queries/auth.ts';
import { createIcmpPing } from '@/queries/ping-config.ts';
import {CreateIcmpPingFieldType} from '@/types/ping.ts';

const formId = 'create-icmp-ping';

const CreatePingModal = () => {
  const [open, toggleOpen] = useToggle(false);
  const [confirmLoading, toggleConfirmLoading] = useToggle(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const authFetch = createAuthFetch(navigate);

  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Ping is successfully created',
    }).then();
  };

  const error = () => {
    messageApi.open({
      type: 'error',
      content: 'Something went wrong.',
    }).then();
  };

  const onFinish: FormProps<CreateIcmpPingFieldType>['onFinish'] = async (values) => {
    toggleConfirmLoading();
    console.log('Values', values);

    const result = await createIcmpPing({
      host: values.hostname,
      interval: values.period
    }, authFetch);

    if (result?.task_id) {
      toggleOpen();
      await queryClient.invalidateQueries({ queryKey: ['icmp_pings'] });
      toggleConfirmLoading(false);
      success();
      form.resetFields();
    } else {
      toggleConfirmLoading(false);
      error();
    }
  };

  return (
    <>
      {contextHolder}
      <Space style={{marginBottom: 24}}>
        <SuccessButton type="default" onClick={() => toggleOpen(true)}>
          Create Ping
        </SuccessButton>
      </Space>
      <Modal
        title="Create Ping"
        open={open}
        okText="Create"
        okButtonProps={{
          htmlType: 'submit',
          form: formId
        }}
        confirmLoading={confirmLoading}
        onCancel={() => {
          toggleOpen();
          form.resetFields();
        }}
      >
        <CreateMonitorForm
          formId={formId}
          onFinish={onFinish}
          formInstance={form}
        />
      </Modal>
    </>
  );
};

export default CreatePingModal;