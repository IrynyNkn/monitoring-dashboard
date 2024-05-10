import React, {useState} from 'react';
import {Button, Space, Table, TableProps, Typography} from 'antd';

import MainLayout from '@/layouts/MainLayout.tsx';
import PageTitle from '@/components/common/PageTitle';
import AddAlertModal from '@/components/Alerts/AddAlertModal';
import {AlertDataType} from '@/types/alerts.ts';
import EditAlertModal, {EditAlertModalType} from '@/components/Alerts/EditAlertModal';

const DEFAULT_EDIT_MODAL = {open: false, alertId: null};

const NotificationsPage = () => {
  const [editModal, setEditModal] = useState<EditAlertModalType>(DEFAULT_EDIT_MODAL);

  const configuredAlerts: AlertDataType[] = [
    {
      id: '8fe9e99f-2848-4f30-8ac2-b2ca0bb20490',
      email: 'user39@example.com',
      alertGroup: 'KUBERNETES',
      alertType: 'HIGH_CPU_USAGE',
      for: 57,
      repeatRate: 27
    },
    {
      id: '5bee3369-9c64-4d41-acc3-e1a9e3c8b19f',
      email: 'user54@example.com',
      alertGroup: 'HTTP_PING',
      alertType: 'HTTP_404_ERRORS',
      for: 45,
      repeatRate: 68
    },
    {
      id: 'ac435983-8000-4f35-ac76-f07f3fd16566',
      email: 'user10@example.com',
      alertGroup: 'KUBERNETES',
      alertType: 'HIGH_CPU_USAGE',
      for: 21,
      repeatRate: 103
    },
  ] as AlertDataType[];

  const columns: TableProps<AlertDataType>['columns'] = [
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
      render: (_, p) => <Typography.Text>{p.alertType}</Typography.Text>,
    },
    {
      title: 'Alert Group',
      dataIndex: 'alertGroup',
      key: 'alertGroup',
      render: (_, p) => <Typography.Text>{p.alertGroup}</Typography.Text>,
    },
    {
      title: 'For (in seconds)',
      dataIndex: 'for',
      key: 'for',
      render: (_, p) => <Typography.Text>{p.for}</Typography.Text>,
    },
    {
      title: 'Repeat (in seconds)',
      dataIndex: 'repeatRate',
      key: 'repeatRate',
      render: (_, p) => <Typography.Text>{p.repeatRate}</Typography.Text>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, p) => (
        <Space size="middle">
          <Button type="text" onClick={() => setEditModal({open: true, alertId: p.id})}>Edit</Button>
          <Button type="text" danger>Delete</Button>
        </Space>
      ),
    },
  ];

  return (
    <MainLayout>
      <PageTitle>Alerts</PageTitle>
      <AddAlertModal />
      <Typography.Title level={4}>Configured Alerts</Typography.Title>
      <Table
        columns={columns}
        dataSource={configuredAlerts}
      />
      <EditAlertModal modalState={editModal} closeModal={() => setEditModal(DEFAULT_EDIT_MODAL)} />
    </MainLayout>
  );
};

export default NotificationsPage;