// MOCK DATA ONLY (frontend-only). Later we'll replace with backend APIs.

const STORAGE_KEYS = {
  blogPosts: "portfolio_mock_blog_posts_v1",
  testimonials: "portfolio_mock_testimonials_v1",
  contactMessages: "portfolio_mock_contact_messages_v1",
};

function safeJsonParse(raw, fallback) {
  try {
    const parsed = JSON.parse(raw);
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
}

export const baseProfile = {
  name: "HEMASHREE K",
  title: "Full Stack .NET Developer",
  location: "Bengaluru, Karnataka",
  email: "hemaskg96@gmail.com",
  phone: "+91 93806 69550",
  linkedin: "https://www.linkedin.com/in/hemashree-k-9438171b0",
  github: "https://github.com/Hemashr",
  resumeUrl:
    "https://customer-assets.emergentagent.com/job_job-hunter-45/artifacts/gj0zbby0_FE4B3527.pdf",
  summary:
    "Full Stack .NET Developer with 2+ years of experience building and deploying web applications using C#, ASP.NET Core, Web API, Angular/React, and SQL Server. Strong in LINQ, DI, design patterns, responsive UI, and CI/CD with Azure DevOps. Comfortable owning modules end-to-end and supporting production.",
};

export const skills = {
  backend: [
    "C#",
    ".NET Core",
    "ASP.NET MVC",
    "ASP.NET Web API",
    "Entity Framework",
    "LINQ",
    "Dependency Injection",
    "REST APIs",
    "OOP",
  ],
  frontend: [
    "Angular",
    "React.js",
    "TypeScript",
    "JavaScript",
    "HTML5",
    "CSS3",
    "jQuery",
    "AJAX",
    "Responsive Web Design",
  ],
  database: [
    "SQL Server",
    "SSMS",
    "Stored Procedures",
    "Transactions",
    "Query Optimization",
  ],
  testing: ["NUnit", "xUnit", "Moq", "Unit Testing", "Debugging"],
  devops: [
    "Azure DevOps (TFS)",
    "Git",
    "GitHub",
    "CI/CD pipelines",
    "IIS deployments",
    "Jenkins (basic)",
    "Elasticsearch/Kibana (monitoring)",
  ],
  waysOfWorking: [
    "Agile/Scrum",
    "SDLC",
    "Design Patterns",
    "Code Reviews",
    "Documentation",
  ],
};

export const experience = [
  {
    id: "exp_winwire_sde",
    company: "WinWire Technologies",
    title: "Software Design Engineer",
    location: "Bengaluru, IN",
    start: "2024-05",
    end: "Present",
    highlights: [
      "Enhanced server-hosted .NET apps (C#, ASP.NET Core, Web API, MVC, LINQ, DI).",
      "Designed and consumed REST APIs with validation and error handling.",
      "Streamlined releases with Azure DevOps + GitHub Actions.",
      "Built responsive interfaces with Angular + modern web stack.",
      "Optimized SQL Server queries and deployed upgrades on IIS.",
    ],
  },
  {
    id: "exp_winwire_trainee",
    company: "WinWire Technologies",
    title: "Software Design Trainee",
    location: "Bengaluru, IN",
    start: "2023-11",
    end: "2024-05",
    highlights: [
      "Built responsive UI using Angular, TypeScript, Aurelia.",
      "Supported ASP.NET Core / Web API development and testing.",
      "Implemented Azure Pipelines automation.",
      "Integrated Elasticsearch + Kibana for monitoring.",
      "Owned modules end-to-end, from design to delivery.",
    ],
  },
  {
    id: "exp_sharp_trainee",
    company: "Sharp Software Development India",
    title: "Software Trainee",
    location: "Bengaluru, IN",
    start: "2023-07",
    end: "2023-09",
    highlights: [
      "Built facial recognition-based MCQ exam system for stronger authentication.",
      "Worked on Java/Python apps, troubleshooting and code reviews.",
    ],
  },
  {
    id: "exp_equalize_intern",
    company: "EqualizeRCM",
    title: "Software Intern",
    location: "Mysuru, IN",
    start: "2023-05",
    end: "2023-07",
    highlights: [
      "Built desktop app to automate audit checkpoint tracking.",
      "Assisted debugging/testing and requirements analysis.",
    ],
  },
];

// Resume didn't include projects explicitly; these are placeholders you can edit.
export const starterProjects = [
  {
    id: "proj_release-automation",
    name: "Release Automation Toolkit",
    tagline: "Automated build + deploy workflows to reduce manual release steps.",
    description:
      "A set of reusable pipeline templates and scripts to standardize CI/CD across projects. Focused on repeatable deployments, safer rollbacks, and consistent environments.",
    tech: ["Azure DevOps", "GitHub Actions", "PowerShell", ".NET"],
    impact: [
      "Reduced manual release effort",
      "Improved deployment consistency",
      "Made rollbacks predictable",
    ],
    links: [{ label: "GitHub", url: "https://github.com/Hemashr" }],
  },
  {
    id: "proj_api-platform",
    name: "REST API Platform",
    tagline: "Validation-first APIs with clear errors and traceability.",
    description:
      "Designed Web APIs with strong input validation, standardized error responses, and clean separation of concerns. Implemented DI and patterns for maintainability.",
    tech: ["ASP.NET Core", "Web API", "Entity Framework", "SQL Server"],
    impact: [
      "Cleaner integration for clients",
      "Fewer production defects",
      "Faster onboarding for new devs",
    ],
    links: [{ label: "LinkedIn", url: baseProfile.linkedin }],
  },
  {
    id: "proj_monitoring",
    name: "App Monitoring Dashboard",
    tagline: "Observability using Elasticsearch + Kibana.",
    description:
      "Instrumented apps and created dashboards to track performance and error trends. Used logs and metrics to triage issues and validate improvements.",
    tech: ["Elasticsearch", "Kibana", "IIS", "Azure"],
    impact: [
      "Faster incident triage",
      "Better visibility into bottlenecks",
      "Improved stability",
    ],
    links: [],
  },
];

export const education = [
  {
    id: "edu_mca",
    degree: "MCA (Master of Computer Applications)",
    institution: "JSS Science & Technology University",
    dates: "2022 – 2023",
  },
  {
    id: "edu_bca",
    degree: "BCA (Bachelor of Computer Applications)",
    institution: "Hindustan First Grade College, J.P. Nagar, Mysuru",
    dates: "2018 – 2021",
  },
];

export const certifications = [
  {
    id: "cert_az900",
    name: "Microsoft Certified: Azure Fundamentals",
    issuer: "Microsoft",
  },
  {
    id: "cert_github",
    name: "Career Essentials in GitHub Professional Certificate",
    issuer: "GitHub",
  },
  {
    id: "cert_ts_oop",
    name: "TypeScript: Object Oriented Programming",
    issuer: "Online",
  },
];

export const achievements = [
  {
    id: "ach_q1_award",
    title: "Q1 2024–2025 Award",
    org: "WinWire Technologies",
    note: "Recognized for delivery and impact.",
  },
  {
    id: "ach_hackathon",
    title: "Hackathon Winner",
    org: "WinWire",
    note: "Won “Most Efficient Idea” & “People’s Choice”.",
  },
];

const seedBlogPosts = [
  {
    id: "post_api-design",
    title: "API Design Notes: Validation-first Web APIs",
    date: "2025-06-15",
    tags: ["dotnet", "api", "patterns"],
    excerpt:
      "A practical checklist I use when building ASP.NET Core APIs: validation, error shape, and maintainability.",
    content:
      "Outline:\n- Model validation\n- Consistent error payloads\n- DI and testability\n- Logging and correlation IDs\n",
  },
  {
    id: "post_ci-cd",
    title: "CI/CD Basics: Making Deployments Boring",
    date: "2025-05-02",
    tags: ["devops", "azure"],
    excerpt:
      "What I learned while automating deployments: small steps, repeatability, and clear rollback paths.",
    content:
      "Add screenshots or code snippets later.\n\nKey ideas:\n- Build once, deploy many\n- Environment config discipline\n- Smoke tests\n",
  },
];

const seedTestimonials = [
  {
    id: "t1",
    name: "Team Lead (Sample)",
    role: "Engineering Lead",
    quote:
      "Hemashree is reliable, fast to learn, and owns modules end-to-end. Great at communicating and unblocking the team.",
  },
  {
    id: "t2",
    name: "Peer (Sample)",
    role: "Full Stack Developer",
    quote:
      "Strong .NET fundamentals and careful with production quality. Always willing to help with debugging and improvements.",
  },
];

export function loadMockCollection(key, seed) {
  const raw = localStorage.getItem(key);
  if (!raw) {
    localStorage.setItem(key, JSON.stringify(seed));
    return seed;
  }
  return safeJsonParse(raw, seed);
}

export function saveMockCollection(key, items) {
  localStorage.setItem(key, JSON.stringify(items));
}

export function getInitialState() {
  return {
    blogPosts: loadMockCollection(STORAGE_KEYS.blogPosts, seedBlogPosts),
    testimonials: loadMockCollection(
      STORAGE_KEYS.testimonials,
      seedTestimonials,
    ),
    contactMessages: loadMockCollection(STORAGE_KEYS.contactMessages, []),
  };
}

export function persistState(state) {
  saveMockCollection(STORAGE_KEYS.blogPosts, state.blogPosts);
  saveMockCollection(STORAGE_KEYS.testimonials, state.testimonials);
  saveMockCollection(STORAGE_KEYS.contactMessages, state.contactMessages);
}

export function createId(prefix) {
  return `${prefix}_${Math.random().toString(16).slice(2)}_${Date.now()}`;
}
