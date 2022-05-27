<template>
  <v-app dark>
    <MenuNavBar />
    <v-main>
      <client-only>
        <v-container fluid class="pa-0" style="height: 100%">
          <Notification
            v-for="notification in $store.state.notification.list"
            :id="notification.id"
            :key="notification.id"
          />
          <router-view></router-view>
        </v-container>
      </client-only>
    </v-main>
    <v-footer><span>Hello</span></v-footer>
  </v-app>
</template>
