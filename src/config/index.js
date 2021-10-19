// 仅当A页面的route-name作为key，且前往页面非value时
// A页面的keepAlive缓存会被清除
const fromAndTosRouteNamesNotClearPosition = {
  'goods-list': ['goods-goods'],
  'goods-flash-sales': ['goods-goods']
}

export default {
  ORDER_STATUS_CANCELED: 32,
  ORDER_STATUS_TO_PAY: 2,
  ORDER_STATUS_TO_DELIVERY: 4,
  ORDER_STATUS_TO_CONFIRM: 8,
  ORDER_STATUS_CONFIRMED: 16,
  ORDER_STATUS_CLOSED: 64,
  ORDER_STATUS_REFUNDED: 128,
  fromAndTosRouteNamesNotClearPosition
}
