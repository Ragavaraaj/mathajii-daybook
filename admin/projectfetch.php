<?php
 
include_once ('connection.php');
 
$resultData [] = null;

try 
{
	if ($_SERVER['REQUEST_METHOD'] == 'POST') 
	{ 
		$inUser = $_POST["user"];
		$inType = $_POST["type"];
		$database = new Connection();
		$con = $database->openConnection();
        $stmt = $con->query("select * from project");
			while($row = $stmt->fetch())
                $data[] = $row;
        $database->closeConnection();
        echo json_encode($data);
    }
}

catch (PDOException $e)
{
    echo "There is some problem in connection: " . $e->getMessage();
 
}
?>