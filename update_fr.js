import fs from 'fs';

const frContent = `legalNoticePage: {
      title: "Mentions Légales",
      backToMenu: "Retour",
      content: \`
        <div class="space-y-6 text-slate-700">
          <section>
            <h2 class="text-xl font-bold text-slate-900 mb-3">1. Identification du Propriétaire</h2>
            <p>Conformément à l'article 10 de la loi 34/2002 du 11 juillet sur les services de la société de l'information et du commerce électronique (LSSI-CE), il est précisé que le propriétaire et créateur de cette application web est :</p>
            <ul class="list-disc pl-5 mt-2 space-y-1">
              <li><strong>Propriétaire :</strong> <a href="https://jgarciaarteaga.netlify.app" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">Juan Pablo García Arteaga</a></li>
              <li><strong>E-mail de contact :</strong> info@audiometric.report</li>
              <li><strong>Objectif du site :</strong> Développement, maintenance et fourniture d'outils bureautiques et de calculs arithmétiques standardisés pour les professionnels de la santé auditive.</li>
            </ul>
          </section>
          <section>
            <h2 class="text-xl font-bold text-slate-900 mb-3">2. Propriété Intellectuelle et Modèles de Licence</h2>
            <p>Le code source, l'architecture de l'interface et les algorithmes de calcul d'AudiometricReport sont une œuvre originale de Juan Pablo García Arteaga, dûment protégée par les droits de propriété intellectuelle et enregistrée au Registre Ninfa de la Junta de Andalucía. La marque est en cours d'enregistrement auprès de l'OEMP. Toute reproduction totale ou partielle sans autorisation expresse est interdite.</p>
            <p>Le propriétaire se réserve le droit exclusif de céder, concéder sous licence, ou d'accepter des parrainages commerciaux concernant les espaces de la plateforme et ses droits d'exploitation à des entreprises tierces ou des entités du secteur de l'audiologie.</p>
          </section>
          <section>
            <h2 class="text-xl font-bold text-slate-900 mb-3">3. Juridiction</h2>
            <p>Pour tout litige découlant de l'utilisation de cet outil, les parties se soumettent expressément aux Cours et Tribunaux de <strong>Huelva, Espagne</strong>.</p>
          </section>
        </div>\`
    },
    privacyPolicyPage: {
      title: "Politique de Confidentialité et Souveraineté des Données (RGPD)",
      backToMenu: "Retour",
      content: \`
        <div class="space-y-6 text-slate-700">
          <section>
            <h2 class="text-xl font-bold text-slate-900 mb-3">1. Transparence Préalable et Données Collectées</h2>
            <p>Avant d'utiliser notre infrastructure, nous souhaitons être transparents quant au traitement des données. Cette application ne demande que les informations cliniques strictement nécessaires (seuils d'audition, impédancemétrie et audiométrie vocale) dans le seul but de <strong>générer le rapport audiométrique</strong>. Aucune donnée n'est collectée à des fins de recherche ou de statistiques. L'application est hébergée sur des serveurs situés dans l'Espace Économique Européen (EEE) et il n'y a aucun accord de transfert commercial de données avec des tiers.</p>
          </section>
          <section>
            <h2 class="text-xl font-bold text-slate-900 mb-3">2. Traitement Volatile (Edge Computing) et Privacy by Design</h2>
            <p>AudiometricReport a été conçu selon un paradigme strict de confidentialité dès la conception (Privacy by Design) et par défaut. Le traitement des données saisies dans les formulaires s'effectue de manière 100 % locale, exclusivement dans la mémoire RAM du navigateur web de l'utilisateur. Il n'y a aucune persistance des données dans des bases de données externes, ni aucun transfert d'Informations de Santé Protégées (PHI) vers nos serveurs.</p>
          </section>
          <section>
            <h2 class="text-xl font-bold text-slate-900 mb-3">3. Préservation, Consentement et Sécurité</h2>
            <p>Notre conception des dossiers de santé part du principe que vous, l'expert dans votre clinique, en êtes l'entité de contrôle. L'utilisation du générateur est soumise à un mécanisme de validation active ; plus précisément, un consentement explicite via une <em>case à cocher</em> obligatoire certifiant de votre légitimité. Des protocoles d'accès sécurisés et cryptés (HTTPS/SSL) sécurisent le trafic entre l'application web et votre terminal.</p>
          </section>
          <section>
            <h2 class="text-xl font-bold text-slate-900 mb-3">4. Droits ARCO-POL, AIPD, et Registres</h2>
            <p>L'application traitant des données liées à la santé (Catégorie Spéciale), le système s'appuie sur une Analyse d'Impact relative à la Protection des Données (AIPD) qui conclut que l'absence de serveur de stockage atténue les risques. Dans le Registre des Activités de Traitement, cela figure comme un processus éphémère. Lors de la fermeture de l'onglet ou de l'actualisation de la page (F5), les droits à l'effacement et à l'oubli s'exécutent instantanément de plein droit, détruisant de façon irréversible le document volatile, libérant la mémoire et ne laissant aucune trace ultérieure dans nos services.</p>
          </section>
          <section>
            <h2 class="text-xl font-bold text-slate-900 mb-3">5. Responsabilité de Traitement et de Garde</h2>
            <p>Juan Pablo García Arteaga n'agit ni en tant que Responsable du traitement ni en tant que Sous-traitant des données des patients. L'absence absolue de collecte rendant impossible toute forme de conservation du matériel au-delà de sa destruction locale, c'est exclusivement et strictement la responsabilité du médecin ou professionnel de télécharger le rapport final et d'en assumer la garde dans le cadre de sa propre infrastructure clinique ou hospitalière conformément au RGPD de sa juridiction.</p>
          </section>
          <section>
            <h2 class="text-xl font-bold text-slate-900 mb-3">6. Cookies Analytiques et Anonymisation</h2>
            <p>Nous utilisons Google Analytics de manière anonyme pour collecter des données agrégées concernant le flux des composants de notre architecture UI pour le perfectionnement pragmatique de l'outil bureautique. En aucune circonstance ces cookies ne traiteront de variables d'identification, de noms ou encore de profils et fréquences tonales médicales.</p>
          </section>
        </div>\`
    },
    termsAndConditionsPage: {
      title: "Conditions Générales d'Utilisation",
      backToMenu: "Retour",
      content: \`
        <div class="space-y-6 text-slate-700">
          <section>
            <h2 class="text-xl font-bold text-slate-900 mb-3">1. Nature du Logiciel (Outil Bureautique)</h2>
            <p>AudiometricReport est un outil bureautique et de support documentaire dont l'utilisation est gratuite. Il ne s'agit pas d'un Dispositif Médical ("Medical Device") ou d'un logiciel médical selon le Règlement (UE) 2017/745 (MDR). Sa fonctionnalité se limite strictement à la représentation graphique de données saisies manuellement, à l'automatisation de formules arithmétiques du domaine public (telles que le calcul du PTA, les pourcentages de perte auditive et l'implémentation des nouvelles normes et de l'OMS) et à la mise en page d'un document PDF pour l'impression.</p>
          </section>
          <section>
            <h2 class="text-xl font-bold text-slate-900 mb-3">2. Utilisation Professionnelle Exclusive et Exemption de Diagnostic</h2>
            <p>L'utilisation de cet outil est strictement réservée aux médecins spécialistes, aux audiologistes et aux professionnels de la santé autorisés. Par un acte manifestant sans équivoque votre consentement aux présentes requêtes simplifiées, vous admettez expressément qu'AudiometricReport ne suggère implicitement aucune orientation médicale, qu'il ne procède à de quelconques interprétations cliniques, et n’évolue vers l'exécution un diagnostic diagnostique automatisé. Le clinicien retient pour sienne et dans sa pleine individualité l'absolue vérité en charge des déclarations saisies, les actes gestionnaires de ses dossiers, et la responsabilité exclusive du rapport médical qu'il fait transparaître.</p>
          </section>
          <section>
            <h2 class="text-xl font-bold text-slate-900 mb-3">3. Clause de Non-Responsabilité en Cas de Perte de Données</h2>
            <p>Étant donné l'architecture volatile et sans stockage de l'application (Privacy by Design), le propriétaire décline toute forme de responsabilité face aux éventuelles pertes ou accidents d’information imputables à une négligence humaine liée à un navigateur arrêté net sans sauvegarde préalable de version PDF, une coupure brutale du courant de la ligne hôte ou toute altération d’interruption inattendue propre aux flux et à la permanence des séances sur application à flux temporaires. Le programme mis à l'œuvre le sera « tel quel », excluant expressément tout caractère de service pérenne absolu ou dénué de toute discontinuité d’exploitation en cours.</p>
          </section>
        </div>\`
    },`;

let text = fs.readFileSync('src/i18n/fr.ts', 'utf8');
const startIdx = text.indexOf('legalNoticePage: {');
const endIdx = text.indexOf('reportIssuePage: {');
text = text.substring(0, startIdx) + frContent + '\\n    ' + text.substring(endIdx);
fs.writeFileSync('src/i18n/fr.ts', text);
