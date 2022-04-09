<template>
  <div class="row">
    <div class="col-md-12">
      
        <!-- <div class="input-group mb-3">
        <div v-for="(selectField, idx) in selectFields" :key="idx" class="input-group mb-3">
          <input type="text" class="form-control" :id="selectField.label" :placehodler="selectField.placeholder"/>
          <button class="btn btn-primary" type="button" @click="removeSelectField">Удалить</button>
        </div>
        <button class="btn btn-primary offset-md-5" type="button" @click="addSelectField">
             Добавить переменную
        </button>
      </div> -->

      <div class="input-group mb-3">
        <h3 class="mr-3">Извлечь</h3>
         <input type="text" class="form-control" placeholder="Переменная"
               v-model="select_var_1" />
          <input type="text" class="form-control" placeholder="Переменная"
               v-model="select_var_2" />
          <input type="text" class="form-control" placeholder="Переменная"
               v-model="select_var_3" />
      </div>
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Субъект"
               v-model="subject_1" v-on:click="entityAutoComplete"/>
        <input type="text" class="form-control" placeholder="Предикат"
               v-model="predicate_1" v-on:click="predicateAutoComplete"/>
        <input type="text" class="form-control" placeholder="Объект"
               v-model="object_1" v-on:click="entityAutoComplete"/>          
      </div>
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Субъект"
               v-model="subject_2" v-on:click="entityAutoComplete"/>
        <input type="text" class="form-control" placeholder="Предикат"
               v-model="predicate_2" v-on:click="predicateAutoComplete"/>
        <input type="text" class="form-control" placeholder="Объект"
               v-model="object_2" v-on:click="entityAutoComplete"/>          
      </div>

      <!-- <div class="offset-md-5">
          <button class="btn btn-primary" type="button"
            @click="executeQuery"
          >
            Добавить условие
          </button>
        </div> -->

       <div class="offset-md-5">
          <button class="btn btn-primary" type="button"
            @click="executeQuery"
          >
            Выполнить запрос
          </button>
        </div>
    </div>

   
    <div class="col-md-12 card-columns">
            <div class="card my-3" v-for="(answer, index) in answers" :key="index">
              <div v-for="(field, field_index) in answer" :key="field_index">
                    <h5>{{field_index}}</h5> <a :href=field.value>{{ field.value }}</a>
              </div>
            </div>
    </div>

  </div>
</template>

<script>
import SearchService from "../services/SearchService"

export default {
  name: "constructor",

  data() {
    return {
      answers: [],
      selectFields: [],
      currentAnswer: null,
      currentIndex: -1,
      query:null,
      
    };
  },
  methods: {
    executeQuery() {
      this.query = {
        select_section : {
          field_1 : this.select_var_1,
          field_2 : this.select_var_2
        },
        body_section : {
          triple_1 : {
            subject :  this.subject_1,
            predicate :  this.predicate_1,
            object :  this.object_1 
          },
          triple_2 : {
            subject :  this.subject_2,
            predicate :  this.predicate_2,
            object :  this.object_2 
          }
        }
      };
      console.log(this.query)
      SearchService.executeConstructor(this.query)
        .then(response => {
          this.answers = response.data;

          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    clearSearchResults(){
      this.answers = null;
    },
    
    addSelectField () {
        this.selectFields.push({
          label: 'selectField-' + (this.selectFields.length + 1),
          placeholder: 'selectField' + (this.selectFields.length + 1)
        })
     },

    removeSelectField (index) {
        this.selectFields.splice(index, 1)
    },

    entityAutoComplete () {
       
    },

  },
  mounted() {
    this.answers = null;
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
