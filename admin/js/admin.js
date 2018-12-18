	function datatablecall(daybook){
		return $('#view').DataTable( {
					dom: "rt",
					buttons: true,
					fixedHeader: true,
					scrollY:"250px",
					scrollX:true,
					scrollCollapse:true,
					fixedColumns:{
						leftColumns: 1,
						rightColumns: 3
					},
					"paging":false,
					"ordering": false,
					"info": false,
					"processing": false,
					"lengthChange": false,
					data : daybook,
					"columns": [
							{ 
								"data": "date",
								className:"text-left"
							},
							{ 
								"data": "info",
								"searchable": false,
								className:"text-left"
							},
							{ 
								"data": "debit",
								"searchable": false,
								className:"text-right"
							},
							{ 
								"data": "credit",
								"searchable": false,
								className:"text-right"
							},
							{ 
								"data": "balance",
								"searchable": false,
								className:"text-right"								
							}
						],
				});
	}
	
	function back(){

		return $("#backtomain").click(function(){
			$.ajax({
				type:"POST",
				url : "shutdown.php",
				datatype : "html",
				success : function(result){
					if(result == "no")
						$('#change').load('button.php', function() {
							$("#title").html("Mathaji DayBook");
							loadpage();
						});
					else
						$('#change').load('down.php');
				}
			});
		});
	}
	
	function changetitle(user){
		return $("#title").append(" - " + user)
	}
	
	function exportbtn(table)
	{
		var buttons = new $.fn.dataTable.Buttons(table, {
				buttons:[{
						extend: 'excelHtml5',
						className: 'class="btn btn-outline-primary btn-lg btn-block',
						type:'Export to Excel'
					}]
		}).container().appendTo($('#exportexcel'));	
		return $("#exportexcel").children("div").removeClass("dt-buttons btn-group");
	}
	
	function search(table)
	{
		return $("#search").on("keyup search input paste cut", function() {
			table.search(this.value).draw();
		});
	}
	
	function salbookshow(salbook,table,reqsalbook)
	{
		return $("#salary").click(function(){
			if(salbook != null)
			{
				table.clear().draw();
				table.rows.add(salbook).draw();
			}
			else
			{
				reqsalbook.done(function(result){
					salbook = jQuery.parseJSON(result);
					table.clear().draw();
					table.rows.add(salbook).draw();
				});
			}
		});
	}
	
	function daybookshow(daybook,table)
	{
		return $("#daybook").click(function(){
			table.clear().draw();
			table.rows.add(daybook).draw();
		});
	}
	
	function loadpage()
	{
		$("#user1").click(function(){
			var daybook = null;
			var salbook = null;
			var usr = "user1";
			var reqdaybook = $.ajax({
				type : "POST",
				url : "fetch.php",
				data:{
					user : usr,
					type : "daybook"
				},
				datatype : "json",
			});
			var reqsalbook = $.ajax({
				type : "POST",
				url : "fetch.php",
				data:{
					user : usr,
					type : "sal"
				},
				datatype : "json",
			});
			$('#change').load('table.php', function() {
					reqdaybook.done(function(result){
						daybook = jQuery.parseJSON(result);
						var table = datatablecall(daybook);
						exportbtn(table);
						salbookshow(salbook,table,reqsalbook);
						daybookshow(daybook,table);
						search(table);
					});
					changetitle(usr);
					back();
			});
		});
		
		$("#user2").click(function(){
			var daybook = null;
			var salbook = null;
			var usr = "user2";
			var reqdaybook = $.ajax({
				type : "POST",
				url : "fetch.php",
				data:{
					user : usr,
					type : "daybook"
				},
				datatype : "json",
			});
			var reqsalbook = $.ajax({
				type : "POST",
				url : "fetch.php",
				data:{
					user : usr,
					type : "sal"
				},
				datatype : "json",
			});
			$('#change').load('table.php', function() {
					reqdaybook.done(function(result){
						daybook = jQuery.parseJSON(result);
						var table = datatablecall(daybook);
						exportbtn(table);
						salbookshow(salbook,table,reqsalbook);
						daybookshow(daybook,table);
						search(table);
					});
					changetitle(usr);
					back();
			});
		});
		
		$("#user3").click(function(){
			var daybook = null;
			var salbook = null;
			var usr = "user3";
			var reqdaybook = $.ajax({
				type : "POST",
				url : "fetch.php",
				data:{
					user : usr,
					type : "daybook"
				},
				datatype : "json",
			});
			var reqsalbook = $.ajax({
				type : "POST",
				url : "fetch.php",
				data:{
					user : usr,
					type : "sal"
				},
				datatype : "json",
			});
			$('#change').load('table.php', function() {
					reqdaybook.done(function(result){
						daybook = jQuery.parseJSON(result);
						var table = datatablecall(daybook);
						exportbtn(table);
						salbookshow(salbook,table,reqsalbook);
						daybookshow(daybook,table);
						search(table);
					});
					changetitle(usr);
					back();
			});
		});
		
		$("#user4").click(function(){
			var daybook = null;
			var salbook = null;
			var usr = "user4";
			var reqdaybook = $.ajax({
				type : "POST",
				url : "fetch.php",
				data:{
					user : usr,
					type : "daybook"
				},
				datatype : "json",
			});
			var reqsalbook = $.ajax({
				type : "POST",
				url : "fetch.php",
				data:{
					user : usr,
					type : "sal"
				},
				datatype : "json",
			});
			$('#change').load('table.php', function() {
					reqdaybook.done(function(result){
						daybook = jQuery.parseJSON(result);
						var table = datatablecall(daybook);
						exportbtn(table);
						salbookshow(salbook,table,reqsalbook);
						daybookshow(daybook,table);
						search(table);
					});
					changetitle(usr);
					back();
			});
		});
		
		$("#user5").click(function(){
			var daybook = null;
			var salbook = null;
			var usr = "user5";
			var reqdaybook = $.ajax({
				type : "POST",
				url : "fetch.php",
				data:{
					user : usr,
					type : "daybook"
				},
				datatype : "json",
			});
			var reqsalbook = $.ajax({
				type : "POST",
				url : "fetch.php",
				data:{
					user : usr,
					type : "sal"
				},
				datatype : "json",
			});
			$('#change').load('table.php', function() {
					reqdaybook.done(function(result){
						daybook = jQuery.parseJSON(result);
						var table = datatablecall(daybook);
						exportbtn(table);
						salbookshow(salbook,table,reqsalbook);
						daybookshow(daybook,table);
						search(table);
					});
					changetitle(usr);
					back();
			});
		});
	}
	
	$(document).ready(function(){
		
		$.ajax({
			type:"POST",
			url : "shutdown.php",
			datatype : "html",
			success : function(result){
				if(result == "no")
					$('#change').load('button.php', function() {
						loadpage();
					});
				else
					$('#change').load('down.php');
			}
		});		
		
	});