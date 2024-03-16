import { Users } from '@/types'
import axios from 'axios'


const useUsers= async(): Promise<Users[]> =>{
    const response = await axios.get("https://jsonplaceholder.typicode.com/users")
    return response.data
}

export default useUsers