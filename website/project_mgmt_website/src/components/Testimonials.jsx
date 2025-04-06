import React from 'react';
import { MessageSquare } from 'lucide-react';

const Reviews = () => {
  const testimonials = [
    {
      quote: "Tried this yesterday and I'm already impressed. The setup was quick, and the UI is refreshingly simple. Excited to see where this goes!",
      author: "habiheat",
      tag: "Smooth onboarding",
      tagColor: "bg-purple-100 text-purple-600"
    },
    {
      quote: "Saw this posted and gave it a shot. Only been using it for a few hours, but it already feels better than juggling Notion and Trello.",
      author: "ForsakenDesk12",
      tag: "No more tool overload",
      tagColor: "bg-purple-100 text-purple-600"
    },
    {
      quote: "Signed up out of curiosity. Super early days, but I love how lightweight it feels.",
      author: "efstjas",
      tag: "Fast & lightweight",
      tagColor: "bg-purple-100 text-purple-600"
    }
  ];

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <h2 className="text-4xl font-bold text-center mb-16">Loved by Indie Developers</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="flex flex-col">
            <div className="mb-4">
              <MessageSquare className="text-purple-500" size={24} />
            </div>
            <p className="text-gray-700 italic mb-4">"{testimonial.quote}"</p>
            <div className="mt-auto flex items-center justify-between">
              <span className="text-gray-800 font-medium">u/{testimonial.author}</span>
              <span className={`text-xs px-3 py-1 rounded-full ${testimonial.tagColor}`}>
                {testimonial.tag}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Reviews;
