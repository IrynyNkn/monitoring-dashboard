import React from 'react';
import {Button, Flex} from 'antd';
import {useToggle} from 'react-use';
import {useNavigate, useParams} from 'react-router-dom';
import {DeleteOutlined, ReloadOutlined} from '@ant-design/icons';
import {useQueryClient} from '@tanstack/react-query';

import {createAuthFetch} from '@/queries/auth.ts';
import {deleteHealthCheck} from '@/queries/health-check-config.ts';
import EditHcModal from '@/components/HealthChecks/EditHCModal.tsx';

type Props = {
  refetch: () => void;
  isFetching: boolean;
};

const HealthCheckActions = ({ refetch, isFetching }: Props) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { healthCheckId } = useParams<{healthCheckId: string}>();
  const authFetch = createAuthFetch(navigate);
  const [loading, toggleLoading] = useToggle(false);

  const deletePing = async () => {
    toggleLoading();
    const res = await deleteHealthCheck(healthCheckId || '', authFetch);
    if (res?.status === 'cancelled') {
      await queryClient.invalidateQueries({ queryKey: ['health_checks'] });
      // await queryClient.invalidateQueries({ queryKey: ['health_check_metrics', res.id] });
      navigate('/http-health-checks');
      toggleLoading(false);
    } else {
      toggleLoading(false);
    }
  };

  return (
    <Flex gap="small">
      <Button
        type="text"
        icon={<ReloadOutlined />}
        onClick={() => refetch()}
        loading={isFetching}
      >Refresh Data</Button>
      <EditHcModal />
      <Button
        type="text"
        danger
        onClick={deletePing}
        icon={<DeleteOutlined />}
        loading={loading}
      >Delete</Button>
    </Flex>
  );
};

export default HealthCheckActions;