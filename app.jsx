// ==========================================
// Medidhisubbaiah Trust Web Application
// Theme: White & Green (Emerald / Teal / Fresh Grass Green)
// Built with React 18, Tailwind CSS, Outfit & Inter Typography, and Lucide Icons
// ==========================================

const { useState, useEffect, useContext, createContext, useMemo } = React;

// --- INITIAL DATASET ---
const initialServices = [
  {
    id: 1,
    title: "Free Tailoring Training Program",
    category: "Skill Development",
    shortDescription: "Free intensive vocational tailoring classes empowering women with self-employment and micro-business skills.",
    fullDescription: "Our Free Tailoring Training Program fosters financial independence among women and underprivileged youth in the community. Over an intensive 3-month course, students master garment cutting, drafting, stitching, embroidery basics, and modern garment assembly techniques. Upon completion, participants receive certified qualifications and guidance on setting up their own tailoring units.",
    icon: "scissors",
    image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80",
    raised: "1,200+ Women",
    goal: "2,000 Target",
    progress: 60,
    features: [
      "Zero registration or material fee",
      "Individual sewing machine practice sessions",
      "Basic to advanced blouse, dress, and garment stitching",
      "Government-recognized course completion certificates",
      "Guidance for micro-business startup"
    ],
    beneficiaries: "1,200+ Women Trained",
    duration: "3 Months (Daily 2 Hours)",
    location: "Medidhisubbaiah Trust Skill Center"
  },
  {
    id: 2,
    title: "Free Muggam/Maggam Work Program",
    category: "Skill Development",
    shortDescription: "Preserving traditional Indian heritage embroidery while creating high-earning artisan livelihoods for women.",
    fullDescription: "The Free Maggam Work Program preserves rich traditional Indian embroidery craft while generating high-earning home-based artisan opportunities. Trainees learn intricate Aari needle work, zardosi, stone fixing, bead attachment, and bridal blouse designing. This skill enables artisans to earn handsome daily wages or establish boutique partnerships.",
    icon: "sparkles",
    image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80",
    raised: "850+ Artisans",
    goal: "1,200 Target",
    progress: 70,
    features: [
      "Master artisan guided hands-on training",
      "Free embroidery frame and raw materials provided",
      "Aari needle, Zari thread, beads & stone application",
      "Bridal and festive boutique design techniques",
      "Market linkage and direct customer orders"
    ],
    beneficiaries: "850+ Artisans Trained",
    duration: "45 Days Intensive",
    location: "Trust Handicraft Center"
  },
  {
    id: 3,
    title: "Free Certificate Distribution",
    category: "Education",
    shortDescription: "Official vocational certification ceremonies validating skills and boosting employability for graduates.",
    fullDescription: "Medidhisubbaiah Trust conducts grand Certificate Distribution ceremonies honoring graduates from all vocational courses, sports workshops, and educational programs. These verifiable certificates validate the dedication of students and significantly enhance their job prospects in textile hubs, garment manufacturing units, and self-employment schemes.",
    icon: "award",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
    raised: "2,500+ Certified",
    goal: "3,500 Target",
    progress: 72,
    features: [
      "Recognized vocational certification",
      "Honoring top performing trainees",
      "Free sewing kit gift hampers for top scorers",
      "Eminent guest speakers and career guidance",
      "Official portfolio building assistance"
    ],
    beneficiaries: "2,500+ Certified Students",
    duration: "Quarterly Ceremonies",
    location: "Trust Community Auditorium"
  },
  {
    id: 4,
    title: "24/7 Blood Donation & Helpline",
    category: "Healthcare",
    shortDescription: "Life-saving voluntary blood donation camps and 24/7 emergency donor mobilization network.",
    fullDescription: "Dedicated to saving lives in critical hours, the Trust organizes periodic mega blood donation drives in collaboration with district government hospitals and Red Cross blood banks. We also maintain a verified volunteer donor registry to rapidly coordinate emergency blood requirements for thalassemia patients, accident victims, and emergency surgeries.",
    icon: "heartpulse",
    image: "https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=800&q=80",
    raised: "4,200+ Units",
    goal: "5,000 Goal",
    progress: 84,
    features: [
      "Sanitized & clinically supervised donation setup",
      "Free health screening & hemoglobin checkup for donors",
      "Immediate donor refreshment & recognition certificate",
      "24/7 emergency rare blood group registry",
      "Zero-cost donor coordination service"
    ],
    beneficiaries: "4,200+ Units Donated",
    duration: "Monthly Drives & 24/7 Emergency",
    location: "Rotary & Trust Medical Camps"
  },
  {
    id: 5,
    title: "Free Food Distribution (Annadhanam)",
    category: "Community Welfare",
    shortDescription: "Freshly prepared wholesome and nutritious meals served to hospital attendants and needy individuals.",
    fullDescription: "Believing that no one in our community should sleep on an empty stomach, Medidhisubbaiah Trust conducts regular Annadhanam (Free Meal Distribution) programs. Freshly cooked, hygienic, and balanced meals are served outside government hospitals, slums, shelter homes, and bus terminals every week.",
    icon: "utensils",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80",
    raised: "75,000+ Meals",
    goal: "100,000 Goal",
    progress: 75,
    features: [
      "Nutritious hot meals prepared with high hygiene standards",
      "Distribution at government general hospitals & rural areas",
      "Festival special feast distributions",
      "Eco-friendly bio-degradable plates and bowls",
      "Volunteer-driven loving food service"
    ],
    beneficiaries: "75,000+ Meals Served",
    duration: "Weekly & Special Occasions",
    location: "Multiple Community Centers"
  },
  {
    id: 6,
    title: "Free Monthly Grocery Distribution",
    category: "Community Welfare",
    shortDescription: "Monthly essential ration and nutrition packs delivered to elderly, widows, and vulnerable families.",
    fullDescription: "Our grocery kit support initiative extends food security to families facing economic hardship. Each comprehensive monthly kit includes staple rice, wheat flour, lentils, cooking oil, spices, salt, and hygiene essentials, ensuring vulnerable families can maintain dignity and good nutrition.",
    icon: "packagecheck",
    image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80",
    raised: "3,800+ Families",
    goal: "5,000 Goal",
    progress: 76,
    features: [
      "15-item essential dry ration family kit",
      "Direct home delivery for bedridden elderly & disabled",
      "Quarterly nutritional assessments",
      "Transparent beneficiary identification process",
      "Disaster relief grocery emergency packs"
    ],
    beneficiaries: "3,800+ Families Supported",
    duration: "Monthly 1st Week",
    location: "Door-to-door & Trust distribution points"
  },
  {
    id: 7,
    title: "Chalivendram Drinking Water Kiosks",
    category: "Public Welfare",
    shortDescription: "Traditional clay pot drinking water and spiced buttermilk stations serving pedestrians during harsh summer.",
    fullDescription: "During scorching summer months, Medidhisubbaiah Trust installs and maintains multiple 'Chalivendram' kiosks at busy traffic intersections, market areas, and transit stops. Cold, purified water stored in natural clay pots and fresh spiced buttermilk are served free to daily wage laborers, rickshaw drivers, and travelers.",
    icon: "droplets",
    image: "https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=800&q=80",
    raised: "150,000+ Served",
    goal: "200,000 Goal",
    progress: 75,
    features: [
      "Naturally cooled clay pot potable water",
      "Freshly prepared spiced buttermilk (Majjiga) daily",
      "Strategic placements at major bus stops and markets",
      "Continuous sanitization and water replenishment",
      "Shaded rest points with clean seating"
    ],
    beneficiaries: "150,000+ Thirsty Citizens Served",
    duration: "March to June Every Year",
    location: "8+ Junctions across the city"
  },
  {
    id: 8,
    title: "Sports Events & Youth Tournaments",
    category: "Sports",
    shortDescription: "Conducting championships in Kabaddi, Cricket, and Volleyball, providing free sports gear to rural youth.",
    fullDescription: "Sports foster discipline, physical fitness, teamwork, and healthy lifestyle habits. The Trust organizes inter-village and inter-school cricket tournaments, kabaddi matches, volleyball cups, and running events. We also distribute quality sports kits to talented athletes who lack financial backing.",
    icon: "trophy",
    image: "https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=800&q=80",
    raised: "5,000+ Athletes",
    goal: "8,000 Goal",
    progress: 62,
    features: [
      "Annual Medidhisubbaiah Memorial Cricket & Kabaddi Cup",
      "Free sports gear distribution (bats, balls, jerseys, kits)",
      "Coaching camps for rural school students",
      "Cash prizes and trophies for winning teams",
      "Promoting physical health and community harmony"
    ],
    beneficiaries: "5,000+ Young Athletes",
    duration: "Annual Tournaments & Weekend Camps",
    location: "District Sports Grounds"
  },
  {
    id: 9,
    title: "Educational Kits & Merit Scholarships",
    category: "Education",
    shortDescription: "Free school bags, notebooks, study materials, and merit awards to prevent student dropouts.",
    fullDescription: "Education is the cornerstone of societal progress. Medidhisubbaiah Trust provides free school bags, notebooks, stationery kits, and school uniforms to underprivileged children. We also run evening remedial study circles and career counseling workshops for high school and college students.",
    icon: "graduationcap",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
    raised: "6,400+ Students",
    goal: "10,000 Goal",
    progress: 64,
    features: [
      "Free school bags, notebooks, and geometry boxes",
      "Merit-cum-means scholarship assistance",
      "Free evening study centers for rural students",
      "Career guidance and digital literacy workshops",
      "Anti-drop-out counseling for parents"
    ],
    beneficiaries: "6,400+ Students Benefited",
    duration: "Year-Round Programs",
    location: "Government Schools & Trust Learning Centers"
  }
];

const initialEvents = [
  {
    id: 1,
    title: "Mega Blood Donation Camp & Health Checkup",
    image: "https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=800&q=80",
    date: "2026-09-15",
    time: "09:00 AM - 02:00 PM",
    location: "Medidhisubbaiah Trust Main Hall, Gandhi Nagar",
    category: "Blood Donation",
    status: "Upcoming",
    description: "Join us in our mission to save lives. Partnered with the District Blood Bank, our camp includes free full-body vitals checkup, refreshments, and a donor medal.",
    organizer: "Health Wing, Medidhisubbaiah Trust",
    seatsTotal: 150,
    seatsRegistered: 86
  },
  {
    id: 2,
    title: "Graduation & Certificate Distribution Ceremony 2026",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
    date: "2026-09-28",
    time: "10:30 AM - 01:30 PM",
    location: "City Community Auditorium",
    category: "Education",
    status: "Upcoming",
    description: "Felicitating 200+ women who successfully completed our Free Tailoring and Maggam Work courses. Free starter toolkits will be gifted to outstanding achievers.",
    organizer: "Vocational Training Department",
    seatsTotal: 300,
    seatsRegistered: 215
  },
  {
    id: 3,
    title: "Inter-District Youth Kabaddi & Volleyball Tournament",
    image: "https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=800&q=80",
    date: "2026-10-10",
    time: "08:00 AM - 06:00 PM",
    location: "Zilla Parishad High School Grounds",
    category: "Sports",
    status: "Upcoming",
    description: "Annual sports festival featuring 24 rural teams competing for the Medidhisubbaiah Trophy, cash prizes, and state-level scout opportunities.",
    organizer: "Youth & Sports Committee",
    seatsTotal: 500,
    seatsRegistered: 340
  },
  {
    id: 4,
    title: "Annual Free School Bag & Notebook Distribution",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
    date: "2026-06-12",
    time: "09:30 AM - 01:00 PM",
    location: "Govt. High School Complex, Ward 4",
    category: "Education",
    status: "Completed",
    description: "Distributed 1,200 school bags, notebooks, and geometry sets to students from 8 government schools ahead of the academic year reopening.",
    organizer: "Education Welfare Committee",
    seatsTotal: 1200,
    seatsRegistered: 1200
  },
  {
    id: 5,
    title: "Summer Chalivendram Water & Buttermilk Service Inauguration",
    image: "https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=800&q=80",
    date: "2026-03-20",
    time: "08:00 AM - 06:00 PM",
    location: "RTC Bus Stand & 7 City Junctions",
    category: "Public Welfare",
    status: "Completed",
    description: "Inaugurated 8 public drinking water and spiced buttermilk kiosks that served over 1,500 citizens daily throughout the intense heatwave.",
    organizer: "Public Service Wing",
    seatsTotal: 2000,
    seatsRegistered: 2000
  },
  {
    id: 6,
    title: "Festival Food & Essential Grocery Kit Distribution",
    image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80",
    date: "2026-04-14",
    time: "10:00 AM - 04:00 PM",
    location: "Medidhisubbaiah Trust Premises",
    category: "Food Distribution",
    status: "Completed",
    description: "Distributed monthly grocery rations and festive sweets to 650 elderly citizens and underprivileged families.",
    organizer: "Community Welfare Division",
    seatsTotal: 650,
    seatsRegistered: 650
  }
];

const initialNews = [
  {
    id: 1,
    title: "Medidhisubbaiah Trust Expands Free Tailoring Center to Empower 500 More Rural Women",
    thumbnail: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80",
    date: "2026-08-10",
    category: "Skill Development",
    shortDescription: "With new industrial sewing machines and master trainers, the Trust expands its flagship tailoring curriculum to new centers.",
    author: "Trust Editorial Desk",
    readTime: "4 min read",
    content: `Medidhisubbaiah Trust has announced the major expansion of its Free Tailoring and Garment Making Center. The initiative introduces 20 brand-new computerized sewing and overlock machines, allowing the trust to train an additional 500 women per year.\n\nThe program includes comprehensive modules in pattern drafting, blouse stitching, kidswear design, and basic boutique management. Trainees are also connected with local garment boutiques and textile merchants for direct job placement and order fulfillment.\n\n"Our goal is not merely training; it is creating self-reliant, financially empowered households," stated the Trust Chairman during the expansion ribbon cutting ceremony.`
  },
  {
    id: 2,
    title: "Emergency Blood Donor Registry Crosses 1,000 Verified Donors Milestone",
    thumbnail: "https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=800&q=80",
    date: "2026-07-22",
    category: "Healthcare",
    shortDescription: "The Trust's 24/7 blood helpline has successfully arranged critical blood units for over 350 emergency hospital cases this year.",
    author: "Health Committee",
    readTime: "3 min read",
    content: `The 24/7 Voluntary Blood Donor Network of Medidhisubbaiah Trust reached a significant milestone this month with over 1,000 verified volunteer donors registered across rare and common blood groups.\n\nIn coordination with district medical centers and emergency response teams, the network helps connect patients in urgent need with voluntary donors in less than 20 minutes on average.\n\nThe Trust expresses heartfelt gratitude to all noble donors who step forward selflessly to save precious human lives.`
  },
  {
    id: 3,
    title: "1,200 Students Receive Free Educational Bags and Stationery Kits for New Academic Year",
    thumbnail: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
    date: "2026-06-18",
    category: "Education",
    shortDescription: "Children across eight government primary and high schools received durable school bags, notebooks, and learning materials.",
    author: "Education Wing",
    readTime: "3 min read",
    content: `As schools resumed for the new academic calendar, Medidhisubbaiah Trust completed its annual Free School Kit Distribution drive. Over 1,200 students from underprivileged backgrounds were provided with high quality backpacks, notebooks, pens, geometry boxes, and examination pads.\n\nTeachers and parents appreciated the gesture, noting that these kits prevent school dropouts and encourage children to attend classes with pride and excitement.`
  },
  {
    id: 4,
    title: "Summer Chalivendram Kiosks Serve Over 1.5 Lakh Citizens Across High-Traffic Hubs",
    thumbnail: "https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=800&q=80",
    date: "2026-05-30",
    category: "Public Welfare",
    shortDescription: "The 3-month summer drinking water and buttermilk service concluded successfully, bringing immense relief to daily wage workers and commuters.",
    author: "Public Relations",
    readTime: "2 min read",
    content: `With temperatures soaring past 42°C during peak summer, Medidhisubbaiah Trust operated 8 dedicated Chalivendram centers across major transit and market hubs.\n\nVolunteers worked in shifts to serve cool, naturally filtered clay pot water and freshly churned spicy buttermilk to more than 150,000 pedestrians, auto drivers, traffic personnel, and travelers. The Trust expresses gratitude to the local community volunteers who managed the kiosks daily.`
  }
];

const initialGallery = [
  {
    id: 1,
    title: "Women Empowered at Tailoring Workshop",
    category: "Tailoring",
    imageUrl: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1200&q=80",
    date: "2026-08-05",
    caption: "Students practicing garment cutting and finishing at the Skill Development Center."
  },
  {
    id: 2,
    title: "Voluntary Blood Donation Drive",
    category: "Blood Donation",
    imageUrl: "https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=1200&q=80",
    date: "2026-07-15",
    caption: "Generous donors contributing life-saving blood units at our hospital partnership camp."
  },
  {
    id: 3,
    title: "Nutritious Food Annadhanam Service",
    category: "Food Distribution",
    imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80",
    date: "2026-07-28",
    caption: "Volunteers serving fresh, nutritious meals with love to hospital attendants and needy individuals."
  },
  {
    id: 4,
    title: "Grocery Kit Distribution to Families",
    category: "Grocery Distribution",
    imageUrl: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1200&q=80",
    date: "2026-06-20",
    caption: "Monthly dry ration packs containing essentials provided to economically weak families."
  },
  {
    id: 5,
    title: "Traditional Maggam Craft Training",
    category: "Tailoring",
    imageUrl: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=80",
    date: "2026-06-05",
    caption: "Hands-on Maggam and Zardosi embroidery training empowering local artisans."
  },
  {
    id: 6,
    title: "School Bags & Books Distribution",
    category: "Educational Programs",
    imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80",
    date: "2026-06-12",
    caption: "Happy school children receiving new backpacks and stationery sets for the school term."
  },
  {
    id: 7,
    title: "District Youth Sports Championship",
    category: "Sports",
    imageUrl: "https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=1200&q=80",
    date: "2026-05-18",
    caption: "Youth teams competing with fervor at the annual community sports meet."
  },
  {
    id: 8,
    title: "Summer Chalivendram Water Service",
    category: "Chalivendram",
    imageUrl: "https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=1200&q=80",
    date: "2026-04-25",
    caption: "Providing cold clay-pot drinking water and buttermilk to beat the scorching heat."
  },
  {
    id: 9,
    title: "Graduation & Certificate Distribution",
    category: "Events",
    imageUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80",
    date: "2026-04-10",
    caption: "Students receiving course completion certificates upon successful vocational training."
  }
];

const initialStats = [
  { label: "Women & Youth Trained", value: "2,050+", icon: "users", change: "100% Free Vocational" },
  { label: "Blood Units Donated", value: "4,200+", icon: "heartpulse", change: "24/7 Helpline" },
  { label: "Meals & Groceries Distributed", value: "80,000+", icon: "utensils", change: "Zero Hunger Goal" },
  { label: "Students Supported", value: "6,400+", icon: "graduationcap", change: "Education for All" }
];

const initialTestimonials = [
  {
    id: 1,
    name: "Lakshmi Devi",
    role: "Tailoring Course Graduate & Boutique Owner",
    quote: "Joining Medidhisubbaiah Trust's free tailoring course transformed my life. Today I earn ₹15,000 every month stitching bridal garments and support my family with pride.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 2,
    name: "Dr. K. Srinivas Rao",
    role: "Government Hospital Medical Officer",
    quote: "The 24/7 Voluntary Blood Donor Network by Medidhisubbaiah Trust has been a lifesaver for our emergency ICU trauma cases. Their coordination is instantaneous.",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 3,
    name: "Ramesh Babu",
    role: "Auto Rickshaw Driver & Parent",
    quote: "During hot summers, the Chalivendram drinking water kiosk keeps hundreds of daily wage workers going. The Trust also gifted my two children high quality school bags and books.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
  }
];

const heroSlides = [
  {
    title: "Empowering Lives Through Free Vocational Skills",
    subtitle: "Free Tailoring & Maggam Embroidery Training For Women & Youth",
    description: "Creating financially independent households with certified training, free toolkits, and direct market linkages.",
    image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1600&q=80",
    badge: "Women Empowerment",
    ctaPrimary: "Join Free Training",
    ctaPrimaryRoute: "services",
    ctaSecondary: "View Success Stories",
    ctaSecondaryRoute: "news"
  },
  {
    title: "24/7 Life-Saving Blood Donor Helpline",
    subtitle: "Connecting Emergency Patients with Voluntary Donors Within Minutes",
    description: "Periodic blood donation camps and an active emergency helpline saving thousands of precious lives every year.",
    image: "https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=1600&q=80",
    badge: "Emergency Healthcare",
    ctaPrimary: "Emergency Helpline",
    ctaPrimaryRoute: "contact",
    ctaSecondary: "Upcoming Camps",
    ctaSecondaryRoute: "events"
  },
  {
    title: "Nourishing Communities: Annadhanam & Groceries",
    subtitle: "Ensuring No One In Our Neighborhood Sleeps On An Empty Stomach",
    description: "Weekly wholesome food distributions outside general hospitals and monthly dry ration kits for vulnerable elderly.",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1600&q=80",
    badge: "Food & Social Relief",
    ctaPrimary: "Support Annadhanam",
    ctaPrimaryRoute: "services",
    ctaSecondary: "Volunteer With Us",
    ctaSecondaryRoute: "contact"
  }
];

const trustInfo = {
  name: "Medidhisubbaiah Trust",
  shortName: "Medidhisubbaiah Trust",
  tagline: "Local Vision, Selfless Service, Global Impact",
  registration: "Regd. Social Welfare & Charitable Organization",
  founded: "Serving the Community with Pride & Transparency",
  address: "Medidhisubbaiah Trust Bhavan, Main Road, Beside Gandhi Statue, Andhra Pradesh / Telangana, India",
  phone: "+91 98480 12345 / +91 94401 67890",
  emergencyBloodHelpline: "+91 98480 99999",
  email: "contact@medidhisubbaiahtrust.org",
  operatingHours: "Monday - Saturday: 08:30 AM - 06:30 PM",
  upiId: "medidhisubbaiah@sbi",
  accountDetails: {
    bank: "State Bank of India",
    accountNumber: "3892019284729",
    ifsc: "SBIN0004521",
    branch: "Main Community Branch"
  },
  socials: {
    facebook: "https://facebook.com",
    twitter: "https://twitter.com",
    instagram: "https://instagram.com",
    youtube: "https://youtube.com",
    whatsapp: "https://wa.me/919848012345"
  }
};

// --- UNIVERSAL ICON HELPER ---
function Icon({ name, className = "w-5 h-5", size = 20, color = "currentColor" }) {
  const iconMap = {
    scissors: (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/><line x1="8.12" y1="8.12" x2="12" y2="12"/>
      </svg>
    ),
    sparkles: (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
      </svg>
    ),
    award: (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>
      </svg>
    ),
    heartpulse: (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27"/>
      </svg>
    ),
    heart: (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
      </svg>
    ),
    utensils: (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2v6a3 3 0 0 1-3 3 3 3 0 0 1-3-3V2"/><path d="M15 11v11"/><path d="M5 2v10a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V2"/><path d="M7 14v8"/>
      </svg>
    ),
    packagecheck: (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m16 16 2 2 4-4"/><path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>
      </svg>
    ),
    droplets: (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"/><path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"/>
      </svg>
    ),
    trophy: (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.45 1-1 1H8c-.55 0-1 .45-1 1v1c0 .55.45 1 1 1h8c.55 0 1-.45 1-1v-1c0-.55-.45-1-1-1h-1c-.55 0-1-.45-1-1v-2.34"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
      </svg>
    ),
    graduationcap: (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21.42 10.922a1 1 0 0 0-.019-.838L12.83 3.18a2 2 0 0 0-1.66 0L2.6 10.084a1 1 0 0 0 0 1.832l8.57 6.908a2 2 0 0 0 1.66 0l8.57-6.908a1 1 0 0 0 .02-.994z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
      </svg>
    ),
    users: (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    phone: (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    ),
    mail: (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
      </svg>
    ),
    mappin: (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    clock: (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    calendar: (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/>
      </svg>
    ),
    arrowright: (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
      </svg>
    ),
    check: (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
    ),
    x: (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
      </svg>
    ),
    search: (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
      </svg>
    ),
    eye: (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>
      </svg>
    ),
    eyeoff: (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/>
      </svg>
    ),
    chevronleft: (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m15 18-6-6 6-6"/>
      </svg>
    ),
    chevronright: (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m9 18 6-6-6-6"/>
      </svg>
    ),
    menu: (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/>
      </svg>
    ),
    lock: (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      </svg>
    ),
    share: (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/>
      </svg>
    )
  };

  const key = name ? name.toLowerCase().replace(/[-_ ]/g, '') : 'heart';
  return iconMap[key] || iconMap.heart;
}

// --- CONTEXT & STATE STORE ---
const TrustContext = createContext(null);

const TrustProvider = ({ children }) => {
  const [currentRoute, setCurrentRoute] = useState(() => {
    return window.location.hash.replace('#', '') || 'home';
  });

  const [services, setServices] = useState(() => {
    const saved = localStorage.getItem('mst_services');
    return saved ? JSON.parse(saved) : initialServices;
  });

  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem('mst_events');
    return saved ? JSON.parse(saved) : initialEvents;
  });

  const [news, setNews] = useState(() => {
    const saved = localStorage.getItem('mst_news');
    return saved ? JSON.parse(saved) : initialNews;
  });

  const [gallery, setGallery] = useState(() => {
    const saved = localStorage.getItem('mst_gallery');
    return saved ? JSON.parse(saved) : initialGallery;
  });

  const [inquiries, setInquiries] = useState(() => {
    const saved = localStorage.getItem('mst_inquiries');
    return saved ? JSON.parse(saved) : [];
  });

  // Modal States
  const [selectedService, setSelectedService] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedNews, setSelectedNews] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [isDonateModalOpen, setIsDonateModalOpen] = useState(false);

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return localStorage.getItem('mst_admin_session') === 'true';
  });

  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => setToast(null), 4000);
  };

  useEffect(() => {
    localStorage.setItem('mst_services', JSON.stringify(services));
  }, [services]);
  useEffect(() => {
    localStorage.setItem('mst_events', JSON.stringify(events));
  }, [events]);
  useEffect(() => {
    localStorage.setItem('mst_news', JSON.stringify(news));
  }, [news]);
  useEffect(() => {
    localStorage.setItem('mst_gallery', JSON.stringify(gallery));
  }, [gallery]);
  useEffect(() => {
    localStorage.setItem('mst_inquiries', JSON.stringify(inquiries));
  }, [inquiries]);

  const navigate = (route) => {
    window.location.hash = route;
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      if (window.AOS) window.AOS.refresh();
    }, 100);
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') || 'home';
      setCurrentRoute(hash);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const loginAdmin = (username, password, remember = false) => {
    if ((username === 'admin@medidhisubbaiah.org' || username === 'admin') && (password === 'trust2026' || password === 'admin123')) {
      setIsAdminLoggedIn(true);
      if (remember) localStorage.setItem('mst_admin_session', 'true');
      showToast('Welcome back, Trust Administrator!', 'success');
      navigate('admin');
      return { success: true };
    } else {
      return { success: false, message: 'Invalid credentials. Use admin / trust2026 for demo.' };
    }
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem('mst_admin_session');
    showToast('Logged out securely.', 'info');
    navigate('home');
  };

  const addService = (newService) => {
    const s = { ...newService, id: Date.now() };
    setServices(prev => [s, ...prev]);
    showToast('New service program added!');
  };

  const updateService = (id, updatedService) => {
    setServices(prev => prev.map(s => s.id === id ? { ...s, ...updatedService } : s));
    showToast('Service updated successfully!');
  };

  const deleteService = (id) => {
    setServices(prev => prev.filter(s => s.id !== id));
    showToast('Service removed.', 'info');
  };

  const addEvent = (newEvent) => {
    const e = { ...newEvent, id: Date.now(), seatsRegistered: 0 };
    setEvents(prev => [e, ...prev]);
    showToast('New event scheduled!');
  };

  const updateEvent = (id, updatedEvent) => {
    setEvents(prev => prev.map(e => e.id === id ? { ...e, ...updatedEvent } : e));
    showToast('Event updated!');
  };

  const deleteEvent = (id) => {
    setEvents(prev => prev.filter(e => e.id !== id));
    showToast('Event removed.', 'info');
  };

  const registerForEvent = (eventId, participantData) => {
    setEvents(prev => prev.map(e => e.id === eventId ? { ...e, seatsRegistered: (e.seatsRegistered || 0) + 1 } : e));
    showToast(`Registration confirmed for ${participantData.name}!`);
  };

  const addNews = (newArticle) => {
    const a = { ...newArticle, id: Date.now(), readTime: '3 min read' };
    setNews(prev => [a, ...prev]);
    showToast('News article published!');
  };

  const updateNews = (id, updatedArticle) => {
    setNews(prev => prev.map(n => n.id === id ? { ...n, ...updatedArticle } : n));
    showToast('News article updated!');
  };

  const deleteNews = (id) => {
    setNews(prev => prev.filter(n => n.id !== id));
    showToast('News article deleted.', 'info');
  };

  const addGalleryImage = (newImage) => {
    const img = { ...newImage, id: Date.now() };
    setGallery(prev => [img, ...prev]);
    showToast('Photo added to gallery!');
  };

  const deleteGalleryImage = (id) => {
    setGallery(prev => prev.filter(g => g.id !== id));
    showToast('Gallery image removed.', 'info');
  };

  const submitContactForm = (formData) => {
    const inq = { ...formData, id: Date.now(), submittedAt: new Date().toLocaleString() };
    setInquiries(prev => [inq, ...prev]);
    showToast('Thank you! Your message has been received.', 'success');
  };

  const resetToFactoryDefaults = () => {
    setServices(initialServices);
    setEvents(initialEvents);
    setNews(initialNews);
    setGallery(initialGallery);
    localStorage.removeItem('mst_services');
    localStorage.removeItem('mst_events');
    localStorage.removeItem('mst_news');
    localStorage.removeItem('mst_gallery');
    showToast('Data reset to default trust datasets.', 'info');
  };

  return (
    <TrustContext.Provider value={{
      currentRoute,
      navigate,
      services,
      events,
      news,
      gallery,
      inquiries,
      stats: initialStats,
      testimonials: initialTestimonials,
      trustInfo,
      selectedService,
      setSelectedService,
      selectedEvent,
      setSelectedEvent,
      selectedNews,
      setSelectedNews,
      lightboxIndex,
      setLightboxIndex,
      isDonateModalOpen,
      setIsDonateModalOpen,
      isAdminLoggedIn,
      loginAdmin,
      logoutAdmin,
      toast,
      showToast,
      addService,
      updateService,
      deleteService,
      addEvent,
      updateEvent,
      deleteEvent,
      registerForEvent,
      addNews,
      updateNews,
      deleteNews,
      addGalleryImage,
      deleteGalleryImage,
      submitContactForm,
      resetToFactoryDefaults
    }}>
      {children}
    </TrustContext.Provider>
  );
};

const useTrust = () => useContext(TrustContext);

// --- MARQUEE TICKER BANNER ---
const MarqueeTicker = () => {
  const { trustInfo } = useTrust();
  const tickerText = "🌿 100% Free Tailoring & Maggam Work Admissions Open • 24/7 Emergency Blood Helpline: " + trustInfo.emergencyBloodHelpline + " • Weekly Annadhanam Nutritious Meals & Monthly Grocery Kits • Free Drinking Water Chalivendram Kiosks • Registered Non-Profit Charitable Trust Dedicated to Social Welfare";

  return (
    <div className="bg-emerald-700 text-white text-[11px] sm:text-xs py-1.5 overflow-hidden whitespace-nowrap border-b border-emerald-800 select-none flex items-center">
      <div className="bg-emerald-950 font-black px-3 py-0.5 text-[10px] tracking-wider uppercase z-10 shrink-0 shadow text-emerald-300">
        Updates
      </div>
      <div className="animate-marquee font-medium flex items-center space-x-12">
        <span>{tickerText}</span>
        <span>•</span>
        <span>{tickerText}</span>
      </div>
    </div>
  );
};

// --- TOP BAR ---
const TopBar = () => {
  const { trustInfo, isAdminLoggedIn, logoutAdmin, navigate } = useTrust();

  return (
    <div className="bg-slate-950 text-slate-200 text-xs py-2 px-4 border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
        <div className="flex items-center space-x-4">
          <span className="flex items-center text-emerald-400 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping mr-2"></span>
            24/7 Emergency Blood Helpline:
            <a href={`tel:${trustInfo.emergencyBloodHelpline}`} className="ml-1.5 text-white hover:text-emerald-300 font-extrabold underline">
              {trustInfo.emergencyBloodHelpline}
            </a>
          </span>
          <span className="hidden lg:inline text-slate-700">|</span>
          <span className="hidden lg:flex items-center text-slate-300">
            <Icon name="mail" size={13} className="mr-1.5 text-emerald-400" />
            {trustInfo.email}
          </span>
        </div>

        <div className="flex items-center space-x-4 text-slate-300">
          <span className="hidden sm:inline-block bg-slate-900 text-emerald-300 border border-emerald-800/60 px-2.5 py-0.5 rounded text-[11px] font-semibold">
            {trustInfo.registration}
          </span>
          {isAdminLoggedIn ? (
            <div className="flex items-center space-x-2">
              <button onClick={() => navigate('admin')} className="text-xs bg-emerald-600 hover:bg-emerald-700 text-white px-2.5 py-0.5 rounded font-bold">
                Admin Hub
              </button>
              <button onClick={logoutAdmin} className="text-xs text-slate-400 hover:text-white">
                Logout
              </button>
            </div>
          ) : (
            <button onClick={() => navigate('login')} className="flex items-center space-x-1 text-slate-300 hover:text-white text-xs hover:underline">
              <Icon name="lock" size={12} className="text-emerald-400" />
              <span>Admin Login</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// --- NAVBAR ---
const Navbar = () => {
  const { currentRoute, navigate, setIsDonateModalOpen } = useTrust();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', route: 'home' },
    { name: 'About Us', route: 'about' },
    { name: 'Our Services', route: 'services' },
    { name: 'Events', route: 'events' },
    { name: 'Media & News', route: 'news' },
    { name: 'Gallery', route: 'gallery' },
    { name: 'Contact Us', route: 'contact' }
  ];

  const handleNavClick = (route) => {
    navigate(route);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      <MarqueeTicker />
      <TopBar />

      <nav className={`w-full bg-white transition-all duration-300 ${isScrolled ? 'shadow-lg py-2 border-b border-emerald-100 bg-white/95 backdrop-blur-md' : 'shadow-sm py-3.5 border-b border-slate-100'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div onClick={() => handleNavClick('home')} className="flex items-center space-x-3 cursor-pointer group select-none">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-600 via-teal-700 to-emerald-900 flex items-center justify-center text-white shadow-lg shadow-emerald-600/30 group-hover:scale-105 transition-transform duration-300">
                <span className="font-black text-xl font-heading tracking-wider">MT</span>
              </div>
              <div className="flex flex-col">
                <span className="font-black text-lg sm:text-xl text-slate-900 font-heading tracking-tight leading-none group-hover:text-emerald-600 transition-colors">
                  Medidhisubbaiah <span className="text-emerald-600">Trust</span>
                </span>
                <span className="text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-widest mt-1">
                  Local Vision • Global Impact
                </span>
              </div>
            </div>

            {/* Desktop Links */}
            <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              {navItems.map((item) => {
                const isActive = currentRoute === item.route;
                return (
                  <button
                    key={item.route}
                    onClick={() => handleNavClick(item.route)}
                    className={`px-3.5 py-2 rounded-xl text-sm font-bold font-heading transition-all duration-200 relative ${
                      isActive ? 'text-emerald-700 bg-emerald-50 shadow-sm' : 'text-slate-700 hover:text-emerald-600 hover:bg-slate-50'
                    }`}
                  >
                    {item.name}
                    {isActive && <span className="absolute bottom-0 left-3.5 right-3.5 h-0.5 bg-emerald-600 rounded-full" />}
                  </button>
                );
              })}
            </div>

            {/* Donate Button with Green Gradient and Shine Animation */}
            <div className="hidden lg:flex items-center space-x-3">
              <button
                onClick={() => setIsDonateModalOpen(true)}
                className="donate-shine donate-dance bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white px-5 py-2.5 rounded-xl text-sm font-black font-heading shadow-lg shadow-emerald-600/30 hover:shadow-xl hover:shadow-emerald-600/40 hover:-translate-y-0.5 transition-all flex items-center space-x-2"
              >
                <Icon name="heart" size={16} className="text-white" />
                <span>Support & Donate</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center space-x-2">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2.5 rounded-xl text-slate-700 hover:text-emerald-600 hover:bg-slate-100"
              >
                <Icon name={isMobileMenuOpen ? 'x' : 'menu'} size={24} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-slate-200 px-4 pt-3 pb-6 space-y-2 shadow-2xl animate-fadeIn">
            {navItems.map((item) => {
              const isActive = currentRoute === item.route;
              return (
                <button
                  key={item.route}
                  onClick={() => handleNavClick(item.route)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-base font-bold font-heading flex items-center justify-between ${
                    isActive ? 'text-emerald-700 bg-emerald-50 border-l-4 border-emerald-600' : 'text-slate-700 hover:text-emerald-600 hover:bg-slate-50'
                  }`}
                >
                  <span>{item.name}</span>
                  {isActive && <Icon name="arrowright" size={16} className="text-emerald-600" />}
                </button>
              );
            })}
            <div className="pt-4 border-t border-slate-100 flex flex-col space-y-2">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsDonateModalOpen(true);
                }}
                className="w-full bg-emerald-600 text-white py-3 rounded-xl font-black font-heading text-center shadow-lg"
              >
                Support / Donate Online
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

// --- HERO SLIDER WITH KEN BURNS EFFECT ---
const HeroSlider = () => {
  const { navigate, setIsDonateModalOpen } = useTrust();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % heroSlides.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  const slide = heroSlides[currentSlide];

  return (
    <section className="relative overflow-hidden bg-slate-950 text-white min-h-[580px] sm:min-h-[640px] flex items-center">
      {/* Background Images with Ken Burns Zoom */}
      {heroSlides.map((s, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === currentSlide ? 'opacity-100' : 'opacity-0'} overflow-hidden`}
        >
          <img src={s.image} alt={s.title} className="w-full h-full object-cover animate-ken-burns" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
        </div>
      ))}

      {/* Slide Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16 sm:py-24">
        <div className="max-w-3xl space-y-6 animate-fadeIn" key={currentSlide}>
          <div className="inline-flex items-center space-x-2 bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold font-heading uppercase tracking-wider shadow">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping mr-1" />
            <span>{slide.badge}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-heading tracking-tight leading-[1.15] text-white">
            {slide.title}
          </h1>

          <p className="text-base sm:text-xl font-medium text-emerald-200 max-w-2xl font-heading">
            {slide.subtitle}
          </p>

          <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed">
            {slide.description}
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
            <button
              onClick={() => navigate(slide.ctaPrimaryRoute)}
              className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white px-8 py-4 rounded-xl font-black font-heading text-base shadow-xl shadow-emerald-600/40 hover:-translate-y-0.5 transition-all flex items-center justify-center space-x-2"
            >
              <span>{slide.ctaPrimary}</span>
              <Icon name="arrowright" size={18} />
            </button>

            <button
              onClick={() => setIsDonateModalOpen(true)}
              className="donate-shine w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-md px-8 py-4 rounded-xl font-bold font-heading text-base transition-all flex items-center justify-center space-x-2"
            >
              <Icon name="heart" size={18} className="text-emerald-400" />
              <span>Donate & Support</span>
            </button>
          </div>
        </div>
      </div>

      {/* Slider Controls */}
      <div className="absolute bottom-6 right-6 z-20 flex items-center space-x-3 bg-slate-900/80 backdrop-blur-md px-4 py-2 rounded-full border border-slate-800">
        <button
          onClick={() => setCurrentSlide(prev => (prev > 0 ? prev - 1 : heroSlides.length - 1))}
          className="text-slate-400 hover:text-white p-1"
          aria-label="Previous slide"
        >
          <Icon name="chevronleft" size={18} />
        </button>

        <div className="flex space-x-2">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all ${idx === currentSlide ? 'w-6 bg-emerald-500' : 'w-2 bg-slate-600 hover:bg-slate-400'}`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>

        <button
          onClick={() => setCurrentSlide(prev => (prev + 1) % heroSlides.length)}
          className="text-slate-400 hover:text-white p-1"
          aria-label="Next slide"
        >
          <Icon name="chevronright" size={18} />
        </button>
      </div>
    </section>
  );
};

// --- HERO 4 OVERLAPPING FEATURE CARDS ---
const HeroFeatureCards = () => {
  const { navigate } = useTrust();

  const features = [
    {
      title: "Free Tailoring & Maggam",
      desc: "Skill training centers equipping women with certified skills and self-employment toolkits.",
      icon: "scissors",
      route: "services"
    },
    {
      title: "24/7 Blood Network",
      desc: "Emergency donor hotline and voluntary camps ensuring zero delay for critical hospital surgeries.",
      icon: "heartpulse",
      route: "contact"
    },
    {
      title: "Annadhanam & Groceries",
      desc: "Fresh nutritious meals served weekly outside hospitals and monthly dry ration kits to families.",
      icon: "utensils",
      route: "services"
    },
    {
      title: "Education & Sports Meet",
      desc: "Free school kit distribution, tuition support, and annual rural athletics championships.",
      icon: "graduationcap",
      route: "events"
    }
  ];

  return (
    <section className="relative z-20 -mt-12 sm:-mt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {features.map((f, idx) => (
          <div
            key={idx}
            data-aos="fade-up"
            data-aos-delay={idx * 100}
            onClick={() => navigate(f.route)}
            className="bg-white p-6 rounded-3xl shadow-xl border border-emerald-100 hover:border-emerald-300 hover:shadow-2xl transition-all duration-300 cursor-pointer group flex flex-col justify-between hover:-translate-y-1.5"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300 shadow-sm">
                <Icon name={f.icon} size={24} />
              </div>
              <h3 className="font-extrabold font-heading text-base sm:text-lg text-slate-900 group-hover:text-emerald-600 transition-colors">
                {f.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {f.desc}
              </p>
            </div>
            <div className="pt-4 mt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-600 group-hover:translate-x-1 transition-transform">
              <span>Learn Details</span>
              <Icon name="arrowright" size={14} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// --- IMPACT STATS COUNTER ---
const StatsCounter = () => {
  const { stats } = useTrust();
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6">
      <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-2xl grid grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, idx) => (
          <div key={idx} className="text-center space-y-2 group" data-aos="fade-up" data-aos-delay={idx * 100}>
            <div className="w-14 h-14 rounded-2xl bg-slate-800 text-emerald-400 flex items-center justify-center mx-auto mb-2 group-hover:bg-emerald-600 group-hover:text-white transition-all shadow">
              <Icon name={stat.icon} size={28} />
            </div>
            <div className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-white tracking-tight">{stat.value}</div>
            <div className="text-xs sm:text-sm font-bold text-slate-300 font-heading">{stat.label}</div>
            <div className="text-[11px] font-semibold text-emerald-400">{stat.change}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

// --- CAUSE / SERVICE CARD ---
const ServiceCard = ({ service }) => {
  const { setSelectedService, setIsDonateModalOpen } = useTrust();
  return (
    <div className="group bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col hover:-translate-y-1.5">
      <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-slate-100">
        <img src={service.image} alt={service.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
        <div className="absolute top-3.5 left-3.5">
          <span className="bg-white/95 text-slate-800 text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full shadow">
            {service.category}
          </span>
        </div>
        <div className="absolute bottom-3 right-3.5 w-11 h-11 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-lg group-hover:bg-emerald-700 transition">
          <Icon name={service.icon || 'award'} size={22} />
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2.5">
          <h3 className="font-black font-heading text-lg text-slate-900 group-hover:text-emerald-600 transition-colors line-clamp-1">
            {service.title}
          </h3>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-3">
            {service.shortDescription}
          </p>
        </div>

        {/* Progress / Beneficiary Meter */}
        <div className="space-y-1.5 pt-2">
          <div className="flex justify-between text-xs font-bold font-heading">
            <span className="text-emerald-600">{service.raised || service.beneficiaries}</span>
            <span className="text-slate-500">{service.goal || 'Ongoing'}</span>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-emerald-600 to-teal-500 rounded-full transition-all" style={{ width: `${service.progress || 75}%` }} />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
          <button
            onClick={() => setSelectedService(service)}
            className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-800 py-2.5 px-3 rounded-xl text-xs font-bold font-heading transition text-center"
          >
            Learn Details
          </button>
          <button
            onClick={() => setIsDonateModalOpen(true)}
            className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 px-3 rounded-xl text-xs font-bold font-heading shadow-md transition text-center"
          >
            Support Cause
          </button>
        </div>
      </div>
    </div>
  );
};

// --- EVENT CARD ---
const EventCard = ({ event }) => {
  const { setSelectedEvent } = useTrust();
  const isCompleted = event.status === 'Completed';
  const dateObj = new Date(event.date);
  const day = !isNaN(dateObj.getDate()) ? dateObj.getDate() : '15';
  const month = !isNaN(dateObj.getMonth()) ? dateObj.toLocaleString('default', { month: 'short' }).toUpperCase() : 'SEP';

  return (
    <div className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col hover:-translate-y-1 group">
      <div className="relative h-48 w-full overflow-hidden bg-slate-900">
        <img src={event.image} alt={event.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
        <div className="absolute top-3.5 left-3.5 bg-white rounded-2xl shadow-lg p-2 text-center min-w-[54px] border border-emerald-100">
          <span className="block text-emerald-600 font-black text-lg leading-none font-heading">{day}</span>
          <span className="block text-[10px] font-bold text-slate-700 tracking-wider mt-0.5">{month}</span>
        </div>
        <div className="absolute top-3.5 right-3.5">
          <span className={`text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow ${isCompleted ? 'bg-slate-800 text-slate-200' : 'bg-emerald-600 text-white'}`}>
            {event.status}
          </span>
        </div>
        <div className="absolute bottom-3 left-3.5">
          <span className="bg-emerald-700/90 text-white text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md">
            {event.category}
          </span>
        </div>
      </div>
      <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-2">
          <h3 className="font-bold font-heading text-lg text-slate-900 group-hover:text-emerald-600 transition-colors line-clamp-2">{event.title}</h3>
          <div className="space-y-1 text-xs text-slate-500">
            <div className="flex items-center space-x-2">
              <Icon name="clock" size={14} className="text-emerald-600 shrink-0" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="mappin" size={14} className="text-emerald-600 shrink-0" />
              <span className="truncate">{event.location}</span>
            </div>
          </div>
          <p className="text-slate-600 text-xs sm:text-sm line-clamp-2 leading-relaxed">{event.description}</p>
        </div>
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-semibold">{isCompleted ? 'Finished Event' : `${event.seatsRegistered || 50}+ Registered`}</span>
          <button onClick={() => setSelectedEvent(event)} className="bg-slate-900 hover:bg-emerald-600 text-white text-xs font-bold font-heading px-4 py-2 rounded-xl transition flex items-center space-x-1.5">
            <span>{isCompleted ? 'View Details' : 'RSVP & Join'}</span>
            <Icon name="arrowright" size={13} />
          </button>
        </div>
      </div>
    </div>
  );
};

// --- NEWS CARD ---
const NewsCard = ({ newsItem }) => {
  const { setSelectedNews } = useTrust();
  return (
    <div className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col group hover:-translate-y-1">
      <div className="relative h-48 w-full overflow-hidden bg-slate-900">
        <img src={newsItem.thumbnail} alt={newsItem.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute top-3.5 left-3.5">
          <span className="bg-emerald-600 text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow">
            {newsItem.category}
          </span>
        </div>
      </div>
      <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-2">
          <div className="flex items-center space-x-3 text-xs text-slate-400">
            <span className="flex items-center space-x-1">
              <Icon name="calendar" size={13} className="text-emerald-500" />
              <span>{newsItem.date}</span>
            </span>
            <span>•</span>
            <span>{newsItem.readTime || '3 min read'}</span>
          </div>
          <h3 className="font-bold font-heading text-base sm:text-lg text-slate-900 group-hover:text-emerald-600 transition-colors line-clamp-2">{newsItem.title}</h3>
          <p className="text-slate-600 text-xs sm:text-sm line-clamp-3 leading-relaxed">{newsItem.shortDescription}</p>
        </div>
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-medium">{newsItem.author ? `By ${newsItem.author}` : 'Official Trust Desk'}</span>
          <button onClick={() => setSelectedNews(newsItem)} className="text-emerald-600 hover:text-emerald-700 font-bold font-heading text-xs flex items-center space-x-1">
            <span>Read Story</span>
            <Icon name="arrowright" size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

// --- INTERACTIVE DONATION MODAL ---
const DonateModal = () => {
  const { isDonateModalOpen, setIsDonateModalOpen, trustInfo, showToast } = useTrust();
  const [amount, setAmount] = useState('1000');
  const [customAmount, setCustomAmount] = useState('');
  const [donorName, setDonorName] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [donorPan, setDonorPan] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  if (!isDonateModalOpen) return null;

  const handleCopyUpi = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(trustInfo.upiId);
      setIsCopied(true);
      showToast('UPI ID copied to clipboard!');
      setTimeout(() => setIsCopied(false), 3000);
    }
  };

  const handleConfirm = (e) => {
    e.preventDefault();
    showToast(`Thank you ${donorName || 'Generous Donor'}! Your contribution directly supports free community welfare.`);
    setIsDonateModalOpen(false);
  };

  const currentAmount = customAmount || amount;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden border border-slate-200 relative my-8 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-700 to-teal-800 text-white p-6 relative">
          <button onClick={() => setIsDonateModalOpen(false)} className="absolute top-4 right-4 bg-black/30 hover:bg-black/60 text-white p-2 rounded-full transition">
            <Icon name="x" size={20} />
          </button>
          <span className="bg-white/20 text-white text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full inline-block mb-2 font-heading">
            80G Tax Exemption Available
          </span>
          <h2 className="text-2xl font-black font-heading">Support Medidhisubbaiah Trust</h2>
          <p className="text-emerald-100 text-xs mt-1">100% of contributions fund free tailoring classes, emergency blood drives & food relief.</p>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1 text-slate-800 text-sm">
          <div>
            <label className="block text-xs font-bold font-heading text-slate-700 mb-2">Select Donation Amount (₹)</label>
            <div className="grid grid-cols-4 gap-2">
              {['500', '1000', '2500', '5000'].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => {
                    setAmount(amt);
                    setCustomAmount('');
                  }}
                  className={`py-2.5 rounded-xl font-black font-heading text-sm transition ${
                    amount === amt && !customAmount
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  ₹{amt}
                </button>
              ))}
            </div>
            <div className="mt-2">
              <input
                type="number"
                placeholder="Or enter custom amount in ₹"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="bg-emerald-50/60 p-4 rounded-2xl border border-emerald-200 space-y-3">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-xs text-slate-500 block">Direct UPI ID</span>
                <strong className="text-slate-900 font-mono text-sm">{trustInfo.upiId}</strong>
              </div>
              <button
                type="button"
                onClick={handleCopyUpi}
                className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 font-bold px-3 py-1.5 rounded-lg text-xs transition"
              >
                {isCopied ? 'Copied!' : 'Copy UPI'}
              </button>
            </div>

            <div className="pt-2 border-t border-emerald-200 grid grid-cols-2 gap-2 text-xs text-slate-600">
              <div><strong>Bank:</strong> {trustInfo.accountDetails.bank}</div>
              <div><strong>IFSC:</strong> {trustInfo.accountDetails.ifsc}</div>
              <div className="col-span-2"><strong>A/C No:</strong> {trustInfo.accountDetails.accountNumber}</div>
            </div>
          </div>

          <form onSubmit={handleConfirm} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                required
                placeholder="Your Full Name *"
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
                className="w-full p-2.5 border rounded-xl text-xs"
              />
              <input
                type="tel"
                required
                placeholder="Phone (for Receipt SMS) *"
                value={donorPhone}
                onChange={(e) => setDonorPhone(e.target.value)}
                className="w-full p-2.5 border rounded-xl text-xs"
              />
            </div>
            <input
              type="text"
              placeholder="PAN Card (Optional for 80G Tax Exemption)"
              value={donorPan}
              onChange={(e) => setDonorPan(e.target.value)}
              className="w-full p-2.5 border rounded-xl text-xs"
            />

            <button
              type="submit"
              className="donate-shine w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black font-heading py-3.5 rounded-xl shadow-lg shadow-emerald-600/30 transition text-sm flex items-center justify-center space-x-2"
            >
              <span>Confirm Support for ₹{currentAmount}</span>
              <Icon name="arrowright" size={16} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// --- SERVICE DETAIL MODAL ---
const ServiceModal = () => {
  const { selectedService, setSelectedService, showToast } = useTrust();
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!selectedService) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      showToast('Please enter your name and phone number.', 'error');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      showToast(`Application submitted for ${selectedService.title}!`, 'success');
      setSelectedService(null);
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden border border-slate-200 relative my-8 max-h-[90vh] flex flex-col">
        <div className="relative h-52 sm:h-64 w-full overflow-hidden bg-slate-900">
          <img src={selectedService.image} alt={selectedService.title} className="w-full h-full object-cover opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          <button onClick={() => setSelectedService(null)} className="absolute top-4 right-4 bg-black/60 hover:bg-emerald-600 text-white p-2 rounded-full transition">
            <Icon name="x" size={20} />
          </button>
          <div className="absolute bottom-4 left-6 right-6 text-white">
            <span className="inline-block bg-emerald-600 text-white text-xs font-bold font-heading uppercase tracking-wider px-3 py-1 rounded-full mb-2 shadow">
              {selectedService.category}
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black font-heading">{selectedService.title}</h2>
          </div>
        </div>

        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-700">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-emerald-50/70 p-3.5 rounded-xl border border-emerald-100 text-xs sm:text-sm">
            {selectedService.beneficiaries && (
              <div>
                <span className="text-slate-500 block font-medium">Impact Reached</span>
                <strong className="text-emerald-800 font-bold font-heading">{selectedService.beneficiaries}</strong>
              </div>
            )}
            {selectedService.duration && (
              <div>
                <span className="text-slate-500 block font-medium">Duration</span>
                <strong className="text-slate-900 font-bold font-heading">{selectedService.duration}</strong>
              </div>
            )}
            {selectedService.location && (
              <div className="col-span-2 sm:col-span-1">
                <span className="text-slate-500 block font-medium">Location</span>
                <strong className="text-slate-900 font-bold font-heading">{selectedService.location}</strong>
              </div>
            )}
          </div>

          <div>
            <h3 className="text-base font-bold font-heading text-slate-900 mb-2 border-l-4 border-emerald-600 pl-2.5">Program Overview</h3>
            <p className="text-sm sm:text-base leading-relaxed text-slate-600">{selectedService.fullDescription || selectedService.shortDescription}</p>
          </div>

          {selectedService.features && (
            <div>
              <h3 className="text-base font-bold font-heading text-slate-900 mb-3 border-l-4 border-emerald-600 pl-2.5">Key Highlights</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedService.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start space-x-2.5 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    <div className="p-1 rounded-full bg-emerald-100 text-emerald-600 mt-0.5">
                      <Icon name="check" size={14} />
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-slate-700">{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
            <h3 className="text-base font-bold font-heading text-slate-900 mb-1">Apply for Free Enrollment</h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Full Name *"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 text-sm border rounded-xl"
                />
                <input
                  type="tel"
                  required
                  placeholder="Phone Number *"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 text-sm border rounded-xl"
                />
              </div>
              <div className="flex justify-end space-x-3 pt-2">
                <button type="button" onClick={() => setSelectedService(null)} className="px-4 py-2 text-sm font-semibold text-slate-600">Close</button>
                <button type="submit" disabled={isSubmitting} className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-xl text-sm font-bold font-heading shadow">
                  {isSubmitting ? 'Submitting...' : 'Submit Free Application'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- EVENT DETAIL & RSVP MODAL ---
const EventModal = () => {
  const { selectedEvent, setSelectedEvent, registerForEvent } = useTrust();
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!selectedEvent) return null;

  const handleRegister = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('Please provide your name and phone.');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      registerForEvent(selectedEvent.id, formData);
      setSelectedEvent(null);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden border my-8">
        <div className="relative h-48 w-full bg-slate-900">
          <img src={selectedEvent.image} alt={selectedEvent.title} className="w-full h-full object-cover opacity-80" />
          <button onClick={() => setSelectedEvent(null)} className="absolute top-4 right-4 bg-black/60 text-white p-2 rounded-full">
            <Icon name="x" size={20} />
          </button>
          <div className="absolute bottom-4 left-6 right-6 text-white">
            <h2 className="text-xl font-bold font-heading">{selectedEvent.title}</h2>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <p className="text-sm text-slate-600">{selectedEvent.description}</p>
          <p className="text-xs text-slate-500">📍 {selectedEvent.location} | ⏰ {selectedEvent.time}</p>
          
          {selectedEvent.status === 'Upcoming' && (
            <form onSubmit={handleRegister} className="space-y-3 pt-2">
              <input type="text" required placeholder="Name *" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full p-2.5 border rounded-xl text-sm" />
              <input type="tel" required placeholder="Phone *" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full p-2.5 border rounded-xl text-sm" />
              <div className="flex justify-end space-x-2">
                <button type="button" onClick={() => setSelectedEvent(null)} className="px-4 py-2 text-sm">Cancel</button>
                <button type="submit" className="bg-emerald-600 text-white px-5 py-2 rounded-xl text-sm font-bold font-heading shadow">
                  {isSubmitting ? 'Registering...' : 'Confirm Free RSVP'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

// --- NEWS MODAL ---
const NewsModal = () => {
  const { selectedNews, setSelectedNews } = useTrust();
  if (!selectedNews) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden border my-8">
        <div className="relative h-56 w-full bg-slate-900">
          <img src={selectedNews.thumbnail} alt={selectedNews.title} className="w-full h-full object-cover opacity-80" />
          <button onClick={() => setSelectedNews(null)} className="absolute top-4 right-4 bg-black/60 text-white p-2 rounded-full">
            <Icon name="x" size={20} />
          </button>
          <div className="absolute bottom-4 left-6 right-6 text-white">
            <span className="bg-emerald-600 text-xs px-2.5 py-0.5 rounded-full font-bold font-heading uppercase">{selectedNews.category}</span>
            <h2 className="text-xl font-black font-heading mt-1">{selectedNews.title}</h2>
          </div>
        </div>
        <div className="p-6 space-y-4 text-sm text-slate-700">
          <div className="text-xs text-slate-400">📅 {selectedNews.date} • {selectedNews.author || 'Trust Desk'}</div>
          <p className="whitespace-pre-line leading-relaxed">{selectedNews.content || selectedNews.shortDescription}</p>
          <div className="flex justify-end pt-4">
            <button onClick={() => setSelectedNews(null)} className="bg-slate-900 text-white text-xs px-5 py-2.5 rounded-xl font-bold font-heading">Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- LIGHTBOX MODAL ---
const LightboxModal = () => {
  const { lightboxIndex, setLightboxIndex, gallery } = useTrust();
  if (lightboxIndex === null || !gallery[lightboxIndex]) return null;

  const currentItem = gallery[lightboxIndex];
  const handlePrev = (e) => {
    e.stopPropagation();
    setLightboxIndex(prev => (prev > 0 ? prev - 1 : gallery.length - 1));
  };
  const handleNext = (e) => {
    e.stopPropagation();
    setLightboxIndex(prev => (prev < gallery.length - 1 ? prev + 1 : 0));
  };

  return (
    <div onClick={() => setLightboxIndex(null)} className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-4 animate-fadeIn">
      <div className="flex justify-between items-center text-white" onClick={(e) => e.stopPropagation()}>
        <span className="bg-emerald-600 text-xs px-3 py-1 rounded-full font-bold uppercase font-heading">{currentItem.category}</span>
        <button onClick={() => setLightboxIndex(null)} className="bg-white/10 text-white p-2 rounded-full">
          <Icon name="x" size={24} />
        </button>
      </div>

      <div className="relative flex-1 flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
        <button onClick={handlePrev} className="absolute left-2 bg-black/50 text-white p-3 rounded-full">
          <Icon name="chevronleft" size={24} />
        </button>
        <img src={currentItem.imageUrl} alt={currentItem.title} className="max-h-[75vh] max-w-full object-contain rounded-2xl shadow-2xl" />
        <button onClick={handleNext} className="absolute right-2 bg-black/50 text-white p-3 rounded-full">
          <Icon name="chevronright" size={24} />
        </button>
      </div>

      <div className="text-center text-white p-4 bg-black/40 rounded-2xl max-w-xl mx-auto" onClick={(e) => e.stopPropagation()}>
        <h3 className="font-bold font-heading">{currentItem.title}</h3>
        <p className="text-xs text-slate-300">{currentItem.caption}</p>
      </div>
    </div>
  );
};

// --- TOAST NOTIFICATION ---
const Toast = () => {
  const { toast } = useTrust();
  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center space-x-3 px-5 py-3 rounded-2xl shadow-2xl border bg-slate-950 text-white text-sm font-medium animate-bounce-short">
      <span className="text-emerald-400 font-bold">●</span>
      <span>{toast.message}</span>
    </div>
  );
};

// --- FLOATING QUICK ACTION BUTTONS ---
const FloatingActions = () => {
  const { trustInfo } = useTrust();
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowTop(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed bottom-6 left-6 z-40 flex flex-col space-y-3">
      {/* WhatsApp Button */}
      <a
        href={trustInfo.socials.whatsapp}
        target="_blank"
        rel="noreferrer"
        className="w-12 h-12 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
        aria-label="WhatsApp Helpline"
      >
        <Icon name="share" size={22} />
      </a>

      {/* Emergency Call Helpline */}
      <a
        href={`tel:${trustInfo.emergencyBloodHelpline}`}
        className="w-12 h-12 rounded-full bg-teal-600 hover:bg-teal-700 text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-transform animate-pulse"
        aria-label="Emergency Blood Call"
      >
        <Icon name="heartpulse" size={22} />
      </a>

      {/* Scroll to Top */}
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-xl hover:bg-emerald-600 transition"
          aria-label="Scroll to top"
        >
          ↑
        </button>
      )}
    </div>
  );
};

// --- HOME PAGE ---
const HomePage = () => {
  const { services, events, news, gallery, testimonials, navigate, setLightboxIndex, setIsDonateModalOpen } = useTrust();
  const featuredServices = services.slice(0, 6);
  const upcomingEvents = events.filter(e => e.status === 'Upcoming').slice(0, 3);
  const latestNews = news.slice(0, 3);
  const gallerySpotlight = gallery.slice(0, 8);

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* Hero Slider */}
      <HeroSlider />

      {/* 4 Overlapping Feature Cards */}
      <HeroFeatureCards />

      {/* About Foundation & Impact Overview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-5" data-aos="fade-right">
            <span className="text-emerald-700 font-bold font-heading text-xs uppercase tracking-widest bg-emerald-50 px-3.5 py-1 rounded-full inline-block border border-emerald-200">
              Welcome to Medidhisubbaiah Trust
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-slate-900 tracking-tight leading-tight">
              Serving Humanity With <br />
              <span className="text-emerald-600">Dignity, Care & Transparency</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Medidhisubbaiah Trust is dedicated to the social, economic, and educational upliftment of rural and urban communities. From organizing 100% free women vocational skills to 24/7 blood donor coordination, Annadhanam food distributions, summer drinking water kiosks, and sports meets—we work relentlessly at the grassroots.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div className="text-emerald-600 font-black font-heading text-2xl">100% Free</div>
                <div className="text-xs text-slate-600 font-bold font-heading mt-0.5">Welfare & Skill Training</div>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div className="text-emerald-600 font-black font-heading text-2xl">80,000+</div>
                <div className="text-xs text-slate-600 font-bold font-heading mt-0.5">Beneficiaries Reached</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <button onClick={() => navigate('about')} className="bg-slate-900 hover:bg-emerald-600 text-white font-bold font-heading px-6 py-3 rounded-xl text-sm transition flex items-center space-x-2">
                <span>About Our Mission</span>
                <Icon name="arrowright" size={16} />
              </button>
              <button onClick={() => setIsDonateModalOpen(true)} className="donate-shine bg-emerald-600 hover:bg-emerald-700 text-white font-bold font-heading px-6 py-3 rounded-xl text-sm shadow-md transition">
                Support Our Programs
              </button>
            </div>
          </div>

          <div className="lg:col-span-6" data-aos="fade-left">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80"
                alt="Community Work"
                className="rounded-3xl shadow-2xl w-full h-[400px] object-cover"
              />
              <div className="absolute -bottom-6 -left-6 bg-emerald-700 text-white p-6 rounded-2xl shadow-xl max-w-xs hidden sm:block">
                <div className="font-black font-heading text-2xl">8+ Years</div>
                <div className="text-xs text-emerald-100 mt-1">Of continuous selfless dedication and transparent community welfare.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Statistics */}
      <StatsCounter />

      {/* Featured Causes / Services */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-emerald-700 font-bold font-heading text-xs uppercase tracking-widest bg-emerald-50 px-3.5 py-1 rounded-full inline-block mb-2 border border-emerald-200">
              Our Core Initiatives
            </span>
            <h2 className="text-3xl sm:text-4xl font-black font-heading text-slate-900 tracking-tight">Welfare Causes & Programs</h2>
          </div>
          <button onClick={() => navigate('services')} className="text-emerald-600 font-bold font-heading text-sm flex items-center space-x-1 hover:underline">
            <span>View All ({services.length}) Services</span>
            <Icon name="arrowright" size={16} />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featuredServices.map(s => <ServiceCard key={s.id} service={s} />)}
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="bg-slate-50 py-16 sm:py-20 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-emerald-700 font-bold font-heading text-xs uppercase tracking-widest bg-white border border-emerald-200 px-3.5 py-1 rounded-full inline-block mb-2">
                Join In Person
              </span>
              <h2 className="text-3xl sm:text-4xl font-black font-heading text-slate-900 tracking-tight">Upcoming Drives & Events</h2>
            </div>
            <button onClick={() => navigate('events')} className="text-emerald-600 font-bold font-heading text-sm flex items-center space-x-1 hover:underline">
              <span>View All Events</span>
              <Icon name="arrowright" size={16} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {upcomingEvents.map(e => <EventCard key={e.id} event={e} />)}
          </div>
        </div>
      </section>

      {/* Photo Gallery Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-emerald-700 font-bold font-heading text-xs uppercase tracking-widest bg-emerald-50 px-3.5 py-1 rounded-full inline-block mb-2">
              Visual Chronicles
            </span>
            <h2 className="text-3xl sm:text-4xl font-black font-heading text-slate-900 tracking-tight">Moments of Social Service</h2>
          </div>
          <button onClick={() => navigate('gallery')} className="text-emerald-600 font-bold font-heading text-sm flex items-center space-x-1 hover:underline">
            <span>Explore Full Gallery</span>
            <Icon name="arrowright" size={16} />
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {gallerySpotlight.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setLightboxIndex(idx)}
              className="group relative h-48 sm:h-56 rounded-2xl overflow-hidden cursor-pointer shadow-md bg-slate-900 border"
            >
              <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent opacity-0 group-hover:opacity-100 transition p-4 flex flex-col justify-between text-white">
                <span className="bg-emerald-600 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase self-start font-heading">{item.category}</span>
                <p className="text-xs font-bold font-heading leading-tight line-clamp-2">{item.title}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-emerald-50/50 py-16 sm:py-20 border-y border-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-emerald-700 font-bold font-heading text-xs uppercase tracking-widest bg-white border border-emerald-200 px-3.5 py-1 rounded-full inline-block mb-2">
              Voices of Change
            </span>
            <h2 className="text-3xl sm:text-4xl font-black font-heading text-slate-900">What Our Community Says</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.id} className="bg-white p-6 sm:p-8 rounded-3xl border border-emerald-100 shadow-md space-y-4 flex flex-col justify-between">
                <p className="text-slate-600 text-sm leading-relaxed italic">"{t.quote}"</p>
                <div className="flex items-center space-x-3 pt-4 border-t border-slate-100">
                  <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover border-2 border-emerald-500" />
                  <div>
                    <h4 className="font-extrabold font-heading text-sm text-slate-900">{t.name}</h4>
                    <p className="text-xs text-slate-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest News & Stories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-emerald-700 font-bold font-heading text-xs uppercase tracking-widest bg-emerald-50 px-3.5 py-1 rounded-full inline-block mb-2">
              Press & Media
            </span>
            <h2 className="text-3xl sm:text-4xl font-black font-heading text-slate-900 tracking-tight">Latest News & Stories</h2>
          </div>
          <button onClick={() => navigate('news')} className="text-emerald-600 font-bold font-heading text-sm flex items-center space-x-1 hover:underline">
            <span>Read All News</span>
            <Icon name="arrowright" size={16} />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {latestNews.map(n => <NewsCard key={n.id} newsItem={n} />)}
        </div>
      </section>

      {/* Big Impact Call To Action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="bg-gradient-to-r from-emerald-800 via-teal-700 to-emerald-900 rounded-3xl p-8 sm:p-14 text-white shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl text-center lg:text-left">
            <span className="bg-white/20 text-white text-xs font-black font-heading uppercase tracking-wider px-3 py-1 rounded-full">
              Together We Can Make A Difference
            </span>
            <h2 className="text-2xl sm:text-4xl font-black font-heading">Help Us Bring Light & Hope To Deserving Lives</h2>
            <p className="text-emerald-100 text-sm sm:text-base leading-relaxed">
              Every voluntary hour, blood donation, and rupee helps a family eat, a woman learn tailoring, and a child attend school.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3.5 shrink-0">
            <button onClick={() => setIsDonateModalOpen(true)} className="donate-shine bg-white text-emerald-800 font-black font-heading px-8 py-4 rounded-xl text-base shadow-2xl hover:bg-emerald-50">
              Donate Online Now
            </button>
            <button onClick={() => navigate('contact')} className="bg-slate-950/80 text-white font-bold font-heading px-7 py-4 rounded-xl text-base border border-white/20 hover:bg-slate-950">
              Join as Volunteer
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

// --- ABOUT PAGE ---
const AboutPage = () => {
  const { navigate, setIsDonateModalOpen } = useTrust();
  const objectives = [
    { title: "Women's Economic Empowerment", desc: "Free tailoring and Maggam embroidery training to help women generate sustainable household income.", icon: "scissors" },
    { title: "24/7 Life Saving Healthcare", desc: "Voluntary blood donation registries and rapid donor coordination.", icon: "heartpulse" },
    { title: "Eradicating Hunger (Annadhanam)", desc: "Distributing hot nutritious meals and monthly dry ration kits to needy families.", icon: "utensils" },
    { title: "Chalivendram Public Water", desc: "Clay-pot drinking water stations and spiced buttermilk kiosks during intense summer.", icon: "droplets" },
    { title: "Youth Development Through Sports", desc: "Grassroots tournaments in Kabaddi, Cricket, and Volleyball with free sports kits.", icon: "trophy" },
    { title: "Universal Educational Support", desc: "Free school bags, books, and merit scholarships for underprivileged students.", icon: "graduationcap" }
  ];

  return (
    <div className="space-y-12 sm:space-y-16 py-8">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-14 shadow-2xl">
          <span className="bg-emerald-600/30 text-emerald-400 border border-emerald-500/40 text-xs font-bold font-heading uppercase tracking-wider px-3.5 py-1 rounded-full inline-block mb-3">About Medidhisubbaiah Trust</span>
          <h1 className="text-3xl sm:text-5xl font-black font-heading leading-tight">A Legacy of Selfless Service & <span className="text-emerald-400">Integrity</span></h1>
          <p className="text-slate-300 text-base sm:text-lg mt-3 max-w-3xl leading-relaxed">
            Medidhisubbaiah Trust is a registered non-profit charitable social-service organization committed to creating equal opportunities, supporting vulnerable families, and empowering rural and urban youth through education and vocational training.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-emerald-50/60 border border-emerald-200 rounded-3xl p-8 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md"><Icon name="heart" size={24} /></div>
            <h2 className="text-2xl font-black font-heading text-slate-900">Our Mission</h2>
            <p className="text-slate-700 text-sm leading-relaxed">To alleviate poverty and vulnerability through holistic community interventions: providing 100% free livelihood training for women, facilitating prompt emergency blood donations, distributing nourishing food, supplying clean drinking water, and fostering youth potential through education and sports.</p>
          </div>
          <div className="bg-slate-900 text-white border border-slate-800 rounded-3xl p-8 space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md"><Icon name="eye" size={24} /></div>
            <h2 className="text-2xl font-black font-heading text-white">Our Vision</h2>
            <p className="text-slate-300 text-sm leading-relaxed">A compassionate, self-reliant society where no family suffers from hunger, no emergency patient loses life due to lack of blood, every woman has vocational independence, and every child possesses the resources to learn, compete, and flourish.</p>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-black font-heading text-slate-900">Strategic Core Objectives</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {objectives.map((obj, idx) => (
              <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center"><Icon name={obj.icon} size={20} /></div>
                <h3 className="font-bold font-heading text-base text-slate-900">{obj.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{obj.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// --- SERVICES PAGE ---
const ServicesPage = () => {
  const { services } = useTrust();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Skill Development', 'Community Welfare', 'Healthcare', 'Public Welfare', 'Sports', 'Education'];

  const filtered = useMemo(() => {
    return services.filter(s => {
      const matchCat = selectedCategory === 'All' || s.category === selectedCategory;
      const matchSearch = s.title.toLowerCase().includes(searchQuery.toLowerCase()) || s.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [services, selectedCategory, searchQuery]);

  return (
    <div className="space-y-12 sm:space-y-16 py-8">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-14 shadow-2xl">
          <span className="bg-emerald-600/30 text-emerald-400 border border-emerald-500/40 text-xs font-bold font-heading uppercase tracking-wider px-3.5 py-1 rounded-full inline-block mb-3">100% Free Welfare Services</span>
          <h1 className="text-3xl sm:text-5xl font-black font-heading">Our Community <span className="text-emerald-400">Services & Causes</span></h1>
          <p className="text-slate-300 text-base mt-2 max-w-2xl">Explore our core initiatives designed to foster livelihood self-reliance, ensure food security, save critical lives, and empower future generations.</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold font-heading whitespace-nowrap transition ${
                  selectedCategory === cat ? 'bg-emerald-600 text-white shadow-md' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <input
              type="text"
              placeholder="Search services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <div className="absolute left-3.5 top-3 text-slate-400"><Icon name="search" size={16} /></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filtered.map(s => <ServiceCard key={s.id} service={s} />)}
        </div>
      </section>
    </div>
  );
};

// --- EVENTS PAGE ---
const EventsPage = () => {
  const { events } = useTrust();
  const [statusTab, setStatusTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = useMemo(() => {
    return events.filter(e => {
      const matchStatus = statusTab === 'All' || e.status === statusTab;
      const matchSearch = e.title.toLowerCase().includes(searchQuery.toLowerCase()) || e.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchStatus && matchSearch;
    });
  }, [events, statusTab, searchQuery]);

  return (
    <div className="space-y-12 sm:space-y-16 py-8">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-14 shadow-2xl">
          <span className="bg-emerald-600/30 text-emerald-400 text-xs font-bold font-heading uppercase tracking-wider px-3.5 py-1 rounded-full inline-block mb-3">Community Programs</span>
          <h1 className="text-3xl sm:text-5xl font-black font-heading">Trust Events & <span className="text-emerald-400">Welfare Camps</span></h1>
          <p className="text-slate-300 text-base mt-2 max-w-2xl">Join our upcoming blood donation drives, sports meets, certificate convocations, and food distribution activities.</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm mb-8">
          <div className="flex bg-slate-100 p-1.5 rounded-xl">
            {['All', 'Upcoming', 'Completed'].map(tab => (
              <button
                key={tab}
                onClick={() => setStatusTab(tab)}
                className={`px-5 py-2 rounded-lg text-xs sm:text-sm font-bold font-heading transition ${statusTab === tab ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-600'}`}
              >
                {tab} Events
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <div className="absolute left-3 top-2.5 text-slate-400"><Icon name="search" size={16} /></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filtered.map(e => <EventCard key={e.id} event={e} />)}
        </div>
      </section>
    </div>
  );
};

// --- NEWS PAGE ---
const NewsPage = () => {
  const { news } = useTrust();
  return (
    <div className="space-y-12 sm:space-y-16 py-8">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-14 shadow-2xl">
          <span className="bg-emerald-600/30 text-emerald-400 text-xs font-bold font-heading uppercase tracking-wider px-3.5 py-1 rounded-full inline-block mb-3">Press Releases</span>
          <h1 className="text-3xl sm:text-5xl font-black font-heading">Trust News & <span className="text-emerald-400">Activity Stories</span></h1>
          <p className="text-slate-300 text-base mt-2 max-w-2xl">Stay informed with verified reports, impact stories, and official announcements.</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {news.map(n => <NewsCard key={n.id} newsItem={n} />)}
        </div>
      </section>
    </div>
  );
};

// --- GALLERY PAGE ---
const GalleryPage = () => {
  const { gallery, setLightboxIndex } = useTrust();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = ['All', 'Events', 'Blood Donation', 'Food Distribution', 'Grocery Distribution', 'Tailoring', 'Educational Programs', 'Sports', 'Chalivendram'];

  const filtered = useMemo(() => {
    if (selectedCategory === 'All') return gallery;
    return gallery.filter(item => item.category === selectedCategory);
  }, [gallery, selectedCategory]);

  return (
    <div className="space-y-12 sm:space-y-16 py-8">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-14 shadow-2xl">
          <span className="bg-emerald-600/30 text-emerald-400 text-xs font-bold font-heading uppercase tracking-wider px-3.5 py-1 rounded-full inline-block mb-3">Visual Chronicles</span>
          <h1 className="text-3xl sm:text-5xl font-black font-heading">Community <span className="text-emerald-400">Photo Gallery</span></h1>
          <p className="text-slate-300 text-base mt-2 max-w-2xl">Authentic photographs capturing moments of community empowerment, blood drives, food service, and summer Chalivendram water kiosks.</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-2 overflow-x-auto scrollbar-none mb-8">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold font-heading whitespace-nowrap transition ${
                selectedCategory === cat ? 'bg-emerald-600 text-white shadow-md' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filtered.map((item, idx) => {
            const masterIdx = gallery.findIndex(g => g.id === item.id);
            return (
              <div
                key={item.id}
                onClick={() => setLightboxIndex(masterIdx !== -1 ? masterIdx : idx)}
                className="group relative rounded-3xl overflow-hidden bg-slate-900 border shadow-sm hover:shadow-2xl cursor-pointer transition h-72 sm:h-80"
              >
                <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent p-4 flex flex-col justify-between text-white">
                  <span className="bg-emerald-600 text-[10px] font-bold px-2.5 py-0.5 rounded-full self-start uppercase font-heading">{item.category}</span>
                  <div>
                    <h3 className="font-bold font-heading text-sm leading-snug">{item.title}</h3>
                    <p className="text-xs text-slate-300 line-clamp-1">{item.caption}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

// --- CONTACT PAGE ---
const ContactPage = () => {
  const { trustInfo, submitContactForm } = useTrust();
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', subject: 'General Inquiry', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.message) {
      alert('Please fill required fields (Name, Phone, Message).');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      submitContactForm(formData);
      setFormData({ name: '', phone: '', email: '', subject: 'General Inquiry', message: '' });
    }, 500);
  };

  return (
    <div className="space-y-12 sm:space-y-16 py-8">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-14 shadow-2xl">
          <span className="bg-emerald-600/30 text-emerald-400 text-xs font-bold font-heading uppercase tracking-wider px-3.5 py-1 rounded-full inline-block mb-3">Helpdesk</span>
          <h1 className="text-3xl sm:text-5xl font-black font-heading">Contact <span className="text-emerald-400">Medidhisubbaiah Trust</span></h1>
          <p className="text-slate-300 text-base mt-2 max-w-2xl">Have questions regarding free vocational training, blood donor coordination, or community relief? Reach out to us.</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white p-6 rounded-3xl border shadow-sm space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center"><Icon name="mappin" size={20} /></div>
            <h3 className="font-bold font-heading text-base text-slate-900">Headquarters</h3>
            <p className="text-xs text-slate-600">{trustInfo.address}</p>
          </div>
          <div className="bg-white p-6 rounded-3xl border shadow-sm space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center"><Icon name="phone" size={20} /></div>
            <h3 className="font-bold font-heading text-base text-slate-900">Phone Helpdesk</h3>
            <p className="text-xs text-slate-600">{trustInfo.phone}</p>
          </div>
          <div className="bg-emerald-50/70 p-6 rounded-3xl border border-emerald-200 shadow-sm space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center"><Icon name="heartpulse" size={20} /></div>
            <h3 className="font-bold font-heading text-base text-emerald-950">24/7 Blood Line</h3>
            <a href={`tel:${trustInfo.emergencyBloodHelpline}`} className="text-base font-black text-emerald-700 block">{trustInfo.emergencyBloodHelpline}</a>
          </div>
          <div className="bg-white p-6 rounded-3xl border shadow-sm space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center"><Icon name="mail" size={20} /></div>
            <h3 className="font-bold font-heading text-base text-slate-900">Email</h3>
            <p className="text-xs text-slate-600">{trustInfo.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-3xl border shadow-md">
            <h2 className="text-2xl font-black font-heading text-slate-900 mb-4">Send Us A Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input type="text" required placeholder="Full Name *" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full p-2.5 text-sm border rounded-xl" />
                <input type="tel" required placeholder="Phone Number *" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full p-2.5 text-sm border rounded-xl" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input type="email" placeholder="Email Address" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full p-2.5 text-sm border rounded-xl" />
                <select value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} className="w-full p-2.5 text-sm border rounded-xl bg-white">
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Tailoring Program Admission">Free Tailoring Admission</option>
                  <option value="Maggam Work Course">Maggam Work Admission</option>
                  <option value="Emergency Blood Donor">Blood Donation / Request</option>
                  <option value="Food & Grocery Support">Food / Grocery Support</option>
                </select>
              </div>
              <textarea rows="4" required placeholder="Your message or query in detail..." value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full p-2.5 text-sm border rounded-xl" />
              <button type="submit" disabled={isSubmitting} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold font-heading px-8 py-3.5 rounded-xl text-sm shadow-lg">
                {isSubmitting ? 'Sending...' : 'Submit Message'}
              </button>
            </form>
          </div>

          <div className="lg:col-span-5 bg-white p-3 rounded-3xl border shadow-md space-y-4">
            <div className="h-72 w-full rounded-2xl overflow-hidden bg-slate-100">
              <iframe
                title="Trust Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d122554.40939515949!2d79.94829762145025!3d14.442598715873998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb3644f1c1f54cd%3A0xb5b7964b73b5f922!2sAndhra%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                className="w-full h-full border-0"
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
            <p className="text-xs text-slate-600 px-3 pb-2 font-medium">📍 Visiting Hours: 8:30 AM - 6:30 PM (Mon - Sat)</p>
          </div>
        </div>
      </section>
    </div>
  );
};

// --- LOGIN PAGE ---
const LoginPage = () => {
  const { loginAdmin } = useTrust();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMessage('');
    const res = loginAdmin(username, password, true);
    if (!res.success) setErrorMessage(res.message);
  };

  const handleFillDemo = () => {
    setUsername('admin@medidhisubbaiah.org');
    setPassword('trust2026');
    setErrorMessage('');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 bg-slate-50">
      <div className="max-w-md w-full space-y-6 bg-white p-8 rounded-3xl border shadow-xl">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-800 flex items-center justify-center text-white mx-auto shadow-lg">
            <span className="font-black text-2xl font-heading">MT</span>
          </div>
          <h2 className="text-2xl font-black font-heading text-slate-900">Administrator Portal</h2>
          <p className="text-xs text-slate-500">Authorized management access for Medidhisubbaiah Trust</p>
        </div>

        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs flex justify-between items-center">
          <div>
            <span className="font-bold font-heading text-emerald-800 block">Demo Credentials:</span>
            <span className="text-slate-600 font-mono text-[11px]">admin@medidhisubbaiah.org / trust2026</span>
          </div>
          <button type="button" onClick={handleFillDemo} className="bg-emerald-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-md">
            Auto Fill
          </button>
        </div>

        {errorMessage && (
          <div className="bg-red-50 border border-red-300 text-red-700 px-3 py-2 rounded-xl text-xs">{errorMessage}</div>
        )}

        <form onSubmit={handleLogin} className="space-y-4 text-sm">
          <div>
            <label className="font-bold font-heading block text-xs text-slate-700 mb-1">Email or Username</label>
            <input type="text" required value={username} onChange={(e) => setUsername(e.target.value)} className="w-full p-2.5 border rounded-xl" />
          </div>
          <div>
            <label className="font-bold font-heading block text-xs text-slate-700 mb-1">Password</label>
            <div className="relative">
              <input type={showPassword ? 'text' : 'password'} required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2.5 pr-10 border rounded-xl" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-slate-400">
                <Icon name={showPassword ? 'eyeoff' : 'eye'} size={16} />
              </button>
            </div>
          </div>
          <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold font-heading py-3 rounded-xl shadow-lg transition">
            Sign In to Admin Hub
          </button>
        </form>
      </div>
    </div>
  );
};

// --- ADMIN MANAGEMENT HUB ---
const AdminPage = () => {
  const { isAdminLoggedIn, logoutAdmin, services, deleteService, events, deleteEvent, news, deleteNews, gallery, deleteGalleryImage, inquiries, resetToFactoryDefaults, navigate } = useTrust();
  const [tab, setTab] = useState('services');

  if (!isAdminLoggedIn) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center space-y-4">
        <h2 className="text-2xl font-bold font-heading">Admin Login Required</h2>
        <button onClick={() => navigate('login')} className="bg-emerald-600 text-white px-6 py-2 rounded-xl text-sm font-bold">Login</button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="bg-slate-900 text-white p-6 rounded-3xl flex justify-between items-center">
        <div>
          <span className="bg-emerald-600 text-xs px-2.5 py-0.5 rounded-full font-bold font-heading uppercase">Admin Hub</span>
          <h1 className="text-2xl font-black font-heading mt-1">Medidhisubbaiah Trust Content Hub</h1>
        </div>
        <div className="flex space-x-2">
          <button onClick={resetToFactoryDefaults} className="bg-slate-800 text-xs px-3 py-2 rounded-xl border border-slate-700 font-heading">Reset Data</button>
          <button onClick={logoutAdmin} className="bg-emerald-600 text-xs font-bold font-heading px-4 py-2 rounded-xl">Logout</button>
        </div>
      </div>

      <div className="flex space-x-2 bg-white p-2 rounded-2xl border shadow-sm overflow-x-auto">
        {[
          { id: 'services', label: `Services (${services.length})` },
          { id: 'events', label: `Events (${events.length})` },
          { id: 'news', label: `News (${news.length})` },
          { id: 'gallery', label: `Gallery (${gallery.length})` },
          { id: 'inquiries', label: `Inquiries (${inquiries.length})` }
        ].map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold font-heading whitespace-nowrap ${tab === t.id ? 'bg-emerald-600 text-white shadow' : 'text-slate-600 hover:bg-slate-100'}`}>
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'services' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map(s => (
            <div key={s.id} className="bg-white p-4 rounded-2xl border shadow-sm space-y-2">
              <span className="text-xs font-bold text-emerald-600 font-heading">{s.category}</span>
              <h3 className="font-bold font-heading text-base">{s.title}</h3>
              <p className="text-xs text-slate-500 line-clamp-2">{s.shortDescription}</p>
              <div className="flex justify-end pt-2">
                <button onClick={() => deleteService(s.id)} className="text-xs text-red-600 font-bold hover:underline">Delete Service</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'events' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.map(e => (
            <div key={e.id} className="bg-white p-4 rounded-2xl border shadow-sm space-y-2">
              <span className="text-xs font-bold text-emerald-600 font-heading">{e.status} • {e.date}</span>
              <h3 className="font-bold font-heading text-base">{e.title}</h3>
              <p className="text-xs text-slate-500">{e.location}</p>
              <div className="flex justify-end pt-2">
                <button onClick={() => deleteEvent(e.id)} className="text-xs text-red-600 font-bold hover:underline">Delete Event</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'news' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {news.map(n => (
            <div key={n.id} className="bg-white p-4 rounded-2xl border shadow-sm space-y-2">
              <span className="text-xs text-slate-400">{n.date}</span>
              <h3 className="font-bold font-heading text-base">{n.title}</h3>
              <div className="flex justify-end pt-2">
                <button onClick={() => deleteNews(n.id)} className="text-xs text-red-600 font-bold hover:underline">Delete Article</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'gallery' && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {gallery.map(g => (
            <div key={g.id} className="bg-white rounded-2xl overflow-hidden border shadow-sm relative">
              <img src={g.imageUrl} alt={g.title} className="w-full h-36 object-cover" />
              <div className="p-2.5 flex justify-between items-center">
                <span className="text-xs font-bold truncate font-heading">{g.title}</span>
                <button onClick={() => deleteGalleryImage(g.id)} className="text-xs text-red-600 font-bold">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'inquiries' && (
        <div className="space-y-3">
          {inquiries.length > 0 ? inquiries.map(inq => (
            <div key={inq.id} className="bg-white p-4 rounded-2xl border shadow-sm space-y-1 text-sm">
              <div className="flex justify-between font-bold font-heading"><span>{inq.name} ({inq.phone})</span><span className="text-xs text-slate-400">{inq.submittedAt}</span></div>
              <p className="text-xs text-emerald-600 font-semibold">{inq.subject}</p>
              <p className="text-xs text-slate-700 bg-slate-50 p-2 rounded-lg">"{inq.message}"</p>
            </div>
          )) : <div className="p-8 text-center bg-white rounded-2xl text-slate-400 text-sm">No inquiries received yet.</div>}
        </div>
      )}
    </div>
  );
};

// --- RICH FOOTER ---
const Footer = () => {
  const { navigate, trustInfo, services, setIsDonateModalOpen } = useTrust();
  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate('home')}>
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-800 flex items-center justify-center text-white shadow-lg">
                <span className="font-black text-xl font-heading">MT</span>
              </div>
              <div>
                <span className="font-bold text-xl text-white tracking-tight font-heading">Medidhisubbaiah <span className="text-emerald-400">Trust</span></span>
                <p className="text-xs text-slate-400">{trustInfo.registration}</p>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Medidhisubbaiah Trust is dedicated to uplifting underprivileged families, empowering women through free vocational training, providing life-saving healthcare and blood donor support, and fostering education for every child.
            </p>
            <div className="bg-emerald-950/40 border border-emerald-800/40 rounded-2xl p-4 flex items-center space-x-3">
              <div className="p-2.5 bg-emerald-600 text-white rounded-xl"><Icon name="heartpulse" size={22} /></div>
              <div>
                <div className="text-xs text-emerald-300 font-bold font-heading">24/7 Blood Donation Emergency Helpline</div>
                <a href={`tel:${trustInfo.emergencyBloodHelpline}`} className="text-white font-black text-base hover:text-emerald-300 font-heading">{trustInfo.emergencyBloodHelpline}</a>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-white font-bold font-heading text-sm uppercase tracking-wider border-l-2 border-emerald-500 pl-2.5">Quick Links</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              {['home', 'about', 'services', 'events', 'news', 'gallery', 'contact', 'login'].map(r => (
                <li key={r}>
                  <button onClick={() => navigate(r)} className="hover:text-emerald-400 capitalize flex items-center space-x-1.5 transition font-medium">
                    <Icon name="chevronright" size={13} className="text-emerald-500" />
                    <span>{r === 'login' ? 'Admin Portal' : r === 'about' ? 'About Us' : r === 'services' ? 'Our Services' : r === 'news' ? 'Media & News' : r}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-white font-bold font-heading text-sm uppercase tracking-wider border-l-2 border-emerald-500 pl-2.5">Welfare Causes</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              {services.slice(0, 5).map(s => (
                <li key={s.id}>
                  <button onClick={() => navigate('services')} className="hover:text-emerald-400 text-left truncate block max-w-[200px]">
                    • {s.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-white font-bold font-heading text-sm uppercase tracking-wider border-l-2 border-emerald-500 pl-2.5">Contact Us</h3>
            <p className="text-xs text-slate-400 leading-relaxed">{trustInfo.address}</p>
            <p className="text-xs text-emerald-400 font-bold">{trustInfo.phone}</p>
            <p className="text-xs text-slate-300">{trustInfo.email}</p>
            <div className="pt-2">
              <button onClick={() => setIsDonateModalOpen(true)} className="donate-shine w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold font-heading py-2.5 rounded-xl text-xs shadow-md transition">
                Donate Online
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} Medidhisubbaiah Trust. All Rights Reserved. Committed to selfless social service and transparency.
        </div>
      </div>
    </footer>
  );
};

// --- APP ROOT ---
const App = () => {
  const { currentRoute } = useTrust();

  useEffect(() => {
    if (window.AOS) {
      window.AOS.init({ duration: 700, once: true, easing: 'ease-out-cubic' });
    }
  }, []);

  const renderPage = () => {
    switch (currentRoute) {
      case 'about': return <AboutPage />;
      case 'services': return <ServicesPage />;
      case 'events': return <EventsPage />;
      case 'news': return <NewsPage />;
      case 'gallery': return <GalleryPage />;
      case 'contact': return <ContactPage />;
      case 'login': return <LoginPage />;
      case 'admin': return <AdminPage />;
      case 'home':
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans selection:bg-emerald-600 selection:text-white">
      <Navbar />
      <main className="flex-1">{renderPage()}</main>
      <ServiceModal />
      <EventModal />
      <NewsModal />
      <LightboxModal />
      <DonateModal />
      <Toast />
      <FloatingActions />
      <Footer />
    </div>
  );
};

// Render React App to DOM
const rootEl = document.getElementById('root');
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <TrustProvider>
      <App />
    </TrustProvider>
  );
}
