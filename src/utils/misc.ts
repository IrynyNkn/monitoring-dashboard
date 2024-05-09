import dayjs from 'dayjs';

export const dateFormatter = (date: number) => {
  return dayjs(date).format('h:mm A'); //  DD/ddd
};