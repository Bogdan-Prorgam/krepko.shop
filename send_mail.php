<?php
//Import PHPMailer classes into the global namespace
//These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

//Load Composer's autoloader
require 'phpmailer/Exception.php';
require 'phpmailer/PHPMailer.php';

//Create an instance; passing `true` enables exceptions
$mail = new PHPMailer(true);

try {
    //Server settings
    $mail->CharSet = 'UTF-8';
    // $mail->Host       = 'smtp.example.com';                     //Set the SMTP server to send through
    // $mail->Username   = 'info@krepko.shop';                     //SMTP username
    $mail->Password   = 'GoodKrepko001';                               //SMTP password
    $mail->Port       = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

    //Recipients
    $mail->setFrom('info@krepko.shop', 'krepko.shop');
    $mail->addAddress($_POST["email"]);               //Name is optional

    //Content
    $mail->isHTML(true);                                  //Set email format to HTML
    $mail->Subject = $_POST["sub"];
    $mail->Body    = $_POST["text"];
    $mail->AltBody = '';

    $mail->send();
    $message['mes'] = '<p style="color: #48a148;font-size: 16px; font-family: \'Montserrat\', sans-serif; text-align: center;font-weight: 600;margin: 0;padding: 20px;">Ваш заказ успешно отправлен на обработку, в ближайшее время наш менеджер с вами свяжется!</p>';
    echo json_encode($message);
} catch (Exception $e) {
    $message['mes'] = '<p style="color: rgb(249 58 0);font-size: 16px; font-family: \'Montserrat\', sans-serif; text-align: center;font-weight: 600;margin: 0;padding: 20px;">Заказ к сожалению не удалось оформить, пожалуйста попробуйте еще раз или чуть позже:</p>';
    echo json_encode($message);
}
