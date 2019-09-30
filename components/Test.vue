<template>
  <div>
    <h1 class="blue">Hello World</h1>
    <v-btn>Button</v-btn>
    <Todos />
  </div>
</template>

<script>
import Todos from '~/components/Todos'
export default {
  components: {
    Todos
  }
}
</script>

<style lang="scss" scoped>
.blue {
  color: cornflowerblue;
}
</style>
