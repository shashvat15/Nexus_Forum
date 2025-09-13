import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Calendar, MapPin, Clock, Users, Star, Youtube, ExternalLink, Timer, Award, 
  TrendingUp, BookOpen, Rocket, Crown, Sparkles,
  ArrowRight, ChevronDown, Globe, Code, Lightbulb, AlarmClock
} from 'lucide-react';

function App() {
  // Timer state
  const [timeLeft, setTimeLeft] = useState({
    regStart: { days: 0, hours: 0, minutes: 0, seconds: 0 },
    regEnd: { days: 5, hours: 12, minutes: 30, seconds: 45 },
    eventStart: { days: 15, hours: 10, minutes: 0, seconds: 0 }
  });

  // Scroll-based animations
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Registration dates
  const registrationStartDate = new Date('2025-09-08T10:00:00').getTime();
  const registrationEndDate = new Date('2025-09-18T23:59:59').getTime();
  const eventStartDate = new Date('2025-09-19T10:00:00').getTime();

  const calculateTimeLeft = (targetDate: number) => {
    const now = new Date().getTime();
    const difference = targetDate - now;
    
    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000)
      };
    }
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft({
        regStart: calculateTimeLeft(registrationStartDate),
        regEnd: calculateTimeLeft(registrationEndDate),
        eventStart: calculateTimeLeft(eventStartDate)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [registrationStartDate, registrationEndDate, eventStartDate]);

  const handleRegister = () => {
    window.open('https://eventhubcc.vit.ac.in/EventHub/', '_blank');
  };

  // Floating particles component
  const FloatingParticles = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(window.innerWidth < 768 ? 25 : 50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white/20 rounded-full"
          initial={{ 
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: 0
          }}
          animate={{
            y: [null, -100],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            delay: Math.random() * 10
          }}
        />
      ))}
    </div>
  );

  // Timer Card (without animations)
  const TimerCard = ({ title, time, accent }: { 
    title: string; 
    time: any; 
    accent: boolean;
  }) => {
    return (
      <div
        className={`relative overflow-hidden bg-gradient-to-br from-gray-900/90 via-gray-800/90 to-gray-900/90 backdrop-blur-xl rounded-2xl md:rounded-3xl p-4 md:p-8 border ${
          accent 
            ? 'border-cyan-400/50 shadow-2xl shadow-cyan-500/20' 
            : 'border-white/20 shadow-xl shadow-black/20'
        } hover:border-white/40 transition-all duration-500`}
      >
        {/* Background gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${
          accent 
            ? 'from-cyan-500/10 via-blue-500/5 to-purple-500/10' 
            : 'from-white/5 via-gray-500/5 to-white/5'
        }`} />
        
        <h3 className="text-white font-bold mb-4 md:mb-6 text-center text-lg md:text-xl relative z-10">
          {title}
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 text-center relative z-10">
          {[
            { value: time.days, label: 'Days' },
            { value: time.hours, label: 'Hours' },
            { value: time.minutes, label: 'Mins' },
            { value: time.seconds, label: 'Secs' }
          ].map((item) => (
            <div
              key={item.label}
              className="bg-white/10 backdrop-blur-sm rounded-xl md:rounded-2xl p-2 md:p-4 border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              <div className="text-xl md:text-3xl font-black text-white">
                {item.value}
              </div>
              <div className="text-xs text-gray-300 font-medium mt-1">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Advanced Background with Multiple Layers */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Animated Grid */}
        <motion.div 
          className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"
          animate={{ 
            backgroundPosition: ['0px 0px', '50px 50px'],
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
        
        {/* Floating geometric shapes - hidden on mobile for performance */}
        <motion.div 
          className="hidden md:block absolute top-20 left-10 w-64 h-64 border border-cyan-400/20 rounded-full"
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{ 
            rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
            scale: { duration: 4, repeat: Infinity }
          }}
        />
        <motion.div 
          className="hidden md:block absolute top-40 right-20 w-32 h-32 border border-purple-400/20 rotate-45"
          animate={{ 
            rotate: [45, 405],
            scale: [1, 1.2, 1],
          }}
          transition={{ 
            rotate: { duration: 15, repeat: Infinity, ease: 'linear' },
            scale: { duration: 3, repeat: Infinity }
          }}
        />
        <motion.div 
          className="hidden md:block absolute bottom-20 left-20 w-48 h-48 border border-blue-400/20 rotate-12"
          animate={{ 
            rotate: [12, 372],
            scale: [1, 1.15, 1],
          }}
          transition={{ 
            rotate: { duration: 18, repeat: Infinity, ease: 'linear' },
            scale: { duration: 5, repeat: Infinity }
          }}
        />
        
        {/* Floating particles */}
        <FloatingParticles />
        
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5" />
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/3 via-transparent to-pink-500/3" />
      </div>

      {/* Hero Section with Parallax */}
      <motion.section 
        style={{ y, opacity }}
        className="relative overflow-hidden min-h-screen flex items-center z-10"
      >
        {/* Header */}
        <motion.div 
          className="absolute top-0 left-0 right-0 z-20 p-4 md:p-6"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex flex-row justify-between items-center max-w-7xl mx-auto gap-4">
            <motion.a 
              href="https://nexus-website-gamma.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-4 cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-white font-bold text-lg md:text-xl tracking-wider hover:text-cyan-400 transition-colors duration-300">NEXUS</div>
            </motion.a>
            <div className="flex flex-row items-center space-x-3">
              <motion.a 
                href="https://takeuforward.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white font-bold text-xs md:text-lg cursor-pointer hover:text-purple-400 transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
              >
                <span className="hidden sm:inline">TAKE U FORWARD</span>
                <span className="sm:hidden">TUF</span>
              </motion.a>
              {/* <div className="text-white/80 text-xs md:text-sm hidden sm:block">OSW</div> */}
            </div>
          </div>
        </motion.div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Mobile Layout - Text over Image */}
          <div className="lg:hidden relative">
            <motion.div 
              className="relative z-10 group mb-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <motion.img 
                src="/s1.jpg" 
                alt="Striver - Raj Vikramaditya"
                className="w-full max-w-sm mx-auto shadow-xl border-2 border-white/20 group-hover:border-slate-400/50 transition-all duration-500 rounded-2xl"
                whileHover={{ 
                  boxShadow: "0 15px 30px -8px rgba(100, 116, 139, 0.2)"
                }}
              />
              
              {/* Text overlay on mobile */}
              <div className="absolute inset-0 bg-black/40 rounded-2xl flex flex-col justify-center items-center text-center p-6">
                <motion.h1 
                  className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-black via-gray-900 to-gray-800 leading-none tracking-tight mb-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                >
                  STRIVER
                </motion.h1>
                
                <motion.h2 
                  className="text-3xl font-bold text-black mb-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.9 }}
                >
                  Nexus
                  <br />
                  <span className="text-2xl font-light bg-gradient-to-r from-black to-black bg-clip-text text-transparent">
                    Forum
                  </span>
                </motion.h2>
                
                <motion.div 
                  className="text-base text-black font-medium tracking-wider"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.1 }}
                >
                  TECH SUMMIT
                </motion.div>
              </div>
              
              {/* Floating info card - mobile positioning */}
              <motion.div 
                className="absolute -bottom-2 -right-2 bg-gradient-to-br from-slate-100 to-gray-200 text-slate-800 p-2 shadow-lg border border-slate-300 rounded-lg backdrop-blur-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 }}
                whileHover={{ scale: 1.02, rotate: 1 }}
              >
                <div className="text-xs font-bold tracking-wide flex items-center">
                  <Crown className="h-3 w-3 mr-1 text-slate-600" />
                  takeUforward
                </div>
                <div className="text-xs font-medium text-slate-600">Founder & CEO</div>
              </motion.div>
            </motion.div>
            
            {/* Mobile location and date info */}
            <motion.div 
              className="space-y-3 text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
            >
              <motion.div 
                className="flex items-center justify-center text-gray-300 group cursor-pointer"
                whileHover={{ x: 5, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <MapPin className="h-4 w-4 mr-2 text-slate-400 group-hover:text-slate-300 transition-colors flex-shrink-0" />
                <span className="text-sm">MG Auditorium, VIT Chennai</span>
              </motion.div>
              <motion.div 
                className="flex items-center justify-center text-gray-300 group cursor-pointer"
                whileHover={{ x: 5, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Calendar className="h-4 w-4 mr-2 text-slate-400 group-hover:text-slate-300 transition-colors flex-shrink-0" />
                <span className="text-sm">September 19, 2025 </span>
              </motion.div>
              <motion.div 
                className="flex items-center justify-center text-gray-300 group cursor-pointer"
                whileHover={{ x: 5, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <AlarmClock className="h-4 w-4 mr-2 text-slate-400 group-hover:text-slate-300 transition-colors flex-shrink-0" />
                <span className="text-sm">2:00PM - 6:00PM</span>
              </motion.div>
            </motion.div>
            
            {/* Mobile register button */}
            <motion.button
              onClick={handleRegister}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.6 }}
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 0 20px rgba(100, 116, 139, 0.3)"
              }}
              whileTap={{ scale: 0.98 }}
              className="relative overflow-hidden bg-gradient-to-r from-slate-700 to-slate-600 text-white font-bold py-3 px-8 rounded-2xl hover:from-slate-600 hover:to-slate-500 transition-all duration-300 text-base tracking-wide group w-full border border-slate-500/30 hover:border-slate-400/50 mt-6"
            >
              <span className="relative z-10 flex items-center justify-center">
                <Rocket className="h-4 w-4 mr-2 group-hover:translate-y-[-2px] transition-transform" />
                REGISTER NOW
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            </motion.button>
          </div>

          {/* Desktop Layout - Left Content */}
          <div className="hidden lg:block text-center lg:text-left space-y-6 md:space-y-8">
            <motion.h1 
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-300 to-gray-400 leading-none tracking-tight"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              STRIVER
            </motion.h1>
            
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                Nexus
                <br />
                <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light bg-gradient-to-r from-slate-300 to-gray-400 bg-clip-text text-transparent">
                  Forum
                </span>
              </h2>
              <motion.div 
                className="text-lg sm:text-xl md:text-2xl text-gray-300 font-medium tracking-wider flex items-center justify-center lg:justify-start space-x-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <div className="hidden sm:block">
                  <Sparkles className="h-4 w-4 md:h-6 md:w-6 text-slate-400" />
                </div>
                <span>TECH SUMMIT</span>
                <div className="hidden sm:block">
                  <Sparkles className="h-4 w-4 md:h-6 md:w-6 text-slate-400" />
                </div>
              </motion.div>
            </motion.div>

            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <motion.div 
                className="flex items-center justify-center lg:justify-start text-gray-300 group cursor-pointer"
                whileHover={{ x: 5, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <MapPin className="h-5 w-5 md:h-6 md:w-6 mr-3 md:mr-4 text-slate-400 group-hover:text-slate-300 transition-colors flex-shrink-0" />
                <span className="text-lg md:text-xl">MG Auditorium, VIT Chennai</span>
              </motion.div>
              <motion.div 
                className="flex items-center justify-center lg:justify-start text-gray-300 group cursor-pointer"
                whileHover={{ x: 5, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Calendar className="h-5 w-5 md:h-6 md:w-6 mr-3 md:mr-4 text-slate-400 group-hover:text-slate-300 transition-colors flex-shrink-0" />
                <span className="text-lg md:text-xl">September 19, 2025</span>
              </motion.div>
              <motion.div 
                className="flex items-center justify-center lg:justify-start text-gray-300 group cursor-pointer"
                whileHover={{ x: 5, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <AlarmClock className="h-5 w-5 md:h-6 md:w-6 mr-3 md:mr-4 text-slate-400 group-hover:text-slate-300 transition-colors flex-shrink-0" />
                <span className="text-lg md:text-xl">2:00PM - 6:00PM</span>
              </motion.div>
            </motion.div>

            <motion.button
              onClick={handleRegister}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 0 20px rgba(100, 116, 139, 0.3)"
              }}
              whileTap={{ scale: 0.98 }}
              className="relative overflow-hidden bg-gradient-to-r from-slate-700 to-slate-600 text-white font-bold py-4 md:py-6 px-8 md:px-12 rounded-2xl hover:from-slate-600 hover:to-slate-500 transition-all duration-300 text-lg md:text-xl tracking-wide group w-full sm:w-auto border border-slate-500/30 hover:border-slate-400/50"
            >
              <span className="relative z-10 flex items-center justify-center">
                <Rocket className="h-5 w-5 md:h-6 md:w-6 mr-2 md:mr-3 group-hover:translate-y-[-2px] transition-transform" />
                REGISTER NOW
                <ArrowRight className="h-5 w-5 md:h-6 md:w-6 ml-2 md:ml-3 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            </motion.button>
          </div>

          {/* Desktop Layout - Right Content - Enhanced Image with 3D Effects */}
          <motion.div 
            className="hidden lg:block relative order-first lg:order-last"
            initial={{ opacity: 0, x: 100, rotateY: 45 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <motion.div 
              className="relative z-10 group"
              whileHover={{ rotateY: 5, scale: 1.02 }}
              transition={{ duration: 0.6 }}
            >
              <motion.img 
                src="/s1.jpg" 
                alt="Striver - Raj Vikramaditya"
                className="w-full max-w-sm md:max-w-lg mx-auto shadow-xl border-2 border-white/20 group-hover:border-slate-400/50 transition-all duration-500 rounded-2xl"
                whileHover={{ 
                  boxShadow: "0 15px 30px -8px rgba(100, 116, 139, 0.2)"
                }}
              />
              
              {/* Floating info card - responsive positioning */}
              <motion.div 
                className="absolute -bottom-4 -right-4 md:-bottom-8 md:-right-8 bg-gradient-to-br from-slate-100 to-gray-200 text-slate-800 p-3 md:p-6 shadow-lg border border-slate-300 rounded-xl md:rounded-2xl backdrop-blur-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                whileHover={{ scale: 1.02, rotate: 1 }}
              >
                <div className="text-sm md:text-lg font-bold tracking-wide flex items-center">
                  <Crown className="h-4 w-4 md:h-5 md:w-5 mr-1 md:mr-2 text-slate-600" />
                  takeUforward
                </div>
                <div className="text-xs md:text-sm font-medium text-slate-600">Founder & CEO</div>
              </motion.div>
            </motion.div>
            
            {/* Enhanced decorative elements - hidden on mobile for performance */}
            <motion.div 
              className="hidden md:block absolute -top-12 -left-12 w-24 h-24 border-2 border-slate-400/20 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div 
              className="hidden md:block absolute -bottom-12 -right-12 w-40 h-40 border border-slate-400/15 rounded-2xl"
              animate={{ rotate: -360 }}
              transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div 
              className="hidden md:block absolute top-1/2 -left-8 w-6 h-6 bg-gradient-to-br from-slate-400 to-gray-500 rounded-full"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="h-8 w-8 text-white/60" />
        </motion.div>
      </motion.section>

      {/* About Striver Section with Enhanced Animations */}
      <motion.section 
        className="py-16 md:py-32 bg-gradient-to-b from-black via-gray-900/30 to-black relative"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12 md:mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.h2 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-400 to-purple-400 mb-6 md:mb-8 tracking-tight"
              initial={{ scale: 0.8 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              MEET THE LEGEND
            </motion.h2>
            <motion.div 
              className="w-24 md:w-32 h-1 md:h-2 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: window.innerWidth < 768 ? 96 : 128 }}
              transition={{ duration: 1, delay: 0.3 }}
              viewport={{ once: true }}
            />
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="space-y-6 md:space-y-8 text-gray-300 text-base md:text-lg leading-relaxed">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <strong className="text-white text-xl md:text-2xl">Raj Vikramaditya</strong>, globally known as 
                  <strong className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 text-xl md:text-2xl"> Striver</strong>, is a Senior Software Engineer at Google 
                  and the visionary founder of takeUforward, India's leading coding education platform.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  With over <strong className="text-cyan-400">2.5 million subscribers</strong> on YouTube and 
                  <strong className="text-purple-400"> 1 million+ students</strong> trained, he has revolutionized 
                  how aspiring developers approach Data Structures and Algorithms.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  His structured approach to problem-solving and comprehensive curriculum has helped 
                  thousands of students land jobs at top tech companies including Google, Microsoft, 
                  Amazon, and Meta.
                </motion.p>
              </div>
            </motion.div>
            
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              {[
                { icon: Youtube, value: "2.5M+", label: "YouTube Subscribers", color: "text-red-500", bgColor: "from-red-500/10 to-red-600/10" },
                { icon: Users, value: "1M+", label: "Students Trained", color: "text-blue-500", bgColor: "from-blue-500/10 to-blue-600/10" },
                { icon: Award, value: "Google", label: "Senior SDE", color: "text-yellow-500", bgColor: "from-yellow-500/10 to-yellow-600/10" },
                { icon: BookOpen, value: "takeUforward", label: "Founder & CEO", color: "text-green-500", bgColor: "from-green-500/10 to-green-600/10" }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 50, scale: 0.8 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  whileHover={{ 
                    scale: 1.05, 
                    rotateY: 5,
                    transition: { duration: 0.3 }
                  }}
                  className={`relative overflow-hidden bg-gradient-to-br ${stat.bgColor} backdrop-blur-xl border border-white/20 rounded-2xl md:rounded-3xl p-4 md:p-8 text-center hover:border-white/40 transition-all duration-500 group`}
                >
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <stat.icon className={`h-8 w-8 md:h-14 md:w-14 ${stat.color} mx-auto mb-3 md:mb-6 group-hover:drop-shadow-lg`} />
                  </motion.div>
                  <motion.div 
                    className="text-xl md:text-3xl font-black text-white mb-2 md:mb-3"
                    whileHover={{ scale: 1.1 }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-gray-400 text-xs md:text-sm font-medium">{stat.label}</div>
                  
                  {/* Animated background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Enhanced Key Achievements */}
          <motion.div 
            className="mt-12 md:mt-24 bg-gradient-to-br from-gray-900/50 via-black/30 to-gray-900/50 backdrop-blur-xl border border-white/10 rounded-2xl md:rounded-3xl p-6 md:p-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <motion.h3 
              className="text-2xl md:text-3xl font-bold text-white mb-8 md:mb-12 text-center"
              initial={{ scale: 0.8 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Key Achievements
            </motion.h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {[
                { icon: TrendingUp, title: "Industry Impact", desc: "Transformed coding education in India with structured learning paths", color: "text-blue-400" },
                { icon: Star, title: "Recognition", desc: "Featured in top tech publications and coding communities worldwide", color: "text-yellow-400" },
                { icon: Users, title: "Community", desc: "Built one of the largest coding communities with active mentorship", color: "text-green-400" }
              ].map((achievement, index) => (
                <motion.div 
                  key={achievement.title}
                  className="text-center group cursor-pointer"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 + index * 0.2 }}
                  whileHover={{ y: -10, scale: 1.05 }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    whileHover={{ scale: 1.3, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <achievement.icon className={`h-10 w-10 md:h-12 md:w-12 ${achievement.color} mx-auto mb-4 md:mb-6 group-hover:drop-shadow-lg`} />
                  </motion.div>
                  <h4 className="text-white font-bold mb-3 md:mb-4 text-lg md:text-xl">{achievement.title}</h4>
                  <p className="text-gray-400 text-sm md:text-base leading-relaxed">{achievement.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Enhanced Venue Section */}
      <motion.section 
        className="py-16 md:py-32 bg-gradient-to-b from-black via-gray-900/20 to-black relative"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12 md:mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.h2 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-400 to-purple-400 mb-6 md:mb-8 tracking-tight"
              initial={{ scale: 0.8 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              VENUE
            </motion.h2>
            <motion.div 
              className="w-24 md:w-32 h-1 md:h-2 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: window.innerWidth < 768 ? 96 : 128 }}
              transition={{ duration: 1, delay: 0.3 }}
              viewport={{ once: true }}
            />
          </motion.div>
          
          <motion.div 
            className="bg-gradient-to-br from-gray-900/50 via-black/30 to-gray-900/50 backdrop-blur-xl border border-white/20 rounded-2xl md:rounded-3xl p-6 md:p-12 lg:p-16 shadow-2xl"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <motion.h3 
                  className="text-3xl md:text-4xl font-bold text-white mb-6 md:mb-10"
                  whileHover={{ scale: 1.05 }}
                >
                  MG Auditorium
                </motion.h3>
                
                <div className="space-y-6 md:space-y-8">
                  {[
                    { icon: MapPin, title: "Location", desc: "VIT Chennai Campus, Main Block", color: "text-cyan-400" },
                    { icon: Users, title: "Capacity", desc: "500+ Seats with Premium Audio-Visual Setup", color: "text-purple-400" },
                    { icon: Star, title: "Facilities", desc: "Air Conditioning, Comfortable Seating", color: "text-yellow-400" }
                  ].map((item, index) => (
                    <motion.div 
                      key={item.title}
                      className="flex items-start space-x-4 md:space-x-6 group cursor-pointer"
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.7 + index * 0.2 }}
                      whileHover={{ x: 10, scale: 1.02 }}
                      viewport={{ once: true }}
                    >
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 10 }}
                        transition={{ duration: 0.3 }}
                      >
                        <item.icon className={`h-6 w-6 md:h-8 md:w-8 ${item.color} mt-1 md:mt-2 flex-shrink-0 group-hover:drop-shadow-lg`} />
                      </motion.div>
                      <div>
                        <h4 className="font-bold text-white mb-2 md:mb-3 text-lg md:text-xl">{item.title}</h4>
                        <p className="text-gray-300 text-base md:text-lg">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              
              <motion.div 
                className="relative rounded-2xl md:rounded-3xl overflow-hidden border-2 border-white/20 shadow-2xl"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                whileHover={{ scale: 1.02, rotateY: 2 }}
                viewport={{ once: true }}
              >
                <iframe
                  title="VIT Chennai Location"
                  src="https://www.google.com/maps?q=VIT+Chennai&output=embed"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-xl md:rounded-2xl"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Timer Section (without animations) */}
      <section className="py-16 md:py-32 bg-gradient-to-b from-black via-gray-900/30 to-black relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-20">
            <div>
              <Timer className="h-12 w-12 md:h-20 md:w-20 text-cyan-400 mx-auto mb-6 md:mb-8" />
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-400 to-purple-400 mb-6 md:mb-8 tracking-tight">
              EVENT TIMELINE
            </h2>
            <div className="w-24 md:w-32 h-1 md:h-2 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto rounded-full mb-4 md:mb-6" />
            <p className="text-gray-300 text-lg md:text-2xl">
              Mark your calendars and secure your spot!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-20">
            <TimerCard title="Registration Opens" time={timeLeft.regStart} accent={false} />
            <TimerCard title="Registration Closes" time={timeLeft.regEnd} accent={true} />
            <TimerCard title="Event Day" time={timeLeft.eventStart} accent={false} />
          </div>

          <div className="bg-gradient-to-br from-gray-900/50 via-black/30 to-gray-900/50 backdrop-blur-xl border border-white/20 rounded-2xl md:rounded-3xl p-6 md:p-12">
  <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 text-center">
    {[
      { icon: Calendar, title: "Registration Opens", date: "September 8, 2025 - 10:00 AM", color: "text-cyan-400" },
      { icon: Clock, title: "Registration Deadline", date: "September 18, 2025 - 11:59 PM", color: "text-purple-400" },
      { icon: Star, title: "Event Day", date: "September 19, 2025 - 2:00 PM", color: "text-yellow-400" },
      { icon: AlarmClock, title: "Entry Starts", date: "September 19, 2025 - 12:30 PM", color: "text-green-400", glow: true }
    ].map((item) => (
      <div 
        key={item.title}
        className="group cursor-pointer relative"
      >
        <div className="relative flex justify-center">
          {/* Glow effect for Entry Starts */}
          {item.glow && (
            <span className="absolute -inset-2 rounded-full blur-xl opacity-70 animate-pulse bg-green-400/40 pointer-events-none"></span>
          )}
          <item.icon className={`h-10 w-10 md:h-12 md:w-12 ${item.color} mx-auto mb-4 md:mb-6 group-hover:drop-shadow-lg relative z-10`} />
        </div>
        <h4 className="text-white font-bold mb-3 md:mb-4 text-lg md:text-xl">{item.title}</h4>
        <p className="text-gray-300 text-base md:text-lg">{item.date}</p>
      </div>
    ))}
  </div>
</div>
        </div>
      </section>

      {/* How to Register Section */}
      <motion.section 
        className="py-16 md:py-32 bg-gradient-to-b from-black via-gray-900/20 to-black relative"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-20">
            <div>
              <ExternalLink className="h-12 w-12 md:h-20 md:w-20 text-cyan-400 mx-auto mb-6 md:mb-8" />
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-400 to-purple-400 mb-6 md:mb-8 tracking-tight">
              HOW TO REGISTER
            </h2>
            <div className="w-24 md:w-32 h-1 md:h-2 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto rounded-full mb-4 md:mb-6" />
            <p className="text-gray-300 text-lg md:text-2xl">
              Follow these simple steps to secure your spot
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 md:gap-16 items-center">
            {/* Video Container - Larger (3 columns) */}
            <motion.div 
              className="relative overflow-hidden rounded-2xl md:rounded-3xl border border-white/20 shadow-xl shadow-cyan-500/10 aspect-video lg:col-span-3"
              initial={{ scale: 0.95, opacity: 0.8 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              whileHover={{ 
                boxShadow: "0 25px 50px -12px rgba(8, 145, 178, 0.25)",
                borderColor: "rgba(255, 255, 255, 0.4)"
              }}
            >
              {/* Actual video with fullscreen capability */}
              <video 
                className="w-full h-full object-cover"
                src="/guide.mp4"
                controls
                controlsList="nodownload"
                poster="/nexus_logo_png.png"
              >
                Your browser does not support the video tag.
              </video>
              
              {/* Gradient overlay for better UI integration */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5" />
            </motion.div>

            {/* Registration Steps - Smaller (2 columns) */}
            <motion.div 
              className="bg-gradient-to-br from-gray-900/90 via-gray-800/90 to-gray-900/90 backdrop-blur-xl rounded-2xl md:rounded-3xl p-6 md:p-8 border border-white/20 shadow-xl lg:col-span-2"
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              whileHover={{ borderColor: "rgba(255, 255, 255, 0.3)" }}
            >
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center">
                <Globe className="h-6 w-6 md:h-7 md:w-7 text-cyan-400 mr-3" />
                Registration Instructions
              </h3>
              
              <div className="space-y-5 md:space-y-6">
                <motion.div 
                  className="flex items-start space-x-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  whileHover={{ x: 5 }}
                >
                  <div className="bg-gradient-to-br from-cyan-500 to-purple-500 rounded-full h-8 w-8 flex-shrink-0 flex items-center justify-center text-white font-bold">
                    1
                  </div>
                  <div className="text-gray-200 text-lg md:text-xl">
                    Login to <a 
                      href="https://eventhubcc.vit.ac.in/EventHub/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-cyan-400 hover:text-cyan-300 hover:underline transition-colors"
                    >
                      eventhubcc.vit.ac.in/EventHub
                    </a>
                  </div>
                </motion.div>
                
                {[
                  "In the search bar select Summit",
                  "Go to NexusForum (Free Registration)",
                  "Click on Register."
                ].map((step, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-start space-x-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + (index * 0.1) }}
                    whileHover={{ x: 5 }}
                  >
                    <div className="bg-gradient-to-br from-cyan-500 to-purple-500 rounded-full h-8 w-8 flex-shrink-0 flex items-center justify-center text-white font-bold">
                      {index + 2}
                    </div>
                    <div className="text-gray-200 text-lg md:text-xl">{step}</div>
                  </motion.div>
                ))}
                
                <motion.div 
                  className="mt-8 flex items-center justify-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  <div className="bg-gradient-to-r from-cyan-500 to-purple-500 p-4 rounded-xl text-white font-bold text-xl text-center">
                    All Set!!
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Enhanced Registration CTA Section */}
      <motion.section 
        className="py-16 md:py-32 bg-gradient-to-b from-black via-gray-900/20 to-black relative"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="relative overflow-hidden border-2 border-white/20 p-6 md:p-12 lg:p-20 bg-gradient-to-br from-gray-900/50 via-black/30 to-gray-900/50 backdrop-blur-xl text-center rounded-2xl md:rounded-3xl shadow-2xl"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            whileHover={{ scale: 1.02 }}
            viewport={{ once: true }}
          >
            {/* Animated background elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 animate-pulse" />
            
            <motion.h2 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-400 to-purple-400 mb-6 md:mb-8 tracking-tight relative z-10"
              initial={{ scale: 0.8 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              SECURE YOUR SPOT
            </motion.h2>
            
            <motion.p 
              className="text-lg md:text-2xl text-gray-300 mb-8 md:mb-12 relative z-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
            >
              Join hundreds of aspiring developers for this exclusive opportunity
            </motion.p>
            
            <motion.div 
              className="bg-gradient-to-br from-white/10 to-white/5 border-2 border-white/20 p-6 md:p-8 mb-8 md:mb-12 inline-block rounded-xl md:rounded-2xl backdrop-blur-sm relative z-10"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.05, rotate: 1 }}
              viewport={{ once: true }}
            >
              <motion.div 
                className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-2 md:mb-4"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                100% FREE
              </motion.div>
              
            </motion.div>
            
            <motion.div 
              className="mb-8 md:mb-12 relative z-10"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              viewport={{ once: true }}
            >
              <motion.button
                onClick={handleRegister}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 0 40px rgba(6, 182, 212, 0.6)"
                }}
                whileTap={{ scale: 0.95 }}
                className="relative overflow-hidden bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold py-4 md:py-6 px-12 md:px-20 hover:from-cyan-400 hover:to-purple-500 transition-all duration-300 text-lg md:text-2xl tracking-wide inline-flex items-center rounded-xl md:rounded-2xl group w-full sm:w-auto"
              >
                <span className="relative z-10 flex items-center justify-center w-full">
                  <Rocket className="h-6 w-6 md:h-8 md:w-8 mr-3 md:mr-4 group-hover:animate-bounce" />
                  REGISTER NOW
                  <ExternalLink className="h-6 w-6 md:h-8 md:w-8 ml-3 md:ml-4 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              </motion.button>
            </motion.div>
            
            <motion.p 
              className="text-gray-400 text-lg md:text-xl relative z-10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              viewport={{ once: true }}
            >
              Limited seats available
            </motion.p>
          </motion.div>
        </div>
      </motion.section>

      {/* Enhanced Footer */}
      <motion.footer 
        className="bg-gradient-to-t from-black via-gray-900/50 to-black border-t border-white/20 py-12 md:py-16 relative"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.h3 
                className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-400 mb-4 md:mb-6"
                whileHover={{ scale: 1.05 }}
              >
                NEXUS
              </motion.h3>
              <p className="text-gray-400 mb-4 md:mb-6 text-base md:text-lg">VIT Chennai's Premier Backend Club</p>
              
              {/* Social Links */}
              <div className="flex flex-wrap gap-3 md:gap-4">
                {[
                  { icon: Youtube, href: "https://www.youtube.com/@NEXUS-n4y", label: "YouTube", color: "hover:text-red-500" },
                  { icon: Globe, href: "https://nexus-website-gamma.vercel.app", label: "Website", color: "hover:text-blue-500" },
                  { icon: Code, href: "https://github.com/Nexus-VITC", label: "GitHub", color: "hover:text-gray-400" },
                 
                ].map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-gray-400 ${social.color} transition-colors duration-300 p-2 md:p-3 rounded-full border border-white/10 hover:border-white/30 hover:bg-white/5`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    viewport={{ once: true }}
                  >
                    <social.icon className="h-5 w-5 md:h-6 md:w-6" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-xl md:text-2xl font-bold text-white mb-6 md:mb-8">Contact Us</h4>
              
              {/* Student Coordinators */}
              <motion.div 
                className="mb-6 md:mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
              >
                <h5 className="text-lg md:text-xl font-bold text-cyan-400 mb-3 md:mb-4 flex items-center">
                  <Users className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                  Student Coordinators
                </h5>
                <div className="space-y-2 md:space-y-3">
                  {[
                    { name: "Pratik", number: "+91 85956 73484" },
                    { name: "Aditya", number: "+91 97294 70642" }
                  ].map((coordinator, index) => (
                    <motion.div 
                      key={coordinator.name}
                      className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white/5 border border-white/10 rounded-lg p-3 hover:bg-white/10 transition-all duration-300 gap-2 sm:gap-0"
                      whileHover={{ scale: 1.02, x: 5 }}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <span className="text-white font-medium text-sm md:text-base">{coordinator.name}</span>
                      <a 
                        href={`tel:${coordinator.number}`}
                        className="text-cyan-400 hover:text-cyan-300 transition-colors duration-300 text-sm md:text-base"
                      >
                        {coordinator.number}
                      </a>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Faculty Coordinators */}
              <motion.div 
                className="mb-6 md:mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                viewport={{ once: true }}
              >
                <h5 className="text-lg md:text-xl font-bold text-purple-400 mb-3 md:mb-4 flex items-center">
                  <Award className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                  Faculty Coordinators
                </h5>
                <div className="space-y-2 md:space-y-3">
                  {[
                    { name: "Dr. Lekshmi K"},
                    { name: "Dr. Pavithra S"}
                  ].map((coordinator, index) => (
                    <motion.div 
                      key={coordinator.name}
                      className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white/5 border border-white/10 rounded-lg p-3 hover:bg-white/10 transition-all duration-300 gap-2 sm:gap-0"
                      whileHover={{ scale: 1.02, x: 5 }}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <span className="text-white font-medium text-sm md:text-base">{coordinator.name}</span>
                      <a 
                        href={`tel:${coordinator}`}
                        className="text-purple-400 hover:text-purple-300 transition-colors duration-300 text-sm md:text-base"
                      >
                        
                      </a>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              
            </motion.div>
          </div>

          

          {/* Bottom Bar */}
          <motion.div 
            className="mt-12 md:mt-16 pt-6 md:pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="text-gray-400 text-center md:text-left mb-4 md:mb-0"
              whileHover={{ scale: 1.02 }}
            >
              <p className="text-sm md:text-base">&copy; 2025 NEXUS - VIT Chennai. All rights reserved.</p>
              <p className="text-xs md:text-sm mt-1">Office of Student Welfare</p>
            </motion.div>
            
            <motion.div 
              className="flex items-center space-x-4 md:space-x-6"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 }}
              viewport={{ once: true }}
            >
              <motion.div 
                className="flex items-center space-x-2 text-gray-400"
                whileHover={{ scale: 1.05 }}
              >
                <Lightbulb className="h-4 w-4 md:h-5 md:w-5 text-yellow-400" />
                <span className="text-xs md:text-sm">Powered by Nexus, VIT Chennai</span>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Decorative Elements */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>
      </motion.footer>
    </div>
  );
}

export default App;