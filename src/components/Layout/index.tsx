// import { useEffect, useState } from 'react'
// import { CircularProgress, Stack } from '@mui/material'
import { Stack } from '@mui/material'
// import { useLessonsQuery } from '../../api/lessons/getLessons'
import { Outlet } from 'react-router-dom'
import Header from '../Header'

export default function Layout() {
  // const { isLoading } = useLessonsQuery()

  // if (isLoading)
  //   return (
  //     <Stack alignItems="center" width={1} height={1} justifyContent="center">
  //       <CircularProgress />
  //     </Stack>
  //   )

  return (
    <Stack height={1} alignItems="center" data-testid="yooooo">
      <Header />
      <Outlet />
    </Stack>
  )
}
