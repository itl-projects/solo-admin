<template>
  <div>
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
    <v-row>
      <v-col>
        <v-card light :loading="loader" loading-text="Loading... Please wait">
          <v-card-title>
            {{title}}
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="alluser"
            :search="search"
          ></v-data-table>
        </v-card>
      </v-col>
      
    </v-row>
  </div>
</template>
<script>
export default {
  layout: "admin",
  data() {
    return {
      title:'User List',
      loader:false,
      search: "",
      headers: [
        {
          text: "Name",
          align: "start",
          sortable: false,
          value: "fullName",
        },
        { text: "Email", value: "email" },
        { text: "Phone", value: "phone" },
        { text: "QR Code", value: "QRCode" },
        { text: "Pin Status", value: "pinStatus" },
      ],
      alluser: [],
    };
  },
  mounted() {
    this.getUser();
  },
  methods: {
    async getUser() {
      this.loader=true
      try {
        const res = await this.$axios.get("/admin/alluser/detailslist/", {
          headers: {
            Authorization: "Token " + this.$store.state.authUser.token,
          },
        });
        if(res){
        this.alluser = res.data;
        this.alluser = [];
        res.data.forEach((element) => {
          let temp = element.userId;
          temp["fullName"] = element.fullName;
          this.alluser.push(temp);
        });
        this.loader=false
        }
      } catch (error) {
        console.log(error);
      }
      this.loader=false
    },
  },
};
</script>