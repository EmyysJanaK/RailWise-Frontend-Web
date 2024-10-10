import React from 'react';

const Contact = () => {
  return (
    <div className="relative isolate overflow-hidden bg-gray-700 py-24 sm:py-32 min-h-screen flex items-center justify-center p-12">
      {/* Background gradient and blur */}
      <div
        aria-hidden="true"
        className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
        />
      </div>

      {/* Main content */}
      <div className="w-full max-w-4xl flex flex-col lg:flex-row items-center space-y-12 lg:space-y-0 lg:space-x-24">
        {/* Left section with text */}
        <div className="lg:w-1/2 text-left">
          <h1 className="text-white text-6xl font-bold mb-6">LET'S CHAT.</h1>
          <p className="text-4xl text-white font-bold leading-snug">
            ONE CLICK <br />
            AND <br />
            BE WITH US
          </p>
        </div>

        {/* Right section with the form */}
        <div className="lg:w-1/2 bg-purple-900 border border-purple-900 rounded-lg p-10 shadow-lg">
          <h2 className="text-white text-3xl font-bold mb-8">Send Us a message</h2>
          <form>
            <div className="mb-6">
              <label htmlFor="name" className="block text-white font-bold mb-3">Full Name *</label>
              <input
                type="text"
                id="name"
                placeholder="Full Name"
                className="w-full bg-green-50 border border-purple-900 text-gray-900 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-purple-800"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="email" className="block text-white font-bold mb-3">Email address *</label>
              <input
                type="email"
                id="email"
                placeholder="Email address"
                className="w-full bg-white-50 border border-purple-900 text-gray-900 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-purple-900"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="subject" className="block text-white font-bold mb-3">Subject *</label>
              <input
                type="text"
                id="subject"
                placeholder="Subject"
                className="w-full bg-white-700 border border-purple-900 text-gray-900 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-purple-900"
                required
              />
            </div>
            <div className="mb-8">
              <label htmlFor="message" className="block text-white font-bold mb-3">Message *</label>
              <textarea
                id="message"
                placeholder="Message"
                className="w-full bg-white-600 border border-purple-900 text-gray-900 rounded-lg p-4 h-40 focus:outline-none focus:ring-2 focus:ring-purple-900"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-black hover:bg-purple-500 text-white font-bold rounded-lg p-4 transition-colors text-xl"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;