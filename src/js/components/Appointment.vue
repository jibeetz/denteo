<template>
  <div>
    <div>
      {{ appointment.clientName }}
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Appointment',
    props: ['appointment']
  };
</script>

<style lang="scss" scoped>
.appointment {
  position: absolute;
  width: calc(100% - 2px);
  top: 0;
  padding: 5px;
  background-color: #8ebbe8e8;
  transition: transform 0.2s, top 0.2s;
  transform: translateX(-100%);
  font-size: 0.8em;

  &.visible {
    transform: translateX(0);
  }
}
</style>