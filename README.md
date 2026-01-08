# Dashboard Companies

Un Dashboard muy dinámico que simula la representación y manejo de datos de compañías. Tiene múltiples páginas cada una completamente dinámica y funcional para un caso real.

---

## *Desarrollo*

Completamente en React + Vite y Typescript como variante, inicialmente pensado para ser en Next.js pero por dificultades de rendimiento se cambió a Vite (Mucho más rápido). Y Tailwind CSS.

---

## Complementos

1. **Clerk** - Para el manejo de usuarios y seguridad de la página
2. **Shadcn** - Para elementos html con formato rápido (inputs, forms, buttons...)
3. **Supabase** - Para el almacenamiento de contenido generado por el usuario (imágenes)
4. **Neon DB** - Servidor externo utilizado para contener la base de datos
5. **Prisma** - Para el manejo de la base de datos desde el backend de la aplicación

---

## Instalación y Ejecución

Al clonar el repositorio ejecutar `npm install`, al terminar sólo ejecutar `npm run dev` en la raíz y ambos servidores iniciarán.

---

## Variables de entorno

Las siguientes variables son requeridas para el funcionamiento de la aplicación

### En el Backend

>DATABASE_URL

### Fronted

> VITE_CLERK_PUBLISHABLE_KEY

> CLERK_SECRET_KEY

> VITE_SUPABASE_URL

> VITE_SUPABASE_ANON_KEY

---

## Nota

La aplicación aún necesita una mejora gráfica importante, se considerará después.