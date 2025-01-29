import xlsx from 'node-xlsx';
import * as fs from "node:fs";
import * as path from "node:path";

const folderName = './docs';

try {
    const files = fs.readdirSync(folderName);
    const parsedData = []
    for (const file of files) {
        if (/^\./.test(file)) continue;
        const fileData = xlsx.parse(fs.readFileSync(path.resolve(folderName, file)))
        // console.log('file', file)
        // console.log(fileData);

        fileData.forEach(sheet => {
            if (!sheet?.data) return;
            // console.log('sheet', sheet);
            sheet.data.forEach(row => {
                // console.log('row', row)
                row.forEach(cell => {
                    // console.log('cell', cell)
                    if (!/@\w+\.\w+/m.test(cell)) return
                    // console.log(cell.replaceAll(/\n+|\r+/g, ' '));
                    parsedData.push(cell.replaceAll(/\n+|\r+/g, ' '));
                })
            })
        })
        // break
        fs.writeFileSync(path.resolve( 'data.csv'), parsedData.join('\n'));
    }
} catch (err) {
    console.error(err);
}
