<template>
  <v-dialog max-width="600px" :value="open" @input="close">
    <v-main
      class="d-flex pa-0 flex-column justify-sm-center"
      style="background: white"
    >
      <div class="pa-4" style="border-bottom: 1px solid #888">
        <h3>{{ clientId ? "Edit client" : "New Client" }}</h3>
      </div>
      <div class="pa-4">
        <div class="d-flex justify-sm-center align-center pr-10">
          <div class="pa-2 label-container">
            <p>Name:</p>
          </div>
          <div style="width: 100%">
            <v-text-field v-model="name" solo dense />
          </div>
        </div>
        <div class="d-flex justify-sm-center align-center pr-10">
          <div class="pa-2 label-container">
            <p>Email:</p>
          </div>
          <div class="d-flex" style="width: 100%">
            <v-text-field v-model="email" solo dense />
          </div>
        </div>
        <div class="d-flex justify-sm-center align-center pr-10">
          <div class="pa-2 label-container">
            <p>Phone:</p>
          </div>
          <div class="d-flex" style="width: 100%">
            <v-text-field v-model="phone" solo dense />
          </div>
        </div>
        <div class="d-flex justify-sm-center align-center pr-10">
          <div class="pa-2 label-container">
            <p>Providers:</p>
          </div>
          <div class="d-flex" style="width: 100%">
            <v-text-field v-model="provderName" solo dense />
            <v-btn v-if="!selectedProvider" class="ml-4" @click="addProvider"
              >Add provider</v-btn
            >
            <div class="d-flex" v-else>
              <v-btn class="ml-4" @click="updatePro">Update</v-btn>
              <v-btn class="ml-4" @click="cancel">cancel</v-btn>
            </div>
          </div>
        </div>
        <div class="d-flex justify-sm-center align-center pr-10">
          <div class="pa-2 label-container"></div>
          <div
            class="mr-10"
            style="width: 100%; border: 1px solid #888; border-radius: 8px"
          >
            <v-list>
              <div style="max-height: 200px; overflow: auto">
                <v-list-item
                  v-for="(item, index) in providerProps"
                  :key="index"
                >
                  <v-list-item-action>
                    <v-checkbox v-model="providers" :value="item._id" />
                  </v-list-item-action>
                  <v-list-item-content>
                    {{ item.name }}
                  </v-list-item-content>
                  <v-list-item-action>
                    <div class="d-flex">
                      <v-icon light color="blue" @click="editProvider(item)"
                        >mdi-square-edit-outline
                      </v-icon>
                      <v-icon color="blue" @click="deleteProvider(item)"
                        >mdi-delete
                      </v-icon>
                    </div>
                  </v-list-item-action>
                </v-list-item>
              </div>
            </v-list>
          </div>
        </div>
      </div>
      <div
        class="d-flex justify-sm-end align-center pa-5"
        style="border-top: 1px solid #888"
      >
        <v-btn class="mx-3" @click="close">Cancel</v-btn>
        <v-btn @click="save">{{
          clientId ? "Update client" : "Add Client"
        }}</v-btn>
      </div>
    </v-main>
    <div></div>
  </v-dialog>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "Client",
  props: {
    open: {
      type: Boolean,
      required: true,
    },
    clientId: {
      type: String,
      required: false,
      default: "",
    },
  },
  data() {
    return {
      name: "",
      email: "",
      phone: "",
      provderName: "",
      providers: [],
      selectedProvider: null,
    };
  },
  created() {
    if (this.clientId) {
      const client = this.clients.find((v) => v._id === this.clientId);
      this.name = client.name;
      this.email = client.email;
      this.phone = client.phone;
      this.providers = client.providers || [];
    }
  },
  computed: {
    ...mapState({
      clients: (state) => state.clients,
      providerProps: (state) => state.providers,
    }),
  },
  methods: {
    ...mapActions({
      createProvider: "createProvider",
      createClient: "createClient",
      updateClient: "updateClient",
      deleteProvider: "deleteProvider",
      updateProvider: "updateProvider",
    }),
    async addProvider() {
      if (this.provderName) {
        await this.createProvider({ name: this.provderName });
        this.provderName = "";
      }
    },
    editProvider(item) {
      this.selectedProvider = item;
      this.provderName = item.name;
    },
    async updatePro() {
      console.log("update", this.selectedProvider);
      if (this.selectedProvider) {
        const provider = {
          ...this.selectedProvider,
          name: this.provderName,
        };
        await this.updateProvider(provider);
      }
    },
    cancel() {
      this.selectedProvider = null;
      this.provderName = "";
    },
    async save() {
      if (this.clientId) {
        const client = {
          _id: this.clientId,
          name: this.name,
          email: this.email,
          phone: this.phone,
          providers: this.providers,
        };
        await this.updateClient(client);
      } else {
        const client = {
          name: this.name,
          email: this.email,
          phone: this.phone,
          providers: this.providers,
        };
        await this.createClient(client);
      }
      this.close();
    },
    close() {
      this.$emit("close");
    },
  },
};
</script>
<style scoped>
table {
  border-collapse: collapse;
}
.label-container {
  width: 200px;
  text-align: right;
}
</style>