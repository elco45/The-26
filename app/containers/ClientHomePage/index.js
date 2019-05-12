import React from 'react';
import QRCode from 'qrcode.react';

export default function ClientHomePage() {
  return (
    <div>
      <QRCode value="http://facebook.github.io/react/" />,
    </div>
  );
}
