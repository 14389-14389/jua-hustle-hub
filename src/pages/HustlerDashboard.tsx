import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { User, Star, MapPin, Clock, DollarSign, Send, Settings } from "lucide-react";

const mockHustlerJobs = [
  {
    id: 1,
    title: "House Cleaning Service Needed",
    client: "Sarah K.",
    budget: "KSh 3,000",
    location: "Nairobi, Westlands",
    status: "Applied",
    appliedDate: "2024-01-15",
    description: "Deep cleaning for 3-bedroom house"
  },
  {
    id: 2,
    title: "Math Tutoring for High School",
    client: "John M.",
    budget: "KSh 5,000/month",
    location: "Nairobi, Karen",
    status: "Interviewing",
    appliedDate: "2024-01-12",
    description: "Form 3 student needs math help"
  },
  {
    id: 3,
    title: "Furniture Moving Service",
    client: "Mary W.",
    budget: "KSh 4,000",
    location: "Nairobi, Kasarani",
    status: "Hired",
    appliedDate: "2024-01-10",
    description: "Moving furniture to new house"
  }
];

const availableJobs = [
  {
    id: 4,
    title: "Plumbing Repair - Kitchen Sink",
    client: "David L.",
    budget: "KSh 2,500",
    location: "Nairobi, Kilimani",
    postedTime: "4 hours ago",
    description: "Kitchen sink blocked, needs urgent attention"
  },
  {
    id: 5,
    title: "Logo Design for Restaurant",
    client: "Grace N.",
    budget: "KSh 8,000",
    location: "Remote",
    postedTime: "1 day ago",
    description: "Creative modern logo needed"
  }
];

const HustlerDashboard = () => {
  const [appliedJobs, setAppliedJobs] = useState(mockHustlerJobs);
  const [profile, setProfile] = useState({
    name: "Alex Mwangi",
    rating: 4.8,
    completedJobs: 23,
    skills: ["Cleaning", "Tutoring", "Moving"],
    bio: "Experienced hustler with 2+ years in various services. Reliable and professional."
  });
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Applied": return "bg-blue-50 text-blue-700 border-blue-200";
      case "Interviewing": return "bg-orange-50 text-orange-700 border-orange-200";
      case "Hired": return "bg-green-50 text-green-700 border-green-200";
      case "Rejected": return "bg-red-50 text-red-700 border-red-200";
      default: return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const handleApply = (jobId: number) => {
    // In a real app, this would make an API call
    const job = availableJobs.find(j => j.id === jobId);
    if (job) {
      const newApplication = {
        id: jobId,
        title: job.title,
        client: job.client,
        budget: job.budget,
        location: job.location,
        status: "Applied" as const,
        appliedDate: new Date().toISOString().split('T')[0],
        description: job.description
      };
      setAppliedJobs(prev => [newApplication, ...prev]);
    }
  };

  const stats = {
    applied: appliedJobs.filter(j => j.status === "Applied").length,
    interviewing: appliedJobs.filter(j => j.status === "Interviewing").length,
    hired: appliedJobs.filter(j => j.status === "Hired").length,
    completed: profile.completedJobs
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Hustler Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {profile.name}!</p>
        </div>
        <Dialog open={isProfileDialogOpen} onOpenChange={setIsProfileDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">
              <Settings className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Profile</DialogTitle>
              <DialogDescription>
                Update your profile to attract more clients.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={profile.name}
                  onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="skills">Skills (comma separated)</Label>
                <Input
                  id="skills"
                  value={profile.skills.join(", ")}
                  onChange={(e) => setProfile(prev => ({ 
                    ...prev, 
                    skills: e.target.value.split(", ").filter(s => s.trim())
                  }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={profile.bio}
                  onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                />
              </div>
              <Button className="w-full" onClick={() => setIsProfileDialogOpen(false)}>
                Save Changes
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Profile Card */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
              <User className="h-8 w-8 text-white" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-xl">{profile.name}</CardTitle>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="font-medium">{profile.rating}</span>
                </div>
                <span className="text-muted-foreground">{profile.completedJobs} jobs completed</span>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {profile.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary">{skill}</Badge>
                ))}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{profile.bio}</p>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{stats.applied}</p>
              <p className="text-sm text-muted-foreground">Applied</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">{stats.interviewing}</p>
              <p className="text-sm text-muted-foreground">Interviewing</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{stats.hired}</p>
              <p className="text-sm text-muted-foreground">Hired</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">{stats.completed}</p>
              <p className="text-sm text-muted-foreground">Completed</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Available Jobs */}
        <Card>
          <CardHeader>
            <CardTitle>Available Jobs</CardTitle>
            <CardDescription>New opportunities for you</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {availableJobs.map((job) => (
                <div key={job.id} className="p-4 border rounded-lg hover:shadow-sm transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">{job.title}</h3>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      {job.budget}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{job.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-3 w-3" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{job.postedTime}</span>
                      </div>
                    </div>
                    <Button size="sm" onClick={() => handleApply(job.id)}>
                      <Send className="h-3 w-3 mr-1" />
                      Apply
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* My Applications */}
        <Card>
          <CardHeader>
            <CardTitle>My Applications</CardTitle>
            <CardDescription>Track your job applications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {appliedJobs.map((job) => (
                <div key={job.id} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">{job.title}</h3>
                    <Badge variant="outline" className={getStatusColor(job.status)}>
                      {job.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{job.description}</p>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center space-x-4">
                      <span>Client: {job.client}</span>
                      <span>{job.budget}</span>
                    </div>
                    <span>Applied {job.appliedDate}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HustlerDashboard;