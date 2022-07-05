<template>
  <div>
    <v-app-bar color="light" light style="box-shadow: none">
      <v-col cols="4" sm="3" md="2" lg="1" class="d-flex space-around">
        <NuxtLink to="/">
          <v-img width="100" src="/image/logo.png"></v-img>
        </NuxtLink>
      </v-col>
      <v-col cols="8" sm="9" md="10" lg="11" class="d-flex justify-end pa-0">
        <div class="d-flex flex-column justify-center ma-2">
          <v-menu
            v-if="$cookiz.get('role') === 'ROLE_USER'"
            v-model="menu"
            :close-on-content-click="false"
            :nudge-width="200"
            offset-x
          >
            <template #activator="{ on, attrs }">
              <v-badge v-if="nbrNoView !== 0" color="blue" :content="nbrNoView">
                <v-icon v-bind="attrs" v-on="on">mdi-bell-outline</v-icon>
              </v-badge>
              <v-icon v-else v-bind="attrs" v-on="on">mdi-bell-outline</v-icon>
            </template>

            <v-card max-width="500" style="overflow: auto; height-max: 400px">
              <v-list>
                <v-list-item
                  v-for="notification in notifications"
                  :key="notification.id"
                >
                  <v-hover>
                    <template v-slot:default="{ hover }">
                      <v-list-item-content
                        @click="changeIsView(notification.id)"
                        :class="`elevation-${hover ? 24 : 0} pa-5`"
                      >
                        <v-list-item-title>{{
                          notification.title
                        }}</v-list-item-title>
                        <v-list-item-subtitle v-html="notification.description">
                        </v-list-item-subtitle>
                      </v-list-item-content>
                    </template>
                  </v-hover>
                </v-list-item>
              </v-list>

              <v-divider></v-divider>
            </v-card>
          </v-menu>
        </div>
        <div class="d-flex flex-column justify-center">
          <v-app-bar-nav-icon
            @click="isActive = !isActive"
          ></v-app-bar-nav-icon>
        </div>
      </v-col>
    </v-app-bar>
    <div
      style="display: none; background: #f1f1f1"
      :class="{ showNavBar: isActive }"
    >
      <v-col
        cols="12"
        sm="5"
        md="3"
        lg="2"
        class="d-flex flex-column justify-center"
      >
        <NuxtLink
          v-for="button in listButton"
          :key="button.name"
          :to="button.path"
          class="text-center ma-2"
          style="color: black"
        >
          {{ button.name }}
        </NuxtLink>
      </v-col>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      isActive: false,
      menu: false,
    }
  },
  computed: {
    listButton() {
      if (this.$cookiz.get('role') === 'ROLE_USER') {
        return [
          {
            name: 'Tous les articles',
            path: '/articles/list',
          },
          {
            name: 'Profil',
            path: '/user/profil',
          },
          {
            name: 'Solde',
            path: '/user/solde',
          },
          {
            name: 'Paramètre du compte',
            path: '/user/account',
          },
          {
            name: 'Déconnexion',
            path: '/auth/logout',
          },
        ]
      } else if (this.$cookiz.get('role') === 'ROLE_ADMIN') {
        return [
          {
            name: 'Gestion des filtres',
            path: '/admin/filter',
          },
          {
            name: 'Déconnexion',
            path: '/auth/logout',
          },
        ]
      }
      return [
        {
          name: 'Tous les articles',
          path: '/articles/list',
        },
        {
          name: 'Connexion',
          path: '/auth/login',
        },
        {
          name: 'Inscription',
          path: '/auth/register',
        },
      ]
    },

    notifications() {
      return this.$store.state.user.profil.notifications
    },

    nbrNoView() {
      const isNoView = this.notifications?.reduce(
        (sum, notification) => (!notification.isView ? sum + 1 : sum),
        0
      )
      return isNoView ?? 0
    },
  },

  created() {
    if (this.$cookiz.get('role') === 'ROLE_USER') {
      this.getProfil()
    }
  },
  methods: {
    async getProfil() {
      await this.$store.dispatch('user/setProfil')
    },

    async changeIsView(id) {
      await this.$store.dispatch('userNotification/changeIsView', id)
    },
  },
}
</script>

<style>
.showNavBar {
  display: flex !important;
  flex-direction: row;
  justify-content: center;
}
</style>

