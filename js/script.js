var root = new Vue(
    {
        el: '#root',
        data: {
            //contiene il valore del testo legato con v-model alla input
            inputValue: '',    
            //Array contenente film cercato 
            searchedMovie: []       
        },
        methods: {
            //Funzione che interroga l'api =>themoviedb per ricevere le informazioni riguardanti il film con titolo uguale a quello ricevuto da =>inputValue
            //preleva le informazioni necessarie e le pusha nell'array =>searchedMovies
            //Al termine il valore di input value viene resettato
            //Se l'array=>searchedMovies è già occupato al rinnovo della funzione, l'array =>searchedMovies viene resettato 
            searchMovie(){
              if(this.searchedMovie.length > 0){
                  this.searchedMovie = [];
              }
              axios
                .get(`https://api.themoviedb.org/3/search/movie?api_key=dc214cd2641489a88b535ac4bc3a1dbc&query=${this.inputValue}`)//BISOGNA CAPIRE LA SINTASSI
                .then((response)=>{
                    let result = response.data.results;
                    for( var i = 0; i < result.length; i++){
                        this.searchedMovie.push(
                            {
                                title: result[i].title,
                                originalTitle: result[i].original_title,
                                language: result[i].original_language,
                                vote: result[i].vote_average
                            }
                        )
                    }
                    this.inputValue = '';
                })
            }
        },
        mounted(){
        }
    }
)

