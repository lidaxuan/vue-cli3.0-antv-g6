import { saveStorage } from '@/utils/cache.js'
const state = {
  nodes: '',
};

const getters = {
};

const mutations = {
  // 例子
  setNodes(state, data) {
    state.nodes = data;
  },
};

const actions = {
  setNodes: ({ commit }, nodes) => {
    commit('setNodes', nodes);
    saveStorage('nodes', nodes)
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
