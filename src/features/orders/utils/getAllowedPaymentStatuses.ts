import { paymentStatuses } from '../constants';

const getAllowedPaymentStatuses = (currentStatus: number) => {
  return paymentStatuses.slice(currentStatus);
};

export default getAllowedPaymentStatuses;
