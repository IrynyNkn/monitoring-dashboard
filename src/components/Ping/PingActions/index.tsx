import React from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {useQueryClient} from '@tanstack/react-query';
import {Flex, Button} from 'antd';
import {PauseCircleOutlined, DeleteOutlined, ReloadOutlined, EditOutlined} from '@ant-design/icons';

import {usePingMetricsById} from '@/hooks/ping-metrics.ts';
import {createAuthFetch} from '@/queries/auth.ts';
import {deleteIcmpPing} from '@/queries/ping-config.ts';
import {useToggle} from 'react-use';

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
      await queryClient.invalidateQueries({ queryKey: ['pingMetrics', res.id] });
      setTimeout(() => {
        navigate('/monitors');
        toggleLoading(false);
      }, 1500)
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
      <Button
        type="text"
        icon={<EditOutlined />}
      >Edit</Button>
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