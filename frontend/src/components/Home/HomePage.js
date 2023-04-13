import AppNavBar from "../NavBar/AppNavBar"
import ProgressBar from "./ProgressBar"
import AddTask from "./AddTask"
import {TaskTabs} from "./TaskTable"

export const HomePage = () => {

    return (
        <>
            <AppNavBar />
            <AddTask />
            {/* <ProgressBar /> */}
            <TaskTabs />
        </>
    )
}