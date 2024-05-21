import React from 'react';
import {useToggle} from 'react-use';
import {Form, FormProps, message, Modal, Space} from 'antd';
import {useNavigate} from 'react-router-dom';
import {useQueryClient} from '@tanstack/react-query';

import {createAuthFetch} from '@/queries/auth.ts';
import {CreateHealthCheckFieldType} from '@/types/ping.ts';
import SuccessButton from '@/components/common/SuccessButton';
import CreateHCForm from '@/components/HealthChecks/CreateHCForm.tsx';
import {createHealthCheck} from '@/queries/health-check-config.ts';

const formId = 'create-health-check';

const CreateHcModal = () => {
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
      content: 'Health Check is successfully created',
    }).then();
  };

  const error = () => {
    messageApi.open({
      type: 'error',
      content: 'Something went wrong.',
    }).then();
  };

  const onFinish: FormProps<CreateHealthCheckFieldType>['onFinish'] = async (values) => {
    toggleConfirmLoading();
    console.log('Values', values);

    const result = await createHealthCheck({
      endpoint_url: values.endpoint_url,
      interval: values.period
    }, authFetch);

    if (result?.task_id) {
      toggleOpen();
      await queryClient.invalidateQueries({ queryKey: ['health_checks'] });
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
          Create Health Check
        </SuccessButton>
      </Space>
      <Modal
        title="Create Health Check"
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
        <CreateHCForm
          formId={formId}
          onFinish={onFinish}
          formInstance={form}
        />
      </Modal>
    </>
  );
};

export default CreateHcModal;