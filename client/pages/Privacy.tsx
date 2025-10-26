import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Shield, Eye, Lock, Database, Users, Mail } from "lucide-react";

export default function Privacy() {
  const sections = [
    {
      id: "introduction",
      title: "Introduction",
      content: `At Book My Look, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our salon booking and queue management platform.`
    },
    {
      id: "information-collection",
      title: "Information We Collect",
      content: `We collect information you provide directly to us, such as when you create an account, book appointments, or contact us for support. This may include your name, email address, phone number, appointment preferences, and payment information. We also collect information automatically when you use our service, including device information, usage patterns, and location data.`
    },
    {
      id: "how-we-use",
      title: "How We Use Your Information",
      content: `We use the information we collect to provide, maintain, and improve our services, process bookings and payments, communicate with you about your appointments, send you important updates and notifications, personalize your experience, and ensure the security of our platform.`
    },
    {
      id: "information-sharing",
      title: "Information Sharing and Disclosure",
      content: `We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy. We may share your information with salon partners to facilitate your bookings, with service providers who assist us in operating our platform, and when required by law or to protect our rights.`
    },
    {
      id: "data-security",
      title: "Data Security",
      content: `We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. This includes encryption of sensitive data, secure servers, and regular security audits. However, no method of transmission over the internet is 100% secure.`
    },
    {
      id: "data-retention",
      title: "Data Retention",
      content: `We retain your personal information for as long as necessary to provide our services and fulfill the purposes outlined in this policy, unless a longer retention period is required or permitted by law. When we no longer need your information, we will securely delete or anonymize it.`
    },
    {
      id: "your-rights",
      title: "Your Rights and Choices",
      content: `You have the right to access, update, or delete your personal information. You can also opt out of certain communications, request data portability, and object to certain processing activities. To exercise these rights, please contact us using the information provided in this policy.`
    },
    {
      id: "cookies",
      title: "Cookies and Tracking Technologies",
      content: `We use cookies and similar tracking technologies to enhance your experience, analyze usage patterns, and provide personalized content. You can control cookie settings through your browser, but disabling cookies may affect the functionality of our service.`
    },
    {
      id: "third-party-services",
      title: "Third-Party Services",
      content: `Our service may contain links to third-party websites or integrate with third-party services. We are not responsible for the privacy practices of these third parties. We encourage you to review their privacy policies before providing any personal information.`
    },
    {
      id: "children-privacy",
      title: "Children's Privacy",
      content: `Our service is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If we become aware that we have collected personal information from a child under 13, we will take steps to delete such information.`
    },
    {
      id: "international-transfers",
      title: "International Data Transfers",
      content: `Your information may be transferred to and processed in countries other than your own. We ensure that such transfers comply with applicable data protection laws and implement appropriate safeguards to protect your information.`
    },
    {
      id: "changes-policy",
      title: "Changes to This Privacy Policy",
      content: `We may update this Privacy Policy from time to time to reflect changes in our practices or applicable laws. We will notify you of any material changes by posting the new policy on our website and updating the "Last Updated" date.`
    },
    {
      id: "contact-us",
      title: "Contact Us",
      content: `If you have any questions about this Privacy Policy or our privacy practices, please contact us at siddharthsme01@gmail.com or through our contact page. We will respond to your inquiry within 30 days.`
    }
  ];

  const dataTypes = [
    {
      category: "Personal Information",
      items: ["Name", "Email Address", "Phone Number", "Date of Birth", "Address"],
      icon: <Users className="h-5 w-5" />
    },
    {
      category: "Booking Information",
      items: ["Appointment History", "Service Preferences", "Salon Preferences", "Queue Position"],
      icon: <Calendar className="h-5 w-5" />
    },
    {
      category: "Payment Information",
      items: ["Payment Methods", "Transaction History", "Billing Address", "Payment Preferences"],
      icon: <Database className="h-5 w-5" />
    },
    {
      category: "Technical Information",
      items: ["Device Information", "IP Address", "Browser Type", "Usage Analytics"],
      icon: <Eye className="h-5 w-5" />
    }
  ];

  return (
    <div className="container py-16">
      <div className="mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-lg text-muted-foreground mb-6">
            Your privacy is important to us. Learn how we protect and use your information.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Last updated: January 20, 2024</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>GDPR Compliant</span>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid gap-8 lg:grid-cols-4">
        {/* Table of Contents */}
        <div className="lg:col-span-1">
          <Card className="sticky top-8">
            <CardHeader>
              <CardTitle className="text-lg">Table of Contents</CardTitle>
            </CardHeader>
            <CardContent>
              <nav className="space-y-2">
                {sections.map((section, index) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="block text-sm text-muted-foreground hover:text-primary transition-colors py-1"
                  >
                    {index + 1}. {section.title}
                  </a>
                ))}
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Privacy Policy Content */}
        <div className="lg:col-span-3">
          <div className="space-y-8">
            {sections.map((section, index) => (
              <motion.div
                key={section.id}
                id={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground rounded-full text-sm font-bold">
                        {index + 1}
                      </div>
                      <CardTitle className="text-xl">{section.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {section.content}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Data Types We Collect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: sections.length * 0.1 }}
            className="mt-8"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Types of Data We Collect
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {dataTypes.map((dataType, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center gap-2 font-medium">
                        {dataType.icon}
                        {dataType.category}
                      </div>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        {dataType.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-center gap-2">
                            <div className="w-1 h-1 bg-muted-foreground rounded-full" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Your Rights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: (sections.length + 1) * 0.1 }}
            className="mt-8"
          >
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-800">
                  <Shield className="h-5 w-5" />
                  Your Privacy Rights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <h4 className="font-medium text-green-800">Access & Portability</h4>
                    <p className="text-sm text-green-700">
                      Request a copy of your personal data in a portable format
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-green-800">Correction</h4>
                    <p className="text-sm text-green-700">
                      Update or correct inaccurate personal information
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-green-800">Deletion</h4>
                    <p className="text-sm text-green-700">
                      Request deletion of your personal data
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-green-800">Opt-out</h4>
                    <p className="text-sm text-green-700">
                      Unsubscribe from marketing communications
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Security Measures */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: (sections.length + 2) * 0.1 }}
            className="mt-8"
          >
            <Card className="border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-800">
                  <Lock className="h-5 w-5" />
                  Security Measures
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="text-center">
                    <div className="text-2xl mb-2">🔒</div>
                    <h4 className="font-medium text-blue-800">Encryption</h4>
                    <p className="text-sm text-blue-700">All data encrypted in transit and at rest</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl mb-2">🛡️</div>
                    <h4 className="font-medium text-blue-800">Access Control</h4>
                    <p className="text-sm text-blue-700">Strict access controls and authentication</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl mb-2">🔍</div>
                    <h4 className="font-medium text-blue-800">Monitoring</h4>
                    <p className="text-sm text-blue-700">24/7 security monitoring and alerts</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: (sections.length + 3) * 0.1 }}
            className="mt-8"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Privacy Questions?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  If you have any questions about this Privacy Policy or want to exercise your privacy rights, please contact us.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">siddharthsme01@gmail.com</Badge>
                  <Badge variant="secondary">Data Protection Officer</Badge>
                  <Badge variant="secondary">GDPR Request Form</Badge>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
