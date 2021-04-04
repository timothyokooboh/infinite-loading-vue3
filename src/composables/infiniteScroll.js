import { ref } from "vue";

export default function infiniteScroll(noResult, emit) {
    const scrollRef = ref(null);
    let loading = ref(false);

    const handleScroll = () => {
      let element = scrollRef.value;

      if ( element.getBoundingClientRect().bottom < window.innerHeight ) {
        emit('infinite-scroll');
        
        if(noResult.value) {
          loading.value = false
        } else {
          loading.value = true;
        }
      }
    }

    return {
        handleScroll,
        scrollRef,
        loading
    }
  
}