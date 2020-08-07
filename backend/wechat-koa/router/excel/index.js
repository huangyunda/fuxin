const pool = require('../../pool');
const { tableName } = require('../../config');
const xlsx = require('node-xlsx');
const fs = require('fs');

async function upload(ctx) {
  try {
    const file = ctx.request.files.file;
    const buffer = xlsx.parse(fs.readFileSync(file.path));
    const { data } = buffer[0];
    const values = [];
    for (let i = 1; i < data.length; i++) {
      const phone = data[i][1].toString().trim();
      if (!data[i][0] || !(/^1[3-9]\d{9}$/.test(phone))) continue;
      values.push([data[i][0].toString(), phone]);
    }
    console.log(values);
    await pool.query(`INSERT INTO ${tableName}(name, phone) VALUES ?`, [values]);
    ctx.body = { success: true };
  } catch(e) {
    console.log('error', e);
    ctx.body = { success: false };
  }
}

async function download(ctx) {
  ctx.attachment('模板.xlsx');
  ctx.body = fs.readFileSync(`${__dirname}/example.xlsx`);
}

module.exports = { upload, download };