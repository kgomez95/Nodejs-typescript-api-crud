# Nodejs-typescript-api-crud
<p>Pequeña API REST con autenticación y un CRUD de usuarios, creada con Node JS haciendo uso de TypeScript y MySql.</p>
<br />

# 1.- Creación de la base de datos
<p><b>1.1.-</b> En la carpeta "documentacion" se encuentra el fichero "database.sql" con el que podéis crear la base de datos llamada "CRUD_001".</p>
<p>Esta base de datos consta de tres tablas:</p>
<ul>
    <li>LOGINS, la cual almacena los usuarios que se podrán identificar en la aplicación.</li>
    <li>DEPARTMENTS, la cual almacena departamentos (tiene una relación con empleados).</li>
    <li>EMPLOYEES, la cual almacena empleados (tiene una relación con departamentos).</li>
</ul>
<p>Dentro de la carpeta "documentacion" también hay una imagen llamada "database.png" con los diagramas de la base de datos.</p>
<br />

<p><b>1.2.-</b> El fichero "database.sql" ya trae por defecto un usuario creado para realizar las pruebas, el cual es el siguiente:</p>
<ul>
    <li>Nombre de usuario: test</li>
    <li>Contraseña: test</li>
</ul>
<br />


# 2.- Instalación del proyecto base
<h2>2.1.- Creación del proyecto e instalación de módulos</h2>
<p>Estos son los comandos que he ejecutado para instalar la base del proyecto:</p>
<ul>
    <li>Crear proyecto: <b><i>npm init</i></b></li>
    <li>Instalar compilador typescript (solo para entorno de desarrollo): <b><i>npm i tsc --save-dev</i></b></li>
    <li>Instalar typescript: <b><i>npm i typescript --save</i></b></li>
    <li>Crear fichero "tsconfig.json": <b><i>.\node_modules\.bin\tsc --init</i></b></li>
    <li>Instalar nodemon (solo para entorno de desarrollo): <b><i>npm i nodemon --save-dev</i></b></li>
    <li>Instalar express: <b><i>npm i express --save</i></b></li>
    <li>Instalar @types/express (solo para entorno de desarrollo): <b><i>npm i @types/express --save-dev</i></b></li>
    <li>Instalar cors: <b><i>npm i cors --save</i></b></li>
    <li>Instalar @types/core (solo para entorno de desarrollo): <b><i>npm i @types/cors --save-dev</i></b></li>
    <li>Instalar module-alias: <b><i>npm i module-alias --save</i></b></li>
    <li>Instalar copyfiles (solo para entorno de desarrollo): <b><i>npm i copyfiles --save-dev</i></b></li>
    <li>Instalar dotenv: <b><i>npm i dotenv --save</i></b></li>
    <li>Instalar mysql: <b><i>npm i mysql --save</i></b></li>
    <li>Instalar @types/mysql (solo para entorno de desarrollo): <b><i>npm i @types/mysql --save-dev</i></b></li>
    <li>Instalar jsonwebtoken: <b><i>npm i jsonwebtoken --save</i></b></li>
    <li>Instalar @types/jsonwebtoken (solo para entorno de desarrollo): <b><i>npm i @types/jsonwebtoken --save-dev</i></b></li>
    <li>Instalar bcrypt: <b><i>npm i bcrypt --save</i></b></li>
    <li>Instalar @types/bcrypt (solo para entorno de desarrollo): <b><i>npm i @types/bcrypt --save-dev</i></b></li>
    <li>Instalar winston: <b><i>npm i winston --save</i></b></li>
    <li>Instalar winston-daily-rotate-file: <b><i>npm i winston-daily-rotate-file --save</i></b></li>
</ul>

<p>Una vez instalados los módulos necesarios, procedemos a crear la carpeta "src" con su fichero "index.ts".</p>
<br />

<h2>2.2.- Configuración del fichero "tsconfig.json"</h2>
<p>En mi caso, he dejado por defecto las opciones que venían descomentadas, y he añadido (descomentado) las siguientes opciones:</p>
<ul>
    <li>outDir</li>
    <li>rootDir</li>
    <li>baseUrl</li>
    <li>paths</li>
</ul>
<br />

<h2>2.3.- Configuración de scripts del fichero "package.json"</h2>
<p>Lo siguentes es configurar una serie de scripts que nos facilite la ejecución de comandos, para eso editaremos la seción "scripts" del fichero "package.json" añadiendo los siguientes scripts:</p>
<ul>
    <li>"build:ts": "tsc"</li>
    <li>"build-prod:ts": "tsc -p ."</li>
    <li>"start:dev": "nodemon dist/index.js"</li>
    <li>"build-start:dev": "tsc && nodemon dist/index.js"</li>
</ul>
<p>* A medida que avancemos en el proyecto, seguramente tengamos que añadir más scripts, pero por el momento nos basta con estos.</p>
<p>Para ejecutar estos scripts simplemente tendremos que abrir una terminal en la raíz del proyecto (donde se encuentra el fichero "package.json") y ejecutar el comando <i>npm run</i> más el nombre del script.</p>
<p>Siguiente el listado anterior, en caso de querer compilar el proyecto ejecutaría este comando:</p>
<ul>
    <li><i>npm run build:ts</i></li>
</ul>
<p>Y para iniciar la aplicación ejecutaría este comando:</p>
<ul>
    <li><i>npm run start:dev</i></li>
</ul>
<p>* Para parar la ejecución de la aplicación podemos presionar las teclas <i>Ctrl</i> + <i>C</i>.</p>
<br />

<h2>2.4.- Configuración de los alias</h2>
<p>Para crear nuestros alias personalizados tenemos que tener instalado el módulo "module-alias" y debemos realizar los siguientes pasos:</p>
<ul>
    <li><b>Paso 1:</b> Añadir los alias en la sección "paths" del fichero "tsconfig.json".</li>
    <li><b>Paso 2:</b> Añadir los mismos alias del paso 1 en la sección "_moduleAliases" del fichero "package.json".</li>
    <li><b>Paso 3:</b> Añadir en el fichero que inicia la aplicación (en mi caso es el fichero "src/index.ts") la siguiente instrucción: <b><i>import 'module-alias/register';</i></b></li>
</ul>
<p>* Con solo ejecutar el paso 1 ya tendríamos nuestros alias funcionando en desarrollo, pero para que nos funcione una vez compilemos y ejecutemos la aplicación es necesario haber ejecutado los pasos 2 y 3, porque sino NodeJs no será capaz de entender nuestros alias customizados.</p>
<br />
