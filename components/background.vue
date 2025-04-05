<template>
  <div :style="backgroundStyle" class="position_fixed">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    backgroundImage: {
      type: String,
      required: true,
    },
  },
  computed: {
    backgroundStyle() {
      return {
        backgroundImage: `url(${this.backgroundImage})`,
        backgroundSize: 'cover',
        height: '100vh',
        width: '100vw',
      };
    },
  },
};
</script>
<style scoped lang="scss">
@import '../assets/styles.scss';
</style>
