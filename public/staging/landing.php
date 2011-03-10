<!DOCTYPE html> 
<html>
  <head>
  <title>PublicText - Public group chat about interesting topics in a specific neighborhood or zipcode</title>
    <style media="screen" type="text/css"> 
      @import "../css/style.css";
    </style>
    <script type="text/javascript" src="../js/polymaps.js"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.min.js"></script>
	<script src="http://cdn.simplegeo.com/js/1.2/simplegeo.context.jq.min.js"></script>
	<script type="text/javascript" src="http://use.typekit.com/gqn6xcl.js"></script>
	<script type="text/javascript">try{Typekit.load();}catch(e){}</script>
  </head>

<body class="landing"> 
	
  <script type="text/javascript"> 
    var client = new simplegeo.ContextClient('xJGtLQqpHmyA3NxLRUFmqTQFU9FnLkRZ');

	$(document).ready(function() {
	  client.getLocationFromIP(function(err, position) {
        centerMap(err, position);
        client.watchLocationFromBrowser({enableHighAccuracy: false}, centerMap);
      });
				 
      function centerMap(err, position) {
        if (err) { 
          $("#status").text("Unable to load location info: " + err);
        } else {
          var coords = position.coords;
          $("#lat").val(coords.latitude);
          $("#lon").val(coords.longitude);
          map.center({lat: coords.latitude, lon: coords.longitude});
          client.getContext(coords.latitude, coords.longitude, hood);
      }
    }
		
	/* Callback function
	--------------------------- */		
    function hood(err, data) {
      if (err) {
        $("#status").text("Unable to load location info: " + err);
      } else {
        var featureMap = {};
		$.each(data.features, function(i, feature) { featureMap[feature.classifiers[0].category] = feature });
		var feature = featureMap['Neighborhood'] || featureMap['Postal Code'];
        var name = feature.name;
		var handle = feature.handle.substring(0, 25);
        $("#handle").val(handle);

		var city, state = "";

		if (jQuery.inArray('Municipal', featureMap) >= 0)
		{
			city = featureMap['Municipal'].name;
		}
	
		if (jQuery.inArray('Subnational', featureMap) >= 0)
		{
			state = featureMap['Subnational'].name;
		}
			
        var location = "We've located you in " + feature;

        if (data.source === 'simplegeo') {
	      // Better, more specific HTML5 location
          $("#location").text("We've located you in " + name + ", " + city + ", " + state);
        } else {
	      // Falls back on GeoIP
		  $("#location").text("We've located you in FUZZY " + name + ", " + city + ", " + state);
	    }
      }
    }

    $("#topic").focus();

  /* TODO: If we can't get the user's location, ask them to enter their zipcode */

  /* QUESTION: Need onsubmit function or will the form just submit?? */

  });

</script> 

<div class="width">
	
<h1 class="logo">Public<span>Text</span></h1>

<?php
	$questions = array("What are you thinking about?","What’s your current obsession?","What do you want?","What’s your expertise?","What’s your fancy?","Where do you want to go?","Why are you here?","Who do you know?","What is you passion?","What do you want to learn about?","What do you want to do today?","What do you want to do right now?","What is it time for?","What do you want to play with?","What do you want to explore?","What do you have time for?","What have you always wanted to do?","My wish today is...","Want to have fun?","Let’s collaborate on...","Want to learn how to?","What are you craving?","Want to make new friends?","Want to try something new today?", "What do you want to play?");
	$questions = array_rand($qs);
?>

<h2><?php echo $qs[$q]; ?></h2>

<div id="form">
  <form method="post" action="pubtxt.php">
    <input type="text" name="topic" id="topic" size="25" maxlength="40" />
    <p><input type="submit" name="submit" value="Let's chat about it" /></p>
	<p id="location">Locating you...</p>
	<div id="map"><script type="text/javascript" src="../js/polymaps-landing.js"></script></div>
    <input type="hidden" id="lat" name="lat" value="0" />
    <input type="hidden" id="lon" name="long" value="0" />
    <input type="hidden" id="handle" name="handle" value="0">
  </form>
</div>

</div><!-- /width -->

</body> 
</html> 
