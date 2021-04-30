var root = new Vue(
    {
        el: '#root',
        data: {
            //Array contenente le lingue supportate
            supportedLanguages: ['it','en','fr','es','de','zh','ja','ko','ru'], //non sono sicuro di questa soluzione
            //contiene il valore del testo legato con v-model alla input
            inputValue: 'la vita è bella',    
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
                                backdrop: result[i].poster_path

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
                                    backdrop: result[i].poster_path

                                }
                            )
                        }                        
                    })
                    this.inputValue = '';
            },
            //Funzione che trasforma restituisce l'url della bandiera legata alla lingua del Film/SerieTV 
            intoFlag(language){
              if(language == 'it'){
                let flagUrl = "img/italy.png";              
                return flagUrl;
              }else if(language =='en'){
                flagUrl = "img/united-states.png"
                return flagUrl;
              }else if(language =='fr'){
                flagUrl = "img/france.png";
                return flagUrl; 
              }else if(language == 'es'){
                flagUrl = "img/spain.png";
                return flagUrl;
              }else if(language == 'de'){
                flagUrl = "img/germany.png";
                return flagUrl;
              }else if(language == 'zh'){
                flagUrl = "img/china.png";
                return flagUrl;
              }else if(language == 'ja'){
                flagUrl = "img/japan.png";
                return flagUrl;
              }else if(language == 'ko'){
                flagUrl = "img/south-korea.png";
                return flagUrl;
              }else if(language == 'ru'){
                flagUrl = "img/russia.png";
                return flagUrl;
              }             
            }, 
            //Funzione che trasforma il numero in un numero compreso fra 1 e 5
            numberTransform(number){
                let newNumber = Math.ceil(number / 2); 
                return newNumber;                
            },
            //Funzione che converte numeri in stelle
            fromNumberToStars(number){
              let star = '<i class="fas fa-star"></i>';
                if(number <= 0 && number <= 1){                    
                   return number = "Vote: " + star;
                }else if(number == 2){
                  return number = "Vote: " + star + star;
                }else if(number == 3){
                  return number = "Vote: " + star + star + star;
                }else if(number == 4){
                  return number = "Vote: " + star + star + star + star;
                }else if(number == 5){
                  return number = "Vote: " + star + star + star + star + star;
                }
            },
        },
    }
)



