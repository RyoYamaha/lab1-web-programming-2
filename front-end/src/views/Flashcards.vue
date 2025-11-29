<template>
  <div class="container">
    <h1>Flashcards</h1>
    
    <div v-if="words.length === 0">Loading words...</div>

    <div v-else>
      <p class="count">Card {{ currentIndex + 1 }} of {{ words.length }}</p>

      <!-- KHUNG THẺ (Chứa hiệu ứng lật) -->
      <div class="flashcard-scene">
        <div 
          class="flashcard" 
          :class="{ isFlipped: isFlipped }" 
          @click="flipCard"
        >
          
          <!-- MẶT TRƯỚC (Front) -->
          <div class="card-face card-front">
            <div class="card-header">
              🇬🇧 ENGLISH
            </div>
            <div class="card-body">
              {{ currentWord.english }}
            </div>
            <div class="card-footer">
              Click to flip 👆
            </div>
          </div>

          <!-- MẶT SAU (Back) -->
          <div class="card-face card-back">
            <div class="card-header header-german">
              🇩🇪 GERMAN
            </div>
            <div class="card-body">
              {{ currentWord.german }}
            </div>
            <div class="card-footer">
              Click to flip 👆
            </div>
          </div>

        </div>
      </div>

      <!-- NÚT ĐIỀU HƯỚNG -->
      <div class="controls">
        <button @click="prevCard" :disabled="currentIndex === 0">Previous</button>
        <button @click="nextCard" :disabled="currentIndex === words.length - 1">Next</button>
      </div>
    </div>
  </div>
</template>

<script>
import { api } from '../helpers/helpers';

export default {
  name: 'Flashcards',
  data() {
    return {
      words: [],
      currentIndex: 0,
      isFlipped: false // Trạng thái lật (false = mặt trước, true = mặt sau)
    };
  },
  computed: {
    currentWord() {
      return this.words[this.currentIndex];
    }
  },
  async created() {
    this.words = await api.getWords();
  },
  methods: {
    flipCard() {
      this.isFlipped = !this.isFlipped;
    },
    nextCard() {
      if (this.currentIndex < this.words.length - 1) {
        this.isFlipped = false; // Reset về mặt trước khi qua từ mới
        // Đợi 200ms cho hiệu ứng lật về rồi mới đổi từ
        setTimeout(() => {
           this.currentIndex++;
        }, 200);
      }
    },
    prevCard() {
      if (this.currentIndex > 0) {
        this.isFlipped = false;
        setTimeout(() => {
           this.currentIndex--;
        }, 200);
      }
    }
  }
};
</script>

<style scoped>
.container {
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
}

/* KHUNG 3D */
.flashcard-scene {
  width: 100%;
  height: 300px;
  perspective: 1000px; /* Tạo chiều sâu 3D */
  margin: 20px 0;
  cursor: pointer;
}

.flashcard {
  width: 100%;
  height: 100%;
  position: relative;
  transition: transform 0.6s; /* Tốc độ lật */
  transform-style: preserve-3d;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  border-radius: 15px;
}

/* Khi có class isFlipped thì xoay 180 độ */
.flashcard.isFlipped {
  transform: rotateY(180deg);
}

/* CẤU TRÚC MẶT TRƯỚC VÀ SAU */
.card-face {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden; /* Ẩn mặt lưng khi xoay */
  border-radius: 15px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: white;
}

/* Mặt sau phải xoay sẵn 180 độ để úp vào lưng mặt trước */
.card-back {
  transform: rotateY(180deg);
}

/* TRANG TRÍ CARD (Giống ảnh mẫu) */
.card-header {
  background: #3b82f6; /* Màu xanh dương */
  color: white;
  padding: 15px;
  font-weight: bold;
  font-size: 1.2rem;
  text-transform: uppercase;
}
.header-german {
  background: #1e3a8a; /* Màu xanh đậm hơn cho tiếng Đức */
}

.card-body {
  flex: 1; /* Chiếm hết khoảng trống giữa */
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.5rem;
  font-weight: bold;
  color: #333;
}

.card-footer {
  background: #f3f4f6;
  padding: 10px;
  font-size: 0.9rem;
  color: #666;
}

/* NÚT BẤM */
.controls button {
  padding: 10px 20px;
  font-size: 1rem;
  margin: 0 10px;
  cursor: pointer;
  background: #222;
  color: white;
  border: none;
  border-radius: 5px;
}
.controls button:disabled {
  background: #ccc;
  cursor: not-allowed;
}
</style>