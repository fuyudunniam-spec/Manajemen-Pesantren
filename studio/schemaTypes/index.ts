// Royal Gold Theme - Sanity Schemas
// Only schemas relevant to Royal Gold theme

import siteSettings from './siteSettings';
import landingPage from './landingPage';
import aboutPage from './aboutPage';
import donationProgram from './donationProgram';
import donationPage from './donationPage';
import transparencyReport from './transparencyReport';
import psbConfig from './psbConfig';
import curriculum from './curriculum';
import academyClass from './academyClass';

export const schemaTypes = [
    // Site Configuration
    siteSettings,

    // Page Schemas (Singletons)
    landingPage,
    aboutPage,
    donationPage,
    psbConfig,

    // Document Schemas (Multiple instances)
    donationProgram,
    transparencyReport,
    curriculum,
    academyClass,
];
