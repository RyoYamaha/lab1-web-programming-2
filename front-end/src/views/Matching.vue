<template>
  <div class="matching-container">
    <h1>Word Matching Game</h1>

    <div v-if="!isPlaying && !isFinished" class="card start-card">
      <h3>Ready to challenge your memory?</h3>
      <p>Match the German words with their English meanings.</p>
      
      <p class="word-count-info">
        (You currently have {{ allWords.length }} words available)
      </p>

      <button class="btn-start" @click="startGame">Start Game</button>
    </div>

    <div v-else-if="isPlaying">
      <div class="stats-bar">
        <div class="stat-item">
          <i class="clock icon"></i> Time: {{ timer }}s
        </div>
        <div class="stat-item">
          <i class="check circle icon"></i> Matches: {{ matchesFound }}/{{ totalPairs }}
        </div>
        <div class="stat-item">
          <i class="star icon"></i> Score: {{ score }}
        </div>
      </div>

      <div class="game-board">
        
        <div class="column">
          <h3 class="col-title">🇩🇪 German</h3>
          <div 
            v-for="item in leftItems" 
            :key="item.id"
            class="word-card"
            :class="getCardClass(item, 'left')"
            @click="selectCard(item, 'left')"
          >
            {{ item.german }}
          </div>
        </div>

        <div class="column">
          <h3 class="col-title">🇬🇧 English</h3>
          <div 
            v-for="item in rightItems" 
            :key="item.id"
            class="word-card"
            :class="getCardClass(item, 'right')"
            @click="selectCard(item, 'right')"
          >
            {{ item.english }}
          </div>
        </div>

      </div>
    </div>

    <div v-else class="card result-card">
      <h2>Game Over!</h2>
      <div class="final-score">Final Score: {{ score }}</div>
      <p>Time taken: {{ timer }} seconds</p>
      <button class="btn-start" @click="startGame">Play Again</button>
    </div>

  </div>
</template>

<script>
import { api } from '../helpers/helpers';

export default {
  name: 'Matching',
  data() {
    return {
      allWords: [],
      leftItems: [],
      rightItems: [],
      
      selectedLeft: null,
      selectedRight: null,
      
      isPlaying: false,
      isFinished: false,
      
      matchesFound: 0,
      totalPairs: 0,     
      score: 0,
      timer: 0,
      timerInterval: null
    };
  },
  async created() {
    this.allWords = await api.getWords();
  },
  methods: {
    startGame() {

      if (this.allWords.length === 0) {
        alert("Your vocabulary list is empty! Please add some words first.");
        return;
      }


      const maxLimit = 10; 
      const playCount = Math.min(this.allWords.length, maxLimit);
      
      this.totalPairs = playCount; 

    
      this.matchesFound = 0;
      this.score = 0;
      this.timer = 0;
      this.selectedLeft = null;
      this.selectedRight = null;
      this.isPlaying = true;
      this.isFinished = false;

     
      const shuffled = [...this.allWords].sort(() => 0.5 - Math.random());
      const gameWords = shuffled.slice(0, playCount);

    
      this.leftItems = gameWords.map(w => ({
        id: w._id,
        german: w.german,
        status: 'default'
      }));


      const shuffledEnglish = [...gameWords].sort(() => 0.5 - Math.random());
      this.rightItems = shuffledEnglish.map(w => ({
        id: w._id,
        english: w.english,
        status: 'default'
      }));


      this.startTimer();
    },

    startTimer() {
      clearInterval(this.timerInterval);
      this.timerInterval = setInterval(() => {
        this.timer++;
      }, 1000);
    },

    stopTimer() {
      clearInterval(this.timerInterval);
    },

    selectCard(item, side) {
      if (item.status === 'matched') return;


      if (side === 'left') {
        if (this.selectedLeft && this.selectedLeft.id === item.id) {
          this.selectedLeft = null;
          item.status = 'default';
        } else {
          if (this.selectedLeft) this.selectedLeft.status = 'default';
          this.selectedLeft = item;
          item.status = 'selected';
        }
      }
      

      if (side === 'right') {
        if (this.selectedRight && this.selectedRight.id === item.id) {
          this.selectedRight = null;
          item.status = 'default';
        } else {
          if (this.selectedRight) this.selectedRight.status = 'default';
          this.selectedRight = item;
          item.status = 'selected';
        }
      }


      if (this.selectedLeft && this.selectedRight) {
        this.checkMatch();
      }
    },

    checkMatch() {
      const left = this.selectedLeft;
      const right = this.selectedRight;

      if (left.id === right.id) {

        left.status = 'matched';
        right.status = 'matched';
        this.score += 10;
        this.matchesFound++;
        
        this.selectedLeft = null;
        this.selectedRight = null;

        if (this.matchesFound === this.totalPairs) {
          this.stopTimer();
          setTimeout(() => {
            this.isPlaying = false;
            this.isFinished = true;
          }, 1000);
        }

      } else {

        left.status = 'wrong';
        right.status = 'wrong';
        
        setTimeout(() => {
          left.status = 'default';
          right.status = 'default';
          this.selectedLeft = null;
          this.selectedRight = null;
        }, 500);
      }
    },

    getCardClass(item, side) {
      if (item.status === 'matched') return 'matched';
      if (item.status === 'wrong') return 'wrong';
      if (item.status === 'selected') return 'selected';
      return '';
    }
  },
  beforeDestroy() {
    this.stopTimer();
  }
};
</script>

<style scoped>
.matching-container {
  max-width: 900px;
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
.word-count-info {
  color: #666;
  font-size: 0.9rem;
  margin-top: -10px;
  margin-bottom: 20px;
  font-style: italic;
}
.btn-start {
  background: #3b82f6;
  color: white;
  border: none;
  padding: 12px 30px;
  border-radius: 8px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background 0.2s;
}
.btn-start:hover {
  background: #2563eb;
}


.stats-bar {
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-bottom: 20px;
}
.stat-item {
  background: white;
  padding: 10px 20px;
  border-radius: 20px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
  font-weight: bold;
  color: #555;
  display: flex;
  align-items: center;
  gap: 8px;
}


.game-board {
  display: flex;
  gap: 20px;
}
.column {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.col-title {
  color: #3b82f6;
  margin-bottom: 10px;
  text-align: left;
  padding-left: 5px;
}


.word-card {
  background: white;
  border: 1px solid #e5e7eb;
  padding: 15px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 1rem;
  text-align: left;
  color: #333;
  user-select: none; 
}
.word-card:hover {
  background-color: #f9fafb;
  border-color: #ccc;
}


.word-card.selected {
  background-color: #e0f2fe;
  border-color: #3b82f6;
  color: #0369a1;
  font-weight: bold;
}

.word-card.matched {
  background-color: #dcfce7;
  border-color: #22c55e;
  color: #15803d;
  opacity: 0.6;
  cursor: default;
}

.word-card.wrong {
  background-color: #fee2e2;
  border-color: #ef4444;
  color: #b91c1c;
  animation: shake 0.3s;
}

@keyframes shake {
  0% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  50% { transform: translateX(5px); }
  75% { transform: translateX(-5px); }
  100% { transform: translateX(0); }
}

.final-score {
  font-size: 3rem;
  font-weight: bold;
  color: #3b82f6;
  margin: 20px 0;
}
</style>