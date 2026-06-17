'use client';

import React, { useState } from 'react';
import { 
  Search, Users, Truck, Star, MapPin, Clock, Shield, 
  ArrowRight, CheckCircle, Hammer, Home 
} from 'lucide-react';

interface Job {
  id: number;
  title: string;
  category: string;
  location: string;
  budget: string;
  timeline: string;
  description: string;
}

interface Pro {
  id: number;
  name: string;
  rating: number;
  reviews: number;
  category: string;
  location: string;
  verified: boolean;
  available: string;
}

interface Supplier {
  id: number;
  name: string;
  category: string;
  location: string;
  rating: number;
  products: string;
}

export default function RenoHub() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showPostJob, setShowPostJob] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([
    { id: 1, title: "Kitchen Renovation - Full Gut and Remodel", category: "Kitchen Reno", location: "Toronto, ON", budget: "$25,000 - $45,000", timeline: "6-8 weeks", description: "Complete kitchen renovation including new cabinets, quartz counters, backsplash, and appliances in a detached home in Leaside." },
    { id: 2, title: "Basement Waterproofing & Finishing", category: "Basement", location: "Mississauga, ON", budget: "$18,000 - $32,000", timeline: "4-6 weeks", description: "Waterproofing + full finishing of 800 sq ft basement with 3-piece bathroom and bedroom." },
    { id: 3, title: "Master Bathroom Renovation", category: "Bathroom", location: "Toronto, ON", budget: "$12,000 - $22,000", timeline: "3-4 weeks", description: "Luxury master bath update: new tub, glass shower, heated floors, and custom vanity." },
  ]);

  const [pros] = useState<Pro[]>([
    { id: 1, name: "Apex Renovations Inc.", rating: 4.9, reviews: 187, category: "Full Home Reno", location: "Toronto & GTA", verified: true, available: "Next week" },
    { id: 2, name: "GTA Kitchen Pros", rating: 4.8, reviews: 142, category: "Kitchen & Bath", location: "Toronto, North York, Scarborough", verified: true, available: "This week" },
    { id: 3, name: "Precision Handyman Services", rating: 4.7, reviews: 89, category: "Handyman & Repairs", location: "Mississauga & Etobicoke", verified: true, available: "Tomorrow" },
  ]);

  const [suppliers] = useState<Supplier[]>([
    { id: 1, name: "Toronto Lumber & Building Supply", category: "Lumber & Framing", location: "Toronto", rating: 4.6, products: "Framing lumber, plywood, OSB, engineered wood" },
    { id: 2, name: "Stone & Tile Direct GTA", category: "Tile & Stone", location: "Mississauga", rating: 4.8, products: "Porcelain, ceramic, natural stone, mosaics" },
    { id: 3, name: "Cabinetry Solutions Canada", category: "Cabinets & Millwork", location: "Toronto", rating: 4.5, products: "Custom & semi-custom cabinets, vanities, closets" },
  ]);

  const categories = [
    { name: "Kitchen Renovation", icon: <Hammer className="w-5 h-5" /> },
    { name: "Bathroom Reno", icon: <Home className="w-5 h-5" /> },
    { name: "Full Home Reno", icon: <Home className="w-5 h-5" /> },
    { name: "Basement Finishing", icon: <Hammer className="w-5 h-5" /> },
    { name: "Handyman Services", icon: <Hammer className="w-5 h-5" /> },
    { name: "Supplier Quotes", icon: <Truck className="w-5 h-5" /> },
  ];

  const handlePostJob = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newJob: Job = {
      id: Date.now(),
      title: formData.get('title') as string,
      category: formData.get('category') as string,
      location: formData.get('location') as string,
      budget: formData.get('budget') as string,
      timeline: formData.get('timeline') as string,
      description: formData.get('description') as string,
    };
    setJobs([newJob, ...jobs]);
    setShowPostJob(false);
    alert("Job posted successfully! Local pros in the Toronto GTA will see it shortly.");
  };

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    job.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A]">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#0A66C2] rounded-xl flex items-center justify-center">
              <Home className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="font-bold text-2xl tracking-tight">RenoHub</div>
              <div className="text-[10px] text-[#64748B] -mt-1">TORONTO GTA</div>
            </div>
          </div>
          
          <div className="flex items-center gap-8 text-sm font-medium">
            <a href="#how" className="nav-link hover:text-[#0A66C2]">How it Works</a>
            <a href="#pros" className="nav-link hover:text-[#0A66C2]">Find Pros</a>
            <a href="#suppliers" className="nav-link hover:text-[#0A66C2]">Suppliers</a>
            <a href="#jobs" className="nav-link hover:text-[#0A66C2]">Open Jobs</a>
            <button 
              onClick={() => setShowPostJob(true)}
              className="btn-primary px-6 py-2.5 rounded-full text-sm flex items-center gap-2"
            >
              Post a Job <ArrowRight className="w-4 h-4" />
            </button>
            <button className="btn-secondary px-5 py-2.5 rounded-full text-sm">
              For Pros
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div className="max-w-5xl mx-auto px-6 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 bg-white border border-[#E2E8F0] rounded-full px-4 py-1 text-sm mb-6">
          <div className="w-2 h-2 bg-[#10B981] rounded-full animate-pulse"></div>
          Trusted by 2,400+ homeowners &amp; 680+ pros in the GTA
        </div>
        
        <h1 className="text-6xl font-bold tracking-tighter leading-none mb-6">
          The smarter way to<br />renovate in Toronto &amp; the GTA
        </h1>
        <p className="text-2xl text-[#64748B] max-w-2xl mx-auto mb-10">
          One platform. Homeowners, verified local pros, and suppliers — perfectly aligned.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <button 
            onClick={() => setShowPostJob(true)}
            className="btn-primary px-10 py-4 rounded-2xl text-lg font-semibold flex items-center justify-center gap-3"
          >
            Post Your Renovation Job <ArrowRight className="w-5 h-5" />
          </button>
          <a href="#pros" className="btn-secondary px-10 py-4 rounded-2xl text-lg font-semibold flex items-center justify-center gap-3">
            Browse Verified Pros
          </a>
        </div>

        <div className="flex items-center justify-center gap-8 text-sm text-[#64748B]">
          <div className="flex items-center gap-2"><Shield className="w-4 h-4" /> Insurance verified</div>
          <div className="flex items-center gap-2"><Star className="w-4 h-4" /> Real reviews only</div>
          <div className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Toronto &amp; GTA focused</div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="max-w-3xl mx-auto px-6 -mt-6 mb-16">
        <div className="relative">
          <div className="absolute left-6 top-1/2 -translate-y-1/2 text-[#64748B]">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            placeholder="Search jobs, pros, or suppliers in Toronto GTA..."
            className="w-full pl-14 pr-6 py-5 text-lg bg-white border border-[#E2E8F0] rounded-3xl focus:outline-none focus:border-[#0A66C2] shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-7xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat, index) => (
            <div key={index} className="card bg-white p-6 rounded-3xl flex flex-col items-center text-center hover:border-[#0A66C2]/30 cursor-pointer">
              <div className="w-12 h-12 bg-[#F1F5F9] rounded-2xl flex items-center justify-center mb-4 text-[#0A66C2]">
                {cat.icon}
              </div>
              <div className="font-semibold">{cat.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* How it Works */}
      <div id="how" className="bg-white py-16 border-y border-[#E2E8F0]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="text-[#0A66C2] font-semibold tracking-[2px] text-sm mb-3">SIMPLE. TRANSPARENT. POWERFUL.</div>
            <h2 className="section-title">How RenoHub Works</h2>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Post Your Project", desc: "Describe your renovation. Add photos and budget. Takes 2 minutes." },
              { step: "02", title: "Get Matched Instantly", desc: "Verified Toronto & GTA pros see your job and send competitive quotes." },
              { step: "03", title: "Source Materials", desc: "Get real-time quotes from local suppliers directly in the platform." },
              { step: "04", title: "Hire & Complete", desc: "Choose the best pro + suppliers. Track everything in one place." },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="inline-flex w-14 h-14 items-center justify-center rounded-2xl bg-[#0A66C2] text-white text-2xl font-bold mb-6">{item.step}</div>
                <h3 className="font-semibold text-xl mb-3">{item.title}</h3>
                <p className="text-[#64748B] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Pros */}
      <div id="pros" className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="text-[#0A66C2] text-sm font-semibold tracking-widest">TOP RATED IN THE GTA</div>
            <h2 className="section-title">Verified Local Pros</h2>
          </div>
          <a href="#" className="text-[#0A66C2] font-medium flex items-center gap-2">Browse all pros <ArrowRight className="w-4 h-4" /></a>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {pros.map((pro) => (
            <div key={pro.id} className="card bg-white p-8 rounded-3xl">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="font-semibold text-xl">{pro.name}</div>
                  <div className="flex items-center gap-1.5 text-sm text-[#64748B] mt-1">
                    <MapPin className="w-4 h-4" /> {pro.location}
                  </div>
                </div>
                {pro.verified && <div className="bg-[#10B981]/10 text-[#10B981] text-xs px-3 py-1 rounded-full font-medium flex items-center gap-1"><Shield className="w-3 h-3" /> Verified</div>}
              </div>
              
              <div className="flex items-center gap-2 mb-4">
                <div className="flex text-[#F59E0B]"><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /></div>
                <span className="font-semibold">{pro.rating}</span>
                <span className="text-[#64748B]">({pro.reviews} reviews)</span>
              </div>

              <div className="text-sm mb-6">
                <span className="font-medium">{pro.category}</span> • Available {pro.available}
              </div>

              <button className="w-full btn-primary py-3.5 rounded-2xl font-semibold">Request Quote</button>
            </div>
          ))}
        </div>
      </div>

      {/* Suppliers Section */}
      <div id="suppliers" className="bg-white py-16 border-y border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-8">
            <div>
              <div className="text-[#0A66C2] text-sm font-semibold tracking-widest">INTEGRATED SUPPLY CHAIN</div>
              <h2 className="section-title">Local Suppliers Marketplace</h2>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {suppliers.map((s) => (
              <div key={s.id} className="card bg-[#F8FAFC] p-8 rounded-3xl border border-[#E2E8F0]">
                <div className="font-semibold text-xl mb-1">{s.name}</div>
                <div className="text-[#64748B] mb-4">{s.category} • {s.location}</div>
                
                <div className="flex items-center gap-2 mb-6">
                  <div className="text-[#F59E0B] flex"><Star className="w-4 h-4 fill-current" /></div>
                  <span className="font-medium">{s.rating}</span>
                </div>
                
                <div className="text-sm text-[#64748B] mb-6">{s.products}</div>
                
                <button className="w-full border border-[#0A66C2] text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white transition-colors py-3 rounded-2xl font-semibold">Get Instant Quote</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Open Jobs */}
      <div id="jobs" className="max-w-5xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="section-title">Active Projects in Toronto GTA</h2>
            <p className="text-[#64748B]">Real jobs posted by homeowners right now</p>
          </div>
          <button onClick={() => setShowPostJob(true)} className="btn-primary px-6 py-3 rounded-2xl flex items-center gap-2">
            Post Your Job
          </button>
        </div>

        <div className="space-y-4">
          {filteredJobs.length > 0 ? filteredJobs.map(job => (
            <div key={job.id} className="card bg-white p-8 rounded-3xl flex flex-col md:flex-row md:items-center gap-6 border border-[#E2E8F0]">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-3 py-1 bg-[#F1F5F9] text-xs font-medium rounded-full">{job.category}</span>
                  <span className="text-sm text-[#64748B] flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{job.location}</span>
                </div>
                <h3 className="font-semibold text-xl mb-2">{job.title}</h3>
                <p className="text-[#64748B] line-clamp-2">{job.description}</p>
              </div>
              <div className="md:text-right">
                <div className="text-2xl font-semibold text-[#0A66C2] mb-1">{job.budget}</div>
                <div className="text-sm text-[#64748B] flex items-center md:justify-end gap-1 mb-4"><Clock className="w-4 h-4" />{job.timeline}</div>
                <button className="btn-secondary px-8 py-2.5 rounded-2xl text-sm font-semibold">View Details &amp; Quote</button>
              </div>
            </div>
          )) : <p className="text-center py-8 text-[#64748B]">No matching jobs. Try broadening your search.</p>}
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-[#0A66C2] text-white py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold tracking-tight mb-4">Ready to start your renovation the right way?</h2>
          <p className="text-xl opacity-90 mb-8">Join thousands of GTA homeowners who are renovating smarter with RenoHub.</p>
          <button onClick={() => setShowPostJob(true)} className="bg-white text-[#0A66C2] px-10 py-4 rounded-2xl font-semibold text-lg inline-flex items-center gap-3 hover:bg-[#F1F5F9]">
            Post Your Job for Free <ArrowRight />
          </button>
          <div className="mt-4 text-sm opacity-75">No credit card required • Instant matching with local pros</div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-[#E2E8F0] py-12">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm text-[#64748B]">
          RenoHub — Built for Toronto &amp; the Greater Toronto Area.<br />
          Original platform. Real local focus. Better outcomes for homeowners, pros, and suppliers.
        </div>
      </footer>

      {/* Post Job Modal */}
      {showPostJob && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] p-6">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-10 relative">
            <button onClick={() => setShowPostJob(false)} className="absolute top-6 right-6 text-2xl leading-none">×</button>
            
            <h3 className="text-3xl font-bold mb-2">Post Your Renovation Project</h3>
            <p className="text-[#64748B] mb-8">Get quotes from verified Toronto &amp; GTA pros within hours.</p>

            <form onSubmit={handlePostJob} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Project Title</label>
                <input name="title" required className="w-full border border-[#E2E8F0] rounded-2xl px-5 py-3.5" placeholder="e.g. Kitchen Renovation in Leslieville" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <select name="category" className="w-full border border-[#E2E8F0] rounded-2xl px-5 py-3.5">
                    <option>Kitchen Reno</option>
                    <option>Bathroom Reno</option>
                    <option>Full Home Reno</option>
                    <option>Basement Finishing</option>
                    <option>Handyman / Repairs</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Location</label>
                  <input name="location" required defaultValue="Toronto, ON" className="w-full border border-[#E2E8F0] rounded-2xl px-5 py-3.5" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Budget Range</label>
                  <input name="budget" required placeholder="$15,000 - $30,000" className="w-full border border-[#E2E8F0] rounded-2xl px-5 py-3.5" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Desired Timeline</label>
                  <input name="timeline" required placeholder="4-6 weeks" className="w-full border border-[#E2E8F0] rounded-2xl px-5 py-3.5" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Project Details</label>
                <textarea name="description" required rows={5} className="w-full border border-[#E2E8F0] rounded-3xl px-5 py-4" placeholder="Describe the scope, any specific requirements, materials preferences..."></textarea>
              </div>

              <button type="submit" className="w-full btn-primary py-4 rounded-2xl text-lg font-semibold mt-4">
                Post Job &amp; Get Quotes from Local Pros
              </button>
              <p className="text-center text-xs text-[#64748B]">Free to post • Pros respond directly • No obligation</p>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
