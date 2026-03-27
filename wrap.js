const fs = require('fs');

let code = fs.readFileSync('components/ToolsSection.tsx', 'utf8');

code = code.replace(/import \{ AnimatePresence, motion \} from 'motion\/react';/g, "import { AnimatePresence, motion } from 'motion/react';\nimport { FocusSection } from './FocusSection';");

code = code.replace(/<div className="text-center mb-20 animate-fade-in animate-float-gentle">/g, "<FocusSection>\n        <div className=\"text-center mb-20 animate-fade-in animate-float-gentle\">");

code = code.replace(/<\/div>\s*{\/\* SECTION 1: ANATOMY OF AN APP/g, "</div>\n        </FocusSection>\n\n        {/* SECTION 1: ANATOMY OF AN APP");

code = code.replace(/{\/\* SECTION 1: ANATOMY OF AN APP \(Frontend vs Backend\) \*\/\}\s*<div className="mb-32 relative">/g, "{/* SECTION 1: ANATOMY OF AN APP (Frontend vs Backend) */}\n        <FocusSection>\n        <div className=\"mb-32 relative\">");

code = code.replace(/<\/div>\s*{\/\* SECTION 2: LIVE ARCHITECTURE/g, "</div>\n        </FocusSection>\n\n        {/* SECTION 2: LIVE ARCHITECTURE");

code = code.replace(/{\/\* SECTION 2: LIVE ARCHITECTURE DEMO \*\/\}\s*<div className="mb-32">/g, "{/* SECTION 2: LIVE ARCHITECTURE DEMO */}\n        <FocusSection>\n        <div className=\"mb-32\">");

code = code.replace(/<\/div>\s*{\/\* SECTION 3: HOSTING/g, "</div>\n        </FocusSection>\n\n        {/* SECTION 3: HOSTING");

code = code.replace(/{\/\* SECTION 3: HOSTING \(Deployment Ecosystem\) \*\/\}\s*<div className="mb-32">/g, "{/* SECTION 3: HOSTING (Deployment Ecosystem) */}\n        <FocusSection>\n        <div className=\"mb-32\">");


let websiteGuide = fs.readFileSync('components/WebsiteBuilderGuide.tsx', 'utf8');
websiteGuide = websiteGuide.replace(/import \{ motion, useScroll, useTransform, AnimatePresence \} from 'motion\/react';/g, "import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';\nimport { FocusSection } from './FocusSection';");
// Let's not modify WebsiteBuilderGuide.tsx blindly yet.

fs.writeFileSync('components/ToolsSection.tsx', code);
