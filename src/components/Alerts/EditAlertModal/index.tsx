import React from 'react';
import {useToggle} from 'react-use';
import {Form, FormProps, message, Modal} from 'antd';
import {useNavigate} from 'react-router-dom';

import {createAuthFetch} from '@/queries/auth.ts';
import {AddAlertFieldType} from '@/types/alerts.ts';
import AddAlertForm from '@/components/Alerts/AddAlertModal/AddAlertForm.tsx';

export type EditAlertModalType = {
  open: boolean;
  alertId: string | null;
};

type Props = {
  modalState: EditAlertModalType;
  closeModal: () => void;
};

const formId = 'edit-alert';

const EditAlertModal = ({ modalState, closeModal }: Props) => {
  const [confirmLoading, toggleConfirmLoading] = useToggle(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const authFetch = createAuthFetch(navigate);

  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Alert is successfully updated',
    }).then();
  };

  const error = () => {
    messageApi.open({
      type: 'error',
      content: 'Something went wrong.',
    }).then();
  };

  const onFinish: FormProps<AddAlertFieldType>['onFinish'] = async (values) => {};

  return (
    <>
      {contextHolder}
      <Modal
        title="Update Alert"
        open={modalState.open}
        okText="Update"
        okButtonProps={{
          htmlType: 'submit',
          form: formId
        }}
        confirmLoading={confirmLoading}
        onCancel={() => {
          closeModal();
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

export default EditAlertModal;