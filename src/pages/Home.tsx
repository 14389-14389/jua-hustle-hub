import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  Wrench, 
  Sparkles, 
  Truck, 
  GraduationCap, 
  Paintbrush, 
  Laptop, 
  Users, 
  Shield, 
  Clock,
  ArrowRight
} from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const jobCategories = [
  { icon: Wrench, title: "Plumbing & Repair", jobs: "120+ jobs", color: "bg-blue-500" },
  { icon: Sparkles, title: "Cleaning Services", jobs: "85+ jobs", color: "bg-purple-500" },
  { icon: Truck, title: "Delivery & Moving", jobs: "95+ jobs", color: "bg-green-500" },
  { icon: GraduationCap, title: "Tutoring & Teaching", jobs: "60+ jobs", color: "bg-orange-500" },
  { icon: Paintbrush, title: "Design & Creative", jobs: "40+ jobs", color: "bg-pink-500" },
  { icon: Laptop, title: "Tech & Digital", jobs: "55+ jobs", color: "bg-indigo-500" },
];

const features = [
  {
    icon: Users,
    title: "Trusted Community",
    description: "Connect with verified hustlers and reliable clients in your area"
  },
  {
    icon: Shield,
    title: "Secure Payments",
    description: "Safe and secure payment processing with M-Pesa integration"
  },
  {
    icon: Clock,
    title: "Quick Matching",
    description: "Find the right person for your job or get hired faster"
  }
];

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="container mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                Your Hustle,{" "}
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Our Platform
                </span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
                Connect with skilled hustlers for any job, or offer your services to clients who need them. 
                JuaHustle makes finding work and workers simple, fast, and reliable.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="lg" className="shadow-glow" asChild>
                  <Link to="/signup">
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/jobs">Browse Jobs</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <img 
                src={heroImage} 
                alt="JuaHustle community working" 
                className="rounded-2xl shadow-card w-full h-auto"
              />
              <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold shadow-glow">
                Join 1000+ Hustlers
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Job Categories */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Popular Job Categories</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Discover opportunities across various industries and skills
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <Card key={index} className="hover:shadow-card transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${category.color} text-white`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{category.title}</CardTitle>
                        <Badge variant="secondary" className="mt-1">
                          {category.jobs}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose JuaHustle?</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We make it easy to connect, work, and grow together
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <div className="mx-auto w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Hustle?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of hustlers and clients who trust JuaHustle for their work needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/signup">
                Post a Job
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary" asChild>
              <Link to="/signup">
                Find Work
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;