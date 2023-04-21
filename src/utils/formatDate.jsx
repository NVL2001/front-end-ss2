export default function formatDate(date) {
  return new Date(date).toLocaleString('vi-VN', {
    hour12: false,
    hourCycle: 'h23',
    timeZone: 'Asia/Ho_Chi_Minh'
  });
}
