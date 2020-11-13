<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" :mini-variant="miniVariant" fixed app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title"> Solo </v-list-item-title>
          <v-list-item-subtitle> Admin </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list>
        <div v-for="(item, i) in items" :key="i">
          <v-list-item
            v-if="!item.subLinks"
            :key="i"
            :to="item.to"
            router
            exact
            @click="cuurent_title = item.title"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.title" />
            </v-list-item-content>
          </v-list-item>
          <v-list-group v-else :key="i" :to="item.to" router exact>
            <template v-slot:activator>
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item
              v-for="(item, i) in item.subLinks"
              :key="i"
              :to="item.to"
              router
              exact
              @click="cuurent_title = item.title"
            >
              <v-list-item-action-text>
                <v-list-item-title v-text="item.title" />
              </v-list-item-action-text>
            </v-list-item>
          </v-list-group>
        </div>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar fixed app>
      <v-app-bar-nav-icon @click.stop="miniVariant = !miniVariant" />
      <!-- <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn> -->
      <!-- <v-btn
        icon
        @click.stop="clipped = !clipped"
      >
        <v-icon>mdi-application</v-icon>
      </v-btn> -->
      <!-- <v-btn
        icon
        @click.stop="fixed = !fixed"
      >
        <v-icon>mdi-minus</v-icon>
      </v-btn> -->
      <v-toolbar-title v-text="cuurent_title" />
      <v-spacer />
      <v-spacer></v-spacer>
      <v-btn @click="logout()">Logout</v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer :absolute="fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      cuurent_title: "Dashboard",
      drawer: false,
      fixed: false,
      items: [
        {
          icon: "mdi-view-dashboard",
          title: "Dashboard",
          to: "/Dashboard",
        },
        {
          icon: "mdi-face-agent",
          title: "Agent",
          subLinks: [
            {
              title: "Total Agent",
              to: "/Agent",
            },
            {
              title: "Transctions",
              to: "/Agent/Transctions",
            },
          ],
        },
        {
          icon: "mdi-face",
          title: "User",
          to: "",
          subLinks: [
            {
              title: "Total Users",
              to: "/User",
            },
            {
              title: "Transctions",
              to: "/User/Transctions",
            },
          ],
        },
        {
          icon: "mdi-feature-search",
          title: "Features",
          to: "/Features",
        },
        {
          icon: "mdi-update",
          title: "Smart Update",
          to: "/SmartUpdate",
        },
        {
          icon: "mdi-bullhorn",
          title: "Advertisement",
          to: "/Advertisement",
        },
        {
          icon: "mdi-license",
          title: "License/Insurance",
          to: "License_Insurance",
        },
        {
          icon: "mdi-content-save",
          title: "Saving",
          to: "/Saving",
        },
      ],
      miniVariant: false,
    };
  },
  method:{
    logout(){
      this.$strore.dispatch('logout');
    }
  }
};
</script>
