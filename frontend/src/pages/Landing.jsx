import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  ArrowRight, 
  Play, 
  Star, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Shield, 
  BarChart3,
  Users,
  Award // or ScrollText, depending on your preference
} from "lucide-react"
import { Link } from "react-router-dom"
import axios from "axios"

const Landing = () => {
  const [testimonials , setTestimonials] = useState([]);
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  useEffect(() => {
  const fetchTestimonials = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API}/review/top`);
      console.log("fetched testimonials : " , response.data);
      setTestimonials(response.data.reviews || []);
    } catch (error) {
      console.error("failed to fetch testimonials", error);
    }
  };

  fetchTestimonials();
}, []);


  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <Badge variant="secondary" className="mb-6 px-4 py-2 glass text-blue-100 border-blue-400/30">
            <Sparkles className="w-4 h-4 mr-2" />
            AI-Powered Event Management
          </Badge>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
            Plan. Host. Experience.
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              The Future of Events.
            </span>
          </h1>

          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            AI-powered platform to create, manage, and elevate events like never before. From hackathons to conferences,
            make every moment extraordinary.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link to="/organizer/dashboard">
              <Button
                size="lg"
                className="px-8 py-6 text-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 glow-blue"
              >
                Create Event
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to='/events'><Button
              variant="outline"
              size="lg"
              className="px-8 py-6 text-lg border-blue-400/30 text-blue-100 hover:bg-white/10 hover:text-white bg-transparent"
            >
              <Play className="mr-2 w-5 h-5" />
              Join Event
            </Button>
            </Link>
          </div>

          {/* Platform Preview */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-3xl -z-10" />
            <Card className="p-8 glass border-blue-400/20">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <div className="glass-dark rounded-lg p-4 border border-blue-400/20">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-3 h-3 bg-green-400 rounded-full" />
                      <div className="w-3 h-3 bg-yellow-400 rounded-full" />
                      <div className="w-3 h-3 bg-red-400 rounded-full" />
                    </div>
                    <div className="space-y-2">
                      <div className="h-4 bg-blue-400/20 rounded w-3/4" />
                      <div className="h-4 bg-blue-400/20 rounded w-1/2" />
                      <div className="h-6 bg-blue-500/30 rounded w-full" />
                    </div>
                  </div>
                  <p className="text-sm text-blue-200">Web Dashboard</p>
                </div>
                <div className="space-y-4">
                  <div className="glass-dark rounded-2xl p-4 border border-blue-400/20 max-w-xs mx-auto">
                    <div className="space-y-3">
                      <div className="h-3 bg-blue-400/20 rounded w-full" />
                      <div className="h-3 bg-blue-400/20 rounded w-2/3" />
                      <div className="h-8 bg-blue-500/30 rounded-lg w-full" />
                      <div className="grid grid-cols-2 gap-2">
                        <div className="h-6 bg-blue-400/20 rounded" />
                        <div className="h-6 bg-blue-400/20 rounded" />
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-blue-200">Mobile App</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-white">Everything you need to create extraordinary events</h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Comprehensive tools to manage your events from start to finish
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="p-6 glass border-blue-400/20 hover:glow-blue transition-all duration-300">
            <CardContent className="p-0">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Event Tiers</h3>
              <p className="text-blue-100">
                Choose from Elite, Prime, Spotlight, and Sponsored tiers to get the perfect visibility and features for your event
              </p>
            </CardContent>
          </Card>

          <Card className="p-6 glass border-blue-400/20 hover:glow-purple transition-all duration-300">
            <CardContent className="p-0">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Smart Ticketing</h3>
              <p className="text-blue-100">
                Secure QR-based tickets, flexible seat selection, and automated email confirmations for seamless entry management
              </p>
            </CardContent>
          </Card>

          <Card className="p-6 glass border-blue-400/20 hover:glow-green transition-all duration-300">
            <CardContent className="p-0">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Marketing & Analytics</h3>
              <p className="text-blue-100">
                Email marketing campaigns, attendee feedback system, and comprehensive booking analytics
              </p>
            </CardContent>
          </Card>

          <Card className="p-6 glass border-blue-400/20 hover:glow-orange transition-all duration-300">
            <CardContent className="p-0">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Organizer Dashboard</h3>
              <p className="text-blue-100">
                Manage events, track bookings, handle reviews, and access detailed revenue insights all in one place
              </p>
            </CardContent>
          </Card>

          <Card className="p-6 glass border-blue-400/20 hover:glow-red transition-all duration-300">
            <CardContent className="p-0">
              <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-red-600 rounded-lg flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-white" /> {/* Changed from Certificate to Award */}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Certificates & Custom Sites</h3>
              <p className="text-blue-100">
                Optional participant certificates and personalized event microsites to enhance attendee experience
              </p>
            </CardContent>
          </Card>

          <Card className="p-6 glass border-blue-400/20 hover:glow-indigo transition-all duration-300">
            <CardContent className="p-0">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-lg flex items-center justify-center mb-4">
                <Star className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Review System</h3>
              <p className="text-blue-100">
                Collect and manage attendee feedback with categorized positive, neutral, and negative reviews
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Testimonials Section */}
      {testimonials.length > 0 && (
        <section id="testimonials" className="container mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">Trusted by event organizers worldwide</h2>
            <p className="text-xl text-blue-100">See what our community has to say about their experience</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="p-8 glass border-blue-400/20">
              <CardContent className="p-0">
                <div className="flex items-center justify-between mb-6">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={prevTestimonial}
                    className="rounded-full text-blue-100 hover:bg-blue-400/10"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </Button>
                  <div className="flex space-x-2">
                    {testimonials.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === currentTestimonial ? "bg-blue-400" : "bg-blue-400/30"
                        }`}
                      />
                    ))}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={nextTestimonial}
                    className="rounded-full text-blue-100 hover:bg-blue-400/10"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </div>

                <div className="text-center">
                  <div className="flex justify-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  <blockquote className="text-lg mb-6 italic text-blue-100">
                    "{testimonials[currentTestimonial].review}"
                  </blockquote>

                  <div className="flex items-center justify-center space-x-4">
                    <Avatar>
                      <AvatarImage src={"/placeholder.svg"} />
                      <AvatarFallback className="bg-blue-500 text-white">
                        {testimonials[currentTestimonial]?.user_id?.username
                          ?.split(" ")
                          .map((n) => n[0])
                          .join("") || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-left">
                      <p className="font-semibold text-white">
                        {testimonials[currentTestimonial]?.user_id?.username || "Anonymous"}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="p-12 text-center glass border-blue-400/20 glow-blue">
          <CardContent className="p-0">
            <h2 className="text-4xl font-bold mb-4 text-white">Ready to create your next extraordinary event?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of organizers who trust HostMyShow to bring their vision to life
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="px-8 py-6 text-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 glow-blue"
                >
                  Start Creating
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-6 text-lg border-blue-400/30 text-blue-100 hover:bg-blue-400/10 bg-transparent"
              >
                Schedule Demo
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}

export default Landing;
