import AppNavBar from "../NavBar/AppNavBar"
import ProgressBar from "./ProgressBar"
import {TaskTabs} from "./TaskTable"
import { Footer } from "../Footer/Footer"

export const HomePage = () => {

    return (
        <>
            {/* <AddTask /> */}
            {/* <ProgressBar /> */}
            <TaskTabs />
            <Footer/>
        </>
    )
}