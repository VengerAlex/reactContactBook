import React, {useEffect, useState} from "react";

export const useContacts = () => {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    useEffect(() => {
        (async () => {
            try{
                setIsLoading(true)

                const response = await fetch('https://randomuser.me/api/?results=10')
                const {results, error} = await response.json()

                if(error){
                    throw new Error(error)
                }

                setIsError(false)
                setData(results)
            }catch (err){
                setIsError(true)
            }finally {
                setIsLoading(false)
            }
        })()
    }, [])

    return {data, isLoading, isError}
}