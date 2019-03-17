<?php
 
include_once ('connection.php');
date_default_timezone_set('IST');
$date = new DateTime();
$date->setTimeZone(new DateTimeZone("UTC"));
$date->add(new DateInterval('P0DT5H30M'));
$IST = $date->format('Y-m-d H:i:s');

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
		$inWork = $_POST["work"];
		$inFlag = $_POST["flag"];
		$inUser = $_POST["user"];
		$inAdj = $_POST["adjustment"];
		$inProject = "p" . $_POST["project"];
		$database = new Connection();
		$con = $database->openConnection();
		$prestmt = $con->query("select * from " . $inUser . " order by id desc limit 1");
		$preRes = $prestmt->fetch();
		$querry = "insert into " . $inUser . "(date,info,project,debit,credit,balance,salbalance,specialbonus,saladvanace,view) values(?,?,?,?,?,?,?,?,?,?)";
		if($preRes == null )
		{	
			$start = $con->prepare($querry);
			$start->execute(array($IST,"start",0,0,0,0,0,0,0,-1));
			$prestmt = $con->query("select * from " . $inUser . " order by id desc limit 1");
			$preRes = $prestmt->fetch();
		}
		$stmt= $con->prepare($querry);

		switch ($inFlag)
		{
			case "deb":
				if($inAdj == "no")
				{
					$stmt->execute(array($IST,$inPar,null,$inAmt,0,($preRes['balance']+$inAmt),$preRes['salbalance'],$preRes['specialbonus'],$preRes['saladvanace'],0));
					$database->closeConnection();
					echo "success";
				}
				else
				{
					$stmt->execute(array($IST,$inPar,null,0,$inAmt,($preRes['balance']-$inAmt),$preRes['salbalance'],$preRes['specialbonus'],$preRes['saladvanace'],0));
					$database->closeConnection();
					echo "success";
				}
			break;

			case "cre":
				if($inAdj == "no")
				{
					$stmt->execute(array($IST,$inPar,$inProject,0,$inAmt,($preRes['balance']-$inAmt),$preRes['salbalance'],$preRes['specialbonus'],$preRes['saladvanace'],0));
					change($con,$inProject,$inAmt,1);
					$database->closeConnection();
				}
				else
				{
					$stmt->execute(array($IST,$inPar,$inProject,$inAmt,0,($preRes['balance']+$inAmt),$preRes['salbalance'],$preRes['specialbonus'],$preRes['saladvanace'],0));
					change($con,$inProject,$inAmt,0);
					$database->closeConnection();
				}
			break;

			case "info":
				$stmt->execute(array($IST,$inPar,null,0,0,$preRes['balance'],$preRes['salbalance'],$preRes['specialbonus'],$preRes['saladvanace'],0));
				$database->closeConnection();
				echo "success";
			break;

			case "salb":
				if($inWork == "yes")
				{
					$stmt->execute(array($IST,$inPar,null,0,$inAmt,$preRes['balance'],($preRes['salbalance']-$inAmt),$preRes['specialbonus'],$preRes['saladvanace'],1));
					$database->closeConnection();
					echo "success";
				}
				else
				{
					$stmt->execute(array($IST,$inPar,null,0,0,$preRes['balance'],$preRes['salbalance'],$preRes['specialbonus'],$preRes['saladvanace'],1));
					$database->closeConnection();
					echo "success";
				}

			break;

			case "salw":
				$stmt->execute(array($IST,$inPar,null,$inAmt,$inAmt,($preRes['balance']-$inAmt),($preRes['salbalance']+$inAmt),$preRes['specialbonus'],$preRes['saladvanace'],2));
				$database->closeConnection();
				echo "success";
			break;

			case "ssalb":
				$stmt->execute(array($IST,$inPar,null,0,$inAmt,$preRes['balance'],$preRes['salbalance'],($preRes['specialbonus']-$inAmt),$preRes['saladvanace'],3));
				$database->closeConnection();
				echo "success";
			break;

			case "ssalw":
				$stmt->execute(array($IST,$inPar,null,$inAmt,$inAmt,($preRes['balance']-$inAmt),$preRes['salbalance'],($preRes['specialbonus']+$inAmt),$preRes['saladvanace'],4));
				$database->closeConnection();
				echo "success";
			break;

			case "asalb":
				$stmt->execute(array($IST,$inPar,null,$inAmt,$inAmt,($preRes['balance']-$inAmt),$preRes['salbalance'],$preRes['specialbonus'],($preRes['saladvanace']+$inAmt),6));
				$database->closeConnection();
				echo "success";
			break;

			case "asalw":
				$stmt->execute(array($IST,$inPar,null,$inAmt,$inAmt,($preRes['balance']+$inAmt),$preRes['salbalance'],$preRes['specialbonus'],($preRes['saladvanace']-$inAmt),8));
					$database->closeConnection();
					echo "success";
			break;

			default:
				$database->closeConnection();
				echo "fail";
			break;

		}	
	}
}
 
catch (PDOException $e)
{
    echo "There is some problem in connection: " . $e->getMessage();
 
}
 
?>
