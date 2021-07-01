import fs from 'fs';
import path from 'path';

export default function updateHandler(req, res) {

    const list = req.body == '[]' ? [] : JSON.parse(req.body);






    console.log('update -> list:', list);

    const filePath = path.resolve(__dirname, '..', '..', '..', '..', 'public', 'iptvlist.txt');
    const jsonPath = path.resolve(__dirname, '..', '..', '..', '..', 'public', 'iptvlist.json');

    console.log("DIRECTORY: ***==============================================***");

    fs.readdir(path.resolve(__dirname, '..', '..', '..', '..', 'public'), (err, files) => {
        files.forEach(file => {
            console.log(file);
        });
    });

    console.log("DIRECOTYR END: ***=========================================***");

    let fileContent = '#EXTM3U\n';
    list.forEach(item => {
        fileContent += `#EXTINF:0, ${item.name}\n`;
        fileContent += `${item.href}\n`;
    });

    console.log('fileContent:', fileContent);

    fs.writeFile(filePath, fileContent, (err) => {
        if (err) console.log('kek in .txt writeFile()')
            // return res.status(500).json({ error: err.message });
    });

    fs.writeFile(jsonPath, req.body, 'utf8', (err) => {
        if (err) console.log('kek in .json writeFile()')
            // return res.status(500).json({ error: err.message });
    });

    return res.status(200).json({ success: true });
}
