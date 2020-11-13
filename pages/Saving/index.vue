<template>
<v-row>
    <v-col>
        <v-card light>
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
            :loading="lorder"
            loading-text="Loading... Please wait"
            :headers="headers"
            :items="savingData"
            :search="search"
            ></v-data-table>
        </v-card>
    </v-col>
</v-row>
</template>
<script>
export default {
    layout:"admin",
     data () {
      return {
        title:'Saving',
        search: '',
        lorder:false,
        headers: [
          {
            text: 'Name',
            align: 'start',
            sortable: false,
            value: 'fullName',
          },
          { text: 'Mobile Number', value: 'phone' },
          { text: 'Shukubly Balance', value: 'ShukublyBalanc' },
          { text: 'Webodi Balance', value: 'WebodiBalance' },
          
        ],
        savingData:[]
      }
    },
    mounted(){
      this.getSaving();
    },
    methods:{
      async getSaving(){
        this.lorder=true
        try{
          const res = await this.$axios.get("/admin/alluser/welbodiandshukubly/totalamount/",{
          headers: {
            Authorization: "Token " + this.$store.state.authUser.token,
          },
        });
          if(res.data){ 
            this.savingData = res.data
          }
        }catch(e){
          this.lorder=false
        }
        this.lorder=false
      },
    }
}
</script>
<style>
 tbody>tr>td{
   text-transform: capitalize;
 }
</style>