import { orderStatuses } from '../constants';

const getAllowedOrderStatuses = (currentStatus: number) => {
  return orderStatuses.slice(currentStatus);
};

export default getAllowedOrderStatuses;
