import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { MapPin, Clock, DollarSign, User, Send, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNotifications } from '@/contexts/NotificationContext';
import { applicationsAPI, type Job } from '@/services/api';
import { getCurrencyPlaceholder } from '@/lib/utils';

interface JobApplicationModalProps {
  job: Job | null;
  isOpen: boolean;
  onClose: () => void;
  onApplicationSubmitted?: () => void;
}

const JobApplicationModal: React.FC<JobApplicationModalProps> = ({
  job,
  isOpen,
  onClose,
  onApplicationSubmitted
}) => {
  const [applicationData, setApplicationData] = useState({
    message: '',
    proposedBudget: '',
    availableDate: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { addNotification } = useNotifications();

  const handleInputChange = (field: string, value: string) => {
    setApplicationData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!job) return;

    setIsSubmitting(true);

    try {
      await applicationsAPI.createApplication({
        jobId: job.id,
        hustlerId: 'current-user-id', // In real app, get from auth context
        hustlerName: 'Current User', // In real app, get from auth context
        message: applicationData.message,
        proposedBudget: applicationData.proposedBudget || job.budget
      });

      // Add success notification
      addNotification({
        title: 'Application Submitted!',
        message: `Your application for "${job.title}" has been sent to the client.`,
        type: 'success',
        actionUrl: '/hustler-dashboard'
      });

      toast({
        title: 'Application Submitted!',
        description: 'Your application has been sent to the client.',
      });

      // Reset form
      setApplicationData({
        message: '',
        proposedBudget: '',
        availableDate: ''
      });

      onApplicationSubmitted?.();
      onClose();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to submit application. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setApplicationData({
      message: '',
      proposedBudget: '',
      availableDate: ''
    });
    onClose();
  };

  if (!job) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Apply for Job</DialogTitle>
          <DialogDescription>
            Submit your application and proposal for this job opportunity.
          </DialogDescription>
        </DialogHeader>

        {/* Job Details Summary */}
        <div className="bg-muted/30 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-3">
            <h3 className="font-semibold text-lg">{job.title}</h3>
            <Badge variant="secondary">{job.category}</Badge>
          </div>
          
          <p className="text-sm text-muted-foreground mb-3">
            {job.description}
          </p>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <DollarSign className="h-4 w-4" />
              <span className="font-medium">{job.budget}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>{job.clientName}</span>
            </div>
            {job.duration && (
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{job.duration}</span>
              </div>
            )}
          </div>

          {job.requirements && job.requirements.length > 0 && (
            <div className="mt-3">
              <p className="text-sm font-medium mb-2">Requirements:</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                {job.requirements.map((req, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="w-1 h-1 bg-muted-foreground rounded-full" />
                    {req}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <Separator />

        {/* Application Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="message">Cover Message *</Label>
            <Textarea
              id="message"
              placeholder="Explain why you're the right person for this job. Include relevant experience and availability..."
              value={applicationData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              required
              rows={4}
            />
            <p className="text-xs text-muted-foreground">
              This message will be sent to the client along with your profile.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="proposedBudget">Your Budget (Optional)</Label>
              <Input
                id="proposedBudget"
                placeholder={getCurrencyPlaceholder(job.budget)}
                value={applicationData.proposedBudget}
                onChange={(e) => handleInputChange('proposedBudget', e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Leave empty to accept the posted budget
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="availableDate">Available From</Label>
              <Input
                id="availableDate"
                type="date"
                value={applicationData.availableDate}
                onChange={(e) => handleInputChange('availableDate', e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>

          <div className="bg-blue-50 p-3 rounded-lg text-sm">
            <p className="font-medium text-blue-900 mb-1">💡 Application Tips:</p>
            <ul className="text-blue-800 space-y-1">
              <li>• Be specific about your experience and skills</li>
              <li>• Mention your availability and timeline</li>
              <li>• Ask relevant questions about the job</li>
              <li>• Keep your message professional and friendly</li>
            </ul>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={handleClose} className="flex-1">
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting || !applicationData.message.trim()}
              className="flex-1"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Submit Application
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default JobApplicationModal;