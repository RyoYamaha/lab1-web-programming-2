<template>
  <div class="test-container">
    <h1>Vocabulary Test</h1>

    <div v-if="!isPlaying && !isFinished" class="card settings-card">
      <h3>Test Settings</h3>
      
      <div class="form-group">
        <label>Translation Direction:</label>
        <div class="buttons">
          <button 
            :class="{ active: settings.direction === 'ger-eng' }" 
            @click="settings.direction = 'ger-eng'">
            German → English
          </button>
          <button 
            :class="{ active: settings.direction === 'eng-ger' }" 
            @click="settings.direction = 'eng-ger'">
            English → German
          </button>
        </div>
      </div>

      <div class="form-group">
        <label>How many words?</label>
        <div class="buttons">
          <button v-for="num in [5, 10, 15]" :key="num"
            :class="{ active: settings.limit === num }"
            @click="settings.limit = num">
            {{ num }} words
          </button>
        </div>
      </div>

      <button class="btn-start" @click="startTest">Start Test</button>
    </div>

    <div v-else-if="isPlaying" class="card question-card">
      <p>Question {{ currentQuestionIndex + 1 }} of {{ questions.length }}</p>
      
      <div class="question-box">
        <span v-if="settings.direction === 'ger-eng'">🇩🇪 {{ currentWord.german }}</span>
        <span v-else>🇬🇧 {{ currentWord.english }}</span>
      </div>

      <input 
        type="text" 
        v-model="userAnswer" 
        @keyup.enter="submitAnswer"
        placeholder="Enter translation..." 
        class="input-answer"
      />

      <div class="actions">
        <button class="btn-submit" @click="submitAnswer">Submit</button>
        <button class="btn-skip" @click="nextQuestion">Skip</button>
      </div>
      
      <p v-if="message" :class="messageClass">{{ message }}</p>
    </div>

    <div v-else class="card result-card">
      <h2>Test Completed!</h2>
      <p>Your Score: {{ score }} / {{ questions.length }}</p>
      <button class="btn-start" @click="resetTest">Try Again</button>
    </div>

  </div>
</template>

<script>
import { api } from '../helpers/helpers';

export default {
  name: 'Test',
  data() {
    return {
      words: [],          // Tất cả từ lấy từ DB
      questions: [],      // Danh sách câu hỏi cho bài test này
      isPlaying: false,   // Đang làm bài hay không
      isFinished: false,  // Đã xong chưa
      currentQuestionIndex: 0,
      score: 0,
      userAnswer: '',
      message: '',        // Thông báo Correct/Wrong
      messageClass: '',
      
      // Cấu hình mặc định
      settings: {
        direction: 'ger-eng', // 'ger-eng' hoặc 'eng-ger'
        limit: 5
      }
    };
  },
  computed: {
    currentWord() {
      return this.questions[this.currentQuestionIndex];
    }
  },
  async created() {
    // 1. Lấy toàn bộ từ khi trang vừa load
    this.words = await api.getWords(); // Hàm này bạn đã có trong helpers
  },
  methods: {
    startTest() {
      // 2. Logic bắt đầu: Trộn ngẫu nhiên và cắt lấy số lượng từ
      if (this.words.length < this.settings.limit) {
        alert("Not enough words in database!");
        return;
      }

      // Thuật toán trộn mảng ngẫu nhiên (Shuffle)
      const shuffled = [...this.words].sort(() => 0.5 - Math.random());
      
      // Lấy ra n từ theo setting
      this.questions = shuffled.slice(0, this.settings.limit);
      
      // Reset trạng thái
      this.currentQuestionIndex = 0;
      this.score = 0;
      this.userAnswer = '';
      this.message = '';
      this.isPlaying = true;
      this.isFinished = false;
    },

    submitAnswer() {

      const current = this.currentWord;
      let correctAnswer = '';

      if (this.settings.direction === 'ger-eng') {
        correctAnswer = current.english;
      } else {
        correctAnswer = current.german;
      }


      if (this.userAnswer.trim().toLowerCase() === correctAnswer.toLowerCase()) {
        this.score++;
        this.message = 'Correct! 🎉';
        this.messageClass = 'success';
      } else {
        this.message = `Wrong! The answer was: ${correctAnswer}`;
        this.messageClass = 'error';
      }


      setTimeout(() => {
        this.nextQuestion();
      }, 1500);
    },

    nextQuestion() {
      // 4. Chuyển câu tiếp theo
      if (this.currentQuestionIndex < this.questions.length - 1) {
        this.currentQuestionIndex++;
        this.userAnswer = ''; // Xóa ô nhập
        this.message = '';
      } else {
        // Hết câu hỏi
        this.isPlaying = false;
        this.isFinished = true;
      }
    },
    
    resetTest() {
      this.isPlaying = false;
      this.isFinished = false;
    }
  }
};
</script>

<style scoped>
/* CSS cơ bản để nhìn cho giống cái thẻ (Card) */
.test-container {
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
}
.card {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  margin-top: 20px;
}
.buttons button {
  margin: 0 5px;
  padding: 10px 20px;
  border: 1px solid #ccc;
  background: #f9f9f9;
  cursor: pointer;
}
.buttons button.active {
  background: #007bff;
  color: white;
  border-color: #007bff;
}
.input-answer {
  width: 80%;
  padding: 10px;
  font-size: 1.2rem;
  margin: 20px 0;
}
.success { color: green; font-weight: bold; }
.error { color: red; font-weight: bold; }
</style>