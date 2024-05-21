import React from 'react';
import {useToggle} from 'react-use';
import {useNavigate, useParams} from 'react-router-dom';
import {Button, Form, FormProps, message, Modal, Space} from 'antd';

import {createAuthFetch} from '@/queries/auth.ts';
import {EditIcmpPingFieldType} from '@/types/ping.ts';
import {editHealthCheck} from '@/queries/health-check-config.ts';
import {EditOutlined} from '@ant-design/icons';
import EditPingForm from '@/components/Monitors/EditPingForm.tsx';

const formId = 'edit-health-check';

const EditHcModal = () => {
  const [open, toggleOpen] = useToggle(false);
  const [confirmLoading, toggleConfirmLoading] = useToggle(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const {pingId} = useParams<{pingId: string}>();
  const authFetch = createAuthFetch(navigate);

  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Health check is successfully updated',
    }).then();
  };

  const error = () => {
    messageApi.open({
      type: 'error',
      content: 'Something went wrong.',
    }).then();
  };

  const onFinish: FormProps<EditIcmpPingFieldType>['onFinish'] = async (values) => {
    toggleConfirmLoading();

    const result = await editHealthCheck({
      interval: values.period
    }, pingId as string, authFetch);

    if (result?.status === 'updated') {
      toggleOpen();
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
        <Button
          type="text"
          onClick={() => toggleOpen(true)}
          icon={<EditOutlined />}
        >Edit</Button>
      </Space>
      <Modal
        title="Edit Health Check"
        open={open}
        okText="Update"
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
        <EditPingForm
          formId={formId}
          onFinish={onFinish}
          formInstance={form}
        />
      </Modal>
    </>
  );
};

export default EditHcModal;