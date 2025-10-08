import dayjs from "dayjs";

// 获取当前时间是上午、下午还是晚上
export function getTime() {
  const hour = new Date().getHours();
  if (hour >= 6 && hour < 12) {
    return "上午";
  } else if (hour >= 12 && hour < 18) {
    return "下午";
  } else {
    return "晚上";
  }
}

// "2023-10-01 10:00:00" => ['2023年10月01日', '10:00']
export function formatDateTime(dateTimeStr: string): [string, string] {
  const date = dayjs(dateTimeStr);
  return [date.format("YYYY年MM月DD日"), date.format("HH:mm")];
}
