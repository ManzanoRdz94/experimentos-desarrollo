import React, { useEffect, useState } from "react";
import { AppRouter } from './Router/AppRouter'
import { UserContext } from "./Context/UserContext";
import axios from "axios";


export default function App() {

  const [userData, setUserData] = useState({})
  const [courseData, setCourseData] = useState({})

  useEffect(() => {
    
    callUser()
      
  }, [])

  useEffect(() => {
    let mounted = true;
    agent("https://cima-dev.azure-api.net/api-examenes/courses/61046d964bb0a20036cfd06c")
      .then(data => {
        if (mounted) {
          setCourseData(data)
        }
      })
    return () => mounted = false;
  }, [])

  const callUser = async () => {

    let mounted = true;
    agent("https://cima-dev.azure-api.net/api-progress/users/610873b20ced2a33d78fed16")
      .then(data => {
        if (mounted) {
          setUserData(data)
        }
      })
    return () => mounted = false;
  }

  return (
    <>
      <UserContext.Provider value={{ userData, courseData, callUser }}>
        <AppRouter />
      </UserContext.Provider>
    </>
  );
}


const agent = async (URL) => {
  let result = {}
  await axios.get(URL)
    .then(response => {
      result = response.data.data
    })
    .catch(err => {
      console.log(err.message)
      result = {err: err.message}
    })
    return result
}