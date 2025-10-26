import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import ConversationalAuth from "@/components/ConversationalAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Settings, Shield, Store, User } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedCredentials, setSelectedCredentials] = useState<{email: string, password: string} | null>(null);

  const demoCredentials = [
    {
      role: "Admin",
      icon: Shield,
      accounts: [
        {
          email: "siddharthsadhu28@gmail.com",
          password: "Sadhu@2006",
          name: "Siddharth Sadhu",
          description: "Full Admin Access"
        },
        {
          email: "admin@bookmylook.com",
          password: "admin123",
          name: "Default Admin",
          description: "System Administrator"
        }
      ]
    },
    {
      role: "Salon Owner",
      icon: Store,
      accounts: [
        {
          email: "rajesh@patelbeautystudio.com",
          password: "owner123",
          name: "Rajesh Patel",
          description: "Patel Beauty Studio"
        },
        {
          email: "priya@shahbeautylounge.com",
          password: "owner456",
          name: "Priya Shah",
          description: "Shah Beauty Lounge"
        },
        {
          email: "vikas@joshigrooming.com",
          password: "owner789",
          name: "Vikas Joshi",
          description: "Joshi Grooming Hub"
        },
        {
          email: "meera@mehtabeautysalon.com",
          password: "owner101",
          name: "Meera Mehta",
          description: "Mehta Beauty Salon"
        },
        {
          email: "arjun@parmarluxury.com",
          password: "owner202",
          name: "Arjun Parmar",
          description: "Parmar Luxury Spa"
        }
      ]
    },
    {
      role: "Customer",
      icon: User,
      accounts: [
        {
          email: "rahul@example.com",
          password: "customer123",
          name: "Rahul Patel",
          description: "Regular Customer"
        },
        {
          email: "priya@example.com",
          password: "customer456",
          name: "Priya Shah",
          description: "Beauty Enthusiast"
        },
        {
          email: "mike@example.com",
          password: "customer789",
          name: "Mike Johnson",
          description: "Premium Customer"
        },
        {
          email: "emma@example.com",
          password: "customer101",
          name: "Emma Davis",
          description: "Loyal Customer"
        },
        {
          email: "alex@example.com",
          password: "customer202",
          name: "Alex Brown",
          description: "New Customer"
        }
      ]
    }
  ];

  // Icon component mapping
  const IconComponent = ({ icon: Icon }: { icon: any }) => <Icon className="w-4 h-4" />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-indigo-900/20">
      {/* Main conversational auth */}
      <ConversationalAuth mode="login" initialCredentials={selectedCredentials} />

      {/* Demo Credentials Section */}
      <div className="fixed bottom-4 right-4 max-w-md z-50">
        <Card className="backdrop-blur-xl bg-white/95 dark:bg-gray-900/95 border-0 shadow-2xl">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2 text-purple-600 dark:text-purple-400">
              <Shield className="w-5 h-5" />
              Demo Credentials
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 max-h-96 overflow-y-auto">
            {demoCredentials.map((roleGroup, groupIndex) => (
              <div key={groupIndex} className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  <IconComponent icon={roleGroup.icon} />
                  {roleGroup.role}
                </div>
                <div className="space-y-2 pl-6">
                  {roleGroup.accounts.map((account, accountIndex) => (
                    <div
                      key={accountIndex}
                      className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      onClick={() => {
                        setSelectedCredentials({ email: account.email, password: account.password });
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-sm">{account.name}</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">{account.description}</div>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {roleGroup.role}
                        </Badge>
                      </div>
                      <div className="mt-2 space-y-1">
                        <div className="text-xs font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                          📧 {account.email}
                        </div>
                        <div className="text-xs font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                          🔒 {account.password}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
