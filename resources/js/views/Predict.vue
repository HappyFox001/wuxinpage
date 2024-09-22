<template>
    <section class="birth-prediction">
      <div class="container">
        <div class="input-section">
          <h1>{{ translatedText.title }}</h1>
          <div class="form-group">
            <label for="year">{{ translatedText.yearLabel }}</label>
            <select v-model="year" id="year" class="input-select">
              <option v-for="y in yearOptions" :key="y" :value="y">{{ y }}</option>
            </select>
          </div>
  
          <div class="form-group">
            <label for="month">{{ translatedText.monthLabel }}</label>
            <select v-model="month" id="month" class="input-select">
              <option v-for="m in monthOptions" :key="m" :value="m">{{ m }}</option>
            </select>
          </div>
  
          <div class="form-group">
            <label for="day">{{ translatedText.dayLabel }}</label>
            <select v-model="day" id="day" class="input-select">
              <option v-for="d in dayOptions" :key="d" :value="d">{{ d }}</option>
            </select>
          </div>
  
          <div class="form-group">
            <label for="hour">{{ translatedText.hourLabel }}</label>
            <select v-model="hour" id="hour" class="input-select">
              <option v-for="h in hourOptions" :key="h" :value="h">{{ h }}</option>
            </select>
          </div>
  
          <button class="cta-button" @click="handlePrediction">
            {{ translatedText.predictButton }}
          </button>
  
          <p class="hint">{{ translatedText.hint }}</p>
        </div>
  
        <!-- 右侧内容：显示框 -->
        <<div class="result-section">
            <h2>{{ translatedText.predictionTitle }}</h2>
            <div v-if="predictionResult">
    <pre><strong style="color: #ff8c00;">{{ translatedText.bazi }}:</strong> &ensp;{{ displayedResult.bazi }}</pre>
    <pre><strong style="color: #ff8c00;">{{ translatedText.animalSign }}:</strong>  &ensp;{{ displayedResult.animalSign }}</pre>
    <pre><strong style="color: #ff8c00;">{{ translatedText.wuXing }}:</strong>  &ensp;{{ displayedResult.wuXing }}</pre>
    <pre><strong style="color: #ff8c00;">{{ translatedText.elementCycle }}:</strong>  &ensp;{{ displayedResult.elementCycle }}</pre>
    <pre><strong style="color: #ff8c00;">{{ translatedText.animalCompatibility }}:</strong>  &ensp;{{ displayedResult.animalCompatibility }}</pre>
  </div>
  <div v-else>
    <p>{{ translatedText.defaultResultText }}</p>
  </div>
</div>

    </div>
</section>
</template>
  
  <style scoped>
.birth-prediction {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 12vh;
  height: 85vh;
  width: 100vw;
  background-color: #000; /* 整体背景改为暗色 */
  padding: 2vw;
  font-family: "ProtestGuerrilla-Regular", "SimSun";
  overflow-y: auto;
}

.container {
  display: flex;
  justify-content: space-between;
  width: 60%;
  background-color: #000; /* 容器背景改为较浅的深色 */
  border-radius: 8px;
  padding: 20px;
}

.input-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding-right: 20px;
  max-width: 30%; /* 调整左侧选项栏宽度 */
}

.input-section h1 {
  font-size: 2vw;
  color: #ff8c00;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  font-size: 1.2vw;
  color: white;
}

.form-group label{
    margin-bottom: 1.5vh;
}

.form-group option{
    font-family: "ProtestGuerrilla-Regular", "SimSun";
    font-size: 1vw;
}

.input-select {
  width: 80%; /* 宽度100% 以适应父容器 */
  padding: 10px;
  font-size: 1.2vw;
  border-radius: 4px;
  border: 1px solid #333; /* 边框颜色改为深色 */
  background-color: #2e2e2e; /* 输入框背景色改为暗色 */
  color: #f5f5f5; /* 输入框文字颜色改为浅色 */
  font-family: "ProtestGuerrilla-Regular", "SimSun";
}

.cta-button {
  background: linear-gradient(45deg, #ff8c00, #ff005a); /* 保持亮色渐变按钮 */
  border: none;
  width: 80%;
  color: #fff;
  padding: 1.5vh 4vw;
  font-size: 1.2vw;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.4s ease;
  border-radius: 50px;
  margin-top: 20px;
  font-family: "ProtestGuerrilla-Regular", "SimSun";
}

.hint {
  font-size: 1vw;
  color: #999; /* 提示信息保持灰色 */
  margin-top: 20px;
}

.result-section {
  flex: 1;
  background-color: #2e2e2e; /* 结果区域背景改为深色 */
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5); /* 改为深色阴影 */
  text-align: left;
  align-items: center;
  color: #f5f5f5; /* 结果区域文字改为亮色 */
  border: 0.1vw solid #ff8c00; /* 边框颜色改为鲜艳的橙色 */
  box-shadow: 0 4px 10px rgba(255, 140, 0, 0.5); /* 改为橙色阴影 */
}

.result-section pre {
  font-size: 1.2vw;
  font-family: "ProtestGuerrilla-Regular", "SimSun";
  color: #f5f5f5; /* 预格式化的文字也改为亮色 */
  white-space: pre-wrap;
}


  </style>
  
  
  <script>
  import { calculateBazi, calculateWuXing, calculateAnimalSign, calculateElementCycle, calculateAnimalCompatibility } from '../utils/prediction-utils'; 
  import { translations } from '../translations';
  
  export default {
    data() {
        return {
            year: '',
            month: '',
            day: '',
            hour: '',
            predictionResult: null,
            displayedResult: {
            bazi: '',
            animalSign: '',
            wuXing: '',
            elementCycle: '',
            animalCompatibility: ''
            },
            currentDisplayIndex: 0,
            typingSpeed: 10 // 打字效果的速度，毫秒
        };
    },

    computed: {
      currentLanguage() {
        return this.$store.getters.currentLanguage;
      },
      translatedText() {
        return translations[this.currentLanguage].birthPrediction;
      },
      yearOptions() {
        const startYear = 1900;
        const currentYear = new Date().getFullYear();
        return Array.from({ length: currentYear - startYear + 1 }, (v, i) => currentYear - i);
      },
      monthOptions() {
        return Array.from({ length: 12 }, (v, i) => i + 1);
      },
      dayOptions() {
        return Array.from({ length: 31 }, (v, i) => i + 1);
      },
      hourOptions() {
        return Array.from({ length: 24 }, (v, i) => i + 1);
      },
    },

    watch: {
    // 监听语言变化，当语言变化时重新调用 handlePrediction
    currentLanguage(newLang, oldLang) {
      if (this.year && this.month && this.day && this.hour) {
        // 只有在有输入数据的情况下才重新预测
        this.handlePrediction();
      }
    }
  },

    methods: {
  handlePrediction() {
    if (!this.year || !this.month || !this.day || !this.hour) {
      alert('请完整填写出生年月日时！');
      return
    }

    // 计算八
    const bazi = calculateBazi(this.year, this.month-1, this.day, this.hour,this.currentLanguage);
    
    // 计算五行（包含缺失元素和建议）
    const wuXingResult = calculateWuXing(bazi,this.currentLanguage);
    
    // 计算属相
    const animalSign = calculateAnimalSign(this.year,this.month,this.day,this.hour,this.currentLanguage);
    
    // 计算五行相生相克
    const elementCycle = calculateElementCycle(wuXingResult.presentElements,this.currentLanguage);
  
    // 计算属相相生相克
    const animalCompatibility = calculateAnimalCompatibility(animalSign,this.currentLanguage);

    // 设置 predictionResult
    this.predictionResult = {
      bazi, 
      animalSign, 
      wuXing: `${wuXingResult.missingElements}\n${wuXingResult.suggestion}`, 
      elementCycle, 
      animalCompatibility
    };

    // 重置 displayedResult 和 currentDisplayIndex
    this.displayedResult = {
      bazi: '',
      animalSign: '',
      wuXing: '',
      elementCycle: '',
      animalCompatibility: ''
    };
    this.currentDisplayIndex = 0;

    // 开始逐字显示结果
    this.displayResults();
  },

  displayResults() {
    // 按顺序显示每个部分的文字
    const textParts = ['bazi', 'animalSign', 'wuXing', 'elementCycle', 'animalCompatibility'];
    let currentPart = textParts[this.currentDisplayIndex];
    let fullText = this.predictionResult[currentPart];
    
    if (!fullText) return; // 防止空值

    let displayInterval = setInterval(() => {
      if (this.displayedResult[currentPart].length < fullText.length) {
        this.displayedResult[currentPart] += fullText[this.displayedResult[currentPart].length];
      } else {
        clearInterval(displayInterval);
        this.currentDisplayIndex++;
        if (this.currentDisplayIndex < textParts.length) {
          this.displayResults(); // 显示下一个部分
        }
      }
    }, this.typingSpeed);
  }
},
  };
  </script>
  