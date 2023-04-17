import {TaskTabs} from "./TaskTable"
import Announcements from "./Announcements"
import {useEffect, useState} from "react"

export const HomePage = () => {
    const [announcements, setAnnouncements] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3001/table/Announcements`)
            .then(res => res.json())
            .then(data => setAnnouncements(data))
    }, [])

    return (
        <>
            <Announcements annArray={announcements}/>

            <TaskTabs />
        </>
    )
}