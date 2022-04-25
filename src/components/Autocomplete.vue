<template>
	<div class="row">
		<div class="col-md-10 offset-md-1">
			<div class="input-group mb-3">
				<h3 class="mr-3">Извлечь</h3>	
				<input type="text" v-for="(item, index) in select_variables" :key="index" v-model="select_variables[index]" placeholder="Переменная" class="form-control">
				<button class="btn btn-outline-danger ml-1" type="button" @click="popSelectFiled"> X </button>
				<button class="btn btn-outline-secondary ml-1" type="button" @click="pushSelectFiled"> Добавить</button>
			</div>


			<div class="offset-md-3">
				<Triplet v-for="(item, index) in triplets_array" :key="index" v-model="triplets_array[index]" :variables="select_variables" :idx="index" @triple="tripletInput" @popTriple="popTriplet"/>
			</div>
			
			<div class="offset-md-5">
				<button class="btn btn-outline-secondary mt-1" type="button" @click="pushTriplet"> Добавить триплет </button>
			</div>

			<div class="offset-md-5">
				<button class="btn btn-primary mt-1" type="button" @click="executeQuery" > Выполнить запрос </button>
			</div>
		</div>
	</div>

	<h3 v-if="answer_error != null" class="mt-1">Ошибка: {{answer_error}}</h3>
	<div v-if="answers != null">
		<h3 >Результаты запроса</h3>
		
		<table class="table">
			<thead>
				<tr>
					<th v-for="(item, index) in table_header" :key="index" scope="col">{{item}}</th>		
				</tr>
			</thead>
			<tbody>
				<tr v-for="(answer, index) in answers" :key="index">
					<td v-for="(field, field_index) in answer" :key="field_index">
						<a v-if="field.type=='uri'" :href=field.value>{{ field.value }}</a>
						<h6 v-if="field.type=='literal'">{{field.value}}</h6>
					</td>
						
				</tr>
				
			</tbody>
		</table>

	</div>
		
</template>

<script>
import Triplet from "../components/Triplet"
import SearchService from "../services/SearchService"


export default {
	name: 'autocomplete',
	components: {
		Triplet,
	},
	created() {
		
	},
	data() {
		return {
			select_variables: [""],
			triplets_array : [""],
			query:null,
			answers:[],
			answer_error:null,
			table_header: []
		};
	},
	methods: {
		pushSelectFiled(){
			this.select_variables.push("");
		},
		popSelectFiled(){
			if(this.select_variables.length > 1)
				this.select_variables.pop();
		},
		pushTriplet(){
			this.triplets_array.push("");
		},
		popTriplet(idx){
			if(this.triplets_array.length > 1)
				this.triplets_array.splice(idx, 1 );
		},
		tripletInput(idx, triplet){
			this.triplets_array[idx] = triplet;
		},
		executeQuery() {
			this.answers = null;
			this.answer_error = null;
			let select_section = {};
			let body_section = {};
			for(let i = 0; i < this.select_variables.length; i++){
				select_section['field_'+(i+1)] = this.select_variables[i];
			}

			for(let i = 0; i < this.triplets_array.length; i++){
				body_section['triple_'+(i+1)] = this.triplets_array[i];
			}
			console.log(select_section);
			console.log(body_section);

			this.query = {
				select_section : select_section,
				body_section : body_section
			};
			console.log(this.query)
			SearchService.executeConstructor(this.query)
				.then(response => {
					this.answers = response.data;

					//for(let key of response.data[0].keys)
					this.table_header = Object.keys(response.data[0])
					console.log(response.data);
				})
				.catch(e => {
					this.answer_error = 'Произошла ошибка при составлении SPARQL запроса'
					console.log(e);
			});
		},
	},
};
</script>
