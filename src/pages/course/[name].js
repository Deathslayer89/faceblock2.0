import { useRouter } from "next/router";
import React from "react";
import CourseHome from "../../components/CourseHome";
import Navbar from "@/components/Navbar";
const course=()=>{
    const router=useRouter();
    console.log(router)
    const code=router.query.name;
    console.log(code);
    return(
        <div>
            <Navbar/>

            <div className="bg-gray-900 h-screen w-screen" >
            <CourseHome course={code}/>
            </div>
        </div>
    )
}
export default course