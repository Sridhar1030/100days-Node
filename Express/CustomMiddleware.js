const express = require("express");




const mymiddlwareFunction = require("./middlewares/middle")
const mymiddlwareFunction2 = require("./middlewares/middle2")
const app = express();

app.use(express.json());


app.use(mymiddlwareFunction)

app.use(mymiddlwareFunction2)

let courses = [
  { id: 1, name: "JavaScript" },
  { id: 2, name: "Python" },
  { id: 3, name: "Java" },
  { id: 4, name: "C++" },
];

app.get("/", (req, res) => {
  res.send("Middleware homepage");
});


app.get("/courses", (req,res)=>{
    res.send(courses)
});

app.post("/course",(req,res)=>{
    const courses ={
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(courses)
    res.send(course)
})


const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
