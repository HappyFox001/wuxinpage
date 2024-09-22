// src/store/index.js
import { createStore } from 'vuex';

export default createStore({
    state: {
        walletConnected: false, // 用于跟踪钱包是否已连接
        connectedAccount: null, // 存储已连接的钱包地址
        contractAddress: '0x36a4E205938552f3e58b14FC513D1a6355060f40', // 替换为实际的智能合约地址
        contractABI: [
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "recipient",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "nftName",
                        "type": "string"
                    }
                ],
                "name": "mintTo",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "function"
            }, {
                "inputs": [],
                "name": "getCurrentTokenId",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            }
        ],
        currentLanguage: localStorage.getItem('language') || 'en' // 默认语言
    },
    mutations: {
        setWalletConnected(state, payload) {
            state.walletConnected = payload;
        },
        setConnectedAccount(state, payload) {
            state.connectedAccount = payload;
        },
        SET_LANGUAGE(state, lang) {
            state.currentLanguage = lang;
            localStorage.setItem('language', lang);
        },
    },
    actions: {
        setLanguage({ commit }, lang) {
            commit('SET_LANGUAGE', lang);
        },
        async connectWallet({ commit }) {
            if (typeof window.ethereum !== 'undefined') {
                try {
                    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                    commit('setConnectedAccount', accounts[0]);
                    commit('setWalletConnected', true);
                    return true;
                } catch (error) {
                    console.error('用户拒绝了账户访问', error);
                    return false;
                }
            } else {
                alert('未检测到 MetaMask。请安装 MetaMask 以使用此功能。');
                return false;
            }
        },
        disconnectWallet({ commit }) {
            commit('setConnectedAccount', null);
            commit('setWalletConnected', false);
        },
    },
    getters: {
        currentLanguage: (state) => state.currentLanguage,
    },
});