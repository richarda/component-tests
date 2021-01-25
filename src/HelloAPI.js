import { useEffect, useState } from 'react';
import axios from 'axios'

const HelloAPI = ({ url }) => {
    const [greeting, setGreeting] = useState("");
    
    useEffect(() => {
        let mounted = true;
        async function fetchData() {
            const response = await axios.get(url);
            const { data } = response;
            if(mounted) {
                setGreeting(data.greeting);
            }
        }
        fetchData();
        return () => { mounted = false; }
      });
    return (
        <h1>{greeting}</h1>
    )
}

export default HelloAPI;