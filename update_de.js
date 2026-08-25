import fs from 'fs';

const deContent = `legalNoticePage: {
      title: "Impressum und Rechtliche Hinweise",
      backToMenu: "Zurück",
      content: \`
        <div class="space-y-6 text-slate-700">
          <section>
            <h2 class="text-xl font-bold text-slate-900 mb-3">1. Identifikation des Eigentümers</h2>
            <p>In Übereinstimmung mit geltenden Gesetzen zu Diensten der Informationsgesellschaft und dem elektronischen Geschäftsverkehr (wie LSSI-CE) wird hiermit erklärt, dass der Eigentümer und Erfinder dieser Webanwendung ist:</p>
            <ul class="list-disc pl-5 mt-2 space-y-1">
              <li><strong>Eigentümer:</strong> <a href="https://jgarciaarteaga.netlify.app" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">Juan Pablo García Arteaga</a></li>
              <li><strong>Kontakt-E-Mail:</strong> info@audiometric.report</li>
              <li><strong>Zweck der Website:</strong> Entwicklung, Wartung und Bereitstellung von Büro- und standardisierten Rechenwerkzeugen für Fachleute der Hörgesundheit.</li>
            </ul>
          </section>
          <section>
            <h2 class="text-xl font-bold text-slate-900 mb-3">2. Geistiges Eigentum und Lizenzmodelle</h2>
            <p>Der Quellcode, die Schnittstellenarchitektur und die Berechnungsalgorithmen von AudiometricReport sind ein Originalwerk von Juan Pablo García Arteaga und ordnungsgemäß durch Rechte an geistigem Eigentum geschützt. Die Marke befindet sich in der Registrierungsphase bei der OEMP. Die vollständige oder teilweise Vervielfältigung ohne ausdrückliche Genehmigung ist untersagt.</p>
            <p>Der Eigentümer behält sich das ausschließliche Recht vor, kommerzielle Vereinbarungen für Plattform-Sponsoring oder Lizenzen für deren Verwertungsrechte mit Drittunternehmen der Audiologiebranche zu treffen.</p>
          </section>
          <section>
            <h2 class="text-xl font-bold text-slate-900 mb-3">3. Gerichtsstand</h2>
            <p>Für jegliche Streitigkeiten, die aus der Nutzung dieses Tools entstehen, unterwerfen sich die Parteien ausdrücklich den entsprechenden zuständigen Gerichten von <strong>Huelva, Spanien</strong>.</p>
          </section>
        </div>\`
    },
    privacyPolicyPage: {
      title: "Datenschutzerklärung und Datensouveränität (DSGVO)",
      backToMenu: "Zurück",
      content: \`
        <div class="space-y-6 text-slate-700">
          <section>
            <h2 class="text-xl font-bold text-slate-900 mb-3">1. Vorabtransparenz und erfasste Daten</h2>
            <p>Bevor Sie unsere Software-Infrastruktur einsetzen, möchten wir verdeutlichen, wie wir mit Daten umgehen. Diese Anwendung fordert nur grundlegende klinische Angaben (Hörschwellen, Impedanz- und Sprachaudiometrie), die für den primären Zweck, <strong>die Erstellung des audiometrischen Berichts</strong>, zwingend notwendig sind. Dementsprechend werden zu keinem Zeitpunkt Daten für Forschungsziele oder zur Auswertung von Statistiken erhoben. Die Server der Anwendung befinden sich in Rechenzentren des Europäischen Wirtschaftsraums (EWR). Es gibt und wird keine kommerziellen Verträge mit Drittinstitutionen zur Abtretung dieser Daten geben.</p>
          </section>
          <section>
            <h2 class="text-xl font-bold text-slate-900 mb-3">2. Flüchtige Verarbeitung (Edge Computing) und Privacy by Design</h2>
            <p>Die Softwarestruktur von AudiometricReport richtet sich exakt und standardmäßig nach rigorosen Paradigmen zur Wahrung des Datenschutzes ("Privacy by Design"). Sämtliche Informationen, die Sie in unsere Benutzeroberfläche tippen, verarbeitet das System ausschließlich zu 100% lokal im flüchtigen RAM-Speicher Ihres verwendeten Webbrowsers. Wir versichern, dass keine Speicherung in irgendeine Form externer oder intern vernetzter Datenbanken existiert. Gleiches gilt für die Übertragung von jeglichen formellen Gesundheitsdaten (PHI) an die Hauptserver.</p>
          </section>
          <section>
            <h2 class="text-xl font-bold text-slate-900 mb-3">3. Schutz, Einwilligung und Netzwerksicherheit</h2>
            <p>Unser Prinzip von sensiblen Patientenakten basiert auf der unbedingten Prämisse: Sie, die Fachleute in Ihren eigenen Praxen, bleiben für die Verarbeitung und Prüfung steuerungsmäßig zuständig. Die Aktivierung dieses Tools unterliegt einer verpflichtenden Verifikationslogik, die unter Erteilung eines aktiven Häkchens (Checkbox) die rechtswirksame Nutzung autorisiert. Zertifizierte Zugangsprotokolle (HTTPS und SSL-Kryptografie) sichern einen korrekten und abgeschirmten Workflow Ihrer Webarbeit zum jeweiligen Monitor-Terminal.</p>
          </section>
          <section>
            <h2 class="text-xl font-bold text-slate-900 mb-3">4. DSFA, Betroffenenrechte und VVT</h2>
            <p>Aufgrund des Umgangs mit sensiblen Befunden (besondere Gesundheitskategorie), stützt sich das Webdokumentations-Design zur Minimierung und Risikoprävention auf die Richtlinien einer Datenschutz-Folgenabschätzung (DSFA). Ebenso besagt unser Verzeichnis von Verarbeitungstätigkeiten (VVT), dass dies keine persistente, sondern lediglich eine absolut temporäre Instanz abbildet. Alle Betroffenenrechte auf sofortiges Löschen und Vergessen aus Sicht des Programms erfolgen im exakten Moment des Tab-Schließens oder der Aktualisierung des Browsers (via F5), weshalb fortan unwiderruflich sämtliche Reste des zu bearbeitenden PDF-Entwurfs vaporisiert und vom Speicher befreit werden.</p>
          </section>
          <section>
            <h2 class="text-xl font-bold text-slate-900 mb-3">5. Medizinische Rechenschaft und lokale Aufbewahrungspflicht</h2>
            <p>Juan Pablo García Arteaga operiert weder als Haupt- noch als Mitverantwortlicher jener Patientendaten („Controller/Processor“ im DSGVO-Sinn). Weil es für unsere Software technisch radikal erschwert wurde, auch nur im Ansatz Befunde abzugreifen, und jedwede Protokolldatei gelöscht wird, obliegt es zwingend der absoluten Sorgfalt jedes Facharztes und Klinikpersonals, ihr fertig gestelltes PDF adäquat abzuspeichern, zu sichern und nach deren geltenden DSGVO-Kriterien auf dem hauseigenen Computer gesetzeskonform aufzubewahren.</p>
          </section>
          <section>
            <h2 class="text-xl font-bold text-slate-900 mb-3">6. Analytische Cookies und vollständige Anonymisierung</h2>
            <p>Ausschließlich um ein aggregiertes Bild über die generellen Navigationsflüsse zur Usability-Verbesserung dieses IT-Office-Werkzeugs zu sichern, arbeiten wir anonymisiert mit grundlegenden Analysedaten (Google Analytics). Dabei gilt das unwiderrufliche Dogma, dass diese Tracking-Möglichkeiten absolut keinerlei personenbezogene, metrische Indizes oder gar konkrete audiologische Ergebnisse und Tonprofile einsehen werden.</p>
          </section>
        </div>\`
    },
    termsAndConditionsPage: {
      title: "Allgemeine Nutzungsbedingungen",
      backToMenu: "Zurück",
      content: \`
        <div class="space-y-6 text-slate-700">
          <section>
            <h2 class="text-xl font-bold text-slate-900 mb-3">1. Art der Software (Büro- und Dokumentationswerkzeug)</h2>
            <p>AudiometricReport ist ein kostenloses Büro- und Berichtswerkzeug und ausdrücklich kein medizinisches Gerät (Medical Device) oder medizinische Software gemäß der MDR-Richtlinie der EU (2017/745). Seine Funktionalität ist strikt darauf limitiert, jene von Hand eingegebenen Messwerte grafisch darzustellen, etablierte öffentliche Formeln rechnerisch zu automatisieren (wie die Berechnung des PTA, des Prozentsatzes des Hörverlusts und die Implementierung der neuen Standards und der WHO) und finale Parameter über eine PDF-Schablone visuell als kompaktes Druckerzeugnis für Sie zu strukturieren.</p>
          </section>
          <section>
            <h2 class="text-xl font-bold text-slate-900 mb-3">2. Beschränkung auf Fachpersonal und Haftungsausschluss für Diagnosen</h2>
            <p>Die Nutzung der Werkzeuge und Algorithmen bedingt eine Nutzung streng durch Fachexperten, Audiologen sowie geschultes HNO-Personal. Die ausdrückliche, aktive Übernahme unserer Bestimmungen durch den Nutzer indiziert vollumfänglich das Wissen darum, dass AudiometricReport rein als Kalkulator agiert: Das Tool liefert keine Interpretationsrichtlinien, tätigt keine diagnostischen Analysen oder liefert automatisierte medizinische Prognosen oder Suggestionen. Die Pflicht bezüglich der Verifikation aller Eingaben, die Aufbewahrung der Akte als auch deren fundierte Diagnose ist ausschließlich fachmännische und juristische Last des anwendenden Nutzers und Autors.</p>
          </section>
          <section>
            <h2 class="text-xl font-bold text-slate-900 mb-3">3. Strenger Ausschluss der Haftung bei Zwischenfällen und Datenverlusten</h2>
            <p>Begründet in dem Umstand, dass die IT-Struktur keinerlei Datenspeicher (Edge Computing/Privacy by Design) zum Abrufen ermöglicht, ist der Eigentümer und Entwickler gänzlich gegen Ansprüche abzusichern und ist dementsprechend bei einem durch äußere oder irrtümliche Einflüsse verursachten Informationsverlust nicht im Geringsten haftbar. Jeder unfreiwillige Abbruch, ungespeicherter Tabverschleiß, Verbindungsverlust des Netzwerks oder genereller Absturz der Anwendung beziehungsweise mangelhafte Abrufbarkeit des Berichts erfolgt unter dem Status einer "Tal Cual" ("As Is")-Verwendung des Programms ohne inhärente Zusicherung eines pausenlos garantierten operativen Betriebes.</p>
          </section>
        </div>\`
    },`;

let text = fs.readFileSync('src/i18n/de.ts', 'utf8');
const startIdx = text.indexOf('legalNoticePage: {');
const endIdx = text.indexOf('reportIssuePage: {');
text = text.substring(0, startIdx) + deContent + '\\n    ' + text.substring(endIdx);
fs.writeFileSync('src/i18n/de.ts', text);
