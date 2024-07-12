import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import { useRouteError } from 'react-router-dom'
const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);
  return (
    <div className='container w-screen h-screen flex items-center justify-center'>
      <Card className="block w-2/3 h-1/2">
        <CardHeader>
          <CardTitle className="text-center">Some Error Occurred- <span className='text-red-600'>{error.statusText || error.message}</span></CardTitle>
          <CardDescription className="text-center">
            Sorry some error has occurred try again after some time...
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  )
}

export default ErrorPage
