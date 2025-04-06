import React from 'react';

const WhyChooseSection = () => {
  return (
    <section className="py-16 bg-[#EAE6FE]">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16">Why Choose SwiftPjmt?</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Quick Setup */}
          <div className="bg-purple-50 rounded-lg p-8">
            <div className="flex items-center mb-4">
              <div className="text-purple-600 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Quick Setup</h3>
            </div>
            <p className="text-gray-700">
              Start tracking your project in under 60 seconds. No complex configurations or lengthy onboarding.
            </p>
          </div>

          {/* Zero Complexity */}
          <div className="bg-purple-50 rounded-lg p-8">
            <div className="flex items-center mb-4">
              <div className="text-purple-600 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Zero Complexity</h3>
            </div>
            <p className="text-gray-700">
              No boards, epics, or sprints. Just tasks, milestones, and progress tracking—everything you need, nothing you don't.
            </p>
          </div>

          {/* Developer Focused */}
          <div className="bg-purple-50 rounded-lg p-8">
            <div className="flex items-center mb-4">
              <div className="text-purple-600 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Developer Focused</h3>
            </div>
            <p className="text-gray-700">
              Built by indie developers, for indie developers. Simple, transparent pricing—no hidden fees, just the tools you need to succeed.
            </p>
          </div>
        </div>

        <div className="mt-24 text-center">
          <div className="inline-flex items-center bg-purple-100 text-purple-800 px-4 py-2 rounded-full mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Simple Pricing, Powerful Features
          </div>

          <h2 className="text-4xl font-bold mb-4">Choose Your Plan</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Start with our free plan and upgrade when you need more. No hidden fees, no surprises.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
