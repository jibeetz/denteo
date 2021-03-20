<template>
  <nav class="actions">
    <ul>
      <li>
        <label for="show-closed">
          <input
            id="show-closed"
            type="checkbox"
            v-model="areClosedSlotsShown"
            v-on:change="
              $emit('updateClosedSlotsShownSignal', areClosedSlotsShown)
            "
          />
          <span>Show all slots</span>
        </label>
      </li>
      <li>
        <label for="show-appointments">
          <input
            id="show-appointments"
            type="checkbox"
            v-model="areAppointmentsShown"
            v-on:change="
              $emit('updateAppointmentsShownSignal', areAppointmentsShown)
            "
          />
          <span>Show appointments</span>
        </label>
      </li>
    </ul>
  </nav>
</template>

<script>
  export default {
    name: 'Actions',
    data() {
      return {
        areClosedSlotsShown: false,
        areAppointmentsShown: false
      };
    }
  };
</script>

<style lang="scss" scoped>
.actions {
  background-color: #15202b;
  padding: 15px;
  border-radius: 2px;

  ul {
    display: flex;
    align-content: center;

    li {
      margin-right: 15px;
    }
  }

  label {
    display: flex;
    align-items: center;
  }
}
</style>