import {useState,useEffect} from "react";
import toast from "react-hot-toast"
import useConversation from "../zustand/useConversation";


const UseGetMessage =()=>{
    const [loading,setloading]=useState(false);
    const {messages,setMessages,selectedConversation} = useConversation();
    

    useEffect(()=>{
        const getmessages = async()=>{
            setloading(true);
            try{
                const res = await fetch(`/api/messages/${selectedConversation._id}`);
                const data =  await res.json();

                if(data.error) throw new Error(data.error);
                setMessages(data);
            }catch(error){
                toast.error(error.message);
            }finally{
                setloading(false)
            }
        }

        if(selectedConversation?._id) getmessages();
        


    },[selectedConversation?._id, setMessages])
    return {loading,messages:messages}
}

export default UseGetMessage;