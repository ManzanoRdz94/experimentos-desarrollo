import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context/UserContext";

export default function ProgressBar() {
  const [percentage, setPercentaje] = useState(0)

  const { userData } = useContext(UserContext)

  useEffect(() => {
    let courses = userData.courses || []
    courses = courses.filter(course => course.courseId === "61046d964bb0a20036cfd06c")
    setPercentaje(courses[0]?.progress || 0)
  }, [userData, percentage])

  const containerStyles = {
    height: "16px",
    width: "100%",
    backgroundColor: "#e0e0de",
    borderRadius: 50,
    marginLeft: "5px"
  };

  const fillerStyles = {
    height: "100%",
    width: `${percentage}%`,
    backgroundImage: "linear-gradient(90deg, #67e37f,#00a99d)",
    borderRadius: "inherit",
    textAlign: "center",
    fontWeight: 600
  };

  return (
    <div style={containerStyles}>
      <div style={fillerStyles}>
        <span className={"labelStyles"}>{`${percentage}%`}</span>
      </div>
    </div>
  );
}
