<html lang="en">
<head>
	<title>Mathaji DayBook</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<script>
		var url =  window.location.href;
		var usr = url.substring(url.indexOf(".php")-4,url.indexOf(".php"));
		console.log("user.php = " + usr);
		//Add this below content to your HTML page, or add the js file to your page at the very top to register service worker
		if (navigator.serviceWorker.controller) {
		  console.log('active service worker found, no need to register')
		} else {
		  //Register the ServiceWorker
		  navigator.serviceWorker.register('sw.js?usr=' + usr , {
			scope: './',
		  }).then(function(reg) {
			console.log('Service worker has been registered for scope:'+ reg.scope);
		  });
		}
	</script>
	<link rel="manifest" href="/mathajidaybook/user/manifest.json">
	<link rel="stylesheet" href="/mathajidaybook/user/css/bootstrap.min.css">
	<script src="/mathajidaybook/user/js/jquery-3.3.1.slim.min.js"></script>
	<script src="/mathajidaybook/user/js/bootstrap.min.js"></script>
	<script src="/mathajidaybook/user/js/jquery.min.js"></script>
	<script src="/mathajidaybook/test/user/js/main.js"></script>
	<script src="/mathajidaybook/test/user/css/main.css"></script>
	<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/bs4/dt-1.10.18/b-1.5.4/b-colvis-1.5.4/fc-3.2.5/fh-3.1.4/datatables.min.css"/>
	<script type="text/javascript" src="https://cdn.datatables.net/v/bs4/dt-1.10.18/b-1.5.4/b-colvis-1.5.4/fc-3.2.5/fh-3.1.4/datatables.min.js"></script>


</head>
<body class="container">
    <div class="row h-100">
        <div class="col-sm-12 my-auto">
            <div class="mx-auto"> 
				<div class="display-5 text-center">Mathaji DayBook</div>
				<div id="change">
				</div>
			</div>
        </div>
    </div>
</body>
</html>
