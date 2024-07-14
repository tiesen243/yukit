import type { NextPage } from 'next'

import { CreateForm } from '@/components/task/create-form'

const Page: NextPage = () => (
  <>
    <h1 className="my-4 text-2xl font-bold">Create new task</h1>

    <CreateForm />
  </>
)

export default Page
