	function datatablecall(daybook) {
		return $('#view').DataTable({
			dom: "rt",
			buttons: true,
			fixedHeader: true,
			scrollY: "250px",
			scrollX: true,
			scrollCollapse: true,
			fixedColumns: {
				leftColumns: 1,
				rightColumns: 3
			},
			"paging": false,
			"ordering": false,
			"info": false,
			"processing": false,
			"lengthChange": false,
			data: daybook,
			"columns": [{
					"data": "date",
					className: "text-left"
				},
				{
					"data": "info",
					"searchable": false,
					className: "text-left"
				},
				{
					"data": "project",
					"searchable": false,
					className: "text-right"
				},
				{
					"data": "debit",
					"searchable": false,
					className: "text-right"
				},
				{
					"data": "credit",
					"searchable": false,
					className: "text-right"
				},
				{
					"data": "balance",
					"searchable": false,
					className: "text-right"
				}
			],
		});
	}

	function back() {

		return $("#backtomain").click(function () {
			$.ajax({
				type: "POST",
				url: "shutdown.php",
				datatype: "html",
				success: function (result) {
					if (result == "no")
						$('#change').load('button.php', function () {
							$("#title").html("Mathaji DayBook");
							loadpage();
						});
					else
						$('#change').load('down.php');
				}
			});
		});
	}

	function changetitle(user) {
		return $("#title").append(" - " + user)
	}

	function exportbtn(table) {
		var buttons = new $.fn.dataTable.Buttons(table, {
			buttons: [{
				extend: 'excelHtml5',
				className: 'class="btn btn-outline-primary btn-lg btn-block',
				type: 'Export to Excel'
			}]
		}).container().appendTo($('#exportexcel'));
		return $("#exportexcel").children("div").removeClass("dt-buttons btn-group");
	}

	function search(table) {
		return $("#search").on("keyup search input paste cut", function () {
			table.search(this.value).draw();
		});
	}

	function loadpage() {
		$("#project").click(function () {
			console.log("click expenses");
			$.ajax({
				type: "POST",
				url: "projectfetch.php",
				data: {
					project: "true"
				},
				dataType: "json",
				success: function (response) {
					$("#change").load("projectview.php", function () {
						$("#p1").val(response[0]["p1"]);
						$("#p2").val(response[0]["p2"]);
						$("#p3").val(response[0]["p3"]);
						back();
					});
				}
			});
		});

		$("#user1").click(function () {
			var usr = "user1";
			var reqData = $.ajax({
				type: "POST",
				url: "fetch.php",
				data: {
					user: usr,
				},
				datatype: "json",
			});
			$('#change').load('table.php', function () {
				reqData.done(function (result) {
					data = jQuery.parseJSON(result);
					daybook = data.daybook;
					salbook = data.salbook;
					spbbook = data.spbbook;
					advbook = data.advbook;
					var table = datatablecall(daybook);
					exportbtn(table);
					$("#daybook").click(function () {
						if (daybook != null) {
							table.clear().draw();
							table.rows.add(daybook).draw();
						}
					});

					$("#basicsalary").click(function () {
						if (salbook != null) {
							table.clear().draw();
							table.column(2).visible(false);
							table.rows.add(salbook).draw();
						}
					});

					$("#spbsalary").click(function () {
						if (spbbook != null) {
							table.clear().draw();
							table.column(2).visible(false);
							table.rows.add(spbbook).draw();
						}
					});

					$("#advsalary").click(function () {
						if (advbook != null) {
							table.clear().draw();
							table.column(2).visible(false);
							table.rows.add(advbook).draw();
						}
					});
					search(table);
				});
				changetitle(usr);
				back();
			});
		});

		$("#user2").click(function () {
			var usr = "user2";
			var reqData = $.ajax({
				type: "POST",
				url: "fetch.php",
				data: {
					user: usr,
				},
				datatype: "json",
			});
			$('#change').load('table.php', function () {
				reqData.done(function (result) {
					data = jQuery.parseJSON(result);
					daybook = data.daybook;
					salbook = data.salbook;
					spbbook = data.spbbook;
					advbook = data.advbook;
					var table = datatablecall(daybook);
					exportbtn(table);
					$("#daybook").click(function () {
						if (daybook != null) {
							table.clear().draw();
							table.rows.add(daybook).draw();
						}
					});

					$("#basicsalary").click(function () {
						if (salbook != null) {
							table.clear().draw();
							table.column(2).visible(false);
							table.rows.add(salbook).draw();
						}
					});

					$("#spbsalary").click(function () {
						if (spbbook != null) {
							table.clear().draw();
							table.column(2).visible(false);
							table.rows.add(spbbook).draw();
						}
					});

					$("#advsalary").click(function () {
						if (advbook != null) {
							table.clear().draw();
							table.column(2).visible(false);
							table.rows.add(advbook).draw();
						}
					});
					search(table);
				});
				changetitle(usr);
				back();
			});
		});

		$("#user3").click(function () {
			var usr = "user3";
			var reqData = $.ajax({
				type: "POST",
				url: "fetch.php",
				data: {
					user: usr,
				},
				datatype: "json",
			});
			$('#change').load('table.php', function () {
				reqData.done(function (result) {
					data = jQuery.parseJSON(result);
					daybook = data.daybook;
					salbook = data.salbook;
					spbbook = data.spbbook;
					advbook = data.advbook;
					var table = datatablecall(daybook);
					exportbtn(table);
					$("#daybook").click(function () {
						if (daybook != null) {
							table.clear().draw();
							table.rows.add(daybook).draw();
						}
					});

					$("#basicsalary").click(function () {
						if (salbook != null) {
							table.clear().draw();
							table.column(2).visible(false);
							table.rows.add(salbook).draw();
						}
					});

					$("#spbsalary").click(function () {
						if (spbbook != null) {
							table.clear().draw();
							table.column(2).visible(false);
							table.rows.add(spbbook).draw();
						}
					});

					$("#advsalary").click(function () {
						if (advbook != null) {
							table.clear().draw();
							table.column(2).visible(false);
							table.rows.add(advbook).draw();
						}
					});
					search(table);
				});
				changetitle(usr);
				back();
			});
		});

		$("#user4").click(function () {
			var usr = "user4";
			var reqData = $.ajax({
				type: "POST",
				url: "fetch.php",
				data: {
					user: usr,
				},
				datatype: "json",
			});
			$('#change').load('table.php', function () {
				reqData.done(function (result) {
					data = jQuery.parseJSON(result);
					daybook = data.daybook;
					salbook = data.salbook;
					spbbook = data.spbbook;
					advbook = data.advbook;
					var table = datatablecall(daybook);
					exportbtn(table);
					$("#daybook").click(function () {
						if (daybook != null) {
							table.clear().draw();
							table.rows.add(daybook).draw();
						}
					});

					$("#basicsalary").click(function () {
						if (salbook != null) {
							table.clear().draw();
							table.column(2).visible(false);
							table.rows.add(salbook).draw();
						}
					});

					$("#spbsalary").click(function () {
						if (spbbook != null) {
							table.clear().draw();
							table.column(2).visible(false);
							table.rows.add(spbbook).draw();
						}
					});

					$("#advsalary").click(function () {
						if (advbook != null) {
							table.clear().draw();
							table.column(2).visible(false);
							table.rows.add(advbook).draw();
						}
					});
					search(table);
				});
				changetitle(usr);
				back();
			});
		});

		$("#user5").click(function () {
			var usr = "user5";
			var reqData = $.ajax({
				type: "POST",
				url: "fetch.php",
				data: {
					user: usr,
				},
				datatype: "json",
			});
			$('#change').load('table.php', function () {
				reqData.done(function (result) {
					data = jQuery.parseJSON(result);
					daybook = data.daybook;
					salbook = data.salbook;
					spbbook = data.spbbook;
					advbook = data.advbook;
					var table = datatablecall(daybook);
					exportbtn(table);
					$("#daybook").click(function () {
						if (daybook != null) {
							table.clear().draw();
							table.rows.add(daybook).draw();
						}
					});

					$("#basicsalary").click(function () {
						if (salbook != null) {
							table.clear().draw();
							table.column(2).visible(false);
							table.rows.add(salbook).draw();
						}
					});

					$("#spbsalary").click(function () {
						if (spbbook != null) {
							table.clear().draw();
							table.column(2).visible(false);
							table.rows.add(spbbook).draw();
						}
					});

					$("#advsalary").click(function () {
						if (advbook != null) {
							table.clear().draw();
							table.column(2).visible(false);
							table.rows.add(advbook).draw();
						}
					});
					search(table);
				});
				changetitle(usr);
				back();
			});
		});
	}

	$(document).ready(function () {

		$.ajax({
			type: "POST",
			url: "shutdown.php",
			datatype: "html",
			success: function (result) {
				if (result == "no")
					$('#change').load('button.php', function () {
						loadpage();
					});
				else
					$('#change').load('down.php');
			}
		});

	});