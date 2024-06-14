import Layout from './components/Layout'
import { createBrowserRouter } from 'react-router-dom'
import Goals from './pages/Goals'
import Verify from './pages/Verify'
import Welcome from './pages/Welcome'
// import ProtectedRoute from './ProtectedRoute'

const Router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      // {
      //   path: '/',
      //   loader: ({ request }) => {
      //     const url = new URL(request.url)
      //     const searchTerm = url.searchParams.get('mode')
      //     const oobCode = url.searchParams.get('oobCode')
      //     for (const [key, value] of url.searchParams.entries()) {
      //       console.log({ key, value })
      //     }
      //     console.log({ oobCode })

      //     if (searchTerm === 'verifyEmail') {
      //       return null
      //       return redirect(`/verify/${oobCode}`)
      //     }
      //     console.log('should redirect to goals')
      //     return redirect('/goals')
      //   },
      // },
      {
        path: '/',
        element: <Welcome />,
      },
      {
        path: '/goals',
        element: <Goals />,
      },
      { path: '/verify', element: <Verify /> },
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
