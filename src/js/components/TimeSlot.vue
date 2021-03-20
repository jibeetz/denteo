<template>
  <li>
    <div>
      {{ daySlot.from | formatDate("HH:mm") }}
    </div>
  </li>
</template>

<script>
  export default {
    name: 'TimeSlot',
    props: ['daySlot']
  };
</script>

<style lang="scss" scoped>
.slot {
  max-height: 50px;
  height: 60px;
  font-size: 0.8em;
  transition: max-height 0.2s;

  > div {
    padding: 5px;
    height: 100%;
    background-color: #465768;
    color: #bcc0c5;
    border-bottom: 1px solid #314860;
  }

  &.hidden {
    padding: 0;
    max-height: 0;
    overflow: hidden;
  }

  &.lunchbreak,
  &.closed {
    opacity: 0.5;
  }

  &.unavailable div {
    opacity: 1;
    background-color: #ae0000;
  }
}
</style>