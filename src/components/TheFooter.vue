<template>
  <footer>
    <div id="footer" class="p-text-center">
      © {{ year }} PMO Global Services. All Rights Reserved.
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      year: new Date().getFullYear()
    };
  }
};
</script>

<style lang="scss" scoped>
@import '@/scss/_variables.scss';
footer {
  background: $brand_color;
  color: #fff;
  padding: 0.5rem 0;
  margin-top: 2rem;
}
#footer {
  @include app-container;
  font-size: 0.9rem;
}
</style>
