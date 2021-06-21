<?php
//get data from form  
$name = $_POST['name'];
$email= $_POST['email'];
$to = "arthurvolpb@gmail.com";
$subject = "Mail From website";
$txt ="Name = ". $name . "\r\n  Email = " . $email;
if($email!=NULL){
    mail($to,$subject,$txt);
}
//redirect
//header("Location:thankyou.html");
?>