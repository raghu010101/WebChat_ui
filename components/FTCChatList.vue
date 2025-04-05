<template>
  <!-- <v-card flat class="h-100 d-flex flex-column chat-bg">
    <v-toolbar class="fixed-title" color="#62B4F7" sticky>
      <v-toolbar-title>
        {{ selectedUser }}
      </v-toolbar-title>

      <v-spacer>
      </v-spacer>
      <v-btn :class="$vuetify.display.smAndDown ? 'd-inline' : 'd-none'">
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-toolbar>

    <v-list>
      <v-list-item v-for="user in Groups" :key="user.id" @click="selectUser(user)"
        :class="{ 'selected': selectedUser && selectedUser.id === user.id }">
        <v-row class="my-1 ">
          <v-col cols="2" md="1" sm="2" class="mx-2">
            <v-avatar size="37"  color="info">
      <v-icon small icon="mdi-account-circle"></v-icon>
    </v-avatar>
          </v-col>
          <v-col cols="10" md="10" sm="10" class="d-flex align-center">
            <v-list-item-title>{{ user.groupname }}</v-list-item-title>
            <v-list-item-subtitle>{{ user.status }}</v-list-item-subtitle>
          </v-col>
        </v-row>
        <v-divider></v-divider>
      </v-list-item>
    </v-list>
  </v-card> -->
</template>

<script>
export default {
  props: {
    Groups: Array, // Array of user objects { id, name, avatar, status }
    selectedUser: Object // Currently selected user object
  },
  methods: {
    selectUser(user) {
      this.$emit('select-user', user); // Emit event to parent component
    }
  },
  created() {
    console.log(this.Groups, 'sjlsdfgkhsd')
  }
};
</script>
<style scoped lang="scss">
// @import '../assets/styles.scss';
  .selected {
    background-color: #f0f0f0; /* Selected user background color */
  }</style>