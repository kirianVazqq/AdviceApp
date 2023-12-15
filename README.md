# Consultify: Sistema de Presupuestación para Consultorías

## Tabla de contenidos
- [Introducción](#introducción)
- [Necesidad del Proyecto](#necesidad-del-proyecto)
- [Descripción del Proyecto](#descripción-del-proyecto)
- [Modelo de Datos](#modelo-de-datos)
- [Requisitos de Usuario](#requisitos-de-usuario)
- [Interfaces y Usabilidad](#interfaces-y-usabilidad)
- [Manuales](#manuales)
- [Pila Tecnológica](#pila-tecnológica)
- [Planificación](#planificación)
- [Conclusiones y Reflexiones](#conclusiones-y-reflexiones)
- [Enlaces y Referencias](#enlaces-y-referencias)
- [Anexos](#anexos)
- [Implementación](#implementación)

## Introducción
Este documento detalla la documentación técnica del proyecto Consultify, una solución sofisticada diseñada para revolucionar la gestión de presupuestos y relaciones con clientes en el entorno de consultoría. Contiene una descripción completa de cada etapa del desarrollo del sistema, desde su concepción basada en una necesidad de negocio específica, pasando por el meticuloso diseño del modelo de datos, hasta su implementación y despliegue final. El propósito de este documento es asegurar que todas las partes interesadas comprendan con claridad la estructura y funcionalidad del sistema, así como proporcionar una guía coherente para futuras expansiones y mantenimiento.
La documentación sirve como un manual comprensivo que ilustra el compromiso del proyecto con la usabilidad y la eficiencia operativa. Al detallar los procesos de desarrollo y las decisiones de diseño, establece un marco para la comprensión integral del sistema Consultify, evidenciando cómo cada componente y funcionalidad se alinea con el objetivo de simplificar y mejorar la gestión de la información de clientes y presupuestos en consultorías.

## Necesidad del Proyecto
La consultoría moderna enfrenta el desafío de gestionar eficientemente grandes cantidades de datos relativos a presupuestos y clientes. La necesidad de un sistema que centralice y simplifique este proceso es imperativa para mejorar la productividad y ofrecer un servicio al cliente óptimo. Consultify surge para llenar este vacío, proveyendo una solución integral que permite a los asesores crear, almacenar y administrar presupuestos de manera eficaz.

## Descripción del Proyecto
En el dinámico entorno de las pequeñas consultorías, la habilidad para gestionar datos de clientes y presupuestos de forma eficaz es crucial. A menudo, estas entidades enfrentan el reto de centralizar y simplificar sus procesos sin los recursos de las grandes corporaciones. Consultify nace como una solución a medida para estas necesidades, ofreciendo una herramienta intuitiva y accesible que empodera a los asesores de consultorías de menor escala para organizar, almacenar y manejar presupuestos con facilidad, mejorando así la productividad y elevando la calidad del servicio al cliente.

## Modelo de Datos
La estructura de la base de datos de Consultify incluye cinco entidades principales: Asesor, Usuario, Nota, Presupuesto y Cliente. La relación entre estas entidades es fundamental para el funcionamiento del sistema:
- Presupuestos: Vinculados directamente con un único Usuario, solo pudiendo estar asociados con uno Cliente.
- Usuarios: Pueden generar múltiples presupuestos y están asociados a un único Asesor.
- Clientes: Pueden tener varios presupuestos asociados, reflejando la diversidad de servicios consultados.
- Asesores: Relacionados uno a uno con Usuarios, destacando la personalización del servicio.
- Notas: Permiten a los Usuarios mantener un registro de observaciones importantes, cada una asociada a un único Usuario.

Esta estructura está diseñada para maximizar la eficiencia y la integridad de los datos.


## Requisitos de Usuario
La solución Consultify está diseñada para cumplir con los siguientes requisitos fundamentales:
- Autenticación Segura: Los usuarios pueden acceder mediante credenciales verificadas.
- Gestión de Presupuestos: Facilidad para crear, editar y eliminar presupuestos.
- Administración de Clientes: Posibilidad de añadir y gestionar la información de los clientes.
- Rol de Usuario: Distinción clara entre permisos de usuarios asesores y administradores.


## Interfaces y Usabilidad
La interfaz de usuario de Consultify, en su búsqueda por la simplicidad y la eficiencia, ha sido meticulosamente diseñada con una paleta de colores suaves y acogedores, dominada por tonos de blanco hueso y acentos de rojo, que invitan a la interacción sin distracciones. La tipografía se ha seleccionado por su legibilidad y tamaño, asegurando que la información sea fácilmente digerible de un vistazo. Cada elemento ha sido colocado de manera estratégica para garantizar una navegación intuitiva, con ventanas emergentes que proporcionan retroalimentación inmediata y constructiva al usuario. Además, se ha incorporado una guía de usuario dentro de la propia aplicación, ofreciendo asistencia on-the-go y reforzando la accesibilidad para todos los usuarios, independientemente de su familiaridad con plataformas digitales.


## Manuales
Los manuales de Consultify incluyen:
Manual de Instalación para Desarrolladores: Guía detallada para la configuración del entorno de desarrollo y despliegue.

Manual de Usuario: Documentación sobre cómo utilizar la aplicación, con guías paso a paso para las funciones comunes.


## Pila Tecnológica
- El backend de Consultify está construido sobre Node.js, utilizando Sequelize como ORM y Express para la gestión de las solicitudes HTTP. 
- El frontend se ha desarrollado con Ionic para Angular, proporcionando una experiencia de usuario fluida tanto en dispositivos móviles como de escritorio.


## Planificación
La planificación del proyecto se ha alineado con el roadmap proporcionado por el cuerpo docente, utilizando las herramientas de gestión de proyectos y versiones de GitHub para mantener un flujo de trabajo organizado y eficiente.

## Conclusiones y Reflexiones
De este proyecto he sacado en claro que llevar acabo el diseño y creación de una aplicación completa es un trabajo muy complicado, necesitando tener muy claros los puntos y métodos que se van a seguir. 

## Enlaces y Referencias
- [Mockup de la aplicación](https://www.figma.com/file/2nErh5TrAvSfbPU4YFkSO6/Untitled)

## Anexos
- Diagramas 
E/R

![Captura de pantalla 2023-12-09 150614](https://github.com/kirianVazqq/Consultify/assets/117469820/9e60db69-207b-4f0a-aa1e-8a130b4551f0)

Casos de uso
![Captura de pantalla 2023-12-04 160027](https://github.com/kirianVazqq/Consultify/assets/117469820/158759ba-5b67-4ca5-88fe-1b2f8e84df4a)

---

Diagrama de clases
![Captura de pantalla 2023-12-11 164538](https://github.com/kirianVazqq/Consultify/assets/117469820/a27473a1-5ab1-4a2d-b639-91290d42d063)
---
Modelo relacional
- User: ID (PK), USERNAME (Unique)*, EMAIL (Unique), PASSWORD, ROL.
- Adviser: ID (PK), USERID (FK) (Unique)*, NAME, LASTNAME, DNI (Unique), FILENAME.
- Client: ID (PK), USERID (FK) (Unique)*, NAME, LASTNAME, DNI (Unique), ADDRESS, EMAIL (Unique), NUMBERACCOUNT.
- Budget: ID (PK), USERID (FK)*, CLIENTID (FK)*, NAME, LASTNAME, MODEL, TYPEBUDGET, BRAND, TUITION, KILOMETERS, HORSEPOWER, TYPEVEHICLE, INSURANCENAME, PRICE.
- Note: ID (PK), USERID (FK)*, INFO.

## Implementación

Este apartado guía a través de la instalación y configuración inicial del proyecto Consultify.

### Prerrequisitos
Antes de comenzar, asegúrate de tener instalado:
- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en/) (que incluye npm)

### Clonar el Repositorio
Para obtener una copia del proyecto en tu máquina local, utiliza el siguiente comando de Git:

```bash
git clone [https://github.com/tu-usuario/consultify.git]
cd consultify
```
Instalación de Dependencias
Dentro del directorio del proyecto, ejecuta el siguiente comando para instalar las dependencias necesarias:

```bash
cd backend
npm install
```

y luego

```bash
cd frontend
npm install
```
Tras esto, para poner el proyecto en marcha deberas usar los siguientes comandos:
En el front:
```bash
ionic serve
```
En el backend
```bash
node index.js
```
Acceso a la Aplicación
Una vez que el servidor esté corriendo, puedes acceder a la interfaz de Consultify a través de tu navegador web en [http://localhost:3000](http://localhost:8100/).


Creado por Kirian Vázquez Moreno, 2º DAM-TARDE, IES EL RINCÓN.

# Consultify: Consultancy Budgeting System

## Table of Contents
- [Introduction](#introduction)
- [Project Need](#project-need)
- [Project Description](#project-description)
- [Data Model](#data-model)
- [User Requirements](#user-requirements)
- [Interfaces and Usability](#interfaces-and-usability)
- [Manuals](#manuals)
- [Technology Stack](#technology-stack)
- [Planning](#planning)
- [Conclusions and Reflections](#conclusions-and-reflections)
- [Links and References](#links-and-references)
- [Appendices](#appendices)
- [Implementation](#implementation)

## Introduction
This document details the technical documentation of the Consultify project, a sophisticated solution designed to revolutionize budget management and client relations in the consulting environment. It contains a complete description of each stage of the system's development, from its conception based on a specific business need, through the meticulous design of the data model, to its final implementation and deployment. The purpose of this document is to ensure that all stakeholders clearly understand the structure and functionality of the system, as well as to provide a coherent guide for future expansions and maintenance.
The documentation serves as a comprehensive manual illustrating the project's commitment to usability and operational efficiency. By detailing the development processes and design decisions, it establishes a framework for a comprehensive understanding of the Consultify system, demonstrating how each component and functionality aligns with the goal of simplifying and improving the management of client and budget information in consultancies.

## Project Need
Modern consultancy faces the challenge of efficiently managing large amounts of data related to budgets and clients. The need for a system that centralizes and simplifies this process is imperative to improve productivity and offer optimal customer service. Consultify emerges to fill this gap, providing a comprehensive solution that allows advisors to create, store, and manage budgets effectively.

## Project Description
In the dynamic environment of small consultancies, the ability to effectively manage client and budget data is crucial. Often, these entities face the challenge of centralizing and simplifying their processes without the resources of large corporations. Consultify is born as a tailor-made solution for these needs, offering an intuitive and accessible tool that empowers advisors of smaller-scale consultancies to organize, store, and manage budgets with ease, thereby improving productivity and elevating the quality of customer service.

## Data Model
The database structure of Consultify includes five main entities: Advisor, User, Note, Budget, and Client. The relationship between these entities is fundamental for the functioning of the system:
- Budgets: Directly linked to a single User, only being associated with one Client.
- Users: Can generate multiple budgets and are associated with a single Advisor.
- Clients: Can have several budgets associated, reflecting the diversity of consulted services.
- Advisors: Related one-to-one with Users, highlighting personalized service.
- Notes: Allow Users to keep a record of important observations, each associated with a single User.

This structure is designed to maximize data efficiency and integrity.

## User Requirements
The Consultify solution is designed to meet the following fundamental requirements:
- Secure Authentication: Users can access using verified credentials.
- Budget Management: Ease of creating, editing, and deleting budgets.
- Client Administration: Ability to add and manage client information.
- User Role: Clear distinction between advisor and administrator user permissions.

## Interfaces and Usability
The user interface of Consultify, in its quest for simplicity and efficiency, has been meticulously designed with a palette of soft and welcoming colors, dominated by bone white tones and red accents, inviting interaction without distractions. The typography has been selected for its readability and size, ensuring that information is easily digestible at a glance. Each element has been strategically placed to ensure intuitive navigation, with pop-ups providing immediate and constructive feedback to the user. In addition, a user guide has been incorporated within the application itself, offering on-the-go assistance and reinforcing accessibility for all users, regardless of their familiarity with digital platforms.

## Manuals
The manuals of Consultify include:
Developer Installation Manual: Detailed guide for setting up the development environment and deployment.

User Manual: Documentation on how to use the application, with step-by-step guides for common functions.

## Technology Stack
- The backend of Consultify is built on Node.js, using Sequelize as an ORM and Express for managing HTTP requests.
- The frontend has been developed with Ionic for Angular, providing a smooth user experience on both mobile and desktop devices.

## Planning
The project planning has been aligned with the roadmap provided by the teaching staff, using project management and GitHub versioning tools to maintain an organized and efficient workflow.

## Conclusions and Reflections
From this project, it is clear that carrying out the design and creation of a complete application is a very complicated task, needing to have very clear points and methods to follow.

## Links and References
- [Application Mockup](https://www.figma.com/file/2nErh5TrAvSfbPU4YFkSO6/Untitled)

## Appendices
- Diagrams 
E/R

![Screenshot 2023-12-09 150614](https://github.com/kirianVazqq/Consultify/assets/117469820/9e60db69-207b-4f0a-aa1e-8a130b4551f0)


Use Cases
![Screenshot 2023-12-04 160027](https://github.com/kirianVazqq/Consultify/assets/117469820/158759ba-5b67-4ca5-88fe-1b2f8e84df4a)

---

Class Diagram
![Screenshot 2023-12-11 164538](https://github.com/kirianVazqq/Consultify/assets/117469820/a27473a1-5ab1-4a2d-b639-91290d42d063)
---
Relational Model
- User: ID (PK), USERNAME (Unique)*, EMAIL (Unique), PASSWORD, ROLE.
- Adviser: ID (PK), USERID (FK) (Unique)*, NAME, LASTNAME, DNI (Unique), FILENAME.
- Client: ID (PK), USERID (FK) (Unique)*, NAME, LASTNAME, DNI (Unique), ADDRESS, EMAIL (Unique), NUMBERACCOUNT.
- Budget: ID (PK), USERID (FK)*, CLIENTID (FK)*, NAME, LASTNAME, MODEL, TYPEBUDGET, BRAND, TUITION, KILOMETERS, HORSEPOWER, TYPEVEHICLE, INSURANCENAME, PRICE.
- Note: ID (PK), USERID (FK)*, INFO.

## Implementation

This section guides through the installation and initial setup of the Consultify project.

### Prerequisites
Before starting, make sure you have installed:
- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en/) (which includes npm)

### Cloning the Repository
To get a copy of the project on your local machine, use the following Git command:

```bash
git clone [https://github.com/your-user/consultify.git]
cd consultify
```
Installing Dependencies
Within the project directory, run the following command to install the necessary dependencies:

```bash
cd backend
npm install
```
and then

```bash
cd fronted
npm install
```

After this, to get the project up and running, you will need to use the following commands:
In the front:

```bash
ionic serve
```
In the backend:

```bash
node index.js
```

Accessing the Application
Once the server is running, you can access the Consultify interface through your web browser at http://localhost:3000.

Created by Kirian Vázquez Moreno, 2nd DAM-AFTERNOON, IES EL RINCÓN.
