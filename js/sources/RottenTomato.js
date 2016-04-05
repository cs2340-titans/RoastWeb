/**
 * Created by andy on 3/28/16.
 */
import {ROTTEN_TOMATO_KEY} from '../constants/AppConstants';
let Promise = require('es6-promise').Promise;
import 'whatwg-fetch';

let URL = "http://ssh.andyfang.me:1337/api.rottentomatoes.com/api/public/v1.0/";
let recent_dvd_partial = "lists/dvds/new_releases.json";
let recent_movie_partial = "lists/movies/in_theaters.json";
let search_partial = "movies.json?page_limit=25&page=1&q=";

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    console.log(response);
    var error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}
function my_fetch(url) {
  return fetch(url, {mode: 'cors'}).then(checkStatus);
}

let RottenTomato = {
  recentDvd() {
    return my_fetch(URL + recent_dvd_partial + '?apikey=' + ROTTEN_TOMATO_KEY).then(response => response.json());
  },
  recentMovie() {
    return my_fetch(URL + recent_movie_partial + '?apikey=' + ROTTEN_TOMATO_KEY).then(response => response.json());
  },
  search(query) {
    return my_fetch(URL + search_partial + query + '&apikey=' + ROTTEN_TOMATO_KEY).then(response => response.json());
  },
  movieDetails(title) {
    let myUrl = "http://ssh.andyfang.me:1337/api.myapifilms.com/imdb/idIMDB?title="
      + title
      + "&token=9b107f66-bca6-4c2f-b0be-0636a7a3a174";
    return my_fetch(myUrl).then(response => response.json());
  }
};
export default RottenTomato;