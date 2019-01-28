<template>
  <div id="app">
    <Chatbox />
    <Layout />
  </div>
</template>

<script>
import Layout from './components/Layout'
import Chatbox from './components/Chatbox'

export default {
  name: 'app',
  components: {
    Layout,
    Chatbox
  }
}
</script>

<style>
* {
  margin: 0;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
</style>
