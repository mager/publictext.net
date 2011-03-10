<?

$lat = $_POST['lat'];
$lon = $_POST['lon'];
$handle = $_POST['handle'];
$now = (int)gmdate('U');
$topic = urlencode($_POST['topic']);

$pageID = $handle . '-' . $topic;
print $pageID;

set_include_path(get_include_path() . PATH_SEPARATOR . '/home/amager/.pear/usr/local/php5/lib/pear/');
require_once '../Services_SimpleGeo/Services/SimpleGeo.php';
$client = new Services_SimpleGeo('ZL3NUaaTPF7DdvvsZpGD6wqvkBLWPDAs', 'MpCnGhagXDG7ppxQJvhupBRuewUmEHJh');
$record = new Services_SimpleGeo_Record('net.publictext.topics', $handle, $lat, $lon);
$result = $client->addRecord($record);

print $result;




?>



<!DOCTYPE html>
<html>
<head>
<style media="screen" type="text/css">
    @import "../css/style.css";
</style>
<title>PublicText - Public group chat about interesting topics in a specific neighborhood or zipcode</title>

<script type="text/javascript" src="../js/polymaps.js"></script>
<script src="http://launchrock.com/api/lr.api.0.2.js"></script>
<script type="text/javascript">

  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-21922414-1']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();

</script>
<script type="text/javascript" src="http://use.typekit.com/gqn6xcl.js"></script>
<script type="text/javascript">try{Typekit.load();}catch(e){}</script>
</head>
<body class="topic-page">
<div id="header">
<h1 class="logo"><a href="../">Public<span>Text</span></a></h1>
</div>

<div class="width">
<h2 class="pubtxt">#pizza in North Beach, San Francisco, CA</h2>
<p>This is a paragraph.</p>

<?php echo $lat; ?>

<div id="main">

  <div id="map"></div>

  <div id="chats">

  </div>

</div>


</div>

</body>
</html>
