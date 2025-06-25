import Agent from '@/components/Agent'
import { getCurrentUser } from '@/lib/actions/auth.action'
import React from 'react'

const Page = async () => {
  const user = await getCurrentUser(); 
  return (
    <>
      <h3>Interview Page</h3>
      <Agent userName={user?.name} userId={user?.id} type="generate" />
    </>
  )
}

export default Page

// import Agent from '@/components/Agent'
// import { getCurrentUser } from '@/lib/actions/auth.action'
// import { redirect } from 'next/navigation'
// import { Metadata } from 'next'
// import { Suspense } from 'react'
// // import LoadingSpinner from '@/components/ui/loading-spinner'

// export const metadata: Metadata = {
//   title: 'AI Interview | Mock Interview Session',
//   description: 'Practice your interview skills with our AI interviewer'
// }

// const Page = async () => {
//   try {
//     const user = await getCurrentUser()
    
//     if (!user) {
//       redirect('/sign-in?callbackUrl=/interview')
//     }

//     return (
//       <div className="container mx-auto p-4 max-w-4xl">
//         <h1 className="text-3xl font-bold mb-6 text-center">AI Mock Interview</h1>
//         {/* <Suspense fallback={<LoadingSpinner />}> */}
//           <Agent 
//             userName={user.name || 'User'} 
//             userId={user.id} 
//             type="generate" 
//           />
//         {/* </Suspense> */}
//       </div>
//     )
//   } catch (error) {
//     console.error('Error loading interview page:', error)
//     return (
//       <div className="container mx-auto p-4 text-center">
//         <h2 className="text-2xl font-semibold text-red-600 mb-4">
//           Something went wrong
//         </h2>
//         <p className="text-gray-600">
//           We couldn't load the interview session. Please try again later.
//         </p>
//       </div>
//     )
//   }
// }

// export default Page
