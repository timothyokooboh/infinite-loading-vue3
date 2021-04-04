<script>
import { defineComponent } from 'vue';
import InfiniteScrollVue3 from '@/infinite-scroll-vue3.vue';
import axios from "axios";

export default defineComponent({
  name: 'ServeDev',
  components: {
    InfiniteScrollVue3
  },
  data() {
    return {
      list: [],
      page: 1,
      noResult: false,
      message: ""
    }
  },
   methods: {
    async infiniteHandler(){
      try {
        const result = await axios.get(`https://api.github.com/search/repositories?q=created:>2017-10-22&sort=stars&order=desc&page=${this.page}`)
        if(result.data.items.length) {
          this.list.push(...result.data.items)
          this.page++;
        } else {
          this.noResult = true;
          this.message = "No result found";
        }

        console.log(result.data.items)
        console.log(this.list)
      } catch(err) {
        console.log(err)
        this.noResult = true;
        this.message = "Error loading data";
      }
    }
  },
  mounted() {
    this.infiniteHandler()
  }
});
</script>

<template>
  <div id="app">
    <infinite-scroll-vue3
     @infinite-scroll="infiniteHandler"
      :noResult="noResult"
      :message="message"
    >
       <div>
        <div
          v-for="repo in list"
          :key="repo.id"
          style="margin-bottom: 20px"
        >
          <div>
            <img :src="repo.owner.avatar_url" alt="" style="height: 50px">
          </div>
          <div>{{repo.name}}</div>
        </div>
      </div>
    </infinite-scroll-vue3>
  </div>
</template>
