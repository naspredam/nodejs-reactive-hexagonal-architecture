import { routes } from '@infrastructure/routes'

const port = process.env.PORT || 3000;
routes.buildApp()
    .listen(port, () => console.log('Server started under port ', port));