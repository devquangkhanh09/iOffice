const { v4: uuid } = require('uuid');
const QRCode = require('qrcode');

var code;

const generateQRCode = async () => {
    code = uuid();
    try {
        await QRCode.toFile(`./qr.png`, code);
        console.log(`QR code generated: ${code}`);
    } catch (err) {
        console.error(err);
    }
};

const getCode = () => {
    return code;
};

module.exports = {
    generateQRCode,
    getCode,
};