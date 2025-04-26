import { format, isToday, isYesterday } from "date-fns";

function formatTimestamp(timestamp) {
  const date = new Date(timestamp);
  const time = format(date, "h:mm a");

  if (isToday(date)) {
    return `Today at ${time}`;
  } else if (isYesterday(date)) {
    return `Yesterday at ${time}`;
  } else {
    return format(date, "h:mm a");
  }
}

export default formatTimestamp;
