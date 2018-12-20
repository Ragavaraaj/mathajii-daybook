	function loadpage()
	{
		$("#info").click(function(){
			$('#change').load('input_form.php', function() {
				$("#divamt").css("display", "none");
				$("#divselect").css("display", "none");
				$("#divadj").css("display", "none");
				$("#amount").removeAttr("required");
				$("#user").val(usr);
				$("#flag").val("info");
				$("#start").submit(function(e){
					e.preventDefault();
					console.log($("#start").serialize());
					if($("#amount").val() != "" ||  $("#Par").val() != "")
					{
						$.ajax({
							type : "post",
							url : "update.php",
							data : $("#start").serialize(),
							datatype : "html",
							success : function(data){
								if(data == "success")
									back();
							},
							error : function(data){
								console.log("exception !!");
							}
						});
					}
				});
				$("#backtomain").click(function(){
					back();
				});
			});
		});
		
		$("#deb").click(function(){
			$('#change').load('input_form.php', function() {
				$("#user").val(usr);
				$("#flag").val("deb");
				$("#divselect").css("display", "none");
				$("#start").submit(function(e){
					e.preventDefault();
					console.log($("#start").serialize());
					if($("#amount").val() != "" &&  $("#Par").val() != "" && $('input[name=adjustment]:checked').val() != "undefined")
					{
						$.ajax({
							type : "post",
							url : "update.php",
							data : $("#start").serialize(),
							datatype : "html",
							success : function(data){
								if(data == "success")
									back();
							},
							error : function(data){
								console.log("exception !!");
							}
						});
					}
				});
				$("#backtomain").click(function(){
					back();
				});
			});
		});
		
		$("#cre").click(function(){
			$('#change').load('input_form.php', function() {
				$("#user").val(usr);
				$("#flag").val("cre");
				radiorequired(3,'P');
				$("#start").submit(function(e){
					e.preventDefault();
					console.log($("#start").serialize());
					if($("#amount").val() != "" &&  $("#Par").val() != "" && $('input[name=project]:checked').val() != "undefined")
					{
						$.ajax({
							type : "post",
							url : "update.php",
							data : $("#start").serialize(),
							datatype : "html",
							success : function(data){
								if(data == "success")
									back();
							},
							error : function(data){
								console.log("exception !!");
							}
						});
					}
				});
				$("#backtomain").click(function(){
					back();
				});
			});
		});
		
		$("#salb").click(function(){
			$('#change').load('input_form.php', function() {
				$("#user").val(usr);
				$("#flag").val("salb");
				$("#divadj").css("display", "none");
				$("#divselect").css("display", "none");
				$("#start").submit(function(e){
					e.preventDefault();
					console.log($("#start").serialize());
					if($("#amount").val() != "" &&  $("#Par").val() != "")
					{
						$.ajax({
							type : "post",
							url : "update.php",
							data : $("#start").serialize(),
							datatype : "html",
							success : function(data){
								if(data == "success")
									back();
							},
							error : function(data){
								console.log("exception !!");
							}
						});
					}
				});
				$("#backtomain").click(function(){
					back();
				});
			});
		});
		
		$("#salw").click(function(){
			$('#change').load('input_form.php', function() {
				$("#user").val(usr);
				$("#flag").val("salw");
				$("#divselect").css("display", "none");
				$("#divadj").css("display", "none");
				$("#start").submit(function(e){
					e.preventDefault();
					console.log($("#start").serialize());
					if($("#amount").val() != "" &&  $("#Par").val() != "")
					{
						$.ajax({
							type : "post",
							url : "update.php",
							data : $("#start").serialize(),
							datatype : "html",
							success : function(data){
								if(data == "success")
									back();
							},
							error : function(data){
								console.log("exception !!");
							}
						});
					}
				});
				$("#backtomain").click(function(){
					back();
				});
			});
		});
		
		$("#tview").click(function(){
			var daybook = null;
			var salbook = null;
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
			$('#change').load('table.php', function(){
				var table = null;
				reqdaybook.done(function(result){
					daybook = jQuery.parseJSON(result);
					table = $('#view').DataTable( {
						dom: "rt",
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
						columns: [
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
							]
					});
				});
				
				$("#daybook").click(function(){
						table.clear().draw();
						table.rows.add(daybook).draw();
				});
				
				$("#salary").click(function(){
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
				
				$("#search").on("keyup search input paste cut", function() {
					table.search(this.value).draw();
				});
				$("#backtomain").click(function(){
					back();
				});
			});
		});
	}
	
	function back(){
		return $.ajax({
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
	}
	
	function radiorequired(num,aorp)
	{
		for (i =0 ; i< num ; i++){
			$("#" + aorp + num).prop('required',true);
		}
	}
	
	$(document).ready(function(){
		console.log("js = " + usr);
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