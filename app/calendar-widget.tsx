"use client";

export default function CalendarWidget({ date }: { date: string }) {
  // The parent updates this label from Europe/Istanbul, including at midnight.
  const match = date.match(/(\d{1,2}) (\w+) (\d{4})/);
  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const day = match ? Number(match[1]) : 0;
  const month = match ? months.indexOf(match[2]) : -1;
  const year = match ? Number(match[3]) : 0;
  const offset = month >= 0 ? (new Date(Date.UTC(year, month, 1)).getUTCDay() + 6) % 7 : 0;
  const count = month >= 0 ? new Date(Date.UTC(year, month + 1, 0)).getUTCDate() : 0;
  return <article className="date-card glass-card calendar-widget" aria-label={`Istanbul calendar: ${date}`}><header><strong>{month >= 0 ? months[month] : "Calendar"}</strong><span>{year || ""}</span></header><div className="calendar-days">{["M","T","W","T","F","S","S"].map((label, index) => <small key={`week-${index}`} aria-label={["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"][index]}>{label}</small>)}{Array.from({ length: offset }, (_, index) => <span key={`empty-${index}`} />)}{Array.from({ length: count }, (_, index) => <span key={index} className={index + 1 === day ? "calendar-today" : ""} aria-current={index + 1 === day ? "date" : undefined}>{index + 1}</span>)}</div></article>;
}
