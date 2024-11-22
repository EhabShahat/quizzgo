import InviteCodeForm from "@/components/InviteCodeForm";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Confetti Animation */}
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-float"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: "8px",
            height: "8px",
            background: `${['#FF4D4D', '#FFD700', '#4CAF50', '#2196F3'][Math.floor(Math.random() * 4)]}`,
            transform: `rotate(${Math.random() * 360}deg)`,
            animation: `float ${3 + Math.random() * 2}s linear infinite`,
            animationDelay: `${Math.random() * 2}s`
          }}
        />
      ))}
      <div className="flex-grow flex items-center justify-center">
        <InviteCodeForm />
      </div>
    </div>
  );
};

export default Index;