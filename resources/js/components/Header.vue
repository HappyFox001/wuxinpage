<template>
  <header class="cyberpunk-header">
    <div class="container">
      <img src="../assets/零空间.svg" alt="Cyberpunk Logo" class="logo" />
      <img src="../assets/武大logo.svg" alt="Cyberpunk Logo" class="logo" />
      <nav class="nav-links">
        <router-link v-bind:to="{ name: 'home' }" exact>{{ translatedText.home }}</router-link>
        <router-link v-bind:to="{name:'predict'}">{{ translatedText.predict }}</router-link>
        <router-link v-bind:to="{name:'contact'}">{{ translatedText.contact }}</router-link>
      </nav>
      <div class="action-buttons">
        <button class="cta-button" @click="handleWalletClick">
          {{ walletConnected ? translatedText.disconnectWallet : translatedText.connectWallet }}
        </button>
        <button class="language-switch-button" @click="toggleLanguage">
          {{ currentLanguage === 'en' ? translatedText.switchToChinese : '切换到英文' }}
        </button>
      </div>
    </div>
  </header>
  hello
</template>


<script>
import { translations } from '../translations';

export default {
  computed: {
    currentLanguage() {
      return this.$store.getters.currentLanguage; // 从 Vuex 获取当前语言
    },
    translatedText() {
      return translations[this.currentLanguage]; // 根据当前语言获取对应的翻译
    },
    walletConnected() {
      return this.$store.state.walletConnected; // 从 Vuex 获取钱包连接状态
    },
  },
  methods: {
    toggleLanguage() {
      const newLanguage = this.currentLanguage === 'en' ? 'zh' : 'en';
      this.$store.dispatch('setLanguage', newLanguage); // 使用 Vuex 切换语言
      this.changeLanguage(newLanguage);
    },
    changeLanguage(lang) {
      document.documentElement.lang = lang; // 更新文档语言属性
    },
    async handleWalletClick() {
      if (this.walletConnected) {
        this.disconnectWallet();
      } else {
        const connected = await this.connectWallet();
        if (connected) {
          this.sendWalletAddressToBackend();
        } else {
        }
      }
    },
    async connectWallet() {
      const connected = await this.$store.dispatch('connectWallet');
      return connected;
    },
    disconnectWallet() {
      this.$store.dispatch('disconnectWallet');
    },
    sendWalletAddressToBackend() {
      const walletAddress = this.connectedAccount;

      if (walletAddress) {
        fetch('http://127.0.0.1:5000/connect_wallet', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ wallet_address: walletAddress }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data.message);
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      } else {
        console.error('未能获取到钱包地址');
      }
    },
  },
};

</script>
<style scoped>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  @font-face {
    font-family: 'ProtestGuerrilla-Regular';
    src: url('../assets/fonts/Protest_Guerrilla/ProtestGuerrilla-Regular.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }
  
  @font-face {
    font-family: 'Poppins';
    src: url('../assets/fonts/Poppins/Poppins-Italic.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  .cyberpunk-header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 15vh; /* 改为视口高度的单位 */
    background: black;
    border-bottom: 2px solid #756565;
    display: flex;
    justify-content: center; /* 保证整个 header 水平居中 */
    align-items: center;
    z-index: 1000;
    box-shadow: 0 4px 20px rgba(114, 59, 202, 0.2);
}

  
  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0 20px;
  }
  
  .logo {
    width: 10vw; /* 改为视口宽度的单位 */
    height: auto; /* 自动调整高度，保持比例 */
    margin-right: auto;
    margin-left: 2vw;
    margin-bottom: 0.5vh;
}
  
  .nav-links {
    display: flex;
    justify-content: center;
    flex: 1;
    /* 根据屏幕宽度调整 transform */
    /* transform: translateX(-700vw);  */
    flex-wrap: wrap; /* 添加自动换行 */
}
  
  .nav-links a {
    color: #dfcb18;
    text-decoration: none;
    margin-left: 3vw;
    font-size: 1.5vw;
    font-family: 'ProtestGuerrilla-Regular', "SimSun"; 
    position: relative;
    transition: color 0.3s;
}

.nav-links a::before {
  content: '';
  position: absolute;
  left: 0;
  bottom: -5px;
  width: 0;
  height: 2px;
  background: white;
  transition: width 0.3s ease-in-out;
}

.nav-links a:hover {
  color: white;
  cursor: pointer;
}

.nav-links a:hover::before {
  width: 100%;
}
  
.cta-button {
  background: none;
  width: 12vw; /* 改为视口宽度的单位 */
  border: none;
  color: #dfcb18;
  margin-right: 2vw;
  font-size: 1vw; /* 根据视口宽度调整字体大小 */
  font-family: 'ProtestGuerrilla-Regular',"SimSun"; 
  position: relative;
  cursor: pointer;
  transition: color 0.3s ease-in-out;
  padding-left: 2vw;
  padding-right: 1.8vw; /* 调整右侧内边距，避免文字和图标重叠 */
  background-image: url('../assets/header_images/wallet_white.svg');
  background-repeat: no-repeat;
  background-position: 95% center; /* 图标垂直居中，放在右边 */
}

  
  .cta-button::before {
    content: '';
    position: absolute;
    left: 0;
    bottom: -5px;
    width: 0;
    height: 2px;
    background: white;
    transition: width 0.3s ease-in-out;
  }
  
  .cta-button:hover {
    color: white; /* 与导航链接的 hover 效果一致 */
    background-image: url('../assets/header_images/wallet_yellow.svg'); /* 切换为悬停图标 */
  }
  
  .cta-button:hover::before {
    width: 100%; /* 按钮 hover 时的下划线效果 */
  }
  
  .language-switch-button {
    background: none;
    width: 12vw; /* 改为视口宽度的单位 */
    border: none;
    color: #dfcb18;
    margin-right: 2vw;
    font-size: 1vw; /* 根据视口宽度调整字体大小 */
    font-family: 'ProtestGuerrilla-Regular', "SimSun"; 
    position: relative;
    cursor: pointer;
    transition: color 0.3s ease-in-out;
    padding-left: 2vw;
    padding-right: 1.8vw; /* 调整右侧内边距，避免文字和图标重叠 */
    background-image: url('../assets/header_images/refresh_white.svg');
    background-repeat: no-repeat;
    background-position: 95% center; /* 图标垂直居中，放在右边 */
}

.language-switch-button::before {
    content: '';
    position: absolute;
    left: 0;
    bottom: -5px;
    width: 0;
    height: 2px;
    background: white;
    transition: width 0.3s ease-in-out;
  }
.language-switch-button:hover {
  color: white;
  background-image: url('../assets/header_images/refresh_yellow.svg'); /* 切换为悬停图标 */
}

.language-switch-button:hover::before {
    width: 100%; /* 按钮 hover 时的下划线效果 */
  }
  /* 响应式设计 */
  @media (max-width: 768px) {
    .container {
      flex-direction: column;
      height: auto;
      padding: 10px;
    }
  
    .nav-links {
      flex-direction: column;
      align-items: center;
    }
  
    .nav-links router-link {
      margin-left: 0;
      margin-top: 10px;
    }
  
    .cta-button {
      margin-top: 10px;
    }
  } 
</style>
  