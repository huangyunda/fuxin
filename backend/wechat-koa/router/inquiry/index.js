const pool = require('../../pool');
const { tableName } = require('../../config');

async function inquiry(ctx) {
  try {
    const { name, phone, startDate, endDate } = ctx.request.body;
    const items = await pool.query(
      `SELECT * FROM ${tableName} WHERE name LIKE ? and phone LIKE ? and date BETWEEN ? AND ?`, 
      [`%${name}%`, `%${phone}%`, startDate, endDate]
    );
    ctx.body = { 
      success: true, 
      data: items.map(({ id, name, phone, date }) => ({ 
        id,
        name: name[0] + '*'.repeat(name.length - 1),
        phone: phone.slice(0, 3) + '*'.repeat(4) + phone.slice(7),
        date
      })) 
    };
  } catch(e) {
    console.log('error', e);
    ctx.body = { success: false, message: '查询失败，请稍后重试！' };
  }
}

module.exports = { inquiry };
