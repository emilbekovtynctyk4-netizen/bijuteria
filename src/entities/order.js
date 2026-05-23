// ===================================================
// LUMÉRA JEWELRY — Order Entity / Schema
// src/entities/order.js
// ===================================================

import { ORDER_STATUS } from 'constants';

/**
 * Нормализует объект заказа с API.
 * @param {Object} raw
 * @returns {Order}
 */
export function normalizeOrder(raw) {
  return {
    id:          raw.id,
    number:      raw.order_number || raw.orderNumber || `LMR-${raw.id}`,
    status:      raw.status || ORDER_STATUS.PENDING,
    items:       Array.isArray(raw.items)
                   ? raw.items.map(normalizeOrderItem)
                   : [],
    subtotal:    Number(raw.subtotal || 0),
    deliveryCost:Number(raw.delivery_cost || raw.deliveryCost || 0),
    total:       Number(raw.total || 0),
    address:     normalizeAddress(raw.address || raw.delivery_address),
    paymentMethod: raw.payment_method || raw.paymentMethod || 'cash',
    comment:     raw.comment || '',
    createdAt:   raw.created_at || raw.createdAt || null,
    updatedAt:   raw.updated_at || raw.updatedAt || null,
  };
}

/**
 * Нормализует позицию заказа.
 * @param {Object} raw
 * @returns {OrderItem}
 */
function normalizeOrderItem(raw) {
  return {
    id:       raw.id,
    product:  raw.product || null,
    name:     raw.name || raw.product?.name || '',
    image:    raw.image || raw.product?.images?.[0] || null,
    price:    Number(raw.price || 0),
    quantity: Number(raw.quantity || 1),
    total:    Number(raw.total || raw.price * raw.quantity || 0),
  };
}

/**
 * Нормализует адрес доставки.
 * @param {Object|null} raw
 * @returns {Address|null}
 */
function normalizeAddress(raw) {
  if (!raw) return null;
  return {
    city:    raw.city || '',
    street:  raw.street || '',
    house:   raw.house || '',
    flat:    raw.flat || raw.apartment || '',
    phone:   raw.phone || '',
    name:    raw.name || raw.recipient_name || '',
  };
}
