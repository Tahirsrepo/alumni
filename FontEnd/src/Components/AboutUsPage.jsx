import React from 'react';
import { UserCheck, Handshake, BarChart3 } from 'lucide-react';

const AboutUsPage = () => {
  const missionFeatures = [
    {
      icon: <UserCheck className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />,
      title: "Foster Lifelong Connections",
      description: "We are dedicated to building a vibrant, global community where every ATME graduate can connect, share experiences, and find support.",
    },
    {
      icon: <Handshake className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />,
      title: "Drive Professional Growth",
      description: "By providing access to mentors, exclusive job postings, and career workshops, we help accelerate professional journeys for all members.",
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />,
      title: "Support Institutional Excellence",
      description: "We enable alumni to give back through mentorship, fundraising, and sharing expertise, directly contributing to ATME's continued success.",
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-900 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <p className="text-base font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">Our Story, Our Mission</p>
          <h2 className="mt-2 text-4xl font-extrabold text-gray-900 sm:text-5xl dark:text-white">
            Connecting the Legacy of ATME
          </h2>
        </div>

        {/* Introduction & Vision */}
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          <div className="mb-10 lg:mb-0">
            <img 
              className="rounded-xl shadow-2xl border-4 border-indigo-50 dark:border-gray-800"
              src="https://imgs.search.brave.com/vE1njjb2pR6rWw0X82LX7naoEcIW2x-0TVVzE2DcH5c/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9icml0/aXNoY29sdW1iaWFj/YXJlZXJjb3Vuc2Vs/bG9ycy5hbGxlZ2lh/bmNlLWVkdWNhcmUu/aW4vc3RvcmFnZS91/cGxvYWRzL2NvbGxl/Z2VzLzE0MjE0MDc5/OTEzLkpQRw"
              alt="Group of diverse professionals collaborating"
            />
          </div>
          <div>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              More than an Alumni Network. It's a Partnership.
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              The **ATME Alumni Management System** was created to centralize all institutional engagements. We noticed a gap between our successful graduates, current students seeking guidance, and the vital events that keep our community strong.
            </p>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Our vision is simple: to provide a secure, seamless platform where every alum can easily access **career opportunities**, **find mentorship**, and stay informed about **reunions and college events**. We believe our collective success strengthens the ATME brand for future generations.
            </p>
          </div>
        </div>

        {/* Mission Features Grid */}
        <div className="mt-20">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {missionFeatures.map((feature) => (
              <div key={feature.title} className="p-6 text-center transition-all duration-300 hover:bg-indigo-50 dark:hover:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h4>
                <p className="text-gray-500 dark:text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;