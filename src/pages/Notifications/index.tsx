import React from 'react';
import MainLayout from '@/layouts/MainLayout.tsx';
import PageTitle from '@/components/common/PageTitle';
import AddAlertModal from '@/components/Alerts/AddAlertModal';

const NotificationsPage = () => {
  return (
    <MainLayout>
      <PageTitle>Alerts</PageTitle>
      <AddAlertModal />
    </MainLayout>
  );
};

export default NotificationsPage;