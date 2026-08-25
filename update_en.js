import fs from 'fs';

const enContent = `legalNoticePage: {
      title: "Legal Notice",
      backToMenu: "Back",
      content: \`
        <div class="space-y-6 text-slate-700">
          <section>
            <h2 class="text-xl font-bold text-slate-900 mb-3">1. Owner Identification</h2>
            <p>In compliance with Article 10 of Law 34/2002, of July 11, on Services of the Information Society and Electronic Commerce (LSSI-CE), it is stated that the owner and creator of this web application is:</p>
            <ul class="list-disc pl-5 mt-2 space-y-1">
              <li><strong>Owner:</strong> <a href="https://jgarciaarteaga.netlify.app" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">Juan Pablo García Arteaga</a></li>
              <li><strong>Contact Email:</strong> info@audiometric.report</li>
              <li><strong>Website Purpose:</strong> Development, maintenance, and provision of office and standardized arithmetic calculation tools for hearing health professionals.</li>
            </ul>
          </section>
          <section>
            <h2 class="text-xl font-bold text-slate-900 mb-3">2. Intellectual Property and Licensing Models</h2>
            <p>The source code, interface architecture, and calculation algorithms of AudiometricReport are an original work by Juan Pablo García Arteaga and are duly protected by intellectual property rights and registered in the Ninfa Registry of the Junta de Andalucía. The trademark is currently being registered with the OEMP. Total or partial reproduction without express authorization is prohibited.</p>
            <p>The owner reserves the exclusive right to assign, license, or agree on commercial sponsorships regarding platform spaces and exploitation rights to third-party companies or corporate entities in the audiology sector.</p>
          </section>
          <section>
            <h2 class="text-xl font-bold text-slate-900 mb-3">3. Jurisdiction</h2>
            <p>For any controversy arising from the use of this tool, the parties expressly submit to the Courts and Tribunals of <strong>Huelva, Spain</strong>.</p>
          </section>
        </div>\`
    },
    privacyPolicyPage: {
      title: "Privacy Policy and Data Sovereignty (GDPR)",
      backToMenu: "Back",
      content: \`
        <div class="space-y-6 text-slate-700">
          <section>
            <h2 class="text-xl font-bold text-slate-900 mb-3">1. Prior Transparency and Collected Data</h2>
            <p>Before using our infrastructure, we want to be transparent about the data processing. This application only requests strictly necessary clinical information (hearing thresholds, impedance, and speech audiometry) to fulfill the exclusive purpose of <strong>generating the audiometric report</strong>. No data is collected for research or statistical purposes. The application is hosted on servers within the European Economic Area (EEA), and there are no commercial data transfer agreements with third parties.</p>
          </section>
          <section>
            <h2 class="text-xl font-bold text-slate-900 mb-3">2. Volatile Processing (Edge Computing) and Privacy by Design</h2>
            <p>AudiometricReport has been designed under a strict privacy by design and by default paradigm. The processing of data entered into the forms is performed 100% locally, exclusively within the user's web browser RAM. There is no data persistence in external databases, nor transfer of Protected Health Information (PHI) to our servers.</p>
          </section>
          <section>
            <h2 class="text-xl font-bold text-slate-900 mb-3">3. Preservation, Consent, and Security</h2>
            <p>Our concept of health records assumes that you, the expert in your own clinic, are the controlling entity. The use of the generator is subject to an active validation mechanism; specifically, express consent through a mandatory <em>checkbox</em> ensuring legitimacy. Secure and encrypted access protocols (HTTPS/SSL) secure the traffic from the web application to your terminal.</p>
          </section>
          <section>
            <h2 class="text-xl font-bold text-slate-900 mb-3">4. ARCO-POL Rights, DPIA, and RoPA</h2>
            <p>Given that the application processes health-related data (Special Category), the system is backed by a Data Protection Impact Assessment (DPIA) which concludes that the serverless storage design mitigates risks. In the Record of Processing Activities (RoPA), this is listed as an ephemeral process. Upon closing the tab or reloading the page (F5), the rights to erasure and cancellation are instantly executed, irreversibly destroying the volatile document, freeing memory, and leaving no subsequent trace on our service.</p>
          </section>
          <section>
            <h2 class="text-xl font-bold text-slate-900 mb-3">5. Processing Responsibility and Custody</h2>
            <p>Juan Pablo García Arteaga does not act as a Controller or Processor of patient data. By absolutely minimizing collection, it becomes impossible to retain the material after local deletion. It is the exclusive responsibility of the practitioner to download the PDF and safeguard it in their local or hospital infrastructure, protected by their respective GDPR equivalent.</p>
          </section>
          <section>
            <h2 class="text-xl font-bold text-slate-900 mb-3">6. Analytical Cookies and Anonymization</h2>
            <p>We use Google Analytics anonymously to collect aggregated data on component flow and UI interactions, improving the tool programmatically. These cookies or scripts will never process personal identifiers, names, or pure-tone profiles.</p>
          </section>
        </div>\`
    },
    termsAndConditionsPage: {
      title: "Terms and Conditions of Use",
      backToMenu: "Back",
      content: \`
        <div class="space-y-6 text-slate-700">
          <section>
            <h2 class="text-xl font-bold text-slate-900 mb-3">1. Software Nature (Office Tool)</h2>
            <p>AudiometricReport is a free-to-use office and documentary support tool. It is not a Medical Device or medical software according to Regulation (EU) 2017/745 (MDR). Its functionality is strictly limited to the graphical representation of manually entered data, the automation of public domain arithmetic formulas (such as the calculation of PTA, loss percentages, and the implementation of new standards and the WHO), and the layout of a PDF document for printing.</p>
          </section>
          <section>
            <h2 class="text-xl font-bold text-slate-900 mb-3">2. Exclusive Professional Use and Diagnostic Exemption</h2>
            <p>The use of this tool is restricted to medical specialists, audiologists, and authorized healthcare professionals. You acknowledge through an affirmative mark of express consent and conditions drafted in comprehensive terms that AudiometricReport does not issue clinical suggestions, interpret results, or perform automated diagnoses. The clinical professional assumes absolute and total responsibility for the veracity of the entered data, management, custody of the printed report, and the clinical judgment reflected.</p>
          </section>
          <section>
            <h2 class="text-xl font-bold text-slate-900 mb-3">3. Exemption of Liability for Data Loss</h2>
            <p>Given the volatile and non-storage architecture of the application (Privacy by Design), the owner is not liable under any circumstances for the loss of information that the user might experience due to accidental closing of the browser, power supply failures, failure to save the PDF, or session interruptions. The software is provided "as is", without implied warranties of uninterrupted operation.</p>
          </section>
        </div>\`
    },`;

let text = fs.readFileSync('src/i18n/en.ts', 'utf8');
const startIdx = text.indexOf('legalNoticePage: {');
const endIdx = text.indexOf('reportIssuePage: {');
text = text.substring(0, startIdx) + enContent + '\\n    ' + text.substring(endIdx);
fs.writeFileSync('src/i18n/en.ts', text);
