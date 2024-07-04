const useLocalStroage=()=>{
    const token = localStorage.getItem("token");
    if(token){
return token
    }else{
        return null
    }
}

export default useLocalStroage