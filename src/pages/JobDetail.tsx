import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  MapPin, 
  Clock, 
  DollarSign, 
  User, 
  ArrowLeft, 
  Send, 
  Star,
  Shield,
  Calendar,
  CheckCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { jobsAPI, applicationsAPI, type Job, type JobApplication } from '@/services/api';
import LoadingSpinner from '@/components/LoadingSpinner';
import JobApplicationModal from '@/components/JobApplicationModal';
import { formatDistanceToNow } from 'date-fns';

const JobDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [job, setJob] = useState<Job | null>(null);
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);

  useEffect(() => {
    const fetchJobData = async () => {
      if (!id) return;
      
      setIsLoading(true);
      try {
        const jobData = await jobsAPI.getJobById(id);
        setJob(jobData);

        // Check if user has already applied (for hustlers)
        if (user?.role === 'hustler') {
          const userApplications = await applicationsAPI.getHustlerApplications(user.id);
          const hasAppliedToJob = userApplications.some(app => app.jobId === id);
          setHasApplied(hasAppliedToJob);
        }

        // Load applications if user is the client who posted the job
        if (user?.role === 'client' && jobData.clientId === user.id) {
          const jobApplications = await applicationsAPI.getJobApplications(id);
          setApplications(jobApplications);
        }
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to load job details',
          variant: 'destructive'
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobData();
  }, [id, user, toast]);

  const handleApplicationSubmitted = () => {
    setHasApplied(true);
    if (job) {
      setJob({ ...job, applicantCount: job.applicantCount + 1 });
    }
  };

  const handleAcceptApplication = async (applicationId: string) => {
    try {
      await applicationsAPI.updateApplicationStatus(applicationId, 'accepted');
      setApplications(prev => 
        prev.map(app => 
          app.id === applicationId 
            ? { ...app, status: 'accepted' }
            : app
        )
      );
      toast({
        title: 'Application Accepted',
        description: 'The hustler has been notified of your decision.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to accept application',
        variant: 'destructive'
      });
    }
  };

  const handleRejectApplication = async (applicationId: string) => {
    try {
      await applicationsAPI.updateApplicationStatus(applicationId, 'rejected');
      setApplications(prev => 
        prev.map(app => 
          app.id === applicationId 
            ? { ...app, status: 'rejected' }
            : app
        )
      );
      toast({
        title: 'Application Rejected',
        description: 'The hustler has been notified of your decision.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to reject application',
        variant: 'destructive'
      });
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <LoadingSpinner size="lg" text="Loading job details..." />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Job Not Found</h1>
        <p className="text-muted-foreground mb-4">The job you're looking for doesn't exist.</p>
        <Button onClick={() => navigate('/jobs')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Jobs
        </Button>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-green-50 text-green-700 border-green-200';
      case 'in-progress': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'completed': return 'bg-gray-50 text-gray-700 border-gray-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getApplicationStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'accepted': return 'bg-green-50 text-green-700 border-green-200';
      case 'rejected': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Job Details */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <CardTitle className="text-2xl">{job.title}</CardTitle>
                    <Badge variant="secondary">{job.category}</Badge>
                    <Badge variant="outline" className={getStatusColor(job.status)}>
                      {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                    </Badge>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span>{job.clientName}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>Posted {formatDistanceToNow(new Date(job.postedDate), { addSuffix: true })}</span>
                    </div>
                  </div>
                </div>
                
                {user?.role === 'hustler' && job.status === 'open' && (
                  <div className="flex flex-col items-end gap-2">
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary">{job.budget}</p>
                      {job.duration && (
                        <p className="text-sm text-muted-foreground">{job.duration}</p>
                      )}
                    </div>
                    <Button 
                      onClick={() => setIsApplicationModalOpen(true)}
                      disabled={hasApplied}
                      className="shadow-glow"
                    >
                      {hasApplied ? (
                        <>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Applied
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Apply Now
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">Job Description</h3>
                  <p className="text-muted-foreground leading-relaxed">{job.description}</p>
                </div>

                {job.requirements && job.requirements.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-2">Requirements</h3>
                    <ul className="space-y-2">
                      {job.requirements.map((requirement, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{requirement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <Separator />

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{job.applicantCount} applicants</span>
                  <div className="flex items-center gap-1">
                    <Shield className="h-4 w-4" />
                    <span>Verified Job</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Job Info Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Job Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Budget</span>
                <span className="font-semibold">{job.budget}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Duration</span>
                <span className="font-semibold">{job.duration || 'Not specified'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Location</span>
                <span className="font-semibold">{job.location}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Category</span>
                <Badge variant="secondary">{job.category}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Posted</span>
                <span className="font-semibold">
                  {formatDistanceToNow(new Date(job.postedDate), { addSuffix: true })}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Client Info Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">About the Client</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>{job.clientName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{job.clientName}</p>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Star className="h-3 w-3 text-yellow-500 fill-current" />
                    <span>4.9 (23 reviews)</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-3">
                Active client on JuaHustle with multiple successful projects completed.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Applications Section (for clients) */}
      {user?.role === 'client' && job.clientId === user.id && applications.length > 0 && (
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Applications ({applications.length})</CardTitle>
              <CardDescription>
                Review and manage applications for this job
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {applications.map((application) => (
                  <div key={application.id} className="border rounded-lg p-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>{application.hustlerName.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold">{application.hustlerName}</p>
                            {application.hustlerProfile && (
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Star className="h-3 w-3 text-yellow-500 fill-current" />
                                  <span>{application.hustlerProfile.rating}</span>
                                </div>
                                <span>•</span>
                                <span>{application.hustlerProfile.completedJobs} jobs</span>
                              </div>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{application.message}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          {application.proposedBudget && (
                            <span>Proposed: {application.proposedBudget}</span>
                          )}
                          <span>Applied {formatDistanceToNow(new Date(application.appliedDate), { addSuffix: true })}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={getApplicationStatusColor(application.status)}>
                          {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                        </Badge>
                        {application.status === 'pending' && (
                          <>
                            <Button 
                              size="sm" 
                              onClick={() => handleAcceptApplication(application.id)}
                            >
                              Accept
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleRejectApplication(application.id)}
                            >
                              Reject
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Job Application Modal */}
      <JobApplicationModal
        job={job}
        isOpen={isApplicationModalOpen}
        onClose={() => setIsApplicationModalOpen(false)}
        onApplicationSubmitted={handleApplicationSubmitted}
      />
    </div>
  );
};

export default JobDetail;