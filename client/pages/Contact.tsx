import { motion } from "framer-motion";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Phone, MapPin, Clock, MessageSquare, Send } from "lucide-react";
import { toast } from "sonner";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    inquiry_type: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Message sent successfully! We\'ll get back to you within 24 hours.', {
          duration: 4000,
          style: {
            background: '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500'
          }
        });

        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          inquiry_type: ''
        });
      } else {
        toast.error(`Failed to send message: ${data.error || 'Please try again.'}`, {
          duration: 5000,
          style: {
            background: '#ef4444',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500'
          }
        });
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message. Please check your connection and try again.', {
        duration: 5000,
        style: {
          background: '#f59e0b',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontSize: '14px',
          fontWeight: '500'
        }
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email Us",
      description: "Send us an email anytime",
      details: "siddharthsme01@gmail.com",
      action: "mailto:siddharthsme01@gmail.com"
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Call Us",
      description: "Mon-Fri from 9am to 6pm",
      details: "+91 94276 73752",
      action: "tel:+919427673752"
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Visit Us",
      description: "Come say hello at our office",
      details: "123 Tech Street, Ahmedabad, Gujarat 380001",
      action: "https://maps.google.com"
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Business Hours",
      description: "We're here to help",
      details: "Mon-Fri: 9:00 AM - 6:00 PM\nSat: 10:00 AM - 4:00 PM",
      action: null
    }
  ];

  return (
    <div className="min-h-screen bg-accent/10 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>

      <div className="w-full max-w-6xl relative z-10">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 rounded-full text-sm font-semibold border border-emerald-200 mb-8"
          >
            <MessageSquare className="h-4 w-4" />
            Get In Touch
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 bg-clip-text text-transparent leading-tight mb-6"
          >
            We'd Love to Hear
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">From You</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
          >
            Have questions, feedback, or partnership opportunities? Our team is here to help you succeed.
            Reach out through any of the channels below.
          </motion.p>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="premium-card overflow-hidden">
              {/* Gradient Border Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-indigo-500/10 rounded-lg opacity-50"></div>

              <CardHeader className="relative bg-gradient-to-r from-blue-50/50 via-indigo-50/50 to-purple-50/50 border-b border-slate-100/60">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center gap-3 mb-2"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Send className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-bold text-slate-800">Send us a Message</CardTitle>
                    <CardDescription className="text-slate-600">We'll respond within 24 hours</CardDescription>
                  </div>
                </motion.div>
              </CardHeader>

              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name and Email Row */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="grid gap-4 md:grid-cols-2"
                  >
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                        <span className="text-blue-600">👤</span>
                        Full Name *
                      </Label>
                      <div className="relative group">
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          placeholder="Enter your full name"
                          required
                          className="pl-4 h-12 border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 bg-white/80 backdrop-blur-sm transition-all duration-300 text-slate-800 placeholder:text-slate-400"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                        <span className="text-blue-600">📧</span>
                        Email Address *
                      </Label>
                      <div className="relative group">
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="your@email.com"
                          required
                          className="pl-4 h-12 border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 bg-white/80 backdrop-blur-sm transition-all duration-300 text-slate-800 placeholder:text-slate-400"
                        />
                      </div>
                    </div>
                  </motion.div>

                  {/* Phone and Inquiry Type Row */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="grid gap-4 md:grid-cols-2"
                  >
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                        <span className="text-blue-600">📱</span>
                        Phone Number
                      </Label>
                      <div className="relative">
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          placeholder="Enter your phone number"
                          className="h-12 border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 bg-white/80 backdrop-blur-sm transition-all duration-300 text-slate-800 placeholder:text-slate-400"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                        <span className="text-blue-600">🎯</span>
                        Inquiry Type
                      </Label>
                      <Select
                        value={formData.inquiry_type}
                        onValueChange={(value) => handleInputChange('inquiry_type', value)}
                      >
                        <SelectTrigger className="h-12 border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 bg-white/80 backdrop-blur-sm text-slate-800 transition-all duration-300">
                          <SelectValue placeholder="Select inquiry type" />
                        </SelectTrigger>
                        <SelectContent className="bg-white/95 backdrop-blur-xl border-slate-200">
                          <SelectItem value="general" className="hover:bg-blue-50">💬 General Inquiry</SelectItem>
                          <SelectItem value="support" className="hover:bg-blue-50">🛠️ Technical Support</SelectItem>
                          <SelectItem value="partnership" className="hover:bg-blue-50">🤝 Partnership</SelectItem>
                          <SelectItem value="feedback" className="hover:bg-blue-50">💭 Feedback</SelectItem>
                          <SelectItem value="billing" className="hover:bg-blue-50">💳 Billing</SelectItem>
                          <SelectItem value="other" className="hover:bg-blue-50">❓ Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </motion.div>

                  {/* Subject */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="space-y-2"
                  >
                    <Label htmlFor="subject" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                      <span className="text-blue-600">📝</span>
                      Subject *
                    </Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      placeholder="What's this about?"
                      required
                      className="h-12 border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 bg-white/80 backdrop-blur-sm transition-all duration-300 text-slate-800 placeholder:text-slate-400"
                    />
                  </motion.div>

                  {/* Message */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="space-y-2"
                  >
                    <Label htmlFor="message" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                      <span className="text-blue-600">💬</span>
                      Message *
                    </Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      placeholder="Tell us how we can help you..."
                      rows={5}
                      required
                      className="border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 bg-white/80 backdrop-blur-sm transition-all duration-300 text-slate-800 placeholder:text-slate-400 resize-none"
                    />
                  </motion.div>

                  {/* Submit Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                  >
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-14 bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white font-bold shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 border-0 ring-2 ring-primary/20 hover:ring-primary/40 text-lg"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-3"></div>
                          Sending your message...
                        </>
                      ) : (
                        <>
                          <Send className="h-5 w-5 mr-3" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="space-y-8"
          >
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl font-bold text-slate-800 mb-8 flex items-center gap-3"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                  <Phone className="h-4 w-4 text-white" />
                </div>
                Contact Information
              </motion.h2>

              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                    whileHover={{ y: -2 }}
                    className="group"
                  >
                    <Card className="glass hover:shadow-xl transition-all duration-500 ring-1 ring-slate-200/50 hover:ring-slate-300/70 cursor-pointer">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <motion.div
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300"
                          >
                            <div className="text-white">
                              {info.icon}
                            </div>
                          </motion.div>
                          <div className="flex-1 space-y-2">
                            <h3 className="font-bold text-lg text-slate-800 group-hover:text-slate-900 transition-colors duration-200">{info.title}</h3>
                            <p className="text-slate-600 group-hover:text-slate-700 transition-colors duration-200">
                              {info.description}
                            </p>
                            <div className="pt-2">
                              {info.action ? (
                                <motion.a
                                  href={info.action}
                                  whileHover={{ scale: 1.02 }}
                                  className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-slate-100 to-slate-200 hover:from-slate-200 hover:to-slate-300 text-slate-700 font-semibold rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
                                >
                                  <span>{info.details}</span>
                                  <span className="text-xs">→</span>
                                </motion.a>
                              ) : (
                                <pre className="whitespace-pre-wrap text-sm text-slate-600 font-medium bg-slate-50 p-3 rounded-lg">
                                  {info.details}
                                </pre>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Response Time Promise */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 rounded-2xl p-6 border border-emerald-200/60"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">Quick Response Guarantee</h3>
                  <p className="text-slate-600 text-sm">We respond to all inquiries within 24 hours</p>
                </div>
              </div>
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span className="text-slate-600">Email: &lt; 4 hours</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <span className="text-slate-600">Phone: &lt; 2 hours</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.3, type: "spring" }}
          className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full shadow-xl"
        ></motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, type: "spring" }}
          className="absolute -bottom-6 -left-6 w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full shadow-xl"
        ></motion.div>
      </div>
    </div>
  );
}
