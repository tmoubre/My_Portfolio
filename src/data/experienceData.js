import {
    Boxes,
    Database,
    FlaskConical,
    Code2,
    Network,
    ClipboardCheck,
    Workflow,
    Users,
    BookOpen,
    Target,
    CalendarDays,
    Layers3,
    GitBranch,
} from 'lucide-react';

export const EXPERTISE = [
    {
        icon: Target,
        title: 'Product Ownership',
        text: 'Requirements definition, backlog refinement, prioritization, stakeholder alignment, roadmap support, user feedback, enhancement planning, and product governance.',
    },
    {
        icon: Boxes,
        title: 'Enterprise Applications',
        text: 'Functional ownership, production support, systems integration, application enhancements, business process improvement, issue analysis, and cross-functional delivery.',
    },
    {
        icon: Database,
        title: 'Data & SQL',
        text: 'SQL investigation, data validation, reconciliation, reporting, root-cause analysis, production troubleshooting, and decision support.',
    },
    {
        icon: FlaskConical,
        title: 'UAT & Release Delivery',
        text: 'Test planning, QA validation, UAT coordination, defect triage, release readiness, stakeholder communication, deployment governance, and post-release validation.',
    },
    {
        icon: Code2,
        title: 'Full-Stack Development',
        text: 'React, JavaScript, Node.js, Express, MongoDB, APIs, authentication, responsive interfaces, testing, serverless applications, and mobile development.',
    },
    {
        icon: Network,
        title: 'Business & Technology Bridge',
        text: 'Translating business requirements into technical direction while helping developers, users, operations teams, and leadership stay aligned throughout delivery.',
    },
];

export const PROFESSIONAL_IMPACT = [
    {
        number: '01',
        icon: Target,
        title: 'Enterprise Product Ownership',
        text: 'Own and guide the evolution of a business-critical enterprise platform, translating operational needs into requirements, backlog priorities, enhancements, testing strategies, and production releases.',
        tag: 'Product Leadership',
    },
    {
        number: '02',
        icon: GitBranch,
        title: 'Product Governance & Delivery Management',
        text: 'Own the Azure DevOps delivery process for the product, managing work from intake and refinement through development, QA, UAT, change governance, release readiness, deployment, and post-release validation.',
        tag: 'ADO Governance',
    },
    {
        number: '03',
        icon: Users,
        title: 'User Council & UAT Program',
        text: 'Created a formal user council and UAT framework that brings business users directly into product development through structured testing, feedback, release readiness, and continuous improvement.',
        tag: 'User Enablement',
    },
    {
        number: '04',
        icon: Database,
        title: 'Enterprise Data & System Mapping',
        text: 'Conduct deep SQL and data analysis across interconnected enterprise systems to map business processes, trace transactions, reconcile data, investigate production issues, and support technical solution design.',
        tag: 'Data & Systems',
    },
    {
        number: '05',
        icon: Workflow,
        title: 'Systems Integration & Process Modernization',
        text: 'Partner with development, operations, finance, and other stakeholders on integrations and workflow improvements that connect enterprise platforms and reduce operational friction.',
        tag: 'Modernization',
    },
    {
        number: '06',
        icon: BookOpen,
        title: 'Knowledge & Digital Experience',
        text: 'Designed centralized digital workspaces, documentation experiences, release communications, training resources, and self-service content to improve product adoption and give users better access to information.',
        tag: 'Digital Experience',
    },
];

export const SUMMARY_ITEMS = [
    {
        icon: CalendarDays,
        label: 'Current Role',
        value: 'Since Feb 9, 2026',
    },
    {
        icon: Target,
        label: 'Primary Focus',
        value: 'Product Ownership',
    },
    {
        icon: Layers3,
        label: 'Delivery',
        value: 'End-to-End Lifecycle',
    },
    {
        icon: ClipboardCheck,
        label: 'Governance',
        value: 'ADO • QA • UAT',
    },
];

export const IMPACT_TAGS = [
    'Product Ownership',
    'Enterprise Systems',
    'Cross-Functional Leadership',
    'ADO & Agile Delivery',
];
