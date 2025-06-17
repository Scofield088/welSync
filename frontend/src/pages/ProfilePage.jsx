import React from 'react';
import { useUser } from '@clerk/clerk-react';
import MoodCalendar from '../component/MoodCalendar';
import BreathingCalendar from '../component/BreathingCalendar/BreathingCalendar';
import { StreakPage } from '../component/StreakCalender.jsx/StreakPage';
import MeditationTracker from '../component/MeditationCalendar/MeditationTracker';
import Dictaphone from '../Dictaphone';


const ProfilePage = () => {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  console.log(user);

  return (
    <main className="profile-page">
      <section className="relative block h-[700px]">
        <div
          className="absolute top-0 w-full h-full bg-center bg-cover"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80')",
          }}
        >
          <span
            id="blackOverlay"
            className="w-full h-full absolute opacity-50 bg-black"
          ></span>
        </div>
        <div
          className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-[70px]"
          style={{ transform: 'translateZ(0px)' }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            viewBox="0 0 2560 100"
          >
            <polygon
              className="text-blueGray-200 fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>
      </section>

      <section className="relative py-16 bg-blueGray-200">
        <div className="container mx-auto px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
            <div className="md:px-6">
              <div className="flex flex-wrap justify-center items-center">
                {/* Profile Image on the Left */}
                <div className="w-full lg:w-3/12 px-4 flex justify-center lg:justify-start my-8">
                  <div className="relative">
                    <img
                      alt="..."
                      src={user.imageUrl}
                      className="shadow-xl rounded-full h-auto align-middle border-none max-w-[150px]"
                    />
                  </div>
                </div>

                {/* Name and Description in the Center */}
                <div className="w-full lg:w-6/12 px-4 text-center lg:text-left">
                  <div className="mt-4 lg:mt-0">
                    <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700">
                      {user.fullName}
                    </h3>
                    <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                      <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                      {user.primaryEmailAddress.emailAddress}
                    </div>
                    
                  </div>
                </div>

                {/* Connect Button on the Right */}
                <div className="w-full lg:w-3/12 px-4 text-center lg:text-right">
                  <div className="py-6 px-3 mt-4 lg:mt-0">
                    <button
                      className="bg-black active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none ease-linear transition-all duration-150"
                      type="button"
                    >
                      Connect
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-10 py-10 border-t border-blueGray-200 text-center"></div>

              <div>
                <MoodCalendar />
              </div>

              <div className='lg:flex gap-8 my-16'>
                <div className='flex-1'>
                  <BreathingCalendar />
                </div>
                <div className='flex-1'>
                  <MeditationTracker />
                </div>
              </div>

              <div className='my-16'>
                <StreakPage />
              </div>
            </div>
          </div>
        </div>
      </section>
      <Dictaphone/>
    </main>
  );
};

export default ProfilePage;
