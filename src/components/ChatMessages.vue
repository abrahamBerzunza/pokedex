<template>
  <div class="chatmessage" v-bind:class="from">
    <p v-html="message"></p>
  </div>
</template>

<script>
export default {
  name: 'ChatMessage',
  props: [ 'message', 'from' ]
}
</script>

<style scoped>
.chatmessage {
  padding: 8px;
  margin-bottom: 8px;
  max-width: 50%;
  color: white;
  background-color: yellowgreen;
  border-radius: 8px 16px 0 8px;
  align-self: flex-end;
}

.chatmessage p {
  overflow-wrap: break-word;
  text-align: justify;
}

.me {
  background-color: yellowgreen;
  border-radius: 8px 16px 0 8px;
  align-self: flex-end;
}

.bot {
  background-color: #5cccf1;
  border-radius: 16px 8px 8px 0;
  align-self: flex-start;
}
</style>
