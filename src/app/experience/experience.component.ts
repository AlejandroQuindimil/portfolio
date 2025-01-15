import { Component, AfterViewInit , OnInit } from '@angular/core';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.css'
})
export class ExperienceComponent {
  public edu: string = 'Educación';
  public infoeducation: string = 'Consulta mi formación académica: idiomas que hablo, educación universitaria, cursos técnicos y tecnologías con las que he trabajado.';
  public lang: string = 'Idiomas';
  public esp: string = 'Castellano';
  public gal: string = 'Galego';
  public eng: string = 'Ingles';
  public nat: string = 'Nativo';
  public eng_lvl: string = 'Intermedio-Avanzado | B2 ';
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
  public resumcurse: string = 'Un curso de ciberseguridad';
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
  public exp1_date: string = 'sept. 2021 - dic. 2021 · 4 meses';
  public exp2_date: string = 'abr. 2022 - oct. 2022 · 7 meses';
  public exp1_resum1: string = 'Developed and maintained a web-based application using Angular, Node.js, and MongoDB, resulting in improved user experience and increased performance.';
  public exp1_resum2: string = 'Designed and implemented RESTful APIs to support multiple applications, using Node.js and Express.';
  public exp1_resum3: string = 'Built a real-time chat application using WebSockets and Node.js, increasing communication and collaboration among team members.';
  public exp1_resum4: string = 'Implementation of continuous integration and daily backups.';
  public exp1_resum5: string = 'Leading a team of 4 people in the development of an E-commerce platform made in React, Node, and MySQL.';
  public exp1_resum6: string = 'Planning meetings and reports.';
  public exp2_resum1: string = 'Developed responsive web applications using React.js and Bootstrap.';
  public exp2_resum2: string = 'Collaborated with designers to create a seamless user experience.';
  public exp2_resum3: string = '';
  public exp2_resum4: string = '';
  public exp2_resum5: string = '';
  public exp2_resum6: string = '';

  ngOnInit() {
    document.addEventListener('DOMContentLoaded', () => {
        const buttons = document.querySelectorAll('.accordion-button');
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                const content = button.nextElementSibling as HTMLElement;
                if (content) {
                    if (content.style.display === 'block') {
                        content.style.display = 'none';
                    } else {
                        content.style.display = 'block';
                    }
                }
            });
        });
    });
  
    // Esperar a que el DOM esté completamente cargado
    const buttons = document.querySelectorAll('.experience-button');
    const contents = document.querySelectorAll('.experience-item');

    // Mostrar la primera experiencia por defecto
    (contents[0] as HTMLElement).style.display = 'block';

    buttons.forEach(button => {
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
}
