import AppNavBar from "../NavBar/AppNavBar"
import AddTask from "./AddTask"
import {TaskTabs} from "./TaskTable"

export const HomePage = () => {

    return (
        <>
            {/* <AppNavBar/> */}
            <AddTask />
            {/* <ProgressBar /> */}
            {/* <AddTask /> */}
            <TaskTabs />
        </>
    )
}