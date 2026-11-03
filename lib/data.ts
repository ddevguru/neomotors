export interface Product {
  id: string
  slug: string
  name: string
  brand: string
  collectionId: string
  collectionName: string
  price: number
  priceFormatted: string
  originalPrice?: string
  scale: string
  material: string
  image: string
  gallery: string[]
  tag: string
  year: number
  chassisNumber: string
  editionSize: number
  stockLeft: number
  description: string
  story: string
  specs: {
    origin: string
    lacquer: string
    chassis: string
    wheels: string
    camber: string
    packaging: string
    weight: string
  }
}

export interface Collection {
  id: string
  number: string
  tag: string
  badge: string
  title: string
  marques: string
  copy: string
  lead: string
  image: string
  color: string
  heroBanner: string
  specimenCount: number
}

export interface Brand {
  name: string
  slug: string
  origin: string
  founded: string
  specialty: string
  desc: string
  longDesc: string
  modelsCount: number
  logoText: string
  tagline: string
  image: string
}

export const COLLECTIONS: Collection[] = [
  {
    id: 'european-icons',
    number: '01',
    tag: 'CONTINENTAL PRESTIGE',
    badge: '12 ARCHIVE MODELS',
    title: 'European Icons',
    marques: 'Porsche • Ferrari • BMW • Mercedes',
    copy: 'Stuttgart, Maranello & Sant’Agata Bolognese silhouette perfection.',
    lead: 'Precision aerodynamic arches, iconic boxer engines, and race homologation royalty from the world’s most revered continental workshops.',
    image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=85',
    color: '#8A1538',
    heroBanner: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=85',
    specimenCount: 12,
  },
  {
    id: 'jdm-legends',
    number: '02',
    tag: 'MIDNIGHT TOKYO',
    badge: '16 CULT EDITIONS',
    title: 'JDM Legends',
    marques: 'Skyline GT-R • RX-7 FD • Supra • NSX',
    copy: 'Precision rev-limit folklore and Kanagawa midnight touge mastery.',
    lead: 'The apex of Japanese golden-era sports engineering — twin-turbo inline sixes, rotary apex seals, and aerodynamic widebody silhouettes.',
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=85',
    color: '#1B365D',
    heroBanner: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1600&q=85',
    specimenCount: 16,
  },
  {
    id: 'detroit-muscle',
    number: '03',
    tag: 'DETROIT STEEL',
    badge: '10 V8 LEGENDS',
    title: 'American Muscle',
    marques: 'Shelby GT500 • Corvette Stingray • Charger',
    copy: 'Raw big-block displacement, fastback muscle, and dragstrip provenance.',
    lead: 'The raw, thunderous power of Woodward Avenue and Quarter-Mile supremacy — sculpted steel fastbacks, shaker hoods, and racing stripes.',
    image: 'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=1200&q=85',
    color: '#7C3A21',
    heroBanner: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1600&q=85',
    specimenCount: 10,
  },
]

export const BRANDS: Brand[] = [
  {
    name: 'MINI GT',
    slug: 'mini-gt',
    origin: 'HONG KONG / USA',
    founded: 'EST. 2017',
    specialty: 'Exacting 1:64 Diecast Precision & Modern Supercars',
    desc: 'Exacting 1:64 Diecast Precision with official manufacturer CAD tooling and soft rubber tires.',
    longDesc: 'MINI GT marks the start of a new era in 1:64 scale. Born from the minds of TS-Model, each casting balances price and museum-quality detail with realistic brake calipers, rolling wheels, and authentic manufacturer liveries.',
    modelsCount: 14,
    logoText: 'MINI GT',
    tagline: '1:64 Scale Reimagined',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=85',
  },
  {
    name: 'TARMAC WORKS',
    slug: 'tarmac-works',
    origin: 'HONG KONG',
    founded: 'EST. 2014',
    specialty: 'Motorsport, FIA GT & Japanese Tuning Culture',
    desc: 'Motorsport & FIA GT Icons crafted for race car purists and touring car aficionados.',
    longDesc: 'Tarmac Works specializes in tarmac motorsport legends — Macau Grand Prix touring champions, GT3 endurance warfare, and custom tuner editions with opening parts and high-detail decals.',
    modelsCount: 11,
    logoText: 'TARMAC',
    tagline: 'Pure Motorsport DNA',
    image: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=800&q=85',
  },
  {
    name: 'POP RACE',
    slug: 'pop-race',
    origin: 'HONG KONG',
    founded: 'EST. 2019',
    specialty: 'Stage Liveries, Pandem Bodykits & Working Features',
    desc: 'Stage Liveries & Custom Tuners featuring active engine bays and opening hoods.',
    longDesc: 'POP RACE captures the wild energy of Japanese drift stages and bespoke time attack monsters. Renowned for functional parts, detailed titanium exhaust tips, and authentic sponsor graphics.',
    modelsCount: 9,
    logoText: 'POP RACE',
    tagline: 'Radical Custom Culture',
    image: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=800&q=85',
  },
  {
    name: 'HOT WHEELS',
    slug: 'hot-wheels',
    origin: 'EL SEGUNDO, USA',
    founded: 'EST. 1968',
    specialty: 'Redline & Collector Real Riders',
    desc: 'Redline & Premium Heritage with diecast metal chassis and Real Riders rubber wheels.',
    longDesc: 'Since 1968, Hot Wheels has shaped car enthusiast culture worldwide. The Premium Collector Series delivers full diecast metal/metal construction and licensed motorsport replicas.',
    modelsCount: 18,
    logoText: 'HOT WHEELS',
    tagline: 'The Definitive Icon',
    image: 'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=800&q=85',
  },
  {
    name: 'BBURAGO',
    slug: 'bburago',
    origin: 'ITALY',
    founded: 'EST. 1974',
    specialty: 'Official Ferrari Lineage & Maranello Heritage',
    desc: 'Official Ferrari & Exotic Lineage with authorized factory CAD accuracy.',
    longDesc: 'Italian craftsmanship at scale. Bburago holds the prestigious official Ferrari diecast license, capturing Maranello hypercars and Formula 1 contenders down to the exact Rosso Corsa paint codes.',
    modelsCount: 8,
    logoText: 'BBURAGO',
    tagline: 'Italian Exotics Mastered',
    image: 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=800&q=85',
  },
  {
    name: 'TOMICA',
    slug: 'tomica',
    origin: 'TOKYO, JAPAN',
    founded: 'EST. 1970',
    specialty: 'Cult Japanese Castings & Vintage Neo Series',
    desc: 'Cult Japanese Castings with iconic suspension damping and showroom authenticity.',
    longDesc: 'Tomica Limited Vintage (TLV) represents the pinnacle of Japanese miniature fidelity. Exacting scale, working suspension, and period-correct Japanese classic automobiles.',
    modelsCount: 10,
    logoText: 'TOMICA',
    tagline: 'Japanese Heritage Craft',
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=85',
  },
  {
    name: 'MAJORETTE',
    slug: 'majorette',
    origin: 'FRANCE',
    founded: 'EST. 1961',
    specialty: 'European Hot Hatches & Dakar Legends',
    desc: 'French precision with working suspension and transparent acrylic headlight lenses.',
    longDesc: 'France’s proudest miniature icon, crafting distinct European silhouettes with suspension travel and opening doors that purists cherish.',
    modelsCount: 6,
    logoText: 'MAJORETTE',
    tagline: 'French Miniature Precision',
    image: 'https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=800&q=85',
  },
  {
    name: 'MATCHBOX',
    slug: 'matchbox',
    origin: 'UNITED KINGDOM',
    founded: 'EST. 1953',
    specialty: 'Historical Workhorses & Collector Reissues',
    desc: 'British heritage packaging and rugged, authentic utility machines.',
    longDesc: 'The pioneer of miniature diecast. Matchbox continues to celebrate original utility classics and grand touring sports coupes with historic charm.',
    modelsCount: 7,
    logoText: 'MATCHBOX',
    tagline: 'The Original Pioneer',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=85',
  },
  {
    name: 'KINSMART',
    slug: 'kinsmart',
    origin: 'HONG KONG',
    founded: 'EST. 1992',
    specialty: 'Exotic Supercar Editions & Pullback Classics',
    desc: 'Accurate exotic proportions with opening scissor doors and alloy body shell.',
    longDesc: 'Delivering accessible exotic automotive scale with durable zinc alloys and opening doors for modern supercar enthusiasts.',
    modelsCount: 5,
    logoText: 'KINSMART',
    tagline: 'Exotics for Every Collector',
    image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=800&q=85',
  },
]

export const PRODUCTS: Product[] = [
  {
    id: 'porsche-911-gt3-rs',
    slug: 'porsche-911-gt3-rs',
    name: 'Porsche 911 GT3 RS (992)',
    brand: 'MINI GT',
    collectionId: 'european-icons',
    collectionName: 'European Icons',
    price: 1899,
    priceFormatted: '₹1,899',
    originalPrice: '₹2,299',
    scale: '1:64',
    material: 'Diecast Zinc Alloy + ABS Resin',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1200&q=85',
    ],
    tag: 'EDITORIAL PICK',
    year: 2023,
    chassisNumber: 'NM-992-GT3-042',
    editionSize: 999,
    stockLeft: 4,
    description: 'The pinnacle of Weissach aerodynamics in exacting 1:64 scale. Featuring an authentic swan-neck carbon wing, authentic DRS louvers, and staggered Michelin Cup 2 R rubber rolling wheels.',
    story: 'Engineered directly from Porsche OEM CAD files, this 1:64 replica captures the visceral road-legal track weapon in stunning Arctic Grey with Weissach package carbon fiber accents.',
    specs: {
      origin: 'Stuttgart, Germany',
      lacquer: '4-stage OEM Arctic Grey with UV-cured gloss clear coat',
      chassis: 'Full diecast metal underbody with engraved chassis serial plate',
      wheels: 'Forged magnesium-style lightweight rims with real rubber tires',
      camber: 'Authentic 1.8° negative track camber setup',
      packaging: 'Museum-grade magnetic acrylic display case + numbered certificate',
      weight: '68 grams (High density alloy)',
    },
  },
  {
    id: 'mercedes-benz-300-sl',
    slug: 'mercedes-benz-300-sl',
    name: 'Mercedes-Benz 300 SL Gullwing',
    brand: 'TARMAC WORKS',
    collectionId: 'european-icons',
    collectionName: 'European Icons',
    price: 2450,
    priceFormatted: '₹2,450',
    originalPrice: '₹2,899',
    scale: '1:64',
    material: 'Diecast Zinc Alloy + Photo-Etched Chrome',
    image: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1200&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=1200&q=85',
    ],
    tag: 'LIMITED EDITION',
    year: 1954,
    chassisNumber: 'NM-300SL-019',
    editionSize: 500,
    stockLeft: 2,
    description: 'The most iconic silhouette in motorsport history. Featuring fully articulated upward-opening gullwing doors, tartan plaid upholstered interior, and mirror-finished chrome bumpers.',
    story: 'Born for the Carrera Panamericana and Mille Miglia, the W198 Gullwing changed automotive design forever. Hand-polished silver lacquer captures the unmistakable tubular spaceframe body.',
    specs: {
      origin: 'Stuttgart, Germany',
      lacquer: 'Classic DB180 Silver metallic with hand-rubbed mirror finish',
      chassis: 'Diecast chassis with authentic twin-pipe exhaust route',
      wheels: 'Color-matched hubcap wheels with vintage Avon rubber tires',
      camber: 'Period-correct swing-axle geometry',
      packaging: 'Leatherette presentation case with velvet inlay',
      weight: '72 grams',
    },
  },
  {
    id: 'lamborghini-countach-lpi800-4',
    slug: 'lamborghini-countach-lpi800-4',
    name: 'Lamborghini Countach LPI 800-4',
    brand: 'BBURAGO',
    collectionId: 'european-icons',
    collectionName: 'European Icons',
    price: 1299,
    priceFormatted: '₹1,299',
    scale: '1:64',
    material: 'Diecast Zinc Alloy + Tinted Acrylic',
    image: 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1200&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=85',
    ],
    tag: 'NEW ARRIVAL',
    year: 2022,
    chassisNumber: 'NM-LPI800-088',
    editionSize: 1200,
    stockLeft: 7,
    description: 'The futuristic revival of Sant’Agata Bolognese’s most outrageous wedge. Quad exhaust tips, phone-dial wheels, and sharp triangular side air intakes recreated in precise scale.',
    story: 'Paying tribute to Marcello Gandini’s original 1971 masterpiece, this hybrid V12 hypercar model brings iconic Italian wedge styling into modern collector showcases.',
    specs: {
      origin: 'Sant’Agata Bolognese, Italy',
      lacquer: 'Bianco Siderale pearlescent white multi-coat',
      chassis: 'Engineered metal base with diffuser channels',
      wheels: 'Heritage phone-dial wheels in matte bronze',
      camber: 'Aggressive street track stance',
      packaging: 'Window box with collector serial verification card',
      weight: '64 grams',
    },
  },
  {
    id: 'nissan-skyline-gtr-r34-vspec',
    slug: 'nissan-skyline-gtr-r34-vspec',
    name: 'Nissan Skyline GT-R R34 V-Spec II',
    brand: 'POP RACE',
    collectionId: 'jdm-legends',
    collectionName: 'JDM Legends',
    price: 2150,
    priceFormatted: '₹2,150',
    originalPrice: '₹2,500',
    scale: '1:64',
    material: 'Diecast Metal + Carbon Fiber Decals',
    image: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=85',
    ],
    tag: 'COLLECTOR SERIES',
    year: 2000,
    chassisNumber: 'NM-BNR34-077',
    editionSize: 750,
    stockLeft: 3,
    description: 'Godzilla in its purest form. Bayside Blue lacquer with working opening hood that reveals the twin-turbo RB26DETT engine bay with twin ceramic turbos and intake plenum.',
    story: 'The undisputed monarch of Japanese sports car culture. From the Tokyo Bayshore Expressway (Wangan) to Suzuka, the R34 GT-R V-Spec II remains automotive perfection.',
    specs: {
      origin: 'Tochigi, Japan',
      lacquer: 'Iconic TV2 Bayside Blue with deep pearl lacquer',
      chassis: 'Full metal chassis with carbon rear diffuser plate',
      wheels: 'Forged 6-spoke NISMO LMGT4 style wheels in bronze',
      camber: '2.0° negative track camber',
      packaging: 'Acrylic display case with etched carbon-weave base plaque',
      weight: '70 grams',
    },
  },
  {
    id: 'mazda-rx7-fd3s-spirit-r',
    slug: 'mazda-rx7-fd3s-spirit-r',
    name: 'Mazda RX-7 FD3S Spirit R Type-A',
    brand: 'MINI GT',
    collectionId: 'jdm-legends',
    collectionName: 'JDM Legends',
    price: 1950,
    priceFormatted: '₹1,950',
    scale: '1:64',
    material: 'Diecast Zinc Alloy',
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=85',
    ],
    tag: 'LIMITED RUN',
    year: 2002,
    chassisNumber: 'NM-FD3S-104',
    editionSize: 600,
    stockLeft: 5,
    description: 'The zenith of sequential twin-rotor automotive art. Titanium Grey metallic finish with red Recaro carbon-Kevlar bucket seats visible through crystal-clear cockpit glazing.',
    story: 'The final swansong of the FD3S platform, the Spirit R Type-A is revered as one of the most balanced chassis ever conceived. 13B-REW twin-turbo twin rotor legend.',
    specs: {
      origin: 'Hiroshima, Japan',
      lacquer: 'Titanium Grey 25G with microscopic aluminum flakes',
      chassis: 'Diecast base with quad tailpipe detailing',
      wheels: 'Gunmetal BBS multi-spoke alloy wheels with rubber tread',
      camber: 'Period touge stance',
      packaging: 'Museum acrylic case + authenticated certificate',
      weight: '62 grams',
    },
  },
  {
    id: 'ford-mustang-shelby-gt500-1967',
    slug: 'ford-mustang-shelby-gt500-1967',
    name: '1967 Shelby GT500 "Eleanor"',
    brand: 'HOT WHEELS',
    collectionId: 'detroit-muscle',
    collectionName: 'American Muscle',
    price: 1750,
    priceFormatted: '₹1,750',
    originalPrice: '₹1,999',
    scale: '1:64',
    material: 'Full Diecast Metal/Metal + Real Riders',
    image: 'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=1200&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=85',
    ],
    tag: 'VINTAGE MUSCLE',
    year: 1967,
    chassisNumber: 'NM-SHELBY-067',
    editionSize: 1500,
    stockLeft: 8,
    description: 'Raw Carroll Shelby thunder. Dual Le Mans racing stripes over pepper grey lacquer, high-rise hood scoop, side-exit dual exhaust pipes, and American Racing mag wheels.',
    story: 'Conceived by Carroll Shelby with a 428 Police Interceptor V8, this fastback king defined the golden era of American road muscle with tyre-smoking authority.',
    specs: {
      origin: 'Venice, California / Dearborn, USA',
      lacquer: 'Pepper Grey with jet black twin Le Mans racing stripes',
      chassis: 'Full metal chassis with functional Real Riders rubber wheels',
      wheels: 'American Racing polished mag alloy replica wheels',
      camber: 'Rake stance (raised rear leaf spring setup)',
      packaging: 'Premium clamshell card with blister protector',
      weight: '76 grams',
    },
  },
  {
    id: 'chevrolet-corvette-c2-sting-ray',
    slug: 'chevrolet-corvette-c2-sting-ray',
    name: '1963 Chevrolet Corvette C2 Split-Window',
    brand: 'HOT WHEELS',
    collectionId: 'detroit-muscle',
    collectionName: 'American Muscle',
    price: 1850,
    priceFormatted: '₹1,850',
    scale: '1:64',
    material: 'Diecast Metal Body + Real Riders Rubber',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=85',
    ],
    tag: 'RARE FIND',
    year: 1963,
    chassisNumber: 'NM-C2SW-063',
    editionSize: 800,
    stockLeft: 2,
    description: 'Larry Shinoda & Bill Mitchell’s masterpiece. The famous one-year-only split rear window fastback coupe, knock-off turbine wheels, and concealed pop-up headlights.',
    story: 'Only produced for the 1963 model year, the Split-Window Coupe is widely regarded as the most beautiful Corvette ever designed. Powered by the fuel-injected 327 V8.',
    specs: {
      origin: 'St. Louis, Missouri, USA',
      lacquer: 'Riverside Red multi-layer lacquer',
      chassis: 'Diecast metal chassis with independent rear suspension molding',
      wheels: 'Finned turbine aluminum knock-off wheels with thin whitewall tires',
      camber: 'Neutral road stance',
      packaging: 'Museum acrylic display box with metal plaque',
      weight: '69 grams',
    },
  },
  {
    id: 'ferrari-f40-competizione',
    slug: 'ferrari-f40-competizione',
    name: 'Ferrari F40 Competizione',
    brand: 'BBURAGO',
    collectionId: 'european-icons',
    collectionName: 'European Icons',
    price: 2200,
    priceFormatted: '₹2,200',
    originalPrice: '₹2,600',
    scale: '1:64',
    material: 'Diecast Zinc Alloy + Photo-Etch Mesh',
    image: 'https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=1200&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=1200&q=85',
    ],
    tag: 'MARANELLO CULT',
    year: 1989,
    chassisNumber: 'NM-F40COMP-001',
    editionSize: 850,
    stockLeft: 4,
    description: 'Enzo Ferrari’s final masterstroke turned into an unrestricted race monster. Kevlar weave texture beneath Rosso Corsa lacquer, triple center exhaust, and high-downforce rear wing.',
    story: 'Built to celebrate Ferrari’s 40th anniversary, the F40 was the first production car to shatter 200 mph. The Competizione takes it further with twin enlarged IHI turbochargers.',
    specs: {
      origin: 'Maranello, Italy',
      lacquer: 'Rosso Corsa (Color Code 300/12) with ultra-thin race lacquer',
      chassis: 'Tubular steel chassis simulation base',
      wheels: 'OZ Racing 5-spoke center-lock magnesium wheels',
      camber: '2.2° negative race camber',
      packaging: 'Numbered Scuderia red box + acrylic showcase',
      weight: '67 grams',
    },
  },
]
