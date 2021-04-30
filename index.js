//Import

const express= require('express')

//config
const app = express();
const port = 4000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

let TODOLIST=[];

let tagmatch =[];

//logic
app.get('/',(req,res)=>{
    res.send("TO DO LIST");
});

app.get('/todo',(req,res)=>{
    res.send(TODOLIST);
})

app.post('/todo',(req,res)=>{
    let todo={}
    todo.task = req.body.task;
    todo.status = req.body.status;
    todo.tag = 'None';
    TODOLIST.push(todo);
    res.send("Task Added Successfilly");

});


app.patch('/todo',(req,res)=>{
    let taskupdate = TODOLIST.find(todo => todo.task===req.body.task);
    taskupdate.status = req.body.status;
    res.send("Task updated")
})

app.put('/todo',(req,res)=>{
    let tasktag = TODOLIST.find(todo => todo.task===req.body.task);
    tasktag.tag = req.body.tag;
    res.send("Task tag updated")
})

app.delete('/todo',(req,res)=>{
        // TODOLIST.pop(todo =>todo.task ===req.body.task);
        // res.send(`Task deleted`);
        // for(let i=0;i<TODOLIST.length;i++){
        //     if(TODOLIST[i][task] === req.body.task){
        //        let index = i;
        //     }
        // }

        var index = TODOLIST.map(function(e){return e.task;}).indexOf(req.body.task);
        
        TODOLIST.splice(index,1);
        res.send(`deleted`);
})

/*app.get('/tags',(req,res)=>{
    let tagname=req.body.tag;
    let len= TODOLIST.length;
    

    // for(let i=0;i<=len;i++){
    //     if(TODOLIST[i].tag===tagname)
    //     {
    //     res.send(TODOLIST[i].task);
    //     }
    // }
    let c=0;
    let tagm={}
    TODOLIST.forEach(i =>{
        
        if(i.tag===tagname)
        {
            tagmatch[c].name=i.task;
            c++;
            // tagm.name=i.task;
            // tagmatch.push(tagm);
        }
    })
    res.send(tagmatch);
    
});
*/

app.get('/tags',(req,res)=>{
    var matchtags = TODOLIST.filter(matchtags =>matchtags.tag ===req.body.tag);
    res.send(matchtags);
});
//listen
app.listen(port, ()=>{
    console.log(`App is listening at http://localhost:${port}`);
})
