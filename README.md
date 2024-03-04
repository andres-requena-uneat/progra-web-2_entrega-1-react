# ENTREGA 1 - PROGRA WEB 2
## 72346798E - ANDRES EMILIO REQUENA GONZALEZ

Para el desarrollo de esta entrega, partí de la base ya existente para el backend.
El frontend lo he desarrollado desde cero utilizando los componentes de la libreria
MaterialUI para simplificar los diseños.

Para la gestión de rutas he utilizado la librería react-router-dom que permite
crear rutas dinámicas y navegación entre páginas sin necesidad de recargar el dom.
Utilicé 3 rutas. La ruta base o principal "/login", la ruta de creación de usuarios
"/signup" y la ruta para mostrar los datos "/home".

La ruta de login permite a un usuario validar sus credenciales para poder acceder a
la información de home. Cabe destacar que un usuario que no tenga una sesión activa
nunca será capaz de acceder a "/home".

La ruta de signup permite al usuario crear una cuenta. Esta cuenta tendrá un cierto
nivel de acceso que puede ser "usuario", "moderador" o "admin".
Al crear un usuario, no se realiza el login automáticamente, sino que se redirecciona
a la vista de login para que el usuario pueda autenticarse debidamente.

En la ruta "/home" se muestra una tabla con todos los usuarios existentes. Sin embargo,
el contenido de esta tabla cambiará dependiendo del nivel de acceso que tenga el usuario.
Un "usuario" solo será capaz de ver a otros usuarios. Un "moderador" podrá ver a los demás
moderadores y a los usuarios. Mientras que un "admin" tiene la capacidad de ver todos los
usuarios existentes.

En la vista de home hay también un botón para cerrar la sesión actual y volver a la
vista de login.

Para la creación de usuarios y el inicio de sesión se reutilizaron las rutas de back
ya definidas. Pero para manejar los accesos de la home se desarrolló una nueva ruta
que devolvería a los usuarios en función del nivel de acceso del usuario que en ese
momento use la aplicación. Para esto, se recibe un token de acceso del usuario cuya
sesión es vigente, con esto se puede definir el nivel de visibilidad de ese usuario
y se envían los datos correspondientes.

Para manejar los datos, el frontend hace uso de axios para realizar las llamadas a la
API. Además, para manejar los datos en los formularios de inicio de sesión y de
creación de usuario, se hace uso de los hooks de react llamado useState.

En la vista de home, se hace uso del hook useEffect para realizar la llamada
inmediatamente después de que se monte el componente. Con esto se logra que los datos
buscados lleguen al cliente lo más pronto posible.