<template>
  <v-row>
    <p v-for="(product,i) in product" :key="i">
      {{product.id}}
      {{this.$auth.strategy.token.get()}}
    </p>
  </v-row>
</template>
<script>
import { get, sync } from "vuex-pathify";
import { mapState } from 'vuex';
import axios from 'axios';
export default {
  // async fetch({store}){
  //   const res = await this.$axios.get('admin/allagent/detailslist/',{ headers: {
  //               "Authorization" : "e7c3e9e274e425bd57031879e382d83b3600a962"
  //             });
  //   const data = res.data;
  //   const product = data;
  //   store.commit('SET_PRODUCT',product);
  // },
  // computed: {
  //   ...mapState(['product'])
  // }
}
</script>
