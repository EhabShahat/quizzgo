import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface WelcomeScreenProps {
  username: string;
}

const WelcomeScreen = ({ username }: WelcomeScreenProps) => {
  const [countdown, setCountdown] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate("/questions");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#8B5CF6] to-[#6366F1]">
      <div className="glass-card p-8 w-full max-w-md mx-auto text-center space-y-6 animate-fade-in">
        <h1 className="text-4xl font-bold text-white">
          Welcome, {username}!
        </h1>
        <p className="text-2xl text-white/90">
          Your quiz will begin in
        </p>
        <div className="text-6xl font-bold text-white animate-pulse">
          {countdown}
        </div>
        <p className="text-white/70">
          Get ready...
        </p>
      </div>
    </div>
  );
};

export default WelcomeScreen;