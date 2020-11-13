<template>
  <div>
    <v-row>
      <v-col cols="9">
        <v-container>
          <v-row>
            <v-col>
              <v-card outlined light>
                <v-card-title>Add</v-card-title>
                <v-card-text>
                  <v-select
                    outlined
                    v-model="typeofVehical"
                    :items="typeofVehicals"
                    label="Vehicle"
                    data-vv-name="typeofVehicals"
                    ref="vehicle_select"
                    required
                  ></v-select>
                  <v-select
                    outlined
                    v-model="InsuranceType"
                    :items="InsuranceTypes"
                    label="Type"
                    data-vv-name="InsuranceTypes"
                    ref="type_l_i_select"
                    required
                  ></v-select>
                  <v-select
                    outlined
                    v-model="vehicalOptions"
                    :items="vehicles"
                    item-value="value"
                    label="Vehicle"
                    data-vv-name="vehicle"
                    ref="vehicle_select"
                    required
                  ></v-select>
                  <v-text-field
                    outlined
                    v-model="amount"
                    label="Price"
                    ref="price_input"
                  ></v-text-field>
                  <v-text-field
                    outlined
                    v-model="durationInMonths"
                    label="Monthly Duration"
                    ref="monthly_duration_input"
                  ></v-text-field>
                </v-card-text>
                <v-card-actions class="text-right">
                  <v-btn :loading="loading" color="primary" @click="addVehicalDetails">
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
      <v-col cols="3">
        <v-container>
          <v-row>
            <v-col>
              <v-card light>
                <v-card-title>
                  Vehicle
                  <v-spacer></v-spacer>
                  <v-btn color="primary" @click="dialog = !dialog">Add</v-btn>
                </v-card-title>
                <v-card-text>
                  <v-list class="p-3">
                    <v-list-item v-for="(item, i) in vehicles" :key="i">
                      <v-list-item-content>
                        <v-chip
                          v-if="chip4"
                          color="orange"
                          label
                          outlined
                          small
                          @click:close="chip4 = false"
                          class="p-5"
                        >
                          <v-text-field :value="item.text"> </v-text-field>
                          <!-- {{ item }} -->
                          <v-spacer></v-spacer>
                          <v-icon right>mdi-delete</v-icon>
                        </v-chip>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
          <v-dialog v-model="dialog" max-width="500px">
            <v-card>
              <v-card-text class="mt-3">
                <v-text-field
                  v-model="vehicalName"
                  label="Vehicle name"
                  ref="vehicle_name_input"
                ></v-text-field>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  :loading="loading"
                  text
                  color="primary"
                  @click.stop="addVehicalname"
                >
                  Submit
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-container>
      </v-col>
    </v-row>
    <v-row class="p-5">
      <v-col class="p-5">
        <v-card light>
          <v-card-title>
            List
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
            :loading="loader"
            :headers="headers"
            :items="details"
            :search="search"
            hide-default-footer
          >
          <template
        v-slot:footer
      >
        <v-btn :disabled="!hasPrev" @click="goPrev"> 
          <v-icon>mdi-menu-left</v-icon>
        </v-btn>
         <v-btn :disabled="!hasNext" @click="goNext">
          <v-icon>mdi-menu-right</v-icon>
        </v-btn>
      </template>
          </v-data-table>
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
      token: null,
      loader: false,
      chip4: true,
      loading: false,
      vehicalName: "",
      vehicalOptions: "",
      typeofVehical: "",
      dialog: false,
      vehicles: [
        { text: "Item1", value: 1 },
        { text: "Item2", value: 2 },
      ],
      typeofVehicals: ["License", "Insurance"],
      InsuranceType: "",
      InsuranceTypes: ["Commerical", "Private"],
      amount: "",
      durationInMonths: "",
      search: "",
      headers: [
        {
          text: "Type",
          align: "start",
          sortable: false,
          value: "typeofVehical",
        },
        { text: "Insurance Type", value: "InsuranceType" },
        { text: "Amount", value: "amount" },
        { text: "Duration", value: "durationInMonths" },
        { text: "Status", value: "status" },
      ],
      details: [],
      page:1,
      hasNext:false,
      hasPrev:false
    };
  },
  mounted() {
    this.token = {
      headers: {
        Authorization: "Token " + this.$store.state.authUser.token,
      },
    };
    this.getdetails();
  },
  methods: {
    goPrev(){
      if(this.page > 1)
        this.page --;
      else return;
      this.getdetails();
    },
    goNext(){
      if(this.hasNext){
        this.page ++;
      }else return;
      this.getdetails();

    },
    async getdetails() {
      this.loader = true;
      try {
        const res = await this.$axios.get(
          "/admin/details/carlicenserate/?page="+this.page,
          this.token
        );
        if (res) {
          if(res.data.page.next){
            this.hasNext = true;
          }else this.hasNext = false;
          if(res.data.page.prev){
            this.hasPrev = true;
          }else this.hasPrev = false;
          this.details = res.data.data;
        }
        this.loader = false;
      } catch (error) {}
      this.loader = false;
    },
    savevehicle(text, value) {
      if (this.vehicalName) {
        this.vehicles.push({
          text: text,
          value: value,
        });
      }
    },
    async addVehicalname() {
      this.loading = true;
      var data = {
        vehicalName: this.vehicalName,
      };
      try {
        const res = await this.$axios.post(
          "/admin/details/vehical/",
          data,
          this.token
        );
        this.savevehicle(res.data.vehicalName, res.data.vehicalId);
        this.dialog = false;
        this.loading = false;
      } catch (error) {

      }
      this.loading = false;
    },
    async addVehicalDetails() {
      this.loading=true
      var data = {
        typeofVehical: this.typeofVehical,
        InsuranceType: this.InsuranceType,
        amount: parseInt(this.amount),
        durationInMonths: parseInt(this.durationInMonths),
        vehicalOptions: parseInt(this.vehicalOptions),
      };
      try {
        const res = await this.$axios.post(
          "/admin/details/carlicenserate/",
          data,
          this.token
        );
      } catch (err) {}
      this.loading=false
    },
  },
};
</script>