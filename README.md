# Nodejs-typescript-api-crud
<p>Pequeña API REST con autenticación y un CRUD de usuarios, creada con Node JS haciendo uso de TypeScript y MySql.</p>
<br />

# 0.- Pasos para ejecutar este proyecto
<h2>0.1.- Preparar la base de datos</h2>
<p>Lo primero es importar la base de datos en vuestro servidor MySql. La base de datos de este proyecto la tenéis en el fichero "database.sql" en la carpeta "documentacion" del repositorio.</p>
<p>En este fichero para importar la base de datos ya tenéis creado un usuario llamado "test" cuya contraseña también es "test" (se ha utilizado bcrypt para encriptar la contraseña de los logins).</p>
<br />

<h2>0.2.- Preparar la aplicación</h2>
<p>Una vez tengamos clonado este repositorio o simplemente hayamos descargado el proyecto tenemos que realizar las siguientes pasos para poder ejecutarlo:</p>
<ul>
    <li><b>1.- </b>Abrir la carpeta donde tenemos el proyecto (en mi caso "Nodejs-typescript-api-crud/api") desde la línea de comandos.</li>
    <li><b>2.- </b>Ejecutar el comando <b><i>npm install</i></b> para instalar todos los módulos que hay registrados en el fichero "package.json".</li>
    <li><b>3.- </b>Crear el fichero ".env" en la carpeta del proyecto (en mi caso "Nodejs-typescript-api-crud/api") basándonos en la estructura del fichero "estructura_env.txt" que tenéis en la carpeta "documentacion" en este repositorio.</li>
    <li><b>4.- </b>Ejecutar el comando <b><i>npm run build:dev</i></b> para compilar el proyecto (esto nos creará automáticamente la carpeta "dist").</li>
    <li><b>5.- </b>Ejecutar el comando <b><i>npm run start:dev</i></b> para ejecutar la aplicación (esto ejecuta la aplicación desde la carpeta "dist").</li>
</ul>
<br />

<h2>0.3.- Preparar Postman</h2>
<p>Finalmente, para realizar las pruebas (en mi caso) he utilizado Postman. Podéis encontrar mi proyecto de Postman en el fichero "Nodejs-typescript-api-crud.postman_collection.json" en la carpeta "documentacion" del repositorio.</p>
<p>Para importar este proyecto en vuestro Postman simplemente tenéis que:</p>
<ul>
    <li>Abrir Postman.</li>
    <li>Abrir la pestaña "File" (arriba a la izquierda) y hacer clic en "Import".</li>
    <li>Seleccionar el fichero "Nodejs-typescript-api-crud.postman_collection.json" e impórtalo.</li>
</ul>
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
<p>Lo siguiente es configurar una serie de scripts que nos facilite la ejecución de comandos, para eso editaremos la sección "scripts" del fichero "package.json" añadiendo los siguientes scripts:</p>
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


# 3.- Ficheros de configuración
<p>En el apartado 2.1 hemos instalado un módulo llamado "dotenv", el cual sirve para leer nuestro fichero ".env". Este fichero lo tenemos que tener creado en la raíz del proyecto (en mi caso lo tengo creado en la carpeta "api") y en teoría no se puede subir al repositorio, porque este fichero puede contener información sensible (como por ejemplo, los datos de acceso a base de datos).</p>
<p>La idea es que cuando despleguemos un proyecto en producción tengamos la configuración almacenada en variables de entorno en el propio sistema operativo de nuestro servidor. Al estar la configuración en variables de nuestro sistema operativo se nos puede hacer más "complicado" trabajar en nuestro entorno de desarrollo, y es ahí donde podemos hacer uso del fichero ".env". Básicamente, su función es almacenar variables de entorno que utilizaremos en la aplicación, y el módulo "dotenv" es el encargado de transformar las variables del fichero ".env" en variables de entorno.</p>
<p>Esta es la estructura que tiene que tener el fichero ".env" (clave=valor):</p>
<p><i>APP_ROUTER_PREFIX=/api<br />
APP_PORT=5000</i></p>
<p>Antes de leer una variable de entorno tenemos que indicarle al módulo "dotenv" la ubicación del fichero ".env", la cual se la podemos indicar de esta manera (este código lo tenéis en el fichero "src/configs/app.config.ts"):</p>
<p><i>dotenv.config({ path: path.resolve(__dirname, '../../.env') });</i></p>
<p>Finalmente, estas variables de entorno las podemos guardar en variables estáticas y de solo lectura para poder utilizarlas en toda la aplicación. Tenéis de ejemplo el fichero "src/configs/app.config.ts" donde almaceno el contenido de las variables, y un ejemplo de lectura lo tenéis en el fichero "src/core/app.ts", donde hago uso del config para leer el puerto para iniciar la aplicación o el uso del prefijo para inicializar las rutas de la aplicación.</p>
<br />


# 4.- Configurar las trazas de la aplicación
<p>En la carpeta "src/core/libs" tenéis el fichero "logger.lib.ts", el cual hace uso del módulo "winston" y del módulo "winston-daily-rotate-file". Esta clase ya está configurada para que exporte las trazas en un formato en concreto (el formato se le especifica en la función <i>logFormat</i> de la misma clase), para que cree un nuevo fichero de trazas cuando el actual alcance la capacidad máxima y para que cree un nuevo fichero cada día (todas estas configuraciones nosotros se la indicamos y ya se encargan los dos módulos de hacer todo el trabajo).</p>
<p>La configuración la tenemos que especificar en el fichero ".env" o en variables de entorno en nuestro sistema operativo. Los configs o variables que tenemos que crear son los siguientes (tenéis la plantilla de mi fichero ".env" en esta ruta del repositorio "documentacion/estructura_env.txt"):</p>
<ul>
    <li><b><i>LOGGER_LEVEL</i></b>, indica el tipo de traza que vamos a pintar en el fichero log (debug, warn, info, error...).</li>
    <li><b><i>LOGGER_PATH</i></b>, indica la ruta del fichero log teniendo en cuenta que la instancia se crea dentro de la carpeta "dist/core", en caso de querer exportar las trazas en el directorio "dist/logs" tendremos que indicar la ruta relativa en este config como si estuviésemos dentro de la ruta "dist/core" (por ejemplo: "<i>../logs/log_%DATE%.log</i>"). Esto es porque la instancia de la aplicación se inicializa dentro de la carpeta "src/core" en el fichero "app.ts".</li>
    <li><b><i>LOGGER_DATE_PATTERN</i></b>, indica el formato de la fecha que se le aplicará al nombre del fichero log.</li>
    <li><b><i>LOGGER_MAX_SIZE</i></b>, indica la capacidad máxima del fichero log (por ejemplo "15m", que equivale a 15 megabytes).</li>
</ul>
<br />
