import userApi from "./user.js"
import tasksApi from "./task.js"

const routers = (app) => {
    app.use("/user", userApi);
    app.use("/tasks", tasksApi)
}

export default routers