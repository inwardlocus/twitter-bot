// Dependencies =========================
var twit = require('twit');
var config = require('./config.js');

var Twitter = new twit(config);

// RETWEET BOT ==========================

// find latest tweet according the query 'q' in params
var retweet = function(q) {
    var params = {
        q: q,  // REQUIRED
        result_type: 'recent',
        lang: 'en'
    }
    Twitter.get('search/tweets', params, function(err, data) {
      // if there no errors
        if (!err) {
          // grab ID of tweet to retweet
            var retweetId = data.statuses[0].id_str;
            // Tell TWITTER to retweet
            Twitter.post('statuses/retweet/:id', {
                id: retweetId
            }, function(err, response) {
                if (response) {
                    console.log('Retweeted!!!');
                }
                // if there was an error while tweeting
                if (err) {
                    console.log('Something went wrong while RETWEETING... Duplication maybe...');
                }
            });
        }
        // if unable to Search a tweet
        else {
          console.log('Something went wrong while SEARCHING...');
        }
    });
}

// grab & retweet as soon as program is running...
var quote = function(){retweet('#quote');setInterval(retweet, 43200000);}
var lyrics = function(){retweet('#lyrics');setInterval(retweet, 72000000);}
var philosophy = function(){retweet('#philosophy');;setInterval(retweet, 86400000);}

quote();
lyrics();
philosophy();


// retweet in every 50 minutes


// FAVORITE BOT====================

// find a random tweet and 'favorite' it
var favoriteTweet = function(q){
  var params = {
      q: q,  // REQUIRED
      result_type: 'mixed',
      lang: 'en'
  }
  // find the tweet
  Twitter.get('search/tweets', params, function(err,data){

    // find tweets
    var tweet = data.statuses;
    var randomTweet = ranDom(tweet);   // pick a random tweet

    // if random tweet exists
    if(typeof randomTweet != 'undefined'){
      // Tell TWITTER to 'favorite'
      Twitter.post('favorites/create', {id: randomTweet.id_str}, function(err, response){
        // if there was an error while 'favorite'
        if(err){
          console.log('CANNOT BE FAVORITE... Error');
        }
        else{
          console.log('FAVORITED... Success!!!');
        }
      });
    }
  });
}
// grab & 'favorite' as soon as program is running...

var favlyrics = function(){favoriteTweet('#lyrics');setInterval(retweet, 43200000);}
var favquoteoftheday = function(){favoriteTweet('#quoteoftheday');setInterval(retweet, 72000000);}

favlyrics();
favpoetry();




// function to generate a random tweet tweet
function ranDom (arr) {
  var index = Math.floor(Math.random()*arr.length);
  return arr[index];
};


