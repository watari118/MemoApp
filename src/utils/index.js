import { format } from "date-fns";

export function deteToString(date) {
  if (!date) {
    return "";
  }
  return format(date, "yyy年M月d日 HH時mm分");
}
