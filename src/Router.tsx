import Layout from './components/Layout'
import { createBrowserRouter } from 'react-router-dom'
import Welcome from './pages/Welcome'
// import ProtectedRoute from './ProtectedRoute'

const Router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <Welcome /> },
      // {
      //   element: <ProtectedRoute />,
      //   children: [
      //     {
      //       path: 'add-lesson/',
      //       element: <AddLesson />,
      //     },
      //     {
      //       path: 'edit-lesson/',
      //       element: <EditLesson />,
      //       children: [
      //         {
      //           path: ':bookName/:chapter',
      //           element: <EditLesson />,
      //         },
      //       ],
      //     },
      //   ],
      // },
    ],
  },
])

export default Router
