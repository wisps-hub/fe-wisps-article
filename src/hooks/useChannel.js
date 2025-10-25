 import { useState, useEffect } from "react"
 import { getChannelsAPI } from "@/apis/article"

 function useChannel(){
    const [channelList, setChannelList] = useState([])

    useEffect(()=>{
        //封装获取channelList函数
        const getchannelList = async () => {
            const result = await getChannelsAPI()
            setChannelList(result.data)
        }
        //调用函数
        getchannelList();
    }, [])

    return { channelList }
 }
 
export {useChannel}