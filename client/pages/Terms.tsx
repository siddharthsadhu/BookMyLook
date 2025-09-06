import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, FileText, Shield, Users } from "lucide-react";

export default function Terms() {
  const sections = [
    {
      id: "acceptance",
      title: "Acceptance of Terms",
      content: `By accessing and using Book My Look ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.`
    },
    {
      id: "description",
      title: "Description of Service",
      content: `Book My Look is a salon booking and queue management platform that connects customers with salon services. We provide real-time queue information, appointment booking, and related services to enhance the salon experience for both customers and salon owners.`
    },
    {
      id: "user-accounts",
      title: "User Accounts",
      content: `To access certain features of the Service, you may be required to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to provide accurate, current, and complete information during registration.`
    },
    {
      id: "booking-policy",
      title: "Booking and Cancellation Policy",
      content: `Appointments can be booked through our platform subject to availability. Cancellations must be made at least 2 hours before the scheduled appointment time. Late cancellations or no-shows may result in fees as determined by the individual salon. We reserve the right to modify booking policies with reasonable notice.`
    },
    {
      id: "payments",
      title: "Payments and Refunds",
      content: `Payment for services is processed through secure third-party payment processors. All transactions are subject to the terms of the payment processor. Refunds are subject to the individual salon's refund policy. QThrough may charge service fees for certain transactions, which will be clearly disclosed before processing.`
    },
    {
      id: "user-conduct",
      title: "User Conduct",
      content: `Users agree to use the Service in compliance with all applicable laws and regulations. Prohibited activities include: harassment of other users, posting false or misleading information, attempting to gain unauthorized access to the system, or any activity that disrupts the normal operation of the Service.`
    },
    {
      id: "privacy",
      title: "Privacy and Data Protection",
      content: `Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your information when you use our Service. By using our Service, you agree to the collection and use of information in accordance with our Privacy Policy.`
    },
    {
      id: "intellectual-property",
      title: "Intellectual Property Rights",
      content: `The Service and its original content, features, and functionality are and will remain the exclusive property of Book My Look and its licensors. The Service is protected by copyright, trademark, and other laws. Our trademarks and trade dress may not be used in connection with any product or service without our prior written consent.`
    },
    {
      id: "disclaimers",
      title: "Disclaimers and Limitations",
      content: `The Service is provided on an "AS IS" and "AS AVAILABLE" basis. We make no warranties, expressed or implied, and hereby disclaim all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property.`
    },
    {
      id: "limitation-liability",
      title: "Limitation of Liability",
      content: `In no event shall Book My Look, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the Service.`
    },
    {
      id: "termination",
      title: "Termination",
      content: `We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.`
    },
    {
      id: "changes",
      title: "Changes to Terms",
      content: `We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect. Your continued use of the Service after any such changes constitutes your acceptance of the new Terms.`
    },
    {
      id: "governing-law",
      title: "Governing Law",
      content: `These Terms shall be interpreted and governed by the laws of India, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.`
    },
    {
      id: "contact",
      title: "Contact Information",
      content: `If you have any questions about these Terms of Service, please contact us at legal@bookmylook.com or through our contact page.`
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
          <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
          <p className="text-lg text-muted-foreground mb-6">
            Please read these terms carefully before using our service
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Last updated: January 20, 2024</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span>Version 1.0</span>
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

        {/* Terms Content */}
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

          {/* Important Notice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: sections.length * 0.1 }}
            className="mt-8"
          >
            <Card className="border-amber-200 bg-amber-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-amber-800">
                  <Shield className="h-5 w-5" />
                  Important Notice
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-amber-700 leading-relaxed">
                  These terms constitute a legally binding agreement between you and QThrough. 
                  By using our service, you acknowledge that you have read, understood, and agree to be bound by these terms. 
                  If you do not agree with any part of these terms, you must not use our service.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: (sections.length + 1) * 0.1 }}
            className="mt-8"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Questions About These Terms?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  If you have any questions about these Terms of Service, please don't hesitate to contact us.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">legal@bookmylook.com</Badge>
                  <Badge variant="secondary">+91 98765 43210</Badge>
                  <Badge variant="secondary">Contact Form</Badge>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
