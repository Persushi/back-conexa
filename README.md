# Conexa-challenge

Este proyecto está diseñado para gestionar información de películas mediante un API sencilla y eficiente.

## Instrucciones de inicio

1. **Levantar PostgreSQL con Docker Compose**  
   Ejecuta el siguiente comando para iniciar la base de datos en un contenedor Docker:  
   ```bash
   docker-compose up
   ```

2. **Iniciar la API**  
   Una vez que la base de datos esté activa, inicia la aplicación con:  
   ```bash
   npm start
   ```

## 📖 Endpoints de la API

Toda la documentación de los endpoints está disponible en la ruta:  
**`/api`**  


## 📝 Notas importantes

- **Deploy y Testing**:  
  Por cuestiones de tiempo, no deployé despliegue ni hice pruebas de testing

- **Endpoint de sincronización (`/Films/Synch`)**:  
  Este endpoint ejecuta tiene una variable opcional mientras trae el listado de películas para hacer la sincronización con la Api de SW
  Soy consciente que se pidieron endpoints distintos pero opté por tomarme la libertad de hacerlo en conjunto

- **Endpoint de pelicula detallada (`/Films/Title/{Title}`)**:  
  Supuestamente las peliculas detalladas solo pueden acceder los usuarios regulares pero lo dejé para que los Admins tambien puedan verlo, no se, se me hizo un punto raro y algo innecesario sin hacer un sistema de roles en los guards

- **Tal vez se me pasó algun detalle**:  
  Es posible que haya instalado alguna que otra librería de más mientras desarrollaba se puede ver en los distintos commits del package.json, como el uso de Observables en lugar de Promesas o de usar el dotenv para variables de entorno, medio rebuscado todo