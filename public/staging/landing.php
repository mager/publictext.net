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
        var city = featureMap['Municipal'].name;
        var state = featureMap['Subnational'].name;
        var location = "We've located you in " + feature;

        if (city != null) {
	        location += " " + city;
        }

        if (data.source === 'simplegeo') {
          $("#location").text("We've located you in " + feature + ", " + city + ", " + state);
        } else {
	      $("#location").text("We've located you in fuzzy");
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

<h2>What's your fancy?</h2>

<div id="topic">
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
