import { useEffect } from "react";
import axios from "axios";
function App() {
  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get("http://localhost:5000/check");
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    getData();
  }, []);
  return <></>;
}

export default App;
