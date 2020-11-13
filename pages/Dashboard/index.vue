<template>
  <v-row>
    <v-container class="m-2 p-2">
      <v-row class="">
        <v-col>
          <v-card light class="mx-auto" max-width="200" outlined :loading="loader">
            <v-card-text>Master Wallet Amount</v-card-text>
            <v-card-title class="pt-0">{{balance["masterWalletTransactionAmount"]}}</v-card-title>
          </v-card>
        </v-col>
        <v-col>
          <v-card light class="mx-auto" max-width="200" outlined :loading="loader">
            <v-card-text>Master Wallet Balance</v-card-text>
            <v-card-title class="pt-0">{{balance["balanceAmount"]}}</v-card-title>
          </v-card>
        </v-col>
        <v-col>
          <v-card
            light
            class="mx-auto"
            max-width="200"
            outlined
            :loading="loader"
          >
            <v-card-text>Agent Wallet Amount</v-card-text>
            <v-card-title class="pt-0">{{
              balance["agentTotalAmount"]
            }}</v-card-title>
          </v-card>
        </v-col>
      </v-row>
      <v-row class="">
        <v-col
          ><v-card light class="mx-auto" max-width="200" outlined :loading="loader">
            <v-card-text>User Wallet Amount</v-card-text>
            <v-card-title class="pt-0">{{balance["customerTotalAmount"]}}</v-card-title>
          </v-card></v-col
        >
        <v-col
          ><v-card light class="mx-auto" max-width="200" outlined>
            <v-card-text></v-card-text>
            <v-card-title class="pt-0"> </v-card-title> </v-card
        ></v-col>
        <v-col
          ><v-card light class="mx-auto" max-width="200" outlined>
            <v-card-text></v-card-text>
            <v-card-title class="pt-0"></v-card-title> </v-card
        ></v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row>
        <v-col cols="4">
          <v-card light class="mx-auto" max-width="344" outlined>
            <v-card-title>Monthly Revenue</v-card-title>
            <v-container>
              <v-row>
                <v-col> </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
        <v-col cols="4">
          <v-card class="mx-auto" max-width="344" outlined>
            <v-card-title>Monthly Revenue</v-card-title>
            <v-container>
              <v-row>
                <v-col> </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
        <v-col cols="4">
          <v-card class="mx-auto" max-width="344" outlined>
            <v-card-title>Monthly Revenue</v-card-title>
            <v-container>
              <v-row>
                <v-col> </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4">
          <v-card class="mx-auto" max-width="344" outlined>
            <v-card-title>Monthly Revenue</v-card-title>
            <v-container>
              <v-row>
                <v-col> </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
        <v-col cols="4">
          <v-card class="mx-auto" max-width="344" outlined>
            <v-card-title>Monthly Revenue</v-card-title>
            <v-container>
              <v-row>
                <v-col> </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
        <v-col cols="4">
          <v-card class="mx-auto" max-width="344" outlined>
            <v-card-title>Monthly Revenue</v-card-title>
            <v-container>
              <v-row>
                <v-col> </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row>
        <v-col cols="6">
          <v-card light>
            <v-card-title>
              User Transction
              <v-spacer></v-spacer>
            </v-card-title>
            <v-data-table
              :loading="loader"
              loading-text="Loading... Please wait"
              :headers="headerUser"
              :items="UserTrasctions"
              :items-per-page="5"
              class="elevation-1"
            ></v-data-table>
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-card light>
            <v-card-title>
              Agent Transction
              <v-spacer></v-spacer>
            </v-card-title>
            <v-data-table
              :loading="loader"
              loading-text="Loading... Please wait"
              :headers="headerAgent"
              :items="agentTrasctions"
              :items-per-page="5"
              class="elevation-1"
            ></v-data-table>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-row>
</template>
<script>
export default {
  layout: "admin",

  data() {
    return {
      loader: false,
      headerAgent: [
        { text: "Sender", value: "sender" },
        { text: "Receiver", value: "receiver" },
        {
          text: "Amount",
          align: "start",
          sortable: false,
          value: "amount",
        },
        { text: "Status", value: "status" },
      ],
      headerUser: [
        { text: "Sender", value: "sender" },
        { text: "Receiver", value: "receiver" },
        {
          text: "Amount",
          align: "start",
          sortable: false,
          value: "amount",
        },
        { text: "Status", value: "status" },
      ],
      agentTrasctions: [],
      UserTrasctions: [],
      balance: "",
    };
  },
  mounted() {
    this.agentTransction();
    this.userTransction();
    this.allbalance();
  },
  methods: {
    async agentTransction() {
      this.loader = true;
      try {
        const res = await this.$axios.get(
          "/admin/dashboard/agent/recent10/transaction/",
          {
            headers: {
              Authorization: "Token " + this.$store.state.authUser.token,
            },
          }
        );
        if (res) {
          this.agentTrasctions = res.data;
        }
      } catch (error) {
        this.loader = false;
      }
      this.loader = false;
    },
    async userTransction() {
      this.loader = true;
      try {
        const res = await this.$axios.get(
          "/admin/dashboard/user/recent10/transaction/",
          {
            headers: {
              Authorization: "Token " + this.$store.state.authUser.token,
            },
          }
        );
        if (res) {
          this.UserTrasctions = res.data;
        }
      } catch (error) {
        this.loader = false;
      }
      this.loader = false;
    },
    async allbalance() {
      this.loader = true;
      try {
        const res = await this.$axios.get(
          "/admin/dashboard/balanceamount/agentbalance/userbalance/",
          {
            headers: {
              Authorization: "Token " + this.$store.state.authUser.token,
            },
          }
        );
        if (res) {
          this.balance = res.data;
        }
        this.loader = false;
      } catch (error) {
        this.loader = false;
      }
      this.loader = false;
    },
  },
};
</script>