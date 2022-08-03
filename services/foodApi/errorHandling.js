
const HandleError = (err) => {

    if (err.msg.includes("successfull")){
        // put some fancy code here for error handling
        console.log("Error occured: ", err);
    }
}