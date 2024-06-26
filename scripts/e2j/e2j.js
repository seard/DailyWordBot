/*
Run this script to convert the Excel file to JSON
*/

const readXlsxFile = require('read-excel-file/node')
var fs = require('fs');

readXlsxFile('verse-data.xlsx').then((rows) => {
  const row = rows[0];

  let newJson = [];

  rows.forEach(row => {
    const date =

    newJson.push({
      postNumber: row[0],
      verses: row[1].split(";").map(verse => verse.trim().replace(/\./g, "")),
      date: new Date(row[2]),
      books: row[3].split(";"),
      references: row.slice(4).filter(ref => ref != null)
    });
  });

  fs.writeFile('verse-data.json', JSON.stringify(newJson), 'utf8', () => { console.log("Done!"); });
})
