<template>
  <div>
    <v-row>
      <v-col>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-card light>
                <v-card-title>
                  Add New Feature
                  <v-spacer></v-spacer>
                  <v-btn color="cyan accent-2" @click="dialog = !dialog">
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                  <v-data-table
                    :headers="headers"
                    :items="masterFeature"
                    :items-per-page="5"
                    class="elevation-1"
                  >
                    <!-- <template v-slot:item.actions="{ item}">
                    <v-icon small class="mr-2" @click="editItem(item)">
                      mdi-pencil
                    </v-icon>
                    <v-icon small @click="deleteItem(item)">
                      mdi-delete
                    </v-icon>
                    
                  </template>
                  <template v-slot:item.subfeature="{ item}">
                    <v-icon small class="mr-2" @click="addsubfeatures(item)">
                      mdi-plus
                    </v-icon>      
                  </template> -->
                  </v-data-table>
                
                </v-card-text>
                <v-dialog v-model="dialog" max-width="500px">
                  <v-card>
                    <v-card-text>
                      <v-text-field
                        v-model="featurename"
                        label="Feature name"
                        ref="feature_name_input"
                      ></v-text-field>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn :loading="loading" text color="primary" @click.stop="addfeature">
                        Submit
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-row>
                <v-col
                  cols="4"
                  v-for="(item, i) in Object.keys(featuredata)"
                  :key="i"
                >
                  <v-card max-width="344" outlined light>
                    <v-row>
                      <v-col>
                        <v-card-title>{{ item }}</v-card-title>
                      </v-col>
                      <v-col>
                        <v-card-actions>
                          <v-btn :value="i">Add</v-btn>
                        </v-card-actions>
                      </v-col>
                    </v-row>
                    <v-divider></v-divider>
                    <v-row v-for="(items, i) in featuredata[item]" :key="i">
                      <v-col cols="9">
                        <v-card-text> {{ items }}</v-card-text>
                      </v-col>
                      <v-col cols="3">
                        <v-btn icon="mdi-plus-box"></v-btn>
                      </v-col>
                    </v-row>
                  </v-card>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  layout: "admin",
  data() {
    return {
      dialog: false,
      dialog2: false,
      loading:false,
      id: "",
      token: "",
      featurename: "",
      subfeaturename: "",
      features: [{ text: "Hello", values: ["1", "2"] }],
      featuredata: {},
      headers: [
        { text: "Id", value: "mfId", sortable: false },
        { text: "Feature Name", value: "featureName" },
        { text: "Sub-Feature", value: "subfeature", sortable: false },
        { text: "Actions", value: "actions", sortable: false },
      ],
      masterFeature: [],
    };
  },
  mounted() {
    this.token = {
      headers: {
        Authorization: "Token " + this.$store.state.authUser.token,
      },
    };
    this.getfeature();
    this.getmasterfeatures();
  },
  methods: {
    async getfeature() {
      try {
        const res = await this.$axios.get("/admin/featureandsubfeature/", {
          headers: {
            Authorization: this.$store.state.authUser.token,
          },
        });
        this.featuredata = res.data;
      } catch (e) {}
    },
    saveName() {
      if (this.featurename) {
        console.log(this.features);
        this.features.push({
          text: this.featurename,
          values: [],
        });
        console.log(this.features);
        this.dialog = false;
        this.featurename = "";
      } else {
        this.$refs.feature_name_input.focus();
      }
    },
    subfeatures() {
      if (this.subfeaturename) {
        this.features[this.id].values.push(this.subfeaturename);
        this.dialog2 = false;
        this.subfeaturename = "";
        this.id = null;
      } else {
        this.$refs.Subfeatures_name_input.focus();
      }
    },
    subFea(index) {
      this.id = index;
      this.dialog2 = true;
    },
    async addfeature() {
      this.loading=true
      var data = {
        featureName: this.featurename,
      };
      try {
        const res = await this.$axios.post(
          "/admin/details/masterFeature/",data,
          this.token,
          
        );
      } catch (error) {
        console.log(error);
      }
      this.loading=false
      this.dialog=false
    },
    async addsubfeatures() {
      var data = {};
      try {
        const res = await this.$axios.post("", this.token, data);
      } catch (error) {}
    },
    async getmasterfeatures() {
      try {
        const res = await this.$axios.get(
          "/admin/details/masterFeature/",
          this.token
        );
        this.masterFeature = res.data;
      } catch (error) {}
    },
    editItem(item){
      console.log(item.mfId);
    },
    deleteItem(item){
      console.log(item.mfId);
    }

  },
};
</script>