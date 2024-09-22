<template>
  <section class="homepage">
    <div class="content">
      <h1>
        <span>{{ translatedText.title }}</span>
        <br>
        <span class="highlight">{{ translatedText.subtitle }}</span>
      </h1>
      <p>{{ translatedText.subtitle }}</p>
      <p>
        <span class="wood">{{ translatedText.wood }}</span>&ensp;
        <span class="fire">{{ translatedText.fire }}</span>&ensp;
        <span class="earth">{{ translatedText.earth }}</span>&ensp;
        <span class="metal">{{ translatedText.metal }}</span>&ensp;
        <span class="water">{{ translatedText.water }}</span>&ensp;
      </p>
      <br>
      <div class="button-group">
        <button class="cta-button" @click="handleMintNFT">
          {{ translatedText.mintButton }}
        </button>
      </div>
    </div>
  </section>
  <div v-if="showMintForm" class="popup">
    <div class="popup-content">
      <h2 class="popup-title">{{ translatedText.mintTitle }}</h2>
      <label for="nftName" class="popup-label">{{ translatedText.selectNFTName }}:</label>
      <select v-model="nftName" id="nftName" class="popup-select">
        <option value="Fire">{{ translatedText.fire }}</option>
        <option value="Water">{{ translatedText.water }}</option>
        <option value="Wood">{{ translatedText.wood }}</option>
        <option value="Metal">{{ translatedText.metal }}</option>
        <option value="Earth">{{ translatedText.earth }}</option>
      </select>
      <label for="recipientAddress" class="popup-label">{{ translatedText.recipientAddress }}:</label>
      <input v-model="recipientAddress" id="recipientAddress" class="popup-input" type="text" placeholder="输入接收者地址" />
      <button class="popup-button" @click="mintNFT">{{ translatedText.mint }}</button>
      <br>
      <button class="popup-button cancel-button" @click="closeMintForm">{{ translatedText.cancelButton }}</button>
    </div>
  </div>
  <div v-if="showSuccessPopup" class="popup">
    <div class="popup-content">
      <h2 class="popup-title"> {{translatedText.mint_Success}}</h2>
      <p class="popup-row">
        <span class="popup-label2">{{translatedText.transactionHash}}</span>&ensp;
        <span><a class="popup-info":href="transactionLink" target="_blank">{{ transactionHash }}</a></span>
      </p>
      <p class="popup-row">
        <span class="popup-label2">{{translatedText.contractAddress}}</span>&ensp;
        <span> <a class="popup-info" :href="contractLink" target="_blank">{{ contractAddress }}</a></span>
      </p>
      <p class="popup-row">
        <span class="popup-label2">{{translatedText.tokenId}}</span>&ensp;
        <span class="popup-info">{{ tokenId }}</span>
      </p>
      <button class="popup-button popup-button-close" @click="closeSuccessPopup">Close</button>
    </div>
  </div>


  <div class="explanation">
    <div class="explanation-item hidden">
      <h2>{{ translatedText.wuXinTitle }}</h2>
      <p>{{ translatedText.wuXinDescription }}</p>
      <a href="https://zh.wikipedia.org/wiki/%E4%BA%94%E8%A1%8C" target="_blank">
        <button class="cta-button learn-more">Learn More</button>
      </a>
    </div>
    <div class="explanation-item hidden">
      <h2>{{ translatedText.yinYangTitle }}</h2>
      <p>{{ translatedText.yinYangDescription }}</p>
      <a href="https://zh.wikipedia.org/zh-cn/%E9%98%B4%E9%98%B3" target="_blank">
        <button class="cta-button learn-more">Learn More</button>
      </a>
    </div>
    <div class="explanation-item hidden">
      <h2>{{ translatedText.baGuaTitle }}</h2>
      <p>{{ translatedText.baGuaDescription }}</p>
      <a href="https://zh.wikipedia.org/wiki/%E5%85%AB%E5%8D%A6" target="_blank">
        <button class="cta-button learn-more">Learn More</button>
      </a>
    </div>
    <div class="explanation-item hidden download">
      <h2 style="color: black;">{{ translatedText.whitepaperTitle }}</h2>
      <p style="color: black;">{{ translatedText.whitepaperDescription }}</p>
      <a>
        <button class="cta-button whitepaper">Whitepaper</button>
      </a>
    </div>
  </div>
</template>


<style scoped>
.homepage {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 10vh;
  height: 90vh; 
  background-color: black;
  color: #fff;
  text-align: center;
  overflow-y: auto;
  border-bottom: 2px solid #756565;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 5vw; 
}

.content h1 {
  font-size: 3vw; 
  font-family: 'ProtestGuerrilla-Regular', "SimSun";
  color: #dfe1e6;
}

.content h1 .highlight {
  color: #ff8c00;
}

.content p {
  font-family: 'ProtestGuerrilla-Regular', "SimSun";
  font-size: 1.3vw; /* Responsive font size */
  color: #a1a1a1;
  margin: 2vw 0; /* Adjust margin using vh */
}

.content span {
  font-family: 'ProtestGuerrilla-Regular', "SimSun";
}

.water {
  color: #00bfff;
}

.wood {
  color: #228b22;
}

.fire {
  color: #ff4500;
}

.earth {
  color: #8b4513;
}

.metal {
  color: #c0c0c0;
}

.button-group {
  margin-top: 3vh; /* Adjust margin using vh */
}

.cta-button {
  background: linear-gradient(45deg, #ff8c00, #ff005a);
  border: none;
  color: #fff;
  padding: 1.5vh 4vw; /* Adjust padding for better spacing */
  font-size: 1.2vw; /* Responsive font size */
  font-family: 'ProtestGuerrilla-Regular', "SimSun";
  letter-spacing: 1.5px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.4s ease;
  position: relative;
  box-shadow: 0 8px 15px rgba(255, 0, 90, 0.6);
  border-radius: 50px;
  z-index: 1;
  overflow: hidden;
}

.cta-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 100%;
  background: rgba(255, 255, 255, 0.2);
  transition: width 0.4s ease;
  z-index: -1;
}

.cta-button:hover::before {
  width: 100%;
}

.cta-button:hover {
  color: #000;
  box-shadow: 0 8px 30px rgba(211, 115, 25, 0.8);
  transform: translateY(-5px);
}

.explanation {
  display: flex;
  flex-direction: column; /* Change to column layout for smaller screens */
  background-color: #000;
  padding-bottom: 1vh;
  height: 85vh; /* Remove fixed height */
}

.explanation-item {
  display: flex; 
  flex-direction: column; 
  justify-content: space-between;
  margin-top: 5vh; /* Adjust margin using vh */
  width: 100%; /* Full width on smaller screens */
  background-color: #000;
  text-align: center;
  border-bottom: 1px solid #444; /* Change border to bottom for column layout */
  padding: 1vh 1vw; /* Adjust padding for better spacing */
  color: #fff;
  position: relative;
  box-sizing: border-box;
}

.explanation-item:last-child {
  border-bottom: none; 
}

.hidden {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.explanation-item.visible {
  opacity: 1;
  transform: translateY(0);
}

.explanation-item h2 {
  font-size: 1.5vw; /* Responsive font size */
  margin-bottom: 2vh; 
  color: #fff;
  font-family: "ProtestGuerrilla-Regular","SimSun";
}

.learn-more, .whitepaper {
  background: #ff8c00;
  border: none;
  color: #000;
  padding: 1vh 2vw; /* Adjust padding for better spacing */
  font-size: 1vw; /* Responsive font size */
  cursor: pointer;
  transition: background 0.3s ease;
  text-transform: uppercase;
  margin-top: auto;
  margin-bottom: 1vh;
}

.whitepaper {
  background-color: #000;
  color: white;
}

.learn-more:hover, .whitepaper:hover {
  background: #fff;
  color: #ff8c00;
}

.download {
  background-color: #ff8c00;
  color: #000;
}

.explanation-item p {
  font-size: 1.0vw; /* Responsive font size */
  font-family: 'Poppins',"SimSun";
  color: #a1a1a1;
  margin: 1vh 0 2vh; /* Adjust margin using vh */
  line-height: 1.5;
  text-align: left;
}

@media (min-width: 769px) {
  .explanation {
    flex-direction: row; /* Change to row layout for larger screens */
    height: 88vh; /* Set height for larger screens */
  }

  .explanation-item {
    width: 25%; /* Set width for row layout */
    border-right: 0.11vh solid #444; /* Change border to right for row layout */
    border-bottom: none; /* Remove bottom border for row layout */
  }

  .explanation-item:last-child {
    border-right: none; 
  }
}
.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.85); /* 黑色背景，带透明度 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* 保证在最前层 */
}

.popup-content {
  background: black;
  padding: 1.5vw;
  border-radius: 8px;
  width: 30vw;
  text-align: center;
  box-shadow: 0 8px 15px rgba(255, 0, 90, 0.6);
  border: 1px solid #756565; /* 边框大小调整为1px，更加适中 */
}

.popup-input,
.popup-select {
  width: 100%; /* 保持两者的宽度一致 */
  padding: 10px;
  margin-bottom: 20px;
  border: 2px solid #756565;
  border-radius: 4px;
  background-color: #1c1c1c; /* 深色背景 */
  color: #fff; /* 白色字体 */
  font-family: 'ProtestGuerrilla-Regular', "SimSun";
  font-size: 1.2vw;
  box-sizing: border-box; /* 确保 padding 不影响整体宽度 */
}


.popup-title {
  font-family: 'ProtestGuerrilla-Regular', "SimSun";
  font-size: 2vw;
  color: #ff8c00;
  margin-bottom: 20px;
}

.popup-label {
  font-family: 'ProtestGuerrilla-Regular', "SimSun";
  color: #dfe1e6;
  font-size: 1.2vw;
  text-align: left;
  display: block;
  margin-bottom: 10px;
}

.popup-row {
  display: flex;
  flex-wrap: wrap; /* 允许在空间不足时换行 */
  margin-bottom: 0.6vh; /* 每行之间的间距 */
}

.popup-info{
  font-family: 'ProtestGuerrilla-Regular', "SimSun";
  color: #dfe1e6;
  font-size: 1.2vw;
  text-align: left;
  display: block;
  word-wrap: break-word;
  word-break: break-all;
  overflow-wrap: break-word;
  text-overflow: ellipsis;
  margin-bottom: 0.6vh;
}

.popup-label2 {
  font-family: 'ProtestGuerrilla-Regular', "SimSun";
  color: #ff8c00;
  font-size: 1.2vw;
  text-align: left;
  display: block;
  margin-bottom: 0.6vh;
}

.popup-button {
  background: linear-gradient(45deg, #ff8c00, #ff005a);
  border: none;
  color: #fff;
  padding: 1.5vh 4vw;
  font-size: 1.2vw;
  font-family: 'ProtestGuerrilla-Regular', "SimSun";
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.4s ease;
  box-shadow: 0 8px 15px rgba(255, 0, 90, 0.6);
  border-radius: 50px;
  margin-top: 10px;
  width: 100%;
}

.popup-button-close{
  width: 50%;
}

.popup-select option {
  background-color: #1c1c1c; /* 选项背景为深色 */
  color: #fff; /* 选项文字为白色 */
}

.cancel-button {
  background: #333; /* 取消按钮为暗色 */
  margin-top: 15px;
}

.cancel-button:hover {
  background: #555;
}

</style>

<script>
import { ethers } from 'ethers'; // 导入 ethers 库
import { translations } from '../translations';
export default {
  data() {
    return {
      showMintForm: false, // 控制弹出框显示
      nftName: '', // NFT 名称
      recipientAddress: '', // 接收者地址
      transactionHash: '', // 交易哈希
      tokenId: '', // Token ID
      showSuccessPopup: false
    };
  },
  mounted() {
    // 在 mounted 钩子中调用 Intersection Observer 的设置函数，确保在每次导航时初始化
    this.setupIntersectionObserver();
  },
  computed: {
    walletConnected() {
      return this.$store.state.walletConnected;
    },
    connectedAccount() {
      return this.$store.state.connectedAccount;
    },
    contractAddress() {
      return this.$store.state.contractAddress;
    },
    contractABI() {
      return this.$store.state.contractABI;
    },
    currentLanguage() {
      return this.$store.getters.currentLanguage; // 从 Vuex 获取当前语言
    },
    translatedText() {
      return translations[this.currentLanguage].homepage; // 根据当前语言获取 homepage 的翻译
    },
    transactionLink() {
    return `https://etherscan.io/tx/${this.transactionHash}`; // 根据网络选择正确的区块链浏览器
    },

    contractLink() {
    return `https://etherscan.io/address/0x36a4E205938552f3e58b14FC513D1a6355060f40`; // 根据网络选择正确的区块链浏览器
  },
  },
  methods: {
    closeSuccessPopup() {
    this.showSuccessPopup = false; // 关闭成功弹出框
    },
    setupIntersectionObserver() {
      const items = document.querySelectorAll('.explanation-item');
      const thresholds = [0.25, 0.5, 0.75, 0.95];
      const delay = 100;

      // 在设置观察者之前重置可见性为 hidden
      items.forEach(item => item.classList.remove('visible'));

      // 创建一个新的 Intersection Observer
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const ratio = entry.intersectionRatio;

              // 根据当前的曝光率显示多少项
              for (let i = 0; i < thresholds.length; i++) {
                if (ratio >= thresholds[i]) {
                  this.showItemsWithDelay(items, i + 1);
                }
              }
            }
          });
        },
        {
          threshold: thresholds,
        }
      );

      // 观察要显示的元素
      observer.observe(document.querySelector('.explanation'));
    },
    showItemsWithDelay(items, count) {
      for (let i = 0; i < items.length; i++) {
        if (i < count) {
          setTimeout(() => {
            items[i].classList.add('visible');
          }, i * 100);
        } else {
          items[i].classList.remove('visible');
        }
      }
    },
    async handleMintNFT() {
      // 检查钱包连接状态
      if (!this.walletConnected) {
        alert('请先连接钱包！');
        await this.connectWallet();
        if (!this.walletConnected) return;
      }

      // 检查网络是否为 Polygon 网络
      const desiredChainId = '0x89'; // Polygon 主网的 Chain ID
      const currentChainId = await window.ethereum.request({ method: 'eth_chainId' });

      if (currentChainId !== desiredChainId) {
        try {

          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: desiredChainId }],
          });
          alert('成功切换到 Polygon 网络！');
        } catch (switchError) {
          if (switchError.code === 4902) {
            alert('您的钱包中没有 Polygon 网络，请手动添加。');
          } else {
            alert('切换网络失败，请检查您的钱包设置。');
            return;
          }
        }
      }

      // 当钱包已连接且在 Polygon 网络时，显示 mint 弹出框
      if (this.walletConnected && currentChainId === desiredChainId) {
        this.showMintForm = true;
      }
    },
    async connectWallet() {
      const success = await this.$store.dispatch('connectWallet');
      if (!success) {
        alert('连接钱包失败，请重试。');
      }
    },
    
    async mintNFT() {
  if (!this.nftName || !this.recipientAddress) {
    alert('请填写 NFT 名称和目标地址！');
    return;
  }

  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(this.contractAddress, this.contractABI, signer);

    // 发送 mint 交易
    let tx;
    try {
      tx = await contract.mintTo(this.recipientAddress, this.nftName);
      alert('铸造 NFT 交易已发送，等待确认...');
    } catch (error) {
      console.error('Mint 交易发送失败:', error);
      alert('铸造交易发送失败，请重试。');
      return;
    }

    // 等待交易完成并获取 receipt
    let receipt;
    try {
      receipt = await tx.wait();
      this.transactionHash =  this.transactionHash = tx.hash;
      alert(receipt.transactionHash)
    } catch (error) {
      console.error('等待交易确认失败:', error);
      alert('交易确认失败，请稍后检查网络状态。');
      return;
    }

    // 获取新的 tokenId
    let newTokenId;
    try {
      newTokenId = await contract.getCurrentTokenId();
      this.tokenId = newTokenId.toString();
    } catch (error) {
      console.error('获取新 Token ID 失败:', error);
      alert('获取 Token ID 失败，请重试。');
      return;
    }

    // 显示成功弹出框
    this.showSuccessPopup = true;

  } catch (error) {
    console.error('Minting NFT 失败:', error);
    alert('铸造 NFT 失败，请检查合约或网络状态。');
  } finally {
    this.closeMintForm(); // 关闭铸造弹出框
  }
},

    closeMintForm() {
      this.showMintForm = false; // 关闭弹出框
    },
  },
};
</script>