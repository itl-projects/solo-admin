<template>
  <v-row>
    <v-container>
      <v-row>
        <v-col cols="4">
          <v-card light class="mx-auto" max-width="200" outlined>
            <v-card-text>Master Wallet Amount</v-card-text>
            <v-card-title class="pt-0">SLL 1,00,000</v-card-title>
          </v-card>
        </v-col>
        <v-col cols="4">
          <v-card class="mx-auto" max-width="200" outlined>
            <v-card-text>Master Wallet Amount</v-card-text>
            <v-card-title class="pt-0">SLL 1,00,000</v-card-title>
          </v-card>
        </v-col>
        <v-col cols="4">
          <v-card class="mx-auto" max-width="200" outlined>
            <v-card-text>Master Wallet Amount</v-card-text>
            <v-card-title class="pt-0">SLL 1,00,000</v-card-title>
          </v-card>
        </v-col>
      </v-row>
      <v-spacer></v-spacer>
      <v-row>
        <v-col>
          <v-data-table
            light
            :headers="headers"
            :search="search"
            :items="TotalAgent"
            sort-by="calories"
            class="elevation-1"
          >
            <template v-slot:top>
              <v-toolbar flat>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Search"
                  single-line
                  hide-details
                ></v-text-field>
              </v-toolbar>
            </template>
            <template>
              <v-icon small class="mr-2" @click="editItem(item)">
                mdi-pencil
              </v-icon>
              <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-container>
  </v-row>
</template>
<script>
export default {
  layout: "admin",
  data: () => ({
    title: "Agent List",
    dialog: false,
    search: "",
    dialogDelete: false,
    headers: [
      {
        text: "Name",
        align: "start",
        sortable: false,
        value: "fullName",
      },
      {
        text: "Email",
        value: "email",
      },
      {
        text: "Phone Number",
        value: "phone",
      },
      {
        text: "QR Code",
        value: "QRCode",
      },
      {
        text: "Pin Status",
        value: "pinStatus",
      },
    ],
    TotalAgent: [],
  }),

  mounted() {
    this.getAgent();
  },

  methods: {
    async getAgent() {
      try {
        const res = await this.$axios.get("/admin/allagent/detailslist/", {
          headers: {
            Authorization: "Token " + this.$store.state.authUser.token,
          },
        });
        this.TotalAgent = [];
        console.log(res);
        res.data.forEach((element) => {
          let temp = element.userId;
          temp["fullName"] = element.fullName;
          this.TotalAgent.push(temp);
        });
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>