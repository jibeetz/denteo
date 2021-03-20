<template>
  <div>
    <Header></Header>
    <Calendar></Calendar>
  </div>
</template>

<script>
  import Header from './components/Header';
  import Calendar from './components/Calendar';

  export default {
    name: 'App',
    components: {
      Header,
      Calendar
    }
  };
</script>

<style scoped>
.container {
  width: 600px;
  margin: 0 auto;
  text-align: center;
}
</style>