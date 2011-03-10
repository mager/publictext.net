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
			$("#entered-zip").hide();
        centerMap(err, position);
        client.watchLocationFromBrowser({enableHighAccuracy: true}, centerMap);
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
		  $("#status").text("Hm...we couldn't locate you. Could you enter your zip?");
		  $("#entered-zip").show();
      } else {
        var featureMap = {};
		$.each(data.features, function(i, feature) { featureMap[feature.classifiers[0].category] = feature });
		var feature = featureMap['Neighborhood'] || featureMap['Postal Code'];
        var name = feature.name;
		var handle = feature.handle.substring(0, 25);
        $("#handle").val(handle);

		var city = "unknown";
		var state = "unknown";

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
			console.log("Using simplegeo");
			var whereami = name + ", " + city + ", " + state;
          $("#location").text("We've located you in " + name + ", " + city + ", " + state);
		} else {
			console.log("City: " + city + "State: " + state);

			var whereami = name;
			var output = "We kinda sorta think you're in " + name;

			if (city != "unknown")
			{
				whereami += ", " + city;
				output += ", " + city;
			}

			if (state != "unknown")
			{
				whereami += ", " + state;
				output += ", " + state;
			}

	      // Falls back on GeoIP
		  $("#location").text(output);
		}

			$("#location").val(whereami);
      }
    }

    $("#topic").focus();

  /* TODO: If we can't get the user's location, ask them to enter their zipcode */

  });

</script> 

<div class="width">
	
<h1 class="logo">Public<span>Text</span></h1>

<?php
	$questions = array("What are you thinking about?","What’s your current obsession?","What do you want?","What’s your expertise?","What's your fancy?","Where do you want to go?","What is you passion?","What do you want to learn about?","What do you want to do today?","What do you want to do right now?","What do you want to play with?","What do you want to explore?");
	$random_index = array_rand($questions);
?>

<h2><?php echo $questions[$random_index]; ?></h2>

<div id="form">
  <form method="post" action="pubtxt.php">
    <input type="text" name="topic" id="topic" size="25" maxlength="40" />
    <p><input type="submit" name="submit" value="Let's chat about it" /></p>
	<p id="location">Locating you...</p>
	<input type="text" id="entered-zip" name="entered-zip" size="5" maxlength="5">
	<div id="map"><script type="text/javascript" src="../js/polymaps-landing.js"></script></div>
    <input type="hidden" id="lat" name="lat" value="0" />
    <input type="hidden" id="lon" name="long" value="0" />
    <input type="hidden" id="location" name="location" value="0" />
    <input type="hidden" id="handle" name="handle" value="0">
  </form>
</div>

</div><!-- /width -->

</body> 
</html> 
