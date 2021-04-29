var root = new Vue(
    {
        el: '#root',
        data: {
            //contiene il valore del testo legato con v-model alla input
            inputValue: '',    
            //Array contenente film cercato 
            searchedMovie: [],
            //Array contenente Serie-TV cercata     
            searchedTvShow: []  
        },
        methods: {
            //Funzione =>search che interroga l'api =>themoviedb per ricevere le informazioni riguardanti il film con titolo uguale a quello ricevuto da =>inputValue
            //preleva le informazioni necessarie e le pusha nell'array =>searchedMovies
            //Al termine il valore di input value viene resettato
            //Se l'array=>searchedMovies è già occupato al rinnovo della funzione, l'array =>searchedMovies viene resettato 
            search(){
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
                                vote: parseInt(result[i].vote_average),
                                backdrop: result[i].backdrop_path

                            }
                        )
                    }
                })
                if(this.searchedTvShow.length > 0){
                    this.searchedTvShow = [];
                }
                axios
                    .get(`https://api.themoviedb.org/3/search/tv?api_key=dc214cd2641489a88b535ac4bc3a1dbc&query=${this.inputValue}`)
                    .then((response)=>{
                        let result = response.data.results;
                        for(var i = 0; i < result.length; i++){
                            this.searchedTvShow.push(
                                {
                                    title: result[i].name,
                                    originalTitle: result[i].original_name,
                                    language: result[i].original_language,
                                    vote: parseInt(result[i].vote_average),
                                    backdrop: result[i].backdrop_path 

                                }
                            )
                        }                        
                    })
                    this.inputValue = '';
                    console.log(this.searchedTvShow);
            },
            //Funzione che trasforma il numero in un numero compreso fra 1 e 5
            numberTransform(number){
                if(number >= 0 && number <= 2 ){
                    return number = 1;
                }else if(number >= 3 && number <= 5){
                    return number = 2;
                }else if(number >= 5 && number <= 7){
                    return number = 3;
                }else if(number >= 8 && number <= 9){
                    return number = 4;
                }else if(number == 10){
                    return number = 5;
                }
                    
            }
        },
        mounted(){
        }
    }
)

