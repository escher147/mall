<template>
  <div class="check-button" :class="{selected: isSelected}">
    <img src="@/assets/img/cart/tick.svg">
  </div>
</template>


<script>
  export default {
    name: '',
    props: {
      isSelected: {
        type: Boolean,
        default: false
      }
    }
    }
</script>


<style scoped>
  .check-button {
    border-radius: 50%;
    border: 2px solid #aaa
  }
  .check-button img {
    width: 16px;
  }
  .selected {
    background-color: var(--color-tint);
    border-color: var(--color-tint);
  }
</style>