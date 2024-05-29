import dayjs from 'dayjs';

export const dateFormatter = (date: number | Date) => {
  return dayjs(date).format('h:mm A'); //  DD/ddd
};