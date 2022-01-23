<template>
  <div class="row">
    <div class="col-md-12">
      <div class="input-group mb-3">

        <input type="text" class="form-control" placeholder="Задайте вопрос"
          v-model="query"/>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button"
            @click="searchAnswer"
          >
            Поиск
          </button>
        </div>
      </div>
    </div>

    <div class="col-md-12 card-columns">
            <div class="card my-3" v-for="(answer, index) in answers" :key="index">
                <img v-if="answer.pic" class="card-img-top" :src=answer.pic.value>
                <div class="card-body">
                    <h5 v-if="answer.item_label" class="card-title">{{ answer.item_label.value }}</h5>
                    <a :href=answer.item.value v-if="answer.item" >{{answer.item.value}}</a>
                    <p class="card-text" v-if="answer.item_description">{{ answer.item_description.value }}</p>
                </div>
            </div>
    </div>

  </div>
</template>

<script>
import SearchService from "../services/SearchService";

export default {
  name: "main-search",
  data() {
    return {
      answers: [],
      currentAnswer: null,
      currentIndex: -1,
      query:null,
    };
  },
  methods: {
    searchAnswer() {
      SearchService.searchAnswer(this.query)
        .then(response => {
          this.answers = response.data;
          this.show = true
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    setActiveTutorial(tutorial, index) {
      this.currentAnswer = tutorial;
      this.currentIndex = tutorial ? index : -1;
    }
  },
  mounted() {
    //this.retrieveTutorials();
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>
