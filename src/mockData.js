// Mock data generator for when API is unavailable
export function generateMockIdea(answers) {
  const skill = answers.skill || "your skill";
  const city = answers.city || "your city";
  const budget = answers.budget || "₹5-20k";
  const confidence = answers.confidence || "Intermediate";
  const hours = answers.hours || "10-20";
  const customerType = answers.customerType || "Local";

  // Generate business name based on skill
  const businessNames = {
    cooking: `${skill.charAt(0).toUpperCase() + skill.slice(1)} Delights`,
    design: `${skill.charAt(0).toUpperCase() + skill.slice(1)} Studio`,
    tutoring: `${skill.charAt(0).toUpperCase() + skill.slice(1)} Academy`,
    default: `${skill.charAt(0).toUpperCase() + skill.slice(1)} Pro`
  };

  const nameKey = skill.toLowerCase().includes('cook') ? 'cooking' :
                  skill.toLowerCase().includes('design') ? 'design' :
                  skill.toLowerCase().includes('tutor') ? 'tutoring' : 'default';

  const businessName = businessNames[nameKey] || `${skill.charAt(0).toUpperCase() + skill.slice(1)} Services`;

  // Generate tagline
  const taglines = [
    `Transforming ${skill} into success, one client at a time`,
    `Professional ${skill} services in ${city}`,
    `Your trusted ${skill} expert in ${city}`,
    `Quality ${skill} solutions for ${city}`
  ];
  const tagline = taglines[Math.floor(Math.random() * taglines.length)];

  // Generate idea description
  const idea = `A micro-business focused on providing ${skill} services to ${customerType.toLowerCase()} customers in ${city}. 
  Starting with a ${budget} budget, this venture will leverage your ${confidence.toLowerCase()} level expertise to serve 
  ${customerType === 'Online' ? 'clients nationwide' : customerType === 'Local' ? 'local community members' : 'both online and local clients'}. 
  With ${hours} hours per week commitment, you'll build a sustainable business that grows with your skills.`;

  // Target customers
  const targetCustomers = customerType === 'Online' 
    ? ['Remote clients', 'Digital nomads', 'Online communities']
    : customerType === 'Local'
    ? ['Local residents', 'Small businesses', 'Community members']
    : ['Local residents', 'Online clients', 'Small businesses'];

  // Pricing
  const pricing = {
    perUnit: budget.includes('1k') ? '₹500-₹1,000' : 
                budget.includes('5k') ? '₹1,000-₹2,500' :
                budget.includes('20k') ? '₹2,500-₹5,000' : '₹5,000+',
    weeklyPlan: budget.includes('1k') ? '₹3,000/week' :
                budget.includes('5k') ? '₹5,000/week' :
                budget.includes('20k') ? '₹10,000/week' : '₹15,000/week',
    monthlyPlan: budget.includes('1k') ? '₹10,000/month' :
                 budget.includes('5k') ? '₹18,000/month' :
                 budget.includes('20k') ? '₹35,000/month' : '₹50,000/month'
  };

  // Materials needed
  const materials = answers.tools 
    ? answers.tools.split(',').map(t => t.trim()).filter(t => t)
    : ['Basic equipment', 'Marketing materials', 'Initial inventory'];

  // Startup checklist
  const startupChecklist = [
    `Research ${skill} market in ${city}`,
    'Create business plan and pricing strategy',
    'Set up social media profiles',
    'Prepare initial service offerings',
    'Build first 5 customer relationships',
    'Create basic marketing materials',
    'Set up payment and booking system',
    'Launch with soft opening',
    'Gather initial customer feedback',
    'Scale based on demand'
  ];

  // Financial calculations
  const startupCost = budget;
  const profitPerSale = budget.includes('1k') ? '₹300-₹500' :
                        budget.includes('5k') ? '₹800-₹1,200' :
                        budget.includes('20k') ? '₹2,000-₹3,000' : '₹3,500+';
  
  const breakEvenSales = budget.includes('1k') ? 3 :
                          budget.includes('5k') ? 5 :
                          budget.includes('20k') ? 8 : 10;

  const weeklyTimeCommitment = hours;

  // Instagram bio
  const instaBio = `✨ ${businessName} | ${tagline}
📍 ${city}
💼 ${skill} Services
📧 DM for bookings
🎯 ${customerType === 'Online' ? 'Available Worldwide' : customerType === 'Local' ? 'Serving ' + city : 'Local & Online'}`;

  // WhatsApp pitch
  const whatsappPitch = `Hi! 👋

I'm starting ${businessName} - a ${skill} service in ${city}.

${tagline}

I'm offering:
• Professional ${skill} services
• ${customerType === 'Online' ? 'Remote consultations' : customerType === 'Local' ? 'In-person services' : 'Both online & local'}
• Flexible pricing starting at ${pricing.perUnit}

Would you be interested in learning more? I'd love to help you with your ${skill} needs!

Let's connect! 🚀`;

  // Competitor landscape
  const competitorLandscape = `The ${skill} market in ${city} has moderate competition with several established players. 
  Your advantage lies in personalized service, competitive pricing (${budget} startup), and ${confidence.toLowerCase()} expertise. 
  Focus on building strong customer relationships and delivering exceptional quality to stand out. 
  The market shows steady growth, especially in ${customerType.toLowerCase()} segments.`;

  // First week plan
  const firstWeekPlan = {
    'Day 1': `Set up business profiles on Instagram and WhatsApp. Create initial content showcasing your ${skill} expertise.`,
    'Day 2': `Research competitors in ${city}. Identify pricing strategies and unique selling points.`,
    'Day 3': `Prepare your first service package. Create pricing list and service descriptions.`,
    'Day 4': `Reach out to 10 potential customers via social media. Share your business idea and services.`,
    'Day 5': `Set up basic booking system (can use Google Forms or WhatsApp). Prepare for first consultations.`,
    'Day 6': `Follow up with interested prospects. Offer introductory discounts to first 3 customers.`,
    'Day 7': `Launch officially! Share your business on social media. Aim to secure first booking.`
  };

  // Marketing tips
  const localMarketingTips = customerType === 'Local' || customerType === 'Both'
    ? [
        `Join local ${city} business groups on Facebook and WhatsApp`,
        `Partner with complementary businesses in ${city}`,
        `Attend local markets and community events`,
        `Create location-specific content for ${city} audience`,
        `Offer referral discounts to local customers`,
        `Use local hashtags like #${city.replace(/\s+/g, '')}Business on Instagram`
      ]
    : [
        `Create valuable ${skill} content on social media`,
        `Engage with online communities related to ${skill}`,
        `Use targeted online advertising`,
        `Build email list for marketing campaigns`,
        `Collaborate with influencers in your niche`,
        `Optimize for search with SEO-friendly content`
      ];

  return {
    businessName,
    tagline,
    idea,
    targetCustomers,
    pricing,
    competitorLandscape,
    firstWeekPlan,
    localMarketingTips,
    materials,
    startupChecklist,
    startupCost,
    profitPerSale,
    breakEvenSales,
    weeklyTimeCommitment,
    instaBio,
    whatsappPitch
  };
}
