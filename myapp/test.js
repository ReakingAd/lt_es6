const fs = require('fs');

// fs.readFile('package.json',(err,docs) => {
//     console.log( docs.toString() );
//     fs.writeFile('p2.json',docs,err => {
//         if(err){
//             console.log(err);
//         }
//         else{
//             console.log('done');
//         }
//     })
// });

try{
    let readStream = fs.createReadStream('package1.json');
    let writeStream = fs.createWriteStream('p2.json');
    console.log('begin')
    readStream.pipe(writeStream);
    console.log('done')
}catch(err){
    console.log("================== " + err.name);
}


process.on('uncaughtException',err => {
    console.log('ddddddddddddddddd : ' + err.name)
})