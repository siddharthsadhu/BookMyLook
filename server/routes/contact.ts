import { RequestHandler } from "express";
import { ContactRequest, ApiResponse } from "@shared/api";

// Mock data for demonstration - in production, this would be stored in a database
const mockContactSubmissions: ContactRequest[] = [];

export const handleContactSubmission: RequestHandler = (req, res) => {
  try {
    const contactData: ContactRequest = req.body;
    
    // Validate required fields
    if (!contactData.name || !contactData.email || !contactData.subject || !contactData.message) {
      const response: ApiResponse = {
        success: false,
        error: "Missing required fields"
      };
      return res.status(400).json(response);
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactData.email)) {
      const response: ApiResponse = {
        success: false,
        error: "Invalid email format"
      };
      return res.status(400).json(response);
    }
    
    // Add timestamp
    const submissionWithTimestamp = {
      ...contactData,
      submitted_at: new Date().toISOString(),
      id: mockContactSubmissions.length + 1
    };
    
    // Store submission (in production, this would be saved to database)
    mockContactSubmissions.push(submissionWithTimestamp);
    
    // In production, you would:
    // 1. Save to database
    // 2. Send email notification to support team
    // 3. Send auto-reply to customer
    // 4. Create support ticket
    
    const response: ApiResponse = {
      success: true,
      message: "Your message has been sent successfully. We'll get back to you within 24 hours."
    };
    
    res.status(201).json(response);
  } catch (error) {
    const response: ApiResponse = {
      success: false,
      error: "Failed to submit contact form"
    };
    res.status(500).json(response);
  }
};

export const handleGetContactSubmissions: RequestHandler = (req, res) => {
  try {
    // This endpoint would typically be protected and only accessible by admin users
    const { inquiry_type, limit = 50, offset = 0 } = req.query;
    
    let filteredSubmissions = mockContactSubmissions;
    
    if (inquiry_type) {
      filteredSubmissions = filteredSubmissions.filter(submission => 
        submission.inquiry_type === inquiry_type
      );
    }
    
    // Apply pagination
    const startIndex = parseInt(offset as string);
    const endIndex = startIndex + parseInt(limit as string);
    const paginatedSubmissions = filteredSubmissions.slice(startIndex, endIndex);
    
    const response: ApiResponse = {
      success: true,
      data: paginatedSubmissions,
      message: `Retrieved ${paginatedSubmissions.length} contact submissions`
    };
    
    res.json(response);
  } catch (error) {
    const response: ApiResponse = {
      success: false,
      error: "Failed to fetch contact submissions"
    };
    res.status(500).json(response);
  }
};

export const handleGetContactStats: RequestHandler = (req, res) => {
  try {
    // Calculate statistics
    const totalSubmissions = mockContactSubmissions.length;
    
    const inquiryTypeStats = mockContactSubmissions.reduce((acc, submission) => {
      acc[submission.inquiry_type] = (acc[submission.inquiry_type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    // Calculate submissions by day (last 7 days)
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date.toISOString().split('T')[0];
    });
    
    const dailyStats = last7Days.map(date => {
      const count = mockContactSubmissions.filter(submission => 
        submission.submitted_at?.startsWith(date)
      ).length;
      return { date, count };
    }).reverse();
    
    const response: ApiResponse = {
      success: true,
      data: {
        total_submissions: totalSubmissions,
        inquiry_type_stats: inquiryTypeStats,
        daily_stats: dailyStats,
        average_response_time: "2.5 hours" // Mock data
      }
    };
    
    res.json(response);
  } catch (error) {
    const response: ApiResponse = {
      success: false,
      error: "Failed to fetch contact statistics"
    };
    res.status(500).json(response);
  }
};
