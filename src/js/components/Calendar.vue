<template>
  <main>
    <div class="container">
      <Actions
        @updateAppointmentsShownSignal="updateAppointmentsShown"
        @updateClosedSlotsShownSignal="updateClosedSlotsShown"
      ></Actions>

      <ul class="days">
        <li
          v-for="calendarDay in calendarSlotsPerDay"
          :key="calendarDay.day"
          class="day"
        >
          <h3>
            <div class="date-label">
              {{ calendarDay.date | formatDate("DD.MM.YY") }}
            </div>
            <div class="day-label">
              {{ calendarDay.date | formatDate("dddd") }}
            </div>
          </h3>
          <ul class="slots">
            <TimeSlot
              v-for="daySlot in calendarDay.slots"
              :key="daySlot.daySlot"
              v-bind:daySlot="daySlot"
              class="slot"
              v-bind:class="{
                closed: daySlot.isClosed,
                hidden: daySlot.isClosed && !areClosedSlotsShown,
                lunchbreak: daySlot.isLunchBreak,
                unavailable: !daySlot.isAvailable,
              }"
            ></TimeSlot>
            <Appointment
              v-for="(appointment, i) in calendarDay.appointments"
              :key="i"
              v-bind:appointment="appointment"
              class="appointment"
              v-bind:class="{
                visible: areAppointmentsShown,
              }"
              v-bind:style="{
                height: (appointment.duration * slotHeight) / 30 + 'px',
                top: setAppointmentPosition(appointment),
              }"
            ></Appointment>
          </ul>
        </li>
      </ul>
    </div>
  </main>
</template>

<script>
  import timeSlots from '../services/timeSlots';
  import weeklyAppointments from '../services/weeklyAppointments';
  import TimeSlot from './TimeSlot';
  import Appointment from './Appointment';
  import Actions from './Actions';

  export default {
    name: 'Calendar',
    components: {
     TimeSlot,
     Appointment,
     Actions
    },
    data() {
      return {
        calendarSlots: [],
        calendarSlotsPerDay: [],
        weeklyAppointments: [],
        areClosedSlotsShown: false,
        areAppointmentsShown: false,
        slotHeight: 50
      };
    },
    methods: {
      prepareCalendarDays(calendarSlots) {
        calendarSlots.map(calendarSlot => {
          const currentDate = new Date(calendarSlot.from);
          const currentDay = currentDate.getDate();

          const dayObj = this.calendarSlotsPerDay.find(c => c.day === currentDay);
          if(!dayObj) {
            this.calendarSlotsPerDay.push({day: currentDay, date: currentDate, slots: []});
            const dayObj = this.calendarSlotsPerDay.find(c => c.day === currentDay);
            dayObj.slots.push(calendarSlot);
            this.addAppointmentsToDay(dayObj);
          }else {
            dayObj.slots.push(calendarSlot);
            this.addAppointmentsToDay(dayObj);
          }
        });

        console.log('this.calendarSlotsPerDay', this.calendarSlotsPerDay);
      },
      addAppointmentsToDay(dayObj) {
        dayObj.appointments = [];
        this.weeklyAppointments.map(appointment => {
          const appointmentDate = new Date(appointment.from);
          const appointmentDay = appointmentDate.getDate();

          appointment.duration = Math.floor((Math.abs(new Date(appointment.from) - new Date(appointment.to)) / 1000) / 60);

          if(dayObj.day === appointmentDay) {
            dayObj.appointments.push(appointment)
          }
        })
      },
      setAppointmentPosition(appointment) {
        const closedSlotsShownHeight = (this.areClosedSlotsShown) ? 0 : 8 * 60;
        const appointmentTime = (new Date(appointment.from).getHours() * 60) + new Date(appointment.from).getMinutes() - closedSlotsShownHeight;
        return ((appointmentTime * this.slotHeight) / 30) + 'px';
      },
      updateAppointmentsShown: function(appointmentsShownInput){
        this.areAppointmentsShown = appointmentsShownInput;
      },
      updateClosedSlotsShown: function(closedSlotsShownInput) {
        this.areClosedSlotsShown = closedSlotsShownInput;

      }
    },
    mounted: function () {
      this.calendarSlots = timeSlots();
      console.log('this.calendarSlots', this.calendarSlots);

      this.weeklyAppointments = weeklyAppointments;
      this.prepareCalendarDays(this.calendarSlots);
    }
  };
</script>

<style lang="scss" scoped>
main {
  padding: 15px;
}

.days {
  display: flex;
  margin: 20px -10px;

  @media screen and (max-width: 768px) {
    flex-wrap: wrap;
  }

  h3 {
    font-size: 15px;
    font-weight: 500;
  }

  .day {
    margin: 0 10px;
    flex: 0 1 100%;

    @media screen and (max-width: 768px) {
      flex: 0 0 calc(50% - 20px);
    }

    @media screen and (max-width: 450px) {
      flex: 0 0 calc(100% - 20px);
    }
  }
}

.date-label {
  color: #fbfdff;
  font-weight: 600;
  font-size: 28px;
}

.day-label {
  color: #8ebbe8;
  font-weight: 200;
}

.slots {
  margin: 0;
  position: relative;
  overflow: hidden;
}
</style>