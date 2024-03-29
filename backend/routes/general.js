const router = require("express").Router();
const {auth,isAdmin}=require("../helpers/jwt-config");
const { contact,queries,courses, searchUser } = require("../controllers/general");
const path=require("path");
router.post("/contact", contact);
router.get("/gradkit-dashboard",auth,isAdmin,(req,res)=>{
    res.sendFile(path.join(__dirname,"../public/dashboard.html"))
})
router.get("/gradkit-dashboard/query",auth,isAdmin,queries);
router.get("/gradkit-dashboard/courses",auth,isAdmin,courses);
router.post("/gradkit-dashboard/getUser",auth,isAdmin,searchUser);
module.exports = router;