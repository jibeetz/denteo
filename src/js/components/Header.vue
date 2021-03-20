<template>
  <header>
    <div class="container">
      <h1>{{ title }}</h1>
    </div>
  </header>
</template>

<script>
  export default {
    name: 'Header',
    data() {
      return {
        title: 'Your appointments',
      };
    },
  };
</script>

<style scoped>
header {
  padding: 15px;
  background-color: #15202b;
}

h1 {
  margin: 0;
  color: #fff;
  font-weight: 300;
}
</style>