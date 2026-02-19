
import React from 'react';

const Resources: React.FC = () => {
  const categories = [
    {
      title: "Mastering Behavioral Interviews",
      items: [
        { name: "The STAR Method Framework", type: "Guide", link: "#" },
        { name: "Common HR Questions & Answers", type: "PDF", link: "#" },
        { name: "Body Language Tips for Virtual Calls", type: "Video", link: "#" }
      ],
      icon: "🤝"
    },
    {
      title: "Technical Mastery",
      items: [
        { name: "System Design for Beginners", type: "Article", link: "#" },
        { name: "JavaScript Engine Fundamentals", type: "Deep Dive", link: "#" },
        { name: "React Reconciliation Algorithm", type: "Article", link: "#" }
      ],
      icon: "⚙️"
    },
    {
      title: "DSA & Problem Solving",
      items: [
        { name: "Big O Notation Cheat Sheet", type: "Image", link: "#" },
        { name: "Top 50 LeetCode Patterns", type: "Guide", link: "#" },
        { name: "Data Structures Visualization", type: "Tool", link: "#" }
      ],
      icon: "🚀"
    }
  ];

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="text-center mb-16 space-y-4">
        <h1 className="text-4xl md:text-5xl font-black text-white">Preparation <span className="text-blue-500">Hub</span></h1>
        <p className="text-gray-400 max-w-2xl mx-auto">Curated guides and top-tier resources to sharpen your skills and boost your confidence before the big day.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((cat, idx) => (
          <div key={idx} className="glass p-8 rounded-3xl border border-white/5 space-y-6 hover:border-blue-500/30 transition-all group">
            <div className="text-4xl group-hover:scale-110 transition-transform">{cat.icon}</div>
            <h3 className="text-xl font-bold text-white">{cat.title}</h3>
            <div className="space-y-4">
              {cat.items.map((item, i) => (
                <a key={i} href={item.link} className="flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-2xl transition-all border border-transparent hover:border-white/10">
                  <div className="space-y-1">
                    <div className="text-sm font-semibold text-white">{item.name}</div>
                    <div className="text-[10px] text-blue-400 font-bold uppercase tracking-widest">{item.type}</div>
                  </div>
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-20 p-10 glass rounded-[2rem] border border-blue-500/20 bg-gradient-to-br from-blue-600/5 to-transparent flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-4 text-center md:text-left">
          <h2 className="text-3xl font-bold text-white">Want more personalized content?</h2>
          <p className="text-gray-400">Join our community of 10,000+ students cracking placements daily.</p>
        </div>
        <button className="px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl transition-all shadow-xl shadow-blue-500/20 whitespace-nowrap">
          Join Placement Prep Plus
        </button>
      </div>
    </div>
  );
};

export default Resources;
