import Vue from "vue";
import Vuex from "vuex";
import { deleteReq, getReq, postReq, putReq } from "../utils/api-client";
import { apiHost } from "../utils/config";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    clients: [],
    providers: [],
  },
  mutations: {
    setClients(state, payload) {
      state.clients = payload;
    },
    setProviders(state, payload) {
      state.providers = payload;
    },
    addProvider(state, payload) {
      state.providers = [...state.providers, payload];
    },
    updateProvider(state, payload) {
      state.providers = state.providers.map((v) => {
        if (v._id === payload._id) {
          return payload;
        } else {
          return v;
        }
      });
    },
    deleteProvider(state, payload) {
      state.providers = state.providers.filter((v) => v._id !== payload._id);
    },
    addClient(state, payload) {
      state.clients = [...state.clients, payload];
    },
    updateClient(state, payload) {
      state.clients = state.clients.map((v) => {
        if (v._id === payload._id) {
          return payload;
        } else {
          return v;
        }
      });
    },
    deleteClient(state, payload) {
      state.clients = state.clients.filter((v) => v._id !== payload._id);
    },
  },
  actions: {
    setClients(context, data) {
      context.commit("setClients", data);
    },
    setProviders(context, data) {
      context.commit("setProviders", data);
    },
    async initClients(context) {
      const url = `${apiHost}/client`;
      const clients = await getReq(url);
      context.commit("setClients", clients);
    },
    async initProviders(context) {
      const url = `${apiHost}/provider`;
      const providers = await getReq(url);
      context.commit("setProviders", providers);
    },
    async createProvider(context, data) {
      const url = `${apiHost}/provider`;
      const provider = await postReq(url, data);
      context.commit("addProvider", provider);
    },
    async updateProvider(context, data) {
      const url = `${apiHost}/provider/${data._id}`;
      const client = await putReq(url, data);
      context.commit("updateProvider", client);
    },
    async deleteProvider(context, data) {
      const url = `${apiHost}/provider/${data._id}`;
      const client = await deleteReq(url);
      context.commit("deleteProvider", client);
    },
    async createClient(context, data) {
      const url = `${apiHost}/client`;
      const client = await postReq(url, data);
      context.commit("addClient", client);
    },
    async updateClient(context, data) {
      const url = `${apiHost}/client/${data._id}`;
      const client = await putReq(url, data);
      context.commit("updateClient", client);
    },
    async deleteClient(context, data) {
      const url = `${apiHost}/client/${data._id}`;
      const client = await deleteReq(url);
      context.commit("deleteClient", client);
    },
  },
});
