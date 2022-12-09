// Use of core libraries
const os = require("os");
const path = require("path");
const fs = require("fs"); // file ko naam sanga deal garne package
const fsPromises = require("fs").promises;

//working with promises
fsPromises
  .readFile("./example.txt", "utf-8")
  // if sucess .then
  .then((data) => {
    console.log(data);
    fsPromises
      .writeFile("./reply.txt", data)
      .then(() => {
        console.log("write complete");
      })
      .catch((err) => {
        console.error(err);
      });
  })
  // if failure .catch
  .catch((err) => {
    console.error(err);
  });


// Working with Async Await
const fileOperations = async () => {
  try {
    data = await fsPromises.readFile(path.join(__dirname,'example.txt'), "utf-8");
    await fsPromises.writeFile('./reply.txt', data)
    await fsPromises.appendFile('./reply.txt','\nThis looks better')

    console.log(data);
    
  } catch (err) {
    console.error(err)

    
  }
  
} 
fileOperations();





fs.readFile("./example.txt", "utf-8", (err, data) => {
  if (err) console.error(err);

  fs.writeFile("./reply.txt", data, (err) => {
    if (err) console.error(err);

    fs.appendFile("./reply.txt", "\nGood to see you", (err) => {
      if (err) console.error(err);

      fs.rename("./reply.txt", "demo.txt", (err) => {
        if (err) console.log(err);
      });
    });
  });
});

fs.writeFile("./reply.txt", "This is wonderful", (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("Write Complete");
});
console.log("Testing testing");

data  = fs.readFileSync('./example.txt', 'utf-8')
console.log(data. toString())

console.log(os.version())
console.log(os.type())
console.log(os.homedir())

console.log(__dirname)
console.log(__filename)
console.log(path.parse(__filename).ext)
console.log(path.basename(__filename))
