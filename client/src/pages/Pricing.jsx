import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

const Pricing = () => {
  const plans = [
    {
      name: 'Free',
      price: '₹0',
      period: '/month',
      features: [
        'Basic rehab exercises',
        '2 AI motion tracking sessions/month',
        'Community support',
        'Limited progress tracking'
      ],
      notIncluded: [
        'Personal therapist',
        'Advanced gamification',
        'Detailed analytics',
        'Priority support'
      ],
      cta: 'Start Free Trial',
      popular: false
    },
    {
      name: 'Pro',
      price: '₹499',
      period: '/month',
      features: [
        'Unlimited rehab exercises',
        'Unlimited AI motion tracking',
        'Advanced progress analytics',
        'Gamified therapy sessions',
        'Email support'
      ],
      notIncluded: [
        'Personal therapist',
        'Video consultations'
      ],
      cta: 'Get Started',
      popular: true
    },
    {
      name: 'Premium',
      price: '₹799',
      period: '/month',
      features: [
        'Everything in Pro',
        'Dedicated personal therapist',
        '2 Video consultations/month',
        'Customized therapy plans',
        'Priority 24/7 support'
      ],
      notIncluded: [],
      cta: 'Contact Sales',
      popular: false
    },
    {
      name: 'Offline Care',
      price: '₹999',
      period: '/session',
      features: [
        'In-person therapist visit',
        'Manual therapy & assessment',
        'Equipment provided',
        'Personalized care plan',
        'Pay per session'
      ],
      notIncluded: [
        'AI motion tracking (optional add-on)',
        '24/7 online support'
      ],
      cta: 'Book Appointment',
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl sm:tracking-tight lg:text-6xl transition-colors">
            Simple, transparent pricing
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500 dark:text-gray-400 transition-colors">
            Choose the plan that fits your recovery journey. No hidden fees.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
              className={`relative bg-white dark:bg-slate-900 rounded-2xl shadow-xl overflow-hidden flex flex-col border border-transparent dark:border-slate-800 transition-colors ${plan.popular ? 'border-2 border-blue-500 dark:border-blue-500 ring-4 ring-blue-50 dark:ring-blue-900/30' : ''}`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wide">
                  Most Popular
                </div>
              )}
              <div className="p-8 flex-1">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors">{plan.name}</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-extrabold text-gray-900 dark:text-white transition-colors">{plan.price}</span>
                  <span className="text-gray-500 dark:text-gray-400 ml-1 transition-colors">{plan.period}</span>
                </div>
                <p className="mt-6 text-gray-500 dark:text-gray-400 transition-colors">Perfect for individuals starting their recovery.</p>

                <ul className="mt-8 space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <div className="flex-shrink-0">
                        <Check className="h-5 w-5 text-green-500" />
                      </div>
                      <p className="ml-3 text-base text-gray-700 dark:text-gray-300 transition-colors">{feature}</p>
                    </li>
                  ))}
                  {plan.notIncluded.map((feature) => (
                    <li key={feature} className="flex items-start opacity-50">
                      <div className="flex-shrink-0">
                        <X className="h-5 w-5 text-red-400 dark:text-red-500" />
                      </div>
                      <p className="ml-3 text-base text-gray-500 dark:text-gray-400 transition-colors">{feature}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-8 bg-gray-50 dark:bg-slate-800/50 transition-colors">
                <button className={`w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white transition-colors shadow-lg ${plan.popular ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-800 hover:bg-gray-900 dark:bg-slate-700 dark:hover:bg-slate-600'}`}>
                  {plan.cta}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;