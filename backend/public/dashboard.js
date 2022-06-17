async function getCourses(){
    let res=await fetch('https://localhost:5001/gradkit-dashboard/courses');
    let ans=await res.json();
    console.log(ans);
}
getCourses();