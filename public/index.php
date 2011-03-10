<!DOCTYPE html>
<html>
<head>
<style media="screen" type="text/css">
    @import "style.css";
</style>
<title>PublicText - Public, group chat about compelling topics limited to your specific neighborhood or zip code.</title>
<link rel="stylesheet" href="http://launchrock.com/api/lr.api.0.2.css">
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
<body>

<h1 class="logo">Public<span>Text</span></h1>
<div id="container"></div>

<script>
$(document).ready(function(){
    LR.lrInstance = new LrInstance('container',{

        tagLine: "Public group chat about interesting topics in a specific location",
        description: "Public group chat about interesting topics in a specific location",
        refCodeUrl: "http://www.publictext.net/?refid=",
        lrDomain: "publictext.net",
        apiKey: "dcad318dafa8c77851d0b12e62511d9a",
        inviteList: "Launching soon. Enter your email to join our invite list:"
    });        

    // Handles events related to signup form, form validations
    // and submitting the form to the server:
    LR.signupForm = new SignupForm({
        secondaryPostLocation: ""
    });


    // Handles rendering the post submit content:
    LR.postSubmit = new PostSignupForm('pagesubmit',{
        twitterHandle: "pubtxt",
        twitterMessage: "PublicText is launching soon and I'm one of the first in line! Join me. #launch",
        newUserHeaderText: "Thanks! Want to get an early invitation?",
        newUserParagraphText: "Invite at least 3 friends using the link below. The more friends you invite, the sooner you'll get access!<br/><br/>To share with your friends, click 'Share' and 'Tweet':",
        newUserParagraphText3: "Or copy and paste the following link to share wherever you want!",
        returningUserHeaderText: "Welcome Back!",
        returningUserParagraphText: "Invite at least 3 friends using the link below. The more friends you invite, the sooner you'll get access!<br/><br/>To share with your friends, click 'Share' and 'Tweet':",
        returningUserParagraphText3: "Or copy and paste the following link to share wherever you want!",
        statsPreText: "Your live stats: ",
        footerLinks: "<a href='http://twitter.com/pubtxt'>Follow Us on Twitter</a> | <a href='http://pubtxt.tumblr.com'>Read our Blog</a>"
,showDescription: true,
showTagLine: true,
showHeaderText: true,
showParagraphText: true,
showStats: true,
showShareButtons: true,
showFooterLinks: true    });


});

    </script>
<div class="follow-us">
<p><strike>Built</strike> Prototyped by <a href="http://twitter.com/mager">@mager</a>, <a href="http://twitter.com/rahims" target="_blank">@rahims</a>, <a href="http://twitter.com/dtemple" target="_blank">@dtemple</a>, <a href="http://twitter.com/kekatie" target="_blank">@kekatie</a>, <a href="http://twitter.com/cinzano" target="_blank">@cinzano</a>, <a href="http://twitter.com/lksugarman" target="_blank">@lksugarman</a>.
</p>
<p>Powered by <a href="http://www.cabanaapp.com">Cabana</a>.</p>
</p>
</div>

</body>
</html>
