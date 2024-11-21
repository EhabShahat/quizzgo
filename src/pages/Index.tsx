import InviteCodeForm from "@/components/InviteCodeForm";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 gap-8">
      <img 
        src="/lovable-uploads/93d9dacf-3f86-4876-8e06-1fe8ff282f71.png" 
        alt="Church Logo" 
        className="w-48 h-48 rounded-full shadow-lg"
      />
      <InviteCodeForm />
    </div>
  );
};

export default Index;