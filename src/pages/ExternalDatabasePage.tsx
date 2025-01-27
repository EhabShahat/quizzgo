import { DatabaseConnection } from "@/components/admin/invite-controls/DatabaseConnection";
import { useState } from "react";
import { useParticipants } from "@/hooks/useParticipants";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ExternalDatabasePage = () => {
  const [databaseUrl, setDatabaseUrl] = useState('');
  const [anonKey, setAnonKey] = useState('');
  const { data: participants, isLoading } = useParticipants(databaseUrl, anonKey);
  const navigate = useNavigate();

  const handleFetchParticipants = () => {
    if (participants) {
      // Store participants or handle them as needed
      navigate('/admin?tab=invites');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1c2e] to-[#2d1f47] px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <Button 
          variant="ghost" 
          className="mb-6 text-white hover:text-white/80"
          onClick={() => navigate('/admin?tab=invites')}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Invites
        </Button>
        
        <div className="glass-card p-6">
          <h1 className="text-2xl font-bold text-white mb-6">External Database Connection</h1>
          <DatabaseConnection
            databaseUrl={databaseUrl}
            anonKey={anonKey}
            isLoading={isLoading}
            onDatabaseUrlChange={setDatabaseUrl}
            onAnonKeyChange={setAnonKey}
            onFetchParticipants={handleFetchParticipants}
          />
        </div>
      </div>
    </div>
  );
};

export default ExternalDatabasePage;