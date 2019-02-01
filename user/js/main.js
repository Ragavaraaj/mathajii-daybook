function ajaxCall()
{
	return $.ajax({
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

function start(check)
{
	return 	$("#start").submit(function(e){
		e.preventDefault();
		console.log($("#start").serialize());
		switch(check)
		{
			case 1:
				if($("#amount").val() != "" &&  $("#Par").val() != "")
					ajaxCall();
			break;
			case 2:
				if($("#amount").val() != "" &&  $("#Par").val() != "" && $('input[name=project]:checked').val() != "undefined")
					ajaxCall();
			break;
			case 3:
				if($("#Par").val() != "")
					ajaxCall();
			break;
		}
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

function radioRequired(num,aorp)
{
	for (i =1 ; i<= num ; i++){
		$("#" + aorp + num).prop('required',true);
	}
}

function changeAfterSal(value)
{
	return 	$('#change').load('input_form.php', function() {
		$("#divselect").css("display", "none");
		$("#divadj").css("display", "none");
		$("#divworkorno").css("display", "none");
		$("#user").val(usr);
		$("#flag").val(value);
		start(1);
		$("#backtomain").click(function(){
			back();
		});
	});

}

function changeAfterSalb(value)
{
	return 	$('#change').load('input_form.php', function() {
		$("#divselect").css("display", "none");
		$("#divadj").css("display", "none");
		$("#user").val(usr);
		$("#flag").val(value);
		$("#W2").click(function (e) { 
			$("#divamt").css("display", "none");
			$("#amount").removeAttr("required");
			$("#amount").val(0);
		});
		
		$("#W1").click(function (e) { 
			$("#divamt").css("display", "block");
			$("#amount").attr("required", "required");
			$("#amount").val("");			
		});

		start(1);
		$("#backtomain").click(function(){
			back();
		});
	});

}

function changeTable(selector, book , table) {

	return $("#" + selector).click(function(){
		if(book != null )
		{
			table.clear().draw();
			table.rows.add(book).draw();
		}
		$("#overlay").css("display", "none");
	});
  }

function loadpage()
{
	$("#info").click(function(){
		$('#change').load('input_form.php', function() {
			$("#divamt").css("display", "none");
			$("#divselect").css("display", "none");
			$("#divadj").css("display", "none");
			$("#amount").removeAttr("required");
			$("#divworkorno").css("display", "none");
			$("#user").val(usr);
			$("#flag").val("info");
			start(3);
			$("#backtomain").click(function(){
				back();
			});
		});
	});
	
	$("#deb").click(function(){
		$('#change').load('input_form.php', function() {
			$("#divselect").css("display", "none");
			$("#divworkorno").css("display", "none");
			$("#user").val(usr);
			$("#flag").val("deb");
			start(1);
			$("#backtomain").click(function(){
				back();
			});
		});
	});
	
	$("#cre").click(function(){
		$('#change').load('input_form.php', function() {
			$("#divworkorno").css("display", "none");
			$("#user").val(usr);
			$("#flag").val("cre");
			radioRequired(3,'P');
			start(2);
			$("#backtomain").click(function(){
				back();
			});
		});
	});

	$("#sal").click(function () { 
		$('#change').load('salbuttons.php', function() {

			$("#salb").click(function(){
				changeAfterSalb("salb")
			});
			
			$("#salw").click(function(){
				changeAfterSal("salw")
			});

			$("#ssalb").click(function(){
				changeAfterSalb("ssalb")
			});
			
			$("#ssalw").click(function(){
				changeAfterSal("ssalw")
			});

			$("#asalb").click(function(){
				changeAfterSalb("asalb")
			});

			$("#asalw").click(function(){
				changeAfterSal("asalw")
			});

			$("#backtomain").click(function(){
				back();
			});
		});
	});
	
	
	$("#tview").click(function(){
		var daybook = null;
		var salbook = null;
		var spbbook = null;
		var advbook = null;
		var reqdata = $.ajax({
			type : "POST",
			url : "fetch.php",
			data:{
				user : usr,
			},
			datatype : "json",
		});
		$('#change').load('table.php', function(){
			var table = null;
			reqdata.done(function(result){
				data = jQuery.parseJSON(result);
				daybook = data.daybook;
				salbook = data.salbook;
				spbbook = data.spbbook;
				advbook = data.advbook;
				table = $('#view').DataTable( {
					dom: "rt",
					fixedHeader: true,
					scrollY:"250px",
					scrollX:true,
					scrollCollapse:true,
					fixedColumns:{
						leftColumns: 1,
						rightColumns: 4
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
								"data": "project",
								"searchable": false,
								className:"text-right"
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
				if(daybook != null )
				{
					table.clear().draw();
					table.rows.add(daybook).draw();
				}
			});

			$("#basicsalary").click(function(){
				if(salbook != null )
				{
					table.clear().draw();
					table.column( 2 ).visible( false );
					table.rows.add(salbook).draw();
				}
			});

			$("#spbsalary").click(function(){
				if(spbbook != null )
				{
					table.clear().draw();
					table.column( 2 ).visible( false );
					table.rows.add(spbbook).draw();
				}
			});

			$("#advsalary").click(function(){
				if(advbook != null )
				{
					table.clear().draw();
					table.column( 2 ).visible( false );
					table.rows.add(advbook).draw();
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