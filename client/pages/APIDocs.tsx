import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code, BookOpen, Zap, Shield, Download, ExternalLink, Copy, CheckCircle } from "lucide-react";
import { useState } from "react";

export default function APIDocs() {
  const [copiedEndpoint, setCopiedEndpoint] = useState<string | null>(null);

  const copyToClipboard = async (text: string, endpoint: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedEndpoint(endpoint);
      setTimeout(() => setCopiedEndpoint(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const endpoints = [
    {
      method: "GET",
      path: "/api/salons",
      description: "Get list of salons with filtering and pagination",
      category: "Salons",
      parameters: [
        { name: "city", type: "string", required: false, description: "Filter by city" },
        { name: "service", type: "string", required: false, description: "Filter by service type" },
        { name: "page", type: "number", required: false, description: "Page number for pagination" },
        { name: "limit", type: "number", required: false, description: "Items per page (max 50)" }
      ],
      example: `GET /api/salons?city=ahmedabad&service=haircut&page=1&limit=20`
    },
    {
      method: "GET",
      path: "/api/salons/{id}",
      description: "Get detailed information about a specific salon",
      category: "Salons",
      parameters: [
        { name: "id", type: "string", required: true, description: "Salon ID" }
      ],
      example: `GET /api/salons/clh1x8z9g0000abcdefghijk`
    },
    {
      method: "POST",
      path: "/api/bookings",
      description: "Create a new booking appointment",
      category: "Bookings",
      parameters: [],
      body: {
        salonId: "string (required)",
        serviceId: "string (required)",
        customerName: "string (required)",
        customerEmail: "string (required)",
        customerPhone: "string (required)",
        appointmentDate: "string (ISO 8601)",
        notes: "string (optional)"
      },
      example: `POST /api/bookings
{
  "salonId": "clh1x8z9g0000abcdefghijk",
  "serviceId": "clh1x8z9g0001lmnopqrstuv",
  "customerName": "John Doe",
  "customerEmail": "john@example.com",
  "customerPhone": "+919876543210",
  "appointmentDate": "2024-01-20T10:00:00Z",
  "notes": "Please style my hair neatly"
}`
    },
    {
      method: "GET",
      path: "/api/queue/{salonId}",
      description: "Get current queue status for a salon",
      category: "Queue",
      parameters: [
        { name: "salonId", type: "string", required: true, description: "Salon ID" }
      ],
      example: `GET /api/queue/clh1x8z9g0000abcdefghijk`
    },
    {
      method: "GET",
      path: "/api/services",
      description: "Get available services with categories",
      category: "Services",
      parameters: [
        { name: "category", type: "string", required: false, description: "Filter by category" },
        { name: "salonId", type: "string", required: false, description: "Filter services for specific salon" }
      ],
      example: `GET /api/services?category=hair&salonId=clh1x8z9g0000abcdefghijk`
    }
  ];

  const webhookEvents = [
    {
      event: "booking.created",
      description: "Triggered when a new booking is created",
      payload: {
        bookingId: "string",
        salonId: "string",
        customerEmail: "string",
        appointmentDate: "string",
        status: "confirmed"
      }
    },
    {
      event: "booking.updated",
      description: "Triggered when booking details are modified",
      payload: {
        bookingId: "string",
        changes: "object",
        updatedBy: "string"
      }
    },
    {
      event: "queue.updated",
      description: "Triggered when queue position changes",
      payload: {
        salonId: "string",
        customerId: "string",
        newPosition: "number",
        estimatedTime: "number"
      }
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>

        <div className="container py-24 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-8 border border-white/20"
            >
              <Code className="h-4 w-4" />
              API Documentation
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-indigo-100 bg-clip-text text-transparent"
            >
              Developer
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                API Reference
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed"
            >
              Integrate BookMyLook's powerful APIs into your applications. Access salon data,
              manage bookings, and leverage our queue management system programmatically.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap justify-center gap-4 mt-8"
            >
              <div className="flex items-center gap-2 text-slate-300">
                <Zap className="h-5 w-5 text-blue-400" />
                <span>RESTful API</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Shield className="h-5 w-5 text-green-400" />
                <span>OAuth 2.0 Auth</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <BookOpen className="h-5 w-5 text-purple-400" />
                <span>Comprehensive Docs</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-20 w-20 h-20 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-16 h-16 bg-purple-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container max-w-6xl">
          <Tabs defaultValue="overview" className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <TabsList className="grid w-full grid-cols-4 max-w-2xl mx-auto bg-gradient-to-r from-slate-100 via-slate-50 to-slate-100 p-1 rounded-xl shadow-inner border border-slate-200">
                <TabsTrigger value="overview" className="rounded-lg font-semibold text-slate-700 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300">
                  Overview
                </TabsTrigger>
                <TabsTrigger value="endpoints" className="rounded-lg font-semibold text-slate-700 data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-600 data-[state=active]:to-teal-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300">
                  Endpoints
                </TabsTrigger>
                <TabsTrigger value="webhooks" className="rounded-lg font-semibold text-slate-700 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300">
                  Webhooks
                </TabsTrigger>
                <TabsTrigger value="sdks" className="rounded-lg font-semibold text-slate-700 data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-600 data-[state=active]:to-red-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300">
                  SDKs
                </TabsTrigger>
              </TabsList>
            </motion.div>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="shadow-xl border-0 bg-gradient-to-br from-white via-slate-50/30 to-white backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <BookOpen className="h-6 w-6 text-blue-600" />
                      Getting Started with BookMyLook API
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Base URL</h3>
                        <code className="bg-slate-100 px-3 py-2 rounded text-sm font-mono">
                          https://api.bookmylook.com/v1
                        </code>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Authentication</h3>
                        <p className="text-slate-600">
                          Bearer token authentication using OAuth 2.0
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-4">Rate Limits</h3>
                      <ul className="space-y-2 text-slate-600">
                        <li>• 1000 requests per hour for authenticated users</li>
                        <li>• 100 requests per hour for unauthenticated users</li>
                        <li>• Rate limit headers included in all responses</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-4">Response Format</h3>
                      <p className="text-slate-600 mb-4">
                        All API responses are in JSON format with consistent structure:
                      </p>
                      <pre className="bg-slate-100 p-4 rounded-lg text-sm overflow-x-auto">
{`{
  "success": true,
  "data": { ... },
  "message": "Optional message",
  "pagination": { ... } // if applicable
}`}
                      </pre>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Quick Start Guide */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card className="shadow-xl border-0 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-emerald-800">
                      <Zap className="h-6 w-6" />
                      Quick Start Guide
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <span className="text-emerald-600 font-bold text-lg">1</span>
                        </div>
                        <h4 className="font-semibold text-emerald-800 mb-2">Get API Key</h4>
                        <p className="text-sm text-emerald-700">Register for a developer account and obtain your API key</p>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <span className="text-teal-600 font-bold text-lg">2</span>
                        </div>
                        <h4 className="font-semibold text-teal-800 mb-2">Make Request</h4>
                        <p className="text-sm text-teal-700">Use your API key to authenticate and make your first request</p>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <span className="text-cyan-600 font-bold text-lg">3</span>
                        </div>
                        <h4 className="font-semibold text-cyan-800 mb-2">Integrate</h4>
                        <p className="text-sm text-cyan-700">Build your integration and start using BookMyLook's features</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Endpoints Tab */}
            <TabsContent value="endpoints" className="space-y-8">
              <div className="grid gap-6">
                {endpoints.map((endpoint, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="shadow-xl border-0 bg-gradient-to-br from-white via-slate-50/30 to-white backdrop-blur-sm">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <Badge
                              className={`${
                                endpoint.method === 'GET' ? 'bg-green-100 text-green-700' :
                                endpoint.method === 'POST' ? 'bg-blue-100 text-blue-700' :
                                'bg-orange-100 text-orange-700'
                              }`}
                            >
                              {endpoint.method}
                            </Badge>
                            <code className="text-lg font-mono text-slate-800">{endpoint.path}</code>
                          </div>
                          <Badge variant="outline">{endpoint.category}</Badge>
                        </div>
                        <CardTitle className="text-xl mt-4">{endpoint.description}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        {endpoint.parameters && endpoint.parameters.length > 0 && (
                          <div>
                            <h4 className="font-semibold text-slate-800 mb-3">Parameters</h4>
                            <div className="space-y-2">
                              {endpoint.parameters.map((param, idx) => (
                                <div key={idx} className="flex items-center gap-4 text-sm">
                                  <code className="bg-slate-100 px-2 py-1 rounded text-slate-700">{param.name}</code>
                                  <Badge variant="outline" className="text-xs">{param.type}</Badge>
                                  {param.required && <Badge className="bg-red-100 text-red-700 text-xs">Required</Badge>}
                                  <span className="text-slate-600 flex-1">{param.description}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {endpoint.body && (
                          <div>
                            <h4 className="font-semibold text-slate-800 mb-3">Request Body</h4>
                            <pre className="bg-slate-100 p-4 rounded-lg text-sm overflow-x-auto">
{JSON.stringify(endpoint.body, null, 2)}
                            </pre>
                          </div>
                        )}

                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-semibold text-slate-800">Example Request</h4>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => copyToClipboard(endpoint.example, endpoint.path)}
                              className="text-xs"
                            >
                              {copiedEndpoint === endpoint.path ? (
                                <CheckCircle className="h-3 w-3 mr-1" />
                              ) : (
                                <Copy className="h-3 w-3 mr-1" />
                              )}
                              {copiedEndpoint === endpoint.path ? 'Copied!' : 'Copy'}
                            </Button>
                          </div>
                          <pre className="bg-slate-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto font-mono">
{endpoint.example}
                          </pre>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            {/* Webhooks Tab */}
            <TabsContent value="webhooks" className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="shadow-xl border-0 bg-gradient-to-br from-white via-slate-50/30 to-white backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <Zap className="h-6 w-6 text-purple-600" />
                      Webhook Integration
                    </CardTitle>
                    <CardDescription>
                      Get real-time updates about bookings, queue changes, and other events
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Setup Instructions</h3>
                      <ol className="space-y-3 text-slate-600">
                        <li className="flex items-start gap-3">
                          <span className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center text-sm font-medium text-purple-700 flex-shrink-0">1</span>
                          <span>Configure your webhook URL in the developer dashboard</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center text-sm font-medium text-purple-700 flex-shrink-0">2</span>
                          <span>Select the events you want to receive notifications for</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center text-sm font-medium text-purple-700 flex-shrink-0">3</span>
                          <span>Test your webhook endpoint with our testing tools</span>
                        </li>
                      </ol>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-4">Available Events</h3>
                      <div className="space-y-4">
                        {webhookEvents.map((event, index) => (
                          <div key={index} className="border rounded-lg p-4">
                            <div className="flex items-center gap-3 mb-3">
                              <Badge className="bg-purple-100 text-purple-700">{event.event}</Badge>
                              <h4 className="font-medium text-slate-800">{event.description}</h4>
                            </div>
                            <div>
                              <h5 className="text-sm font-medium text-slate-700 mb-2">Sample Payload:</h5>
                              <pre className="bg-slate-100 p-3 rounded text-sm overflow-x-auto">
{JSON.stringify(event.payload, null, 2)}
                              </pre>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* SDKs Tab */}
            <TabsContent value="sdks" className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {[
                    {
                      language: "JavaScript/Node.js",
                      icon: "📦",
                      description: "Official SDK for Node.js applications",
                      downloadUrl: "#",
                      docsUrl: "#"
                    },
                    {
                      language: "Python",
                      icon: "🐍",
                      description: "Python SDK with async support",
                      downloadUrl: "#",
                      docsUrl: "#"
                    },
                    {
                      language: "PHP",
                      icon: "🐘",
                      description: "Laravel-compatible PHP SDK",
                      downloadUrl: "#",
                      docsUrl: "#"
                    },
                    {
                      language: "Java",
                      icon: "☕",
                      description: "Android and server-side Java SDK",
                      downloadUrl: "#",
                      docsUrl: "#"
                    },
                    {
                      language: "C#/.NET",
                      icon: "🔷",
                      description: ".NET Core compatible SDK",
                      downloadUrl: "#",
                      docsUrl: "#"
                    },
                    {
                      language: "Go",
                      icon: "🐹",
                      description: "High-performance Go SDK",
                      downloadUrl: "#",
                      docsUrl: "#"
                    }
                  ].map((sdk, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -5 }}
                      className="group"
                    >
                      <Card className="shadow-xl border-0 bg-gradient-to-br from-white via-slate-50/30 to-white backdrop-blur-sm hover:shadow-2xl transition-all duration-500 h-full">
                        <CardContent className="p-6 text-center">
                          <div className="text-4xl mb-4">{sdk.icon}</div>
                          <h3 className="text-xl font-bold text-slate-800 mb-2">{sdk.language}</h3>
                          <p className="text-slate-600 mb-6">{sdk.description}</p>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="flex-1">
                              <Download className="h-4 w-4 mr-1" />
                              Install
                            </Button>
                            <Button variant="outline" size="sm" className="flex-1">
                              <ExternalLink className="h-4 w-4 mr-1" />
                              Docs
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Installation Instructions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-8"
              >
                <Card className="shadow-xl border-0 bg-gradient-to-br from-slate-50 to-blue-50">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold text-slate-800 mb-6 text-center">Installation Examples</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-slate-800 mb-3">npm</h4>
                        <pre className="bg-slate-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto">
npm install bookmylook-api
                        </pre>
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800 mb-3">pip</h4>
                        <pre className="bg-slate-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto">
pip install bookmylook-api
                        </pre>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
