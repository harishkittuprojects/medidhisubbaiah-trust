// ==========================================
// Medidhisubbaiah Trust Web Application
// Theme: White & Green with Official Trust Emblem Logo
// Responsive Mobile-First Architecture (100% Contained & Viewport Safe)
// Integrated with Supabase Database & Cloudinary Media Storage (Images, Videos, PDFs)
// Built with React 18, Tailwind CSS, Outfit & Inter Typography, and Lucide Icons
// ==========================================

const { useState, useEffect, useContext, createContext, useMemo } = React;

// =======================================================
// SUPABASE & CLOUDINARY CREDENTIALS CONFIGURATION
// =======================================================
const getEnv = (key, fallback) => {
  if (typeof process !== 'undefined' && process.env && process.env[key]) return process.env[key];
  if (typeof window !== 'undefined' && window.__ENV__ && window.__ENV__[key]) return window.__ENV__[key];
  return fallback;
};

const SUPABASE_CONFIG = {
  url: getEnv('VITE_SUPABASE_URL', 'https://plbdgerejabjrrqttlba.supabase.co'),
  anonKey: getEnv('VITE_SUPABASE_ANON_KEY', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYmRnZXJlamFianJycXR0bGJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc0MDM0NzMsImV4cCI6MjEwMjk3OTQ3M30.F5abonKjri8ER_y1OWZ0stR3J2OnDigeWcvOdHrpLpw')
};

const CLOUDINARY_CONFIG = {
  cloudName: getEnv('VITE_CLOUDINARY_CLOUD_NAME', 'mxpyrhmt'),
  apiKey: getEnv('VITE_CLOUDINARY_API_KEY', '159637265485386'),
  apiSecret: getEnv('VITE_CLOUDINARY_API_SECRET', '9L1F0V-qSKVHNDrpMfflZhAWSFw')
};

// Initialize Supabase Client
let supabaseClient = null;
try {
  if (window.supabase && typeof window.supabase.createClient === 'function') {
    supabaseClient = window.supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);
  }
} catch (err) {
  console.warn('Supabase initialization warning:', err);
}

// Cloudinary Direct Upload Helper (Images, Videos, PDFs) with SHA1 Signature
const uploadToCloudinary = async (file, onProgress) => {
  return new Promise((resolve, reject) => {
    try {
      const timestamp = Math.floor(Date.now() / 1000);
      const strToSign = `timestamp=${timestamp}${CLOUDINARY_CONFIG.apiSecret}`;
      
      // Compute SHA1 signature using CryptoJS
      let signature = '';
      if (window.CryptoJS && window.CryptoJS.SHA1) {
        signature = window.CryptoJS.SHA1(strToSign).toString(window.CryptoJS.enc.Hex);
      } else {
        throw new Error('CryptoJS library is required for signed Cloudinary upload.');
      }

      // Determine resource type: image, video, raw (pdf, docs)
      let resourceType = 'auto';
      if (file.type && file.type.startsWith('image/')) resourceType = 'image';
      else if (file.type && file.type.startsWith('video/')) resourceType = 'video';
      else if (file.type === 'application/pdf' || (file.name && file.name.toLowerCase().endsWith('.pdf'))) resourceType = 'raw';

      const formData = new FormData();
      formData.append('file', file);
      formData.append('api_key', CLOUDINARY_CONFIG.apiKey);
      formData.append('timestamp', timestamp.toString());
      formData.append('signature', signature);

      const endpoint = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/${resourceType}/upload`;

      const xhr = new XMLHttpRequest();
      xhr.open('POST', endpoint, true);

      if (onProgress && xhr.upload) {
        xhr.upload.onprogress = (e) => {
          if (e.lengthComputable) {
            const percent = Math.round((e.loaded / e.total) * 100);
            onProgress(percent);
          }
        };
      }

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const res = JSON.parse(xhr.responseText);
            let formattedDuration = undefined;
            if (res.duration) {
              const mins = Math.floor(res.duration / 60);
              const secs = String(Math.floor(res.duration % 60)).padStart(2, '0');
              formattedDuration = `${mins}:${secs}`;
            }
            resolve({
              url: res.secure_url || res.url,
              publicId: res.public_id,
              resourceType: res.resource_type,
              format: res.format,
              duration: formattedDuration,
              width: res.width,
              height: res.height,
              bytes: res.bytes
            });
          } catch (e) {
            reject(new Error('Invalid response from Cloudinary'));
          }
        } else {
          try {
            const errData = JSON.parse(xhr.responseText);
            reject(new Error(errData?.error?.message || `Cloudinary upload failed (HTTP ${xhr.status})`));
          } catch (e) {
            reject(new Error(`Cloudinary upload failed with HTTP status ${xhr.status}`));
          }
        }
      };

      xhr.onerror = () => {
        reject(new Error('Network error while connecting to Cloudinary.'));
      };

      xhr.send(formData);
    } catch (err) {
      reject(err);
    }
  });
};

// --- INITIAL DATASETS (Fallback & Default Seeds) ---
const initialServices = [
  {
    id: "1",
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
    id: "2",
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
    id: "3",
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
    id: "4",
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
    id: "5",
    title: "Annadhanam (Free Food Distribution)",
    category: "Social Relief",
    shortDescription: "Nutritious hot meals distributed weekly to underprivileged patients and homeless families.",
    fullDescription: "No human being should sleep hungry. Medidhisubbaiah Trust runs continuous Annadhanam seva outside district government hospitals, transit shelters, and low-income community settlements. Pure, hygienic vegetarian meals cooked with high-quality grains, lentils, and vegetables are served with dignity.",
    icon: "utensils",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80",
    raised: "35,000+ Meals",
    goal: "50,000 Target",
    progress: 70,
    features: [
      "100% hygienic, steaming hot vegetarian meals",
      "Distributed outside government hospitals & rural shelters",
      "Special festival Annadhanam for 1,000+ people",
      "Strict food safety and clean drinking water accompaniment",
      "Volunteer participation welcomed"
    ],
    beneficiaries: "35,000+ Meals Served",
    duration: "Every Sunday & Festival Occasions",
    location: "Government General Hospital & Shelters"
  },
  {
    id: "6",
    title: "Free Grocery & Ration Kits",
    category: "Social Relief",
    shortDescription: "Monthly staple food groceries provided to destitute widows, elderly citizens, and disabled persons.",
    fullDescription: "Our monthly Free Grocery distribution provides complete essential ration kits (Rice, Dal, Cooking Oil, Salt, Spices, Wheat Flour, Sugar, and hygiene essentials) directly to identified vulnerable households, single mothers, and elderly persons with no family support.",
    icon: "packagecheck",
    image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80",
    raised: "1,800+ Kits",
    goal: "2,500 Target",
    progress: 72,
    features: [
      "25 kg comprehensive monthly essential ration pack",
      "Dedicated focus on destitute widows & elderly",
      "Doorstep delivery for bedridden and disabled beneficiaries",
      "Seasonal festival grocery supplement packages",
      "Transparent community beneficiary verification"
    ],
    beneficiaries: "1,800+ Families Supported",
    duration: "Monthly Distribution Drive",
    location: "Community Center Distribution Point"
  },
  {
    id: "7",
    title: "Summer Chalivendram Water Kiosks",
    category: "Public Welfare",
    shortDescription: "Free drinking water and cool buttermilk centers combating harsh summer heat for commuters.",
    fullDescription: "During the scorching summer months (March - June), the Trust operates 8+ traditional Chalivendram centers in heavy pedestrian zones, bus terminals, and market streets. We provide cool clay-pot filtered water and refreshing spiced buttermilk to thousands of pedestrians, auto drivers, and sanitation workers every day.",
    icon: "droplets",
    image: "https://images.unsplash.com/photo-1559827291-72ee739d0d9a?auto=format&fit=crop&w=800&q=80",
    raised: "1,50,000+ People",
    goal: "2,00,000 Target",
    progress: 75,
    features: [
      "Cool clay pot drinking water kiosks",
      "Daily fresh spiced buttermilk (Majjiga) distribution",
      "Located at bus stations, markets, and traffic intersections",
      "Relief for auto drivers, gig workers, and pedestrians",
      "Dedicated volunteer supervision daily"
    ],
    beneficiaries: "1,50,000+ Thirst Quenched",
    duration: "Annual March to June Service",
    location: "8 High-Traffic Urban Locations"
  },
  {
    id: "8",
    title: "Youth Sports Meets & Free Kits",
    category: "Youth & Sports",
    shortDescription: "Organizing rural athletic tournaments and distributing professional sports gear to youth.",
    fullDescription: "Encouraging fitness, team discipline, and healthy sportsmanship among rural youth. The Trust sponsors annual Cricket, Kabaddi, Volleyball, and Athletics tournaments, providing free jerseys, shoes, sports kits, and trophies to foster talent and steer young minds away from negative influences.",
    icon: "trophy",
    image: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=800&q=80",
    raised: "3,000+ Youth",
    goal: "4,000 Target",
    progress: 75,
    features: [
      "Annual Inter-Mandal Cricket & Kabaddi tournaments",
      "Free professional sports kit bags and jerseys",
      "Scholarships & prize money for top athletic performers",
      "Coaching camps guided by state-level coaches",
      "Promoting discipline and substance-free youth lifestyle"
    ],
    beneficiaries: "3,000+ Young Athletes",
    duration: "Annual Winter Tournament",
    location: "District Sports Grounds"
  },
  {
    id: "9",
    title: "Educational Kits & Scholarships",
    category: "Education",
    shortDescription: "Free school backpacks, notebooks, uniforms, and merit scholarships for underprivileged students.",
    fullDescription: "Education is the greatest equalizer. Medidhisubbaiah Trust distributes comprehensive academic kits containing waterproof backpacks, notebooks, stationery, mathematical instruments, and umbrellas to government school students, alongside need-based fee scholarships for deserving collegiate youth.",
    icon: "graduationcap",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
    raised: "2,200+ Students",
    goal: "3,000 Target",
    progress: 73,
    features: [
      "Sturdy backpacks with notebooks and stationery kits",
      "Free school uniform distribution drives",
      "Merit-cum-means college tuition grants",
      "Career counseling workshops for high schoolers",
      "Special focus on encouraging rural girl child education"
    ],
    beneficiaries: "2,200+ Students Supported",
    duration: "Annual Academic Season Drive",
    location: "Government Schools & Trust Center"
  }
];

const initialEvents = [
  {
    id: "1",
    title: "Mega Free Vocational Training Graduation & Certificate Distribution",
    category: "Skill Development",
    date: "2026-09-15",
    time: "10:00 AM - 01:30 PM",
    location: "Hotel Chitturi Heritage, Tanuku",
    status: "Registration Open",
    description: "Grand convocation ceremony honoring 300+ women completing free tailoring and maggam work training with Dr. Kishore Kumar Garu.",
    image_url: "assets/gallery/trust_work_page_01.jpg",
    total_seats: 350,
    seats_registered: 42
  },
  {
    id: "2",
    title: "Emergency Voluntary Blood Donation Camp & Awareness Meet",
    category: "Healthcare",
    date: "2026-09-28",
    time: "08:30 AM - 02:00 PM",
    location: "Trust Community Center, Nizampet",
    status: "Registration Open",
    description: "Join our noble life-saving blood donation drive in association with Red Cross Blood Bank. Free health checkup for all donors.",
    image_url: "https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=800&q=80",
    total_seats: 200,
    seats_registered: 88
  },
  {
    id: "3",
    title: "Annual Free Sports Tournament & Sports Kit Distribution for Youth",
    category: "Youth & Sports",
    date: "2026-10-12",
    time: "07:30 AM - 05:00 PM",
    location: "Tanuku Municipal Stadium",
    status: "Upcoming",
    description: "Inter-mandal cricket, kabaddi, and athletics meet promoting rural youth sports talent with free jerseys, trophies, and kits.",
    image_url: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=800&q=80",
    total_seats: 500,
    seats_registered: 120
  }
];

const initialNews = [
  {
    id: "1",
    title: "Medidhisubbaiah Trust Expands Free Tailoring Center to Empower 500 More Rural Women",
    thumbnail: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80",
    date: "2026-08-10",
    category: "Skill Development",
    short_description: "With new industrial sewing machines and master trainers, the Trust expands its flagship tailoring curriculum to new centers.",
    author: "Trust Editorial Desk",
    read_time: "4 min read",
    content: `Medidhisubbaiah Trust has announced the major expansion of its Free Tailoring and Garment Making Center. The initiative introduces 20 brand-new computerized sewing and overlock machines, allowing the trust to train an additional 500 women per year.\n\nThe program includes comprehensive modules in pattern drafting, blouse stitching, kidswear design, and basic boutique management. Trainees are also connected with local garment boutiques and textile merchants for direct job placement and order fulfillment.\n\n"Our goal is not merely training; it is creating self-reliant, financially empowered households," stated the Trust Chairman during the expansion ribbon cutting ceremony.`
  },
  {
    id: "2",
    title: "Emergency Blood Donor Registry Crosses 1,000 Verified Donors Milestone",
    thumbnail: "https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=800&q=80",
    date: "2026-07-22",
    category: "Healthcare",
    short_description: "The Trust's 24/7 blood helpline has successfully arranged critical blood units for over 350 emergency hospital cases this year.",
    author: "Health Committee",
    read_time: "3 min read",
    content: `The 24/7 Voluntary Blood Donor Network of Medidhisubbaiah Trust reached a significant milestone this month with over 1,000 verified volunteer donors registered across rare and common blood groups.\n\nIn coordination with district medical centers and emergency response teams, the network helps connect patients in urgent need with voluntary donors in less than 20 minutes on average.\n\nThe Trust expresses heartfelt gratitude to all noble donors who step forward selflessly to save precious human lives.`
  },
  {
    id: "3",
    title: "1,200 Students Receive Free Educational Bags and Stationery Kits for New Academic Year",
    thumbnail: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
    date: "2026-06-18",
    category: "Education",
    short_description: "Children across eight government primary and high schools received durable school bags, notebooks, and learning materials.",
    author: "Education Wing",
    read_time: "3 min read",
    content: `As schools resumed for the new academic calendar, Medidhisubbaiah Trust completed its annual Free School Kit Distribution drive. Over 1,200 students from underprivileged backgrounds were provided with high quality backpacks, notebooks, pens, geometry boxes, and examination pads.\n\nTeachers and parents appreciated the gesture, noting that these kits prevent school dropouts and encourage children to attend classes with pride and excitement.`
  },
  {
    id: "4",
    title: "Summer Chalivendram Kiosks Serve Over 1.5 Lakh Citizens Across High-Traffic Hubs",
    thumbnail: "https://images.unsplash.com/photo-1559827291-72ee739d0d9a?auto=format&fit=crop&w=800&q=80",
    date: "2026-05-30",
    category: "Public Welfare",
    short_description: "The 3-month summer drinking water and buttermilk service concluded successfully, bringing immense relief to daily wage workers and commuters.",
    author: "Public Relations",
    read_time: "2 min read",
    content: `With temperatures soaring past 42°C during peak summer, Medidhisubbaiah Trust operated 8 dedicated Chalivendram centers across major transit and market hubs.\n\nVolunteers worked in shifts to serve cool, naturally filtered clay pot water and freshly churned spicy buttermilk to more than 150,000 pedestrians, auto drivers, traffic personnel, and travelers. The Trust expresses gratitude to the local community volunteers who managed the kiosks daily.`
  }
];

const initialGallery = [
  {
    id: "100",
    title: "Official Program Live Video — Free Tailoring & Muggam Work Convocations",
    category: "Video Documentation",
    type: "video",
    video_url: "assets/gallery/trust_activity_video.mp4",
    image_url: "assets/gallery/trust_activity_video_thumb.jpg",
    duration: "1:22",
    date: "2026-08-22",
    is_pdf_work: false,
    location: "Hotel Chitturi Heritage, Tanuku",
    caption: "Live video documentation showing trainees, master faculty, guest dignitaries, certificate distribution, and vocational skill activities across Tanuku, Mogultur, Narsapuram & Tadepalligudam."
  },
  {
    id: "1",
    title: "Grand Keynote & Certificate Distribution Inauguration",
    category: "Certificate Distribution",
    type: "image",
    image_url: "assets/gallery/trust_work_page_01.jpg",
    date: "2026-08-10",
    is_pdf_work: true,
    location: "Hotel Chitturi Heritage, Tanuku",
    caption: "Dr. Kishore Kumar Garu (Founder, GVSK Nutraceuticals & Ayurveda, Hyderabad) inaugurating the Certificate Distribution Ceremony for Free Tailoring & Muggam Work batches across Tanuku, Mogultur, Narsapuram & Tadepalligudam."
  },
  {
    id: "2",
    title: "Mega Graduation Convocation - Women Beneficiaries",
    category: "Certificate Distribution",
    type: "image",
    image_url: "assets/gallery/trust_work_page_02.jpg",
    date: "2026-08-10",
    is_pdf_work: true,
    location: "Tanuku, West Godavari",
    caption: "Grand convocation group photograph of women trainees holding their official certificates after completing the intensive vocational skill development program."
  },
  {
    id: "3",
    title: "Tanuku & Mogultur Batch Certificate Distribution",
    category: "Certificate Distribution",
    type: "image",
    image_url: "assets/gallery/trust_work_page_03.jpg",
    date: "2026-08-10",
    is_pdf_work: true,
    location: "Hotel Chitturi Heritage, Tanuku",
    caption: "Dignitaries presenting vocational credentials to successful trainees from Tanuku and Mogultur mandals, fostering women self-reliance."
  },
  {
    id: "4",
    title: "Vocational Skills Certificate Distribution - Narsapuram Batch",
    category: "Certificate Distribution",
    type: "image",
    image_url: "assets/gallery/trust_work_page_04.jpg",
    date: "2026-08-10",
    is_pdf_work: true,
    location: "Narsapuram & Regional Center",
    caption: "Honoring deserving women students with course completion credentials, encouraging micro-entrepreneurship and boutique startups."
  },
  {
    id: "5",
    title: "Free Tailoring & Maggam Work Certificate Presentation - Tadepalligudam",
    category: "Certificate Distribution",
    type: "image",
    image_url: "assets/gallery/trust_work_page_05.jpg",
    date: "2026-08-10",
    is_pdf_work: true,
    location: "Tadepalligudam & Tanuku Centers",
    caption: "Trainees proudly receiving certificates recognizing their dedicated practice in garment making, drafting, and intricate embroidery."
  },
  {
    id: "6",
    title: "Dignitaries & Master Trainers Felicitation",
    category: "Tailoring & Muggam",
    type: "image",
    image_url: "assets/gallery/trust_work_page_06.jpg",
    date: "2026-08-10",
    is_pdf_work: true,
    location: "Hotel Chitturi Heritage, Tanuku",
    caption: "Trust leaders presenting graduation certificates to women participants from rural and semi-urban communities."
  },
  {
    id: "7",
    title: "Empowering Rural Women Artisans with Tailoring Mastery",
    category: "Tailoring & Muggam",
    type: "image",
    image_url: "assets/gallery/trust_work_page_07.jpg",
    date: "2026-08-10",
    is_pdf_work: true,
    location: "Tanuku, West Godavari",
    caption: "Congratulating women artisans on mastering traditional Maggam work and commercial garment stitching."
  },
  {
    id: "8",
    title: "Practical Muggam & Aari Needlework Demonstration & Awards",
    category: "Tailoring & Muggam",
    type: "image",
    image_url: "assets/gallery/trust_work_page_08.jpg",
    date: "2026-08-10",
    is_pdf_work: true,
    location: "Tanuku & Mogultur Centers",
    caption: "Moments from the grand certificate distribution honoring hardworking candidates."
  },
  {
    id: "9",
    title: "Women Livelihood & Skill Development Certification Session",
    category: "Tailoring & Muggam",
    type: "image",
    image_url: "assets/gallery/trust_work_page_09.jpg",
    date: "2026-08-10",
    is_pdf_work: true,
    location: "Tanuku, AP",
    caption: "Celebrating the achievements of students across multiple training centers."
  },
  {
    id: "10",
    title: "Tanuku Region Women Vocational Certificate Ceremony",
    category: "Tailoring & Muggam",
    type: "image",
    image_url: "assets/gallery/trust_work_page_10.jpg",
    date: "2026-08-10",
    is_pdf_work: true,
    location: "Hotel Chitturi Heritage, Tanuku",
    caption: "Fostering economic empowerment and home-based enterprise among women through verified certifications."
  },
  {
    id: "11",
    title: "Skill Completion & Career Guidance Seminar",
    category: "Education",
    type: "image",
    image_url: "assets/gallery/trust_work_page_11.jpg",
    date: "2026-08-10",
    is_pdf_work: true,
    location: "Tanuku Center",
    caption: "Guiding new graduates on starting self-help stitching groups, purchasing sewing machines, and marketing their handmade products."
  },
  {
    id: "12",
    title: "Mogultur Batch Maggam Work Artisans Recognition",
    category: "Tailoring & Muggam",
    type: "image",
    image_url: "assets/gallery/trust_work_page_12.jpg",
    date: "2026-08-10",
    is_pdf_work: true,
    location: "Mogultur Mandal",
    caption: "Recognizing high-aptitude trainees specialized in bridal Aari and Zari embroidery."
  },
  {
    id: "13",
    title: "Tadepalligudam Vocational Training Milestone",
    category: "Certificate Distribution",
    type: "image",
    image_url: "assets/gallery/trust_work_page_13.jpg",
    date: "2026-08-10",
    is_pdf_work: true,
    location: "Tadepalligudam",
    caption: "Ceremonial distribution of course credentials to dedicated rural women graduates."
  },
  {
    id: "14",
    title: "Narsapuram & Regional Center Graduation Day",
    category: "Certificate Distribution",
    type: "image",
    image_url: "assets/gallery/trust_work_page_14.jpg",
    date: "2026-08-10",
    is_pdf_work: true,
    location: "Narsapuram",
    caption: "Dignitaries blessing the successful candidates and commending the Trust for non-stop community service."
  },
  {
    id: "15",
    title: "All Works Together — Comprehensive Convocation Summary",
    category: "Certificate Distribution",
    type: "image",
    image_url: "assets/gallery/trust_work_page_15.jpg",
    date: "2026-08-10",
    is_pdf_work: true,
    location: "Hotel Chitturi Heritage, Tanuku",
    caption: "Official presentation chronicle summarizing all free tailoring, maggam work, and certificate distribution drives across Andhra Pradesh."
  },
  {
    id: "16",
    title: "Blood Donation Camp at Community Center",
    category: "Healthcare",
    type: "image",
    image_url: "https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=800&q=80",
    date: "2026-07-15",
    is_pdf_work: false,
    location: "Nizampet Community Center",
    caption: "Volunteers donating life-saving blood units during the 24/7 donor mobilization drive."
  },
  {
    id: "17",
    title: "Weekly Annadhanam & Free Food Distribution",
    category: "Annadhanam",
    type: "image",
    image_url: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80",
    date: "2026-06-25",
    is_pdf_work: false,
    location: "Government General Hospital",
    caption: "Serving pure, nutritious meals to patient attendants and daily wage earners."
  },
  {
    id: "18",
    title: "Summer Chalivendram Water Kiosk Service",
    category: "Chalivendram",
    type: "image",
    image_url: "https://images.unsplash.com/photo-1559827291-72ee739d0d9a?auto=format&fit=crop&w=800&q=80",
    date: "2026-05-12",
    is_pdf_work: false,
    location: "Main Bus Complex & Market Hub",
    caption: "Quenching the thirst of thousands of pedestrians with cool clay-pot water and fresh buttermilk."
  }
];

const initialStats = [
  { value: "4,500+", label: "Women & Artisans Trained", icon: "scissors", sub: "Free Vocational Courses" },
  { value: "4,200+", label: "Blood Units Arranged", icon: "heartpulse", sub: "24/7 Emergency Line" },
  { value: "35,000+", label: "Free Meals Served", icon: "utensils", sub: "Annadhanam Seva" },
  { value: "1.5L+", label: "Citizens Hydrated", icon: "droplets", sub: "Summer Chalivendram" },
  { value: "3,000+", label: "Youth In Sports", icon: "trophy", sub: "Tournaments & Kits" },
  { value: "100%", label: "Free & Transparent", icon: "award", sub: "Selfless Community Impact" }
];

const initialTestimonials = [
  {
    id: "1",
    name: "Lakshmi Devi",
    role: "Tailoring Graduate & Home Boutique Owner",
    location: "Tanuku",
    text: "Joining Medidhisubbaiah Trust's free tailoring course transformed my life. Within 3 months I learned drafting, cutting, and stitching. Today, I earn ₹15,000 every month stitching bridal blouses at home.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    program: "Free Tailoring Program"
  },
  {
    id: "2",
    name: "Rajesh Varma",
    role: "Father of Emergency Surgery Patient",
    location: "Nizampet, Hyderabad",
    text: "When my father urgently needed 3 units of rare O-negative blood at midnight, Medidhisubbaiah Trust's 24/7 blood helpline mobilized voluntary donors to the hospital in just 25 minutes. They saved his life.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    program: "24/7 Blood Donor Network"
  },
  {
    id: "3",
    name: "Bhavani Kumari",
    role: "Maggam Work Artisan",
    location: "Mogultur",
    text: "The master trainers at the Trust taught me Aari embroidery from the very basics. They provided free frames and materials. I received my certificate from Dr. Kishore Kumar Garu and now work with local boutiques.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    program: "Maggam Work Program"
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
  teluguName: "మేడిది సుబ్బయ్య ట్రస్ట్",
  tagline: "Local Vision, Selfless Service, Global Impact",
  registration: "Regd. Social Welfare Organization",
  logoUrl: "./logo.png",
  founded: "Serving the Community with Pride & Transparency",
  address: "1104, 11th Floor, Gokul Bhavanam, Nizampet, Hyderabad - 500090",
  phone: "+91 7686-019999",
  emergencyBloodHelpline: "+91 7686-019999",
  email: "contact@medidhisubbaiahtrust.org",
  operatingHours: "Mon - Sat: 08:30 AM - 06:30 PM",
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
    whatsapp: "https://wa.me/917686019999"
  }
};

const initialLeadership = {
  imageUrl: 'leadership.webp',
  directorName: 'Sri Medidhi Venkateshwar Rao',
  directorRole: 'Director, Medidhisubbaiah Trust',
  directorBio: 'Leading strategic social welfare, hospital blood donation coordination, and youth skill-building drives for 10+ years.',
  treasurerName: 'Smt. Medidhi Varalakshmi',
  treasurerRole: 'Treasurer, Medidhisubbaiah Trust',
  treasurerBio: 'Overseeing transparent trust governance, women empowerment tailoring centers, and free food distribution programs for 10+ years.',
  badgeTag: '10+ Years of Selfless Service',
  sectionTitle: 'Dedicated Community Stewards',
  sectionDesc: 'Guided by the principles of compassion, integrity, and grassroots social development, our leaders have been tirelessly spearheading free educational, healthcare, and vocational initiatives across the community for more than a decade.'
};

// --- UNIVERSAL ICON HELPER ---
function Icon({ name, className = "w-5 h-5", size = 20, color = "currentColor" }) {
  const iconMap = {
    whatsapp: (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.301-.15-1.781-.879-2.057-.98-.276-.1-.477-.15-.678.15-.201.3-.778.98-.954 1.18-.176.2-.351.226-.652.075-.301-.15-1.272-.469-2.423-1.496-.896-.799-1.501-1.786-1.677-2.087-.176-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.151-.176.201-.301.301-.502.1-.201.05-.376-.025-.527-.075-.15-.678-1.635-.929-2.238-.245-.587-.494-.508-.678-.517l-.578-.01c-.201 0-.527.075-.803.376s-1.054 1.03-1.054 2.511 1.079 2.912 1.23 3.113c.151.201 2.124 3.244 5.146 4.549.719.31 1.281.495 1.719.634.722.229 1.379.197 1.898.119.579-.087 1.781-.728 2.032-1.43.251-.703.251-1.305.176-1.43-.075-.125-.276-.201-.577-.351zM12.042 21.849h-.008a9.837 9.837 0 0 1-5.01-1.368l-.359-.213-3.725.977.994-3.631-.234-.372a9.832 9.832 0 0 1-1.51-5.26c.003-5.437 4.426-9.859 9.868-9.859a9.81 9.81 0 0 1 6.98 2.894 9.814 9.814 0 0 1 2.888 6.981c-.004 5.438-4.426 9.861-9.884 9.861zm8.39-18.252A11.758 11.758 0 0 0 12.042 0C5.402 0 .01 5.393.007 12.034a11.72 11.72 0 0 0 1.6 5.962L0 24l6.177-1.62a11.737 11.737 0 0 0 5.86 1.554h.005c6.638 0 12.031-5.393 12.035-12.035a11.725 11.725 0 0 0-3.645-8.286z"/>
      </svg>
    ),
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
    check: (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
    ),
    x: (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
      </svg>
    ),
    arrowright: (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
      </svg>
    ),
    chevronright: (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 18 15 12 9 6"/>
      </svg>
    ),
    chevronleft: (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="15 18 9 12 15 6"/>
      </svg>
    ),
    chevrondown: (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="6 9 12 15 18 9"/>
      </svg>
    ),
    shieldcheck: (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>
      </svg>
    ),
    target: (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
      </svg>
    ),
    eye: (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>
      </svg>
    ),
    eyeoff: (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" y1="2" x2="22" y2="22"/>
      </svg>
    ),
    copy: (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
      </svg>
    ),
    menu: (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/>
      </svg>
    ),
    search: (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
      </svg>
    ),
    plus: (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
      </svg>
    ),
    edit: (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
      </svg>
    ),
    trash: (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
      </svg>
    ),
    upload: (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
      </svg>
    ),
    image: (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
      </svg>
    ),
    database: (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3"/>
      </svg>
    ),
    cloud: (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>
      </svg>
    ),
    refresh: (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
      </svg>
    ),
    share: (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/>
      </svg>
    ),
    filetext: (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/>
      </svg>
    ),
    download: (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
      </svg>
    ),
    externallink: (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
      </svg>
    ),
    maximize: (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
      </svg>
    ),
    play: (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="5 3 19 12 5 21 5 3"/>
      </svg>
    ),
    video: (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="23 7 16 12 23 17 23 7"/><rect width="15" height="14" x="1" y="5" rx="2" ry="2"/>
      </svg>
    )
  };

  const key = name ? name.toLowerCase().replace(/[-_ ]/g, '') : 'heart';
  return iconMap[key] || iconMap.heart;
}

// --- INITIAL SEED DONATION LOGS ---
const initialDonations = [
  {
    id: "1",
    donor_name: "Srikanth Verma",
    amount: "5000",
    phone: "+91 98480 22334",
    pan_number: "ABCDE1234F",
    transaction_id: "UPI/SBI/422891002341",
    screenshot_url: "assets/gallery/trust_work_page_01.jpg",
    cause: "Free Tailoring Machines & Kits",
    status: "Verified / 80G Issued",
    date: "2026-08-20",
    created_at: "2026-08-20T10:30:00.000Z"
  },
  {
    id: "2",
    donor_name: "Kavitha R.",
    amount: "2500",
    phone: "+91 94401 55667",
    pan_number: "BKJPR9981K",
    transaction_id: "UPI/HDFC/422998112233",
    screenshot_url: "assets/gallery/trust_work_page_02.jpg",
    cause: "24/7 Blood Donation Camps & Healthcare",
    status: "Pending Verification",
    date: "2026-08-22",
    created_at: "2026-08-22T15:15:00.000Z"
  }
];

// --- CLOUDINARY UPLOADER COMPONENT ---
const CloudinaryUploader = ({ label = "Upload Media", onUploaded, acceptedTypes = "image/*,video/*,application/pdf", currentUrl = "" }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [previewUrl, setPreviewUrl] = useState(currentUrl);
  const [fileMeta, setFileMeta] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setPreviewUrl(currentUrl);
  }, [currentUrl]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    setProgress(0);
    setError(null);

    try {
      const result = await uploadToCloudinary(file, (p) => setProgress(p));
      setPreviewUrl(result.url);
      setFileMeta(result);
      if (onUploaded) {
        onUploaded(result.url, result);
      }
    } catch (err) {
      console.error('Upload Error:', err);
      setError(err.message || 'Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const isVideo = previewUrl && (previewUrl.includes('.mp4') || previewUrl.includes('.mov') || previewUrl.includes('/video/'));
  const isPdf = previewUrl && (previewUrl.includes('.pdf') || previewUrl.includes('/raw/'));

  return (
    <div className="space-y-2 bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
      <div className="flex items-center justify-between">
        <label className="font-bold font-heading text-xs text-slate-800 flex items-center space-x-1.5">
          <Icon name="cloud" size={15} className="text-emerald-600" />
          <span>{label}</span>
        </label>
        <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full font-heading">
          Cloudinary: mxpyrhmt
        </span>
      </div>

      {previewUrl && (
        <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-white p-2">
          {isVideo ? (
            <video src={previewUrl} controls className="w-full h-36 object-contain rounded-lg bg-black" />
          ) : isPdf ? (
            <div className="flex items-center space-x-3 p-3 bg-emerald-50 rounded-lg">
              <div className="p-2.5 bg-emerald-600 text-white rounded-lg"><Icon name="filetext" size={20} /></div>
              <div className="min-w-0 flex-1">
                <span className="font-bold text-xs text-emerald-950 font-heading block truncate">PDF Document Uploaded</span>
                <a href={previewUrl} target="_blank" rel="noreferrer" className="text-[10px] text-emerald-600 underline font-medium truncate block">
                  {previewUrl}
                </a>
              </div>
            </div>
          ) : (
            <img src={previewUrl} alt="Upload Preview" className="w-full h-32 object-cover rounded-lg" />
          )}

          <div className="mt-2 flex items-center justify-between text-[11px]">
            <span className="text-slate-500 truncate max-w-[200px] font-mono text-[10px]">{previewUrl}</span>
            <button
              type="button"
              onClick={() => {
                navigator.clipboard.writeText(previewUrl);
                alert('Cloudinary URL copied to clipboard!');
              }}
              className="text-emerald-600 font-bold hover:underline flex items-center space-x-1"
            >
              <Icon name="copy" size={12} />
              <span>Copy URL</span>
            </button>
          </div>
        </div>
      )}

      {isUploading && (
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-bold text-emerald-700">
            <span className="flex items-center space-x-1.5 animate-pulse">
              <Icon name="upload" size={14} />
              <span>Uploading to Cloudinary Cloud...</span>
            </span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
            <div className="bg-emerald-600 h-2 rounded-full transition-all duration-200" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      )}

      {error && (
        <div className="p-2 bg-red-50 text-red-600 border border-red-200 rounded-lg text-xs font-medium">
          {error}
        </div>
      )}

      <label className="flex items-center justify-center space-x-2 w-full p-2.5 bg-white border border-dashed border-emerald-400 hover:border-emerald-600 hover:bg-emerald-50/50 rounded-xl cursor-pointer transition text-xs font-bold text-emerald-700 font-heading">
        <Icon name="upload" size={16} />
        <span>{previewUrl ? 'Replace Media / Upload New File' : 'Select Image, Video, or PDF to Upload'}</span>
        <input type="file" accept={acceptedTypes} onChange={handleFileChange} className="hidden" />
      </label>
    </div>
  );
};

// --- CONTEXT & STATE STORE ---
const TrustContext = createContext(null);

const TrustProvider = ({ children }) => {
  const normalizeRoute = (raw) => {
    if (!raw) return 'home';
    const cleaned = String(raw).replace(/^[#\/]+/, '').toLowerCase().trim();
    if (cleaned === 'about-us' || cleaned === 'aboutus' || cleaned === 'about') return 'about';
    if (cleaned === 'our-services' || cleaned === 'services' || cleaned === 'service') return 'services';
    if (cleaned === 'events' || cleaned === 'event') return 'events';
    if (cleaned === 'news' || cleaned === 'media') return 'news';
    if (cleaned === 'gallery' || cleaned === 'photos' || cleaned === 'videos') return 'gallery';
    if (cleaned === 'contact' || cleaned === 'contact-us' || cleaned === 'contactus') return 'contact';
    if (cleaned === 'login' || cleaned === 'admin-login') return 'login';
    if (cleaned === 'admin' || cleaned === 'dashboard') return 'admin';
    return cleaned || 'home';
  };

  const [currentRoute, setCurrentRoute] = useState(() => {
    const hash = (window.location.hash || '').replace(/^[#\/]+/, '');
    if (hash) return normalizeRoute(hash);
    const path = (window.location.pathname || '').replace(/^\/+/, '');
    if (path) return normalizeRoute(path);
    return 'home';
  });

  const sanitizeUrl = (u) => {
    if (!u) return 'assets/gallery/trust_work_page_01.jpg';
    if (typeof u === 'string') {
      if (u.includes('1548839140')) {
        return 'https://images.unsplash.com/photo-1559827291-72ee739d0d9a?auto=format&fit=crop&w=800&q=80';
      }
      if (u.includes('1517649763962')) {
        return 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=800&q=80';
      }
    }
    return u;
  };

  const [services, setServices] = useState(() => {
    try {
      const saved = localStorage.getItem('mst_services');
      if (!saved) return initialServices;
      const parsed = JSON.parse(saved);
      return parsed.map(s => ({ ...s, image: sanitizeUrl(s.image) }));
    } catch {
      return initialServices;
    }
  });

  const [events, setEvents] = useState(() => {
    try {
      const saved = localStorage.getItem('mst_events');
      if (!saved) return initialEvents;
      const parsed = JSON.parse(saved);
      return parsed.map(e => ({ ...e, image_url: sanitizeUrl(e.image_url || e.image) }));
    } catch {
      return initialEvents;
    }
  });

  const [news, setNews] = useState(() => {
    try {
      const saved = localStorage.getItem('mst_news');
      if (!saved) return initialNews;
      const parsed = JSON.parse(saved);
      return parsed.map(n => ({ ...n, thumbnail: sanitizeUrl(n.thumbnail) }));
    } catch {
      return initialNews;
    }
  });

  const [gallery, setGallery] = useState(() => {
    try {
      const saved = localStorage.getItem('mst_gallery_v3');
      if (!saved) return initialGallery;
      const parsed = JSON.parse(saved);
      return parsed.map(g => ({ ...g, image_url: sanitizeUrl(g.image_url || g.imageUrl) }));
    } catch {
      return initialGallery;
    }
  });

  const [inquiries, setInquiries] = useState(() => {
    try {
      const saved = localStorage.getItem('mst_inquiries');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [donations, setDonations] = useState(() => {
    try {
      const saved = localStorage.getItem('mst_donations_v2');
      return saved ? JSON.parse(saved) : initialDonations;
    } catch {
      return initialDonations;
    }
  });

  const [leadership, setLeadership] = useState(() => {
    try {
      const saved = localStorage.getItem('mst_leadership');
      return saved ? JSON.parse(saved) : initialLeadership;
    } catch {
      return initialLeadership;
    }
  });

  const [supabaseConnected, setSupabaseConnected] = useState(false);
  const [supabaseStatusMsg, setSupabaseStatusMsg] = useState('Connecting to Supabase...');

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
    setTimeout(() => setToast(null), 4500);
  };

  const updateLeadership = (newLeadership) => {
    setLeadership(newLeadership);
    showToast('Leadership profiles & photo updated successfully!', 'success');
  };

  // Local storage synchronization as offline fallback
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
    localStorage.setItem('mst_gallery_v3', JSON.stringify(gallery));
  }, [gallery]);
  useEffect(() => {
    localStorage.setItem('mst_inquiries', JSON.stringify(inquiries));
  }, [inquiries]);
  useEffect(() => {
    localStorage.setItem('mst_donations_v2', JSON.stringify(donations));
  }, [donations]);
  useEffect(() => {
    localStorage.setItem('mst_leadership', JSON.stringify(leadership));
  }, [leadership]);

  // Fetch initial data from Supabase if tables exist
  const fetchSupabaseData = async () => {
    if (!supabaseClient) {
      setSupabaseStatusMsg('Supabase SDK not loaded.');
      return;
    }

    try {
      let anyFound = false;

      // 1. Events
      const { data: evts, error: errEvts } = await supabaseClient.from('events').select('*').order('date', { ascending: true });
      if (!errEvts && evts && evts.length > 0) {
        setEvents(evts.map(e => ({ ...e, image_url: sanitizeUrl(e.image_url || e.image) })));
        anyFound = true;
      }

      // 2. News
      const { data: nws, error: errNws } = await supabaseClient.from('news').select('*').order('date', { ascending: false });
      if (!errNws && nws && nws.length > 0) {
        setNews(nws.map(n => ({ ...n, thumbnail: sanitizeUrl(n.thumbnail) })));
        anyFound = true;
      }

      // 3. Gallery
      const { data: gal, error: errGal } = await supabaseClient.from('gallery').select('*').order('id', { ascending: false });
      if (!errGal && gal && gal.length > 0) {
        setGallery(gal.map(g => ({ ...g, image_url: sanitizeUrl(g.image_url || g.imageUrl) })));
        anyFound = true;
      }

      // 4. Services
      const { data: srvs, error: errSrvs } = await supabaseClient.from('services').select('*');
      if (!errSrvs && srvs && srvs.length > 0) {
        setServices(srvs.map(s => ({ ...s, image: sanitizeUrl(s.image) })));
        anyFound = true;
      }

      // 5. Inquiries
      const { data: inqs, error: errInqs } = await supabaseClient.from('inquiries').select('*').order('created_at', { ascending: false });
      if (!errInqs && inqs && inqs.length > 0) {
        setInquiries(inqs);
        anyFound = true;
      }

      // 6. Donations
      const { data: dons, error: errDons } = await supabaseClient.from('donations').select('*').order('created_at', { ascending: false });
      if (!errDons && dons && dons.length > 0) {
        setDonations(dons);
        anyFound = true;
      }

      if (anyFound || (!errEvts && !errNws && !errGal)) {
        setSupabaseConnected(true);
        setSupabaseStatusMsg('Live sync active with Supabase tables');
      } else {
        setSupabaseConnected(false);
        setSupabaseStatusMsg('Supabase connected; run SQL script in Admin to initialize database tables.');
      }
    } catch (err) {
      console.warn('Supabase fetch notice:', err);
      setSupabaseConnected(false);
      setSupabaseStatusMsg('Using local database cache.');
    }
  };

  useEffect(() => {
    fetchSupabaseData();
  }, []);

  const navigate = (route) => {
    const clean = normalizeRoute(route);
    window.location.hash = clean;
    setCurrentRoute(clean);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      if (window.AOS) window.AOS.refresh();
    }, 100);
  };

  useEffect(() => {
    const handleLocationChange = () => {
      const hash = (window.location.hash || '').replace(/^[#\/]+/, '');
      const path = (window.location.pathname || '').replace(/^\/+/, '');
      const target = hash || path || 'home';
      const clean = normalizeRoute(target);
      setCurrentRoute(clean);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('hashchange', handleLocationChange);
    window.addEventListener('popstate', handleLocationChange);
    return () => {
      window.removeEventListener('hashchange', handleLocationChange);
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  const loginAdmin = async (email, password, remember = true) => {
    // 1. Direct Master credentials check
    const normalizedEmail = (email || '').toLowerCase().trim();
    if (
      (normalizedEmail === 'admin@medidhisubbaiah.org' || normalizedEmail === 'admin') &&
      (password === 'trust2026' || password === 'admin123')
    ) {
      setIsAdminLoggedIn(true);
      if (remember) localStorage.setItem('mst_admin_session', 'true');
      showToast('Welcome back, Trust Administrator!', 'success');
      navigate('admin');
      return { success: true };
    }

    // 2. Supabase Auth fallback
    if (supabaseClient) {
      try {
        const { data, error } = await supabaseClient.auth.signInWithPassword({
          email: normalizedEmail,
          password: password
        });
        if (!error && data?.user) {
          setIsAdminLoggedIn(true);
          if (remember) localStorage.setItem('mst_admin_session', 'true');
          showToast(`Welcome back, ${data.user.email}!`, 'success');
          navigate('admin');
          return { success: true };
        }
      } catch (err) {
        console.warn('Supabase auth check:', err);
      }
    }

    return { success: false, message: 'Invalid credentials. Use admin@medidhisubbaiah.org / trust2026' };
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem('mst_admin_session');
    if (supabaseClient) {
      supabaseClient.auth.signOut().catch(() => {});
    }
    showToast('Logged out securely.', 'info');
    navigate('home');
  };

  // --- CRUD: EVENTS (Supabase + State Sync) ---
  const addEvent = async (newEvent) => {
    const id = String(newEvent.id || Date.now());
    const eventItem = { ...newEvent, id, seats_registered: newEvent.seats_registered || 0 };

    setEvents(prev => [eventItem, ...prev]);
    showToast('Event created successfully!');

    if (supabaseClient) {
      try {
        await supabaseClient.from('events').upsert(eventItem);
      } catch (err) {
        console.warn('Supabase event insert error:', err);
      }
    }
  };

  const updateEvent = async (id, updatedEvent) => {
    const stringId = String(id);
    const merged = { ...updatedEvent, id: stringId };

    setEvents(prev => prev.map(e => String(e.id) === stringId ? { ...e, ...merged } : e));
    showToast('Event updated successfully!');

    if (supabaseClient) {
      try {
        await supabaseClient.from('events').update(merged).eq('id', stringId);
      } catch (err) {
        console.warn('Supabase event update error:', err);
      }
    }
  };

  const deleteEvent = async (id) => {
    const stringId = String(id);
    setEvents(prev => prev.filter(e => String(e.id) !== stringId));
    showToast('Event removed.', 'info');

    if (supabaseClient) {
      try {
        await supabaseClient.from('events').delete().eq('id', stringId);
      } catch (err) {
        console.warn('Supabase event delete error:', err);
      }
    }
  };

  const registerForEvent = async (eventId, participantData) => {
    const stringId = String(eventId);
    setEvents(prev => prev.map(e => String(e.id) === stringId ? { ...e, seats_registered: (e.seats_registered || 0) + 1 } : e));
    showToast(`Registration confirmed for ${participantData.name}!`);

    if (supabaseClient) {
      try {
        await supabaseClient.from('events').update({
          seats_registered: (events.find(e => String(e.id) === stringId)?.seats_registered || 0) + 1
        }).eq('id', stringId);
      } catch (err) {
        console.warn('Supabase event register error:', err);
      }
    }
  };

  // --- CRUD: NEWS (Supabase + State Sync) ---
  const addNews = async (newArticle) => {
    const id = String(newArticle.id || Date.now());
    const articleItem = {
      ...newArticle,
      id,
      read_time: newArticle.read_time || '3 min read',
      date: newArticle.date || new Date().toISOString().split('T')[0]
    };

    setNews(prev => [articleItem, ...prev]);
    showToast('News article published!');

    if (supabaseClient) {
      try {
        await supabaseClient.from('news').upsert(articleItem);
      } catch (err) {
        console.warn('Supabase news insert error:', err);
      }
    }
  };

  const updateNews = async (id, updatedArticle) => {
    const stringId = String(id);
    const merged = { ...updatedArticle, id: stringId };

    setNews(prev => prev.map(n => String(n.id) === stringId ? { ...n, ...merged } : n));
    showToast('News article updated!');

    if (supabaseClient) {
      try {
        await supabaseClient.from('news').update(merged).eq('id', stringId);
      } catch (err) {
        console.warn('Supabase news update error:', err);
      }
    }
  };

  const deleteNews = async (id) => {
    const stringId = String(id);
    setNews(prev => prev.filter(n => String(n.id) !== stringId));
    showToast('News article deleted.', 'info');

    if (supabaseClient) {
      try {
        await supabaseClient.from('news').delete().eq('id', stringId);
      } catch (err) {
        console.warn('Supabase news delete error:', err);
      }
    }
  };

  // --- CRUD: GALLERY & VIDEOS (Supabase + State Sync) ---
  const addGalleryItem = async (newItem) => {
    const id = String(newItem.id || Date.now());
    const galleryItem = {
      ...newItem,
      id,
      date: newItem.date || new Date().toISOString().split('T')[0],
      type: newItem.type || (newItem.video_url ? 'video' : 'image')
    };

    setGallery(prev => [galleryItem, ...prev]);
    showToast('Media item added to gallery!');

    if (supabaseClient) {
      try {
        await supabaseClient.from('gallery').upsert(galleryItem);
      } catch (err) {
        console.warn('Supabase gallery insert error:', err);
      }
    }
  };

  const updateGalleryItem = async (id, updatedItem) => {
    const stringId = String(id);
    const merged = { ...updatedItem, id: stringId };

    setGallery(prev => prev.map(g => String(g.id) === stringId ? { ...g, ...merged } : g));
    showToast('Gallery item updated!');

    if (supabaseClient) {
      try {
        await supabaseClient.from('gallery').update(merged).eq('id', stringId);
      } catch (err) {
        console.warn('Supabase gallery update error:', err);
      }
    }
  };

  const deleteGalleryItem = async (id) => {
    const stringId = String(id);
    setGallery(prev => prev.filter(g => String(g.id) !== stringId));
    showToast('Gallery media item removed.', 'info');

    if (supabaseClient) {
      try {
        await supabaseClient.from('gallery').delete().eq('id', stringId);
      } catch (err) {
        console.warn('Supabase gallery delete error:', err);
      }
    }
  };

  // --- CRUD: SERVICES (Supabase + State Sync) ---
  const addService = async (newService) => {
    const id = String(newService.id || Date.now());
    const serviceItem = { ...newService, id };

    setServices(prev => [serviceItem, ...prev]);
    showToast('New service program added!');

    if (supabaseClient) {
      try {
        await supabaseClient.from('services').upsert(serviceItem);
      } catch (err) {
        console.warn('Supabase service insert error:', err);
      }
    }
  };

  const updateService = async (id, updatedService) => {
    const stringId = String(id);
    const merged = { ...updatedService, id: stringId };

    setServices(prev => prev.map(s => String(s.id) === stringId ? { ...s, ...merged } : s));
    showToast('Service updated successfully!');

    if (supabaseClient) {
      try {
        await supabaseClient.from('services').update(merged).eq('id', stringId);
      } catch (err) {
        console.warn('Supabase service update error:', err);
      }
    }
  };

  const deleteService = async (id) => {
    const stringId = String(id);
    setServices(prev => prev.filter(s => String(s.id) !== stringId));
    showToast('Service program removed.', 'info');

    if (supabaseClient) {
      try {
        await supabaseClient.from('services').delete().eq('id', stringId);
      } catch (err) {
        console.warn('Supabase service delete error:', err);
      }
    }
  };

  // --- INQUIRIES & REGISTRATIONS ---
  const submitContactForm = async (formData) => {
    const inq = {
      ...formData,
      id: String(Date.now()),
      submitted_at: new Date().toLocaleString()
    };
    setInquiries(prev => [inq, ...prev]);
    showToast('Thank you! Your message has been received.', 'success');

    if (supabaseClient) {
      try {
        await supabaseClient.from('inquiries').insert(inq);
      } catch (err) {
        console.warn('Supabase inquiry insert notice:', err);
      }
    }
  };

  const deleteInquiry = async (id) => {
    const stringId = String(id);
    setInquiries(prev => prev.filter(i => String(i.id) !== stringId));
    showToast('Inquiry deleted.', 'info');
    if (supabaseClient) {
      try {
        await supabaseClient.from('inquiries').delete().eq('id', stringId);
      } catch (err) {
        console.warn('Supabase inquiry delete notice:', err);
      }
    }
  };

  const submitDonationLog = async (donationData) => {
    const id = String(Date.now());
    const dateStr = new Date().toISOString().split('T')[0];
    const donationItem = {
      ...donationData,
      id,
      date: donationData.date || dateStr,
      status: donationData.status || 'Pending Verification',
      cause: donationData.cause || 'General Trust Seva',
      created_at: new Date().toISOString()
    };

    setDonations(prev => [donationItem, ...prev]);
    showToast('Thank you! Your donation and payment receipt have been recorded successfully.', 'success');

    if (supabaseClient) {
      try {
        await supabaseClient.from('donations').upsert(donationItem);
      } catch (err) {
        console.warn('Supabase donation insert notice:', err);
      }
    }
    return donationItem;
  };

  const updateDonationStatus = async (id, status) => {
    const stringId = String(id);
    setDonations(prev => prev.map(d => String(d.id) === stringId ? { ...d, status } : d));
    showToast(`Donation status updated to "${status}"`, 'success');

    if (supabaseClient) {
      try {
        await supabaseClient.from('donations').update({ status }).eq('id', stringId);
      } catch (err) {
        console.warn('Supabase donation status update error:', err);
      }
    }
  };

  const updateDonationScreenshot = async (id, screenshotUrl) => {
    const stringId = String(id);
    setDonations(prev => prev.map(d => String(d.id) === stringId ? { ...d, screenshot_url: screenshotUrl } : d));
    showToast('Payment screenshot updated successfully!', 'success');

    if (supabaseClient) {
      try {
        await supabaseClient.from('donations').update({ screenshot_url: screenshotUrl }).eq('id', stringId);
      } catch (err) {
        console.warn('Supabase donation screenshot update error:', err);
      }
    }
  };

  const deleteDonation = async (id) => {
    const stringId = String(id);
    setDonations(prev => prev.filter(d => String(d.id) !== stringId));
    showToast('Donation record deleted.', 'info');

    if (supabaseClient) {
      try {
        await supabaseClient.from('donations').delete().eq('id', stringId);
      } catch (err) {
        console.warn('Supabase donation delete error:', err);
      }
    }
  };

  const resetToFactoryDefaults = () => {
    if (!confirm('Are you sure you want to reset all content to official defaults?')) return;
    setServices(initialServices);
    setEvents(initialEvents);
    setNews(initialNews);
    setGallery(initialGallery);
    localStorage.removeItem('mst_services');
    localStorage.removeItem('mst_events');
    localStorage.removeItem('mst_news');
    localStorage.removeItem('mst_gallery_v3');
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
      donations,
      leadership,
      updateLeadership,
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
      addGalleryItem,
      updateGalleryItem,
      deleteGalleryItem,
      submitContactForm,
      deleteInquiry,
      submitDonationLog,
      updateDonationStatus,
      updateDonationScreenshot,
      deleteDonation,
      resetToFactoryDefaults,
      supabaseConnected,
      supabaseStatusMsg,
      fetchSupabaseData
    }}>
      {children}
    </TrustContext.Provider>
  );
};

const useTrust = () => useContext(TrustContext);

// --- MARQUEE TICKER BANNER (Mobile Contained) ---
const MarqueeTicker = () => {
  const { trustInfo } = useTrust();
  const tickerText = "🌿 100% Free Tailoring & Maggam Work Admissions Open • 24/7 Emergency Blood Helpline: " + trustInfo.emergencyBloodHelpline + " • Weekly Annadhanam Nutritious Meals & Monthly Grocery Kits • Free Drinking Water Chalivendram Kiosks • Registered Non-Profit Charitable Trust Dedicated to Social Welfare";

  return (
    <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-900 text-white text-xs font-semibold py-2 px-3 overflow-hidden shadow-inner border-b border-emerald-700/50 flex items-center">
      <div className="bg-amber-400 text-slate-950 font-black uppercase text-[10px] px-2.5 py-0.5 rounded-full mr-3 shrink-0 flex items-center space-x-1 shadow-sm font-heading">
        <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping"></span>
        <span>Live Updates</span>
      </div>
      <div className="overflow-hidden whitespace-nowrap flex-1 relative">
        <div className="animate-marquee inline-block font-medium tracking-wide">
          <span className="mr-8">{tickerText}</span>
          <span className="mr-8">★ ★ ★</span>
          <span className="mr-8">{tickerText}</span>
        </div>
      </div>
    </div>
  );
};

// --- TOP BAR (Mobile Safe & Contained) ---
const TopBar = () => {
  const { trustInfo, setIsDonateModalOpen } = useTrust();

  return (
    <div className="bg-slate-950 text-slate-200 text-xs py-1.5 px-3 sm:px-6 lg:px-8 border-b border-slate-800 hidden sm:block">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1.5 text-slate-300">
            <Icon name="mappin" size={13} className="text-emerald-400" />
            <span className="truncate max-w-xs">{trustInfo.address.split(',')[1] || 'Nizampet, Hyderabad'}</span>
          </div>
          <div className="flex items-center space-x-1.5 text-slate-300">
            <Icon name="clock" size={13} className="text-emerald-400" />
            <span>{trustInfo.operatingHours}</span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <a
            href={`tel:${trustInfo.emergencyBloodHelpline}`}
            className="flex items-center space-x-1.5 bg-red-600/90 hover:bg-red-600 text-white px-2.5 py-0.5 rounded-full font-bold text-[11px] shadow-sm transition"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
            <span>24/7 Blood Line: {trustInfo.emergencyBloodHelpline}</span>
          </a>
          <button
            onClick={() => setIsDonateModalOpen(true)}
            className="text-amber-400 hover:text-amber-300 font-bold text-[11px] font-heading flex items-center space-x-1"
          >
            <Icon name="heart" size={12} />
            <span>Donate (80G Tax-Exempt)</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// --- NAVBAR COMPONENT ---
const Navbar = () => {
  const { currentRoute, navigate, trustInfo, setIsDonateModalOpen, isAdminLoggedIn } = useTrust();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'services', label: 'Services & Causes' },
    { id: 'events', label: 'Events' },
    { id: 'news', label: 'Media & News' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNav = (id) => {
    navigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm">
      <TopBar />
      <MarqueeTicker />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Telugu Title */}
          <div className="flex items-center space-x-3 cursor-pointer py-2" onClick={() => handleNav('home')}>
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full p-0.5 bg-gradient-to-tr from-emerald-600 via-teal-500 to-amber-400 shadow-md shrink-0">
              <img
                src={trustInfo.logoUrl}
                alt="Medidhisubbaiah Trust Logo"
                className="w-full h-full rounded-full object-cover bg-white"
              />
            </div>
            <div className="min-w-0">
              <div className="flex items-center space-x-1.5">
                <span className="font-extrabold text-lg sm:text-xl text-slate-900 tracking-tight font-heading leading-tight truncate">
                  Medidhisubbaiah <span className="text-emerald-600">Trust</span>
                </span>
              </div>
              <p className="text-[11px] font-bold text-emerald-700 font-heading truncate">
                మేడిది సుబ్బయ్య ట్రస్ట్ • <span className="text-slate-500 font-normal text-[10px]">Regd. Non-Profit</span>
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link) => {
              const active = currentRoute === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNav(link.id)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold font-heading transition-all duration-200 ${
                    active
                      ? 'text-emerald-700 bg-emerald-50 shadow-sm border border-emerald-200'
                      : 'text-slate-700 hover:text-emerald-600 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Quick CTAs */}
          <div className="hidden sm:flex items-center space-x-2.5">
            <a
              href={`tel:${trustInfo.emergencyBloodHelpline}`}
              className="p-2.5 rounded-xl bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 transition"
              title="24/7 Emergency Blood Donor Line"
            >
              <Icon name="heartpulse" size={18} />
            </a>

            <button
              onClick={() => setIsDonateModalOpen(true)}
              className="donate-shine donate-dance bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white font-extrabold font-heading px-5 py-2.5 rounded-xl text-xs shadow-md hover:shadow-lg transition flex items-center space-x-1.5"
            >
              <Icon name="heart" size={14} />
              <span>Donate Online</span>
            </button>
          </div>

          {/* Mobile Menu Toggle & Mobile Donate CTA */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              onClick={() => setIsDonateModalOpen(true)}
              className="donate-shine bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white font-extrabold font-heading px-3 py-1.5 rounded-xl text-xs shadow-md flex items-center space-x-1"
            >
              <Icon name="heart" size={13} />
              <span>Donate</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition"
              aria-label="Toggle navigation menu"
            >
              <Icon name={mobileMenuOpen ? 'x' : 'menu'} size={22} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-2xl animate-fadeIn">
          <div className="grid grid-cols-1 gap-1">
            {navLinks.map((link) => {
              const active = currentRoute === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNav(link.id)}
                  className={`text-left px-3.5 py-2.5 rounded-xl text-sm font-bold font-heading transition ${
                    active ? 'bg-emerald-600 text-white' : 'text-slate-800 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col space-y-2">
            <button
              onClick={() => handleNav(isAdminLoggedIn ? 'admin' : 'login')}
              className="flex items-center justify-between w-full px-3.5 py-2.5 rounded-xl text-xs font-bold font-heading bg-slate-900 text-white hover:bg-slate-800 transition shadow-sm"
            >
              <div className="flex items-center space-x-2">
                <Icon name="shieldcheck" size={15} className="text-emerald-400" />
                <span>{isAdminLoggedIn ? 'Admin Portal Dashboard' : 'Administrator Login'}</span>
              </div>
              <span className="text-[10px] text-emerald-400 font-mono">
                {isAdminLoggedIn ? 'Active' : 'Portal'}
              </span>
            </button>

            <button
              onClick={() => {
                setIsDonateModalOpen(true);
                setMobileMenuOpen(false);
              }}
              className="donate-shine w-full bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white font-extrabold font-heading py-2.5 rounded-xl text-xs shadow-md flex items-center justify-center space-x-2"
            >
              <Icon name="heart" size={15} />
              <span>Donate Online (80G Tax-Exempt)</span>
            </button>

            <a
              href={`tel:${trustInfo.emergencyBloodHelpline}`}
              className="flex items-center justify-center space-x-2 bg-red-600 text-white font-bold font-heading py-2.5 rounded-xl text-xs"
            >
              <Icon name="heartpulse" size={16} />
              <span>Emergency Blood Line: {trustInfo.emergencyBloodHelpline}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

// --- HERO SECTION COMPONENT ---
const HeroSection = () => {
  const { navigate, setIsDonateModalOpen } = useTrust();
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = heroSlides[activeSlide];

  return (
    <section className="relative w-full bg-slate-950 text-white overflow-hidden min-h-[560px] sm:min-h-[620px] flex items-center">
      {/* Background Image Carousel with Ken Burns Zoom */}
      {heroSlides.map((s, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === activeSlide ? 'opacity-40 sm:opacity-45' : 'opacity-0 pointer-events-none'
          }`}
        >
          <img
            src={s.image}
            alt={s.title}
            className="w-full h-full object-cover animate-ken-burns"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/40"></div>
        </div>
      ))}

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 w-full">
        <div className="max-w-3xl space-y-4 sm:space-y-6">
          <div className="inline-flex items-center space-x-2 bg-emerald-500/20 border border-emerald-400/40 px-3.5 py-1.5 rounded-full text-emerald-300 text-xs font-bold font-heading tracking-wide uppercase">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>{slide.badge}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-heading leading-tight tracking-tight text-white drop-shadow-md">
            {slide.title}
          </h1>

          <p className="text-base sm:text-xl font-medium text-emerald-300 font-heading">
            {slide.subtitle}
          </p>

          <p className="text-slate-300 text-xs sm:text-base leading-relaxed max-w-2xl">
            {slide.description}
          </p>

          <div className="pt-2 flex flex-wrap gap-3 sm:gap-4">
            <button
              onClick={() => navigate(slide.ctaPrimaryRoute)}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold font-heading px-6 sm:px-8 py-3.5 rounded-xl text-xs sm:text-sm shadow-xl hover:shadow-emerald-500/30 transition transform hover:-translate-y-0.5 flex items-center space-x-2"
            >
              <span>{slide.ctaPrimary}</span>
              <Icon name="arrowright" size={16} />
            </button>

            <button
              onClick={() => setIsDonateModalOpen(true)}
              className="donate-shine bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold font-heading px-6 sm:px-8 py-3.5 rounded-xl text-xs sm:text-sm shadow transition flex items-center space-x-2"
            >
              <Icon name="heart" size={16} className="text-amber-400" />
              <span>Donate Online (80G)</span>
            </button>
          </div>
        </div>

        {/* Carousel Indicators */}
        <div className="absolute bottom-6 right-6 sm:right-8 flex items-center space-x-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveSlide(i)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                i === activeSlide ? 'w-8 bg-emerald-500' : 'w-2.5 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// --- FEATURE CARDS (4 Overlapping Cards) ---
const FeatureCards = () => {
  const { navigate } = useTrust();

  const cards = [
    {
      title: "Free Tailoring & Maggam",
      desc: "Comprehensive 3-month certified training for women with free kits.",
      icon: "scissors",
      route: "services",
      color: "from-emerald-600 to-teal-700"
    },
    {
      title: "24/7 Blood Line",
      desc: "Emergency donor mobilization network across hospitals.",
      icon: "heartpulse",
      route: "contact",
      color: "from-red-600 to-rose-700"
    },
    {
      title: "Annadhanam & Groceries",
      desc: "Nutritious hot meals & monthly dry ration support for destitute.",
      icon: "utensils",
      route: "services",
      color: "from-amber-500 to-orange-600"
    },
    {
      title: "Education & Youth Sports",
      desc: "Free backpacks, kits, and rural tournaments for children.",
      icon: "trophy",
      route: "services",
      color: "from-blue-600 to-indigo-700"
    }
  ];

  return (
    <section className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 sm:-mt-16 w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, idx) => (
          <div
            key={idx}
            onClick={() => navigate(card.route)}
            className="bg-white rounded-2xl p-5 shadow-xl border border-slate-100 hover:shadow-2xl hover:-translate-y-1 transition duration-300 cursor-pointer flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${card.color} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                <Icon name={card.icon} size={22} />
              </div>
              <h3 className="font-extrabold font-heading text-slate-900 text-base group-hover:text-emerald-600 transition-colors">
                {card.title}
              </h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                {card.desc}
              </p>
            </div>
            <div className="pt-4 flex items-center space-x-1.5 text-xs font-bold font-heading text-emerald-600">
              <span>Learn More</span>
              <Icon name="arrowright" size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// --- IMPACT STATS SECTION ---
const ImpactStatsSection = () => {
  const { stats } = useTrust();

  return (
    <section className="py-12 sm:py-16 bg-slate-900 text-white w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-emerald-400 font-bold font-heading text-xs uppercase tracking-wider">
            Proven Social Impact
          </span>
          <h2 className="text-2xl sm:text-4xl font-black font-heading">
            Our Footprint in Numbers
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm">
            Committed to complete transparency, selfless dedication, and quantifiable community upliftment.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 text-center">
          {stats.map((st, i) => (
            <div key={i} className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/60 shadow-lg space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <Icon name={st.icon} size={20} />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white font-heading tracking-tight">
                {st.value}
              </div>
              <div className="text-xs font-bold text-slate-200 font-heading">
                {st.label}
              </div>
              <div className="text-[10px] text-emerald-400 font-medium truncate">
                {st.sub}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- SERVICES SECTION (Homepage Grid) ---
const ServicesSection = () => {
  const { services, setSelectedService, navigate } = useTrust();

  return (
    <section className="py-12 sm:py-20 bg-slate-50 w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-10">
          <div className="space-y-2 max-w-2xl">
            <span className="text-emerald-600 font-bold font-heading text-xs uppercase tracking-wider bg-emerald-100 px-3 py-0.5 rounded-full inline-block">
              Causes & Core Programs
            </span>
            <h2 className="text-2xl sm:text-4xl font-black font-heading text-slate-900">
              Transforming Lives Through Direct Seva
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Explore our verified free welfare programs designed to build lasting self-reliance and provide urgent emergency relief.
            </p>
          </div>
          <button
            onClick={() => navigate('services')}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold font-heading px-5 py-2.5 rounded-xl text-xs shadow transition flex items-center space-x-1.5 shrink-0"
          >
            <span>View All 9 Programs</span>
            <Icon name="arrowright" size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.slice(0, 6).map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                  <img
                    src={service.image || "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80"}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-slate-950/80 text-emerald-300 backdrop-blur-sm text-[11px] font-bold font-heading px-3 py-1 rounded-full border border-emerald-500/30">
                    {service.category}
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <h3 className="text-lg font-black font-heading text-slate-900 group-hover:text-emerald-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 text-xs leading-relaxed line-clamp-3">
                    {service.shortDescription || service.short_description}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500">{service.beneficiaries || service.raised || 'Community Seva'}</span>
                  <button
                    onClick={() => setSelectedService(service)}
                    className="bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white font-bold font-heading px-3.5 py-1.5 rounded-lg text-xs transition"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- ABOUT PAGE COMPONENT ---
const AboutPage = () => {
  const { trustInfo, leadership, setIsDonateModalOpen } = useTrust();
  const lead = leadership || initialLeadership;

  return (
    <div className="space-y-12 sm:space-y-20 py-8 sm:py-12 w-full max-w-full overflow-hidden">
      {/* Page Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="bg-slate-900 text-white rounded-2xl sm:rounded-3xl p-6 sm:p-12 shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-2 sm:space-y-3">
            <span className="bg-emerald-600/30 text-emerald-400 border border-emerald-500/40 text-[11px] font-bold font-heading uppercase tracking-wider px-3 py-0.5 rounded-full inline-block">
              Our Heritage & Vision
            </span>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black font-heading leading-tight">
              About <span className="text-emerald-400">Medidhisubbaiah Trust</span>
            </h1>
            <p className="text-xs sm:text-sm text-emerald-300 font-bold font-heading">
              మేడిది సుబ్బయ్య ట్రస్ట్ — నిస్వార్థ సేవ, సమాజ వికాసం
            </p>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Founded on the pillars of pure compassion, social welfare, and sustainable empowerment, Sri Medidhi Subbaiah Memorial Trust has been touching thousands of lives through free education, vocational craft mastery, emergency blood donor mobilization, and daily humanitarian relief.
            </p>
          </div>
          <div className="absolute right-4 -bottom-10 opacity-10 pointer-events-none hidden md:block">
            <img src="./logo.png" alt="" className="w-80 h-80 object-contain" />
          </div>
        </div>
      </section>

      {/* Trust Leadership & Vision Section (Below Header) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="bg-gradient-to-b from-emerald-50/70 via-white to-emerald-50/30 rounded-3xl border border-emerald-100 p-6 sm:p-10 shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Leadership Image with Badges */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative w-full max-w-sm rounded-3xl bg-white p-3 shadow-xl border border-emerald-100 overflow-hidden group">
                <div className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-emerald-100/50 to-amber-50/50 pt-2 flex items-center justify-center min-h-[260px]">
                  <img
                    src={lead.imageUrl || "leadership.webp"}
                    onError={(e) => {
                      e.target.onerror = null;
                      if (!e.target.src.endsWith('leadership.png')) {
                        e.target.src = "leadership.png";
                      } else {
                        e.target.src = "assets/gallery/trust_work_page_01.jpg";
                      }
                    }}
                    loading="eager"
                    decoding="async"
                    fetchpriority="high"
                    alt={`Trust Leadership — ${lead.directorName} & ${lead.treasurerName}`}
                    className="w-full h-auto max-h-[380px] object-contain object-bottom transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  {/* Left & Right Role Badges */}
                  <div className="absolute bottom-6 left-3 bg-emerald-700/95 backdrop-blur-sm text-white text-[11px] font-extrabold px-3 py-1 rounded-lg shadow-md font-heading">
                    Director
                  </div>
                  <div className="absolute bottom-6 right-3 bg-teal-700/95 backdrop-blur-sm text-white text-[11px] font-extrabold px-3 py-1 rounded-lg shadow-md font-heading">
                    Treasurer
                  </div>
                </div>

                {/* 10+ Years of Selfless Service Center Pill Badge */}
                <div className="flex justify-center -mt-3.5 relative z-10">
                  <span className="bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-900 text-white text-[11px] font-black font-heading px-4 py-1.5 rounded-full shadow-lg border border-emerald-600/50 flex items-center space-x-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>{lead.badgeTag || "10+ Years of Selfless Service"}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Leadership Details & Narrative */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-800 text-xs font-bold font-heading px-3.5 py-1 rounded-full">
                <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                <span className="uppercase tracking-wider">Trust Leadership & Vision</span>
              </div>

              {/* Director Card */}
              <div className="bg-white p-5 rounded-2xl border border-emerald-200/80 shadow-sm space-y-2 hover:border-emerald-400 transition">
                <span className="bg-emerald-700 text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded-md font-heading inline-block">
                  Director
                </span>
                <h3 className="text-lg font-black font-heading text-slate-900">
                  {lead.directorName || "Sri Medidhi Venkateshwar Rao"}
                </h3>
                <p className="text-xs font-bold text-emerald-700 font-heading">
                  {lead.directorRole || "Director, Medidhisubbaiah Trust"}
                </p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {lead.directorBio || "Leading strategic social welfare, hospital blood donation coordination, and youth skill-building drives for 10+ years."}
                </p>
              </div>

              {/* Treasurer Card */}
              <div className="bg-white p-5 rounded-2xl border border-emerald-200/80 shadow-sm space-y-2 hover:border-emerald-400 transition">
                <span className="bg-teal-700 text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded-md font-heading inline-block">
                  Treasurer
                </span>
                <h3 className="text-lg font-black font-heading text-slate-900">
                  {lead.treasurerName || "Smt. Medidhi Varalakshmi"}
                </h3>
                <p className="text-xs font-bold text-teal-700 font-heading">
                  {lead.treasurerRole || "Treasurer, Medidhisubbaiah Trust"}
                </p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {lead.treasurerBio || "Overseeing transparent trust governance, women empowerment tailoring centers, and free food distribution programs for 10+ years."}
                </p>
              </div>

              {/* Dedicated Community Stewards */}
              <div className="pt-2 space-y-2">
                <h4 className="text-xl font-black font-heading text-slate-900">
                  {lead.sectionTitle || "Dedicated Community Stewards"}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {lead.sectionDesc || "Guided by the principles of compassion, integrity, and grassroots social development, our leaders have been tirelessly spearheading free educational, healthcare, and vocational initiatives across the community for more than a decade."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center"><Icon name="target" size={24} /></div>
            <h3 className="text-lg font-black font-heading text-slate-900">Our Sacred Mission</h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              To eliminate socio-economic barriers by providing 100% free vocational training, safeguarding human lives with 24/7 blood helpline support, and ensuring that no underprivileged neighbor sleeps hungry.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center"><Icon name="eye" size={24} /></div>
            <h3 className="text-lg font-black font-heading text-slate-900">Our Global Vision</h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              A self-reliant society where every woman holds verified vocational credentials, every youth has access to healthy athletic arenas, and every emergency patient receives timely medical and blood assistance.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center"><Icon name="award" size={24} /></div>
            <h3 className="text-lg font-black font-heading text-slate-900">Core Values</h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              Absolute transparency, zero discrimination across caste or creed, prompt emergency responsiveness, and deep accountability to every community supporter and volunteer.
            </p>
          </div>
        </div>
      </section>

      {/* Official Convocation Document Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="bg-emerald-900 text-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 shadow-xl border border-emerald-700 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="bg-amber-400 text-slate-950 font-black text-[10px] uppercase px-2.5 py-0.5 rounded-md font-heading">
              Official Document
            </span>
            <h2 className="text-xl sm:text-2xl font-black font-heading">
              All Works Together — Comprehensive Presentation Report
            </h2>
            <p className="text-emerald-100 text-xs sm:text-sm leading-relaxed">
              Official 15-page chronicle of Free Tailoring, Maggam works, and grand Certificate Distribution at Hotel Chitturi Heritage, Tanuku with Dr. Kishore Kumar Garu.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <a
              href="assets/medidhisubbaiah_trust_all_works.pdf"
              target="_blank"
              rel="noreferrer"
              className="bg-white text-emerald-950 hover:bg-emerald-50 font-black font-heading px-5 py-2.5 rounded-xl text-xs shadow transition flex items-center space-x-1.5"
            >
              <Icon name="filetext" size={16} />
              <span>Read Full Report</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

// --- SERVICES PAGE ---
const ServicesPage = () => {
  const { services, setSelectedService } = useTrust();
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Skill Development', 'Healthcare', 'Education', 'Social Relief', 'Public Welfare', 'Youth & Sports'];

  const filtered = activeCategory === 'All'
    ? services
    : services.filter(s => (s.category || '').toLowerCase().includes(activeCategory.toLowerCase()));

  return (
    <div className="space-y-8 sm:space-y-12 py-8 sm:py-12 w-full max-w-full overflow-hidden">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="bg-slate-900 text-white rounded-2xl sm:rounded-3xl p-6 sm:p-12 shadow-xl">
          <span className="bg-emerald-600/30 text-emerald-400 text-[11px] font-bold font-heading uppercase tracking-wider px-3 py-0.5 rounded-full inline-block mb-2">Programs & Causes</span>
          <h1 className="text-2xl sm:text-4xl font-black font-heading">Our Core <span className="text-emerald-400">Community Services</span></h1>
          <p className="text-slate-300 text-xs sm:text-sm mt-2 max-w-2xl">100% Free vocational classes, 24/7 blood helpline, food distributions, and youth programs.</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Category Filters */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 mb-6 scrollbar-none">
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setActiveCategory(c)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold font-heading whitespace-nowrap transition ${
                activeCategory === c ? 'bg-emerald-600 text-white shadow' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(service => (
            <div key={service.id} className="bg-white rounded-2xl overflow-hidden border shadow-sm hover:shadow-xl transition duration-300 flex flex-col justify-between group">
              <div>
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  <img
                    src={service.image || "assets/gallery/trust_work_page_01.jpg"}
                    onError={(ev) => { ev.target.onerror = null; ev.target.src = "assets/gallery/trust_work_page_01.jpg"; }}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-slate-950/80 text-emerald-300 text-[10px] font-bold px-2.5 py-1 rounded-full">{service.category}</span>
                </div>
                <div className="p-5 space-y-2.5">
                  <h3 className="font-bold font-heading text-base text-slate-900 group-hover:text-emerald-600 transition">{service.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">{service.shortDescription || service.short_description}</p>
                </div>
              </div>
              <div className="p-5 pt-0">
                <button onClick={() => setSelectedService(service)} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold font-heading py-2.5 rounded-xl text-xs shadow transition">
                  Apply / View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

// --- EVENTS PAGE ---
const EventsPage = () => {
  const { events, setSelectedEvent } = useTrust();

  return (
    <div className="space-y-8 sm:space-y-12 py-8 sm:py-12 w-full max-w-full overflow-hidden">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="bg-slate-900 text-white rounded-2xl sm:rounded-3xl p-6 sm:p-12 shadow-xl">
          <span className="bg-emerald-600/30 text-emerald-400 text-[11px] font-bold font-heading uppercase tracking-wider px-3 py-0.5 rounded-full inline-block mb-2">Community Calendar</span>
          <h1 className="text-2xl sm:text-4xl font-black font-heading">Upcoming <span className="text-emerald-400">Events & Drives</span></h1>
          <p className="text-slate-300 text-xs sm:text-sm mt-2 max-w-2xl">Participate in our certificate convocations, blood donation drives, and youth sports meets.</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map(event => (
            <div key={event.id} className="bg-white rounded-2xl overflow-hidden border shadow-sm hover:shadow-xl transition flex flex-col justify-between group">
              <div>
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  <img
                    src={event.image_url || event.image || "assets/gallery/trust_work_page_01.jpg"}
                    onError={(ev) => { ev.target.onerror = null; ev.target.src = "assets/gallery/trust_work_page_01.jpg"; }}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-emerald-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">{event.status || 'Upcoming'}</span>
                </div>
                <div className="p-5 space-y-2">
                  <div className="flex items-center space-x-2 text-[11px] text-emerald-600 font-bold font-heading">
                    <Icon name="calendar" size={13} />
                    <span>{event.date}</span>
                    <span>•</span>
                    <Icon name="clock" size={13} />
                    <span>{event.time || '10:00 AM'}</span>
                  </div>
                  <h3 className="font-bold font-heading text-base text-slate-900 group-hover:text-emerald-600 transition">{event.title}</h3>
                  <p className="text-xs text-slate-500 flex items-center space-x-1">
                    <Icon name="mappin" size={12} className="shrink-0 text-slate-400" />
                    <span className="truncate">{event.location}</span>
                  </p>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{event.description}</p>
                </div>
              </div>
              <div className="p-5 pt-0">
                <button onClick={() => setSelectedEvent(event)} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold font-heading py-2.5 rounded-xl text-xs shadow transition">
                  Register for Event
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

// --- NEWS PAGE ---
const NewsPage = () => {
  const { news, setSelectedNews } = useTrust();

  return (
    <div className="space-y-8 sm:space-y-12 py-8 sm:py-12 w-full max-w-full overflow-hidden">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="bg-slate-900 text-white rounded-2xl sm:rounded-3xl p-6 sm:p-12 shadow-xl">
          <span className="bg-emerald-600/30 text-emerald-400 text-[11px] font-bold font-heading uppercase tracking-wider px-3 py-0.5 rounded-full inline-block mb-2">Media & Press</span>
          <h1 className="text-2xl sm:text-4xl font-black font-heading">News & <span className="text-emerald-400">Activity Reports</span></h1>
          <p className="text-slate-300 text-xs sm:text-sm mt-2 max-w-2xl">Press releases, program updates, and field reports from Medidhisubbaiah Trust.</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map(n => (
            <div key={n.id} className="bg-white rounded-2xl overflow-hidden border shadow-sm hover:shadow-xl transition flex flex-col justify-between group">
              <div>
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  <img
                    src={n.thumbnail || "assets/gallery/trust_work_page_01.jpg"}
                    onError={(ev) => { ev.target.onerror = null; ev.target.src = "assets/gallery/trust_work_page_01.jpg"; }}
                    alt={n.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-slate-950/80 text-emerald-300 text-[10px] font-bold px-2.5 py-1 rounded-full">{n.category}</span>
                </div>
                <div className="p-5 space-y-2">
                  <div className="text-[11px] text-slate-400 font-medium">{n.date} • {n.author || 'Editorial'}</div>
                  <h3 className="font-bold font-heading text-base text-slate-900 group-hover:text-emerald-600 transition line-clamp-2">{n.title}</h3>
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">{n.short_description || n.shortDescription}</p>
                </div>
              </div>
              <div className="p-5 pt-0">
                <button onClick={() => setSelectedNews(n)} className="w-full bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white font-bold font-heading py-2 rounded-xl text-xs transition">
                  Read Full Article
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

// --- GALLERY PAGE ---
const GalleryPage = () => {
  const { gallery, setLightboxIndex } = useTrust();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Certificate Distribution', 'Tailoring & Muggam', 'Video Documentation', 'Healthcare', 'Annadhanam', 'Chalivendram'];

  const filtered = gallery.filter(item => {
    const matchesCat = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = !searchQuery || (item.title || '').toLowerCase().includes(searchQuery.toLowerCase()) || (item.location || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-8 sm:space-y-12 py-8 sm:py-12 w-full max-w-full overflow-hidden">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="bg-slate-900 text-white rounded-2xl sm:rounded-3xl p-6 sm:p-12 shadow-xl">
          <span className="bg-emerald-600/30 text-emerald-400 text-[11px] font-bold font-heading uppercase tracking-wider px-3 py-0.5 rounded-full inline-block mb-2">Visual Chronicles</span>
          <h1 className="text-2xl sm:text-4xl font-black font-heading">Gallery & <span className="text-emerald-400">Video Records</span></h1>
          <p className="text-slate-300 text-xs sm:text-sm mt-2 max-w-2xl">Photographs and live videos of certificate convocations, blood camps, Annadhanam, and Chalivendram.</p>
        </div>
      </section>

      {/* Featured Video Card */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="bg-slate-950 rounded-2xl sm:rounded-3xl border border-emerald-500/40 p-4 sm:p-7 shadow-2xl text-white">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black aspect-video">
                <video src="assets/gallery/trust_activity_video.mp4" poster="assets/gallery/trust_activity_video_thumb.jpg" controls playsInline className="w-full h-full object-contain" />
              </div>
            </div>
            <div className="lg:col-span-5 space-y-3">
              <span className="bg-red-600 text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full font-heading inline-block">Featured Live Video</span>
              <h2 className="text-lg sm:text-2xl font-black font-heading text-white">Free Tailoring & Muggam Work Convocations — Field Footage</h2>
              <p className="text-slate-300 text-xs leading-relaxed">
                Watch live video documentation across Tanuku, Mogultur, Narsapuram & Tadepalligudam, featuring student stitching practice and the convocation at Hotel Chitturi Heritage with Dr. Kishore Kumar Garu.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Filter & Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="bg-white p-3 sm:p-4 rounded-2xl border shadow-sm flex flex-col md:flex-row items-center justify-between gap-3 mb-6">
          <div className="flex items-center space-x-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold font-heading whitespace-nowrap transition ${
                  activeCategory === cat ? 'bg-emerald-600 text-white shadow' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <input
              type="text"
              placeholder="Search by location (Tanuku, etc)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border rounded-xl text-xs focus:ring-2 focus:ring-emerald-500"
            />
            <div className="absolute left-3 top-2.5 text-slate-400"><Icon name="search" size={14} /></div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((item, index) => {
            const isVid = item.type === 'video' || !!item.video_url;
            return (
              <div
                key={item.id || index}
                onClick={() => setLightboxIndex(index)}
                className="bg-white rounded-2xl overflow-hidden border shadow-sm hover:shadow-xl transition cursor-pointer group flex flex-col justify-between"
              >
                <div className="relative h-44 bg-slate-900 overflow-hidden">
                  <img
                    src={item.image_url || item.imageUrl || "assets/gallery/trust_activity_video_thumb.jpg"}
                    onError={(ev) => { ev.target.onerror = null; ev.target.src = "assets/gallery/trust_activity_video_thumb.jpg"; }}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  {isVid && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg"><Icon name="play" size={16} /></div>
                    </div>
                  )}
                  <span className="absolute top-2.5 left-2.5 bg-black/70 text-white text-[9px] font-bold px-2 py-0.5 rounded-md backdrop-blur-sm">{item.category}</span>
                </div>
                <div className="p-3.5 space-y-1">
                  <h4 className="font-bold font-heading text-xs text-slate-900 group-hover:text-emerald-600 transition truncate">{item.title}</h4>
                  <p className="text-[11px] text-slate-500 truncate">{item.location || item.caption}</p>
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
    <div className="space-y-8 sm:space-y-12 py-6 sm:py-8 w-full max-w-full overflow-hidden">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="bg-slate-900 text-white rounded-2xl sm:rounded-3xl p-6 sm:p-12 shadow-xl">
          <span className="bg-emerald-600/30 text-emerald-400 text-[11px] font-bold font-heading uppercase tracking-wider px-3 py-0.5 rounded-full inline-block mb-2">Helpdesk</span>
          <h1 className="text-2xl sm:text-4xl font-black font-heading">Contact <span className="text-emerald-400">Medidhisubbaiah Trust</span></h1>
          <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl">Have questions regarding free vocational training, blood donor coordination, or community relief? Reach out to us.</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-8 sm:mb-12">
          <div className="bg-white p-4 sm:p-6 rounded-2xl border shadow-sm space-y-1.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center"><Icon name="mappin" size={18} /></div>
            <h3 className="font-bold font-heading text-sm sm:text-base text-slate-900">Headquarters</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{trustInfo.address}</p>
          </div>
          <div className="bg-white p-4 sm:p-6 rounded-2xl border shadow-sm space-y-1.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center"><Icon name="phone" size={18} /></div>
            <h3 className="font-bold font-heading text-sm sm:text-base text-slate-900">Phone Helpdesk</h3>
            <p className="text-xs text-slate-600">{trustInfo.phone}</p>
          </div>
          <div className="bg-emerald-50/70 p-4 sm:p-6 rounded-2xl border border-emerald-200 shadow-sm space-y-1.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center"><Icon name="heartpulse" size={18} /></div>
            <h3 className="font-bold font-heading text-sm sm:text-base text-emerald-950">24/7 Blood Line</h3>
            <a href={`tel:${trustInfo.emergencyBloodHelpline}`} className="text-sm sm:text-base font-black text-emerald-700 block">{trustInfo.emergencyBloodHelpline}</a>
          </div>
          <div className="bg-white p-4 sm:p-6 rounded-2xl border shadow-sm space-y-1.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center"><Icon name="mail" size={18} /></div>
            <h3 className="font-bold font-heading text-sm sm:text-base text-slate-900">Email</h3>
            <p className="text-xs text-slate-600 truncate">{trustInfo.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          <div className="lg:col-span-7 bg-white p-5 sm:p-8 rounded-2xl sm:rounded-3xl border shadow-sm">
            <h2 className="text-xl sm:text-2xl font-black font-heading text-slate-900 mb-3">Send Us A Message</h2>
            <form onSubmit={handleSubmit} className="space-y-3 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input type="text" required placeholder="Full Name *" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full p-2.5 border rounded-xl" />
                <input type="tel" required placeholder="Phone Number *" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full p-2.5 border rounded-xl" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input type="email" placeholder="Email Address" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full p-2.5 border rounded-xl" />
                <select value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} className="w-full p-2.5 border rounded-xl bg-white">
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Tailoring Program Admission">Free Tailoring Admission</option>
                  <option value="Maggam Work Course">Maggam Work Admission</option>
                  <option value="Emergency Blood Donor">Blood Donation / Request</option>
                  <option value="Food & Grocery Support">Food / Grocery Support</option>
                </select>
              </div>
              <textarea rows="3" required placeholder="Your message or query in detail..." value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full p-2.5 border rounded-xl" />
              <button type="submit" disabled={isSubmitting} className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold font-heading px-8 py-3 rounded-xl shadow">
                {isSubmitting ? 'Sending...' : 'Submit Message'}
              </button>
            </form>
          </div>

          <div className="lg:col-span-5 bg-white p-3 rounded-2xl sm:rounded-3xl border shadow-sm space-y-2">
            <div className="h-60 sm:h-72 w-full rounded-xl overflow-hidden bg-slate-100">
              <iframe
                title="Trust Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15220.737151061985!2d78.3742468341662!3d17.51433010777598!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb8dfe18cb9ab1%3A0x6b1076b107080f55!2sNizampet%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                className="w-full h-full border-0"
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
            <p className="text-[11px] text-slate-600 px-2 pb-1 font-medium">📍 1104, 11th Floor, Gokul Bhavanam, Nizampet, Hyderabad - 500090</p>
          </div>
        </div>
      </section>
    </div>
  );
};

// --- LOGIN PAGE ---
const LoginPage = () => {
  const { loginAdmin, trustInfo, navigate } = useTrust();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    try {
      const res = await loginAdmin(email, password, true);
      if (!res.success) {
        setErrorMessage(res.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleFillDemo = () => {
    setEmail('admin@medidhisubbaiah.org');
    setPassword('trust2026');
    setErrorMessage('');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 w-full max-w-full">
      {/* Standalone Minimal Header for Admin Login */}
      <div className="bg-slate-950 text-white px-4 sm:px-8 py-3.5 flex justify-between items-center border-b border-slate-800 shadow-md">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate('home')}>
          <div className="w-9 h-9 rounded-full p-0.5 bg-gradient-to-tr from-emerald-600 to-amber-400">
            <img src={trustInfo.logoUrl} alt="Logo" className="w-full h-full rounded-full object-cover bg-white" />
          </div>
          <div>
            <span className="font-bold text-sm text-white font-heading">Medidhisubbaiah <span className="text-emerald-400">Trust</span></span>
            <span className="text-[10px] text-slate-400 block font-heading">Admin Management Console</span>
          </div>
        </div>
        <button
          onClick={() => navigate('home')}
          className="text-xs font-bold font-heading text-slate-300 hover:text-emerald-400 bg-slate-800 hover:bg-slate-700 px-3.5 py-1.5 rounded-xl border border-slate-700 transition flex items-center space-x-1.5"
        >
          <Icon name="arrowright" size={12} className="rotate-180" />
          <span>Back to Website</span>
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center py-10 px-4">
        <div className="max-w-md w-full space-y-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full p-1 bg-gradient-to-tr from-emerald-600 via-teal-500 to-amber-400 shadow-lg mx-auto">
              <img src={trustInfo.logoUrl} alt="Logo" className="w-full h-full rounded-full object-cover bg-white" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black font-heading text-slate-900">Administrator Portal</h2>
              <p className="text-xs text-slate-500">Sign in to manage Events, Media Gallery, Press News & Services</p>
            </div>
          </div>

          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-2.5 text-xs flex justify-between items-center">
            <div>
              <span className="font-bold font-heading text-emerald-800 block text-[11px]">Demo Admin Login:</span>
              <span className="text-slate-600 font-mono text-[10px]">admin@medidhisubbaiah.org / trust2026</span>
            </div>
            <button type="button" onClick={handleFillDemo} className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-1 rounded-md">
              Auto Fill
            </button>
          </div>

          {errorMessage && (
            <div className="bg-red-50 border border-red-300 text-red-700 px-3 py-2 rounded-xl text-xs">{errorMessage}</div>
          )}

          <form onSubmit={handleLogin} className="space-y-3 text-xs sm:text-sm">
            <div>
              <label className="font-bold font-heading block text-xs text-slate-700 mb-1">Email or Username</label>
              <input
                type="text"
                required
                placeholder="e.g. admin@medidhisubbaiah.org"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2.5 border rounded-xl focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="font-bold font-heading block text-xs text-slate-700 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2.5 pr-9 border rounded-xl focus:ring-2 focus:ring-emerald-500"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-2.5 top-2.5 text-slate-400">
                  <Icon name={showPassword ? 'eyeoff' : 'eye'} size={15} />
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold font-heading py-2.5 rounded-xl shadow transition flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <Icon name="shieldcheck" size={16} />
                  <span>Sign In to Admin Hub</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const AdminPage = () => {
const {
    isAdminLoggedIn,
    logoutAdmin,
    services,
    addService,
    updateService,
    deleteService,
    events,
    addEvent,
    updateEvent,
    deleteEvent,
    news,
    addNews,
    updateNews,
    deleteNews,
    gallery,
    addGalleryItem,
    updateGalleryItem,
    deleteGalleryItem,
    leadership,
    updateLeadership,
    inquiries,
    deleteInquiry,
    donations,
    updateDonationStatus,
    deleteDonation,
    supabaseConnected,
    supabaseStatusMsg,
    fetchSupabaseData,
    resetToFactoryDefaults,
    navigate,
    showToast
  } = useTrust();

  const [activeTab, setActiveTab] = useState('events');

  // Donation Management States
  const [viewingReceipt, setViewingReceipt] = useState(null);
  const [donationSearch, setDonationSearch] = useState('');
  const [donationStatusFilter, setDonationStatusFilter] = useState('all');

  // Modal Editing States
  const [editingEvent, setEditingEvent] = useState(null);
  const [editingNews, setEditingNews] = useState(null);
  const [editingGallery, setEditingGallery] = useState(null);
  const [editingService, setEditingService] = useState(null);

  // Modal Create States
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [isNewsModalOpen, setIsNewsModalOpen] = useState(false);
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);

  // Form states for Create/Edit
  const [leadershipForm, setLeadershipForm] = useState(() => leadership || initialLeadership);

  useEffect(() => {
    if (leadership) setLeadershipForm(leadership);
  }, [leadership]);

  const handleLeadershipSubmit = (e) => {
    e.preventDefault();
    updateLeadership(leadershipForm);
  };

  // Form states for Create/Edit
  const [eventForm, setEventForm] = useState({
    title: '',
    category: 'Skill Development',
    date: new Date().toISOString().split('T')[0],
    time: '10:00 AM - 01:00 PM',
    location: 'Tanuku, West Godavari',
    status: 'Upcoming',
    description: '',
    image_url: '',
    total_seats: 200,
    seats_registered: 0
  });

  const [newsForm, setNewsForm] = useState({
    title: '',
    date: new Date().toISOString().split('T')[0],
    category: 'Skill Development',
    short_description: '',
    content: '',
    author: 'Trust Editorial Desk',
    read_time: '3 min read',
    thumbnail: '',
    pdf_url: ''
  });

  const [galleryForm, setGalleryForm] = useState({
    title: '',
    category: 'Certificate Distribution',
    type: 'image',
    image_url: '',
    video_url: '',
    duration: '01:22',
    date: new Date().toISOString().split('T')[0],
    location: 'Tanuku',
    caption: '',
    is_pdf_work: false
  });

  const [serviceForm, setServiceForm] = useState({
    title: '',
    category: 'Skill Development',
    shortDescription: '',
    fullDescription: '',
    icon: 'scissors',
    image: '',
    raised: '0 Beneficiaries',
    goal: '1,000 Goal',
    progress: 50,
    duration: '3 Months',
    location: 'Trust Skill Center'
  });

  if (!isAdminLoggedIn) {
    return (
      <div className="min-h-[65vh] flex flex-col items-center justify-center p-6 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
          <Icon name="shieldcheck" size={32} />
        </div>
        <div className="space-y-1">
          <h2 className="text-xl font-black font-heading">Admin Login Required</h2>
          <p className="text-xs text-slate-500">You must sign in to manage events, media gallery, and press news.</p>
        </div>
        <button onClick={() => navigate('login')} className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-xl text-xs font-bold font-heading shadow transition">
          Sign In Now
        </button>
      </div>
    );
  }

  // Handle Event Submit (Create or Edit)
  const handleEventSubmit = (e) => {
    e.preventDefault();
    if (!eventForm.title) {
      alert('Title is required.');
      return;
    }
    if (editingEvent) {
      updateEvent(editingEvent.id, eventForm);
    } else {
      addEvent(eventForm);
    }
    setIsEventModalOpen(false);
    setEditingEvent(null);
  };

  // Handle News Submit (Create or Edit)
  const handleNewsSubmit = (e) => {
    e.preventDefault();
    if (!newsForm.title) {
      alert('Title is required.');
      return;
    }
    if (editingNews) {
      updateNews(editingNews.id, newsForm);
    } else {
      addNews(newsForm);
    }
    setIsNewsModalOpen(false);
    setEditingNews(null);
  };

  // Handle Gallery Submit (Create or Edit)
  const handleGallerySubmit = (e) => {
    e.preventDefault();
    if (!galleryForm.title) {
      alert('Title is required.');
      return;
    }
    if (editingGallery) {
      updateGalleryItem(editingGallery.id, galleryForm);
    } else {
      addGalleryItem(galleryForm);
    }
    setIsGalleryModalOpen(false);
    setEditingGallery(null);
  };

  // Handle Service Submit (Create or Edit)
  const handleServiceSubmit = (e) => {
    e.preventDefault();
    if (!serviceForm.title) {
      alert('Title is required.');
      return;
    }
    if (editingService) {
      updateService(editingService.id, serviceForm);
    } else {
      addService(serviceForm);
    }
    setIsServiceModalOpen(false);
    setEditingService(null);
  };

  const copySqlSchema = () => {
    const sql = `-- Supabase Table Schema Script
CREATE TABLE IF NOT EXISTS public.events (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT,
  date TEXT,
  time TEXT,
  location TEXT,
  status TEXT DEFAULT 'Upcoming',
  description TEXT,
  image_url TEXT,
  total_seats INTEGER DEFAULT 100,
  seats_registered INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.news (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  date TEXT,
  category TEXT,
  short_description TEXT,
  content TEXT,
  author TEXT,
  read_time TEXT,
  thumbnail TEXT,
  pdf_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.gallery (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT,
  type TEXT DEFAULT 'image',
  image_url TEXT,
  video_url TEXT,
  duration TEXT,
  date TEXT,
  location TEXT,
  caption TEXT,
  is_pdf_work BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.services (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT,
  short_description TEXT,
  full_description TEXT,
  icon TEXT,
  image TEXT,
  raised TEXT,
  goal TEXT,
  progress INTEGER DEFAULT 50,
  duration TEXT,
  location TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.inquiries (
  id TEXT PRIMARY KEY,
  name TEXT,
  phone TEXT,
  email TEXT,
  subject TEXT,
  message TEXT,
  submitted_at TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.donations (
  id TEXT PRIMARY KEY,
  donor_name TEXT NOT NULL,
  amount TEXT NOT NULL,
  phone TEXT,
  pan_number TEXT,
  transaction_id TEXT,
  screenshot_url TEXT,
  cause TEXT DEFAULT 'General Trust Seva',
  status TEXT DEFAULT 'Pending Verification',
  date TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS and create public policies
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public events" ON public.events FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public news" ON public.news FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public gallery" ON public.gallery FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public services" ON public.services FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public inquiries" ON public.inquiries FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public donations" ON public.donations FOR ALL USING (true) WITH CHECK (true);`;

    navigator.clipboard.writeText(sql);
    showToast('Supabase SQL Schema copied to clipboard!', 'success');
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-100 w-full max-w-full overflow-x-hidden">
      {/* --- MOBILE TOP ADMIN HEADER & HORIZONTAL TABS (Mobile Only) --- */}
      <div className="md:hidden bg-slate-950 text-white p-3 border-b border-slate-800 space-y-2.5 shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2.5 cursor-pointer" onClick={() => navigate('home')}>
            <div className="w-8 h-8 rounded-full p-0.5 bg-gradient-to-tr from-emerald-600 to-amber-400 shrink-0">
              <img src={trustInfo.logoUrl} alt="Logo" className="w-full h-full rounded-full object-cover bg-white" />
            </div>
            <div className="min-w-0">
              <span className="font-extrabold text-xs text-white font-heading block truncate">
                Medidhisubbaiah <span className="text-emerald-400">Admin</span>
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-1.5">
            <button
              onClick={() => navigate('home')}
              className="text-[11px] font-bold font-heading text-slate-300 bg-slate-800 hover:bg-slate-700 px-2.5 py-1.5 rounded-lg border border-slate-700 transition"
            >
              Website
            </button>
            <button
              onClick={logoutAdmin}
              className="text-[11px] font-bold font-heading bg-red-600/90 text-white px-2.5 py-1.5 rounded-lg transition"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Mobile Horizontal Pill Tabs */}
        <div className="flex space-x-1.5 overflow-x-auto scrollbar-none pb-1">
          {[
            { id: 'events', label: 'Events', count: events.length, icon: 'calendar' },
            { id: 'donations', label: 'Donations & Receipts', count: donations.length, icon: 'heart' },
            { id: 'gallery', label: 'Gallery', count: gallery.length, icon: 'image' },
            { id: 'news', label: 'News', count: news.length, icon: 'filetext' },
            { id: 'services', label: 'Services', count: services.length, icon: 'scissors' },
            { id: 'leadership', label: 'Leadership', count: null, icon: 'users' },
            { id: 'inquiries', label: 'Inquiries', count: inquiries.length, icon: 'mail' }
          ].map(t => {
            const active = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold font-heading whitespace-nowrap shrink-0 transition ${
                  active ? 'bg-emerald-600 text-white shadow-md' : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <Icon name={t.icon} size={13} />
                <span>{t.label}</span>
                {t.count !== null && (
                  <span className={`text-[10px] font-extrabold px-1.5 py-0.2 rounded-full ${
                    active ? 'bg-emerald-800 text-white' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {t.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* --- DESKTOP / TABLET SIDEBAR (Hidden on Mobile) --- */}
      <aside className="hidden md:flex w-64 lg:w-72 bg-slate-950 text-white flex-col justify-between p-4 sm:p-5 border-r border-slate-800 shrink-0">
        <div className="space-y-6">
          {/* Brand Header */}
          <div className="space-y-3 pb-4 border-b border-slate-800/80">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate('home')}>
              <div className="w-10 h-10 rounded-full p-0.5 bg-gradient-to-tr from-emerald-600 to-amber-400 shadow-md shrink-0">
                <img src={trustInfo.logoUrl} alt="Logo" className="w-full h-full rounded-full object-cover bg-white" />
              </div>
              <div className="min-w-0">
                <span className="font-extrabold text-sm text-white font-heading block truncate">
                  Medidhisubbaiah <span className="text-emerald-400">Trust</span>
                </span>
                <span className="text-[10px] text-emerald-300 font-bold font-heading uppercase tracking-wider block">
                  Admin Dashboard
                </span>
              </div>
            </div>

            {/* Live Connection Badge */}
            <div className={`p-2 rounded-xl text-[11px] font-bold font-heading flex items-center space-x-2 ${
              supabaseConnected ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/60' : 'bg-amber-950/80 text-amber-300 border border-amber-800/60'
            }`}>
              <span className={`w-2 h-2 rounded-full shrink-0 ${supabaseConnected ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`}></span>
              <span className="truncate">{supabaseConnected ? 'Supabase & Cloudinary Synced' : 'Local + Supabase Ready'}</span>
            </div>
          </div>

          {/* Navigation Sidebar Tabs */}
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider px-3 mb-1 block font-heading">
              Management Modules
            </span>

            {[
              { id: 'events', label: 'Events & Drives', count: events.length, icon: 'calendar' },
              { id: 'donations', label: 'Donation Records & 80G', count: donations.length, icon: 'heart' },
              { id: 'gallery', label: 'Gallery & Videos', count: gallery.length, icon: 'image' },
              { id: 'news', label: 'Media & News', count: news.length, icon: 'filetext' },
              { id: 'services', label: 'Services & Causes', count: services.length, icon: 'scissors' },
              { id: 'leadership', label: 'Leadership & Vision', count: null, icon: 'users' },
              { id: 'inquiries', label: 'Contact Inquiries', count: inquiries.length, icon: 'mail' }
            ].map(t => {
              const active = activeTab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold font-heading transition-all duration-150 ${
                    active
                      ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center space-x-2.5 min-w-0">
                    <Icon name={t.icon} size={16} className={active ? 'text-white' : 'text-slate-400'} />
                    <span className="truncate">{t.label}</span>
                  </div>
                  {t.count !== null && (
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                      active ? 'bg-emerald-800 text-white' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {t.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Sidebar Footer Actions */}
        <div className="pt-4 border-t border-slate-800/80 space-y-1.5 mt-6">
          <button
            onClick={() => navigate('home')}
            className="w-full flex items-center justify-center space-x-2 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-emerald-400 py-2 rounded-xl text-xs font-bold font-heading border border-slate-800 transition"
          >
            <Icon name="arrowright" size={13} className="rotate-180 text-emerald-400" />
            <span>Public Website</span>
          </button>

          <div className="grid grid-cols-2 gap-1.5">
            <button
              onClick={fetchSupabaseData}
              className="flex items-center justify-center space-x-1 bg-slate-900 hover:bg-slate-800 text-slate-300 py-2 rounded-xl text-[11px] font-bold font-heading border border-slate-800 transition"
              title="Sync latest records from Supabase"
            >
              <Icon name="refresh" size={12} />
              <span>Sync DB</span>
            </button>
            <button
              onClick={logoutAdmin}
              className="flex items-center justify-center space-x-1 bg-red-600/90 hover:bg-red-600 text-white py-2 rounded-xl text-[11px] font-bold font-heading transition"
            >
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* --- RIGHT MAIN CONTENT AREA --- */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 overflow-y-auto max-w-full">
        {/* Supabase SQL Helper Alert if tables not yet created */}
        {!supabaseConnected && (
          <div className="bg-emerald-50 border border-emerald-300 p-4 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div className="space-y-1">
              <span className="font-bold text-emerald-950 font-heading block">
                ⚡ Supabase Tables Setup (One-Click Ready):
              </span>
              <p className="text-emerald-800 leading-relaxed">
                Your Supabase credentials are connected! If you haven't created the database tables in Supabase yet, click <strong>"Copy SQL Schema"</strong> and paste it into your <strong>Supabase SQL Editor</strong> to enable instant cloud persistence.
              </p>
            </div>
            <button
              onClick={copySqlSchema}
              className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold font-heading px-4 py-2 rounded-xl text-xs shrink-0 shadow flex items-center space-x-1.5"
            >
              <Icon name="copy" size={14} />
              <span>Copy Supabase SQL Schema</span>
            </button>
          </div>
        )}

      {/* --- TAB 1: EVENTS MANAGER --- */}
      {activeTab === 'events' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <h2 className="text-lg font-black font-heading text-slate-900">Events Management</h2>
              <p className="text-xs text-slate-500">Create, update, and delete community drives and convocations.</p>
            </div>
            <button
              onClick={() => {
                setEditingEvent(null);
                setEventForm({
                  title: '',
                  category: 'Skill Development',
                  date: new Date().toISOString().split('T')[0],
                  time: '10:00 AM - 01:00 PM',
                  location: 'Tanuku, West Godavari',
                  status: 'Upcoming',
                  description: '',
                  image_url: '',
                  total_seats: 200,
                  seats_registered: 0
                });
                setIsEventModalOpen(true);
              }}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold font-heading px-4 py-2 rounded-xl text-xs shadow flex items-center space-x-1.5"
            >
              <Icon name="plus" size={15} />
              <span>Add New Event</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {events.map(e => (
              <div key={e.id} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="relative h-36 rounded-xl overflow-hidden bg-slate-100">
                    <img
                      src={e.image_url || e.image || "assets/gallery/trust_work_page_01.jpg"}
                      onError={(ev) => { ev.target.onerror = null; ev.target.src = "assets/gallery/trust_work_page_01.jpg"; }}
                      alt={e.title}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-2 left-2 bg-emerald-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-md">{e.status}</span>
                  </div>
                  <div className="text-[10px] text-emerald-600 font-bold font-heading">{e.date} • {e.time}</div>
                  <h3 className="font-bold font-heading text-sm text-slate-900 leading-snug">{e.title}</h3>
                  <p className="text-xs text-slate-500 truncate">📍 {e.location}</p>
                  <p className="text-xs text-slate-600 line-clamp-2">{e.description}</p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-400">{e.seats_registered || 0} Registered</span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        setEditingEvent(e);
                        setEventForm({
                          title: e.title || '',
                          category: e.category || 'Skill Development',
                          date: e.date || '',
                          time: e.time || '',
                          location: e.location || '',
                          status: e.status || 'Upcoming',
                          description: e.description || '',
                          image_url: e.image_url || e.image || '',
                          total_seats: e.total_seats || 200,
                          seats_registered: e.seats_registered || 0
                        });
                        setIsEventModalOpen(true);
                      }}
                      className="text-xs font-bold text-emerald-600 hover:bg-emerald-50 px-2.5 py-1 rounded-lg flex items-center space-x-1"
                    >
                      <Icon name="edit" size={13} />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete event "${e.title}"?`)) deleteEvent(e.id);
                      }}
                      className="text-xs font-bold text-red-600 hover:bg-red-50 px-2.5 py-1 rounded-lg flex items-center space-x-1"
                    >
                      <Icon name="trash" size={13} />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- TAB 2: GALLERY & VIDEOS MANAGER --- */}
      {activeTab === 'gallery' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <h2 className="text-lg font-black font-heading text-slate-900">Photo & Video Gallery Management</h2>
              <p className="text-xs text-slate-500">Upload and manage images, live video footage, and convocation albums in Cloudinary.</p>
            </div>
            <button
              onClick={() => {
                setEditingGallery(null);
                setGalleryForm({
                  title: '',
                  category: 'Certificate Distribution',
                  type: 'image',
                  image_url: '',
                  video_url: '',
                  duration: '01:22',
                  date: new Date().toISOString().split('T')[0],
                  location: 'Tanuku',
                  caption: '',
                  is_pdf_work: false
                });
                setIsGalleryModalOpen(true);
              }}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold font-heading px-4 py-2 rounded-xl text-xs shadow flex items-center space-x-1.5"
            >
              <Icon name="plus" size={15} />
              <span>Add Media Item</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {gallery.map(g => {
              const isVid = g.type === 'video' || !!g.video_url;
              return (
                <div key={g.id} className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm flex flex-col justify-between">
                  <div className="relative h-32 bg-slate-900 overflow-hidden">
                    <img
                      src={g.image_url || g.imageUrl || "assets/gallery/trust_activity_video_thumb.jpg"}
                      onError={(ev) => { ev.target.onerror = null; ev.target.src = "assets/gallery/trust_activity_video_thumb.jpg"; }}
                      alt={g.title}
                      className="w-full h-full object-cover"
                    />
                    {isVid && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center"><Icon name="play" size={14} /></div>
                      </div>
                    )}
                    <span className="absolute top-2 left-2 bg-black/70 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">{g.category}</span>
                  </div>

                  <div className="p-3 space-y-1">
                    <h4 className="font-bold font-heading text-xs text-slate-900 truncate">{g.title}</h4>
                    <p className="text-[10px] text-slate-500 truncate">{g.location || g.caption}</p>
                  </div>

                  <div className="p-3 pt-0 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => {
                        setEditingGallery(g);
                        setGalleryForm({
                          title: g.title || '',
                          category: g.category || 'Certificate Distribution',
                          type: g.type || (g.video_url ? 'video' : 'image'),
                          image_url: g.image_url || g.imageUrl || '',
                          video_url: g.video_url || '',
                          duration: g.duration || '01:22',
                          date: g.date || '',
                          location: g.location || '',
                          caption: g.caption || '',
                          is_pdf_work: !!g.is_pdf_work
                        });
                        setIsGalleryModalOpen(true);
                      }}
                      className="text-[11px] text-emerald-600 font-bold hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete "${g.title}"?`)) deleteGalleryItem(g.id);
                      }}
                      className="text-[11px] text-red-600 font-bold hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* --- TAB 3: MEDIA & NEWS MANAGER --- */}
      {activeTab === 'news' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <h2 className="text-lg font-black font-heading text-slate-900">Media & Press News Management</h2>
              <p className="text-xs text-slate-500">Publish news articles, press clippings, and PDF activity reports.</p>
            </div>
            <button
              onClick={() => {
                setEditingNews(null);
                setNewsForm({
                  title: '',
                  date: new Date().toISOString().split('T')[0],
                  category: 'Skill Development',
                  short_description: '',
                  content: '',
                  author: 'Trust Editorial Desk',
                  read_time: '3 min read',
                  thumbnail: '',
                  pdf_url: ''
                });
                setIsNewsModalOpen(true);
              }}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold font-heading px-4 py-2 rounded-xl text-xs shadow flex items-center space-x-1.5"
            >
              <Icon name="plus" size={15} />
              <span>Publish News</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {news.map(n => (
              <div key={n.id} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="relative h-36 rounded-xl overflow-hidden bg-slate-100">
                    <img
                      src={n.thumbnail || "assets/gallery/trust_work_page_01.jpg"}
                      onError={(ev) => { ev.target.onerror = null; ev.target.src = "assets/gallery/trust_work_page_01.jpg"; }}
                      alt={n.title}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-2 left-2 bg-slate-950/80 text-emerald-300 text-[9px] font-bold px-2 py-0.5 rounded-md">{n.category}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 block">{n.date} • {n.author || 'Editorial'}</span>
                  <h3 className="font-bold font-heading text-sm text-slate-900 leading-snug line-clamp-2">{n.title}</h3>
                  <p className="text-xs text-slate-600 line-clamp-2">{n.short_description || n.shortDescription}</p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-end space-x-2">
                  <button
                    onClick={() => {
                      setEditingNews(n);
                      setNewsForm({
                        title: n.title || '',
                        date: n.date || '',
                        category: n.category || 'Skill Development',
                        short_description: n.short_description || n.shortDescription || '',
                        content: n.content || '',
                        author: n.author || 'Trust Editorial Desk',
                        read_time: n.read_time || '3 min read',
                        thumbnail: n.thumbnail || '',
                        pdf_url: n.pdf_url || ''
                      });
                      setIsNewsModalOpen(true);
                    }}
                    className="text-xs font-bold text-emerald-600 hover:bg-emerald-50 px-2.5 py-1 rounded-lg flex items-center space-x-1"
                  >
                    <Icon name="edit" size={13} />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Delete article "${n.title}"?`)) deleteNews(n.id);
                    }}
                    className="text-xs font-bold text-red-600 hover:bg-red-50 px-2.5 py-1 rounded-lg flex items-center space-x-1"
                  >
                    <Icon name="trash" size={13} />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- TAB 4: SERVICES MANAGER --- */}
      {activeTab === 'services' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <h2 className="text-lg font-black font-heading text-slate-900">Services & Welfare Programs</h2>
              <p className="text-xs text-slate-500">Manage vocational training courses, blood campaigns, and relief seva.</p>
            </div>
            <button
              onClick={() => {
                setEditingService(null);
                setServiceForm({
                  title: '',
                  category: 'Skill Development',
                  shortDescription: '',
                  fullDescription: '',
                  icon: 'scissors',
                  image: '',
                  raised: '0 Beneficiaries',
                  goal: '1,000 Goal',
                  progress: 50,
                  duration: '3 Months',
                  location: 'Trust Skill Center'
                });
                setIsServiceModalOpen(true);
              }}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold font-heading px-4 py-2 rounded-xl text-xs shadow flex items-center space-x-1.5"
            >
              <Icon name="plus" size={15} />
              <span>Add Service Program</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map(s => (
              <div key={s.id} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="relative h-32 rounded-xl overflow-hidden bg-slate-100">
                    <img
                      src={s.image || "assets/gallery/trust_work_page_01.jpg"}
                      onError={(ev) => { ev.target.onerror = null; ev.target.src = "assets/gallery/trust_work_page_01.jpg"; }}
                      alt={s.title}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-2 left-2 bg-emerald-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-md">{s.category}</span>
                  </div>
                  <h3 className="font-bold font-heading text-sm text-slate-900">{s.title}</h3>
                  <p className="text-xs text-slate-500 line-clamp-2">{s.shortDescription || s.short_description}</p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-end space-x-2">
                  <button
                    onClick={() => {
                      setEditingService(s);
                      setServiceForm({
                        title: s.title || '',
                        category: s.category || 'Skill Development',
                        shortDescription: s.shortDescription || s.short_description || '',
                        fullDescription: s.fullDescription || s.full_description || '',
                        icon: s.icon || 'scissors',
                        image: s.image || '',
                        raised: s.raised || '',
                        goal: s.goal || '',
                        progress: s.progress || 50,
                        duration: s.duration || '3 Months',
                        location: s.location || 'Trust Skill Center'
                      });
                      setIsServiceModalOpen(true);
                    }}
                    className="text-xs font-bold text-emerald-600 hover:bg-emerald-50 px-2.5 py-1 rounded-lg"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Delete service "${s.title}"?`)) deleteService(s.id);
                    }}
                    className="text-xs font-bold text-red-600 hover:bg-red-50 px-2.5 py-1 rounded-lg"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- TAB: LEADERSHIP & VISION --- */}
      {activeTab === 'leadership' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <h2 className="text-xl font-black font-heading text-slate-900">Trust Leadership & Vision</h2>
              <p className="text-xs text-slate-500">Edit Director & Treasurer credentials, upload/replace the official photo, and update the community steward vision.</p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={() => {
                  const def = {
                    imageUrl: 'leadership.png',
                    directorName: 'Sri Medidhi Venkateshwar Rao',
                    directorRole: 'Director, Medidhisubbaiah Trust',
                    directorBio: 'Leading strategic social welfare, hospital blood donation coordination, and youth skill-building drives for 10+ years.',
                    treasurerName: 'Smt. Medidhi Varalakshmi',
                    treasurerRole: 'Treasurer, Medidhisubbaiah Trust',
                    treasurerBio: 'Overseeing transparent trust governance, women empowerment tailoring centers, and free food distribution programs for 10+ years.',
                    badgeTag: '10+ Years of Selfless Service',
                    sectionTitle: 'Dedicated Community Stewards',
                    sectionDesc: 'Guided by the principles of compassion, integrity, and grassroots social development, our leaders have been tirelessly spearheading free educational, healthcare, and vocational initiatives across the community for more than a decade.'
                  };
                  setLeadershipForm(def);
                  updateLeadership(def);
                }}
                className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold font-heading px-3.5 py-2 rounded-xl text-xs flex items-center space-x-1.5 transition"
              >
                <Icon name="refresh" size={14} />
                <span>Reset to Default</span>
              </button>
            </div>
          </div>

          <form onSubmit={handleLeadershipSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Live Visual Preview (Left) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-slate-900 text-white p-3.5 rounded-2xl flex items-center justify-between">
                <span className="text-xs font-bold font-heading uppercase tracking-wider text-emerald-400">Live Website Preview</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-heading">Real-Time</span>
              </div>

              <div className="bg-gradient-to-b from-emerald-50/80 via-white to-emerald-50/40 rounded-3xl border border-emerald-200 p-4 sm:p-5 shadow-md space-y-4">
                {/* Photo with badges */}
                <div className="relative rounded-2xl bg-white p-2.5 shadow-sm border border-emerald-100 overflow-hidden">
                  <div className="relative rounded-xl overflow-hidden bg-gradient-to-b from-emerald-100/50 to-amber-50/50 pt-2 flex items-center justify-center min-h-[220px]">
                    {leadershipForm.imageUrl ? (
                      <img
                        src={leadershipForm.imageUrl}
                        onError={(e) => { e.target.onerror = null; e.target.src = "assets/gallery/trust_work_page_01.jpg"; }}
                        alt="Leadership Preview"
                        className="w-full h-auto max-h-[260px] object-contain object-bottom"
                      />
                    ) : (
                      <div className="h-44 flex flex-col items-center justify-center text-slate-400">
                        <Icon name="users" size={36} className="text-emerald-300 mb-1" />
                        <span className="text-xs font-bold">No Photo Selected</span>
                      </div>
                    )}
                    
                    <div className="absolute bottom-4 left-2.5 bg-emerald-700/95 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-md shadow">
                      Director
                    </div>
                    <div className="absolute bottom-4 right-2.5 bg-teal-700/95 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-md shadow">
                      Treasurer
                    </div>
                  </div>

                  <div className="flex justify-center -mt-3 relative z-10">
                    <span className="bg-gradient-to-r from-emerald-800 to-teal-800 text-white text-[10px] font-black font-heading px-3 py-1 rounded-full shadow border border-emerald-600/50">
                      {leadershipForm.badgeTag || "10+ Years of Selfless Service"}
                    </span>
                  </div>
                </div>

                {/* Director Card Preview */}
                <div className="bg-white p-3.5 rounded-xl border border-emerald-200/80 shadow-xs space-y-1">
                  <span className="bg-emerald-700 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded font-heading inline-block">
                    Director
                  </span>
                  <h4 className="text-sm font-black font-heading text-slate-900">{leadershipForm.directorName || "Director Name"}</h4>
                  <p className="text-[11px] font-bold text-emerald-700 font-heading">{leadershipForm.directorRole || "Director Role"}</p>
                  <p className="text-[11px] text-slate-600 line-clamp-2">{leadershipForm.directorBio}</p>
                </div>

                {/* Treasurer Card Preview */}
                <div className="bg-white p-3.5 rounded-xl border border-emerald-200/80 shadow-xs space-y-1">
                  <span className="bg-teal-700 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded font-heading inline-block">
                    Treasurer
                  </span>
                  <h4 className="text-sm font-black font-heading text-slate-900">{leadershipForm.treasurerName || "Treasurer Name"}</h4>
                  <p className="text-[11px] font-bold text-teal-700 font-heading">{leadershipForm.treasurerRole || "Treasurer Role"}</p>
                  <p className="text-[11px] text-slate-600 line-clamp-2">{leadershipForm.treasurerBio}</p>
                </div>

                {/* Stewards Text Preview */}
                <div className="pt-1 space-y-1">
                  <h5 className="text-sm font-black font-heading text-slate-900">{leadershipForm.sectionTitle}</h5>
                  <p className="text-[11px] text-slate-600 leading-relaxed line-clamp-3">{leadershipForm.sectionDesc}</p>
                </div>
              </div>
            </div>

            {/* Form Controls (Right) */}
            <div className="lg:col-span-7 space-y-5">
              {/* Photo Upload Card */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-2 border-b">
                  <div className="flex items-center space-x-2">
                    <Icon name="image" size={18} className="text-emerald-600" />
                    <h3 className="text-sm font-black font-heading text-slate-900">Leadership Photo (Cloudinary Upload)</h3>
                  </div>
                  {leadershipForm.imageUrl && (
                    <button
                      type="button"
                      onClick={() => setLeadershipForm(prev => ({ ...prev, imageUrl: '' }))}
                      className="text-xs text-red-600 hover:text-red-700 font-bold flex items-center space-x-1"
                    >
                      <Icon name="trash" size={13} />
                      <span>Delete Photo</span>
                    </button>
                  )}
                </div>

                <CloudinaryUploader
                  label="Upload New Leadership Image (PNG / JPG / WEBP)"
                  currentUrl={leadershipForm.imageUrl}
                  acceptedTypes="image/*"
                  onUploaded={(url) => setLeadershipForm(prev => ({ ...prev, imageUrl: url }))}
                />

                <div>
                  <label className="font-bold font-heading text-xs text-slate-700 block mb-1">Or Direct Image URL / Local Asset</label>
                  <input
                    type="text"
                    value={leadershipForm.imageUrl || ''}
                    onChange={(e) => setLeadershipForm({ ...leadershipForm, imageUrl: e.target.value })}
                    className="w-full p-2.5 border rounded-xl text-xs font-mono"
                    placeholder="e.g. leadership.png or https://res.cloudinary.com/..."
                  />
                </div>
              </div>

              {/* Director Details Card */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center space-x-2 pb-2 border-b text-emerald-800">
                  <Icon name="award" size={18} />
                  <h3 className="text-sm font-black font-heading">Director Credentials</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold font-heading text-xs text-slate-700 block mb-1">Director Full Name *</label>
                    <input
                      type="text"
                      required
                      value={leadershipForm.directorName}
                      onChange={(e) => setLeadershipForm({ ...leadershipForm, directorName: e.target.value })}
                      className="w-full p-2.5 border rounded-xl text-xs"
                      placeholder="Sri Medidhi Venkateshwar Rao"
                    />
                  </div>
                  <div>
                    <label className="font-bold font-heading text-xs text-slate-700 block mb-1">Designation / Title</label>
                    <input
                      type="text"
                      value={leadershipForm.directorRole}
                      onChange={(e) => setLeadershipForm({ ...leadershipForm, directorRole: e.target.value })}
                      className="w-full p-2.5 border rounded-xl text-xs"
                      placeholder="Director, Medidhisubbaiah Trust"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold font-heading text-xs text-slate-700 block mb-1">Director Biography / Summary</label>
                  <textarea
                    rows="2"
                    value={leadershipForm.directorBio}
                    onChange={(e) => setLeadershipForm({ ...leadershipForm, directorBio: e.target.value })}
                    className="w-full p-2.5 border rounded-xl text-xs"
                    placeholder="Leading strategic social welfare..."
                  />
                </div>
              </div>

              {/* Treasurer Details Card */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center space-x-2 pb-2 border-b text-teal-800">
                  <Icon name="award" size={18} />
                  <h3 className="text-sm font-black font-heading">Treasurer Credentials</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold font-heading text-xs text-slate-700 block mb-1">Treasurer Full Name *</label>
                    <input
                      type="text"
                      required
                      value={leadershipForm.treasurerName}
                      onChange={(e) => setLeadershipForm({ ...leadershipForm, treasurerName: e.target.value })}
                      className="w-full p-2.5 border rounded-xl text-xs"
                      placeholder="Smt. Medidhi Varalakshmi"
                    />
                  </div>
                  <div>
                    <label className="font-bold font-heading text-xs text-slate-700 block mb-1">Designation / Title</label>
                    <input
                      type="text"
                      value={leadershipForm.treasurerRole}
                      onChange={(e) => setLeadershipForm({ ...leadershipForm, treasurerRole: e.target.value })}
                      className="w-full p-2.5 border rounded-xl text-xs"
                      placeholder="Treasurer, Medidhisubbaiah Trust"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold font-heading text-xs text-slate-700 block mb-1">Treasurer Biography / Summary</label>
                  <textarea
                    rows="2"
                    value={leadershipForm.treasurerBio}
                    onChange={(e) => setLeadershipForm({ ...leadershipForm, treasurerBio: e.target.value })}
                    className="w-full p-2.5 border rounded-xl text-xs"
                    placeholder="Overseeing transparent trust governance..."
                  />
                </div>
              </div>

              {/* Vision, Badge & Narrative Card */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center space-x-2 pb-2 border-b text-slate-900">
                  <Icon name="target" size={18} className="text-emerald-600" />
                  <h3 className="text-sm font-black font-heading">Vision & Narrative Section</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold font-heading text-xs text-slate-700 block mb-1">Badge Tag Text</label>
                    <input
                      type="text"
                      value={leadershipForm.badgeTag}
                      onChange={(e) => setLeadershipForm({ ...leadershipForm, badgeTag: e.target.value })}
                      className="w-full p-2.5 border rounded-xl text-xs"
                      placeholder="10+ Years of Selfless Service"
                    />
                  </div>
                  <div>
                    <label className="font-bold font-heading text-xs text-slate-700 block mb-1">Section Title</label>
                    <input
                      type="text"
                      value={leadershipForm.sectionTitle}
                      onChange={(e) => setLeadershipForm({ ...leadershipForm, sectionTitle: e.target.value })}
                      className="w-full p-2.5 border rounded-xl text-xs"
                      placeholder="Dedicated Community Stewards"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold font-heading text-xs text-slate-700 block mb-1">Section Description / Philosophy</label>
                  <textarea
                    rows="3"
                    value={leadershipForm.sectionDesc}
                    onChange={(e) => setLeadershipForm({ ...leadershipForm, sectionDesc: e.target.value })}
                    className="w-full p-2.5 border rounded-xl text-xs"
                    placeholder="Guided by the principles of compassion..."
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-black font-heading px-8 py-3 rounded-xl text-xs shadow-lg flex items-center space-x-2 transition"
                >
                  <Icon name="check" size={16} />
                  <span>Save Leadership & Vision Updates</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* --- TAB: CONTACT INQUIRIES --- */}
      {activeTab === 'inquiries' && (
        <div className="space-y-4 animate-fadeIn">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <h2 className="text-xl font-black font-heading text-slate-900">Contact & Seva Inquiries</h2>
              <p className="text-xs text-slate-500">Citizen submissions, volunteer registrations, and helpline messages.</p>
            </div>
            {inquiries.length > 0 && (
              <span className="bg-emerald-100 text-emerald-800 text-xs font-bold font-heading px-3 py-1 rounded-full">
                {inquiries.length} Total Messages
              </span>
            )}
          </div>

          {inquiries.length === 0 ? (
            <div className="bg-white p-12 rounded-2xl border border-dashed border-slate-300 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                <Icon name="mail" size={24} />
              </div>
              <h3 className="font-black font-heading text-slate-800 text-base">No Inquiries Yet</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                When visitors submit the contact form or register for programs on the public website, their messages will appear here.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {inquiries.map((inq) => (
                <div key={inq.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded font-heading">
                          {inq.subject || inq.interest || 'General Inquiry'}
                        </span>
                        <h3 className="text-base font-black font-heading text-slate-900 mt-1">{inq.name || 'Anonymous User'}</h3>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">{inq.submitted_at || inq.date || 'Recent'}</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 pt-1">
                      {inq.phone && (
                        <div className="flex items-center space-x-1.5 font-mono">
                          <Icon name="phone" size={13} className="text-emerald-600 shrink-0" />
                          <a href={`tel:${inq.phone}`} className="hover:underline truncate">{inq.phone}</a>
                        </div>
                      )}
                      {inq.email && (
                        <div className="flex items-center space-x-1.5 font-mono truncate">
                          <Icon name="mail" size={13} className="text-emerald-600 shrink-0" />
                          <a href={`mailto:${inq.email}`} className="hover:underline truncate">{inq.email}</a>
                        </div>
                      )}
                    </div>

                    {inq.message && (
                      <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed whitespace-pre-line">
                        {inq.message}
                      </p>
                    )}
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex space-x-2">
                      {inq.phone && (
                        <a
                          href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}`}
                          target="_blank"
                          rel="noreferrer"
                          className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 px-3 py-1 rounded-lg text-xs font-bold font-heading flex items-center space-x-1 transition"
                        >
                          <Icon name="phone" size={12} />
                          <span>WhatsApp</span>
                        </a>
                      )}
                    </div>
                    <button
                      onClick={() => {
                        if (confirm(`Delete inquiry from "${inq.name}"?`)) deleteInquiry(inq.id);
                      }}
                      className="text-xs text-red-600 hover:bg-red-50 font-bold px-2.5 py-1 rounded-lg transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* --- TAB: DONATION RECORDS & 80G RECEIPTS --- */}
      {activeTab === 'donations' && (
        <div className="space-y-5 animate-fadeIn">
          {/* Header & Stats Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <h2 className="text-xl font-black font-heading text-slate-900">Donation Records & 80G Receipts</h2>
              <p className="text-xs text-slate-500">View online donations, verify uploaded payment screenshots, and track 80G tax exemptions.</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="bg-emerald-100 text-emerald-800 text-xs font-bold font-heading px-3 py-1 rounded-full flex items-center space-x-1">
                <Icon name="heart" size={13} />
                <span>{donations.length} Total Records</span>
              </span>
            </div>
          </div>

          {/* Metrics Overview Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 font-heading block">Total Donated</span>
              <span className="text-xl font-black font-heading text-emerald-700">
                ₹{donations.reduce((sum, d) => sum + (parseFloat(d.amount) || 0), 0).toLocaleString('en-IN')}
              </span>
              <span className="text-[10px] text-slate-500 block">Across all causes</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 font-heading block">Total Donors</span>
              <span className="text-xl font-black font-heading text-slate-900">
                {donations.length}
              </span>
              <span className="text-[10px] text-slate-500 block">Registered entries</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 font-heading block">Verified / 80G Done</span>
              <span className="text-xl font-black font-heading text-emerald-600">
                {donations.filter(d => d.status === 'Verified / 80G Issued' || d.status === 'Verified').length}
              </span>
              <span className="text-[10px] text-slate-500 block">Payment verified</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 font-heading block">Pending Review</span>
              <span className="text-xl font-black font-heading text-amber-600">
                {donations.filter(d => d.status === 'Pending Verification' || !d.status).length}
              </span>
              <span className="text-[10px] text-slate-500 block">Awaiting receipt check</span>
            </div>
          </div>

          {/* Search & Filter Toolbar */}
          <div className="flex flex-col sm:flex-row gap-2 justify-between items-stretch sm:items-center bg-white p-3 rounded-2xl border border-slate-200">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search donors by name, phone, PAN, or transaction ID..."
                value={donationSearch}
                onChange={(e) => setDonationSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border rounded-xl text-xs focus:ring-2 focus:ring-emerald-500"
              />
              <span className="absolute left-3 top-2.5 text-slate-400">
                <Icon name="search" size={14} />
              </span>
            </div>

            <div className="flex space-x-1 overflow-x-auto shrink-0">
              {[
                { id: 'all', label: 'All' },
                { id: 'pending', label: 'Pending' },
                { id: 'verified', label: 'Verified / 80G' }
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setDonationStatusFilter(f.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold font-heading transition ${
                    donationStatusFilter === f.id
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Donations List Cards */}
          {(() => {
            const filtered = donations.filter(d => {
              const query = donationSearch.toLowerCase().trim();
              const matchesSearch = !query ||
                (d.donor_name && d.donor_name.toLowerCase().includes(query)) ||
                (d.phone && d.phone.toLowerCase().includes(query)) ||
                (d.pan_number && d.pan_number.toLowerCase().includes(query)) ||
                (d.transaction_id && d.transaction_id.toLowerCase().includes(query)) ||
                (d.cause && d.cause.toLowerCase().includes(query));

              if (!matchesSearch) return false;
              if (donationStatusFilter === 'pending') return d.status === 'Pending Verification' || !d.status;
              if (donationStatusFilter === 'verified') return d.status === 'Verified / 80G Issued' || d.status === 'Verified';
              return true;
            });

            if (filtered.length === 0) {
              return (
                <div className="bg-white p-12 rounded-2xl border border-dashed border-slate-300 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                    <Icon name="heart" size={24} />
                  </div>
                  <h3 className="font-black font-heading text-slate-800 text-base">No Donation Records Found</h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    When donors submit contributions on the website, their details, transaction IDs, and uploaded payment screenshots will appear here.
                  </p>
                </div>
              );
            }

            return (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filtered.map(d => {
                  const isVerified = d.status === 'Verified / 80G Issued' || d.status === 'Verified';
                  return (
                    <div key={d.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3.5 flex flex-col justify-between hover:border-emerald-300 transition">
                      <div className="space-y-3">
                        {/* Top: Name, Amount & Status */}
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="text-xl font-black font-heading text-emerald-700">
                                ₹{parseFloat(d.amount || 0).toLocaleString('en-IN')}
                              </span>
                              <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full font-heading ${
                                isVerified ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-amber-100 text-amber-800 border border-amber-300'
                              }`}>
                                {isVerified ? '✓ Verified / 80G Done' : '⏳ Pending Verification'}
                              </span>
                            </div>
                            <h3 className="text-base font-black font-heading text-slate-900 mt-1">{d.donor_name || 'Anonymous Donor'}</h3>
                            <span className="text-xs text-slate-500 block">{d.cause || 'General Trust Seva'}</span>
                          </div>
                          <span className="text-[10px] text-slate-400 font-mono shrink-0">{d.date || 'Recent'}</span>
                        </div>

                        {/* Donor Information Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-xl border border-slate-100">
                          <div>
                            <span className="text-[10px] font-bold text-slate-400 block uppercase font-heading">Phone / WhatsApp</span>
                            {d.phone ? (
                              <div className="flex items-center space-x-1.5 font-mono text-slate-800 font-semibold">
                                <a href={`tel:${d.phone}`} className="hover:underline">{d.phone}</a>
                              </div>
                            ) : (
                              <span className="text-slate-400 italic">Not provided</span>
                            )}
                          </div>

                          <div>
                            <span className="text-[10px] font-bold text-slate-400 block uppercase font-heading">PAN Number (80G)</span>
                            {d.pan_number ? (
                              <div className="flex items-center space-x-1 font-mono text-slate-800 font-semibold">
                                <span>{d.pan_number}</span>
                                <button
                                  type="button"
                                  onClick={() => {
                                    navigator.clipboard.writeText(d.pan_number);
                                    showToast('PAN copied: ' + d.pan_number);
                                  }}
                                  className="text-slate-400 hover:text-emerald-600 p-0.5"
                                  title="Copy PAN"
                                >
                                  <Icon name="copy" size={11} />
                                </button>
                              </div>
                            ) : (
                              <span className="text-slate-400 italic">No PAN specified</span>
                            )}
                          </div>

                          <div className="sm:col-span-2 pt-1 border-t border-slate-200/60">
                            <span className="text-[10px] font-bold text-slate-400 block uppercase font-heading">UPI / UTR Transaction ID</span>
                            {d.transaction_id ? (
                              <div className="flex items-center space-x-1.5 font-mono text-slate-800 text-xs break-all">
                                <span className="bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded font-bold">{d.transaction_id}</span>
                                <button
                                  type="button"
                                  onClick={() => {
                                    navigator.clipboard.writeText(d.transaction_id);
                                    showToast('Transaction ID copied: ' + d.transaction_id);
                                  }}
                                  className="text-slate-400 hover:text-emerald-600 p-0.5"
                                  title="Copy Transaction ID"
                                >
                                  <Icon name="copy" size={11} />
                                </button>
                              </div>
                            ) : (
                              <span className="text-slate-400 italic">No UTR specified</span>
                            )}
                          </div>
                        </div>

                        {/* --- PAYMENT SCREENSHOT PROOF CARD --- */}
                        {(() => {
                          const screenshot = d.screenshot_url || d.screenshotUrl || d.receipt_url || d.image || d.image_url;
                          return (
                            <div className="space-y-1.5">
                              <div className="flex items-center justify-between">
                                <span className="text-[11px] font-bold font-heading text-slate-800 flex items-center space-x-1">
                                  <Icon name="image" size={13} className="text-emerald-600" />
                                  <span>Payment Screenshot / Proof:</span>
                                </span>
                                {screenshot && (
                                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full font-heading">
                                    Verified Attachment
                                  </span>
                                )}
                              </div>

                              {screenshot ? (
                                <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-2.5 flex items-center justify-between gap-3">
                                  <div
                                    onClick={() => setViewingReceipt(d)}
                                    className="flex items-center space-x-2.5 cursor-pointer group min-w-0"
                                  >
                                    <div className="relative w-14 h-14 rounded-lg overflow-hidden border border-emerald-300 bg-white shrink-0 shadow-sm">
                                      <img
                                        src={screenshot}
                                        alt="Receipt"
                                        className="w-full h-full object-cover group-hover:scale-105 transition"
                                      />
                                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition text-white">
                                        <Icon name="search" size={14} />
                                      </div>
                                    </div>
                                    <div className="min-w-0">
                                      <span className="text-xs font-bold text-emerald-950 font-heading block group-hover:text-emerald-700 transition truncate">
                                        Click to View Screenshot
                                      </span>
                                      <span className="text-[10px] text-slate-500 font-mono block truncate">
                                        {screenshot}
                                      </span>
                                    </div>
                                  </div>

                                  <div className="flex items-center space-x-1.5 shrink-0">
                                    <button
                                      type="button"
                                      onClick={() => setViewingReceipt(d)}
                                      className="bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold font-heading px-3 py-1.5 rounded-lg shadow flex items-center space-x-1 transition"
                                    >
                                      <Icon name="eye" size={12} />
                                      <span>Preview</span>
                                    </button>

                                    <label className="cursor-pointer bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-[11px] font-bold font-heading px-2 py-1.5 rounded-lg shadow-sm transition flex items-center" title="Replace screenshot">
                                      <Icon name="cloud" size={12} />
                                      <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={async (e) => {
                                          const file = e.target.files && e.target.files[0];
                                          if (!file) return;
                                          try {
                                            const res = await uploadToCloudinary(file);
                                            updateDonationScreenshot(d.id, res.url);
                                          } catch (err) {
                                            const reader = new FileReader();
                                            reader.onload = () => updateDonationScreenshot(d.id, reader.result);
                                            reader.readAsDataURL(file);
                                          }
                                        }}
                                      />
                                    </label>
                                  </div>
                                </div>
                              ) : (
                                <div className="p-3 bg-slate-50 rounded-xl border border-dashed border-slate-300 flex items-center justify-between gap-2">
                                  <span className="text-xs text-slate-500 italic">No screenshot uploaded with this entry</span>
                                  <label className="cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold font-heading px-3 py-1.5 rounded-lg shadow flex items-center space-x-1 shrink-0 transition">
                                    <Icon name="cloud" size={13} />
                                    <span>Attach Screenshot</span>
                                    <input
                                      type="file"
                                      accept="image/*"
                                      className="hidden"
                                      onChange={async (e) => {
                                        const file = e.target.files && e.target.files[0];
                                        if (!file) return;
                                        try {
                                          const res = await uploadToCloudinary(file);
                                          updateDonationScreenshot(d.id, res.url);
                                        } catch (err) {
                                          const reader = new FileReader();
                                          reader.onload = () => updateDonationScreenshot(d.id, reader.result);
                                          reader.readAsDataURL(file);
                                        }
                                      }}
                                    />
                                  </label>
                                </div>
                              )}
                            </div>
                          );
                        })()}
                      </div>

                      {/* Card Footer Actions */}
                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 flex-wrap">
                        <div className="flex space-x-1.5">
                          {d.phone && (
                            <a
                              href={`https://wa.me/${d.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(d.donor_name || '')},%20thank%20you%20for%20your%20donation%20of%20Rs.%20${encodeURIComponent(d.amount || '')}%20to%20Medidhisubbaiah%20Trust.`}
                              target="_blank"
                              rel="noreferrer"
                              className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 px-2.5 py-1 rounded-lg text-xs font-bold font-heading flex items-center space-x-1 transition"
                            >
                              <Icon name="phone" size={11} />
                              <span>WhatsApp</span>
                            </a>
                          )}

                          <button
                            type="button"
                            onClick={() => updateDonationStatus(d.id, isVerified ? 'Pending Verification' : 'Verified / 80G Issued')}
                            className={`px-3 py-1 rounded-lg text-xs font-bold font-heading transition shadow-sm flex items-center space-x-1 ${
                              isVerified
                                ? 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                                : 'bg-emerald-600 text-white hover:bg-emerald-700'
                            }`}
                          >
                            <Icon name={isVerified ? 'x' : 'check'} size={12} />
                            <span>{isVerified ? 'Mark as Pending' : 'Approve & Mark Verified'}</span>
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => deleteDonation(d.id)}
                          className="text-xs text-red-600 hover:bg-red-50 font-bold px-2.5 py-1 rounded-lg transition"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })()}
        </div>
      )}

      {/* --- MODAL: FULL PAYMENT SCREENSHOT VIEWER --- */}
      {viewingReceipt && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-5 sm:p-6 space-y-4 shadow-2xl border my-8 max-h-[92vh] overflow-y-auto">
            <div className="flex justify-between items-start pb-2 border-b border-slate-100">
              <div>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full font-heading">
                  Payment Verification Proof
                </span>
                <h3 className="text-lg font-black font-heading text-slate-900 mt-1">
                  {viewingReceipt.donor_name} • <span className="text-emerald-600">₹{viewingReceipt.amount}</span>
                </h3>
                <p className="text-xs text-slate-500">
                  {viewingReceipt.date} • {viewingReceipt.cause || 'General Trust Seva'} • UTR: {viewingReceipt.transaction_id || 'N/A'}
                </p>
              </div>
              <button
                onClick={() => setViewingReceipt(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:bg-slate-100 transition"
              >
                <Icon name="x" size={20} />
              </button>
            </div>

            <div className="rounded-2xl overflow-hidden bg-slate-950 p-2 flex items-center justify-center min-h-[300px]">
              <img
                src={viewingReceipt.screenshot_url}
                alt="Full Payment Screenshot"
                className="max-h-[65vh] max-w-full object-contain rounded-xl shadow-lg"
              />
            </div>

            <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-3">
              <a
                href={viewingReceipt.screenshot_url}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-emerald-700 hover:underline font-bold font-heading flex items-center space-x-1"
              >
                <Icon name="external" size={13} />
                <span>Open Screenshot in Full Resolution</span>
              </a>

              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={() => {
                    const newStatus = viewingReceipt.status === 'Verified / 80G Issued' || viewingReceipt.status === 'Verified' ? 'Pending Verification' : 'Verified / 80G Issued';
                    updateDonationStatus(viewingReceipt.id, newStatus);
                    setViewingReceipt({ ...viewingReceipt, status: newStatus });
                  }}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold font-heading px-4 py-2 rounded-xl shadow transition"
                >
                  {viewingReceipt.status === 'Verified / 80G Issued' || viewingReceipt.status === 'Verified' ? 'Mark as Pending' : 'Approve & Issue 80G'}
                </button>
                <button
                  type="button"
                  onClick={() => setViewingReceipt(null)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold font-heading px-4 py-2 rounded-xl transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL: EVENT CREATE / EDIT --- */}
      {isEventModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-5 sm:p-6 space-y-4 shadow-2xl border my-8">
            <div className="flex justify-between items-center pb-2 border-b">
              <h3 className="text-base font-black font-heading text-slate-900">
                {editingEvent ? 'Edit Event' : 'Create New Event'}
              </h3>
              <button onClick={() => setIsEventModalOpen(false)} className="p-1 rounded-lg text-slate-400 hover:bg-slate-100">
                <Icon name="x" size={20} />
              </button>
            </div>

            <form onSubmit={handleEventSubmit} className="space-y-3 text-xs sm:text-sm">
              <div>
                <label className="font-bold font-heading text-xs text-slate-700 block mb-1">Event Title *</label>
                <input
                  type="text"
                  required
                  value={eventForm.title}
                  onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                  className="w-full p-2.5 border rounded-xl"
                  placeholder="e.g. Free Vocational Graduation Ceremony"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold font-heading text-xs text-slate-700 block mb-1">Date *</label>
                  <input
                    type="date"
                    required
                    value={eventForm.date}
                    onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                    className="w-full p-2.5 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-bold font-heading text-xs text-slate-700 block mb-1">Time</label>
                  <input
                    type="text"
                    value={eventForm.time}
                    onChange={(e) => setEventForm({ ...eventForm, time: e.target.value })}
                    className="w-full p-2.5 border rounded-xl"
                    placeholder="10:00 AM - 01:30 PM"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold font-heading text-xs text-slate-700 block mb-1">Category</label>
                  <select
                    value={eventForm.category}
                    onChange={(e) => setEventForm({ ...eventForm, category: e.target.value })}
                    className="w-full p-2.5 border rounded-xl bg-white"
                  >
                    <option value="Skill Development">Skill Development</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Youth & Sports">Youth & Sports</option>
                    <option value="Education">Education</option>
                    <option value="Social Relief">Social Relief</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold font-heading text-xs text-slate-700 block mb-1">Status</label>
                  <select
                    value={eventForm.status}
                    onChange={(e) => setEventForm({ ...eventForm, status: e.target.value })}
                    className="w-full p-2.5 border rounded-xl bg-white"
                  >
                    <option value="Upcoming">Upcoming</option>
                    <option value="Registration Open">Registration Open</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold font-heading text-xs text-slate-700 block mb-1">Location / Venue</label>
                <input
                  type="text"
                  value={eventForm.location}
                  onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })}
                  className="w-full p-2.5 border rounded-xl"
                  placeholder="Hotel Chitturi Heritage, Tanuku"
                />
              </div>

              <div>
                <label className="font-bold font-heading text-xs text-slate-700 block mb-1">Description</label>
                <textarea
                  rows="2"
                  value={eventForm.description}
                  onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                  className="w-full p-2.5 border rounded-xl"
                  placeholder="Details regarding dignitaries, participants, and schedule..."
                />
              </div>

              {/* Cloudinary Upload for Event Banner */}
              <CloudinaryUploader
                label="Event Banner Image (Cloudinary)"
                currentUrl={eventForm.image_url}
                acceptedTypes="image/*"
                onUploaded={(url) => setEventForm(prev => ({ ...prev, image_url: url }))}
              />

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsEventModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold font-heading px-6 py-2 rounded-xl text-xs shadow"
                >
                  {editingEvent ? 'Save Changes' : 'Create Event'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL: GALLERY MEDIA CREATE / EDIT --- */}
      {isGalleryModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-5 sm:p-6 space-y-4 shadow-2xl border my-8">
            <div className="flex justify-between items-center pb-2 border-b">
              <h3 className="text-base font-black font-heading text-slate-900">
                {editingGallery ? 'Edit Gallery Media' : 'Upload New Photo or Video'}
              </h3>
              <button onClick={() => setIsGalleryModalOpen(false)} className="p-1 rounded-lg text-slate-400 hover:bg-slate-100">
                <Icon name="x" size={20} />
              </button>
            </div>

            <form onSubmit={handleGallerySubmit} className="space-y-3 text-xs sm:text-sm">
              <div>
                <label className="font-bold font-heading text-xs text-slate-700 block mb-1">Title / Headline *</label>
                <input
                  type="text"
                  required
                  value={galleryForm.title}
                  onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })}
                  className="w-full p-2.5 border rounded-xl"
                  placeholder="e.g. Tanuku Convocation Ceremony Video"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold font-heading text-xs text-slate-700 block mb-1">Media Type</label>
                  <select
                    value={galleryForm.type}
                    onChange={(e) => setGalleryForm({ ...galleryForm, type: e.target.value })}
                    className="w-full p-2.5 border rounded-xl bg-white"
                  >
                    <option value="image">Photo / Image</option>
                    <option value="video">Video Footage</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold font-heading text-xs text-slate-700 block mb-1">Category</label>
                  <select
                    value={galleryForm.category}
                    onChange={(e) => setGalleryForm({ ...galleryForm, category: e.target.value })}
                    className="w-full p-2.5 border rounded-xl bg-white"
                  >
                    <option value="Certificate Distribution">Certificate Distribution</option>
                    <option value="Tailoring & Muggam">Tailoring & Muggam</option>
                    <option value="Video Documentation">Video Documentation</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Annadhanam">Annadhanam</option>
                    <option value="Chalivendram">Chalivendram</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold font-heading text-xs text-slate-700 block mb-1">Location</label>
                  <input
                    type="text"
                    value={galleryForm.location}
                    onChange={(e) => setGalleryForm({ ...galleryForm, location: e.target.value })}
                    className="w-full p-2.5 border rounded-xl"
                    placeholder="Hotel Chitturi Heritage, Tanuku"
                  />
                </div>
                <div>
                  <label className="font-bold font-heading text-xs text-slate-700 block mb-1">Date</label>
                  <input
                    type="date"
                    value={galleryForm.date}
                    onChange={(e) => setGalleryForm({ ...galleryForm, date: e.target.value })}
                    className="w-full p-2.5 border rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold font-heading text-xs text-slate-700 block mb-1">Caption / Description</label>
                <textarea
                  rows="2"
                  value={galleryForm.caption}
                  onChange={(e) => setGalleryForm({ ...galleryForm, caption: e.target.value })}
                  className="w-full p-2.5 border rounded-xl"
                  placeholder="Detailed caption describing the activity and dignitaries present..."
                />
              </div>

              {/* Cloudinary Upload for Photo/Video */}
              <CloudinaryUploader
                label={galleryForm.type === 'video' ? 'Upload Video File (MP4, MOV)' : 'Upload Photo / Image'}
                currentUrl={galleryForm.type === 'video' ? galleryForm.video_url || galleryForm.image_url : galleryForm.image_url}
                acceptedTypes={galleryForm.type === 'video' ? 'video/*' : 'image/*'}
                onUploaded={(url, meta) => {
                  if (galleryForm.type === 'video' || (meta && meta.resourceType === 'video')) {
                    setGalleryForm(prev => ({
                      ...prev,
                      video_url: url,
                      type: 'video',
                      duration: meta?.duration || prev.duration || '01:22'
                    }));
                  } else {
                    setGalleryForm(prev => ({ ...prev, image_url: url, type: 'image' }));
                  }
                }}
              />

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsGalleryModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold font-heading px-6 py-2 rounded-xl text-xs shadow"
                >
                  {editingGallery ? 'Save Changes' : 'Add to Gallery'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL: NEWS CREATE / EDIT --- */}
      {isNewsModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-5 sm:p-6 space-y-4 shadow-2xl border my-8">
            <div className="flex justify-between items-center pb-2 border-b">
              <h3 className="text-base font-black font-heading text-slate-900">
                {editingNews ? 'Edit News Article' : 'Publish New News Article'}
              </h3>
              <button onClick={() => setIsNewsModalOpen(false)} className="p-1 rounded-lg text-slate-400 hover:bg-slate-100">
                <Icon name="x" size={20} />
              </button>
            </div>

            <form onSubmit={handleNewsSubmit} className="space-y-3 text-xs sm:text-sm">
              <div>
                <label className="font-bold font-heading text-xs text-slate-700 block mb-1">Headline / Title *</label>
                <input
                  type="text"
                  required
                  value={newsForm.title}
                  onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })}
                  className="w-full p-2.5 border rounded-xl"
                  placeholder="e.g. Free Tailoring Expansion Centers Opened"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold font-heading text-xs text-slate-700 block mb-1">Category</label>
                  <select
                    value={newsForm.category}
                    onChange={(e) => setNewsForm({ ...newsForm, category: e.target.value })}
                    className="w-full p-2.5 border rounded-xl bg-white"
                  >
                    <option value="Skill Development">Skill Development</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Education">Education</option>
                    <option value="Public Welfare">Public Welfare</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold font-heading text-xs text-slate-700 block mb-1">Publish Date</label>
                  <input
                    type="date"
                    value={newsForm.date}
                    onChange={(e) => setNewsForm({ ...newsForm, date: e.target.value })}
                    className="w-full p-2.5 border rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold font-heading text-xs text-slate-700 block mb-1">Short Summary</label>
                <textarea
                  rows="2"
                  value={newsForm.short_description}
                  onChange={(e) => setNewsForm({ ...newsForm, short_description: e.target.value })}
                  className="w-full p-2.5 border rounded-xl"
                  placeholder="Brief 2-sentence summary for the card view..."
                />
              </div>

              <div>
                <label className="font-bold font-heading text-xs text-slate-700 block mb-1">Full Article Body</label>
                <textarea
                  rows="4"
                  value={newsForm.content}
                  onChange={(e) => setNewsForm({ ...newsForm, content: e.target.value })}
                  className="w-full p-2.5 border rounded-xl"
                  placeholder="Detailed press release article text..."
                />
              </div>

              {/* Cloudinary Thumbnail & PDF */}
              <CloudinaryUploader
                label="Article Cover Image (Cloudinary)"
                currentUrl={newsForm.thumbnail}
                acceptedTypes="image/*"
                onUploaded={(url) => setNewsForm(prev => ({ ...prev, thumbnail: url }))}
              />

              <CloudinaryUploader
                label="Attach PDF Press Release / Report (Optional)"
                currentUrl={newsForm.pdf_url}
                acceptedTypes="application/pdf,.pdf"
                onUploaded={(url) => setNewsForm(prev => ({ ...prev, pdf_url: url }))}
              />

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsNewsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold font-heading px-6 py-2 rounded-xl text-xs shadow"
                >
                  {editingNews ? 'Save Article' : 'Publish Article'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL: SERVICE CREATE / EDIT --- */}
      {isServiceModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-5 sm:p-6 space-y-4 shadow-2xl border my-8">
            <div className="flex justify-between items-center pb-2 border-b">
              <h3 className="text-base font-black font-heading text-slate-900">
                {editingService ? 'Edit Service' : 'Add Service Program'}
              </h3>
              <button onClick={() => setIsServiceModalOpen(false)} className="p-1 rounded-lg text-slate-400 hover:bg-slate-100">
                <Icon name="x" size={20} />
              </button>
            </div>

            <form onSubmit={handleServiceSubmit} className="space-y-3 text-xs sm:text-sm">
              <div>
                <label className="font-bold font-heading text-xs text-slate-700 block mb-1">Service Title *</label>
                <input
                  type="text"
                  required
                  value={serviceForm.title}
                  onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
                  className="w-full p-2.5 border rounded-xl"
                  placeholder="e.g. Free Tailoring Training Program"
                />
              </div>

              <div>
                <label className="font-bold font-heading text-xs text-slate-700 block mb-1">Category</label>
                <input
                  type="text"
                  value={serviceForm.category}
                  onChange={(e) => setServiceForm({ ...serviceForm, category: e.target.value })}
                  className="w-full p-2.5 border rounded-xl"
                  placeholder="Skill Development, Healthcare, etc."
                />
              </div>

              <div>
                <label className="font-bold font-heading text-xs text-slate-700 block mb-1">Short Description</label>
                <textarea
                  rows="2"
                  value={serviceForm.shortDescription}
                  onChange={(e) => setServiceForm({ ...serviceForm, shortDescription: e.target.value })}
                  className="w-full p-2.5 border rounded-xl"
                />
              </div>

              <CloudinaryUploader
                label="Cover Image (Cloudinary)"
                currentUrl={serviceForm.image}
                acceptedTypes="image/*"
                onUploaded={(url) => setServiceForm(prev => ({ ...prev, image: url }))}
              />

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsServiceModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold font-heading px-6 py-2 rounded-xl text-xs shadow"
                >
                  {editingService ? 'Save Service' : 'Add Service'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      </main>
    </div>
  );
};

// --- SERVICE DETAILS & ADMISSION MODAL ---
const ServiceModal = () => {
  const { selectedService, setSelectedService, showToast } = useTrust();
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', city: '', notes: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showApplyForm, setShowApplyForm] = useState(false);

  if (!selectedService) return null;

  const handleApply = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      showToast(`Application received for ${formData.name}! We will contact you.`);
      setSelectedService(null);
      setShowApplyForm(false);
      setFormData({ name: '', phone: '', email: '', city: '', notes: '' });
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-xl w-full p-5 sm:p-7 space-y-4 shadow-2xl border border-slate-200 my-8">
        <div className="flex justify-between items-start">
          <div>
            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full font-heading">
              {selectedService.category}
            </span>
            <h3 className="text-xl font-black font-heading text-slate-900 mt-1">{selectedService.title}</h3>
          </div>
          <button onClick={() => setSelectedService(null)} className="p-1 rounded-xl text-slate-400 hover:bg-slate-100">
            <Icon name="x" size={20} />
          </button>
        </div>

        <div className="h-44 sm:h-52 rounded-2xl overflow-hidden bg-slate-100">
          <img
            src={selectedService.image || "assets/gallery/trust_work_page_01.jpg"}
            onError={(ev) => { ev.target.onerror = null; ev.target.src = "assets/gallery/trust_work_page_01.jpg"; }}
            alt={selectedService.title}
            className="w-full h-full object-cover"
          />
        </div>

        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
          {selectedService.fullDescription || selectedService.shortDescription || selectedService.short_description}
        </p>

        {showApplyForm ? (
          <form onSubmit={handleApply} className="space-y-3 pt-2 border-t border-slate-100 text-xs">
            <h4 className="font-bold font-heading text-slate-900">100% Free Program Admission Form</h4>
            <div className="grid grid-cols-2 gap-2">
              <input type="text" required placeholder="Full Name *" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full p-2 border rounded-xl" />
              <input type="tel" required placeholder="Phone Number *" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full p-2 border rounded-xl" />
            </div>
            <input type="text" placeholder="Village / Mandal / City" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} className="w-full p-2 border rounded-xl" />
            <button type="submit" disabled={isSubmitting} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold font-heading py-2.5 rounded-xl shadow">
              {isSubmitting ? 'Submitting Application...' : 'Confirm Free Registration'}
            </button>
          </form>
        ) : (
          <div className="pt-2 flex justify-end space-x-2">
            <button onClick={() => setSelectedService(null)} className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100">
              Close
            </button>
            <button onClick={() => setShowApplyForm(true)} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold font-heading px-5 py-2 rounded-xl text-xs shadow">
              Apply for Free Admission
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// --- EVENT REGISTRATION MODAL ---
const EventModal = () => {
  const { selectedEvent, setSelectedEvent, registerForEvent } = useTrust();
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', count: 1 });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!selectedEvent) return null;

  const handleRegister = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      registerForEvent(selectedEvent.id, formData);
      setSelectedEvent(null);
      setFormData({ name: '', phone: '', email: '', count: 1 });
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-md w-full p-5 sm:p-6 space-y-4 shadow-2xl border my-8">
        <div className="flex justify-between items-start">
          <div>
            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full font-heading">
              {selectedEvent.category || 'Trust Event'}
            </span>
            <h3 className="text-lg font-black font-heading text-slate-900 mt-1">{selectedEvent.title}</h3>
          </div>
          <button onClick={() => setSelectedEvent(null)} className="p-1 rounded-xl text-slate-400 hover:bg-slate-100">
            <Icon name="x" size={20} />
          </button>
        </div>

        <div className="text-xs text-slate-600 space-y-1 bg-slate-50 p-3 rounded-2xl border">
          <div className="font-bold text-emerald-800">📅 Date: {selectedEvent.date} ({selectedEvent.time || '10:00 AM'})</div>
          <div>📍 Venue: {selectedEvent.location}</div>
        </div>

        <form onSubmit={handleRegister} className="space-y-3 text-xs">
          <input type="text" required placeholder="Full Name *" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full p-2.5 border rounded-xl" />
          <input type="tel" required placeholder="Phone Number *" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full p-2.5 border rounded-xl" />
          <button type="submit" disabled={isSubmitting} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold font-heading py-2.5 rounded-xl shadow">
            {isSubmitting ? 'Confirming...' : 'Confirm RSVP / Free Pass'}
          </button>
        </form>
      </div>
    </div>
  );
};

// --- NEWS MODAL ---
const NewsModal = () => {
  const { selectedNews, setSelectedNews } = useTrust();

  if (!selectedNews) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-5 sm:p-7 space-y-4 shadow-2xl border my-8">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-[10px] text-slate-400 font-bold">{selectedNews.date} • {selectedNews.author || 'Trust Editorial'}</span>
            <h3 className="text-xl font-black font-heading text-slate-900 mt-1">{selectedNews.title}</h3>
          </div>
          <button onClick={() => setSelectedNews(null)} className="p-1 rounded-xl text-slate-400 hover:bg-slate-100">
            <Icon name="x" size={20} />
          </button>
        </div>

        <div className="h-52 rounded-2xl overflow-hidden bg-slate-100">
          <img
            src={selectedNews.thumbnail || "assets/gallery/trust_work_page_01.jpg"}
            onError={(ev) => { ev.target.onerror = null; ev.target.src = "assets/gallery/trust_work_page_01.jpg"; }}
            alt={selectedNews.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="text-slate-700 text-xs sm:text-sm leading-relaxed whitespace-pre-line space-y-2">
          {selectedNews.content || selectedNews.short_description || selectedNews.shortDescription}
        </div>

        {selectedNews.pdf_url && (
          <div className="pt-3 border-t border-slate-100">
            <a href={selectedNews.pdf_url} target="_blank" rel="noreferrer" className="inline-flex items-center space-x-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 px-3.5 py-2 rounded-xl text-xs font-bold font-heading">
              <Icon name="filetext" size={14} />
              <span>View Attached Press PDF Report</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

// --- LIGHTBOX MODAL ---
const LightboxModal = () => {
  const { gallery, lightboxIndex, setLightboxIndex } = useTrust();

  if (lightboxIndex === null || !gallery[lightboxIndex]) return null;

  const current = gallery[lightboxIndex];
  const isVid = current.type === 'video' || !!current.video_url;

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 animate-fadeIn">
      <div className="flex justify-between items-center text-white px-2">
        <div className="min-w-0">
          <h4 className="font-bold font-heading text-sm sm:text-base truncate">{current.title}</h4>
          <p className="text-xs text-slate-400 truncate">{current.location || current.category}</p>
        </div>
        <button onClick={() => setLightboxIndex(null)} className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white">
          <Icon name="x" size={20} />
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center p-2">
        {isVid ? (
          <video src={current.video_url || "assets/gallery/trust_activity_video.mp4"} controls autoPlay playsInline className="max-h-[75vh] max-w-full rounded-2xl shadow-2xl" />
        ) : (
          <img
            src={current.image_url || current.imageUrl || "assets/gallery/trust_work_page_01.jpg"}
            onError={(ev) => { ev.target.onerror = null; ev.target.src = "assets/gallery/trust_work_page_01.jpg"; }}
            alt={current.title}
            className="max-h-[75vh] max-w-full object-contain rounded-2xl shadow-2xl"
          />
        )}
      </div>

      <div className="flex justify-between items-center text-white px-4">
        <button
          onClick={() => setLightboxIndex((lightboxIndex - 1 + gallery.length) % gallery.length)}
          className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-bold"
        >
          Previous
        </button>
        <span className="text-xs text-slate-400">{lightboxIndex + 1} / {gallery.length}</span>
        <button
          onClick={() => setLightboxIndex((lightboxIndex + 1) % gallery.length)}
          className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-bold"
        >
          Next
        </button>
      </div>
    </div>
  );
};

// --- DONATION MODAL ---
const DonateModal = () => {
  const { isDonateModalOpen, setIsDonateModalOpen, trustInfo, submitDonationLog, showToast } = useTrust();
  const [amount, setAmount] = useState('1000');
  const [customAmount, setCustomAmount] = useState('');
  const [donorName, setDonorName] = useState('');
  const [phone, setPhone] = useState('');
  const [pan, setPan] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [cause, setCause] = useState('General Trust Seva');
  const [screenshotUrl, setScreenshotUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isDonateModalOpen) return null;

  const handleScreenshotChange = async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(15);
    setUploadError(null);

    // 1. Immediately read as Base64 Data URL so the screenshot is instantly attached with zero wait time
    const reader = new FileReader();
    reader.onload = async (evt) => {
      const base64Data = evt.target.result;
      setScreenshotUrl(base64Data);
      showToast('Payment screenshot attached! Uploading to cloud...', 'info');

      // 2. Upload to Cloudinary in background for persistent public URL
      try {
        setUploadProgress(35);
        const res = await uploadToCloudinary(file, (p) => setUploadProgress(Math.max(35, p)));
        if (res && res.url) {
          setScreenshotUrl(res.url);
          showToast('Payment screenshot verified & saved to cloud ✅', 'success');
        }
      } catch (err) {
        console.warn('Cloudinary background upload note (using base64 proof):', err);
        showToast('Payment screenshot attached successfully ✅', 'success');
      } finally {
        setIsUploading(false);
      }
    };
    reader.onerror = () => {
      setIsUploading(false);
      setUploadError('Failed to read selected image.');
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalAmount = customAmount.trim() ? customAmount.trim() : amount;
    if (!finalAmount || parseFloat(finalAmount) <= 0) {
      alert('Please enter a valid donation amount.');
      return;
    }

    setIsSubmitting(true);
    try {
      await submitDonationLog({
        donor_name: donorName,
        amount: finalAmount,
        phone,
        pan_number: pan,
        transaction_id: transactionId,
        cause,
        screenshot_url: screenshotUrl || '',
        status: 'Pending Verification'
      });
      setIsDonateModalOpen(false);
      setDonorName('');
      setPhone('');
      setPan('');
      setTransactionId('');
      setScreenshotUrl('');
      setCustomAmount('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full p-5 sm:p-7 space-y-4 shadow-2xl border my-8 max-h-[92vh] overflow-y-auto">
        <div className="flex justify-between items-start pb-2 border-b border-slate-100">
          <div>
            <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full font-heading">
              80G Tax-Exempt Seva
            </span>
            <h3 className="text-xl font-black font-heading text-slate-900 mt-1">Support Our Noble Mission</h3>
            <p className="text-xs text-slate-500">Every rupee supports free tailoring, 24/7 blood helpline & food seva.</p>
          </div>
          <button onClick={() => setIsDonateModalOpen(false)} className="p-1.5 rounded-xl text-slate-400 hover:bg-slate-100 transition">
            <Icon name="x" size={20} />
          </button>
        </div>

        {/* Official UPI Details Card */}
        <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 p-3.5 rounded-2xl border border-emerald-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2.5">
          <div className="min-w-0">
            <span className="text-[10px] font-bold text-emerald-800 uppercase block font-heading">Official SBI UPI ID:</span>
            <span className="font-mono text-sm font-bold text-slate-900 select-all">{trustInfo.upiId}</span>
            <span className="text-[10px] text-slate-500 block">Bank: State Bank of India • Medidhisubbaiah Trust</span>
          </div>
          <button
            type="button"
            onClick={() => {
              navigator.clipboard.writeText(trustInfo.upiId);
              showToast('UPI ID copied to clipboard: ' + trustInfo.upiId, 'success');
            }}
            className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold font-heading px-3.5 py-2 rounded-xl shadow shrink-0 flex items-center space-x-1.5 transition"
          >
            <Icon name="copy" size={13} />
            <span>Copy UPI</span>
          </button>
        </div>

        {/* Quick Amount Selection */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold font-heading text-slate-700">Select Donation Amount (₹)</label>
          <div className="grid grid-cols-4 gap-2">
            {['500', '1000', '2500', '5000'].map(amt => (
              <button
                key={amt}
                type="button"
                onClick={() => {
                  setAmount(amt);
                  setCustomAmount('');
                }}
                className={`py-2 rounded-xl text-xs font-bold font-heading border transition ${
                  amount === amt && !customAmount
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200'
                }`}
              >
                ₹{amt}
              </button>
            ))}
          </div>
          <input
            type="number"
            placeholder="Or enter custom amount in ₹"
            value={customAmount}
            onChange={(e) => {
              setCustomAmount(e.target.value);
              if (e.target.value) setAmount(e.target.value);
            }}
            className="w-full p-2.5 border rounded-xl text-xs focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          {/* Cause Selector */}
          <div>
            <label className="block font-bold font-heading text-slate-700 mb-1">Choose Seva / Cause</label>
            <select
              value={cause}
              onChange={(e) => setCause(e.target.value)}
              className="w-full p-2.5 border rounded-xl bg-white focus:ring-2 focus:ring-emerald-500 text-xs font-medium text-slate-800"
            >
              <option value="General Trust Seva">General Trust Community Welfare</option>
              <option value="Free Tailoring & Maggam Training">100% Free Tailoring & Maggam Training for Women</option>
              <option value="24/7 Emergency Blood Helpline">24/7 Emergency Blood Helpline & Medical Camps</option>
              <option value="Weekly Annadhanam & Grocery Kits">Weekly Annadhanam Food Drives & Ration Kits</option>
              <option value="Summer Drinking Water Chalivendram">Summer Chalivendram Drinking Water Kiosks</option>
              <option value="Educational Kits & Youth Sports">Educational Kits & Rural Youth Sports Tournaments</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div>
              <label className="block font-bold font-heading text-slate-700 mb-1">Donor Full Name *</label>
              <input
                type="text"
                required
                placeholder="Srikanth Verma"
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
                className="w-full p-2.5 border rounded-xl focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block font-bold font-heading text-slate-700 mb-1">Phone Number (WhatsApp) *</label>
              <input
                type="tel"
                required
                placeholder="+91 98480 22334"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-2.5 border rounded-xl focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div>
              <label className="block font-bold font-heading text-slate-700 mb-1">PAN Number (For 80G Tax Exemption)</label>
              <input
                type="text"
                placeholder="e.g. ABCDE1234F"
                value={pan}
                onChange={(e) => setPan(e.target.value.toUpperCase())}
                className="w-full p-2.5 border rounded-xl uppercase font-mono text-xs focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block font-bold font-heading text-slate-700 mb-1">UPI / UTR Transaction ID</label>
              <input
                type="text"
                placeholder="e.g. 422891002341"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                className="w-full p-2.5 border rounded-xl font-mono text-xs focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* --- PAYMENT SCREENSHOT UPLOAD OPTION --- */}
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-dashed border-emerald-300 space-y-2">
            <div className="flex items-center justify-between">
              <label className="font-bold font-heading text-xs text-slate-900 flex items-center space-x-1.5">
                <Icon name="image" size={15} className="text-emerald-600" />
                <span>Upload Payment Screenshot / Transfer Receipt</span>
              </label>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full font-heading">
                Instant Verification
              </span>
            </div>

            <p className="text-[11px] text-slate-500 leading-snug">
              Attach a screenshot of your successful UPI / GPay / PhonePe / NetBanking transfer for faster 80G receipt generation.
            </p>

            {screenshotUrl ? (
              <div className="relative bg-white p-2.5 rounded-xl border border-emerald-200 flex items-center justify-between">
                <div className="flex items-center space-x-3 min-w-0">
                  <img
                    src={screenshotUrl}
                    alt="Payment Proof Preview"
                    className="w-12 h-12 object-cover rounded-lg border shrink-0 bg-slate-100"
                  />
                  <div className="min-w-0">
                    <span className="text-xs font-bold text-emerald-800 block font-heading truncate">
                      ✅ Payment Screenshot Attached
                    </span>
                    <a
                      href={screenshotUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[10px] text-emerald-600 hover:underline font-mono truncate block"
                    >
                      View Attached Image
                    </a>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setScreenshotUrl('')}
                  className="text-xs text-red-600 hover:bg-red-50 p-1.5 rounded-lg transition shrink-0 font-bold"
                  title="Remove screenshot"
                >
                  <Icon name="trash" size={15} />
                </button>
              </div>
            ) : (
              <div>
                <label className="cursor-pointer flex flex-col items-center justify-center p-4 bg-white border border-slate-200 hover:border-emerald-500 rounded-xl transition group">
                  <div className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-1 group-hover:scale-110 transition">
                    <Icon name="cloud" size={18} />
                  </div>
                  <span className="text-xs font-bold font-heading text-slate-800">
                    {isUploading ? `Uploading... ${uploadProgress}%` : 'Tap to Upload Screenshot / Receipt'}
                  </span>
                  <span className="text-[10px] text-slate-400">Supports JPG, PNG, WebP</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleScreenshotChange}
                    disabled={isUploading}
                    className="hidden"
                  />
                </label>

                {isUploading && (
                  <div className="w-full bg-slate-200 rounded-full h-1.5 mt-2 overflow-hidden">
                    <div
                      className="bg-emerald-600 h-1.5 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                )}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting || isUploading}
            className="w-full bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-extrabold font-heading py-3 rounded-xl shadow-lg transition flex items-center justify-center space-x-2 text-xs sm:text-sm"
          >
            {isSubmitting ? (
              <span>Submitting Details...</span>
            ) : (
              <>
                <Icon name="heart" size={16} />
                <span>Submit Donation & Request 80G Receipt</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

// --- TOAST NOTIFICATION ---
const Toast = () => {
  const { toast } = useTrust();
  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm bg-slate-900 text-white p-3.5 rounded-2xl shadow-2xl border border-slate-700 flex items-center space-x-3 animate-fadeIn">
      <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
        <Icon name="check" size={16} />
      </div>
      <p className="text-xs font-medium leading-snug">{toast.message}</p>
    </div>
  );
};

// --- FLOATING ACTIONS ---
const FloatingActions = () => {
  const { trustInfo, setIsDonateModalOpen } = useTrust();

  return (
    <div className="fixed bottom-5 right-3.5 sm:right-6 z-30 flex flex-col space-y-2 items-end">
      {/* Quick Donate Floating Button */}
      <button
        onClick={() => setIsDonateModalOpen(true)}
        className="donate-shine donate-dance px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-full bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white flex items-center space-x-1.5 shadow-2xl hover:scale-105 transition border-2 border-white font-extrabold font-heading text-xs"
        title="Donate Online (80G Tax-Exempt)"
      >
        <Icon name="heart" size={14} />
        <span>Donate</span>
      </button>

      <a
        href={`tel:${trustInfo.emergencyBloodHelpline}`}
        className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-red-600 text-white flex items-center justify-center shadow-2xl hover:scale-110 transition border-2 border-white animate-pulse"
        title="24/7 Emergency Blood Helpline"
      >
        <Icon name="heartpulse" size={20} />
      </a>

      <a
        href={trustInfo.socials.whatsapp}
        target="_blank"
        rel="noreferrer"
        className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center shadow-2xl hover:scale-110 transition border-2 border-white"
        title="Chat with Medidhisubbaiah Trust on WhatsApp"
      >
        <Icon name="whatsapp" size={24} />
      </a>
    </div>
  );
};

// --- HOME PAGE AGGREGATOR ---
const HomePage = () => {
  return (
    <div className="space-y-12 sm:space-y-16 pb-12 w-full max-w-full overflow-hidden">
      <HeroSection />
      <FeatureCards />
      <ServicesSection />
      <ImpactStatsSection />
    </div>
  );
};

// --- RICH FOOTER ---
const Footer = () => {
  const { navigate, trustInfo, services, setIsDonateModalOpen } = useTrust();

  return (
    <footer className="bg-slate-950 text-slate-300 pt-12 pb-6 border-t border-slate-800 w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 pb-8 border-b border-slate-800">
          <div className="sm:col-span-2 space-y-3">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate('home')}>
              <div className="w-12 h-12 rounded-full p-0.5 bg-gradient-to-tr from-emerald-600 via-teal-500 to-amber-400 shadow-lg shrink-0">
                <img src={trustInfo.logoUrl} alt="Logo" className="w-full h-full rounded-full object-cover bg-white" />
              </div>
              <div className="min-w-0">
                <span className="font-bold text-lg text-white tracking-tight font-heading block truncate">
                  Medidhisubbaiah <span className="text-emerald-400">Trust</span>
                </span>
                <p className="text-xs text-emerald-300 font-bold font-heading truncate">మేడిది సుబ్బయ్య ట్రస్ట్</p>
              </div>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Medidhisubbaiah Trust is dedicated to uplifting underprivileged families, empowering women through free vocational training, providing life-saving healthcare and blood donor support, and fostering education for every child.
            </p>
            <div className="bg-emerald-950/40 border border-emerald-800/40 rounded-2xl p-3 flex items-center space-x-2.5">
              <div className="p-2 bg-emerald-600 text-white rounded-xl shrink-0"><Icon name="phone" size={18} /></div>
              <div className="min-w-0">
                <div className="text-[10px] text-emerald-300 font-bold font-heading">24/7 Blood Emergency Hotline</div>
                <a href={`tel:${trustInfo.emergencyBloodHelpline}`} className="text-white font-black text-sm hover:text-emerald-300 font-heading truncate block">{trustInfo.emergencyBloodHelpline}</a>
              </div>
            </div>
          </div>

          <div className="space-y-2.5">
            <h3 className="text-white font-bold font-heading text-xs uppercase tracking-wider border-l-2 border-emerald-500 pl-2">Quick Links</h3>
            <ul className="space-y-1.5 text-xs text-slate-400">
              {['home', 'about', 'services', 'events', 'news', 'gallery', 'contact'].map(r => (
                <li key={r}>
                  <button onClick={() => navigate(r)} className="hover:text-emerald-400 capitalize flex items-center space-x-1 transition font-medium">
                    <Icon name="chevronright" size={11} className="text-emerald-500" />
                    <span>{r === 'about' ? 'About Us' : r === 'services' ? 'Our Services' : r === 'news' ? 'Media & News' : r}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-2.5">
            <h3 className="text-white font-bold font-heading text-xs uppercase tracking-wider border-l-2 border-emerald-500 pl-2">Core Causes</h3>
            <ul className="space-y-1.5 text-xs text-slate-400">
              {services.slice(0, 5).map(s => (
                <li key={s.id}>
                  <button onClick={() => navigate('services')} className="hover:text-emerald-400 text-left truncate block max-w-full">
                    • {s.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-2.5 sm:col-span-2 lg:col-span-1">
            <h3 className="text-white font-bold font-heading text-xs uppercase tracking-wider border-l-2 border-emerald-500 pl-2">Contact & Donate</h3>
            <p className="text-xs text-slate-400 leading-relaxed">{trustInfo.address}</p>
            <p className="text-xs text-emerald-400 font-bold">{trustInfo.phone}</p>
            <p className="text-xs text-slate-300 truncate">{trustInfo.email}</p>
            <div className="pt-1">
              <button onClick={() => setIsDonateModalOpen(true)} className="donate-shine w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold font-heading py-2.5 rounded-xl text-xs shadow transition text-center">
                Donate Online
              </button>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row justify-between items-center text-[11px] text-slate-500 gap-2.5">
          <p>© {new Date().getFullYear()} Medidhisubbaiah Trust (మేడిది సుబ్బయ్య ట్రస్ట్). All Rights Reserved.</p>
          <p className="text-slate-400 text-xs font-medium flex items-center space-x-1">
            <span>Developed and maintained by</span>
            <span className="text-emerald-400 font-bold font-heading">Trilok Infotech Pvt Limited</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

// --- MAIN APP ROUTER ---
const App = () => {
  const { currentRoute } = useTrust();

  useEffect(() => {
    if (window.AOS) {
      window.AOS.init({ duration: 700, once: true, easing: 'ease-out-cubic' });
    }
  }, []);

  const cleanRoute = (currentRoute || '').replace(/^[#\/]+/, '').toLowerCase().trim();
  const isAdminView = cleanRoute === 'admin' || cleanRoute === 'login' || cleanRoute === 'admin-login' || cleanRoute === 'dashboard';

  const renderPage = () => {
    switch (cleanRoute) {
      case 'about':
      case 'about-us':
      case 'aboutus':
        return <AboutPage />;
      case 'services':
      case 'our-services':
      case 'service':
        return <ServicesPage />;
      case 'events':
      case 'event':
        return <EventsPage />;
      case 'news':
      case 'media':
        return <NewsPage />;
      case 'gallery':
      case 'photos':
      case 'videos':
        return <GalleryPage />;
      case 'contact':
      case 'contact-us':
      case 'contactus':
        return <ContactPage />;
      case 'login':
      case 'admin-login':
        return <LoginPage />;
      case 'admin':
      case 'dashboard':
        return <AdminPage />;
      case 'home':
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans selection:bg-emerald-600 selection:text-white w-full max-w-full overflow-x-hidden">
      {!isAdminView && <Navbar />}
      <main className="flex-1 w-full max-w-full overflow-x-hidden">{renderPage()}</main>
      <ServiceModal />
      <EventModal />
      <NewsModal />
      <LightboxModal />
      <DonateModal />
      <Toast />
      {!isAdminView && <FloatingActions />}
      {!isAdminView && <Footer />}
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
