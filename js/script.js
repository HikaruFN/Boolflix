var root = new Vue(
    {
        el: '#root',
        data: {
            //Indice corrente
            currentIndex: null,
            //Array contenente le lingue supportate
            supportedLanguages: ['it','en','fr','es','de','zh','ja','ko','ru'],
            //contiene il valore del testo legato con v-model alla input
            inputValue: 'digimon',//ALLA FINE RICORDATI DI SVUOTRARE LA STRINGA    
            //Array contenente film cercato 
            searchedMovie: [],
            //Array contenente Serie-TV cercata     
            searchedTvShow: []  
        },
        methods: {
            //Funzione =>search che interroga l'api =>themoviedb per ricevere le informazioni riguardanti il film con titolo uguale a quello ricevuto da =>inputValue
            //preleva le informazioni necessarie e le pusha nell'array =>searchedMovies
            //Al termine il valore di input value viene resettato 
            search(){
              //Reset dell'array =>searchedMovie ad ogni avvio della funzione =>search 
              this.searchedMovie = [];
              //Interrogo l'API per cercare un film con lo stesso valore di =>inputValue e pushare nell'array =>searcheMovie per ogni risultato un oggetto contenente diverse info
              axios
                .get(`https://api.themoviedb.org/3/search/movie?api_key=dc214cd2641489a88b535ac4bc3a1dbc&query=${this.inputValue}`)
                .then((response)=>{
                    let result = response.data.results;
                    for( var i = 0; i < result.length; i++){
                        this.searchedMovie.push(
                            {
                                title: result[i].title,
                                originalTitle: result[i].original_title,
                                language: result[i].original_language,
                                vote: parseInt(result[i].vote_average),
                                plot: result[i].overview,
                                backdrop: result[i].poster_path,
                                hover: false,
                                id: result[i].id,
                                genders: [],
                                actors:[]
                            }
                        )
                    }
                    //Prelevo i primo 5 nomi degli attori del cast dei film e li pusho nel valore della chiave => actors di =>searchedMovie
                    //Saranno prelevati anche i valori dei generi (senza duplicati) e pushato nel valore della chiave =>genders
                    this.getCastAndGenders(this.searchedMovie);
                })    
                //Reset dell'array =>searcheTvShow ad ogni avvio della funzione =>search 
                this.searchedTvShow = [];
                //Interrogo l'API per cercare un film con lo stesso valore di =>inputValue e pushare nell'array =>searcheTvShow per ogni risultato un oggetto contenente diverse info
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
                                    plot: result[i].overview,
                                    backdrop: result[i].poster_path,
                                    hover: false,
                                    id: result[i].id,
                                    genders: [],
                                    actors:[]
                                }
                            )
                        }       
                        //Prelevo i primo 5 nomi degli attori del cast dei film e li pusho nel valore della chiave => actors di =>searchedTvShow
                        //Saranno prelevati anche i valori dei generi (senza duplicati) e pushato nel valore della chiave =>genders
                        this.getCastAndGenders(this.searchedTvShow);                 
                  })
                    //Reset contenuto => inputValue
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
            //Funzione legata al mouse enter, cambia indice corrente =>currentIndex e cambia lo stato dell' hover dell'elemento con indice attivo in true
            changeIndexOnEnter(array, index){
              this.currentIndex = index;
              array[this.currentIndex].hover = true;
            },
            //Funzione legata al mouseleave che ambia lo stato dell' hover dell'elemento con indice attivo in false
            changeIndexOnLeave(array){ 
              array[this.currentIndex].hover = false;
            },
            //Funzione che limita la stringa a 200 caratteri
            cutString(string){
              let thisString = string.slice(0, 200);
              return thisString = thisString + '...';
          },
          //Funzione per ciclare un array e pushare e pushare per ogni elemento genere e nomi del cast(fino ad un massimo di 5) interroganso l'API
          getCastAndGenders(array){
            array.forEach((element)=>{
              axios
                  .get(`https://api.themoviedb.org/3/movie/${element.id}/credits?api_key=dc214cd2641489a88b535ac4bc3a1dbc`)
                   .then((response)=>{
                     let cast =(response.data.cast);
                     for( var i = 0; i < cast.length; i++){ 
                      if(!element.genders.includes(cast[i].gender)){
                        element.genders.push(cast[i].gender);   
                      } 
                      if(element.actors.length < 5){
                         element.actors.push(cast[i].name);
                      }
                    }
                  })
            })
          },
        },
    }
)



