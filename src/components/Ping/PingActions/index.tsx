import React from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {useQueryClient} from '@tanstack/react-query';
import {Flex, Button} from 'antd';
import {PauseCircleOutlined, DeleteOutlined, ReloadOutlined} from '@ant-design/icons';

import {usePingMetricsById} from '@/hooks/ping-metrics.ts';
import {createAuthFetch} from '@/queries/auth.ts';
import {deleteIcmpPing} from '@/queries/ping-config.ts';
import {useToggle} from 'react-use';
import EditPingModal from '@/components/Monitors/EditPingModal.tsx';

const PingActions = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { pingId } = useParams<{pingId: string}>();
  const authFetch = createAuthFetch(navigate);
  const { refetch, isFetching, data } = usePingMetricsById(pingId || '');
  const [loading, toggleLoading] = useToggle(false);

  const deletePing = async () => {
    toggleLoading();
    const res = await deleteIcmpPing(pingId || '', authFetch);
    if (res?.status === 'cancelled') {
      await queryClient.invalidateQueries({ queryKey: ['icmp_pings'] });
      await queryClient.invalidateQueries({ queryKey: ['pingMetrics', res.id] });
      navigate('/icmp-pings');
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
      <Button
        type="text"
        icon={<PauseCircleOutlined />}
      >Pause this monitor</Button>
      <EditPingModal />
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

export default PingActions;