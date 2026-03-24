import { STOCK_QUANTITY_RULES } from '../constants';

function getStockStatus(qty: number) {
  return STOCK_QUANTITY_RULES.find((rule) => qty <= rule.max);
}

export default getStockStatus;
