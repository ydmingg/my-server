const express = require("express");

const app = express()

const STU_ARR = [
    { id: "1", name: "张三", age: 12, gender: "男", address: "李家庄" },
    { id: "2", name: "李四", age: 20, gender: "女", address: "李家庄" },
    { id: "3", name: "王五", age: 40, gender: "男", address: "李家庄" },

]


// 定义学生信息的路由
app.get('/students', (req, res) => {
    console.log("asdfasdfasdf");
    // 返回学生信息
    res.send({
        status: "ok",
        data: STU_ARR
    })

})

// 引入中间件
app.use(express.urlencoded({ extended: true }));

// 引入中间件
app.use(express.json({ extended: true }));


// 定义添加学生信息的路由
app.post("/students", (req, res) => { 
    console.log("555555",req.body);
    // 获取学生的信息  
    const { name, age, gender, address } = req.body

    // 创建学生信息
    const stu = {
        id: +STU_ARR.at(-1).id + 1 + "",
        name,
        age:+age,
        gender,
        address
    }
    
    // 将学生信息添加到数组
    STU_ARR.push(stu)

    // 添加成功，给前端返回
    res.send({
        status: "ok",
        data: stu
    })
    
})

// 查询某个学生的路由
app.get('/students/:id', (req, res) => {
    // 获取学生信息
    const id = req.params.id
    const stu = STU_ARR.find(item => item.id === id)

    res.send({
        status: "ok",
        data: stu
    })

})

// 定义删除学生的路由
app.delete("/students/:id", (req, res) => { 
    // 获取学生的id
    const id = req.params.id
    // 遍历数组
    for (let i = 0; i < STU_ARR.length; i++) {
        if (STU_ARR[i].id === id) {
            const delStu = STU_ARR[i]
            STU_ARR.splice(i, 1)
            // 返回
            res.send({
                status: "ok",
                data: delStu
            })
            return
        }
        
    }

    // 如果执行到这里，说明没有着学生(并设置状态码403)
    res.status(403).send({
        statis: "error",
        data: "学生id不存在"
    })
})

// 定义一个修改学生的路由(将id通过请求体一块传)
app.put("/students", (req, res) => { 
    // 获取数据
    const { id, name, age, gender, address } = req.body

    // 根据id查询学生
    const updataStu = STU_ARR.find(item => item.id === id)
    
    // 判断学生是否存在
    if (updataStu) {
        updataStu.name = name
        updataStu.age = age
        updataStu.gender = gender
        updataStu.address = address
        // 返回数据
        res.send({
            statis: "ok",
            data: updataStu
        })
    } else { 
        res.status(403).send({
            statis: 'error',
            data: "学生id不存在"
        })
    }
    



})



// 定义一个修改学生的路由
// app.put()




app.listen(4000,()=>{
    console.log("服务器已经启动");
})