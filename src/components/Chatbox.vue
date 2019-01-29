<template>
  <div class="chatbox">
    <div class="chatbox-messages">
      <ChatMessages v-for="msg in messages"
        v-bind:key="msg.date"
        v-bind:message="msg.content"
        v-bind:class="msg.from" />
        <div class="chatbox-message_line"></div>
    </div>
    <form v-on:submit.prevent="onSubmit" class="chatbox-form">
      <input type="text" name="message" placeholder="Escribe un mensaje ..." v-model="text">
      <input type="submit" value="ENVIAR" v-bind:disabled="isDisabled" v-bind:class="{ active: isActive }">
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import uuidv1 from 'uuid/v1'
import ChatMessages from './ChatMessages'

// Contants
const BOT = 'bot'
const ME = 'me'

export default {
  name: 'Chatbox',
  components: {
    ChatMessages
  },
  data () {
    return {
      messages: [],
      text: '',
      isActive: false,
      isDisabled: true,
      sessionId: '',
    }
  },
  mounted () {
    this.sessionId = uuidv1()
  },
  updated () {
    this.scrollToBottom()
    this.disableForm()
  },
  methods: {
    onSubmit () {
      if (this.text !== '') {
        this.addMessageToList(this.text, ME)

        axios.get('/api/soldai', {
          params: {
            question: this.text,
            sessionId: this.sessionId
          }
        })
        .then(res => {
          const data = res.data.current_response

          if (data.messages.length > 0) {
            data.messages.forEach(message => {
              this.addMessageToList(message.text, BOT)
            })
          } else {
            this.addMessageToList(data.message, BOT)
          }
          
          // check if the question has pokemons
          if (data.parameters.entities) {
            const pokemons = data.parameters.entities
            const intent = data.intent_info.name

            pokemons.forEach(pokemon => {
              this.getPokeinformation(pokemon.name, intent)
            })
          }
        })
        .catch(err => {
          // eslint-disable-next-line
          console.log('Error in api/soldai', err)
          alert('Ha ocurrido un error')
        })

        // Clear input message
        this.text = ''
      }
    },
    addMessageToList (message, from) {
      this.messages.push({
        date: uuidv1(),
        content: message,
        from
      })
    },
    getPokeinformation (pokemon, intent) {
      axios.get('/pokeapi', {
        params: {
          pokemon,
          intent
        }
      })
      .then(res => {
        this.addMessageToList(res.data.message, BOT)
      })
      .catch(err => {
        // eslint-disable-next-line
        console.log('error in /pokeapi', err)
        alert('Ha ocurrido un error')
      })
    },
    scrollToBottom () {
      let scrollLine = document.querySelector('.chatbox-message_line')
      scrollLine.scrollIntoView({ behavior: 'smooth' })
    },
    disableForm () {
      if (this.text !== '') {
        this.isActive = true
        this.isDisabled = false
      } else {
        this.isActive = false
        this.isDisabled = true
      }
    }
  }
}
</script>

<style scoped>
.chatbox{
  height: 100vh;
  width: 100vw;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.chatbox-messages {
  height: 45%;
  width: 60%;
  background-color: white;
  border: 30px solid #e3e3e3;
  border-radius: 0 0 0 64px;
  overflow-y: auto;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
}

.chatbox-message_line {
  float: left;
  clear: both;
  padding-top: 4px;
}

.chatbox-form {
  width: 100%;
  margin-top: 36px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.chatbox-form input[type=text] {
  width: 50%;
  border: none;
  border: 2px solid #e3e3e3;
  padding: 8px;
  font-size: 12px;
  transition: 0.4s;
}

.chatbox-form input[type=text]:focus {
  border-color: #5cccf1;
  outline: none;
}

.chatbox-form input[type=submit] {
  background-color: #e3e3e3;
  border-style: none;
  color: white;
  border-radius: 4px;
  padding: 8px;
  cursor: pointer;
  margin-left: 16px;
  transition: 0.3s;
}

.chatbox-form input[type=submit].active {
  background-color: #ff4949;
}

</style>
