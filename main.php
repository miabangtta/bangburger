<?php
use PHPMailer\phpmailer\phpmailer;
use phpmailer\phpmailer\exception;

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

  $mail_message = '
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

  $headers = "From: Администратор сайта Bangburger <mvmariya@bk.ru> \r\n".
  "MIME-Version: 1.0" . "\r\n" .
  "Content-type: text/html; charset=UTF-8". "\r\n";

  $mail = mail('bangtta@yandex.ru', 'Заказ', $mail_message, $headers);

  $data;

  if ($mail) {
    $data['status'] = "OK";
    $data['mes'] = "Ваш заказ принят. Приятного аппетита!";
  } else {
    $data['status'] = "No";
    $data['mes'] = "Не удалось отправить заказ. Пожалуйста, введите данные снова";
  }

  echo json_encode($data);
?>
