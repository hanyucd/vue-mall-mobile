let fs = require('fs');
let filePath = '../resource/old_goods.json';


/**
 * 过滤 json 数据
 */
const handleFile = (filePath) => {
  fs.readFile(filePath, 'utf8', (error, data) => {
    if (error) return;

    let tempData = JSON.parse(data);
    let count = 0; // 计数
    let newData = [];
    tempData.RECORDS.forEach(item => {
      if (item.IMAGE1 !== null) {
        count++;
        newData.push(item);
      }
    });
    console.log(`处理后共数据: ${ count } 条`);
    fs.writeFile('../resource/goods.json', JSON.stringify(newData), error => {
      (!error) ? console.log('写文件操作成功！') : console.log('写文件操作失败！');
    });
  });
}

handleFile(filePath);