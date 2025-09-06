import { motion } from "framer-motion";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { User, Mail, Phone, MapPin, Calendar, Edit, Save, X, Camera, Bell, Shield, CreditCard } from "lucide-react";

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  dateOfBirth: string;
  avatar: string;
  memberSince: string;
  totalBookings: number;
  favoriteSalon: string;
  preferences: {
    notifications: boolean;
    emailUpdates: boolean;
    smsReminders: boolean;
    marketingEmails: boolean;
  };
}

export default function Profile() {
  const [profile, setProfile] = useState<UserProfile>({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+91 98765 43210",
    address: "123 Main Street",
    city: "Mumbai",
    dateOfBirth: "1990-05-15",
    avatar: "",
    memberSince: "2024-01-01",
    totalBookings: 12,
    favoriteSalon: "Style Studio",
    preferences: {
      notifications: true,
      emailUpdates: true,
      smsReminders: true,
      marketingEmails: false
    }
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSave = async () => {
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSuccess('Profile updated successfully!');
      setIsEditing(false);
      
    } catch (error) {
      setError('Failed to update profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setError('');
    setSuccess('');
  };

  const handleInputChange = (field: keyof UserProfile, value: string) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePreferenceChange = (preference: keyof UserProfile['preferences'], value: boolean) => {
    setProfile(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [preference]: value
      }
    }));
  };

  return (
    <div className="container py-16">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Profile</h1>
        <p className="text-muted-foreground">Manage your personal information and preferences</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Profile Summary */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="text-center">
              <div className="relative mx-auto mb-4">
                <Avatar className="h-24 w-24 mx-auto">
                  <AvatarImage src={profile.avatar} alt={profile.name} />
                  <AvatarFallback className="text-2xl">
                    {profile.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <Button
                    size="sm"
                    className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
                    variant="outline"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <CardTitle className="text-xl">{profile.name}</CardTitle>
              <CardDescription>{profile.email}</CardDescription>
              <Badge variant="secondary" className="mt-2">
                Member since {new Date(profile.memberSince).toLocaleDateString()}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary">{profile.totalBookings}</div>
                  <div className="text-sm text-muted-foreground">Total Bookings</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">4.8</div>
                  <div className="text-sm text-muted-foreground">Average Rating</div>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <div className="text-sm">
                  <div className="font-medium mb-1">Favorite Salon</div>
                  <div className="text-muted-foreground">{profile.favoriteSalon}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Profile Details */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="personal" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="personal">Personal Info</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Personal Information</CardTitle>
                      <CardDescription>
                        Update your personal details and contact information
                      </CardDescription>
                    </div>
                    {!isEditing ? (
                      <Button onClick={() => setIsEditing(true)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Profile
                      </Button>
                    ) : (
                      <div className="flex gap-2">
                        <Button onClick={handleSave} disabled={isLoading}>
                          {isLoading ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                              Saving...
                            </>
                          ) : (
                            <>
                              <Save className="h-4 w-4 mr-2" />
                              Save Changes
                            </>
                          )}
                        </Button>
                        <Button variant="outline" onClick={handleCancel}>
                          <X className="h-4 w-4 mr-2" />
                          Cancel
                        </Button>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  {success && (
                    <Alert className="mb-4">
                      <AlertDescription>{success}</AlertDescription>
                    </Alert>
                  )}
                  {error && (
                    <Alert variant="destructive" className="mb-4">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="name"
                          value={profile.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          disabled={!isEditing}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          value={profile.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          disabled={!isEditing}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="phone"
                          type="tel"
                          value={profile.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          disabled={!isEditing}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dateOfBirth">Date of Birth</Label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="dateOfBirth"
                          type="date"
                          value={profile.dateOfBirth}
                          onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                          disabled={!isEditing}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="address">Address</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Textarea
                          id="address"
                          value={profile.address}
                          onChange={(e) => handleInputChange('address', e.target.value)}
                          disabled={!isEditing}
                          className="pl-10"
                          rows={2}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={profile.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="preferences" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>
                    Choose how you want to receive updates and notifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="font-medium">Push Notifications</div>
                        <div className="text-sm text-muted-foreground">
                          Receive notifications about your appointments and queue updates
                        </div>
                      </div>
                      <Button
                        variant={profile.preferences.notifications ? "default" : "outline"}
                        size="sm"
                        onClick={() => handlePreferenceChange('notifications', !profile.preferences.notifications)}
                      >
                        <Bell className="h-4 w-4 mr-2" />
                        {profile.preferences.notifications ? "Enabled" : "Disabled"}
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="font-medium">Email Updates</div>
                        <div className="text-sm text-muted-foreground">
                          Get email notifications about booking confirmations and changes
                        </div>
                      </div>
                      <Button
                        variant={profile.preferences.emailUpdates ? "default" : "outline"}
                        size="sm"
                        onClick={() => handlePreferenceChange('emailUpdates', !profile.preferences.emailUpdates)}
                      >
                        <Mail className="h-4 w-4 mr-2" />
                        {profile.preferences.emailUpdates ? "Enabled" : "Disabled"}
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="font-medium">SMS Reminders</div>
                        <div className="text-sm text-muted-foreground">
                          Receive text message reminders before your appointments
                        </div>
                      </div>
                      <Button
                        variant={profile.preferences.smsReminders ? "default" : "outline"}
                        size="sm"
                        onClick={() => handlePreferenceChange('smsReminders', !profile.preferences.smsReminders)}
                      >
                        <Phone className="h-4 w-4 mr-2" />
                        {profile.preferences.smsReminders ? "Enabled" : "Disabled"}
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="font-medium">Marketing Emails</div>
                        <div className="text-sm text-muted-foreground">
                          Receive promotional offers and salon updates
                        </div>
                      </div>
                      <Button
                        variant={profile.preferences.marketingEmails ? "default" : "outline"}
                        size="sm"
                        onClick={() => handlePreferenceChange('marketingEmails', !profile.preferences.marketingEmails)}
                      >
                        <Mail className="h-4 w-4 mr-2" />
                        {profile.preferences.marketingEmails ? "Enabled" : "Disabled"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>
                    Manage your account security and privacy settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="font-medium">Change Password</div>
                        <div className="text-sm text-muted-foreground">
                          Update your account password
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Shield className="h-4 w-4 mr-2" />
                        Change Password
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="font-medium">Two-Factor Authentication</div>
                        <div className="text-sm text-muted-foreground">
                          Add an extra layer of security to your account
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Shield className="h-4 w-4 mr-2" />
                        Enable 2FA
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="font-medium">Payment Methods</div>
                        <div className="text-sm text-muted-foreground">
                          Manage your saved payment methods
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <CreditCard className="h-4 w-4 mr-2" />
                        Manage Cards
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
