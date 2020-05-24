/* jshint esversion: 6 */
/*
 * @Description: 
 * @version: 
 * @Author: 李继玄（lijixuan@quclouds.com）
 * @Date: 2020-05-15 17:13:08
 * @LastEditors: 李继玄（lijixuan@quclouds.com）
 * @LastEditTime: 2020-05-15 17:56:59
 * @FilePath: \新建文件夹\src\store\modules\nodemanage.js
 */
import {
    saveStorage
} from '@/utils/cache.js'
const state = {
    currentClickNodeId: '',
    currentClickEdgeId: '',
};

const getters = {};

const mutations = {
    SET_CURRENT_CLICK_NODE_ID(state, data) {
        state.currentClickNodeId = data;
    },
    SET_CURRENT_CLICK_EDGE_ID(state, data) {
        state.currentClickEdgeId = data;
    },
};

const actions = {
    setCurrentClickNodeId: ({
        commit
    }, data) => {
        commit('SET_CURRENT_CLICK_NODE_ID', data);
        saveStorage('currentClickNodeId', data)
    },
    setCurrentClickEdgeId: ({
        commit
    }, data) => {
        commit('SET_CURRENT_CLICK_EDGE_ID', data);
        saveStorage('currentClickEdgeId', data)
    },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};
