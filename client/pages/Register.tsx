import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import ConversationalAuth from "@/components/ConversationalAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Settings } from "lucide-react";

export default function Register() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="relative">
      {/* Main conversational auth */}
      <ConversationalAuth mode="register" />
    </div>
  );
}
