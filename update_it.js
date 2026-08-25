import fs from 'fs';

const itContent = `legalNoticePage: {
      title: "Note Legali",
      backToMenu: "Indietro",
      content: \`
        <div class="space-y-6 text-slate-700">
          <section>
            <h2 class="text-xl font-bold text-slate-900 mb-3">1. Identificazione del Titolare</h2>
            <p>In conformità all'articolo 10 della Legge 34/2002, dell'11 luglio, sui Servizi della Società dell'Informazione e del Commercio Elettronico (LSSI-CE), si fa presente che il titolare e creatore di questa applicazione web è:</p>
            <ul class="list-disc pl-5 mt-2 space-y-1">
              <li><strong>Titolare:</strong> <a href="https://jgarciaarteaga.netlify.app" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">Juan Pablo García Arteaga</a></li>
              <li><strong>Email di contatto:</strong> info@audiometric.report</li>
              <li><strong>Scopo del sito:</strong> Sviluppo, manutenzione e fornitura di strumenti d'ufficio e di calcolo aritmetico standardizzato per professionisti della salute uditiva.</li>
            </ul>
          </section>
          <section>
            <h2 class="text-xl font-bold text-slate-900 mb-3">2. Proprietà Intellettuale e Modelli di Licenza</h2>
            <p>Il codice sorgente, l'architettura dell'interfaccia e gli algoritmi di calcolo di AudiometricReport sono un'opera originale di Juan Pablo García Arteaga e sono debitamente protetti da diritti di proprietà intellettuale e registrati nel Registro Ninfa della Junta de Andalucía. Il marchio è in fase di registrazione presso l'OEMP. È vietata la riproduzione totale o parziale senza autorizzazione espressa.</p>
            <p>Il titolare si riserva il diritto esclusivo di cedere, concedere in licenza o concordare sponsorizzazioni commerciali per quanto riguarda gli spazi della piattaforma e i propri diritti di sfruttamento ad aziende terze o enti aziendali del settore audiologico.</p>
          </section>
          <section>
            <h2 class="text-xl font-bold text-slate-900 mb-3">3. Giurisdizione</h2>
            <p>Per qualsiasi controversia derivante dall'uso di questo strumento, le parti si sottopongono espressamente ai Tribunali e alle Corti di <strong>Huelva, Spagna</strong>.</p>
          </section>
        </div>\`
    },
    privacyPolicyPage: {
      title: "Informativa sulla Privacy e Sovranità dei Dati (GDPR)",
      backToMenu: "Indietro",
      content: \`
        <div class="space-y-6 text-slate-700">
          <section>
            <h2 class="text-xl font-bold text-slate-900 mb-3">1. Trasparenza Preventiva e Dati Raccolti</h2>
            <p>Prima di utilizzare la nostra infrastruttura, vogliamo essere trasparenti in merito ai dati elaborati. Questa applicazione richiede unicamente le informazioni cliniche strettamente necessarie (soglie uditive, impedenzometria e logoaudiometria) per soddisfare lo scopo esclusivo di <strong>generare il referto audiometrico</strong>. Non vengono raccolti dati per scopi di ricerca o statistici. L'applicazione è ospitata su server all'interno dello Spazio Economico Europeo (SEE) e non vi sono accordi commerciali di trasferimento dati con enti terzi.</p>
          </section>
          <section>
            <h2 class="text-xl font-bold text-slate-900 mb-3">2. Elaborazione Volatile (Edge Computing) e Privacy by Design</h2>
            <p>AudiometricReport è stato progettato sotto un rigoroso paradigma di privacy fin dalla progettazione (Privacy by Design) e per impostazione predefinita. L'elaborazione dei dati inseriti nei moduli avviene al 100% in locale, esclusivamente all'interno della memoria RAM del browser web dell'utente. Non vi è alcuna persistenza dei dati in database esterni, né alcun trasferimento di Informazioni Sanitarie Protette (PHI) ai nostri server.</p>
          </section>
          <section>
            <h2 class="text-xl font-bold text-slate-900 mb-3">3. Conservazione, Consenso e Sicurezza</h2>
            <p>Il nostro approccio alle cartelle cliniche presuppone che voi, esperti nella vostra clinica, siate l'entità di controllo. L'uso del generatore è soggetto a un meccanismo di convalida attiva; nello specifico, il consenso espresso tramite una <em>casella di controllo (checkbox)</em> obbligatoria che ne garantisce la legittimità. Protocolli di accesso sicuri e crittografati (HTTPS/SSL) mettono in sicurezza il traffico dall'applicazione web al vostro terminale.</p>
          </section>
          <section>
            <h2 class="text-xl font-bold text-slate-900 mb-3">4. Diritti ARCO-POL, DPIA e RoPA</h2>
            <p>Considerando che l'applicazione elabora dati sanitari (Categoria Speciale), il sistema è supportato da una Valutazione d'Impatto sulla Protezione dei Dati (DPIA) che conclude che l'architettura senza server mitiga i rischi. Nel Registro delle Attività di Trattamento (RoPA), questo è classificato come un processo effimero. Alla chiusura della scheda o al ricaricamento della pagina (F5), i diritti di cancellazione e all'oblio vengono eseguiti istantaneamente, distruggendo irreversibilmente il documento volatile, liberando la memoria e non lasciando alcuna traccia successiva nel nostro servizio.</p>
          </section>
          <section>
            <h2 class="text-xl font-bold text-slate-900 mb-3">5. Responsabilità del Trattamento e Custodia</h2>
            <p>Juan Pablo García Arteaga non agisce né come Titolare né come Responsabile del trattamento dei dati dei pazienti. Minimizzando in assoluto la raccolta, diventa impossibile mantenere il materiale dopo la sua cancellazione locale. È responsabilità esclusiva ed assoluta del professionista scaricare il PDF salvaguardandolo nella propria infrastruttura in conformità con il GDPR applicabile alla propria giurisdizione.</p>
          </section>
          <section>
            <h2 class="text-xl font-bold text-slate-900 mb-3">6. Cookie Analitici e Anonimizzazione</h2>
            <p>Utilizziamo Google Analytics in modo anonimo per raccogliere dati aggregati sul flusso dei componenti e sulle interazioni dell'interfaccia utente, migliorando programmaticamente lo strumento ofimatico. Questi cookie o script non elaboreranno mai identificatori personali, nomi o profili uditivi tonali.</p>
          </section>
        </div>\`
    },
    termsAndConditionsPage: {
      title: "Termini e Condizioni d'Uso",
      backToMenu: "Indietro",
      content: \`
        <div class="space-y-6 text-slate-700">
          <section>
            <h2 class="text-xl font-bold text-slate-900 mb-3">1. Natura del Software (Strumento da Ufficio)</h2>
            <p>AudiometricReport è uno strumento da ufficio e di supporto documentale di uso gratuito. Non è un Dispositivo Medico (Medical Device) né un software medico secondo il Regolamento (UE) 2017/745 (MDR). La sua funzionalità si limita rigorosamente alla rappresentazione grafica di dati inseriti manualmente, all'automazione di formule aritmetiche di pubblico dominio (come il calcolo del PTA, le percentuali di perdita uditiva e l'implementazione dei nuovi standard e dell'OMS), nonché all'impaginazione di un documento PDF per la stampa.</p>
          </section>
          <section>
            <h2 class="text-xl font-bold text-slate-900 mb-3">2. Uso Esclusivo Professionale ed Esenzione Diagnostica</h2>
            <p>L'uso di questo strumento è limitato a medici specialisti, audiologi e professionisti sanitari autorizzati. Riconoscete, per il tramite di un'affermazione di consenso espresso tracciabile da condizioni formulati mediante termini comprensibili, che AudiometricReport non emette suggerimenti clinici, non interpreta risultati e non formula diagnosi in modo automatico. Il professionista clinico si assume l'assoluta e completa responsabilità per quanto concerne la veridicità dei dati immessi, la gestione, la custodia del resoconto e del parere clinico riflettuto nel medesimo.</p>
          </section>
          <section>
            <h2 class="text-xl font-bold text-slate-900 mb-3">3. Esenzione di Responsabilità per Perdita di Dati</h2>
            <p>Considerata l'architettura volatile e non di stoccaggio dell'applicazione (Privacy by Design), il proprietario non è responsabile, in alcuna circostanza, per la perdita di informazioni subita dall'utente in seguito a un'accidentale chiusura del browser, mancato inserimento della alimentazione elettrica, mancato salvataggio della pagina formato PDF o interruzioni delle sessioni correnti internet; Il suddetto software d'utilizzo è messo a disposizione e fruibile in formula "così com’è" (as is), depennando le intrinseche ed invisibili garanzie di fornitura prestata ad operatività per forza inestinguibile in via totale.</p>
          </section>
        </div>\`
    },`;

let text = fs.readFileSync('src/i18n/it.ts', 'utf8');
const startIdx = text.indexOf('legalNoticePage: {');
const endIdx = text.indexOf('reportIssuePage: {');
text = text.substring(0, startIdx) + itContent + '\\n    ' + text.substring(endIdx);
fs.writeFileSync('src/i18n/it.ts', text);
