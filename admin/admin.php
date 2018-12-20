<html lang="en">
<head>
	<title>Mathaji DayBook</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<script>
		//Add this below content to your HTML page, or add the js file to your page at the very top to register service worker
		if (navigator.serviceWorker.controller) {
		  console.log('active service worker found, no need to register')
		} else {
		  //Register the ServiceWorker
		  navigator.serviceWorker.register('sw_admin.js', {
			scope: './'
		  }).then(function(reg) {
			console.log('Service worker has been registered for scope:'+ reg.scope);
		  });
		}
	</script>
	<link rel="manifest" href="/mathajidaybook/admin/manifest.json">
	<link rel="stylesheet" href="/mathajidaybook/admin/css/bootstrap.min.css">
	<script src="/mathajidaybook/admin/js/jquery-3.3.1.slim.min.js"></script>
	<script src="/mathajidaybook/admin/js/bootstrap.min.js"></script>
	<script src="/mathajidaybook/admin/js/jquery.min.js"></script>
	<script src="/mathajidaybook/admin/js/admin.js"></script>
	<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/bs4/jszip-2.5.0/dt-1.10.18/b-1.5.4/b-flash-1.5.4/b-html5-1.5.4/b-print-1.5.4/fc-3.2.5/fh-3.1.4/sc-1.5.0/datatables.min.css" />
	<script type="text/javascript" src="https://cdn.datatables.net/v/bs4/jszip-2.5.0/dt-1.10.18/b-1.5.4/b-flash-1.5.4/b-html5-1.5.4/b-print-1.5.4/fc-3.2.5/fh-3.1.4/sc-1.5.0/datatables.min.js"></script>
	<link rel="stylesheet" href="/mathajidaybook/test/admin/css/main.css">
</head>

<body class="container">
	<div class="row h-100">
		<div class="col-sm-12 my-auto">
			<div class="mx-auto">
				<div class="display-5 text-center" id="title">Mathaji DayBook</div>
				<div id="change">
				</div>
			</div>
		</div>
	</div>
</body>

</html>