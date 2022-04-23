const courseRoute = require('express').Router()

const {} = require('../routes/test')

const {Note, validateCourse} = require('../routes/test')

let courses = [
    {id: 1 , name : "course"},
    {id: 2 , name : "course2"},
    {id: 3 , name : "course3"},
]


courseRoute.get('/all' , async (request, response)=>{


    const pageNumber = request.query.page;

    let totalPage = await Note.find().count()
    let lastPage = totalPage/10

    // let result = await Note.find()
    //     .skip((pageNumber-1)*10)
    //     .limit(10)
    //     .sort({title:0})
    //     .then(result => response.send(JSON.stringify({page: pageNumber,
    //     total: totalPage, data:result, lastPage: parseInt(lastPage+1)})))
    //     .catch(error => response.send(error))


    let result = await Note.find({} , {'_id':0 , '__v':0})
        .or([{title:"Title 5"}, {value: false}])

        .then(result => response.send(JSON.stringify(result)))
        .catch(error => response.send(error))
})

courseRoute.put("/update/:id", async (request , response)=>{

    let result = Note.findByIdAndUpdate({'_id': request.params.id},
        {$set:{
            title: request.body.title
            }}, {returnOriginal:false})
        .then(result => response.send(JSON.stringify(result)))
        .catch(error => response.send(error))

})

courseRoute.delete('/delete/:id' , async (request , response)=>{

    let result = await Note.findByIdAndRemove({'_id':request.params.id}, {returnOriginal:true})
        .then(result => response.send(JSON.stringify(result.value)))
        .catch(error => response.send(JSON.stringify({status:"Item Already Deleted"})))
})


courseRoute.post('/add' , async (request , response) => {

    let validateResult = validateCourse(request.body)
    if (validateResult.error) return response.send(JSON.stringify({"error": validateResult.error.message}))


    let note = Note({
        title: request.body.title,
        author: request.body.author,
        value: request.body.value
    })
    await note.save().then(result => response.send("done")).catch(error=> response.send(error))



})


courseRoute.get("/api/allcourse", (req , res)=>{
    res.send(JSON.stringify(courses))
})

courseRoute.get("/:id", (req , res)=>{
    let result= courses.find(args => args.id === parseInt(req.params.id))
    if (!result) res.status(404).send("Course not found")
    res.send(JSON.stringify(result))
})

courseRoute.post('/api/course', (req , res)=>{

    let {error} =  validateCourse(req.body)
    if (error) return res.status(404).send(error.details[0].message)

    let course = {
        id: courses.length+1,
        name: req.body.name
    }
    courses.push(course)
    res.send(JSON.stringify(courses))

})

courseRoute.put("/api/course/:id" , (req , res) =>{

    let {error} =  validateCourse(req.body)
    if (error) return res.status(404).send(error.details[0].message)

    let course= courses.find(args => args.id === parseInt(req.params.id))
    if (!course) return res.status(404).send("Course not found")
    course.name = req.body.name;
    res.send(course)

})

courseRoute.delete("/api/course/:id" , (req , res)=>{
    let course = courses.find(args => args.id === parseInt(req.params.id))
    if (!course) return res.status(404).send("Not found")
    let index = courses.indexOf(course)
    courses.splice(index , 1)
    res.send(course)
})


module.exports = courseRoute