import React from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {useQueryClient} from '@tanstack/react-query';
import {Flex, Button, message} from 'antd';
import {PauseCircleOutlined, DeleteOutlined, ReloadOutlined, PlayCircleOutlined} from '@ant-design/icons';

import {createAuthFetch} from '@/queries/auth.ts';
import {deleteIcmpPing, pauseIcmpPing} from '@/queries/ping-config.ts';
import {useToggle} from 'react-use';
import EditPingModal from '@/components/Monitors/EditPingModal.tsx';

type Props = {
  refetch: () => void;
  isFetching: boolean;
  pingIsPaused: boolean;
};

const PingActions = ({ refetch, isFetching, pingIsPaused }: Props) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { pingId } = useParams<{pingId: string}>();
  const authFetch = createAuthFetch(navigate);
  const [loading, toggleLoading] = useToggle(false);
  const [pauseLoading, togglePauseLoading] = useToggle(false);
  const [messageApi, contextHolder] = message.useMessage();

  const onError = () => {
    messageApi.open({
      type: 'error',
      content: 'Something went wrong.',
    }).then();
  };

  const deletePing = async () => {
    toggleLoading();
    const res = await deleteIcmpPing(pingId || '', authFetch);
    if (res?.status === 'cancelled') {
      await queryClient.invalidateQueries({ queryKey: ['icmp_pings'] });
      navigate('/icmp-pings');
      toggleLoading(false);
    } else {
      onError();
      toggleLoading(false);
    }
  };

  const pausePing = async (type: 'pause' | 'resume') => {
    togglePauseLoading();
    const res = await pauseIcmpPing(pingId || '', type, authFetch);
    if (res?.status === 204) {
      await queryClient.invalidateQueries({ queryKey: ['icmp_pings'] });
      await queryClient.invalidateQueries({ queryKey: ['pingMetrics', pingId] });
      togglePauseLoading(false);
    } else {
      onError();
      togglePauseLoading(false);
    }
  };

  return (
    <Flex gap="small">
      {contextHolder}
      <Button
        type="text"
        icon={<ReloadOutlined />}
        onClick={() => refetch()}
        loading={isFetching}
      >Refresh Data</Button>
      {
        pingIsPaused ? (
          <Button
            type="text"
            icon={<PlayCircleOutlined />}
            loading={pauseLoading}
            onClick={() => pausePing('resume')}
          >Resume ping</Button>
        ) : (
          <Button
            type="text"
            icon={<PauseCircleOutlined />}
            loading={pauseLoading}
            onClick={() => pausePing('pause')}
          >Pause ping</Button>
        )
      }
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