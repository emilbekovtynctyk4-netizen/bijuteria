export const ORDER_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
  RETURNED: 'returned',
};

export const ORDER_STATUS_LABELS = {
  [ORDER_STATUS.PENDING]: 'Ожидает подтверждения',
  [ORDER_STATUS.CONFIRMED]: 'Подтверждён',
  [ORDER_STATUS.PROCESSING]: 'Готовится к отправке',
  [ORDER_STATUS.SHIPPED]: 'В пути',
  [ORDER_STATUS.DELIVERED]: 'Доставлен',
  [ORDER_STATUS.CANCELLED]: 'Отменён',
  [ORDER_STATUS.RETURNED]: 'Возврат',
};
