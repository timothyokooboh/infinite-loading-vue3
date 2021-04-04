# infinite-loading-vue3
An infinite scroll component for Vue 3.0 apps

## Installation
```
npm install infinite-loading-vue3
```

## Usage
```
import InfiniteScroll from "infinite-loading-vue3";

<script>
  export default {
    components: {
      InfiniteScroll
    }
  }
</script>

<template>
  <div>
    <infinite-scroll @infinite-scroll="loadDataFromServer">
      <!-- Place the content of your page here. E.g a list of resources being fetched from a server -->
    </infinite-scroll>
  </div>
</template>

```

NB: 
1. The component emits an *infinite-scroll* event whenever a user scrolls to the bottom of the page.
2. "loadDataFromServer" could be the name of the function in your script responsible for making API calls and loading data from the server.
3. Before response is returned from the server, a *spinner icon* is displayed.


## Props
The InfinitesScroll components displays error messages if no result was fetched or if there was an error in the API request. 
Awesome right 😁.

This can be enabled by the following two props.

```
1. noResult: It is used to inform the component that no data was returned from the server either because a user has
 reached the end of the pages and an empty array was returned or because there was an error in the API Call.
 
2. message: Here, you can provide custom error messages that you want to display to users.

```

## Example
Let's see the *infinite-loading-vue3* package in action.

We will be making a call to GITHUB API and fetch a list of trending repositories. 
As users scroll to the bottom of the page, results from the next page will be fetched.

[See live demo](https://timothyokooboh.github.io/trending-github-repos/)

```

<template>
  <div id="app">
    <infinite-scroll
      @infinite-scroll="loadDataFromServer"
      :message="message"
      :noResult="noResult"
    >
       <div>
        <div
          v-for="repo in trendingRepos"
          :key="repo.id"
          style="margin-bottom: 20px"
        >
          <div>
            <img :src="repo.owner.avatar_url" alt="" style="height: 50px">
          </div>
          <div>{{repo.name}}</div>
        </div>
      </div>
    </infinite-scroll>
  </div>
</template>

<script>
import InfiniteScroll from 'infinite-loading-vue3';
import axios from "axios";

export default {
  name: 'TrendingRepos',
  
  components: {
    InfiniteScroll
  },
  
  data() {
    return {
      trendingRepos: [],
      page: 1,
      noResult: false,
      message: ""
    }
  },
  
  methods: {
    async loadDataFromServer(){
      try {
        const result = await axios.get(`https://api.github.com/search/repositories?q=created:>2017-10-22&sort=stars&order=desc&page=${this.page}`)
        if(result.data.items.length) {
          this.trendingRepos.push(...result.data.items);
          this.page++;
        } else {
          this.noResult = true;
          this.message = "No result found";
        }
      } catch(err) {
        this.noResult = true;
        this.message = "Error loading data";
      }
    }
  },
  
  mounted() {
    this.loadDataFromServer()
  }
}
</script>


```