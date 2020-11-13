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
                  <v-text-field
                    outlined
                    v-model="title"
                    label="Title"
                  ></v-text-field>

                  <v-text-field
                    outlined
                    v-model="shortDescription"
                    label="Shot description"
                  ></v-text-field>

                  <v-textarea
                    outlined
                    v-model="description"
                    label="Description"
                  ></v-textarea>
                  <v-select
                    outlined
                    v-model="smartUpdateCategoryId"
                    :items="categories"
                    item-value="value"
                    label="Category"
                    data-vv-name="category"
                    ref="category_select"
                    required
                  ></v-select>
                  <v-file-input
                    v-model="Image"
                    accept="image/*"
                    placeholder="Select image"
                    outlined
                    label="File input"
                  ></v-file-input>
                </v-card-text>
                <v-card-actions class="text-right">
                  <v-btn
                    color="primary"
                    :loading="loading"
                    @click="addsmartupdate"
                  >
                    Add
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
              <v-card light :loading="loading">
                <v-card-title>
                  Category
                  <v-spacer></v-spacer>
                  <v-btn color="primary" @click="dialog = !dialog">Add</v-btn>
                </v-card-title>
                <v-card-text>
                  <v-list class="p-3">
                    <v-list-item v-for="(item, i) in categories" :key="i">
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
                  v-model="smartUpdateCategory"
                  label="Category name"
                  ref="category_name_input"
                ></v-text-field>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  :loading="loading"
                  text
                  color="primary"
                  @click.stop="addcategory"
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
            :headers="headers"
            :items="smartUpdateData"
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
      chip4: true,
      title: "",
      shortDescription: "",
      smartUpdateCategoryId: "",
      description: "",
      smartUpdateCategory: "",
      dialog: false,
      loading: false,
      categories: [],
      token: "",
      Image: [],
      search: "",
      pages: 1,
      hasNext: false,
      hasPrev: false,
      headers: [
        {
          text: "Title",
          align: "start",
          sortable: false,
          value: "title",
        },
        { text: "Short Description", value: "shortDescription" },
        { text: "Description", value: "description" },
        { text: "Carbs (g)", value: "carbs" },
        { text: "Protein (g)", value: "protein" },
        { text: "Iron (%)", value: "iron" },
      ],
      smartUpdateData: [],
    };
  },
  mounted() {
    this.token = {
      headers: {
        Authorization: "Token " + this.$store.state.authUser.token,
        "Content-Type": "multipart/form-data",
      },
    };
    this.getcategory();
    this.getsmartUpdate();
  },
  methods: {
    goPrev() {
      if (this.page > 1) {
        this.page--;
      } else return this.getsmartUpdate();
    },
    goNext() {
      if (this.hasNext) {
        this.page++;
      } else return;
      this.getsmartUpdate();
    },
    async addcategory() {
      this.loading = true;
      var data = {
        smartUpdateCategory: this.smartUpdateCategory,
      };
      try {
        const res = await this.$axios.post(
          "/admin/smartUpdateCategory/",
          data,
          this.token
        );
      } catch (error) {}
      this.loading = false;
      this.dialog = false;
      this.smartUpdateCategory = "";
    },
    async addsmartupdate() {
      this.loading = true;
      let formData = new FormData();
      formData.append("title", this.title);
      formData.append("shortDescription", this.shortDescription);
      formData.append("description", this.description);
      formData.append("Image", this.Image);
      formData.append(
        "smartUpdateCategoryId",
        parseInt(this.smartUpdateCategoryId)
      );
      try {
        const res = await this.$axios.post(
          "/admin/smartUpdate/",
          formData,
          this.token
        );
      } catch (error) {}
      this.loading = false;
      (this.title = ""),
        (this.shortDescription = ""),
        (this.description = ""),
        (this.Image = "");
      this.smartUpdateCategoryId = "";
    },
    async getcategory() {
      try {
        const res = await this.$axios.get(
          "/admin/smartUpdateCategory/",
          this.token
        );
        console.log(res.data);
        let smartUpdate = res.data;
        smartUpdate.forEach((element) => {
          this.categories.push({
            text: element.smartUpdateCategory,
            value: element.smartUpdateCategoryId,
          });
        });
      } catch (error) {
        console.log(error);
      }
    },
    async getsmartUpdate() {
      const res = await this.$axios.get(
        "/admin/smartUpdate/?page=" + this.page,
        this.token
      );
      if (res) {
        if (res.data.page.next) {
          this.hasNext = true;
        } else this.hasNext = false;
        if (res.data.page.prev) {
          this.hasPrev = true;
        } else this.hasPrev = false;

        this.smartUpdateCategory = res.data.data;
      }
    },
  },
};
</script>