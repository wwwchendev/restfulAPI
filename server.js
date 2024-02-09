const express = require("express");
const cors = require("cors");
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json'); // 與swagger.js的輸出設定一致
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());
app.use(cors());

let tasks = [
    { id: 1, task: "舉辦一場空氣吉他比賽，看看誰能演奏得最好。", completed: true },
    { id: 2, task: "每天健身計畫：下樓，上健身房，完成！", completed: true },
    { id: 3, task: "在浴室舉辦演唱會，讓鄰居也能聆聽。", completed: false },
    { id: 4, task: "房間整理：找到地板，藏起所有雜物！", completed: false },
    { id: 5, task: "試著在貓咪睡覺時偷摸牠的肚子且不被識破。", completed: false },
];

// 取得任務清單
app.get("/api/tasks", (req, res) => {
    res.json(tasks);
});
/* async function fetchTasks() {
    try {
        const response = await fetch("/api/tasks");
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error("發生錯誤:", error);
    }
}
*/


// 新增任務
app.post("/api/tasks", (req, res) => {
    const newTask = { id: tasks.length + 1, ...req.body, completed: false };
    tasks.push(newTask);

    console.log(tasks);
    res.json(newTask);
});
/* async function addTask(description) {
    try {
        const response = await fetch("/api/tasks", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ description })
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("發生錯誤:", error);
        throw error;
    }
}
*/

// 更改任務完成狀態
app.patch("/api/tasks/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = tasks.findIndex((task) => task.id === id);
    const task = tasks[index];
    task.completed = req.body.completed;

    res.json(task);
});
/* async function updateTaskStatus(id, completed) {
    try {
    const response = await fetch(`/api/tasks/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed })
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log(data);
    } catch (error) {
        console.error("發生錯誤:", error);
    }
}  
*/

// 刪除特定任務
app.delete("/api/tasks/:id", (req, res) => {
    const id = parseInt(req.params.id);
    tasks = tasks.filter((task) => task.id !== id);

    res.json({ id });
});
/*async function deleteTask(id) {
    try {
        const response = await fetch(`/api/tasks/${id}`, {
        method: "DELETE"
        });
        if (!response.ok) {
        throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error("發生錯誤:", error);
    }
}
*/

app.listen(5000, () => console.log("Server running on port 5000"));
