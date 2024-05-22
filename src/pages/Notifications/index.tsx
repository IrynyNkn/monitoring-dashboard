import React, {useMemo, useState} from 'react';
import {Button, message, Space, Table, TableProps, Typography} from 'antd';
import {useNavigate} from 'react-router-dom';
import {useQueryClient} from '@tanstack/react-query';

import MainLayout from '@/layouts/MainLayout.tsx';
import PageTitle from '@/components/common/PageTitle';
import AddAlertModal from '@/components/Alerts/AddAlertModal';
import EditAlertModal, {EditAlertModalType} from '@/components/Alerts/EditAlertModal';
import {AlertDataType} from '@/types/alerts.ts';
import useWithAuth from '@/hooks/useWithAuth.ts';
import {deleteAlert, getAlerts} from '@/queries/alerts.ts';
import {createAuthFetch} from '@/queries/auth.ts';

const DEFAULT_EDIT_MODAL = {open: false, alertId: null};

const NotificationsPage = () => {
  const navigate = useNavigate();
  const authFetch = createAuthFetch(navigate);
  const [messageApi, contextHolder] = message.useMessage();
  const queryClient = useQueryClient();

  const onSuccess = () => {
    messageApi.open({
      type: 'success',
      content: 'Alert is successfully updated',
    }).then();
  };

  const onError = () => {
    messageApi.open({
      type: 'error',
      content: 'Something went wrong.',
    }).then();
  };

  const onDeleteAlert = async (id: string) => {
    const r = await deleteAlert(id, authFetch);
    if (r?.alert_id) {
      await queryClient.invalidateQueries({ queryKey: ['alerts'] });
      onSuccess();
    } else {
      onError();
    }
  };

  const [editModal, setEditModal] = useState<EditAlertModalType>(DEFAULT_EDIT_MODAL);
  const { data, error, isFetching } = useWithAuth({
    queryKey: ['alerts'],
    queryFn: () => getAlerts(),
    placeholderData: { alerts: [] },
    select: (d) => d?.['alerts'] ?? [],
    staleTime: 5 * 60 * 1000,
  });

  const columns: TableProps<AlertDataType>['columns'] = useMemo(() => [
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (_, p) => <Typography.Text>{p.email}</Typography.Text>,
    },
    {
      title: 'Alert Type',
      dataIndex: 'alertType',
      key: 'alertType',
      render: (_, p) => <Typography.Text>{p.alert_type}</Typography.Text>,
    },
    {
      title: 'Alert Group',
      dataIndex: 'alertGroup',
      key: 'alertGroup',
      render: (_, p) => <Typography.Text>{p.alert_group}</Typography.Text>,
    },
    // {
    //   title: 'For (in seconds)',
    //   dataIndex: 'for',
    //   key: 'for',
    //   render: (_, p) => <Typography.Text>{p.for_}</Typography.Text>,
    // },
    // {
    //   title: 'Repeat (in seconds)',
    //   dataIndex: 'repeatRate',
    //   key: 'repeatRate',
    //   render: (_, p) => <Typography.Text>{p.repeat_alert}</Typography.Text>,
    // },
    {
      title: 'Action',
      key: 'action',
      render: (_, p) => (
        <Space size="middle">
          <Button type="text" onClick={() => setEditModal({open: true, alertId: p.id})}>Edit</Button>
          <Button
            type="text" 
            danger
            onClick={() => onDeleteAlert(p.id)}
          >Delete</Button>
        </Space>
      ),
    },
  ], []);

  const alerts = useMemo(() => data?.map(a => ({
    ...a,
    key: a.id,
  })), [data]);

  return (
    <MainLayout>
      {contextHolder}
      <PageTitle>Alerts</PageTitle>
      <AddAlertModal />
      <Typography.Title level={4}>Configured Alerts</Typography.Title>
      <Table
        columns={columns}
        dataSource={alerts}
      />
      <EditAlertModal modalState={editModal} closeModal={() => setEditModal(DEFAULT_EDIT_MODAL)} />
    </MainLayout>
  );
};

export default NotificationsPage;