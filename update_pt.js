import fs from 'fs';

const ptContent = `legalNoticePage: {
      title: "Aviso Legal",
      backToMenu: "Voltar",
      content: \`
        <div class="space-y-6 text-slate-700">
          <section>
            <h2 class="text-xl font-bold text-slate-900 mb-3">1. Identificação do Titular</h2>
            <p>Em conformidade com a legislação aplicável sobre a Sociedade da Informação e Comércio Eletrónico (LSSI-CE), declara-se que o titular e criador desta aplicação web é:</p>
            <ul class="list-disc pl-5 mt-2 space-y-1">
              <li><strong>Titular:</strong> <a href="https://jgarciaarteaga.netlify.app" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">Juan Pablo García Arteaga</a></li>
              <li><strong>Email de contacto:</strong> info@audiometric.report</li>
              <li><strong>Propósito do Site:</strong> Desenvolvimento, manutenção e fornecimento de ferramentas de escritório e de cálculo aritmético padronizado para profissionais de saúde auditiva.</li>
            </ul>
          </section>
          <section>
            <h2 class="text-xl font-bold text-slate-900 mb-3">2. Propriedade Intelectual e Modelos de Licenciamento</h2>
            <p>O código-fonte, arquitetura da interface e algoritmos de cálculo do AudiometricReport são obra original de Juan Pablo García Arteaga, devidamente protegidos por direitos de propriedade intelectual e registados no Registo Ninfa da Junta de Andaluzia. A marca está em fase de registo na OEMP. É proibida a reprodução total ou parcial sem autorização expressa.</p>
            <p>O titular reserva-se o direito exclusivo de ceder, licenciar ou acordar patrocínios comerciais sobre os espaços da plataforma e os seus direitos de exploração a empresas terceiras ou entidades empresariais do setor audiológico.</p>
          </section>
          <section>
            <h2 class="text-xl font-bold text-slate-900 mb-3">3. Jurisdição</h2>
            <p>Para qualquer controvérsia decorrente da utilização desta ferramenta, as partes submetem-se expressamente aos Tribunais de <strong>Huelva, Espanha</strong>.</p>
          </section>
        </div>\`
    },
    privacyPolicyPage: {
      title: "Política de Privacidade e Soberania dos Dados (RGPD)",
      backToMenu: "Voltar",
      content: \`
        <div class="space-y-6 text-slate-700">
          <section>
            <h2 class="text-xl font-bold text-slate-900 mb-3">1. Transparência Prévia e Dados Recolhidos</h2>
            <p>Antes de utilizar a nossa infraestrutura, queremos ser transparentes sobre o tratamento dos dados. Esta aplicação solicita apenas informações clínicas estritamente necessárias (limiares auditivos, imitanciometria e logoaudiometria) para cumprir o objetivo exclusivo de <strong>gerar o relatório audiométrico</strong>. Nenhum dado é recolhido para fins de investigação ou estatísticos. A aplicação está alojada em servidores dentro do Espaço Económico Europeu (EEE) e não existem acordos de transferência comercial de dados com terceiros.</p>
          </section>
          <section>
            <h2 class="text-xl font-bold text-slate-900 mb-3">2. Processamento Volátil (Edge Computing) e Privacy by Design</h2>
            <p>O AudiometricReport foi desenhado sob um rigoroso paradigma de privacidade desde a conceção e por defeito. O processamento dos dados introduzidos nos formulários é feito de forma 100% local, exclusivamente na RAM do navegador web do utilizador. Não há persistência de dados em bases de dados externas, nem transferência de Informações de Saúde Protegidas (PHI) para os nossos servidores.</p>
          </section>
          <section>
            <h2 class="text-xl font-bold text-slate-900 mb-3">3. Preservação, Consentimento e Segurança</h2>
            <p>A nossa conceção de registos de saúde pressupõe que é o especialista, na sua clínica, a entidade controladora. O uso do gerador está sujeito a um mecanismo de validação ativa; através de consentimento expresso numa <em>checkbox</em> obrigatória que garante a legitimidade. Protocolos de acesso seguro e encriptado (HTTPS/SSL) protegem o tráfego da aplicação web até ao seu terminal.</p>
          </section>
          <section>
            <h2 class="text-xl font-bold text-slate-900 mb-3">4. Direitos ARCO-POL, AIPD e RAT</h2>
            <p>Dado que a aplicação processa dados relacionados com a saúde (Categoria Especial), o sistema é suportado por uma Avaliação de Impacto na Proteção de Dados (AIPD) que conclui que a ausência de armazenamento em servidor mitiga os riscos. No Registo de Atividades de Tratamento (RAT), isso é listado como um processo efémero. Ao fechar o separador ou recarregar a página (F5), os direitos ao esquecimento e cancelamento são instantaneamente executados, destruindo irreversivelmente o documento volátil, libertando a memória e não deixando qualquer rasto subsequente no nosso serviço.</p>
          </section>
          <section>
            <h2 class="text-xl font-bold text-slate-900 mb-3">5. Responsabilidade do Tratamento e Custódia</h2>
            <p>Juan Pablo García Arteaga não atua como Responsável ou Subcontratante pelo processamento de dados de pacientes. Ao minimizar de forma absoluta a recolha, impossibilita a retenção do material após o seu apagamento local. É da exclusiva responsabilidade do facultativo descarregar o PDF e protegê-lo na sua infraestrutura clínica ou hospitalar, ao abrigo da sua respetiva conformidade com o RGPD.</p>
          </section>
          <section>
            <h2 class="text-xl font-bold text-slate-900 mb-3">6. Cookies Analíticas e Anonimização</h2>
            <p>Utilizamos o Google Analytics de forma anonimizada para recolher dados agregados sobre o fluxo de componentes e interações de interface com vista a melhorar programaticamente a ferramenta. Estes cookies nunca processarão identificadores pessoais, nomes ou perfis tonais.</p>
          </section>
        </div>\`
    },
    termsAndConditionsPage: {
      title: "Termos e Condições de Uso",
      backToMenu: "Voltar",
      content: \`
        <div class="space-y-6 text-slate-700">
          <section>
            <h2 class="text-xl font-bold text-slate-900 mb-3">1. Natureza do Software (Ferramenta de Suporte)</h2>
            <p>O AudiometricReport é uma ferramenta de suporte documental e ofimática de utilização gratuita. Não é um Dispositivo Médico (Medical Device) nem um software médico segundo o Regulamento (UE) 2017/745 (MDR). A sua funcionalidade limita-se estritamente à representação gráfica de dados inseridos manualmente, à automação de fórmulas aritméticas de domínio público (como o cálculo de PTA, das percentagens de perdas auditivas e a implementação dos novos padrões e da OMS), e à formatação de um documento PDF para impressão.</p>
          </section>
          <section>
            <h2 class="text-xl font-bold text-slate-900 mb-3">2. Uso Exclusivo Profissional e Isenção Diagnóstica</h2>
            <p>A utilização desta ferramenta restringe-se a médicos especialistas, audiologistas e profissionais de saúde autorizados. Reconhece, através de uma marcação afirmativa de consentimento expresso, que o AudiometricReport não emite sugestões clínicas, não interpreta resultados e não realiza diagnósticos automatizados. O profissional clínico assume total e absoluta responsabilidade pela veracidade dos dados inseridos, gestão, custódia do relatório impresso e o parecer clínico refletido.</p>
          </section>
          <section>
            <h2 class="text-xl font-bold text-slate-900 mb-3">3. Isenção de Responsabilidade por Perda de Dados</h2>
            <p>Devido à arquitetura volátil e de não-armazenamento da aplicação (Privacy by Design), o titular não se responsabiliza, em caso algum, pela perda de informação que o utilizador possa sofrer por ao fechar acidentalmente o navegador, falhas de energia elétrica, falha ao guardar o PDF, ou interrupções de sessão. O software é fornecido "tal como está" (as is), sem garantias implícitas de operação ininterrupta.</p>
          </section>
        </div>\`
    },`;

let text = fs.readFileSync('src/i18n/pt.ts', 'utf8');
const startIdx = text.indexOf('legalNoticePage: {');
const endIdx = text.indexOf('reportIssuePage: {');
text = text.substring(0, startIdx) + ptContent + '\\n    ' + text.substring(endIdx);
fs.writeFileSync('src/i18n/pt.ts', text);
