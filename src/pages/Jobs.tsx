import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, Clock, DollarSign, Filter } from "lucide-react";

const mockJobs = [
  {
    id: 1,
    title: "House Cleaning Service Needed",
    description: "Looking for a reliable person to clean a 3-bedroom house. Deep cleaning required.",
    category: "Cleaning",
    budget: "KSh 3,000",
    location: "Nairobi, Westlands",
    postedTime: "2 hours ago",
    status: "Open",
    applicants: 5
  },
  {
    id: 2,
    title: "Plumbing Repair - Kitchen Sink",
    description: "Kitchen sink is blocked and needs professional attention. Urgent job.",
    category: "Plumbing",
    budget: "KSh 2,500",
    location: "Nairobi, Kilimani",
    postedTime: "4 hours ago",
    status: "Open",
    applicants: 3
  },
  {
    id: 3,
    title: "Math Tutoring for High School Student",
    description: "Need experienced math tutor for Form 3 student. 3 sessions per week.",
    category: "Tutoring",
    budget: "KSh 5,000/month",
    location: "Nairobi, Karen",
    postedTime: "1 day ago",
    status: "Open",
    applicants: 8
  },
  {
    id: 4,
    title: "Furniture Moving Service",
    description: "Moving to a new house, need help with furniture and boxes. 2-3 hours work.",
    category: "Moving",
    budget: "KSh 4,000",
    location: "Nairobi, Kasarani",
    postedTime: "6 hours ago",
    status: "Open",
    applicants: 12
  },
  {
    id: 5,
    title: "Logo Design for Small Business",
    description: "Need a professional logo design for a new restaurant. Creative and modern style.",
    category: "Design",
    budget: "KSh 8,000",
    location: "Remote",
    postedTime: "3 days ago",
    status: "Open",
    applicants: 15
  }
];

const categories = ["All", "Cleaning", "Plumbing", "Tutoring", "Moving", "Design", "Delivery", "Tech"];

const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("newest");

  const filteredJobs = mockJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || job.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Browse Jobs</h1>
        <p className="text-muted-foreground">
          Find your next opportunity from {mockJobs.length} available jobs
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="budget-high">Highest Budget</SelectItem>
              <SelectItem value="budget-low">Lowest Budget</SelectItem>
              <SelectItem value="applicants">Most Applicants</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Job Results */}
      <div className="grid gap-6">
        {filteredJobs.map((job) => (
          <Card key={job.id} className="hover:shadow-card transition-all duration-300">
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <CardTitle className="text-xl">{job.title}</CardTitle>
                    <Badge variant="secondary">{job.category}</Badge>
                  </div>
                  <CardDescription className="text-base mb-3">
                    {job.description}
                  </CardDescription>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4" />
                      {job.budget}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {job.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {job.postedTime}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    {job.status}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {job.applicants} applicants
                  </span>
                <Button 
                  onClick={() => handleApply(job.id)}
                  className="shadow-glow"
                  disabled={appliedJobs.some(app => app.id === job.id)}
                >
                  <Send className="h-3 w-3 mr-1" />
                  {appliedJobs.some(app => app.id === job.id) ? 'Applied' : 'Apply'}
                </Button>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>

      {filteredJobs.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            No jobs found matching your criteria.
          </p>
          <Button variant="outline" className="mt-4" onClick={() => {
            setSearchTerm("");
            setSelectedCategory("All");
          }}>
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default Jobs;