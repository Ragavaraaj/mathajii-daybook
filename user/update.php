<?php
 
include_once ('connection.php');
 
try 
{
	if ($_SERVER['REQUEST_METHOD'] == 'POST') 
	{ 
		$inPar = $_POST["Par"]; 
		$inAmt = $_POST["amount"];
		$inFlag = $_POST["flag"];
		$inUser = $_POST["user"];
		$database = new Connection();
		$con = $database->openConnection();
		$prestmt = $con->query("select * from " . $inUser . " order by id desc limit 1");
		$preRes = $prestmt->fetch();
		$querry = "insert into " . $inUser . "(date,info,debit,credit,balance,salbalance,view) values(CURRENT_DATE,?,?,?,?,?,?)";
		if($preRes == null )
		{	
			$start = $con->prepare($querry);
			$start->execute(array("start",0,0,0,0,5));
			$prestmt = $con->query("select * from " . $inUser . " order by id desc limit 1");
			$preRes = $prestmt->fetch();
		}
		$stmt= $con->prepare($querry); //Fetching all the records with input credentials
		if($inFlag == "deb")
		{
			$stmt->execute(array($inPar,$inAmt,0,($preRes['balance']+$inAmt),$preRes['salbalance'],0));
			echo "success";
		}
		else if($inFlag == "cre")
		{
			$stmt->execute(array($inPar,0,$inAmt,($preRes['balance']-$inAmt),$preRes['salbalance'],0));
			echo "success";
		}
		else if($inFlag == "info") 
		{
			$stmt->execute(array($inPar,0,0,$preRes['balance'],$preRes['salbalance'],0));
			echo "success";
		}
		else if($inFlag == "salb") 
		{
			$stmt->execute(array($inPar,0,$inAmt,$preRes['balance'],($preRes['salbalance']-$inAmt),2));
			echo "success";
		}
		else if($inFlag == "salw") 
		{
			$stmt->execute(array($inPar,$inAmt,$inAmt,($preRes['balance']-$inAmt),($preRes['salbalance']+$inAmt),1));
			echo "success";
		}
		else
			echo "fail";
		$database->closeConnection();
	}
}
 
catch (PDOException $e)
{
    echo "There is some problem in connection: " . $e->getMessage();
 
}
 
?>
