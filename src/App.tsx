import { useEffect } from "react";

const App = () => {
  useEffect(() => {
    window.location.href = "https://quizgo.lovable.app/";
  }, []);

  return null;
};

export default App;