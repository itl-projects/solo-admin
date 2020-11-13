<template>
  <v-row>
    <v-col style="display: flex; justify-content: center">
      <v-card elevation="5" loading="loader" max-width="400" min-width="350">
        <v-card-title class="justify-center">
          <v-icon large color="white"> mdi-login </v-icon>
        </v-card-title>
        <v-card-subtitle class="text-center mt-3">
          <h3>Login</h3>
        </v-card-subtitle>
        <v-container>
          <v-row>
            <v-col>
              <form> 
                <v-text-field
                  v-model="username"
                  :error-messages="nameErrors"
                  label="Username"
                  required
                  @input="$v.username.$touch()"
                  @blur="$v.username.$touch()"
                  prepend-icon="mdi-account-outline"
                ></v-text-field>
                <v-text-field
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  :error-messages="passwordErrors"
                  label="Password"
                  required
                  @input="$v.password.$touch()"
                  @blur="$v.password.$touch()"
                  prepend-icon="mdi-lock"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="showPassword = !showPassword"
                ></v-text-field>
                <v-btn class="mr-4 float-right" @click="login()" color="primary">
                  submit
                </v-btn>
              </form>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import { mapState } from 'vuex';
export default {
  auth: 'guest',
  mixins: [validationMixin],
  validations: {
    username: { required },
    password: { required },
  },
  data: () => ({
    username: "",
    password: "",
    status: null,
    showPassword: false,
    loader: false,
  }),
  computed: {
    nameErrors() {
      const errors = [];
      if (!this.$v.username.$dirty) return errors;
      !this.$v.username.required && errors.push("username is required.");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required && errors.push("Password is required");
      return errors;
    },
  },
  methods: {
    async login() {
      try{
        await this.$store.dispatch('login',{
          username:this.username,
          password:this.password
        })
        this.username='',
        this.password=''
      }catch(e){
        console.log('failded');
      }
      }
    }
};
</script>
<style scoped>
.justify-center {
  justify-content: center;
}
</style>>