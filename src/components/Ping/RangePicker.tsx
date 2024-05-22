import React, {useState} from 'react';
import {Button, InputNumber, Select, Space, Typography} from 'antd';
import {QueryObserverResult, RefetchOptions} from '@tanstack/react-query';

import authStore from '@/store/authStore.ts';
import {PingMetricsResponseType} from '@/types/ping.ts';
import {useToggle} from 'react-use';

const { Option } = Select;

type Props = {refetch: (options?: RefetchOptions | undefined) =>  Promise<QueryObserverResult<PingMetricsResponseType, Error>>}

const RangePicker = ({ refetch }: Props) => {
  const { setIcmpPingTimeRange, icmpPingTimeRange } = authStore(s => s);
  const [value, setValue] = useState<number | null>(
    icmpPingTimeRange ? Number(icmpPingTimeRange.slice(1, icmpPingTimeRange.length - 1)) : 12
  );
  const [unit, setUnit] = useState(icmpPingTimeRange ? icmpPingTimeRange.slice(-1) : 'h');
  const [isLoading, toggleLoading] = useToggle(false);

  const selectAfter = (
    <Select defaultValue={unit} onChange={(val) => setUnit(val)}>
      <Option value="m">m</Option>
      <Option value="h">h</Option>
      <Option value="d">d</Option>
    </Select>
  );

  const showDataForRange = async () => {
    toggleLoading(true);
    setIcmpPingTimeRange(`-${value}${unit}`);
    setTimeout(() => {
      refetch().finally(() => toggleLoading(false));
    }, 500);
  };

  return (
    <div style={{ marginBottom: 20, marginTop: -15 }}>
      <Typography.Title level={5} style={{ marginTop: 0 }}>Metrics Time Range</Typography.Title>
      <Space.Compact>
        <InputNumber
          required={true}
          type={'number'}
          addonBefore={'-'}
          addonAfter={selectAfter}
          value={value}
          onChange={(val) => setValue(val)}
          style={{ maxWidth: 200 }}
        />
        <Button onClick={showDataForRange} disabled={!value} loading={isLoading}>Submit</Button>
      </Space.Compact>
    </div>
  );
};

export default RangePicker;