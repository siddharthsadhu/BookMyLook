import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Cookie, Settings, Eye, Database, Shield, Users, Mail } from "lucide-react";

export default function Cookies() {
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
              <Cookie className="h-4 w-4" />
              Cookies Policy
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-indigo-100 bg-clip-text text-transparent"
            >
              Cookie
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                Preferences
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed"
            >
              We use cookies and similar technologies to enhance your experience on BookMyLook.
              Learn how we use them and how you can control your preferences.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap justify-center gap-4 mt-8"
            >
              <div className="flex items-center gap-2 text-slate-300">
                <Settings className="h-5 w-5 text-blue-400" />
                <span>Easy Controls</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Shield className="h-5 w-5 text-green-400" />
                <span>Privacy First</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Eye className="h-5 w-5 text-purple-400" />
                <span>Full Transparency</span>
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
        <div className="container max-w-4xl">
          <div className="space-y-8">
            {/* Last Updated */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <Badge variant="outline" className="px-4 py-2">
                Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </Badge>
            </motion.div>

            {/* What Are Cookies */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Cookie className="h-6 w-6 text-orange-600" />
                    What Are Cookies?
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-slate-700 leading-relaxed">
                    Cookies are small text files that are stored on your device when you visit our website.
                    They help us provide you with a better browsing experience by remembering your preferences
                    and understanding how you use our platform.
                  </p>
                  <p className="text-slate-700 leading-relaxed">
                    Cookies can be categorized as essential, functional, analytics, and marketing cookies.
                    We use different types of cookies for various purposes as explained below.
                  </p>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <p className="text-blue-800 text-sm">
                      📋 <strong>Note:</strong> Some cookies are essential for the website to function properly
                      and cannot be disabled. You can control other cookies through your browser settings.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Types of Cookies We Use */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Database className="h-6 w-6 text-blue-600" />
                    Types of Cookies We Use
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    {/* Essential Cookies */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 p-4 bg-red-50 rounded-lg border border-red-200">
                        <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                          <Shield className="h-5 w-5 text-red-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-red-800">Essential Cookies</h4>
                          <p className="text-sm text-red-700">Required for website functionality</p>
                        </div>
                      </div>
                      <div className="space-y-2 ml-4">
                        <div className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2"></div>
                          <span className="text-sm text-slate-600">User authentication and security</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2"></div>
                          <span className="text-sm text-slate-600">Payment processing security</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2"></div>
                          <span className="text-sm text-slate-600">Session management</span>
                        </div>
                      </div>
                    </div>

                    {/* Functional Cookies */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <Settings className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-green-800">Functional Cookies</h4>
                          <p className="text-sm text-green-700">Enhance user experience</p>
                        </div>
                      </div>
                      <div className="space-y-2 ml-4">
                        <div className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2"></div>
                          <span className="text-sm text-slate-600">Language preferences</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2"></div>
                          <span className="text-sm text-slate-600">Location-based services</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2"></div>
                          <span className="text-sm text-slate-600">Saved preferences</span>
                        </div>
                      </div>
                    </div>

                    {/* Analytics Cookies */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Eye className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-blue-800">Analytics Cookies</h4>
                          <p className="text-sm text-blue-700">Help us understand usage</p>
                        </div>
                      </div>
                      <div className="space-y-2 ml-4">
                        <div className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2"></div>
                          <span className="text-sm text-slate-600">Website traffic analysis</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2"></div>
                          <span className="text-sm text-slate-600">User behavior insights</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2"></div>
                          <span className="text-sm text-slate-600">Performance monitoring</span>
                        </div>
                      </div>
                    </div>

                    {/* Marketing Cookies */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg border border-purple-200">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                          <Users className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-purple-800">Marketing Cookies</h4>
                          <p className="text-sm text-purple-700">Personalized advertising</p>
                        </div>
                      </div>
                      <div className="space-y-2 ml-4">
                        <div className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2"></div>
                          <span className="text-sm text-slate-600">Targeted advertisements</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2"></div>
                          <span className="text-sm text-slate-600">Social media integration</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2"></div>
                          <span className="text-sm text-slate-600">Retargeting campaigns</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* How We Use Cookies */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Eye className="h-6 w-6 text-indigo-600" />
                    How We Use Cookies
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-slate-700 leading-relaxed">
                    We use cookies for several important purposes to improve your experience on BookMyLook:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2"></div>
                        <div>
                          <strong>Authentication</strong>
                          <p className="text-sm text-slate-600">Keep you logged in securely</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2"></div>
                        <div>
                          <strong>Personalization</strong>
                          <p className="text-sm text-slate-600">Remember your preferences</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2"></div>
                        <div>
                          <strong>Analytics</strong>
                          <p className="text-sm text-slate-600">Understand how you use our platform</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2"></div>
                        <div>
                          <strong>Security</strong>
                          <p className="text-sm text-slate-600">Protect against fraud and abuse</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2"></div>
                        <div>
                          <strong>Performance</strong>
                          <p className="text-sm text-slate-600">Optimize loading speeds</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2"></div>
                        <div>
                          <strong>Marketing</strong>
                          <p className="text-sm text-slate-600">Show relevant advertisements</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Managing Your Cookie Preferences */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Settings className="h-6 w-6 text-teal-600" />
                    Managing Your Cookie Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-slate-700 leading-relaxed">
                    You have several options to control how cookies are used on our website:
                  </p>

                  <div className="space-y-4">
                    <div className="bg-teal-50 p-6 rounded-lg border border-teal-200">
                      <h4 className="font-semibold text-teal-800 mb-3 flex items-center gap-2">
                        <Settings className="h-5 w-5" />
                        Browser Settings
                      </h4>
                      <p className="text-teal-700 text-sm leading-relaxed">
                        Most web browsers allow you to control cookies through their settings. You can usually find
                        these settings in the 'Options' or 'Preferences' menu of your browser. You can set your browser
                        to block or alert you about cookies, but please note that some parts of our website may not
                        work properly without cookies.
                      </p>
                    </div>

                    <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
                      <h4 className="font-semibold text-orange-800 mb-3 flex items-center gap-2">
                        <Cookie className="h-5 w-5" />
                        Cookie Consent Banner
                      </h4>
                      <p className="text-orange-700 text-sm leading-relaxed">
                        When you first visit our website, you'll see a cookie consent banner that allows you to
                        accept or reject non-essential cookies. You can change your preferences at any time by
                        clicking the cookie settings link in our footer.
                      </p>
                    </div>

                    <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
                      <h4 className="font-semibold text-purple-800 mb-3 flex items-center gap-2">
                        <Shield className="h-5 w-5" />
                        Third-Party Opt-Out
                      </h4>
                      <p className="text-purple-700 text-sm leading-relaxed">
                        For cookies set by third parties (such as analytics or advertising partners), you may need
                        to visit their websites directly to opt out. We provide links to relevant opt-out pages
                        in our detailed cookie list below.
                      </p>
                    </div>
                  </div>

                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                    <p className="text-yellow-800 text-sm">
                      ⚠️ <strong>Important:</strong> Disabling certain cookies may affect the functionality of our
                      website and your ability to use some features. Essential cookies cannot be disabled as they
                      are necessary for the website to function properly.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Cookie List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Database className="h-6 w-6 text-slate-600" />
                    Detailed Cookie List
                  </CardTitle>
                  <CardDescription>
                    Here's a comprehensive list of cookies we use on BookMyLook
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Essential Cookies */}
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <Badge className="bg-red-100 text-red-700">Essential</Badge>
                        <h4 className="font-semibold">Authentication & Security</h4>
                      </div>
                      <div className="space-y-2 text-sm text-slate-600">
                        <div><strong>bookmylook_session:</strong> Manages user login sessions</div>
                        <div><strong>csrf_token:</strong> Prevents cross-site request forgery</div>
                        <div><strong>user_preferences:</strong> Stores essential user settings</div>
                      </div>
                    </div>

                    {/* Analytics Cookies */}
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <Badge className="bg-blue-100 text-blue-700">Analytics</Badge>
                        <h4 className="font-semibold">Google Analytics</h4>
                      </div>
                      <div className="space-y-2 text-sm text-slate-600">
                        <div><strong>_ga:</strong> Distinguishes users for analytics</div>
                        <div><strong>_gid:</strong> Identifies user sessions</div>
                        <div><strong>_gat:</strong> Throttles request rate</div>
                      </div>
                    </div>

                    {/* Functional Cookies */}
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <Badge className="bg-green-100 text-green-700">Functional</Badge>
                        <h4 className="font-semibold">User Experience</h4>
                      </div>
                      <div className="space-y-2 text-sm text-slate-600">
                        <div><strong>theme_preference:</strong> Remembers dark/light mode choice</div>
                        <div><strong>location_search:</strong> Stores recent location searches</div>
                        <div><strong>booking_filters:</strong> Saves filter preferences</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardContent className="p-8 text-center">
                  <h3 className="text-xl font-bold text-slate-800 mb-4">Cookie Questions?</h3>
                  <p className="text-slate-600 mb-6">
                    Have questions about our cookie usage or need help managing your preferences?
                    We're here to help.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm">
                      <Mail className="h-4 w-4 text-blue-600" />
                      <span className="text-sm">privacy@bookmylook.com</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm">
                      <Settings className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Cookie Settings</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm">
                      <Shield className="h-4 w-4 text-purple-600" />
                      <span className="text-sm">Privacy Policy</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
