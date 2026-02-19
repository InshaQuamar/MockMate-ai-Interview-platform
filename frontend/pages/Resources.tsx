
import React from 'react';

const Resources: React.FC = () => {
  const categories = [
    {
      title: "Mastering Behavioral Interviews",
      items: [
        { name: "The STAR Method Framework", type: "Guide", link: "#" },
        { name: "Common HR Questions & Answers", type: "PDF", link: "#" },
        { name: "Body Language Tips", type: "Video", link: "#" }
      ],
      icon: "🤝"
    },
    {
      title: "Technical Mastery",
      items: [
        { name: "System Design for Beginners", type: "Article", link: "#" },
        { name: "JavaScript Engine", type: "Deep Dive", link: "#" },
        { name: "React Reconciliation", type: "Article", link: "#" }
      ],
      icon: "⚙️"
    },
    {
      title: "DSA & Problem Solving",
      items: [
        { name: "Big O Notation Cheat Sheet", type: "Image", link: "#" },
        { name: "Top 50 LeetCode Patterns", type: "Guide", link: "#" },
        { name: "DS Visualization", type: "Tool", link: "#" }
      ],
      icon: "🚀"
    }
  ];

  return (
    <div className="min-h-screen pt-24 md:pt-32 pb-16 md:pb-24 px-4 md:px-12 max-w-7xl mx-auto">
      <div className="text-center mb-10 md:mb-16 space-y-2 md:space-y-4">
        <h1 className="text-3xl md:text-5xl font-black text-slate-900">Preparation <span className="text-indigo-600">Hub</span></h1>
        <p className="text-slate-500 text-sm md:text-lg max-w-2xl mx-auto font-medium">Curated guides and top-tier resources to sharpen your skills and boost your confidence.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {categories.map((cat, idx) => (
          <div key={idx} className="soft-card p-6 md:p-8 space-y-4 md:space-y-6 hover:border-indigo-600/30 transition-all group">
            <div className="text-3xl md:text-4xl group-hover:scale-110 transition-transform">{cat.icon}</div>
            <h3 className="text-lg md:text-xl font-bold text-slate-900">{cat.title}</h3>
            <div className="space-y-3 md:space-y-4">
              {cat.items.map((item, i) => (
                <a key={i} href={item.link} className="flex items-center justify-between p-3 md:p-4 bg-slate-50 hover:bg-white hover:shadow-md rounded-xl md:rounded-2xl transition-all border border-transparent hover:border-indigo-100">
                  <div className="space-y-0.5 md:space-y-1">
                    <div className="text-xs md:text-sm font-bold text-slate-700 leading-tight">{item.name}</div>
                    <div className="text-[9px] md:text-[10px] text-indigo-500 font-bold uppercase tracking-widest">{item.type}</div>
                  </div>
                  <svg className="w-4 h-4 md:w-5 md:h-5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Resources;
