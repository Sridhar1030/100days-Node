use("crudDB")

db.createCollection("courses")

// !CREATE
// db.courses.insertOne({
//     name: "Java",
//     price:"100",
//     duration:"2 months"

// })

// db.courses.insertMany([
//     //add 4 objects
//     {
//         name: "Java",
//         price:"100",
//         duration:"2 months"
    
//     }
//     ,
//     {
//         name: "Python",
//         price:"100",
//         duration:"2 months"
    
//     },
//     {
//         name: "Node",
//         price:"1000",
//         duration:"1 months"
    
//     },
//     {
//         name: "React",
//         price:"1003",
//         duration:"5 months"
    
//     },

//     {
//         name: "comp",
//         price:"1001",
//         duration:"6 months"
    
//     },
//     {
//         name: "IT",
//         price:"1100",
//         duration:"1 months"
    
//     },
//     {
//         name: "CS",
//         price:"10210",
//         duration:"2 months"
    
//     }
//     ])



    // !READ
// let a = db.courses.find({price: "100"})
// console.log(a.toArray())

// let b = db.courses.findOne({price: "100"})
// console.log(b)

// !Update
db.courses.updateOne({price:"1000"},{$set:{price:0}})
db.courses.updateMany({price:"100"},{$set:{price:0}})

// !Delete

db.courses.deleteMany({price:"1000 "})