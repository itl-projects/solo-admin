<template>
  <v-row>
    <v-container>
      <v-row>
        <v-col>
          <v-data-table
            light
            :headers="headers"
            :search="search"
            :items="advdetails"
            sort-by="calories"
            class="elevation-1"
          >
            <!-- <template
              v-slot:item.avtar_url="{ item }"
            >
            <v-img :src="item.avtar"></v-img>
            </template> -->
            <template v-slot:top>
              <v-toolbar flat>
                <v-dialog v-model="dialog" max-width="500px">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="primary"
                      dark
                      class="mb-2"
                      v-bind="attrs"
                      v-on="on"
                    >
                      Add Adv
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="headline">Add Adv</span>
                    </v-card-title>

                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12">
                            <v-text-field
                              v-model="description"
                              label="Image Alt"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12">
                            <v-file-input
                              v-model="avtar"
                              accept="image/*"
                              label="File input"
                            ></v-file-input>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="close">
                        Cancel
                      </v-btn>
                      <v-btn color="blue darken-1" :loading="loading" text @click="addAdv">
                        Save
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Search"
                  single-line
                  hide-details
                ></v-text-field>
                <v-dialog v-model="dialogDelete" max-width="500px">
                  <v-card>
                    <v-card-title class="headline"
                      >Are you sure you want to delete this item?</v-card-title
                    >
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="closeDelete"
                        >Cancel</v-btn
                      >
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="deleteItemConfirm"
                        >OK</v-btn
                      >
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
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
    description	: "",
    dialog: false,
    search: "",
    avtar:"",
    loading:false,
    token:"",
    dialogDelete: false,
    headers: [
      {
        text: "Description",
        align: "start",
        sortable: false,
        value: "description",
      },
      { text: "Image", value: "avtar" },
      { text: "Status", value: "status" },
    ],
    advdetails: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
    defaultItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },
  methods: {
    removeAllFiles() {
      this.$refs.dropzone.removeAllFiles();
    },
    afterComplete(file) {
      console.log(file);
    },
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  mounted() {
    this.token = {
          headers: {
            Authorization: "Token " + this.$store.state.authUser.token,
            'Content-Type': 'multipart/form-data',
          },
        },

    this.getDetails();
  },

  methods: {
    async getDetails() {
      try {
        const res = await this.$axios.get("/admin/advertismentpic/",this.token);
        if (res) {
          this.advdetails = res.data;
        }
      } catch (error) {}
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
    },
    async addAdv(){
      console.log(this.avtar)
      let formData = new FormData()
      formData.append("avtar",this.avtar)
      formData.append("description",this.description)
      this.loading=true
      try {
        const res = await this.$axios.post("/admin/advertismentpic/",formData,this.token)
        console.log(res);
      } catch (error) {
        
      }
      this.loading=false
      this.dialog=false
    }
  },
};
</script>