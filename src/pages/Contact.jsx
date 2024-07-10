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
    <>
      <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
        <img
          alt=""
          src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-y=.8&w=2830&h=1500&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply"
          className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center"
        />
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
              <h2 className="text-4xl font-bold text-gray-900 leading-[3.25rem] lg:mb-6 mx-auto max-w-max lg:max-w-md lg:mx-0">
                Enjoy the finest features with our products
              </h2>
            </div>
            <div className="relative w-full text-center lg:text-left lg:w-2/4">
              <p className="text-lg font-normal text-gray-500 mb-5">
                We provide all the advantages that can simplify all your
                financial transactions without any further requirements
              </p>
              <a
                href="#"
                className="flex flex-row items-center justify-center gap-2 text-base font-semibold text-indigo-600 lg:justify-start hover:text-indigo-700"
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
            <div className="group relative w-full bg-gray-100 rounded-2xl p-4 transition-all duration-500 max-md:max-w-md max-md:mx-auto md:w-2/5 md:h-64 xl:p-7 xl:w-1/4 hover:bg-indigo-600">
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
              <h4 className="text-xl font-semibold text-gray-900 mb-3 capitalize transition-all duration-500 group-hover:text-white">
                Easy Payment
              </h4>
              <p className="text-sm font-normal text-gray-500 transition-all duration-500 leading-5 group-hover:text-white">
                We Provide Various Methods For You To Carry Out All Transactions
                Related To Your Finances
              </p>
            </div>
            <div className="group relative w-full bg-gray-100 rounded-2xl p-4 transition-all duration-500 max-md:max-w-md max-md:mx-auto md:w-2/5 md:h-64 xl:p-7 xl:w-1/4 hover:bg-indigo-600">
              <div className="bg-white rounded-full flex justify-center items-center mb-5 w-14 h-14">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.375 15.8571C16.1009 15.8571 17.5 14.458 17.5 12.7321C17.5 11.0062 16.1009 9.60714 14.375 9.60714C12.6491 9.60714 11.25 11.0062 11.25 12.7321C11.25 14.458 12.6491 15.8571 14.375 15.8571ZM14.375 15.8571C12.6491 15.8571 11.25 17.2562 11.25 18.9821M14.375 15.8571C16.1009 15.8571 17.5 17.2562 17.5 18.9821M19.375 4.46429H18.5417C18.0764 4.46429 17.6268 4.64128 17.291 4.95714L16.4592 5.73285C16.1234 6.04871 15.6737 6.22571 15.2084 6.22571H13.5417C12.8103 6.22571 12.1412 6.567 11.7086 7.13159L10.4586 8.7677C10.026 9.33229 9.35688 9.67357 8.6255 9.67357H6.66667C5.19219 9.67357 4 10.8658 4 12.3403V20.8894C4 22.3638 5.19219 23.5561 6.66667 23.5561H22.0833C23.5578 23.5561 24.75 22.3638 24.75 20.8894V10.206C24.75 8.73157 23.5578 7.53928 22.0833 7.53928H20.9167C19.4422 7.53928 18.25 6.347 18.25 4.87257V4.66429C18.25 4.57913 18.1862 4.51529 18.101 4.51529H18.0833C18.0366 4.51529 17.991 4.52983 17.956 4.55595L17.9497 4.56643C17.9155 4.59256 17.8891 4.6274 17.8774 4.66767C17.8657 4.70795 17.8702 4.75078 17.8906 4.78541C18.0757 5.0907 18.2928 5.37762 18.5417 5.64814L19.625 6.68929C19.819 6.86688 20.0833 6.98214 20.3542 6.98214H21.875C21.9602 6.98214 22.0241 7.04598 22.0241 7.13116V18.4392C22.0241 18.5244 21.9602 18.5883 21.875 18.5883H10.625C10.5398 18.5883 10.4759 18.5244 10.4759 18.4392V14.3571"
                    stroke="#4F46E5"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3 capitalize transition-all duration-500 group-hover:text-white">
                Support Team
              </h4>
              <p className="text-sm font-normal text-gray-500 transition-all duration-500 leading-5 group-hover:text-white">
                Our 24/7 Support Team Will Help You With Any Issues You May
                Have
              </p>
            </div>
            <div className="group relative w-full bg-gray-100 rounded-2xl p-4 transition-all duration-500 max-md:max-w-md max-md:mx-auto md:w-2/5 md:h-64 xl:p-7 xl:w-1/4 hover:bg-indigo-600">
              <div className="bg-white rounded-full flex justify-center items-center mb-5 w-14 h-14">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.1672 19.8438L7.69331 16.6352C6.81831 15.976 6.81831 14.694 7.69331 14.0349L12.1672 10.8263C13.0422 10.1672 14.1778 10.8005 14.1778 11.8439V18.8263C14.1778 19.8697 13.0422 20.503 12.1672 19.8438ZM18.8745 22.7988L16.1538 21.0838C15.3435 20.5736 15.3237 19.5054 16.1173 18.9857L18.7822 17.3891C19.5734 16.8704 20.5734 17.2588 20.9472 18.1236L21.6188 19.7113C21.9948 20.5768 21.6064 21.5768 20.7356 21.9917L18.8745 22.7988ZM24.7208 22.1145L19.7098 19.2413C18.9005 18.7311 18.8807 17.6629 19.6743 17.1432L22.3391 15.5466C23.1304 15.028 24.1304 15.4164 24.5042 16.2811L25.1758 17.8688C25.5517 18.7343 25.1634 19.7343 24.2925 20.1493L24.7208 22.1145Z"
                    stroke="#4F46E5"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3 capitalize transition-all duration-500 group-hover:text-white">
                Financial Insights
              </h4>
              <p className="text-sm font-normal text-gray-500 transition-all duration-500 leading-5 group-hover:text-white">
                We Provide Various Insights For You To Understand Your Finances
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  );
};

export default Contact;
