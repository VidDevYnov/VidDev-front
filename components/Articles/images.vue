<template>
  <v-col cols="12" sm="4" md="2" lg="4" class="d-flex img">
    <v-img
      class="ma-1"
      width="100"
      height="100"
      src="https://cdn.futura-sciences.com/buildsv6/images/mediumoriginal/6/5/2/652a7adb1b_98148_01-intro-773.jpg"
    ></v-img>

    <v-img
      class="ma-1"
      width="100"
      height="100"
      src="https://cdn.futura-sciences.com/buildsv6/images/mediumoriginal/6/5/2/652a7adb1b_98148_01-intro-773.jpg"
    ></v-img>

    <v-img
      class="ma-1"
      width="100"
      height="100"
      src="https://cdn.futura-sciences.com/buildsv6/images/mediumoriginal/6/5/2/652a7adb1b_98148_01-intro-773.jpg"
    ></v-img>
  </v-col>
</template>

<style>
/* Medium devices (landscape tablets, 768px and up) */
@media screen and (min-width: 600px) {
  .img {
    flex-direction: column;
    align-items: center;
  }
}
/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 960px) {
  .img{

width:300px !important;
height:36vh !important;
}
  
}
</style>
