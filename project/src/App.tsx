import { useState, useEffect } from 'react';
import { GraduationCap, Code, FileText, Map, Rocket, GamepadIcon, X } from 'lucide-react';

function App() {
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState<string>('');

  const events: Array<{
    icon: any;
    title: string;
    subtitle?: string;
    description: string;
    format?: string[];
    details: {
      participation: string;
      languages?: string;
      prizes?: string;
      deadline?: string;
      requirements?: string;
    };
    organizers: string[];
    theme: string;
    registerLink: string;
    highlights?: string[];
    rules?: string[];
    type: string;
  }> = [
    {
      icon: Code,
      title: "CodZilla",
      description: "A thrilling coding challenge to test your programming skills, debugging expertise, and problem-solving abilities across three time-limited rounds. Compete solo and prove your mettle!",
      format: [
        "Round 1: Quiz – Technical MCQs and fun riddles on computer science.",
        "Round 2: Debugging – Fix code errors in C, C++, Python, or Java.",
        "Round 3: Problem Solving – Solve complex coding challenges with efficient solutions."
      ],
      details: {
        participation: "Individual",
        languages: "C, C++, Python, Java",
        prizes: "Exciting rewards for top performers!"
      },
      organizers: [
        "Aswin R - 63790 88686",
        "Evangline R - 73055 50106"
      ],
      theme: "card-codzilla",
      registerLink: "https://docs.google.com/forms/d/e/1FAIpQLSdVdY2FVQ6s7EafWmWkZ_fncQNLeiR3klSYBMzKf-rSIGQ0JA/viewform",
      type: "Technical"
    },
    {
      icon: FileText,
      title: "Excellencia",
      subtitle: "Project your projects as an work of Art",
      description: "The Paper Presentation event serves as a hub for young minds to present their groundbreaking research and revolutionary ideas, fostering a culture of innovation and scholarly exchange across disciplines.",
      details: {
        participation: "Teams (max 2 members) must submit a PDF paper and present a 10-15 slide PPT in 8-10 minutes. Prizes await the most original and impactful presentations!"
      },
      organizers: [
        "K S Vishal - 82486 86684",
        "Kaviya P - 90949 79221"
      ],
      theme: "card-excellencia",
      registerLink: "https://docs.google.com/forms/d/e/1FAIpQLSevg_Ve8oRLWruqUPXLjhkxcltEyueduuLmiTpgLYlK1y8-6Q/viewform",
      type: "Technical"
    },
    {
      icon: Map,
      title: "The One Piece",
      description: "A Treasure Hunt for the Analytical Minds. An exciting event where participants solve data challenges to decode passcodes, unlocking URLs that lead to the final treasure. Every stage presents a unique dataset-based puzzle, and the clues are embedded within the data itself.",
      details: {
        participation: "Teams of 2–4 participants",
        prizes: "Exciting prizes for the winners!"
      },
      rules: [
        "Team Size: 2–4 participants.",
        "Round Progression: Teams must complete one round to access the next.",
        "Submission: Include outputs (graphs, answers, models) and code files.",
        "Time Limits: Strict time limits for each round.",
        "Decoding Clues: Passcodes derived from solutions must be submitted to unlock URLs for subsequent rounds."
      ],
      organizers: [
        "Sanjith R R - 89251 23371",
        "Sruthi Sai Prabha K S - 90255 19002"
      ],
      theme: "card-onepiece",
      registerLink: "https://docs.google.com/forms/d/e/1FAIpQLSdwUlD-3cw_ybCLOaVZZ1PZAy7pBSSQDbpy86y1xGk0zKhrUg/viewform",
      type: "Technical"
    },
    {
      icon: Rocket,
      title: "CJC InnoHack 2025",
      subtitle: "🚀 Welcome to CJC InnoHack 2025!",
      description: "Unleash your creativity, collaborate with like-minded innovators, and solve real-world challenges at CJC InnoHack, the ultimate platform for tech enthusiasts and changemakers. Assemble your dream team and gear up for an unforgettable experience of brainstorming, coding, and problem-solving.",
      highlights: [
        "Networking with top-tier talents",
        "A chance to showcase your innovation",
        "Exciting prizes and recognition"
      ],
      details: {
        participation: "Teams of 2 to 4 members from any college",
        deadline: "20th Feb 2025",
        requirements: "Team and project details with abstract submission"
      },
      organizers: [
        "Paarthan C  80568 62249",
        "Lakshita M  73974 38415"
      ],
      theme: "card-innohack",
      registerLink: "https://docs.google.com/forms/d/e/1FAIpQLSdRrKgxqCR3RBaD7KsMxXB4nAzDlLopwUZ007lILfX8xlpIcA/viewform",
      type: "Technical"
    },
    {
      icon: GamepadIcon,
      title: "SQUID GAME",
      subtitle: "The Game's Afoot – Who's Ready to Play?",
      description: "A thrilling surprise event with multiple unique rounds, where only the best advance to the next stage. Each round tests your creativity, wit, and skill—top performers move closer to victory. Compete, conquer, and claim glory! The top performer will win exciting prize!",
      format: ["Multiple surprise rounds"],
      details: {
        participation: "Individual",
        prizes: "Exciting prizes for the ultimate winner!"
      },
      highlights: [
        "Surprise challenges in each round",
        "Test of creativity and wit",
        "Elimination-style progression",
        "Glory and prizes await the victor"
      ],
      organizers: [
        "Niraimathi TM - 82203 80483",
        "Jagdish E - 87789 00128"
      ],
      theme: "card-squidgame",
      registerLink: "https://forms.gle/phbTaREnyRaaMBoY7",
      type: "Non-Technical"
    }
  ];

  useEffect(() => {
    const targetDate = new Date('2025-03-17T00:00:00'); // Set the target date for the timer
    const interval = setInterval(() => {
      const now = new Date();
      const distance = targetDate.getTime() - now.getTime();

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft('Event has started!');
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const renderIcon = (IconComponent: any, theme: string) => {
    return <IconComponent className={`${getIconColor(theme)} mr-3 float`} size={32} />;
  };

  const getIconColor = (theme: string) => {
    switch(theme) {
      case 'card-codzilla': return 'text-violet-400';
      case 'card-excellencia': return 'text-blue-400';
      case 'card-onepiece': return 'text-amber-400';
      case 'card-innohack': return 'text-green-400';
      case 'card-squidgame': return 'text-rose-400';
      default: return 'text-yellow-400';
    }
  };

  const getButtonStyle = (theme: string) => {
    switch(theme) {
      case 'card-codzilla': return 'bg-violet-500 hover:bg-violet-600 focus:ring-violet-400';
      case 'card-excellencia': return 'bg-blue-500 hover:bg-blue-600 focus:ring-blue-400';
      case 'card-onepiece': return 'bg-amber-500 hover:bg-amber-600 focus:ring-amber-400';
      case 'card-innohack': return 'bg-green-500 hover:bg-green-600 focus:ring-green-400';
      case 'card-squidgame': return 'bg-rose-500 hover:bg-rose-600 focus:ring-rose-400';
      default: return 'bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-400';
    }
  };

  return (
    <div className="min-h-screen ironman-bg relative overflow-hidden">
      <div className="tech-overlay">
        <div className="arc-reactor animate-pulse"></div>
      </div>
      <div className="relative z-10">
        <header className="bg-black/20 backdrop-blur-sm text-white">
          <div className="container mx-auto px-4 py-16 text-center relative overflow-hidden">
            <img src="https://media-hosting.imagekit.io//fd5ac5e1790e4f09/logo.png?Expires=1832381904&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=15zshD1fHmOAoxk2j88lNNGpXEyilE2zDDBqNDX-vF53fmZpfCMtrKj9h4B~de-0SH3OgggRF6iM4I--k1rxlq6YkMj2t4BfXZ19Qq8RQnDcnR7hydrR3Bc-FA6THqaEFJDYvhWHR1qda3BKLYy6FycC1dOej7KB~Bypatf0vRoy6g0gUQnlCzXh9MDoj1c04DWWVhxJFBgv5HOKsfQhPVyBDihTKyLiLIrl4RmkLsAFBFyicMuazZFyqij0UwLWKc4swjP3zbRe~3YKUqeRE-BVBMT1KeUZyGMagJE71cgX1c0r33REIYO09J2DRf4E-yLe4oBhjfH9EI213-X8eg__" alt="RMKEC Logo" style={{ display: 'block', margin: '0 auto', maxWidth: '200px' }} className="animate-bounce" />
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-yellow-500/10 to-red-500/10"></div>
            <div className="relative z-10">
              <div className="flex justify-center mb-4">
                <GraduationCap size={64} className="text-yellow-400 float animate-spin-slow" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 fade-in bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-yellow-500 to-red-500 hover:scale-110 transform transition-all duration-500 animate-gradient" style={{ fontFamily: 'Roboto, sans-serif', letterSpacing: '2px', textShadow: '0 0 10px rgba(255,255,255,0.3)' }}>
                CYNAPSE 2K25
              </h1>
              <p className="text-xl md:text-2xl text-yellow-200 fade-in hover:text-yellow-100 transform hover:-translate-y-1 transition-all duration-300" 
                 style={{ 
                   animationDelay: '0.2s', 
                   fontFamily: 'Open Sans, sans-serif', 
                   fontWeight: '600',
                   textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                   letterSpacing: '1px'
                 }}>
                Department of Computer Science & Engineering
              </p>
            </div>
          </div>
        </header>

        {/* Timer Box */}
        <div className="timer-box text-center bg-gray-800 text-white p-4 rounded-lg my-4 animate-pulse">
          <h2 className="text-2xl font-bold" style={{ fontFamily: 'Montserrat, sans-serif', textTransform: 'uppercase' }}>Time Left for the Event ( March 17 ) :</h2>
          <p className="text-xl" style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}>{timeLeft}</p>
        </div>

        <main className="container mx-auto px-4 py-16 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 via-yellow-500/5 to-red-500/5"></div>
          
          <div className="text-center mb-16 relative z-10">
            <h2 className="text-3xl font-bold text-white mb-4 fade-in" style={{ animationDelay: '0.6s', fontFamily: 'Poppins, sans-serif', letterSpacing: '1px' }}>
              🌟 Unlock Your Professional Potential with CYNAPSES 🌟
            </h2>
            <p className="text-lg text-yellow-100 max-w-3xl mx-auto fade-in" style={{ animationDelay: '0.8s', fontFamily: 'Georgia, serif', lineHeight: '1.6' }}>
              Join our structured program designed to prepare you for a successful career in the technology industry.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 max-w-7xl mx-auto relative z-10">
            {events.map((event, index) => (
              <div
                key={index}
                onClick={() => setSelectedEvent(selectedEvent === index ? null : index)}
                className={`${event.theme} backdrop-blur-md p-6 rounded-xl card-glow transition-all duration-300 hover:scale-105 fade-in cursor-pointer float transform hover:rotate-3 hover:shadow-lg relative`}
                style={{ animationDelay: `${1 + index * 0.2}s`, fontFamily: 'Verdana, sans-serif' }}
              >
                <div className="card-title-container">
                  {renderIcon(event.icon, event.theme)}
                  <h3 className="text-xl font-semibold text-white">{event.title}</h3>
                </div>
                <div className="absolute top-0 left-0 bg-black/70 text-white text-xs px-2 py-1 rounded-br-lg">
                  {event.type}
                </div>
                {selectedEvent === index && (
                  <p className="text-yellow-100 mt-4 animate-slide-in">{event.description}</p>
                )}
              </div>
            ))}
          </div>

          {/* Event Details Modal */}
          {selectedEvent !== null && (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
              <div className={`${events[selectedEvent].theme} rounded-2xl p-8 max-w-2xl w-full relative overflow-y-auto max-h-[90vh]`} style={{ fontFamily: 'Tahoma, sans-serif' }}>
                <button 
                  onClick={() => setSelectedEvent(null)}
                  className={`absolute right-4 top-4 ${getIconColor(events[selectedEvent].theme)} hover:opacity-75 transition-opacity`}
                >
                  <X size={24} />
                </button>
                
                <div className="flex items-center mb-6">
                  {renderIcon(events[selectedEvent].icon, events[selectedEvent].theme)}
                  <h3 className="text-2xl font-bold text-white">{events[selectedEvent].title}</h3>
                </div>

                {events[selectedEvent].subtitle && (
                  <p className={`${getIconColor(events[selectedEvent].theme)} mb-4 italic`}>{events[selectedEvent].subtitle}</p>
                )}

                <p className="text-yellow-100 mb-6 animate-slide-in">{events[selectedEvent].description}</p>

                {events[selectedEvent].format && (
                  <div className="mb-6">
                    <h4 className={`${getIconColor(events[selectedEvent].theme)} font-semibold mb-2`}>Event Format:</h4>
                    <ul className="list-disc list-inside text-yellow-100 space-y-2">
                      {events[selectedEvent].format.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {events[selectedEvent].highlights && (
                  <div className="mb-6">
                    <h4 className={`${getIconColor(events[selectedEvent].theme)} font-semibold mb-2`}>What's in it for you:</h4>
                    <ul className="list-disc list-inside text-yellow-100 space-y-2">
                      {events[selectedEvent].highlights.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {events[selectedEvent].rules && (
                  <div className="mb-6">
                    <h4 className={`${getIconColor(events[selectedEvent].theme)} font-semibold mb-2`}>Rules and Regulations:</h4>
                    <ul className="list-disc list-inside text-yellow-100 space-y-2">
                      {events[selectedEvent].rules.map((rule, i) => (
                        <li key={i}>{rule}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {events[selectedEvent].details && (
                  <div className="mb-6">
                    {typeof events[selectedEvent].details === 'string' ? (
                      <p className="text-yellow-100">{events[selectedEvent].details}</p>
                    ) : (
                      <div className="space-y-2">
                        {events[selectedEvent].details.participation && (
                          <p className="text-yellow-100">
                            <span className={`${getIconColor(events[selectedEvent].theme)}`}>Participation:</span> {events[selectedEvent].details.participation}
                          </p>
                        )}
                        {events[selectedEvent].details.languages && (
                          <p className="text-yellow-100">
                            <span className={`${getIconColor(events[selectedEvent].theme)}`}>Languages:</span> {events[selectedEvent].details.languages}
                          </p>
                        )}
                        {events[selectedEvent].details.prizes && (
                          <p className="text-yellow-100">
                            <span className={`${getIconColor(events[selectedEvent].theme)}`}>Prizes:</span> {events[selectedEvent].details.prizes}
                          </p>
                        )}
                        {events[selectedEvent].details.deadline && (
                          <p className="text-yellow-100">
                            <span className={`${getIconColor(events[selectedEvent].theme)}`}>Registration Deadline:</span> {events[selectedEvent].details.deadline}
                          </p>
                        )}
                        {events[selectedEvent].details.requirements && (
                          <p className="text-yellow-100">
                            <span className={`${getIconColor(events[selectedEvent].theme)}`}>Requirements:</span> {events[selectedEvent].details.requirements}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {events[selectedEvent].organizers && (
                  <div className="pt-6 border-t border-yellow-500/30">
                    <h4 className={`${getIconColor(events[selectedEvent].theme)} font-semibold mb-2`}>Organizers:</h4>
                    <ul className="text-yellow-100 space-y-1">
                      {events[selectedEvent].organizers.map((organizer, i) => (
                        <li key={i}>{organizer}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Registration Button */}
                {events[selectedEvent].registerLink && (
                  <div className="mt-8 text-center">
                    {/* Add deadline notice for InnoHack */}
                    {events[selectedEvent].theme === 'card-innohack' && (
                      <p className="mb-4 text-yellow-300 font-bold animate-pulse">
                        ⚠️ Last Date To Register : 20 Feb 2025 ⚠️
                      </p>
                    )}
                    <a
                      href={events[selectedEvent].registerLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center px-6 py-3 rounded-lg font-semibold text-white transform transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black ${getButtonStyle(events[selectedEvent].theme)}`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      Register Now
                      <svg className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      </svg>
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}
        </main>

        <footer className="bg-black/40 backdrop-blur-sm text-white py-8 mt-16 border-t border-yellow-500/30">
          <div className="container mx-auto px-4 text-center">
            <p className="mb-2" style={{ fontFamily: 'Courier New, monospace', fontSize: '1.2rem' }}>Department of Computer Science & Engineering</p>
            <h4 style={{ fontFamily: 'Times New Roman, serif', fontSize: '1.5rem' }}>If you have any queries , feel free to ask our respective event organizers .</h4>
            <br></br>
            <p className="text-yellow-300" style={{ fontFamily: 'Comic Sans MS, cursive', fontSize: '1.3rem' }}>RMK Engineering College</p>
            <p className="text-sm text-yellow-400 mt-4" style={{ fontFamily: 'Lucida Console, monospace', fontSize: '1rem' }}>© 2025 CYNAPSES. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
