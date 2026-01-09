import { Component, AfterViewInit , OnInit } from '@angular/core';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.css'
})
export class ExperienceComponent implements OnInit {
  public edu: string = 'Educación';
  public infoeducation: string = 'Consulta mi formación académica: idiomas que hablo, educación, cursos técnicos y tecnologías con las que he trabajado.';
  public lang: string = 'Idiomas';
  public esp: string = 'Castellano';
  public gal: string = 'Galego';
  public eng: string = 'Ingles';
  public nat: string = 'Nativo';
  public eng_lvl: string = 'Intermedio-Avanzado | B1 ';
  public studies: string = 'Estudios';
  public studies1: string = 'Curso de Especialización en Intelixencia Artificial e BigData.';
  public studies2: string = 'FP de Grado Superior en Desarrollo de Aplicaciones Multiplataforma.';
  public studies3: string = 'FP de Grado Medio en Gestión Administrativa.';
  public coleg1: string = ' -  IES Fernando Wirtz';
  public coleg2: string = ' - CPR Castelao.';
  public coleg3: string = ' - Academia Cervantes.';
  public curses: string = 'Cursos';
  public curses1: string = 'The Valley Digital BusinessSchool Red.es - ';
  public curses2: string = 'Curso de Ciberseguridad ';
  public resumcurse: string = 'Conocimientos en Windows, Linux, MacOSX, Directorios Activos, Servidores Web, Firmware, Python, PowerShell, Bash Scripting, Hacking Ético, Malware, Gestión de Riesgos, Pentesting, ISO 27001, RGPD y Análisis Forense.';
  public tec: string = 'Tecnologías que uso';
  public lang_programing: string = 'LENGUAJES DE PROGRAMACION';
  public java: string = 'Usado para programar aplicaciones de escritorio con uso de programación orientada a objetos y actualmente aprendiendo Springboot';
  public javascripts: string = 'Usado durante las prácticas para desarrollar aplicaciones web usando Angular. Me sirvió para crear funcionalidades interactivas y manejar la lógica del lado del cliente, integrando componentes dinámicos.';
  public python: string = 'Conocimientos sobre programación de Inteligencia Artificial usando Tensorflow-Keras, OpenCV para el manejo de imagen y con el apoyo de Pandas, NumPy y Matplotlib. También usado para manejo de datos de Big Data y scrapping web con Selenium';
  public c: string = 'Usado durante las clases del ciclo de DAM para aprender fundamentos de programación, desarrollo de sistemas y aplicaciones. Trabajado principalmente en el entorno Eclipse';
  public typescript: string = 'Lenguaje basado en JavaScript que incluye tipado estático, utilizado para el desarrollo de aplicaciones móviles y web escalables.';
  public html: string = 'Usado para estructurar páginas web, creando contenidos modernos y adaptables. ';
  public css: string = '';
  public bbdd: string = 'BASES DE DATOS';
  public mysql: string = 'Tratamiento de datos con lenguaje MySQL, creación y tratamiento de bases de datos en lenguaje MySQL';
  public mariadb: string = 'Derivado de MySQL';
  public sqlito: string = 'Tratamiento de datos en SQLite y creación de bases de datos con herramientas ligeras y comandos SQL.';
  public mondongo: string = 'Creación y tratamiento de bases de datos en MongoDB en servidor privado o en Atlas';
  public firebase: string = 'Manejo de datos utilizando la Firestore y la Firebase Cloud Storage';
  public angular: string = 'Desarrollo de aplicaciones web y móviles con Angular, utilizando JavaScript y TypeScript para interfaces dinámicas y de alto rendimiento.';
  public spring: string = 'Aprendiendo Spring Boot para desarrollar aplicaciones robustas y escalables en Java, aprovechando su enfoque modular y fácil configuración.';
  public data_manage: string = 'MANEJO DE DATOS';
  public hadoop: string = 'Manejo de datos en diferentes nodos almacenados en Hadoop HDFS';
  public spark: string = 'Tratamiento de datos de Hadoop con Apache Spark en lenguajes de programación como Python en formato de RDDs';
  public sparql: string = 'Tratamiento de los datos de Hadoop pero con sentencias SQL';
  public hive: string = 'Consulta de ficheros alocados en Hadoop Distributed File System';
  public sqoop: string = 'Transformación de datos de SQL a Hadoop o viceversa';
  public data_treat: string = 'TRATAMIENTO DE DATOS';
  public kafka: string = 'Manejo de mensajes enviados a través del patrón de diseño Cliente-Consumidor';
  public flume: string = 'Sistema de log sencillo para Kafka y que se pueden almacenar los datos en Hadoop';
  
  public exp: string = 'Experiencia';
  public exp1: string = 'Programador Junior';
  public exp2: string = 'Administrativo';
  public exp3: string = 'Auxiliar de Servicios (Fines de Semana)';
  public exp1_date: string = 'sept. 2021 - dic. 2021 · 4 meses';
  public exp2_date: string = 'abr. 2022 - oct. 2022 · 7 meses';

  public exp3_date: string = 'Agosto. 204 - mayo. 2025 · 9 meses';
  public work1: string = 'ctBarbanza - Centro Tecnoloxíco do Barbanza Sociedade Cooperativa Galega';
  public work2: string = 'Juan Flórez 129 S.L. ';
  public work3: string = 'ESC SERVICIOS GENERALES S.L.';
  public exp1_resum1: string = 'Formé parte de 2 proyectos como desarrollador full stack, donde utilicé tecnologías como HTML, CSS, JavaScript y Angular para la creación de la interfaz de usuario en el frontend.';
  public exp1_resum2: string = 'En el backend me encargué del mantenimiento de bases de datos con mongoDB, optimizando las consultas y mejorando el rendimiento del backend';
  public exp1_resum3: string = 'También realicé pruebas exploratorias y unitarias, identificando y resolviendo más de 20 errores para garantizar la calidad y el correcto funcionamiento de software .';
  public exp1_resum4: string = 'Colaboré con un equipo de desarrolladores en la implementación de nuevas funcionalidades, mejorando mis habilidades en desarrollo web y control de versiones (Git).';
  public exp1_resum5: string = '';
  public exp1_resum6: string = '';

  public exp2_resum1: string = 'Introducción y gestión de apuntes contables de forma eficiente y precisa para más de 30 empresas utilizando el programa de A3Asesor.';
  public exp2_resum2: string = 'Realización liquidaciones y presentación de impuestos, asegurando el cumplimiento riguroso de las normativas fiscales vigentes (ejemplo: IRPF, IVA, Sociedades, Etc.) .';
  public exp2_resum3: string = ' Gestión y archivo de documentación contable y administrativa.';
  public exp2_resum4: string = 'Realización de trámites y presentación de documentos ante distintas administraciones públicas, tanto por vía telemática como presencial (ejemplo: legalización de libros mercantiles y societarios ante el Registro Mercantil).';
  public exp2_resum5: string = 'Atención al cliente (presencial, telefónica, telemática...): recepción, revisión, requerimiento, seguimiento... de documentación.';
  public exp2_resum6: string = '';
  public selectedExperience: string = 'experience1';


  public exp3_resum1: string = 'Control y Verificación de Accesos: Responsable de la identificación y control de entradas para miles de asistentes, asegurando la correcta validación de tickets y el cumplimiento de las normas de seguridad.';
  public exp3_resum2: string = 'Gestión de Situaciones de Estrés: Habilidad demostrada para tratar y mediar con clientes en ambientes de alta afluencia y potencialmente conflictivos, priorizando siempre la seguridad del evento y la satisfacción del cliente.';
  

  ngOnInit() {
    // Lógica del acordeón
    const accordionButtons = document.querySelectorAll('.accordion-button');
    accordionButtons.forEach(button => {
      button.addEventListener('click', () => {
        const content = button.nextElementSibling as HTMLElement;
        const arrow = button.querySelector('.arrow') as HTMLElement;
        if (content.style.display === 'block') {
          content.style.display = 'none';
          arrow.textContent = '↓';
        } else {
          content.style.display = 'block';
          arrow.textContent = '−';
        }
      });
    });

    // Lógica de experiencia
    const experienceButtons = document.querySelectorAll('.experience-button');
    const contents = document.querySelectorAll('.experience-item');

    // Mostrar la primera experiencia por defecto
    (contents[0] as HTMLElement).style.display = 'block';

    experienceButtons.forEach(button => {
      button.addEventListener('click', () => {
        const targetId = button.getAttribute('data-target');

        // Ocultar todos los contenidos
        contents.forEach(content => {
          (content as HTMLElement).style.display = 'none';
        });

        // Mostrar el contenido correspondiente
        const targetContent = document.getElementById(targetId || '');
        if (targetContent) {
          targetContent.style.display = 'block';
        }
      });
    });

}

  selectExperience(experience: string) {
    this.selectedExperience = experience;
  }
}
