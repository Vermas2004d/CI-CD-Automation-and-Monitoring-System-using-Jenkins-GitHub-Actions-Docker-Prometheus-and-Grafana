import React from 'react';
import { 
  Train, Users, Shield, Clock, Award, Target, Heart, Zap, 
  Globe2, CheckCircle, Sparkles, TrendingUp, Phone, Mail,
  Linkedin, Github, Code2, Layers, Rocket
} from 'lucide-react';

const Aboutus = () => {
  const stats = [
    { icon: Users, label: 'Active Users', value: '176K+', color: 'text-blue-600', bg: 'bg-blue-50' },
    { icon: Train, label: 'Trains Available', value: '156+', color: 'text-green-600', bg: 'bg-green-50' },
    { icon: CheckCircle, label: 'Tickets Booked', value: '2M+', color: 'text-purple-600', bg: 'bg-purple-50' },
    { icon: Award, label: 'Customer Rating', value: '4.8/5', color: 'text-orange-600', bg: 'bg-orange-50' }
  ];

  const features = [
    {
      icon: Zap,
      title: 'Tatkal Booking',
      desc: 'Lightning-fast ticket booking with real-time countdown. Opens at 10:00 AM (AC) / 11:00 AM (Non-AC)',
      gradient: 'from-orange-500 to-red-500'
    },
    {
      icon: Globe2,
      title: 'Tour Packages',
      desc: 'Curated journeys across India including Golden Triangle, Kerala Backwaters, and Himalayan Adventures',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Train,
      title: 'Coach Seating Layout',
      desc: 'View detailed seating arrangements for all coach types (1A, 2A, 3A, SL, CC) with zoom capabilities',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: Clock,
      title: 'Real-Time Tracking',
      desc: 'Track trains live, check PNR status, and get instant platform information',
      gradient: 'from-purple-500 to-pink-500'
    }
  ];

  const services = [
    { name: 'Easy Booking', desc: 'Book tickets in just a few clicks with intuitive interface' },
    { name: 'Train Services', desc: 'Wi-Fi, charging points, bedding service, and accessibility features' },
    { name: 'Food Ordering', desc: 'Pre-order meals delivered directly to your seat' },
    { name: 'Seat Availability', desc: 'Real-time availability across all classes: AC First, 2-Tier, 3-Tier, Sleeper' },
    { name: 'Train Status', desc: 'Live running status with expected arrival times' },
    { name: '24/7 Support', desc: 'Call us at 139 (Toll-Free) or email support@railsync.in' }
  ];

  const values = [
    { icon: Target, title: 'Our Mission', desc: 'To revolutionize railway travel in India by providing a comprehensive, user-friendly digital platform that simplifies every aspect of train journey planning. We aim to eliminate the complexities of traditional booking systems and make rail travel accessible, efficient, and enjoyable for millions of travelers across the nation.' },
    { icon: Heart, title: 'Our Vision', desc: 'To be India\'s most trusted and innovative railway travel partner, setting new standards in digital railway services. We envision a future where booking train tickets, accessing travel information, and managing journeys is as seamless as ordering food online - all while maintaining the highest standards of security and reliability.' },
    { icon: Shield, title: 'Our Values', desc: 'Security, transparency, innovation, and customer-centricity are at the core of everything we do. We believe in building trust through reliable service, protecting user data with industry-standard encryption, constantly innovating to improve user experience, and always putting our travelers\' needs first. Our commitment extends beyond transactions to building lasting relationships with our community.' }
  ];

  const teamMembers = [
    {
      name: 'Arpit Kumar',
      role: 'Project Owner & Full Stack Developer',
      image: '/api/placeholder/200/200',
      bio: 'Arpit is the visionary behind RailSync, leading the project from conception to execution. With expertise in full-stack development, he architected the entire platform using React 19, Express 5, and MongoDB. His passion for creating seamless user experiences and solving real-world problems drives the project forward.',
      skills: ['React 19', 'Node.js', 'MongoDB', 'System Architecture', 'UI/UX Design'],
      linkedin: 'www.linkedin.com/in/arpit-kumar98',
      github: 'https://github.com/Arpit-K8'
    },
    {
      name: 'Madhav Verma',
      role: 'Core Contributor & Backend Specialist',
      image: '/api/placeholder/200/200',
      bio: 'Madhav has been instrumental in building the robust backend infrastructure of RailSync. His contributions include implementing secure authentication systems, payment gateway integration with Razorpay, and optimizing database queries for performance. His attention to detail ensures the platform runs smoothly under high traffic.',
      skills: ['Express.js', 'JWT Auth', 'Razorpay Integration', 'API Design', 'Database Optimization'],
      linkedin: 'https://www.linkedin.com/in/madhavverma0/',
      github: 'https://github.com/Vermas2004d'
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Hero Section */}
      <div className="relative bg-linear-to-br from-[#1C335C] via-[#2a4d8a] to-[#008BD0] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 50px, rgba(255,255,255,0.1) 50px, rgba(255,255,255,0.1) 52px)',
          }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Your Trusted Railway Travel Partner</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
              About <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-200 to-cyan-300">RailSync</span>
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Transforming India's railway travel experience with cutting-edge technology and innovative solutions. 
              RailSync is more than just a booking platform - it's your complete travel companion, built with passion 
              by developers who understand the challenges of modern rail travel. From rapid Tatkal bookings to curated 
              tour packages, we're redefining what's possible in railway e-commerce.
            </p>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" className="w-full h-16 md:h-24">
            <path fill="#f9fafb" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
          </svg>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <div className={`inline-flex p-3 rounded-xl ${stat.bg} mb-3`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <p className="text-3xl font-bold text-[#1C335C] mb-1">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Mission, Vision, Values */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {values.map((item, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-md p-8 hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="inline-flex p-4 rounded-xl bg-blue-50 mb-4">
                <item.icon className="w-8 h-8 text-[#008BD0]" />
              </div>
              <h3 className="text-xl font-bold text-[#1C335C] mb-3">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Key Features */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#1C335C] mb-4">What Makes Us Special</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Innovative features designed to make your railway journey smooth and hassle-free
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-all group">
                <div className={`inline-flex p-3 rounded-xl bg-linear-to-br ${feature.gradient} mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#1C335C] mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Our Services */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#1C335C] mb-4">Comprehensive Services</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need for a perfect railway journey, all in one platform
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {services.map((service, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-md p-6 border-l-4 border-[#008BD0] hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#008BD0] shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-[#1C335C] mb-1">{service.name}</h4>
                    <p className="text-sm text-gray-600">{service.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technology Stack */}
        <div className="bg-linear-to-br from-blue-50 to-cyan-50 rounded-3xl p-8 md:p-12 mb-20">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-[#1C335C] mb-4">Built with Modern Technology</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Powered by React 19, Tailwind CSS 4, and MongoDB for a fast, secure, and scalable experience
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {['React 19', 'Tailwind CSS 4', 'MongoDB', 'Express.js', 'Vite', 'Mongoose', 'Lucide Icons', 'React Router'].map((tech, idx) => (
              <div key={idx} className="bg-white rounded-lg py-4 px-3 shadow-sm">
                <p className="font-semibold text-[#1C335C]">{tech}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="bg-linear-to-r from-[#1C335C] to-[#008BD0] rounded-3xl p-8 md:p-12 text-white text-center mb-20">
          <TrendingUp className="w-12 h-12 mx-auto mb-4 text-blue-200" />
          <h2 className="text-3xl font-bold mb-4">Join 176K+ Happy Travelers</h2>
          <p className="text-blue-100 text-lg mb-6 max-w-2xl mx-auto">
            Experience the future of railway travel. Book your tickets with confidence and travel with ease.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="flex items-center gap-2 text-blue-100">
              <Phone className="w-5 h-5" />
              <span>139 (Toll-Free)</span>
            </div>
            <div className="flex items-center gap-2 text-blue-100">
              <Mail className="w-5 h-5" />
              <span>support@railsync.in</span>
            </div>
          </div>
        </div>

        {/* Our Story */}
        <div className="mb-20">
          <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="bg-linear-to-br from-blue-600 to-cyan-600 p-8 md:p-12 text-white flex items-center">
                <div>
                  <Rocket className="w-12 h-12 mb-4 text-blue-200" />
                  <h2 className="text-3xl font-bold mb-4">Our Journey</h2>
                  <p className="text-blue-100 leading-relaxed mb-4">
                    RailSync was born out of a simple observation: railway travel in India needed a modern, 
                    comprehensive digital solution that could handle everything from instant Tatkal bookings 
                    to luxury tour packages, all in one place.
                  </p>
                  <p className="text-blue-100 leading-relaxed">
                    After 19 days of intensive development, countless iterations, and overcoming technical 
                    challenges (including recreating our entire repository), we've built a platform that 
                    serves over 176,000 active users and facilitates 2 million+ ticket bookings.
                  </p>
                </div>
              </div>
              <div className="p-8 md:p-12">
                <h3 className="text-2xl font-bold text-[#1C335C] mb-6">What Sets Us Apart</h3>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <Code2 className="w-5 h-5 text-[#008BD0]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#1C335C] mb-1">Modern Tech Stack</h4>
                      <p className="text-gray-600 text-sm">Built with React 19, Express 5, and MongoDB for blazing-fast performance</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                      <Shield className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#1C335C] mb-1">Bank-Grade Security</h4>
                      <p className="text-gray-600 text-sm">JWT authentication, encrypted data, and secure payment processing with Razorpay</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="shrink-0 w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                      <Layers className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#1C335C] mb-1">Comprehensive Features</h4>
                      <p className="text-gray-600 text-sm">From basic bookings to luxury tours, live tracking, and food ordering - all integrated</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="shrink-0 w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                      <Zap className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#1C335C] mb-1">Lightning Fast</h4>
                      <p className="text-gray-600 text-sm">Optimized queries, CDN integration, and smart caching for instant responses</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Meet Our Team */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200 mb-4">
              <Users className="w-4 h-4 text-[#008BD0]" />
              <span className="text-sm font-medium text-[#1C335C]">The Minds Behind RailSync</span>
            </div>
            <h2 className="text-4xl font-bold text-[#1C335C] mb-4">Meet Our Team</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Passionate developers committed to revolutionizing railway travel through innovative technology and exceptional user experiences
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            {teamMembers.map((member, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all hover:-translate-y-2 group w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] max-w-sm">
                <div className="bg-linear-to-br from-[#1C335C] to-[#008BD0] p-8 text-center relative overflow-hidden">
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                      backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)',
                    }}></div>
                  </div>
                  <div className="relative z-10">
                    <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-white p-1 shadow-xl">
                      <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center text-4xl font-bold text-[#1C335C]">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                    <p className="text-blue-200 text-sm font-medium">{member.role}</p>
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="text-gray-600 leading-relaxed mb-4 text-sm">
                    {member.bio}
                  </p>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-[#1C335C] mb-2">Expertise:</h4>
                    <div className="flex flex-wrap gap-2">
                      {member.skills.map((skill, skillIdx) => (
                        <span key={skillIdx} className="px-3 py-1 bg-blue-50 text-[#008BD0] rounded-full text-xs font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-gray-100">
                    <a href={member.linkedin} className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors group/link">
                      <Linkedin className="w-4 h-4 text-[#008BD0]" />
                      <span className="text-sm font-medium text-[#1C335C]">LinkedIn</span>
                    </a>
                    <a href={member.github} className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors group/link">
                      <Github className="w-4 h-4 text-gray-700" />
                      <span className="text-sm font-medium text-[#1C335C]">GitHub</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <div className="inline-block bg-linear-to-r from-blue-50 to-cyan-50 rounded-2xl p-8 border border-blue-100">
              <Heart className="w-10 h-10 text-red-500 mx-auto mb-3" />
              <h3 className="text-xl font-bold text-[#1C335C] mb-2">Built with Passion</h3>
              <p className="text-gray-600 max-w-2xl">
                This project represents countless hours of dedication, problem-solving, and innovation. 
                Despite challenges including rebuilding our entire codebase, our team remained committed 
                to delivering a world-class railway booking experience. Special thanks to every contributor 
                who helped make RailSync a reality.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* <Footer /> */}
    </div>
  );
};

export default Aboutus;