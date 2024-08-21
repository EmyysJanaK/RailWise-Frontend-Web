import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Contact = () => {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState("HomePage");

  useEffect(() => {
    if (location.state && location.state.data) {
      setPrevLocation(location.state.data);
    }
  }, [location]);

  return (
    <div className="relative isolate overflow-hidden bg-gray-700 py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
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
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
        />
      </div>

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 lg:mb-16 flex justify-center items-center flex-col gap-x-0 gap-y-6 lg:gap-y-0 lg:flex-row lg:justify-between max-md:max-w-lg max-md:mx-auto">
            <div className="relative w-full text-center lg:text-left lg:w-2/4">
              <h2 className="text-4xl font-bold text-white leading-[3.25rem] lg:mb-6 mx-auto max-w-max lg:max-w-md lg:mx-0">
                Enjoy the finest features with our products
              </h2>
            </div>
            <div className="relative w-full text-center lg:text-left lg:w-2/4">
              <p className="text-lg font-normal text-gray-300 mb-5">
                We provide all the advantages that can simplify all your
                financial transactions without any further requirements
              </p>
              {/* Fixing the error by adding the missing <a> tag */}
              <a
                href="#"
                className="flex flex-row items-center justify-center gap-2 text-base font-semibold text-indigo-500 lg:justify-start hover:text-indigo-400"
              >
                Button CTA
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.5 15L11.0858 11.4142C11.7525 10.7475 12.0858 10.4142 12.0858 10C12.0858 9.58579 11.7525 9.25245 11.0858 8.58579L7.5 5"
                    stroke="#4F46E5"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
          </div>
          <div className="flex justify-center items-center gap-x-5 gap-y-8 lg:gap-y-0 flex-wrap md:flex-wrap lg:flex-nowrap lg:flex-row lg:justify-between lg:gap-x-8">
            <div className="group relative w-full bg-gray-800 rounded-2xl p-4 transition-all duration-500 max-md:max-w-md max-md:mx-auto md:w-2/5 md:h-64 xl:p-7 xl:w-1/4 hover:bg-indigo-600">
              <div className="bg-white rounded-full flex justify-center items-center mb-5 w-14 h-14">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M24.7222 11.6667V7.22225C24.7222 5.99495 23.7273 5 22.5 5H4.72222C3.49492 5 2.5 5.99492 2.5 7.22222V22.7778C2.5 24.0051 3.49492 25 4.72222 25H22.5C23.7273 25 24.7222 24.005 24.7222 22.7777V17.7778M20.8333 17.7778H25.2778C26.5051 17.7778 27.5 16.7829 27.5 15.5556V13.8889C27.5 12.6616 26.5051 11.6667 25.2778 11.6667H20.8333C19.606 11.6667 18.6111 12.6616 18.6111 13.8889V15.5556C18.6111 16.7829 19.606 17.7778 20.8333 17.7778Z"
                    stroke="#4F46E5"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-white mb-3 capitalize transition-all duration-500 group-hover:text-white">
                Easy Payment
              </h4>
              <p className="text-sm font-normal text-gray-300 transition-all duration-500 leading-5 group-hover:text-white">
                We Provide Various Methods For You To Carry Out All Transactions
                Related To Your Finances
              </p>
            </div>
            <div className="group relative w-full bg-gray-800 rounded-2xl p-4 transition-all duration-500 max-md:max-w-md max-md:mx-auto md:w-2/5 md:h-64 xl:p-7 xl:w-1/4 hover:bg-indigo-600">
              <div className="bg-white rounded-full flex justify-center items-center mb-5 w-14 h-14">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.375 15.8571C16.1009 15.8571 17.5 14.458 17.5 12.7321C17.5 11.0062 16.1009 9.60714 14.375 9.60714C12.6491 9.60714 11.25 11.0062 11.25 12.7321C11.25 14.458 12.6491 15.8571 14.375 15.8571ZM14.375 15.8571C12.6491 15.8571 11.25 17.2562 11.25 18.9821V21.25H17.5V18.9821C17.5 17.2562 16.1009 15.8571 14.375 15.8571ZM18.75 12.5C18.75 10.0387 16.8363 8.125 14.375 8.125C11.9137 8.125 10 10.0387 10 12.5C10 14.9613 11.9137 16.875 14.375 16.875C16.8363 16.875 18.75 14.9613 18.75 12.5ZM18.75 12.5V18.8393M18.75 18.8393C20.065 19.6129 21.25 21.3075 21.25 23.2143M18.75 18.8393L18.75 21.25M21.25 23.2143V25H7.5V23.2143C7.5 21.3075 8.68499 19.6129 10 18.8393M21.25 23.2143H10M18.75 21.25H10M10 18.8393V21.25"
                    stroke="#4F46E5"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-white mb-3 capitalize transition-all duration-500 group-hover:text-white">
                Secure Identity
              </h4>
              <p className="text-sm font-normal text-gray-300 transition-all duration-500 leading-5 group-hover:text-white">
                We Keep All Your Information Confidential And Well-guarded So
                That Your Identity Is Not Used In A Fraudulent Manner
              </p>
            </div>
            <div className="group relative w-full bg-gray-800 rounded-2xl p-4 transition-all duration-500 max-md:max-w-md max-md:mx-auto md:w-2/5 md:h-64 xl:p-7 xl:w-1/4 hover:bg-indigo-600">
              <div className="bg-white rounded-full flex justify-center items-center mb-5 w-14 h-14">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.33333 20.8333H10.8333C10.9821 20.8333 11.1066 20.9521 11.1066 21.0879C11.1066 21.248 11.1958 21.3906 11.3364 21.4606C11.4769 21.5305 11.6466 21.5205 11.7761 21.434L13.6973 20.1763C13.8407 20.0842 14.0322 20.0842 14.1756 20.1763L16.0969 21.434C16.2263 21.5205 16.3961 21.5305 16.5366 21.4606C16.6771 21.3906 16.7663 21.248 16.7663 21.0879C16.7663 20.9521 16.8908 20.8333 17.0396 20.8333H19.5396C19.7732 20.8333 20 21.0624 20 21.3015V23.75H8.33333V21.3015C8.33333 21.0624 8.55999 20.8333 8.79357 20.8333H8.33333ZM8.33333 20.8333L8.33333 16.6667C8.33333 16.4881 8.41578 16.32 8.5554 16.2085L13.2463 12.3838C13.6028 12.1001 14.0979 12.1001 14.4544 12.3838L19.1453 16.2085C19.2849 16.32 19.3674 16.4881 19.3674 16.6667V20.8333M8.33333 20.8333H8.79357C8.55999 20.8333 8.33333 21.0624 8.33333 21.3015M8.33333 20.8333V21.3015M19.3674 16.6667H20V12.5C20 10.6051 18.4786 9.16667 16.6667 9.16667H13.3333C11.5214 9.16667 10 10.6051 10 12.5V16.6667M12.5 10.8333H17.5M13.75 14.1667H16.25"
                    stroke="#4F46E5"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-white mb-3 capitalize transition-all duration-500 group-hover:text-white">
                Encrypted Data
              </h4>
              <p className="text-sm font-normal text-gray-300 transition-all duration-500 leading-5 group-hover:text-white">
                We Ensure That All Data Shared By You Is Well Encrypted And Can
                Be Accessed Only By You And The Intended Recipient
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
