import React from 'react';
import {useToggle} from 'react-use';
import {useNavigate} from 'react-router-dom';
import {Form, FormProps, message, Modal, Space} from 'antd';

import {createAuthFetch} from '@/queries/auth.ts';
import SuccessButton from '@/components/common/SuccessButton';
import {AddAlertFieldType} from '@/types/alerts.ts';
import AddAlertForm from '@/components/Alerts/AddAlertModal/AddAlertForm.tsx';
import {createAlert} from '@/queries/alerts.ts';
import {useQueryClient} from '@tanstack/react-query';

const formId = 'add-alert';

const AddAlertModal = () => {
  const [open, toggleOpen] = useToggle(false);
  const [confirmLoading, toggleConfirmLoading] = useToggle(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const authFetch = createAuthFetch(navigate);
  const queryClient = useQueryClient();

  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'New alert is successfully added!',
    }).then();
  };

  const error = () => {
    messageApi.open({
      type: 'error',
      content: 'Something went wrong.',
    }).then();
  };
  const onFinish: FormProps<AddAlertFieldType>['onFinish'] = async (values) => {
    toggleConfirmLoading();

    const result = await createAlert(values, authFetch);

    if (result?.alert_id) {
      toggleOpen();
      await queryClient.invalidateQueries({ queryKey: ['alerts'] });
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
          Add New Alert
        </SuccessButton>
      </Space>
      <Modal
        title="Add Alert"
        open={open}
        okText="Add"
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
        <AddAlertForm
          formId={formId}
          onFinish={onFinish}
          formInstance={form}
        />
      </Modal>
    </>
  );
};

export default AddAlertModal;