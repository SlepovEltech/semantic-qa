<template>
	<div class="row">
		<div class="column column-60">
			<vue3-simple-typeahead :items="entityList" :placeholder="subjectPlaceholder" @selectItem="selectSubjectItem" @onInput="onEntityInput" @onBlur="onEntityBlur" :minInputLength="0" />
		</div>
		<div class="column column-60">
			<vue3-simple-typeahead :items="predicateList" :placeholder="predicatePlaceholder" @selectItem="selectPredicateItem" @onInput="onPredicateInput" @onBlur="onPredicateBlur" :minInputLength="0" />	
		</div>
		<div class="column column-60">
			<vue3-simple-typeahead :items="entityList" :placeholder="objectPlaceholder" @selectItem="selectObjectItem" @onInput="onEntityInput" @onBlur="onEntityBlur" :minInputLength="0" />		
		</div>
		<button class="btn btn-outline-danger ml-1" type="button" @click="popTriplet"> X </button>
	</div>
</template>

<script>
import SearchService from "../services/SearchService"

export default {
	name: 'triplet',
	props:["variables", "idx"],
	created() {
		this.entityListFiltered = this.entityList;
		this.predicateListFiltered = this.predicateList;
	},
	data() {
		return {
			entityList: [],
			entityListFiltered: [],
			predicateList: [],
			predicateListFiltered: [],
			
			objectSelection : null,
			predicateSelection : null,
			subjectSelection : null,

			objectPlaceholder : "Объект",
			predicatePlaceholder : "Предикат",
			subjectPlaceholder : "Субъект",
		};
	},
	methods: {
		createTriple(){
			let triple = {
				subject : this.subjectSelection,
				predicate : this.predicateSelection,
				object : this.objectSelection
			}; 
			this.$emit("triple", this.idx, triple);
			console.log(this.idx, triple);
		},
		popTriplet(){
			this.$emit("popTriple", this.idx);
		},
		selectObjectItem(item) {
			this.objectSelection = item;
			this.createTriple();
		},
		selectPredicateItem(item) {
			this.predicateSelection = item;
			this.createTriple();
		},
		selectSubjectItem(item) {
			this.subjectSelection = item;
			this.createTriple();
		},
		onEntityInput(event) {	
			this.entityListFiltered = event.items;
			
			SearchService.getEntity(event.input)
				.then(response => { 
					if(response.data.length == 0){
						this.entityList = this.variables;
						console.log(this.variables);
					}
					else{
						this.entityList = response.data;
					}	
				})
				.catch(e => {
					console.log(e); 
				});
		},
		onPredicateInput(event) {
			this.predicateListFiltered = event.items;
			this.createTriple();
			SearchService.getPredicate(event.input)
				.then(response => {
					if(response.data.length == 0){
						this.predicateList = this.variables;
						console.log(this.variables);
					}
					else{
						this.predicateList = response.data;
					}	 
				})
				.catch(e => {
					console.log(e); 
				});
		},
		onPredicateBlur(event) {
			this.predicateListFiltered = event.items;
		},
		onEntityBlur(event) {
			this.entityListFiltered = event.items;
		},

		
	},
};
</script>

<style>

</style>