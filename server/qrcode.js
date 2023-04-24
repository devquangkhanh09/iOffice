const { v4: uuid } = require('uuid');
const QRCode = require('qrcode');

const code = uuid();

const generateQRCode = async () => {
    try {
        await QRCode.toFile(`./qr.png`, code);
        console.log(`QR code generated`);
    } catch (err) {
        console.error(err);
    }
};

module.exports = {
    generateQRCode,
    code
};