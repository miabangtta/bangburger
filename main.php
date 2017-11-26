<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/Exception.php';
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';

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
try {
    //Server settings                              // Enable verbose debug output
    $mail->isSMTP();                                      // Set mailer to use SMTP
    $mail->Host = 'smtp.mail.ru';  // Specify main and backup SMTP servers
    $mail->SMTPAuth = true;                               // Enable SMTP authentication
    $mail->Username = 'testovynoreply@mail.ru';                 // SMTP username
    $mail->Password = '13580bggg.rU';                           // SMTP password
    $mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
    $mail->Port = 465;                                    // TCP port to connect to

    //Recipients
    $mail->setFrom('testovynoreply@mail.ru', 'Mailer');
    $mail->addAddress('miabangtta@yandex.ru', 'Joe User');     // Add a recipient
              // Name is optional
    $mail->addReplyTo('testovynoreply@mail.ru', 'Information');

    //Attachments
    $mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments

    //Content
    $mail->isHTML(true);                                  // Set email format to HTML
    $mail->Subject = 'Заказ';
    $mail->Body    = '
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
    $data['mes'] = "Не удалось отправить заказ. Пожалуйста, введите данные снова";
  }

  echo json_encode($data);
?>
