const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {

  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname;

  if (req.method === "GET" && pathname === "/") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Welcome to Notes API");
  }

  else if (req.method === "GET" && pathname === "/notes") {
    fs.readFile("./notes.json", "utf8", (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end("Error");
      } else {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(data);
      }
    });
  }

  else if (req.method === "POST" && pathname === "/notes") {

    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      const newNote = JSON.parse(body);

      fs.readFile("./notes.json", "utf8", (err, data) => {
        if (err) {
          res.writeHead(500);
          res.end("Error");
        } else {
          const notes = JSON.parse(data);
          notes.push(newNote);

          fs.writeFile("./notes.json", JSON.stringify(notes), () => {
            res.writeHead(201, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Note added" }));
          });
        }
      });
    });
  }

});

server.listen(4000, () => {
  console.log("Server running ");
});