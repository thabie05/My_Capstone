const About = () => {
  return (
    <div className="min-h-screen text-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">About Track My Expenses</h1>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-[#252f53be] p-6 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-gray-300 leading-relaxed">
              We aim to simplify personal finance management for everyone. Our goal is to provide 
              intuitive tools that help users track their income, expenses, and savings effortlessly, 
              enabling better financial decisions and improved money management habits.
            </p>
          </div>

          <div className="bg-[#252f53be] p-6 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
            <ul className="list-disc list-inside space-y-3 text-gray-300">
              <li>Real-time expense tracking</li>
              <li>Income management system</li>
              <li>Interactive financial overviews</li>
              <li>Secure cloud synchronization</li>
              <li>Cross-platform accessibility</li>
            </ul>
          </div>
        </div>

        <div className="bg-[#252f53be] p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-6 text-center">Development Team</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <img src="/developer.jpg" alt="Developer" className="w-32 h-32 bg-gray-700 rounded-full mx-auto mb-4" />
              <h3 className="text-xl font-semibold">Thabelo Tshishonga</h3>
              <p className="text-gray-400">Lead Developer</p>
            </div>
            <div className="text-center">
            <img src="/developer.jpg" alt="Developer" className="w-32 h-32 bg-gray-700 rounded-full mx-auto mb-4" />
              <h3 className="text-xl font-semibold">Thabelo Tshishonga</h3>
              <p className="text-gray-400">UI/UX Designer</p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-700 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold">Google Search</h3>
              <p className="text-gray-400">Financial Advisor</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;