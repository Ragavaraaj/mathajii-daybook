<?php
 
include_once ('connection.php');
 
$resultData [] = null;

try 
{
	if ($_SERVER['REQUEST_METHOD'] == 'POST') 
	{ 
		$inUser = $_POST["user"];
		$database = new Connection();
		$con = $database->openConnection();
	
		$stmt = $con->query("select date, info, project, debit, credit, balance, view from " . $inUser .  " where view % 2 = 0 order by id");
		while($row = $stmt->fetch()){
			$date = date_create($row["date"]);
			$row["date"] = date_format($date,"d-M-y");
			switch($row["view"])
			{
				case 2:
				case 4:
				case 6:
					$row["debit"] = number_format(0,2);
				break;

				case 8:
					$row["credit"] = number_format(0,2);
				break;
			}
			$data1[] = $row;
		}

		$resultData["daybook"] = $data1;
	
		$stmt = $con->query("select date, info, project, debit, credit, salbalance, view from " . $inUser .  " where view between 1 and 2 order by id");
		while($row = $stmt->fetch())
		{
			$date = date_create($row["date"]);
			$row["date"] = date_format($date,"d-M-y");
			$row["balance"] = $row["salbalance"];
			unset($row["salbalance"]);
			if($row["view"] == 2)
				$row["credit"] = number_format(0,2);
			$data2[] = $row;
		}

		$resultData["salbook"] = $data2;

		$stmt = $con->query("select date, info, project, debit, credit, salbalance, view from " . $inUser .  " where view between 3 and 4 order by id");
		while($row = $stmt->fetch())
		{
			$date = date_create($row["date"]);
			$row["date"] = date_format($date,"d-M-y");
			$row["balance"] = $row["salbalance"];
			unset($row["salbalance"]);
			if($row["view"] == 4)
				$row["credit"] = number_format(0,2);
			$data3[] = $row;
		}

		$resultData["spbbook"] = $data3;

		$stmt = $con->query("select date, info, project, debit, credit, salbalance, view from " . $inUser .  " where view between 6 and 8 order by id");
		while($row = $stmt->fetch())
		{
			$date = date_create($row["date"]);
			$row["date"] = date_format($date,"d-M-y");
			$row["balance"] = $row["salbalance"];
			unset($row["salbalance"]);
			if($row["view"] == 6)
				$row["credit"] = number_format(0,2);
			else
				$row["debit"] = number_format(0,2);
			$data4[] = $row;
		}

		$resultData["advbook"] = $data4;

		echo json_encode($resultData);
		$database->closeConnection();
	}
}
 
catch (PDOException $e)
{
    echo "There is some problem in connection: " . $e->getMessage();
 
}
 
?>
