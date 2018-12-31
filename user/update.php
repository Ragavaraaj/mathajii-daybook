<?php
 
include_once ('connection.php');

function change($con,$inProject,$inAmt,$noAdj)
{
	$querry_p = "update project set " . $inProject . " = ? where id = 1";
	$stmt_p = $con->prepare($querry_p);
	$prestmt_p = $con->query("select * from project");
	$preRes_p = $prestmt_p->fetch();
	$inP = $preRes_p[$inProject];
	if($noAdj)
		$stmt_p->execute(array($inP+$inAmt));
	else
		$stmt_p->execute(array($inP-$inAmt));
	echo "success";
}
 
try 
{
	if ($_SERVER['REQUEST_METHOD'] == 'POST') 
	{ 
		$inPar = $_POST["Par"]; 
		$inAmt = $_POST["amount"];
		$inFlag = $_POST["flag"];
		$inUser = $_POST["user"];
		$inAdj = $_POST["adjustment"];
		$inProject = "p" . $_POST["project"];
		$database = new Connection();
		$con = $database->openConnection();
		$prestmt = $con->query("select * from " . $inUser . " order by id desc limit 1");
		$preRes = $prestmt->fetch();
		$querry = "insert into " . $inUser . "(date,info,project,debit,credit,balance,salbalance,view) values(CURRENT_DATE,?,?,?,?,?,?,?)";
		if($preRes == null )
		{	
			$start = $con->prepare($querry);
			$start->execute(array("start",0,0,0,0,5));
			$prestmt = $con->query("select * from " . $inUser . " order by id desc limit 1");
			$preRes = $prestmt->fetch();
		}
		$stmt= $con->prepare($querry);
		if($inFlag == "deb")
		{
			if($inAdj == "no")
			{
				$stmt->execute(array($inPar,$inProject,$inAmt,0,($preRes['balance']+$inAmt),$preRes['salbalance'],0));
				echo "success";
			}
			else
			{
				$stmt->execute(array($inPar,$inProject,0,$inAmt,($preRes['balance']-$inAmt),$preRes['salbalance'],0));
				echo "success";
			}
		}
		else if($inFlag == "cre")
		{
			if($inAdj == "no")
			{
				$stmt->execute(array($inPar,$inProject,0,$inAmt,($preRes['balance']-$inAmt),$preRes['salbalance'],0));
				change($con,$inProject,$inAmt,1);
			}
			else
			{
				$stmt->execute(array($inPar,$inProject,$inAmt,0,($preRes['balance']+$inAmt),$preRes['salbalance'],0));
				change($con,$inProject,$inAmt,0);
			}
		}
		else if($inFlag == "info") 
		{
			$stmt->execute(array($inPar,null,0,0,$preRes['balance'],$preRes['salbalance'],0));
			echo "success";
		}
		else if($inFlag == "salb") 
		{
			$stmt->execute(array($inPar,null,0,$inAmt,$preRes['balance'],($preRes['salbalance']-$inAmt),2));
			echo "success";
		}
		else if($inFlag == "salw") 
		{
			$stmt->execute(array($inPar,null,$inAmt,$inAmt,($preRes['balance']-$inAmt),($preRes['salbalance']+$inAmt),1));
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
