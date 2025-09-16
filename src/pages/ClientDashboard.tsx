import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Eye, Users, Clock, CheckCircle, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getCurrencyPlaceholder } from "@/lib/utils";

const mockClientJobs = [
  {
    id: 1,
    title: "House Cleaning Service",
    category: "Cleaning",
    budget: "KSh 3,000",
    status: "Open",
    applicants: 5,
    description: "Deep cleaning for 3-bedroom house",
    postedDate: "2024-01-15"
  },
  {
    id: 2,
    title: "Logo Design",
    category: "Design",
    budget: "KSh 8,000",
    status: "In Progress",
    applicants: 15,
    description: "Modern logo for restaurant",
    postedDate: "2024-01-10"
  },
  {
    id: 3,
    title: "Math Tutoring",
    category: "Tutoring",
    budget: "KSh 5,000/month",
    status: "Completed",
    applicants: 8,
    description: "High school math tutoring",
    postedDate: "2024-01-05"
  }
];

const categories = ["Cleaning", "Plumbing", "Tutoring", "Moving", "Design", "Delivery", "Tech"];

const ClientDashboard = () => {
  const [jobs, setJobs] = useState(mockClientJobs);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newJob, setNewJob] = useState({
    title: "",
    description: "",
    category: "",
    budget: "",
    location: ""
  });
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setNewJob(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmitJob = (e: React.FormEvent) => {
    e.preventDefault();
    
    const job = {
      id: jobs.length + 1,
      title: newJob.title,
      category: newJob.category,
      budget: newJob.budget,
      status: "Open" as const,
      applicants: 0,
      description: newJob.description,
      postedDate: new Date().toISOString().split('T')[0]
    };

    setJobs(prev => [job, ...prev]);
    setNewJob({ title: "", description: "", category: "", budget: "", location: "" });
    setIsDialogOpen(false);
    
    toast({
      title: "Job Posted Successfully!",
      description: "Your job has been posted and is now visible to hustlers.",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open": return "bg-green-50 text-green-700 border-green-200";
      case "In Progress": return "bg-blue-50 text-blue-700 border-blue-200";
      case "Completed": return "bg-gray-50 text-gray-700 border-gray-200";
      default: return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const stats = {
    totalJobs: jobs.length,
    openJobs: jobs.filter(j => j.status === "Open").length,
    inProgress: jobs.filter(j => j.status === "In Progress").length,
    completed: jobs.filter(j => j.status === "Completed").length
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Client Dashboard</h1>
          <p className="text-muted-foreground">Manage your job postings and track applications</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="shadow-glow">
              <Plus className="h-4 w-4 mr-2" />
              Post New Job
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Post a New Job</DialogTitle>
              <DialogDescription>
                Fill in the details to post your job and start receiving applications.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmitJob} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Job Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., House cleaning service needed"
                  value={newJob.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={newJob.category} onValueChange={(value) => handleInputChange("category", value)} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="budget">Budget</Label>
                <Input
                  id="budget"
                  placeholder={getCurrencyPlaceholder(5000)}
                  value={newJob.budget}
                  onChange={(e) => handleInputChange("budget", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="e.g., Nairobi, Westlands"
                  value={newJob.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the job requirements..."
                  value={newJob.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Post Job
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <DollarSign className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Jobs</p>
                <p className="text-2xl font-bold">{stats.totalJobs}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <Clock className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Open</p>
                <p className="text-2xl font-bold">{stats.openJobs}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">In Progress</p>
                <p className="text-2xl font-bold">{stats.inProgress}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-gray-100 rounded-lg">
                <CheckCircle className="h-4 w-4 text-gray-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold">{stats.completed}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Jobs List */}
      <Card>
        <CardHeader>
          <CardTitle>Your Posted Jobs</CardTitle>
          <CardDescription>
            Manage and track your job postings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {jobs.map((job) => (
              <div key={job.id} className="flex flex-col md:flex-row md:items-center md:justify-between p-4 border rounded-lg hover:shadow-sm transition-shadow">
                <div className="flex-1 mb-4 md:mb-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold">{job.title}</h3>
                    <Badge variant="secondary">{job.category}</Badge>
                    <Badge variant="outline" className={getStatusColor(job.status)}>
                      {job.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{job.description}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{job.budget}</span>
                    <span>{job.applicants} applicants</span>
                    <span>Posted {job.postedDate}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    View Applications
                  </Button>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientDashboard;