<form id="start" class="was-validated">
	<div class="form-group">
	<div class="form-group" id="divadj">
		<label class="lead" for="adjustment">Adjustment</label>
		<div class="custom-control custom-radio custom-control-inline">
		  <input type="radio" id="A1" name="adjustment" class="custom-control-input" value="no" checked>
		  <label class="custom-control-label" for="A1">Not a Adjustment</label>
		</div>
		<div class="custom-control custom-radio custom-control-inline">
		  <input type="radio" id="A2" name="adjustment" class="custom-control-input" value="yes">
		  <label class="custom-control-label" for="A2">Adjustment</label>
		</div>
	</div>
	<div class="form-group" id="divpar">
		<label class="lead" for="Par">Particulars</label>
		<input type="text" class="form-control" id="Par" name = "Par" maxlength="25" required="required">
	</div>
	<div class="form-group" id="divamt">
		<label class="lead" for="amount">Amount</label>
		<input type="number" class="form-control" id="amount" name = "amount" placeholder="Amount in Rs" min="1" max="50001" step=any required="required">
	</div>
	<div class="form-group" id="divselect">
		<label class="lead" for="project">Project</label>
		<div class="custom-control custom-radio custom-control-inline">
		  <input type="radio" id="P1" name="project" class="custom-control-input" value="1" >
		  <label class="custom-control-label" for="P1">1</label>
		</div>
		<div class="custom-control custom-radio custom-control-inline">
		  <input type="radio" id="P2" name="project" class="custom-control-input" value="2" >
		  <label class="custom-control-label" for="P2">2</label>
		</div>
		<div class="custom-control custom-radio custom-control-inline">
		  <input type="radio" id="P3" name="project" class="custom-control-input" value="3" >
		  <label class="custom-control-label" for="P3">3</label>
		</div>
	</div>
	<input type="hidden" id="user" name="user"/>
	<input type="hidden" id="flag" name="flag"/>
	<input type="submit" class="btn btn-outline-primary btn-lg btn-block" value="Submit" />
	<input type="button" class="btn btn-outline-primary btn-lg btn-block" value="Back"  id="backtomain"/>
</form>
