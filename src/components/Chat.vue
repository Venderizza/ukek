<template>
  <div class="w-auto mt-8 md:mt-20 flex flex-col items-center justify-center">

    <div class="flex gap-3 justify-center">

      <svg width="23" height="28" viewBox="0 0 23 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12 27.3333L11.6667 23.3333H11.3333C8.17778 23.3333 5.5 22.2333 3.3 20.0333C1.1 17.8333 0 15.1555 0 12C0 8.84443 1.1 6.16666 3.3 3.96666C5.5 1.76666 8.17778 0.666656 11.3333 0.666656C12.9111 0.666656 14.3833 0.961101 15.75 1.54999C17.1167 2.13888 18.3167 2.94999 19.35 3.98332C20.3833 5.01666 21.1944 6.21666 21.7833 7.58332C22.3722 8.94999 22.6667 10.4222 22.6667 12C22.6667 13.6667 22.3944 15.2667 21.85 16.8C21.3056 18.3333 20.5611 19.7555 19.6167 21.0667C18.6722 22.3778 17.55 23.5667 16.25 24.6333C14.95 25.7 13.5333 26.6 12 27.3333ZM14.6667 22.4667C16.2444 21.1333 17.5278 19.5722 18.5167 17.7833C19.5056 15.9944 20 14.0667 20 12C20 9.57777 19.1611 7.52777 17.4833 5.84999C15.8056 4.17221 13.7556 3.33332 11.3333 3.33332C8.91111 3.33332 6.86111 4.17221 5.18333 5.84999C3.50556 7.52777 2.66667 9.57777 2.66667 12C2.66667 14.4222 3.50556 16.4722 5.18333 18.15C6.86111 19.8278 8.91111 20.6667 11.3333 20.6667H14.6667V22.4667ZM11.3 19.3C11.6778 19.3 12 19.1667 12.2667 18.9C12.5333 18.6333 12.6667 18.3111 12.6667 17.9333C12.6667 17.5555 12.5333 17.2333 12.2667 16.9667C12 16.7 11.6778 16.5667 11.3 16.5667C10.9222 16.5667 10.6 16.7 10.3333 16.9667C10.0667 17.2333 9.93333 17.5555 9.93333 17.9333C9.93333 18.3111 10.0667 18.6333 10.3333 18.9C10.6 19.1667 10.9222 19.3 11.3 19.3ZM10.3333 15.0667H12.3333C12.3333 14.4 12.4 13.9333 12.5333 13.6667C12.6667 13.4 13.0889 12.9111 13.8 12.2C14.2 11.8 14.5333 11.3667 14.8 10.9C15.0667 10.4333 15.2 9.93332 15.2 9.39999C15.2 8.26666 14.8167 7.41666 14.05 6.84999C13.2833 6.28332 12.3778 5.99999 11.3333 5.99999C10.3556 5.99999 9.53333 6.27221 8.86667 6.81666C8.2 7.3611 7.73333 8.02221 7.46667 8.79999L9.33333 9.53332C9.44444 9.15554 9.65555 8.78332 9.96667 8.41666C10.2778 8.04999 10.7333 7.86666 11.3333 7.86666C11.9333 7.86666 12.3833 8.03332 12.6833 8.36666C12.9833 8.69999 13.1333 9.06666 13.1333 9.46666C13.1333 9.84443 13.0222 10.1833 12.8 10.4833C12.5778 10.7833 12.3111 11.0889 12 11.4C11.2222 12.0667 10.75 12.5944 10.5833 12.9833C10.4167 13.3722 10.3333 14.0667 10.3333 15.0667Z"
          fill="#F3CF28" />
      </svg>
      <div class="text-lg md:text-xl text-primary-lightbrown text-center">Задай свой вопрос волонтёру Серафиму</div>

    </div>

    <div v-if="isShowingQuestion" class="mt-5 md:w-2xl w-full px-5 py-3 bg-[#fdf9dc] rounded-2xl message-shadow animate-slide-up opacity-0 ">
      <div class="text-primary-brown">{{ tempQuestionText }}</div>
    </div>

    <form @submit.prevent="sendIfTextNotEmpty"
      class="mt-5 flex justify-between bg-primary-light py-3 px-5 border-primary-yellow 
      border-1 rounded-2xl md:w-2xl w-full min-h-[90px] chat-shadow">
      
      <textarea v-model="question" 
        ref="textarea" 
        rows="1" 
        placeholder="Вопрос Серафиму..."
        class="chat-area text-primary-lightbrown w-full focus:outline-none resize-none"
        @input="onInputChange"
        ></textarea>

      <button class="ml-4 self-end">

        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle class="send-circle" cx="15" cy="15" r="15" fill="#FED938" />
          <path
            d="M8.625 22.5V8.5L25.25 15.5L8.625 22.5ZM10.375 19.875L20.7437 15.5L10.375 11.125V14.1875L15.625 15.5L10.375 16.8125V19.875Z"
            fill="white" />
        </svg>

      </button>
    </form>
    
    <div class="text-primary-brown mt-5">{{ message }}</div>

    <div class="w-full lg:w-4xl my-10">
      <Keyboard @onChange="onChange" :input="question"/>
    </div>

  </div>

</template>



<script setup>
import { ref, onMounted,  nextTick } from 'vue'
import api from '../api';
import Keyboard from '../components/Keyboard.vue'

const message = ref("");
const question = defineModel();
const textarea = ref(null);

const isShowingQuestion = ref(false);
const tempQuestionText = ref("");

const sendIfTextNotEmpty = () => {
  if (question.value != ""){
    message.value = 'Думаю...';
    renderMessageBlock();
    question.value = '';
    handleSendQuestion();
  }
}

const renderMessageBlock = () => {
  isShowingQuestion.value = true;
  tempQuestionText.value = question.value;
}

const handleSendQuestion = async () => {
  try {
    await api.post('/message', {
      chat_id: "12345",
      text: question.value,
    });
    message.value = '';

  } catch (err) {
    message.value = 'Пока не могу Вам ответить';
  }
};



const lineHeight = 24;
const maxRows = 5;
const maxHeight = lineHeight * maxRows;

const resizeTextarea = () => {
  const el = textarea.value;
  if (!el) return;

  el.style.height = "auto";
  el.style.height = Math.min(el.scrollHeight, maxHeight) + "px";
};

onMounted(() => {
  nextTick(resizeTextarea);
});




const onChange = (value) => {
  question.value = value;
};

const onInputChange = (event) => {
  resizeTextarea();
  question.value = event.target.value;
};


</script>