import { useEffect } from "react";
import Activation from "../components/Activation/Activation.jsx";
const ActivationPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <Activation />
    </div>
  );
};

export default ActivationPage;
