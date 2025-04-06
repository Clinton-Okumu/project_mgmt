import React from 'react';
import pic4 from '../assets/pic4.png';
import { ArrowRight, Zap, Shield, Code, Check } from 'lucide-react';

const WhyChooseSection = () => {
  const features = [
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Quick Setup",
      description: "Start tracking your project in under 60 seconds. No complex configurations or lengthy onboarding process required."
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Zero Complexity",
      description: "No boards, epics, or sprints. Just tasks, milestones, and progress tracking—everything you need, nothing you don't."
    },
    {
      icon: <Code className="h-6 w-6" />,
      title: "Developer Focused",
      description: "Built by indie developers, for indie developers. Simple, transparent pricing—no hidden fees, just the tools you need to succeed."
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-purple-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center bg-purple-100 text-purple-800 px-4 py-2 rounded-full mb-6">
            <Zap className="h-4 w-4 mr-2" />
            Streamline Your Workflow
          </div>
          <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
            Why Choose SwiftPjmt?
          </h2>
          <p className="text-lg text-gray-600">
            Designed for developers who need powerful project management without the bloat.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-8 shadow-lg border border-purple-100 hover:border-purple-300 transition-all duration-300 hover:shadow-xl"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-purple-100 text-purple-600 mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
              <div className="mt-6 flex items-center text-purple-600 font-medium">
                <span>Learn more</span>
                <ArrowRight className="h-4 w-4 ml-2" />
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center gap-12 mb-24">
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-6">Visualize Progress at a Glance</h3>
            <p className="text-gray-600 mb-6">
              SwiftPjmt's intuitive dashboard gives you a complete overview of your project status, upcoming milestones, and team performance—all in one place.
            </p>
            <ul className="space-y-3">
              {['Real-time progress tracking', 'Custom milestone views', 'Priority-based task organization'].map((item, i) => (
                <li key={i} className="flex items-center">
                  <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-green-100 text-green-600 mr-3">
                    <Check className="h-4 w-4" />
                  </span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
            <button className="mt-8 bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-3 rounded-lg shadow-md transition-all duration-300 inline-flex items-center">
              Take a Tour
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>
          <div className="flex-1">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-300 to-indigo-300 rounded-xl opacity-30 blur-lg"></div>
              <img
                src={pic4}
                alt="SwiftBoard Dashboard Preview"
                className="relative w-full h-auto rounded-xl shadow-lg border border-purple-100"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
