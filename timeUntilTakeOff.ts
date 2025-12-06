import { assertEquals } from "@std/assert";

type ElfDateTime =
  `${number}*${number}*${number}@${number}|${number}|${number} NP`;

function timeUntilTakeOff(
  fromTime: ElfDateTime,
  takeOffTime: ElfDateTime
): number {
  const toDate = (elfTime: ElfDateTime): number | null => {
    const regex =
      /(?<year>\d{4})\*(?<month>\d{2})\*(?<day>\d{2})@(?<hour>\d{2})\|(?<min>\d{2})\|(?<seg>\d{2})\sNP/;

    const r = regex.exec(elfTime);

    if (r === null) return 0;

    const { year, month, day, hour, min, seg } = r.groups!;

    return Number(
      new Date(+year, Number(month) - 1, +day - 1, Number(hour) - 1, +min, +seg)
    );
  };

  return Math.floor((toDate(takeOffTime)! - toDate(fromTime)!) / 1000);
}

const takeoff = "2025*12*25@00|00|00 NP";

const expects = [
  // desde el 24 diciembre 2025, 23:59:30, 30 segundos antes del despegue
  ["2025*12*24@23|59|30 NP", 30],
  // justo en el momento exacto
  ["2025*12*25@00|00|00 NP", 0],
  // 12 segundos después del despegue
  ["2025*12*25@00|00|12 NP", -12],
];

expects.forEach(([input, expected]) => {
  const result = timeUntilTakeOff(input as ElfDateTime, takeoff);

  assertEquals(result, expected, "input: " + input.toString());
});
