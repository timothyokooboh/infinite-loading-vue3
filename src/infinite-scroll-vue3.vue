<template>
  <div ref="scrollRef">
    <slot></slot>
    <div v-if="loading" style="text-align: center">
      <div class="spinner"></div>
    </div>
  </div>
</template>

<script>
import { onMounted, onUnmounted, toRefs } from "vue";
import infiniteScroll from "./composables/infiniteScroll";
import errorHandler from "./composables/errorHandler";

export default {
  props: {
    noResult: {
      type: Boolean,
      default: false,
    },
    message: {
      type: String,
      default: "Failed to load data."
    }
  },

  setup(props, { emit }) {
    const { noResult, message } = toRefs(props);

    const {
      handleScroll,
      scrollRef,
      loading
    } = infiniteScroll(noResult, emit)

    errorHandler(noResult, loading, message);

    onMounted(() => {
			window.addEventListener("scroll", handleScroll)
		})
		onUnmounted(() => {
			window.removeEventListener("scroll", handleScroll)
		})

    return {
      scrollRef,
      loading,
    }
  },
}
</script>

<style scoped>
  .spinner {
    display: inline-block; /* Setting display to inline-block prevents the custom event from being fired multiple times at once */
    margin: 5px auto;
    height: 2rem;
    width: 2rem;
    border-radius: 50%;
    border: 2px dashed black;
    position: relative;
    animation: spin 2s ease infinite;
  }

  .spinner::before {
    position: absolute;
    content: "";
    top: 0;
    left: -7px;
    width: 40%;
    height: 70%;
    background: white;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
