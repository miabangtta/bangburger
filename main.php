<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/exception.php';
require 'phpmailer/phpmailer.php';
require 'phpmailer/smtp.php';

$name = $_POST['user-name'];
$phone = $_POST['phone'];
$street = $_POST['street'];
$build = $_POST['build'];
$block = $_POST['block'];
$flat = $_POST['flat'];
$floor = $_POST['floor'];
$comment = $_POST['comment'];
$payby = $_POST['payby'];
$dontcall = $_POST['dontcall'];
$dontcall = isset($dontcall) ? 'НЕТ' : 'ДА';

$mail = new PHPMailer(true);                              // Passing `true` enables exceptions

    //Server settings                              // Enable verbose debug output
    $mail->isSMTP();                                      // Set mailer to use SMTP
    $mail->Host = 'smtp.mail.ru';  // Specify main and backup SMTP servers
    $mail->SMTPAuth = true;                               // Enable SMTP authentication
    $mail->Username = 'testovynoreply@mail.ru';                 // SMTP username
    $mail->Password = '13580bggg.rU';                           // SMTP password
    $mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
    $mail->Port = 465;                                    // TCP port to connect to

    //Recipients
    $mail->setFrom('testovynoreply@mail.ru', 'Mailer');
    $mail->addAddress('testovynoreply@mail.ru', 'Joe User');     // Add a recipient
              // Name is optional
    $mail->addReplyTo('testovynoreply@mail.ru', 'Information');

    //Content
    $mail->isHTML(true);                                  // Set email format to HTML
    $mail->Subject = 'Заказ';
    $mail->Body = '
    <html>
      <head>
        <title>Заявка</title>
      </head>
      <body>
        <h2>Заказ</h2>
        <ul>
          <li>Имя:'  . $name . '</li>
          <li>Номер телефона:'  . $phone . '</li>
          <li>Улица:'  . $street . '</li>
          <li>Дом:'  . $build . '</li>
          <li>Корпус:'  . $block . '</li>
          <li>Квартира:'  . $flat . '</li>
          <li>Этаж:'  . $floor . '</li>
          <li>Комментарий:'  . $comment . ' </li>
          <li>Оплата: ' . $payby . '</li>
          <li>Нужно ли перезвонить: ' . $dontcall . '</li>
        </ul>
      </body>
    </html>';
    $mail->AltBody = '
       Заказ
       Имя:'  . $name . '
       Номер телефона:'  . $phone . '
       Улица:'  . $street . '
       Дом:'  . $build . '
       Корпус:'  . $block . '
       Квартира:'  . $flat . '
       Этаж:'  . $floor . '
       Комментарий:'  . $comment . '
       Оплата: ' . $payby . '
       Нужно ли перезвонить: ' . $dontcall . '
      ';

  $data;

  if ($mail->send()) {
    $data['status'] = "OK";
    $data['mes'] = "Ваш заказ принят. Приятного аппетита!";
  } else {
    $data['status'] = "No";
    $data['mes'] = "Не удалось отправить заказ. Пожалуйста, повторите попытку";
  }

  echo json_encode($data);
?>
