import AppNavBar from "../NavBar/AppNavBar"
import ProgressBar from "./ProgressBar"
import {TaskTabs} from "./TaskTable"

export const HomePage = () => {

    return (
        <>
            <AppNavBar />
            {/* <ProgressBar /> */}
            <TaskTabs />
        </>
    )
}