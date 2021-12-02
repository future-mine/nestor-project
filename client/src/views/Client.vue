<template>
  <v-main class="pa-6">
    <div class="d-flex justify-sm-space-between pa-8">
      <h2>Clients</h2>
      <v-btn @click="createClient">New Client</v-btn>
    </div>
    <div>
      <table width="100%">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Providers</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(client, index) in displayClients" :key="index">
            <td>{{ client.name }}</td>
            <td>{{ client.email }}</td>
            <td>{{ client.phone }}</td>
            <td>{{ client.providers }}</td>
            <td>
              <v-icon light color="blue" @click="editClient(client._id)"
                >mdi-square-edit-outline
              </v-icon>
              <v-icon color="blue" @click="deleteClient(client)"
                >mdi-delete
              </v-icon>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <ClientPopup
      v-if="open"
      :open="open"
      :client-id="selectedClientId"
      @close="closeDialog"
    />
  </v-main>
</template>

<script>
import ClientPopup from "../components/client-popup.vue";
import { mapState, mapActions } from "vuex";
export default {
  name: "Client",
  components: {
    ClientPopup,
  },
  data() {
    return {
      open: false,
      selectedClientId: null,
    };
  },
  computed: {
    ...mapState({
      clients: (state) => state.clients,
      providerProps: (state) => state.providers,
    }),
    displayClients() {
      return this.clients.map((client) => {
        const providers = this.providerProps.filter((v) =>
          client.providers.includes(v._id)
        );
        const providersStr = providers.map((v) => v.name).join(", ");
        return { ...client, providers: providersStr };
      });
    },
  },
  created() {
    this.initClients();
    this.initProviders();
  },
  methods: {
    ...mapActions({
      initClients: "initClients",
      initProviders: "initProviders",
      deleteClient: "deleteClient",
    }),
    createClient() {
      this.selectedClientId = null;
      this.openDialog();
    },
    editClient(id) {
      this.selectedClientId = id;
      this.openDialog();
    },
    openDialog() {
      this.open = true;
    },
    closeDialog() {
      this.open = false;
    },
  },
};
</script>
<style scoped>
table {
  border-collapse: collapse;
}
table th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}
</style>