export default function formatMoney(amount) {
  return Number(amount).toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND'
  });
}
