import Moment from 'moment';
import { extendMoment } from 'moment-range';
import weeklyAppointments from './weeklyAppointments';

const moment = extendMoment(Moment);

const timeSlots = () => {

  const searchRange = { from: "2021-01-04", to: "2021-01-07" };

  // FIXME: actual date objects could be useful... (ಠ⌣ಠ)
  const DAY_START = "08:00";
  const DAY_END = "18:00";
  const LUNCH_START = "12:00";
  const LUNCH_END = "13:00";

  const DateDayFormat = 'YYYY-MM-DD';
  const DateFormat = 'YYYY-MM-DDTHH:mm:ss';
  const HourMinuteFormat = 'HH:mm';
  const RangeUnit = 'minutes';
  const RangeDuration = 30;

  const isSlotInRange = (slotTime, startTime, endTime) => slotTime >= moment(startTime, HourMinuteFormat) && slotTime < moment(endTime, HourMinuteFormat);

  const isSlotAvailable = (slot, weeklyAppointments) => {
    const slotRange = { start: slot, end: slot.clone().add(RangeDuration, RangeUnit) };
    return weeklyAppointments.every((appointment) => (slotRange.end <= moment(appointment.from) || slotRange.start >= moment(appointment.to)));
  };

  const start = moment(searchRange.from, DateDayFormat);
  const end = moment(searchRange.to, DateDayFormat).endOf('day');

  const range = moment.range(start, end);
  const rangeBy = range.by(RangeUnit, { step: RangeDuration });

  const availabilityCalendar = Array.from(rangeBy).map(slot => {
    const slotTime = moment(slot.format(HourMinuteFormat), HourMinuteFormat);
    return {
      isClosed: !isSlotInRange(slotTime, DAY_START, DAY_END),
      isLunchBreak: isSlotInRange(slotTime, LUNCH_START, LUNCH_END),
      isAvailable: isSlotAvailable(slot, weeklyAppointments),
      from: slot.format(DateFormat),
      to: slot.add(RangeDuration, RangeUnit).format(DateFormat)
    };
  });

  return availabilityCalendar;
}

export default timeSlots;