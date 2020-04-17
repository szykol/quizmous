const jwt = require('jsonwebtoken');
const fs = require('fs');
const toml = require('toml');
// const serial_file = fs.readFileSync('api/secrets.toml');
const serial_file = 'serial = "your-ultra-secret-key"'
const SERIAL = toml.parse(serial_file)

function wrap_payload(payload) {
    const token = jwt.sign(payload, SERIAL.serial);
    return token;
}

export default wrap_payload;