import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { handleShops } from "./routes/shops";
import { handleServices } from "./routes/services";
import { handleEstimate } from "./routes/estimate";
import { 
  handleGetBookings, 
  handleCreateBooking, 
  handleUpdateBooking, 
  handleCancelBooking 
} from "./routes/bookings";
import { 
  handleGetReviews, 
  handleCreateReview, 
  handleGetReviewStats 
} from "./routes/reviews";
import { 
  handleContactSubmission, 
  handleGetContactSubmissions, 
  handleGetContactStats 
} from "./routes/contact";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);
  
  // Salon and service routes
  app.get("/api/shops", handleShops);
  app.get("/api/services", handleServices);
  app.post("/api/estimate", handleEstimate);
  
  // Booking routes
  app.get("/api/bookings", handleGetBookings);
  app.post("/api/bookings", handleCreateBooking);
  app.put("/api/bookings/:id", handleUpdateBooking);
  app.delete("/api/bookings/:id", handleCancelBooking);
  
  // Review routes
  app.get("/api/reviews", handleGetReviews);
  app.post("/api/reviews", handleCreateReview);
  app.get("/api/reviews/stats", handleGetReviewStats);
  
  // Contact routes
  app.post("/api/contact", handleContactSubmission);
  app.get("/api/contact/submissions", handleGetContactSubmissions);
  app.get("/api/contact/stats", handleGetContactStats);

  return app;
}
