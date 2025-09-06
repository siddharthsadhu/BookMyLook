import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, TrendingUp, AlertCircle } from "lucide-react";

interface EstimateData {
  shop_name: string;
  queue_length: number;
  service_duration: number;
  estimated_wait_time: number;
  estimated_wait_minutes: number;
  wait_status: string;
  recommendation: string;
  is_long_wait: boolean;
}

interface QueueEstimatorProps {
  salonId?: number;
  serviceId?: number;
  onClose?: () => void;
}

export default function QueueEstimator({ salonId, serviceId, onClose }: QueueEstimatorProps) {
  const [formData, setFormData] = useState({
    shop_id: salonId || 1,
    service_id: serviceId || 1,
    queue_length: 5,
    service_time: 30
  });
  const [estimate, setEstimate] = useState<EstimateData | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/estimate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        setEstimate(data.data);
      } else {
        console.error('Estimate failed:', data.error);
      }
    } catch (error) {
      console.error('Error getting estimate:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes} min`;
    }
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins > 0 ? `${mins}m` : ''}`;
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-background rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <Card className="border-0 shadow-none">
          <CardHeader className="text-center pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold">Queue Time Estimator</CardTitle>
              {onClose && (
                <Button variant="ghost" size="sm" onClick={onClose}>
                  ✕
                </Button>
              )}
            </div>
            <p className="text-muted-foreground">
              Get real-time wait time estimates for salon services
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            {!estimate ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="shop_id">Salon</Label>
                    <Select
                      value={formData.shop_id.toString()}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, shop_id: parseInt(value) }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select salon" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Style Studio</SelectItem>
                        <SelectItem value="2">Beauty Lounge</SelectItem>
                        <SelectItem value="3">Hair & Beyond</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="service_id">Service</Label>
                    <Select
                      value={formData.service_id.toString()}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, service_id: parseInt(value) }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Haircut & Styling (45 min)</SelectItem>
                        <SelectItem value="2">Beard Trim (30 min)</SelectItem>
                        <SelectItem value="3">Hair Color (120 min)</SelectItem>
                        <SelectItem value="4">Facial Treatment (60 min)</SelectItem>
                        <SelectItem value="5">Manicure & Pedicure (90 min)</SelectItem>
                        <SelectItem value="6">Hair Spa (75 min)</SelectItem>
                        <SelectItem value="7">Premium Haircut (60 min)</SelectItem>
                        <SelectItem value="8">Hair Styling (45 min)</SelectItem>
                        <SelectItem value="9">Keratin Treatment (180 min)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="queue_length">Current Queue Length</Label>
                    <Input
                      id="queue_length"
                      type="number"
                      min="0"
                      value={formData.queue_length}
                      onChange={(e) => setFormData(prev => ({ ...prev, queue_length: parseInt(e.target.value) || 0 }))}
                      placeholder="Number of people waiting"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="service_time">Service Time (minutes)</Label>
                    <Input
                      id="service_time"
                      type="number"
                      min="1"
                      value={formData.service_time}
                      onChange={(e) => setFormData(prev => ({ ...prev, service_time: parseInt(e.target.value) || 30 }))}
                      placeholder="Service duration"
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Calculating..." : "Get Estimate"}
                </Button>
              </form>
            ) : (
              <div className="space-y-6">
                {/* Results Header */}
                <div className="text-center">
                  <h3 className="text-xl font-bold mb-2">Estimation Results</h3>
                  <p className="text-muted-foreground">{estimate.shop_name}</p>
                </div>

                {/* Main Estimate */}
                <div className="text-center p-6 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl">
                  <div className="text-4xl font-bold text-primary mb-2">
                    {formatTime(estimate.estimated_wait_time)}
                  </div>
                  <div className="text-lg text-muted-foreground">Estimated Wait Time</div>
                  <Badge 
                    variant={estimate.is_long_wait ? "destructive" : "default"}
                    className="mt-2"
                  >
                    {estimate.wait_status}
                  </Badge>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
                      <div className="text-2xl font-bold">{estimate.queue_length}</div>
                      <div className="text-sm text-muted-foreground">People in Queue</div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4 text-center">
                      <Clock className="h-8 w-8 mx-auto mb-2 text-primary" />
                      <div className="text-2xl font-bold">{estimate.service_duration}</div>
                      <div className="text-sm text-muted-foreground">Service Duration (min)</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Recommendation */}
                <Card className={estimate.is_long_wait ? "border-orange-200 bg-orange-50" : "border-green-200 bg-green-50"}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className={`h-5 w-5 mt-0.5 ${estimate.is_long_wait ? "text-orange-600" : "text-green-600"}`} />
                      <div>
                        <div className="font-semibold mb-1">Recommendation</div>
                        <div className="text-sm text-muted-foreground">{estimate.recommendation}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => setEstimate(null)}
                  >
                    New Estimate
                  </Button>
                  <Button className="flex-1">
                    Join Queue
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
