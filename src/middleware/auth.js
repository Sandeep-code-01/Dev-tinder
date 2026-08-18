 const adminAuth = (req, res, next) => {  
     console.log("Admin Auth is getting Checked!!");
     const token = "XYZ";
     const isAdminAuthorized = token === "XYZ";
      if (!isAdminAuthorized) {
        res.status(401).send("Unauthorized request");
      } 
       else {
        next();
}};



module.exports = { adminAuth };