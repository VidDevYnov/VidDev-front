<template>
  <v-app dark>
    <client-only>
      <MenuNavBar :key="$route.fullPath" />
      <v-main>
        <v-container fluid class="pa-0" style="height: 100%">
          <Notification
            v-for="notification in $store.state.notification.list"
            :id="notification.id"
            :key="notification.id"
          />
          <router-view :key="$route.fullPath"></router-view>
        </v-container>
      </v-main>
      <MenuFooter />
    </client-only>
  </v-app>
</template>
