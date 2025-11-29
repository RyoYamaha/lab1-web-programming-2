<template>
  <div class="quiz-container">
    <h1>Multiple Choice Quiz</h1>

    <div v-if="!isPlaying && !isFinished" class="card settings-card">
      <h3>Quiz Settings</h3>
      
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
        <label>How many questions?</label>
        <div class="buttons">
          <button v-for="num in [5, 10, 15]" :key="num"
            :class="{ active: settings.limit === num }"
            @click="settings.limit = num">
            {{ num }} questions
          </button>
        </div>
      </div>

      <button class="btn-start" @click="startQuiz">Start Quiz</button>
    </div>

    <div v-else-if="isPlaying" class="card question-card">
      <div class="progress-pill">Question {{ currentIndex + 1 }} of {{ questions.length }}</div>
      
      <div class="question-header">
        <span v-if="settings.direction === 'ger-eng'">🇩🇪 German</span>
        <span v-else>🇬🇧 English</span>
      </div>
      
      <div class="main-word">
        {{ getQuestionWord(currentWord) }}
      </div>

      <div class="options-grid">
        <div 
          v-for="(option, index) in currentOptions" 
          :key="index"
          class="option-btn"
          :class="getOptionClass(option)"
          @click="selectAnswer(option)"
        >
          <span class="option-label">{{ ['A', 'B', 'C', 'D'][index] }}</span>
          <span class="option-text">{{ getAnswerWord(option) }}</span>
        </div>
      </div>

    </div>

    <div v-else class="card result-card">
      <h2>Quiz Completed!</h2>
      <p class="score">Your Score: {{ score }} / {{ questions.length }}</p>
      
      <div v-if="score === questions.length">🌟 Perfect! Amazing job! 🌟</div>
      <div v-else-if="score > questions.length / 2">Good job! Keep practicing.</div>
      <div v-else>Don't give up! Try again.</div>

      <button class="btn-start" @click="resetQuiz">Try Again</button>
    </div>

  </div>
</template>

<script>
import { api } from '../helpers/helpers';

export default {
  name: 'Quiz',
  data() {
    return {
      words: [],            // Tất cả từ trong DB
      questions: [],        // Danh sách câu hỏi đã lọc
      currentOptions: [],   // 4 đáp án cho câu hiện tại
      isPlaying: false,
      isFinished: false,
      currentIndex: 0,
      score: 0,
      selectedOption: null, // Đáp án người dùng vừa chọn (để hiện màu xanh/đỏ)
      canClick: true,       // Chặn click nhiều lần
      
      settings: {
        direction: 'ger-eng',
        limit: 5
      }
    };
  },
  computed: {
    currentWord() {
      return this.questions[this.currentIndex];
    }
  },
  async created() {
    this.words = await api.getWords();
  },
  methods: {
    startQuiz() {
      if (this.words.length < 4) {
        alert("Need at least 4 words to start a quiz!");
        return;
      }
      // 1. Trộn và lấy n câu hỏi
      const shuffled = [...this.words].sort(() => 0.5 - Math.random());
      this.questions = shuffled.slice(0, this.settings.limit);
      
      // 2. Reset trạng thái
      this.currentIndex = 0;
      this.score = 0;
      this.isPlaying = true;
      this.isFinished = false;
      
      // 3. Tạo đáp án cho câu đầu tiên
      this.generateOptions();
    },

    generateOptions() {
      this.selectedOption = null;
      this.canClick = true;

      const correctWord = this.currentWord;
      
      // Lấy ra danh sách các từ KHÔNG PHẢI từ đúng (để làm đáp án sai)
      const otherWords = this.words.filter(w => w._id !== correctWord._id);
      
      // Trộn và lấy 3 từ sai
      const distractors = otherWords.sort(() => 0.5 - Math.random()).slice(0, 3);
      
      // Gộp 1 đúng + 3 sai và trộn vị trí lại
      const options = [correctWord, ...distractors];
      this.currentOptions = options.sort(() => 0.5 - Math.random());
    },

    getQuestionWord(word) {
      return this.settings.direction === 'ger-eng' ? word.german : word.english;
    },
    
    getAnswerWord(word) {
      return this.settings.direction === 'ger-eng' ? word.english : word.german;
    },

    selectAnswer(option) {
      if (!this.canClick) return; // Chặn click liên tục
      this.canClick = false;
      this.selectedOption = option;

      // Kiểm tra đúng sai
      if (option._id === this.currentWord._id) {
        this.score++;
      }

      // Đợi 1 giây để người dùng xem kết quả rồi chuyển câu
      setTimeout(() => {
        this.nextQuestion();
      }, 1000);
    },

    nextQuestion() {
      if (this.currentIndex < this.questions.length - 1) {
        this.currentIndex++;
        this.generateOptions();
      } else {
        this.isPlaying = false;
        this.isFinished = true;
      }
    },

    // Hàm tạo class CSS màu xanh/đỏ cho nút bấm
    getOptionClass(option) {
      if (!this.selectedOption) return ''; // Chưa chọn thì không màu
      
      // Nếu là đáp án đúng -> Luôn hiện màu XANH
      if (option._id === this.currentWord._id) {
        return 'correct';
      }
      
      // Nếu là đáp án mình chọn mà bị sai -> hiện màu ĐỎ
      if (this.selectedOption._id === option._id) {
        return 'wrong';
      }
      return 'disabled'; // Các nút còn lại làm mờ đi
    },

    resetQuiz() {
      this.isPlaying = false;
      this.isFinished = false;
    }
  }
};
</script>

<style scoped>
.quiz-container {
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
  font-family: 'Arial', sans-serif;
}

.card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  margin-top: 20px;
}

/* SETTINGS */
.buttons button {
  margin: 5px;
  padding: 10px 20px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}
.buttons button.active {
  background: #3b82f6; /* Màu xanh dương giống ảnh */
  color: white;
  border-color: #3b82f6;
  font-weight: bold;
}
.btn-start {
  background: #10b981; /* Màu xanh lá Start */
  color: white;
  border: none;
  padding: 12px 30px;
  border-radius: 8px;
  font-size: 1.1rem;
  margin-top: 20px;
  cursor: pointer;
}

/* QUESTION CARD */
.progress-pill {
  background: #f3f4f6;
  display: inline-block;
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 20px;
}
.question-header {
  text-align: left;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}
.main-word {
  background: #eef2ff;
  padding: 20px;
  font-size: 2rem;
  font-weight: bold;
  color: #1e3a8a;
  border-radius: 10px;
  margin-bottom: 25px;
}

/* OPTIONS GRID */
.options-grid {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.option-btn {
  display: flex;
  align-items: center;
  padding: 15px;
  border: 2px solid #e5e7eb;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s;
  background: white;
}
.option-btn:hover {
  border-color: #3b82f6;
  background: #f9fafb;
}
.option-label {
  background: #f3f4f6;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  color: #666;
  margin-right: 15px;
}
.option-text {
  font-size: 1.1rem;
  font-weight: 500;
}

/* TRẠNG THÁI ĐÚNG SAI */
.option-btn.correct {
  border-color: #10b981;
  background: #d1fae5;
  color: #065f46;
}
.option-btn.wrong {
  border-color: #ef4444;
  background: #fee2e2;
  color: #991b1b;
}
.option-btn.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.result-card h2 { color: #3b82f6; }
.score { font-size: 1.5rem; font-weight: bold; margin: 20px 0; }
</style>