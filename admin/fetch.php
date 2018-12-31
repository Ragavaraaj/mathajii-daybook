<?php
 
include_once ('connection.php');
 
try 
{
	if ($_SERVER['REQUEST_METHOD'] == 'POST') 
	{ 
		$inUser = $_POST["user"];
		$inType = $_POST["type"];
		$inReqProject = $_POST["project"];
		$database = new Connection();
		$con = $database->openConnection();
		if($inType == "daybook")
		{	
			$stmt = $con->query("select date, info, debit, credit, balance, view from " . $inUser .  " where view < 2 order by id");
			while($row = $stmt->fetch()){
				$date = date_create($row["date"]);
				$row["date"] = date_format($date,"d-M-y");
				if($row["view"] == 1)
					$row["debit"] = number_format(0,2);
				$data[] = $row;
			}
		}
		else if ($inType == "sal")
		{
			$stmt = $con->query("select date, info, debit, credit, salbalance, view from " . $inUser .  " where view between 1 and 2 order by id");
			while($row = $stmt->fetch()){
				$date = date_create($row["date"]);
				$row["date"] = date_format($date,"d-M-y");
				$row["balance"] = $row["salbalance"];
				unset($row["salbalance"]);
				if($row["view"] == 1)
					$row["credit"] = number_format(0,2);
				$data[] = $row;
			}
		}
		else if ($inReqProject == "true")
		{
			$stmt = $con->query("select * from project");
			while($row = $stmt->fetch())
				$data[] = $row;
		}
		else
		{			
			echo "error";
			$database->closeConnection();
		}
		echo json_encode($data);
		$database->closeConnection();
	}
}
 
catch (PDOException $e)
{
    echo "There is some problem in connection: " . $e->getMessage();
 
}
 
?>
