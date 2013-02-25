var sub = "SXGWLZPDOKFIVUHJYTQBNMACERxswgzldpkoifuvjhtybqmncare";
var nouns1 = ''; 
var nouns2 = '';
var rand = '';
var url = location.href;

function encodeStr(uncoded) {
  uncoded = uncoded.toUpperCase().replace(/^\s+|\s+$/g,"");
  var coded = "";
  var chr;
  for (var i = uncoded.length - 1; i >= 0; i--) {
    chr = uncoded.charCodeAt(i);
    coded += (chr >= 65 && chr <= 90) ? 
      sub.charAt(chr - 65 + 26*Math.floor(Math.random()*2)) :
      String.fromCharCode(chr); 
    }
  return encodeURIComponent(coded);  
}

function decodeStr(coded) {
  coded = decodeURIComponent(coded);  
  var uncoded = "";
  var chr;
  for (var i = coded.length - 1; i >= 0; i--) {
    chr = coded.charAt(i);
    uncoded += (chr >= "a" && chr <= "z" || chr >= "A" && chr <= "Z") ?
      String.fromCharCode(65 + 32 + sub.indexOf(chr) % 26) :
      chr; 
    }
  return uncoded;   
} 

function gup( name ){
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");  
  var regexS = "[\\?&]"+name+"=([^&#]*)";  
  var regex = new RegExp( regexS );  
  var results = regex.exec( window.location.href ); 
  if( results == null ) {
    return "";  
  }
  else {
return results[1];
  }
}

$('.reload').click(getWords);

function getWords() {
  $.ajax({
    url: 'http://api.wordnik.com/v4/words.json/randomWords?minCorpusCount=10000&minDictionaryCount=5&excludePartOfSpeech=proper-noun,proper-noun-plural,proper-noun-posessive,suffix,family-name,idiom,affix&hasDictionaryDef=true&includePartOfSpeech=noun,adjective,verb&limit=2&maxLength=22&api_key='+key.API_KEY,
    async: false,
    dataType:"json"
  }).done(function(noun_data) {
    $('#allthethings').html('');
    nouns1 = noun_data[0].word;
    nouns2 = noun_data[1].word.pluralize();
    var scale = Math.ceil(Math.log(Math.pow(1000, Math.pow(Math.random(), 2))) / Math.LN10);
    rand = (Math.floor(Math.random() * 10000) * Math.pow(10, scale - 4)).toString().substr(0,5);
    $("#allthethings").append("1 " + nouns1 + " = " + rand + " " + nouns2 + "<br>");
    $('#share').attr('href',location.href.split('?')[0]+'?word='+encodeStr(nouns1)+'$'+encodeStr(rand)+'$'+encodeStr(nouns2));
  });
  return false;
}

if (gup('word') === "") {
  getWords();
  $('.reload').attr('href',location.origin+location.pathname);
}
else {
  nouns1 = decodeStr(unescape(gup('word')).split('$')[0]);
  rand =  decodeStr(unescape(gup('word')).split('$')[1]);
  nouns2 = decodeStr(unescape(gup('word')).split('$')[2]);
  $('#allthethings').text('');
  $("#allthethings").append("1 " + nouns1 + " = " + rand + " " + nouns2 + "<br>");
  $('.reload').attr('href',location.origin+location.pathname);
  $('#share').attr('href',url);
}
