
const de = {
  seo: {
    home: {
      title: "AudiometricReport | Software zur Erstellung klinischer audiometrischer Berichte",
      description: "Kostenloser PDF-Berichtsgenerator für die Audiologie. Enthält Tonaudiometrie, Sprachaudiometrie, Impedanz (Tympanometrie und Reflexe) und AAO-HNS/AMA/AAOO-Hörverlustrechner.",
    },
    calculator: {
      title: "PTA & % Hörverlust-Rechner (AAO-HNS/AMA/AAOO) | AudiometricReport",
      description: "Schneller und genauer audiologischer Rechner. Ermitteln Sie den Pure Tone Average (PTA) und den Prozentsatz der Hörminderung nach den Standards AAO-HNS, AMA und AAOO. Kostenlos und ohne Registrierung.",
    },
    reportGenerator: {
      title: "Berichtssoftware: Tonaudiometrie, Sprache & Impedanz | AudiometricReport",
      description: "Erstellen Sie umfassende medizinische Berichte mit professionellen Diagrammen. Umfasst Audiometrie (Luft-/Knochenleitung mit Vertäubung), Sprachaudiometrie (SDT, SRT, WRS) und Tympanometrie. 100% private lokale Verarbeitung.",
    }
  },
  common: {
    months: "Monate",
    years: "Jahre",
    loading: "Laden..."
  },
  free: {
    landing: {
      tagline: "Die freie Infrastruktur für audiologische Berichte",
      description: "Erstellung klinischer Berichte und Präzisionsberechnungen für Hörgeräteakustiker und HNO-Ärzte. 100% privat und lokal.",
      ctaCalculatorTitle: "PTA & Hörverlust Rechner",
      ctaCalculatorDesc: "Schnelle Berechnung von Tonaudiometrie-Durchschnitten und Verlustprozenten (AAO-HNS/AMA/AAOO).",
      ctaGeneratorTitle: "Berichtsgenerator",
      ctaGeneratorDesc: "Erstellen Sie professionelle Berichte mit hochwertigen PDF-Audiogrammen.",
      featureMathTitle: "Präzisionsmathematik",
      featureMathDesc: "Validierte Algorithmen nach internationalen Standards.",
      featurePrivacyTitle: "Totale Privatsphäre",
      featurePrivacyDesc: "Ihre Daten verlassen niemals Ihren Browser. Keine externen Datenbanken.",
      features: {
        calculator: "Rechner mit 3 Standards, angepasst an die WHO.",
        reports: "Berichte mit Impedanz, Ton und Sprache.",
        impedance: "Impedanzmessung (Tympanometrie und Reflexe).",
        audiometry: "Vollständige Tonaudiometrie (VA, VO, Vertäubung, UCL).",
        standards: "PTA- und %-Verlustberechnungen (AMA, AAO, WHO).",
        speech: "Sprachaudiometrie (SDT, SRT, WRS, WRS 2, UCL).",
        charts: "Stilisierte hochauflösende Diagramme.",
        privacy: "Datensouveränität: Nichts wird gespeichert."
      },
      sections: {
        studies: {
          title: "Umfassende Audiologische Studien",
          subtitle: "Komplette Integration aller wichtigen Tests für eine genaue Diagnose.",
          impedance: { title: "Fortgeschrittene Impedanzaudiometrie", desc: "Komplette Bewertung mit Tympanometrie und Stapediusreflexen." },
          tonal: { title: "Professionelle Tonaudiometrie", desc: "Alle AC/BC-Wege, Vertäubung, Unbehaglichkeitsschwelle, Schmerzgrenze und Warnungen." },
          speech: { title: "Detaillierte Sprachaudiometrie", desc: "Umfassende Tests von SDT, SRT, WRS, WRS 2 und UCL." }
        },
        reports: {
          title: "Hi-Fi Berichte",
          subtitle: "Erstellen Sie professionelle klinische Berichte mit hochauflösenden, stilisierten Grafiken.",
          integration: { title: "3-in-1 Integration", desc: "Impedanz, Ton und Sprache in einem beeindruckenden Dokument." },
          design: { title: "Stilisierte Audiogramme", desc: "Schöne, klare und professionelle Grafiken." },
          tables: { title: "Automatisierte Tabellen", desc: "PTA- und Hörverlust-Prozenttabellen sofort generiert." },
          alerts: { title: "Intelligente Warnungen", desc: "Automatische Warnungen für wahrscheinliche Fehler." }
        },
        workflow: {
          title: "Exzellenz für den Praktiker",
          subtitle: "Werkzeuge zur Optimierung Ihrer klinischen Routine.",
          calculator: { title: "Präzisionsrechner", desc: "Blitzschnelle Berechnung für AAO-HNS, AMA und AAOO-Standards." },
          clipboard: { title: "Sofortiges Kopieren", desc: "Ergebnisse direkt kopieren, um Zeit bei der Dokumentation zu sparen." },
          languages: { title: "Mehrsprachig", desc: "In mehreren Sprachen verfügbar." },
          privacy: { title: "Datensouveränität", desc: "100% lokale Verarbeitung. Keine Cloud-Speicherung." }
        }
      },
      complianceFootnote: "OFFICE-DOKUMENTATIONS-HILFSMITTEL",
      medicalSoftware: "PROFESSIONELLES AUDIOLOGIE-TOOL",
      startTool: "Tool Starten",
      faq: {
        title: "Häufig gestellte Fragen (FAQ)",
        q1: "Was ist PTA (Pure Tone Average)?",
        a1: "PTA ist das arithmetische Mittel der Hörschwellen in Dezibel (dB). Gemäß den Richtlinien der Weltgesundheitsorganisation (WHO) berechnet unser Tool den Standard-PTA durch Mittelung der Frequenzen 500, 1000, 2000 und 4000 Hz. Dies bietet eine sehr genaue Beurteilung der Empfindlichkeit im wichtigsten Bereich der Sprachverständlichkeit.",
        q2: "Wie wird der Prozentsatz der Schwerhörigkeit nach AMA/AAO berechnet?",
        a2: "In Anlehnung an die WHO-Richtlinien und AMA-Aktualisierungen mittelt die Berechnung der Beeinträchtigung (% Verlust) die Schwellenwerte bei 500, 1000, 2000 und 4000 Hz. Ein 'Boden' von 25 dB wird abgezogen, und das Ergebnis wird mit 1,5 % für den monauralen Verlust multipliziert. Der binaurale Verlust wird im Verhältnis 5:1 (AAO) oder 7:1 (AMA) (besseres vs. schlechteres Ohr) gewichtet.",
        q3: "Ist es sicher, Patientendaten auf dieser Website zu verarbeiten?",
        a3: "Absolut. AudiometricReport arbeitet nach dem Paradigma des 'Edge Computing' oder der lokalen Verarbeitung. Keine der eingegebenen Daten (Namen, Daten oder Hörstufen) verlässt jemals Ihren Browser oder wird auf externen Servern gespeichert. Das ist Datenschutz durch Design.",
        q4: "Wofür wird die Verwendung dieses Tools empfohlen?",
        a4: "Dies ist ein dokumentarisches Support-Büro-Tool für HNO-Spezialisten und Audiologen, die die Erstellung klinischer Berichte und Berechnungen mit validierter mathematischer Präzision (WHO und AMA-Standards) rationalisieren möchten."
      }
    },
    disclaimer: {
      title: "Rechtliche Identifikation und Verantwortung",
      intro: "Um mit der Erstellung dieses Dokuments fortzufahren, müssen Sie sich identifizieren und die Nutzungsbedingungen akzeptieren:",
      professionalName: "Name des Fachmanns",
      namePlaceholder: "z.B. Dr. Max Mustermann",
      profession: "Beruf / Fachgebiet",
      professionPlaceholder: "z.B. HNO-Arzt / Audiologe",
      license: "Berufszulassungsnummer",
      licensePlaceholder: "z.B. 123456789",
      point1: "Dieses Tool ist ein Büro- und Berechnungsassistent; es ersetzt nicht das professionelle klinische Urteil.",
      point2: "Sie sind allein verantwortlich für die Richtigkeit und Aufbewahrung der eingegebenen Daten.",
      point3: "Die Verarbeitung erfolgt zu 100% lokal; das Schließen dieses Tabs löscht nicht gespeicherte PDF-Daten.",
      point4: "Der generierte Bericht ist ein Büro-Support-Dokument für den professionellen Gebrauch.",
      truthStatement: "Ich erkläre unter meiner Verantwortung, dass die angegebenen professionellen Daten wahrheitsgemäß sind und dass ich die volle Urheberschaft und rechtliche Verantwortung für das mit diesem Tool generierte Dokument übernehme.",
      checkboxAccept: "Ich habe die Bedingungen und die Wahrheitserklärung gelesen, verstanden und akzeptiere sie.",
      cancelButton: "Abbrechen",
      button: "VALIDIEREN"
    },
    editor: {
      title: "Bericht",
      signatureLocation: "Stadt",
      calculationTransparency: "Die Berechnungen erfolgen in Echtzeit gemäß dem AMA/AAO 1979 Standard.",
      lockedPractitioner: "Arztdaten (Gesperrt für diesen Bericht)",
      diagnosisLabel: "Unterschrift"
    },
    report: {
      legalFooter: "AudiometricReport ist ein Büro- und Dokumentationshilfsmittel. Der Benutzer ist allein dafür verantwortlich, dass die in diesem Dokument wiedergegebenen Daten der Wahrheit entsprechen."
    },
    legalNoticePage: {
      title: "Impressum und Rechtliche Hinweise",
      backToMenu: "Zurück",
      content: `
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
        </div>`
    },
    privacyPolicyPage: {
      title: "Datenschutzerklärung und Datensouveränität (DSGVO)",
      backToMenu: "Zurück",
      content: `
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
        </div>`
    },
    termsAndConditionsPage: {
      title: "Allgemeine Nutzungsbedingungen",
      backToMenu: "Zurück",
      content: `
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
        </div>`
    },
    reportIssuePage: {
      title: "Feedback & Vorschläge",
      backToMenu: "Zurück",
      intro: "Wenn Sie Feedback oder Vorschläge haben oder auf ein Problem gestoßen sind, verwenden Sie bitte dieses Formular. Dadurch wird Ihr Standard-E-Mail-Client geöffnet, um die Details an unser Team zu senden.",
      nameLabel: "Ihr Name (Optional)",
      emailLabel: "Ihre Kontakt-E-Mail",
      subjectLabel: "Betreff",
      subjectPlaceholder: "z.B. Verbesserungsvorschlag / Feedback",
      descriptionLabel: "Kommentare / Beschreibung",
      descriptionPlaceholder: "Teilen Sie Ihre Gedanken mit, beschreiben Sie ein Problem oder schlagen Sie eine neue Funktion vor...",
      sendButton: "Support-E-Mail erstellen",
      privacyNote: "Geben Sie in diesem Formular keine Patientengesundheitsdaten (PHI) an."
    }
  },
  reportGenerator: {
    moduleTabs: {
      patient: "Patient",
      studies: "Untersuchungen",
      diagnosis: "Firma"
    },
    generateReport: "Bericht generieren",
    patient: {
      sectionPersonal: "Persönliche Daten",
      lastName: "Nachname",
      firstName: "Vorname",
      id: "ID",
      birthDate: "Geburtsdatum",
      age: "Alter",
      sectionContact: "Kontakt",
      email: "E-Mail",
      phone: "Telefon"
    },
    clinicalHistory: {
      title: "Klinische Geschichte",
      reason: "Grund der Konsultation",
      antecedentes: "Vorgeschichte",
      personalBg: "Persönliche Vorgeschichte",
      familyBg: "Familiäre Vorgeschichte",
      externalFactors: "Externe Faktoren",
      physicalExam: "Körperliche Untersuchung",
      additionalStudies: "Zusätzliche Studien"
    },
    diagnosis: {
      sectionClinical: "Diagnostischer Eindruck",
      clinicalJudgment: "Klinische Beurteilung",
      plan: "Procedere",
      sectionSignature: "Ort und Datum",
      signatureLocation: "Stadt",
      signatureDate: "Datum",
      configureLocations: "Standorte konfigurieren",
      aiEvaluationButton: "Mit KI auswerten",
      aiLoading: "Analysieren...",
      aiFormatLabel: "Format:",
      aiFormatSimple: "Einfach",
      aiFormatDetailed: "Detailliert",
      aiSuggestionTitle: "KI-Vorschlag",
      discard: "Verwerfen",
      aiValidationDisclaimer: "KI kann Fehler machen. Überprüfen Sie immer das Ergebnis.",
      validateAndInsert: "Validieren und Einfügen"
    },
    audiometry: {
      qualityControlTitle: "Qualitätskontrolle",
      qualityInversion: "Inversion erkannt: Knochenleitung darf nicht schlechter sein als Luftleitung (+5dB Toleranz).",
      qualityLimit: "ANSI-Grenzwert überschritten: Der Wert überschreitet die maximale Leistung für diesen Pfad/Frequenz."
    }
  },
  reportPage: {
    reportTitle: "Bericht",
    lastName: "Nachname",
    firstName: "Vorname",
    audiologicalStudy: "Audiologische Studie",
    diagnosticImpression: "Diagnostischer Eindruck",
    signatureLabel: "Unterschrift"
  },
  classificationTable: {
    parameter: "Parameter",
    rightEar: "Rechtes Ohr",
    leftEar: "Linkes Ohr",
    binaural: "Binaural",
    pta: "PTA",
    ptaBone: "Knochen PTA",
    grade: "Hörgrad",
    lossAma: "% Verlust",
    lossAaoo: "% Verlust",
    lossAaoHns: "% Verlust",
    loss: "% Verlust",
    methodologyNotice: "Die Berechnungen des PTA und des prozentualen Hörverlusts folgen der Methodik {{standard}} und sind an die WHO-Konsense angepasst."
  },
  legend: {
    title: "Legende",
    rightAir: "Luftleitung Rechts",
    leftAir: "Luftleitung Links",
    rightBone: "Knochenleitung Rechts",
    leftBone: "Knochenleitung Links",
    rightAirMasked: "Luftleitung vertäubt Rechts",
    leftAirMasked: "Luftleitung vertäubt Links",
    rightBoneMasked: "Knochenleitung vertäubt Rechts",
    leftBoneMasked: "Knochenleitung vertäubt Links",
    uclRight: "Unbehaglichkeitsschwelle Rechts",
    uclLeft: "Unbehaglichkeitsschwelle Links",
    algiacusiaRight: "Schmerzgrenze Rechts",
    algiacusiaLeft: "Schmerzgrenze Links"
  },
  studies: {
    audiometryTitle: "Reinton-Audiometrie",
    speechTitle: "Sprachaudiometrie",
    tympanometry: {
      title: "Impedanzmessung",
      pressure: "Druck",
      compliance: "Compliance",
      pressureAxis: "Druck (daPa)",
      complianceAxis: "Compliance (mL)",
      volume: "Volumen",
      gradient: "Gradient"
    },
    reflexes: {
      title: "Stapediusreflexe",
      ipsi: "Ipsi",
      contra: "Contra"
    },
    speech: {
      sdt: "SDT (Wahrnehmung)",
      srt: "SRT (Verständnis)",
      noResponse: "Keine Antwort",
      wrs: "WRS (Sprachverstehen Maximum)",
      wrs2: "WRS 2 (Rollover-Effekt)",
      ucl: "UCL (Unbehagen)",
      percentage: "Diskrimination (%)",
      intensity: "Intensität (dB)",
      discriminationAxis: "Diskrimination (%)",
      intensityAxis: "Intensität (dB HL)"
    }
  },
  ptaCalculator: {
    title: "Rechner",
    backToMenu: "Zurück zum Menü",
    results: "Berechnungsergebnisse",
    ptaUnit: "dB",
    lossUnit: "%",
    disclaimer: "PTA berechnet nach WHO-Standard (500, 1000, 2000, 4000 Hz). %-Verlust nach AMA/AAO (500, 1000, 2000, 4000 Hz).",
    rightEar: "Rechtes Ohr",
    leftEar: "Linkes Ohr",
    binauralTotal: "Binaural Gesamt",
    copyTemplate: 'Berechnungen nach "{{standard}}": RA: PTA: {{ptaOd}}dB, Hörverlust: {{lossOd}}% | LA: PTA: {{ptaOi}}dB, Hörverlust: {{lossOi}}% | GESAMT: PTA: {{ptaTotal}}dB, Hörverlust: {{lossTotal}}%.'
  },
  hearingLossGrade: {
    normal: "Normales Gehör",
    slight: "Leichter Hörverlust",
    mild: "Milder Hörverlust",
    moderate: "Moderater Hörverlust",
    severe: "Schwerer Hörverlust",
    profound: "Hochgradiger Hörverlust"
  },
  ads: {
    title: "Werbefläche",
    placeholder: "Relevante Anzeige für Fachleute",
    close: "Schließen"
  },
  footer: {
    supportedBy: "Unterstützt von:",
    copyrightRights: "Alle Rechte vorbehalten",
    legalNotice: "Rechtlicher Hinweis",
    privacyPolicy: "Datenschutz",
    termsOfUse: "Nutzungsbedingungen",
    reportIssue: "Feedback & Vorschläge",
    buyMeACoffee: "Spendier mir einen Kaffee",
    disclaimerNotice: "AudiometricReport ist ein Dokumentations-, Verwaltungs- und Büro-Hilfswerkzeug. Es stellt kein Medizinprodukt (EU-MDR 2017/745) dar und stellt keine medizinischen Diagnosen oder Verschreibungen aus. Die finale klinische Validierung und Aufbewahrung der Berichte liegt in der alleinigen Verantwortung der zugelassenen Fachkraft."
  },
  cookies: {
    title: "Cookies & Datenschutz",
    description: "Wir verwenden Cookies, um den Datenverkehr zu analysieren und Ihr Erlebnis zu verbessern. Wir sammeln oder speichern niemals Patientendaten.",
    accept: "Akzeptieren",
    decline: "Ablehnen"
  },
  patientList: {
    select: "Auswählen",
    copy: "Kopieren",
    copied: "Kopiert!"
  },
  audiogramCharts: {
    leftEar: "Linkes Ohr",
    rightEar: "Rechtes Ohr",
    frequency: "Frequenz (Hz)",
    intensity: "Intensität (dB HL)",
    tooltip: {
      air: "Luftleitung",
      airMasked: "Luft vertäubt",
      bone: "Knochenleitung",
      boneMasked: "Knochen vertäubt",
      ucl: "UCL / LDL",
      algiacusia: "Unbehaglichkeitsschwelle",
      gap: "Schallleitungskomponente"
    }
  },
  dataInputPanel: {
    rightEar: "Rechtes Ohr",
    leftEar: "Linkes Ohr",
    airConduction: "Luftleitung",
    boneConduction: "Knochenleitung",
    airMaskedConduction: "LL vertäubt",
    boneMaskedConduction: "KL vertäubt",
    ucl: "Unbehagen",
    algiacusia: "Schmerz",
    nrTooltip: "Keine Antwort",
    limitWarning: "Überschreitet Gerätelimit",
    tabSelectionNotice: "Wählen Sie einen Pfad für zusätzliche Daten.",
    qualityAlert: "QUALITÄTSMELDUNGEN"
  }
};
export default de;
