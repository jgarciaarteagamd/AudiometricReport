
const es = {

  seo: {
    home: {
      title: "AudiometricReport | Software Generador de Informes Audiométricos Clínicos",
      description: "Generador gratuito de informes en PDF para audiología. Incluye audiometría tonal, logoaudiometría, impedanciometría (timpanometría y reflejos) y calculadora de pérdida auditiva AAO-HNS/AMA/AAOO."
    },
    calculator: {
      title: "Calculadora de PTA y % Pérdida Auditiva (AAO-HNS/AMA/AAOO) | AudiometricReport",
      description: "Calculadora audiológica rápida y precisa. Obtenga el Promedio Tonal Puro (PTA) y el porcentaje de deterioro auditivo según los estándares AAO-HNS, AMA y AAOO. Uso gratuito."
    },
    reportGenerator: {
      title: "Software de Informes: Audiometría Tonal, Logoaudiometría e Impedancias | AudiometricReport",
      description: "Cree informes médicos completos con gráficos profesionales. Incluye audiometría (vía aérea/ósea con enmascaramiento), logoaudiometría (SDT, SRT, WRS) e impedanciometría. Procesamiento 100% privado y local."
    }
  },
  common: {
    months: "meses",
    years: "años",
    loading: "Cargando..."
  },
  free: {
    landing: {
      tagline: "Infraestructura gratuita para informes audiológicos",
      description: "Edición de informes de nivel clínico y cálculos precisos para profesionales de la audición. 100% privado y local.",
      ctaCalculatorTitle: "Calculadora de PTA y Pérdida Auditiva",
      ctaCalculatorDesc: "Cálculo rápido de promedios tonales y porcentajes de pérdida (AAO-HNS/AMA/AAOO).",
      ctaGeneratorTitle: "Generador de Informes",
      ctaGeneratorDesc: "Cree informes profesionales con audiogramas en PDF de alta calidad.",
      featureMathTitle: "Matemáticas Precisas",
      featureMathDesc: "Algoritmos validados según las normativas internacionales.",
      featurePrivacyTitle: "Privacidad Total",
      featurePrivacyDesc: "Los datos ingresados nunca abandonan su navegador. Sin bases de datos externas.",
      features: {
        calculator: "Calculadora con 3 normativas adaptadas a la OMS.",
        reports: "Informes con Tonal, Logoaudiometría e Impedanciometría.",
        impedance: "Impedanciometría con Timpanometría y Reflejos.",
        audiometry: "Audiometría Tonal Completa (VA, VÓ, Enm., Disconfort, Dolor).",
        standards: "Cálculo de PTA y % de Pérdida (AMA, AAO, OMS).",
        speech: "Logoaudiometría (SDT, SRT, WRS, WRS 2, UCL).",
        charts: "Gráficos estilizados y de alta resolución.",
        privacy: "Soberanía de datos: no se guarda ninguna información en la nube."
      },
      sections: {
        studies: {
          title: "Estudios Audiológicos Integrales",
          subtitle: "Integración completa de pruebas esenciales para un diagnóstico preciso.",
          impedance: {
            title: "Impedanciometría Avanzada",
            desc: "Evaluación completa con Timpanometría y Reflejos Acústicos."
          },
          tonal: {
            title: "Audiometría Tonal Profesional",
            desc: "Vías Aérea/Ósea, Enmascaramiento, Disconfort, Algiacusia y Alertas de Límite ANSI."
          },
          speech: {
            title: "Logoaudiometría Detallada",
            desc: "Pruebas exhaustivas que incluyen SDT, SRT, WRS, WRS 2 y UCL."
          }
        },
        reports: {
          title: "Informes de Alta Fidelidad",
          subtitle: "Genere informes clínicos con gráficos profesionales y elegantes.",
          integration: {
            title: "Integración 3-en-1",
            desc: "Impedanciometría, Tonal y Logo en un único documento de alto impacto."
          },
          design: {
            title: "Audiogramas Estilizados",
            desc: "Gráficos hermosos, limpios y apegados a la normativa clínica."
          },
          tables: {
            title: "Tablas Automatizadas",
            desc: "Generación automática de tablas de PTA y porcentaje de pérdida."
          },
          alerts: {
            title: "Alertas Inteligentes",
            desc: "Avisos automáticos ante inconsistencias, por ejemplo BC peor que AC."
          }
        },
        workflow: {
          title: "Excelencia para el Clínico",
          subtitle: "Herramientas diseñadas para agilizar su rutina clínica y salvaguardar a sus pacientes.",
          calculator: {
            title: "Cálculo de Precisión",
            desc: "Resultados instantáneos para estándares AAO-HNS, AMA y AAOO."
          },
          clipboard: {
            title: "Copiado Inmediato",
            desc: "Exporte resultados a su portapapeles y ahorre tiempo en su epicrisis."
          },
          languages: {
            title: "Multilingüe",
            desc: "Disponible en varios idiomas para su práctica médica."
          },
          privacy: {
            title: "Soberanía del Dato",
            desc: "Procesamiento 100% local. Jamás almacenamos o enviamos datos de sus pacientes."
          }
        }
      },
      complianceFootnote: "HERRAMIENTA OFIMÁTICA Y CALCULADORA ADMINISTRATIVA",
      medicalSoftware: "HERRAMIENTA AUDIOLÓGICA PROFESIONAL",
      startTool: "Comenzar",
      faq: {
        title: "Preguntas Frecuentes (FAQ)",
        q1: "¿Qué es el PTA (Promedio Tonal Puro)?",
        a1: "El PTA es la media aritmética de los umbrales auditivos en decibelios (dB). Siguiendo las recomendaciones de la Organización Mundial de la Salud (OMS), nuestra herramienta calcula la media en las frecuencias clave para el lenguaje: 500, 1000, 2000 y 4000 Hz.",
        q2: "¿Cómo se calcula el porcentaje de pérdida auditiva AMA/AAO?",
        a2: "A diferencia del promedio puro, el porcentaje de daño (Pérdida %) promedia 500, 1000, 2000 y 4000 Hz, restando un suelo de 25dB y multiplicando por 1.5% el resultado. Para binauralidad, un algoritmo valora a razón de 5:1 o 7:1 el mejor oído.",
        q3: "¿Es seguro tratar datos clínicos en esta web?",
        a3: "Absolutamente sí. AudiometricReport funciona mediante Edge Computing (cálculo en su propia RAM). La validación RGPD está integrada. NUNCA extraemos historias clínicas ni guardamos identificaciones formales.",
        "q4": "¿Cuál es el fin clínico de estos formularios?",
        "a4": "Constituyen en conjunto un programa de redacción y ofimática adaptado al entorno Otorrinolaringológico. Su utilización debe ampararse en el juicio validatorio de un profesional colegiado de la salud."
      }
    },
    disclaimer: {
      title: "Identificación Legal y Adhesión Privacidad / Seguridad",
      intro: "Para proceder a la generación de esta información clínica sensible, debe identificarse y aceptar explícitamente los protocolos de procesamiento y la Evaluación de Impacto (EIPD):",
      professionalName: "Nombre del Facultativo (o Responsable Clínico)",
      namePlaceholder: "Ej: Dr. José López",
      profession: "Profesión / Especialidad",
      professionPlaceholder: "Ej: Otorrinolaringólogo / Audiólogo",
      license: "Número de Colegiado o Licencia Médica",
      licensePlaceholder: "Ej: 123456789",
      point1: "Consentimiento Informado: Usted certifica tener el derecho de tratar los picos tensionales y umbrales aquí digitados al amparo de una historia clínica constituida.",
      point2: "Minimización y Ausencia de RAT / EIPD Extremo: Certificamos que la información se destruye instantáneamente sin tocar la red y existe anonimato y minimización por diseño.",
      point3: "Responsabilidad Custodia ARCO-POL: Dado que se descargará el PDF en su ordenador local, el facultativo colegiado asume por defecto la posterior custodia y salvaguarda.",
      point4: "Documentación de Soporte Diagnóstico y Matemático: Esta es una herramienta sujeta al posterior análisis clínico e impreso de quien redacta y sella, ajenos por competo al operador web.",
      truthStatement: "Declaro bajo mi expresa responsabilidad la veracidad de mi afiliación médica expuesta y consiento usar un motor algorítmico local asumiendo mi obligatoriedad normativa ante la Autoridad Sanitaria competente.",
      checkboxAccept: "He leído, reconozco y asumo como válidos los Términos Clínicos y la Privacidad dispuesta bajo normativas como las de la ACSA / O.M.S.",
      cancelButton: "Cancelar",
      button: "VALIDAR E INGRESAR AL MOTOR"
    },
    editor: {
      title: "Informe",
      signatureLocation: "Localidad",
      calculationTransparency: "Cálculos matemáticos realizados en tiempo real según estándar AMA/AAO 1979 / OMS.",
      lockedPractitioner: "Datos Facultativos Sellados (Este documento)",
      diagnosisLabel: "Firma"
    },
    report: {
      legalFooter: "AudiometricReport es una calculadora administrativa y herramienta ofimática. El usuario clínico asume la carga legal y técnica final de la documentación."
    },
    legalNoticePage: {
      title: "Aviso Legal",
      backToMenu: "Volver",
      content: `
        <div class="space-y-6 text-slate-700">
          <section>
            <h2 class="text-xl font-bold text-slate-900 mb-3">1. Identificación del Titular</h2>
            <p>En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y Comercio Electrónico (LSSI-CE), se hace constar que el titular y creador de esta aplicación web es:</p>
            <ul class="list-disc pl-5 mt-2 space-y-1">
              <li><strong>Titular:</strong> <a href="https://jgarciaarteaga.netlify.app" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">Juan Pablo García Arteaga</a></li>
              <li><strong>Email de contacto:</strong> info@audiometric.report</li>
              <li><strong>Objeto de la web:</strong> Desarrollo, mantenimiento y provisión de herramientas ofimáticas y de cálculo aritmético estandarizado para profesionales de la salud auditiva.</li>
            </ul>
          </section>
          <section>
            <h2 class="text-xl font-bold text-slate-900 mb-3">2. Propiedad Intelectual y Modelos de Licencia</h2>
            <p>El código fuente, arquitectura de interfaz y algoritmos de cálculo de AudiometricReport son una obra original de Juan Pablo García Arteaga y se encuentran debidamente protegidos por derechos de propiedad intelectual e inscritos en el Registro Ninfa de la Junta de Andalucía. La marca se halla en fase de registro en la OEMP. Queda prohibida la reproducción total o parcial sin autorización expresa.</p>
            <p>El titular se reserva el derecho exclusivo de ceder, licenciar o pactar patrocinios comerciales sobre los espacios de la plataforma y sus derechos de explotación a empresas terceras o entidades corporativas del sector audiológico.</p>
          </section>
          <section>
            <h2 class="text-xl font-bold text-slate-900 mb-3">3. Jurisdicción</h2>
            <p>Para cualquier controversia derivada del uso de esta herramienta, las partes se someten expresamente a los Juzgados y Tribunales de <strong>Huelva, España</strong>.</p>
          </section>
        </div>`
    },
    privacyPolicyPage: {
      title: "Política de Privacidad y Soberanía del Dato (RGPD)",
      backToMenu: "Volver",
      content: `
        <div class="space-y-6 text-slate-700">
          <section>
            <h2 class="text-xl font-bold text-slate-900 mb-3">1. Transparencia previa y Datos Recopilados</h2>
            <p>Antes de utilizar nuestra infraestructura, queremos ser transparentes sobre los datos que se procesan. Esta aplicación solicita únicamente información clínica estrictamente necesaria (umbrales de audición, impedanciometría y logoaudiometría) para cumplir el fin exclusivo de <strong>generar el informe audiométrico</strong>. No se recopilan datos para investigación o fines estadísticos. La aplicación se aloja en servidores dentro del Espacio Económico Europeo (EEE), y no existen acuerdos de cesión comercial de datos con terceras entidades.</p>
          </section>
          <section>
            <h2 class="text-xl font-bold text-slate-900 mb-3">2. Procesamiento Volátil (Edge Computing) y Privacy by Design</h2>
            <p>AudiometricReport ha sido diseñado bajo un estricto paradigma de privacidad desde el diseño y por defecto. El procesamiento de los datos introducidos en los formularios se realiza de forma 100% local, exclusivamente en la memoria RAM del navegador web del usuario. No existe persistencia de datos en bases de datos externas, ni transferencia de Información de Salud Protegida (PHI) a nuestros servidores.</p>
          </section>
          <section>
            <h2 class="text-xl font-bold text-slate-900 mb-3">3. Preservación, Consentimiento y Seguridad</h2>
            <p>Nuestra concepción sobre los historiales de salud parte de que es el experto, usted, en su propia consulta, el ente de control. El uso del generador ha sido supeditado a un mecanismo de validación activa; en concreto, un consentimiento expreso mediante un <em>checkbox</em> obligatorio asegurando su legitimación. Protocolos de acceso seguro y cifrado (HTTPS/SSL) aseguran el tránsito de la aplicación web a su terminal.</p>
          </section>
          <section>
            <h2 class="text-xl font-bold text-slate-900 mb-3">4. Derechos ARCO-POL, EIPD, y RAT</h2>
            <p>Dado que la aplicación procesa datos relativos a la salud (Categoría Especial), el sistema se ampara en una Evaluación de Impacto (EIPD) cuyo análisis concluye que el diseño sin servidor de almacenamiento mitiga los riesgos. En el Registro de Actividades de Tratamiento (RAT) esto figura como un proceso efímero. Al cerrar la pestaña o recargar la página (F5), se ejecutan instantáneamente los derechos al olvido y cancelación, destruyéndose irreversiblemente el documento volátil, liberando la memoria y no quedando ningún rastro posterior en nuestro servicio.</p>
          </section>
          <section>
            <h2 class="text-xl font-bold text-slate-900 mb-3">5. Responsabilidad del Tratamiento y Custodia</h2>
            <p>Juan Pablo García Arteaga no actúa como Responsable ni como Encargado del Tratamiento de pacientes. Al minimizar absolutamente la recolección, imposibilita la custodia del material tras su borrado local. Es responsabilidad exclusiva y excluyente del facultativo descargar el PDF y custodiarlo en su infraestructura local u hospitalaria amparándose en su respectivo RGPD.</p>
          </section>
          <section>
            <h2 class="text-xl font-bold text-slate-900 mb-3">6. Cookies Analíticas y Anonimización</h2>
            <p>Utilizamos Google Analytics de forma anonimizada para recolectar datos agregados del flujo de componentes e interacciones de UI, mejorando la herramienta ofimáticamente. Jamás estas cookies o scripts procesarán variables identificativas, nombres o perfiles tonales.</p>
          </section>
        </div>`
    },
    termsAndConditionsPage: {
      title: "Términos y Condiciones de Uso",
      backToMenu: "Volver",
      content: `
        <div class="space-y-6 text-slate-700">
          <section>
            <h2 class="text-xl font-bold text-slate-900 mb-3">1. Naturaleza del Software (Uso Previsto)</h2>
            <p>AudiometricReport es una <strong>herramienta ofimática y de soporte documental de uso gratuito (calculadora administrativa, no diagnóstica)</strong>. No es un Producto Sanitario ni un software médico ("Medical Device") según el Reglamento (UE) 2017/745 (MDR). Su <strong>uso previsto</strong> se limita estrictamente a la representación gráfica de datos ingresados manualmente, la automatización de fórmulas aritméticas de dominio público (como el cálculo de PTA, los porcentajes de pérdidas y la implementación a las normativas de compensación), y la maquetación de un documento PDF para su impresión. En ningún caso interviene en la toma de decisiones clínicas ni sugiere tratamientos o diagnósticos.</p>
          </section>
          <section>
            <h2 class="text-xl font-bold text-slate-900 mb-3">2. Uso Exclusivo Profesional y Exención Diagnóstica</h2>
            <p>El uso de esta herramienta está restringido a facultativos especialistas, audiólogos y profesionales sanitarios autorizados. Usted comprende mediante una marcación afirmativa del consentimiento expreso que <strong>AudiometricReport es una calculadora administrativa y herramienta ofimática, no diagnóstica.</strong> No emite sugerencias clínicas, no interpreta resultados y no realiza diagnósticos automatizados. El profesional clínico asume la absoluta y total responsabilidad sobre la veracidad de los datos introducidos, la gestión, la custodia del informe impreso y el juicio clínico reflejado.</p>
          </section>
          <section>
            <h2 class="text-xl font-bold text-slate-900 mb-3">3. Exención de Responsabilidad por Pérdida de Datos</h2>
            <p>Dada la arquitectura volátil y de no-almacenamiento de la aplicación (Privacy by Design), el titular no se hace responsable en ningún caso de la pérdida de información que pudiera sufrir el usuario por el cierre accidental del navegador, fallos de suministro eléctrico, falta de guardado del PDF o interrupciones de sesión. El software se proporciona "tal cual" (as is), sin garantías implícitas de funcionamiento ininterrumpido.</p>
          </section>
        </div>`
    },
    reportIssuePage: {
      title: "Comentarios y Sugerencias",
      backToMenu: "Volver",
      intro: "Si tienes comentarios, sugerencias o has encontrado un problema con la aplicación, utiliza este formulario. Esto abrirá tu cliente de correo predeterminado para enviar los detalles a nuestro equipo.",
      nameLabel: "Tu Nombre (Opcional)",
      emailLabel: "Tu Email de Contacto",
      subjectLabel: "Asunto",
      subjectPlaceholder: "Ej: Sugerencia de mejora / Error en formulario",
      descriptionLabel: "Comentarios / Descripción",
      descriptionPlaceholder: "Comparte tus ideas, describe un problema o sugiere una nueva función...",
      sendButton: "Crear Correo de Soporte",
      privacyNote: "No incluyas datos de salud de pacientes (PHI) en este formulario."
    }
  },
  reportGenerator: {
    moduleTabs: {
      patient: "Paciente",
      studies: "Estudios",
      diagnosis: "Firma"
    },
    generateReport: "Generar Informe",
    patient: {
      sectionPersonal: "Datos Personales",
      lastName: "Apellidos",
      firstName: "Nombre",
      id: "ID",
      birthDate: "Fecha de Nacimiento",
      age: "Edad",
      sectionContact: "Contacto",
      email: "Correo Electrónico",
      phone: "Teléfono"
    },
    clinicalHistory: {
      title: "Historia Clínica",
      reason: "Motivo de Consulta",
      antecedentes: "Antecedentes",
      personalBg: "Antecedentes Personales",
      familyBg: "Antecedentes Familiares",
      externalFactors: "Factores Externos",
      physicalExam: "Examen Físico",
      additionalStudies: "Estudios Adicionales"
    },
    diagnosis: {
      sectionClinical: "Impresión Diagnóstica",
      clinicalJudgment: "Juicio Clínico",
      plan: "Plan / Tratamiento",
      sectionSignature: "Lugar y Fecha",
      signatureLocation: "Localidad",
      signatureDate: "Fecha",
      configureLocations: "Configurar Localidades",
      aiEvaluationButton: "Evaluar con IA",
      aiLoading: "Analizando...",
      aiFormatLabel: "Formato:",
      aiFormatSimple: "Simple",
      aiFormatDetailed: "Detallado",
      aiSuggestionTitle: "Sugerencia de IA",
      discard: "Descartar",
      aiValidationDisclaimer: "La IA puede cometer errores. Siempre valide el resultado.",
      validateAndInsert: "Validar e Insertar"
    },
    audiometry: {
      qualityControlTitle: "Control de Calidad",
      qualityInversion: "Inversión detectada: La vía ósea no puede ser peor que la aérea (+5dB tolerancia).",
      qualityLimit: "Límite ANSI excedido: El valor supera la salida máxima para esta vía/frecuencia."
    }
  },
  reportPage: {
    reportTitle: "Informe",
    lastName: "Apellidos",
    firstName: "Nombre",
    audiologicalStudy: "Estudio Audiológico",
    diagnosticImpression: "Diagnóstico",
    signatureLabel: "Firma"
  },
  classificationTable: {
    parameter: "Parámetro",
    rightEar: "Oído Derecho",
    leftEar: "Oído Izquierdo",
    binaural: "Binaural",
    pta: "PTA",
    ptaBone: "PTA Óseo",
    grade: "Grado de Pérdida",
    lossAma: "% Pérdida",
    lossAaoo: "% Pérdida",
    lossAaoHns: "% Pérdida",
    loss: "% Pérdida",
    methodologyNotice: "Los cálculos de PTA y porcentaje de pérdida auditiva siguen la metodología {{standard}} y adaptada a los consensos de la OMS."
  },
  legend: {
    title: "Simbología",
    rightAir: "Vía Aérea Oído Derecho",
    leftAir: "Vía Aérea Oído Izquierdo",
    rightBone: "Vía Ósea Oído Derecho",
    leftBone: "Vía Ósea Oído Izquierdo",
    rightAirMasked: "Vía Aérea Enmascarada Oído Derecho",
    leftAirMasked: "Vía Aérea Enmascarada Oído Izquierdo",
    rightBoneMasked: "Vía Ósea Enmascarada Oído Derecho",
    leftBoneMasked: "Vía Ósea Enmascarada Oído Izquierdo",
    uclRight: "Umbrales de Disconfort Derecho",
    uclLeft: "Umbrales de Disconfort Izquierdo",
    algiacusiaRight: "Umbrales de Algiacusia Derecha",
    algiacusiaLeft: "Umbrales de Algiacusia Izquierda"
  },
  studies: {
    audiometryTitle: "Audiometría Tonal",
    speechTitle: "Logoaudiometría",
    tympanometry: {
      title: "Impedanciometría",
      pressure: "Presión",
      compliance: "Complianza",
      pressureAxis: "Presión (daPa)",
      complianceAxis: "Complianza (mL)",
      volume: "Volumen",
      gradient: "Gradiente"
    },
    reflexes: {
      title: "Reflejos Estapediales",
      ipsi: "Ipsi",
      contra: "Contra"
    },
    speech: {
      sdt: "SDT (Detección)",
      srt: "SRT (Recepción)",
      noResponse: "Sin respuesta",
      wrs: "WRS (Discriminación Máxima)",
      wrs2: "WRS 2 (Efecto Rollover)",
      ucl: "UCL (Disconfort)",
      percentage: "Discriminación (%)",
      intensity: "Intensidad (dB)",
      discriminationAxis: "Discriminación (%)",
      intensityAxis: "Intensidad (dB HL)"
    }
  },
  ptaCalculator: {
    title: "Calculadora",
    backToMenu: "Volver al Menú",
    results: "Resultados del Cálculo",
    ptaUnit: "dB",
    lossUnit: "%",
    disclaimer: "PTA calculado vía estándar OMS (500, 1000, 2000, 4000 Hz). El % de pérdida sigue el estándar AMA/AAO (500, 1000, 2000, 4000 Hz).",
    rightEar: "Oído Derecho",
    leftEar: "Oído Izquierdo",
    binauralTotal: "Total Binaural",
    copyTemplate: 'Cálculos según "{{standard}}": OD: PTA: {{ptaOd}}dB, Pérdida Auditiva: {{lossOd}}% | OI: PTA: {{ptaOi}}dB, Pérdida Auditiva: {{lossOi}}% | TOTAL: PTA: {{ptaTotal}}dB, Pérdida Auditiva: {{lossTotal}}%.'
  },
  hearingLossGrade: {
    normal: "Audición Normal",
    slight: "Pérdida Leve / Ligera",
    mild: "Pérdida Leve",
    moderate: "Pérdida Moderada",
    severe: "Pérdida Severa",
    profound: "Pérdida Profunda"
  },
  ads: {
    title: "Espacio Publicitario",
    placeholder: "Anuncio relevante para profesionales",
    close: "Cerrar"
  },
  footer: {
    supportedBy: "Con el apoyo de:",
    copyrightRights: "Todos los derechos reservados",
    legalNotice: "Aviso Legal",
    privacyPolicy: "Privacidad",
    termsOfUse: "Términos de Uso",
    reportIssue: "Comentarios y Sugerencias",
    buyMeACoffee: "Invítame un café",
    disclaimerNotice: "AudiometricReport es una herramienta ofimática, administrativa y de asistencia documental. No constituye un Producto Sanitario (MDR UE 2017/745) ni emite diagnósticos ni prescripciones médicas. La validación clínica final y la custodia de los informes son responsabilidad exclusiva del profesional sanitario colegiado."
  },
  cookies: {
    title: "Cookies y Privacidad",
    description: "Utilizamos cookies para analizar el tráfico y mejorar la experiencia. Nunca recolectamos ni almacenamos datos de pacientes.",
    accept: "Aceptar",
    decline: "Declinar"
  },
  patientList: {
    select: "Seleccionar",
    copy: "Copiar",
    copied: "¡Copiado!"
  },
  audiogramCharts: {
    leftEar: "Oído Izquierdo",
    rightEar: "Oído Derecho",
    frequency: "Frecuencia (Hz)",
    intensity: "Intensidad (dB HL)",
    tooltip: {
      air: "Vía Aérea",
      airMasked: "Vía Aérea Enm.",
      bone: "Vía Ósea",
      boneMasked: "Vía Ósea Enm.",
      ucl: "UCL / LDL",
      algiacusia: "Algiacusia",
      gap: "Gap Aéreo-Óseo"
    }
  },
  dataInputPanel: {
    rightEar: "Oído Derecho",
    leftEar: "Oído Izquierdo",
    airConduction: "Vía Aérea",
    boneConduction: "Vía Ósea",
    airMaskedConduction: "VA Enm.",
    boneMaskedConduction: "VÓ Enm.",
    ucl: "Disconfort",
    algiacusia: "Dolor",
    nrTooltip: "Sin Respuesta",
    limitWarning: "Excede límite del equipo",
    tabSelectionNotice: "Seleccione una vía para introducir datos adicionales.",
    qualityAlert: "ALERTAS DE CALIDAD"
  }
};
export default es;
