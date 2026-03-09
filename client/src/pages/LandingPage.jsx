import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Play, Check, ChevronRight, Activity, Users, Video, Calendar, Trophy, Lock, Shield, HeartPulse } from 'lucide-react';
import Chatbot from '../components/Chatbot';
import Marquee from 'react-fast-marquee';

const LandingPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-500 overflow-hidden relative selection:bg-blue-500/30">

      {/* Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/20 dark:bg-blue-500/10 blur-[120px] mix-blend-screen animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/20 dark:bg-purple-500/10 blur-[120px] mix-blend-screen animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }} />
      </div>

      {/* Hero Section */}
      <section className="relative pt-24 pb-32 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="mt-12"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 font-medium text-sm mb-8 border border-blue-200 dark:border-blue-500/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              NeuroGestureX is Live
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-6 leading-tight">
              NeuroGestureX - <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                AI-Based Hand Gesture
              </span>
            </motion.h1>

            <motion.p variants={itemVariants} className="mt-4 text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10">
              Recognition for Neuroplastic Rehabilitation.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/register"
                className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-[0_0_40px_-10px_rgba(37,99,235,0.5)] hover:shadow-[0_0_60px_-15px_rgba(37,99,235,0.7)] overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
                <span className="relative flex items-center">
                  Start Free Trial
                  <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <button
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-full text-gray-900 dark:text-white bg-white dark:bg-slate-900/50 border border-gray-200 dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-800 transition-all shadow-sm hover:shadow-md backdrop-blur-sm"
              >
                <Play className="mr-2 h-5 w-5 fill-current text-blue-600 dark:text-blue-400" />
                Watch Demo
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Marquee Section */}
      <section className="py-10 border-y border-gray-100 dark:border-slate-800/50 bg-gray-50/50 dark:bg-slate-900/20 backdrop-blur-sm relative z-10">
        <p className="text-center text-sm font-medium text-gray-500 dark:text-gray-400 mb-6 uppercase tracking-wider">Trusted By Leading Healthcare Providers</p>
        <Marquee gradient={true} gradientColor="transparent" speed={40} className="py-4">
          {[1, 2, 3, 4, 5, 6, 7].map((num) => (
            <div key={num} className="flex items-center mx-12 text-gray-400 dark:text-slate-600 grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all duration-300 cursor-pointer">
              <Activity className="h-8 w-8 mr-2" />
              <span className="text-xl font-bold font-mono">PARTNER_{num}</span>
            </div>
          ))}
        </Marquee>
      </section>

      {/* Media Section with 3D-ish feel */}
      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Marquee gradient={true} gradientColor="transparent" speed={30} pauseOnHover={true} className="py-4">
            <div className="flex px-4 gap-8">
              {[
                { title: "Patient Exercises Demo", color: "from-blue-500/20 to-transparent" },
                { title: "Gamification Preview", color: "from-purple-500/20 to-transparent" },
                { title: "Motion Tracking AI", color: "from-emerald-500/20 to-transparent" }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -10 }}
                  className="relative rounded-2xl overflow-hidden shadow-2xl dark:shadow-slate-900/80 aspect-video group bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700/50 transition-all w-[320px] md:w-[400px] flex-shrink-0"
                >
                  <div className={`absolute inset-0 bg-gradient-to-b ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-gray-500 dark:text-slate-400 font-medium">{item.title}</p>
                  </div>
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="h-16 w-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md border border-white/30"
                    >
                      <Play className="h-6 w-6 text-white fill-current ml-1" />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Marquee>
        </div>
      </section>

      {/* Why TeleRehabX Section - Glassmorphic Cards */}
      <section id="features" className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">Why NeuroGestureX?</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              We combine cutting-edge technology with expert care to deliver the best rehabilitation experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              { icon: Activity, title: "AI Motion Tracking", desc: "Real-time feedback on your exercise form using advanced computer vision.", c: "text-blue-500", bg: "bg-blue-500/10" },
              { icon: Trophy, title: "Gamified Exercises", desc: "Turn boring rehab routines into engaging games to stay motivated.", c: "text-purple-500", bg: "bg-purple-500/10" },
              { icon: Users, title: "Personalized Plans", desc: "Therapy plans tailored specifically to your recovery needs.", c: "text-emerald-500", bg: "bg-emerald-500/10" },
              { icon: Video, title: "Remote Monitoring", desc: "Therapists track your progress and adjust plans remotely.", c: "text-amber-500", bg: "bg-amber-500/10" },
              { icon: Calendar, title: "Progress Dashboards", desc: "Visualize your recovery journey with detailed analytics.", c: "text-pink-500", bg: "bg-pink-500/10" },
              { icon: Lock, title: "Secure Consultations", desc: "HIPAA-compliant video calls with your physiotherapist.", c: "text-indigo-500", bg: "bg-indigo-500/10" }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl p-8 rounded-3xl shadow-lg border border-gray-100 dark:border-slate-800 hover:border-gray-300 dark:hover:border-slate-700 transition-all group"
              >
                <div className={`h-14 w-14 ${feature.bg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`h-7 w-7 ${feature.c}`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats/Benefits Section */}
      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden bg-gray-900 dark:bg-slate-900 shadow-2xl border border-gray-800 dark:border-slate-800">
            {/* Inner background glow */}
            <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-blue-600/30 rounded-full blur-[80px]" />
            <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-purple-600/30 rounded-full blur-[80px]" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2">
              <div className="p-10 md:p-16 lg:p-20 text-white flex flex-col justify-center">
                <h2 className="text-3xl md:text-5xl font-bold mb-8">Benefits for Subscribers</h2>
                <ul className="space-y-6">
                  {[
                    "Therapy from the comfort of your home",
                    "Motivational gamification to keep you going",
                    "Detailed progress reports and analytics",
                    "Access to expert certified therapists",
                    "Safe, guided exercises with AI correction"
                  ].map((benefit, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center text-lg text-gray-300"
                    >
                      <div className="mr-5 flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
                        <Check className="h-4 w-4 text-blue-400" />
                      </div>
                      {benefit}
                    </motion.li>
                  ))}
                </ul>
                <div className="mt-12">
                  <Link to="/register" className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 font-bold rounded-full hover:bg-gray-100 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-105">
                    Get Started Today
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Link>
                </div>
              </div>
              <div className="relative hidden lg:flex items-center justify-center bg-gray-950/50 backdrop-blur-sm border-l border-gray-800 dark:border-slate-800 p-12 overflow-hidden">
                {/* Fake dashboard UI element */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  className="w-full h-full max-h-96 rounded-2xl bg-gray-900/80 border border-gray-800 p-6 flex flex-col gap-4 shadow-2xl relative z-10"
                >
                  <div className="flex justify-between items-center mb-4 border-b border-gray-800 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                        <HeartPulse className="text-blue-400 h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-white font-medium">Recovery Status</p>
                        <p className="text-sm text-gray-500">Weekly Progress</p>
                      </div>
                    </div>
                    <span className="text-emerald-400 font-bold">+14%</span>
                  </div>

                  {/* Fake Chart bars */}
                  <div className="flex-1 flex items-end gap-3 pt-8 pb-4">
                    {[40, 60, 30, 80, 50, 90, 70].map((h, i) => (
                      <div key={i} className="flex-1 bg-gray-800 rounded-t-md relative group">
                        <motion.div
                          initial={{ height: 0 }}
                          whileInView={{ height: `${h}%` }}
                          transition={{ duration: 1, delay: i * 0.1 }}
                          className="absolute bottom-0 w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-md opacity-80 group-hover:opacity-100 transition-opacity"
                        />
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community / Newsletter Section */}
      <section className="py-24 relative z-10 border-t border-gray-200/50 dark:border-slate-800/50">
        <div className="absolute inset-0 bg-blue-50/50 dark:bg-slate-900/30" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 p-10 md:p-16 rounded-3xl shadow-xl"
          >
            <Shield className="h-12 w-12 text-blue-500 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Join Our Community</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-xl mx-auto">
              Get updates on the latest features, new gamified exercises, and expert health tips directly to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 rounded-full border border-gray-300 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-400"
              />
              <button
                type="submit"
                className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-8 py-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-100 transition-all shadow-lg hover:scale-105"
              >
                Subscribe
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Therapist Section */}
      <section className="py-24 relative z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-indigo-950" />
        {/* Background elements */}
        <div className="absolute right-0 top-0 w-1/2 h-full bg-blue-500/10 blur-[100px] transform skew-x-12" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Are you a Certified Therapist?</h2>
            <p className="text-xl text-blue-200 mb-10 max-w-2xl mx-auto font-light">
              Join our network to manage patients efficiently, track progress with AI precision, and rapidly grow your digital practice.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link
                to="/register?role=therapist"
                className="px-8 py-4 bg-white text-blue-900 rounded-full font-bold hover:bg-blue-50 transition-all shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:scale-105 flex items-center justify-center"
              >
                Join as Therapist
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/login"
                className="px-8 py-4 bg-transparent border-2 border-white/50 text-white rounded-full font-bold hover:bg-white/10 transition-all flex items-center justify-center backdrop-blur-sm"
              >
                Therapist Login
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Chatbot */}
      <Chatbot />
    </div>
  );
};

export default LandingPage;
